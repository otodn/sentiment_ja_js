# sentiment_ja_js

[sentiment_ja](https://github.com/sugiyamath/sentiment_ja)を改変して作られた、ブラウザー上で動く感情分析ライブラリです。

## Demo

[Example](https://otodn.github.io/sentiment_ja_js/example.html)

## Installation

Code → Download ZIP → 展開

もしくは

```git clone https://github.com/otodn/sentiment_ja_js.git```

どちらかを実行して、コード一式を配置してください。

使用する際には、必ず[**onnxruntime-web**](https://github.com/microsoft/onnxruntime/tree/master/js#onnxruntime-web)を事前に読み込ませてください。

またURLが「file://～」では正常に動作しません。

## Usage

usage.js

```JavaScript
    import { Analyzer } from "./src/sentimentja_onnx.js";
    const analyzer = await Analyzer.init("./model/");
    const list_text = [
    "final fantasy 14 超楽しい",
    "クソゲーはつまらん",
    "エアリスが死んで悲しい",
    "冒険の書が消える音こわい",
    "廃人ゲーマーのスキルすごい",
    "ケフカキモい"
    ];
    const result = await analyzer.analyze(list_text);
    console.log(result);
```

usage.html

```HTML
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <title>Usage</title>
    </head>
    <body>
        <script src="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js"></script>
        <script type="module" src="./usage.js"></script>
    </body>
    </html>
```

Result

```
[
   {
      "sentence": "final fantasy 14 超楽しい",
      "emotions": {
         "happy": 0.9386289119720459,
         "sad": 0.34736794233322144,
         "angry": 0.3845081925392151,
         "disgust": 0.34049153327941895,
         "surprise": 0.4474829435348511,
         "fear": 0.21595826745033264
      }
   },
   {
      "sentence": "クソゲーはつまらん",
      "emotions": {
         "happy": 0.2653350830078125,
         "sad": 0.3436579704284668,
         "angry": 0.8499109745025635,
         "disgust": 0.8405320048332214,
         "surprise": 0.26124244928359985,
         "fear": 0.3502708375453949
      }
   },
   {
      "sentence": "エアリスが死んで悲しい",
      "emotions": {
         "happy": 0.04951834678649902,
         "sad": 0.8946758508682251,
         "angry": 0.3113452196121216,
         "disgust": 0.5189360976219177,
         "surprise": 0.5028756260871887,
         "fear": 0.6431229710578918
      }
   },
   {
      "sentence": "冒険の書が消える音こわい",
      "emotions": {
         "happy": 0.0756436288356781,
         "sad": 0.5684623718261719,
         "angry": 0.38816800713539124,
         "disgust": 0.27659302949905396,
         "surprise": 0.512812077999115,
         "fear": 0.9093526601791382
      }
   },
   {
      "sentence": "廃人ゲーマーのスキルすごい",
      "emotions": {
         "happy": 0.19693389534950256,
         "sad": 0.17561683058738708,
         "angry": 0.3801153600215912,
         "disgust": 0.6279584169387817,
         "surprise": 0.8909167051315308,
         "fear": 0.5906315445899963
      }
   },
   {
      "sentence": "ケフカキモい",
      "emotions": {
         "happy": 0.1822584867477417,
         "sad": 0.3184907138347626,
         "angry": 0.6396976709365845,
         "disgust": 0.901584267616272,
         "surprise": 0.376748651266098,
         "fear": 0.6461198925971985
      }
   }
]
```

## Licence

このライブラリは、sugiyamathさんの[sentiment_ja](https://github.com/sugiyamath/sentiment_ja)からモデルと設計をお借りしています。また、トークナイザーとして[BlingFire](https://github.com/microsoft/BlingFire)を取り込んでいます。

従って、このリポジトリはsentiment_jaとBlingFireのライセンス(MIT Licence)も適用されます。

[MIT Licence](https://github.com/otodn/sentiment_ja_js/blob/main/LICENSE)

