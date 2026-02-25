# qwen3.5-35b-a3b-4bit-one-shot-pong

Qwen3.5 35B A3B (4bit) に以下のプロンプトを入力して一発出しした結果を、ほぼ手を入れずに動く形にしたデモリポジトリです。

```text
TypeScript で、HTML5 Canvas を使った Pong 風ゲームを実装してください。
制約:
・コードは index.ts 1ファイルにすべてまとめること
・外部ライブラリは使わず、ブラウザの標準APIのみを使うこと
・キャンバスサイズは 800x600
・左プレイヤー: W / Sキーで上下移動
・右プレイヤー: ↑ / ↓キーで上下移動
・ボールは壁とパドルで反射する
・どちらかのサイドを抜けたらスコア加算し、ボールを中央から再スタート
・画面左上に「Left: X Right: Y」とスコアを描画する
・ゲームループには requestAnimationFrame を使うこと

1ファイルで TypeScript のコードだけを出力してください。コメントは必要最低限で構いません。
````

* **Live Demo:**
  [https://rna4219.github.io/qwen3.5-35b-a3b-4bit-one-shot-pong/](https://rna4219.github.io/qwen3.5-35b-a3b-4bit-one-shot-pong/)

* **Model:**

  * `Qwen3.5-35B-A3B` 4bit GGUF
  * 推論環境: LM Studio / ローカル推論
  * モデルURL: https://huggingface.co/lmstudio-community/Qwen3.5-35B-A3B-GGUF

* **Goal:**

  * 「Qwen3.5 35B の one-shot コーディングでどこまでゲームが書けるか？」のサンプルとして残しておくためのリポジトリです。

---

## Game Overview

Classic **Pong-style** 2D game written in plain JavaScript (originally generated as TypeScript).

* 2 paddles (left / right)
* 1 ball with simple reflection physics
* Score counter for left / right player
* Keyboard controls only, no external libraries

This is intentionally **minimal** and **single-file** to show what the model can produce in one shot.

---

## Controls

* **Left player**

  * `W` : move up
  * `S` : move down
* **Right player**

  * `↑` (ArrowUp): move up
  * `↓` (ArrowDown): move down

The ball bounces off the top/bottom walls and paddles.
If the ball passes a paddle, the opposite side gets 1 point and the ball is reset to the center.

---

## Files

```text
.
├─ index.html      # Simple HTML wrapper that loads index.js
├─ index.js        # Game code (generated from a one-shot prompt to Qwen3.5 35B)
├─ package.json
├─ package-lock.json
└─ tsconfig.json   # (optional – original was TypeScript)
```

GitHub Pages でゲームとして動くのに必要なのは基本的に `index.html` と `index.js` だけです。

---

## How to Run Locally

```bash
git clone https://github.com/RNA4219/qwen3.5-35b-a3b-4bit-one-shot-pong.git
cd qwen3.5-35b-a3b-4bit-one-shot-pong
```

### 1. Static file server

```bash
# どれか一つ
npx serve .
# or
python -m http.server 8000
```

ブラウザで `http://localhost:8000/` などにアクセスするとゲームが動きます。

### 2. 直接開く

簡易確認なら `index.html` をブラウザにドラッグ＆ドロップしても動作しますが、
ブラウザのセキュリティ設定によっては `file://` 直読みだと動かない場合があります。

---

## GitHub Pages

このリポジトリは GitHub Pages で公開しています。

* Branch: `main`
* Folder: `/ (root)`
* Entry: `index.html`

フォークして自分用ページにしたい場合は、Settings → Pages から同じ設定にすれば OK です。

---

## Notes

* これは「きれいなサンプルコード」ではなく、**one-shot 生成の生々しさ**を残したスナップショットです。
* 物理・設計はかなりシンプルで、意図的にリファクタリングも最小限に抑えています。
* 他モデル（別の Qwen 系、GPT-OSS 系など）に同じプロンプトを投げてコードを比較してみると面白いかもしれません。

---

## License

MIT License.

```
