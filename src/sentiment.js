export { preprocess, predict, onnx_load };
import { FreeModel, TextToIds } from '../lib/blingfire_wrapper.js';

function preprocess(data, bf, maxlen = 300) {
    const encord_text = data.map(text => TextToIds(bf, text, maxlen));
    return pad_sequences(encord_text, maxlen, 'float32');
}

function pad_sequences(sequences, maxlen = null, dtype = 'int32', padding = 'pre', truncating = 'pre', value = 0.0) {
    /* 
    tf.keras.preprocessing.sequence.pad_sequences がない
    機能的には https://keras.io/ja/preprocessing/sequence/ 参照
    配列の長さを maxlen にする
    */

    // maxlen がない場合は、一番長い配列の長さを maxlen にする
    if (maxlen === null) { maxlen = Math.max(sequences.map(seq => seq.length)); }

    const new_seq = sequences.map(s => {
        // パディング
        if (s.length < maxlen) {
            if (padding == 'pre') {
                s = [...Array(maxlen - s.length).fill(value), ...s];
            } else if (padding == 'post') {
                s = [...s, ...Array(maxlen - s.length).fill(value)];
            }
        }
        // 配列を詰める
        if (truncating == 'pre') {
            s = s.slice(s.length - maxlen);
        } else if (truncating == 'post') {
            s = s.slice(0, maxlen);
        }

        // 配列の型変換
        switch (dtype) {
            case 'float32':
                s = Float32Array.from(s);
                break;
            case 'float64': 
                s = Float64Array.from(s);
                break;
            case 'bool':
                s = Uint8Array.from(s);
            case 'string':
                s = String(s);
            default:
                s = Int32Array.from(s)
                break;
        }

        return s;
    })
    return new_seq;
}

async function predict(sentences, emolabels, bf, model, maxlen) {
    let preds = [];
    const targets = preprocess(sentences, bf, maxlen);
    const results = await onnx_predict(targets, model);
    results.forEach((ds, index) => {
        let emotions_zip = {};
        ds.value.dense.data.forEach((s, i) => { emotions_zip[emolabels[i]] = s });
        preds.push({
            "sentence": sentences[index],
            "emotions": emotions_zip,
        });
    })
    return preds;
}

// ONNXで推論
async function onnx_predict(targets, model) {
    const results = await Promise.allSettled(targets.map(async t => {
        const tensor = new ort.Tensor(t, [1, t.length]);
        // セッションのinputNamesがそのままfeedsのkeyになる
        const feeds = { embedding_input: tensor };
        return await model.run(feeds);
    }));
    return results;
}

async function onnx_load(path) {
    try {
        const session = await ort.InferenceSession.create(path);
        return session;
    } catch (e) {
        document.body.appendChild(document.createTextNode(`failed to load ONNX model: ${e}.`));
    }
}