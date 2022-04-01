import { Analyzer } from "./src/sentimentja_onnx.js";

const analyzer = await Analyzer.init("./model/");

let list_text = [
    "final fantasy 14 超楽しい",
    "クソゲーはつまらん",
    "エアリスが死んで悲しい",
    "冒険の書が消える音こわい",
    "廃人ゲーマーのスキルすごい",
    "ケフカキモい"
];

async function show_results(list_text) {
    const result = await analyzer.analyze(list_text);
    console.log(JSON.stringify(result, null, 3));
    let compatible_result = result;
    Object.keys(result).forEach((r)=> {
        Object.keys(result[r].emotions).forEach((v)=> {
            compatible_result[r].emotions[v] = Number(Math.floor(result[r].emotions[v] + "e8")+"e-8");
        }
        );});
    return JSON.stringify(compatible_result, null, 2);
}

document.getElementById("analyze_btn").addEventListener("click", async () => {
    const text = document.getElementById("text").value;
    const result = await show_results(text.split("\n"));
    document.getElementById("result").innerHTML = result;
});

document.getElementById("text").value= list_text.join("\n");
document.getElementById("loading").textContent = "";
