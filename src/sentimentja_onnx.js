import { predict, onnx_load } from './sentiment.js';
import { LoadModel } from '../lib/blingfire_wrapper.js';

export class Analyzer {
    /**
     * @param {number} maxlen
     * @param {string} path 
     * @param {object} model 
     * @param {object} bf
     * @param {array} emolabels 
     */
    constructor(maxlen = 281, path, model,bf, emolabels) {
        this.maxlen = maxlen;
        this.path = path;
        this.model = model;
        this.bf = bf;
        this.emolabels = ["happy", "sad", "angry", "disgust", "surprise", "fear"];
    }
    static async init(path) {
        const self = new Analyzer();
        // スラッシュの正規化
        path = path.endsWith("/") ? path.slice(0, -1) : path;
        // pathが指定されていない場合はデフォルトのパスを使用
        self.path = path ? path : location.pathname.split('/').slice(0, -1).join('/');
        self.model = await onnx_load(self.path + "/" + "model_2021-09-01-13_02.onnx");
        self.bf = await LoadModel(self.path + "/" + "bpe_sentiment_ja.bin");
        return self;
    }

    /**
     * @param {array} sentences
     */
    analyze(sentences) {
        return predict(
            sentences,
            this.emolabels,
            this.bf,
            this.model,
            this.maxlen)
    }

}