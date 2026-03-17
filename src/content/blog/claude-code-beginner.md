---
title: "Claude Code入門｜ターミナルで動くAIコーディングアシスタントの使い方"
description: "Anthropic公式のAIコーディングツール「Claude Code」の使い方を初心者向けに解説。インストールから基本コマンド、実際の開発フロー、Cursorとの違いまで詳しく紹介します。"
pubDate: "2026-03-17"
category: "guides"
heroImage: "/images/heroes/claude-code-beginner.png"
tags: ["Claude Code", "Anthropic", "AIプログラミング", "初心者", "ターミナル"]
affiliate:
  - name: "Claude Pro（Anthropic）"
    url: "https://claude.ai/upgrade"
    price: "月額20ドル"
    description: "Claude Code利用に必要なAnthropicのプロプラン"
  - name: "Claude Max"
    url: "https://claude.ai/upgrade"
    price: "月額100ドル"
    description: "ヘビーユーザー向け。大規模プロジェクトに最適"
  - name: "ターミナル入門書"
    url: "https://www.amazon.co.jp/dp/B0CXBQ4JHX?tag=mamanomikata2-22"
    price: "2,200円"
    description: "コマンドラインの基礎をゼロから学べる入門書"
ctaBox:
  name: "Claude Pro"
  price: "月額20ドル"
  priceNote: "（約3,000円）"
  benefits: ["Claude Code利用可", "Claude Sonnet/Opus対応", "API従量課金より安い場合も", "Web版Claudeも使い放題"]
  ctaText: "Claude Proに登録する"
  ctaUrl: "https://claude.ai/upgrade"
  isTopPick: true
faqItems:
  - question: "Claude Codeは無料で使えますか？"
    answer: "Claude Code自体は無料でインストールできますが、利用にはAnthropicのAPIキーまたはClaude Pro/Maxサブスクリプションが必要です。APIの場合は従量課金制です。"
  - question: "Claude CodeとCursorはどう使い分ける？"
    answer: "GUIで直感的に操作したいならCursor、ターミナルから大規模な自動処理をさせたいならClaude Codeがおすすめです。両方を併用しているエンジニアも多いです。"
  - question: "プログラミング未経験でもClaude Codeは使える？"
    answer: "ターミナル操作の基礎知識が必要なため、完全な未経験者にはCursorの方がおすすめです。ただし、ターミナルの基本が分かれば、Claude Codeは非常に強力なパートナーになります。"
  - question: "Claude Codeはどの言語に対応していますか？"
    answer: "特定の言語に限定されず、Python、JavaScript/TypeScript、Go、Rust、Java、C++など幅広い言語に対応しています。プロジェクト全体を理解した上でコードを生成・修正します。"
  - question: "VS Code上でClaude Codeは使えますか？"
    answer: "Claude Codeはターミナルベースのツールなので、VS Codeの統合ターミナルから実行できます。ただしエディタ統合型ではないため、Cursorのようなインライン編集はできません。"
---

## Claude Codeとは？ターミナルで動くAIエンジニア

**Claude Code（クロード・コード）**は、Anthropicが公式に提供するターミナルベースのAIコーディングアシスタントです。CursorやGitHub CopilotがGUI（グラフィカルUI）のエディタ内で動くのに対し、Claude Codeは**ターミナル（コマンドライン）上で動作**するのが最大の特徴です。

Claude Codeの強みは、**プロジェクト全体を理解した上で自律的にコードを書き換える**ことができる点。1つのファイルだけでなく、複数ファイルにまたがる変更やリファクタリングも一度の指示で実行してくれます。

---

## インストール方法

### 前提条件
- **Node.js 18以上**がインストールされていること
- **ターミナル**の基本操作ができること（cd、lsなど）

### Step 1: npmでインストール

```bash
npm install -g @anthropic-ai/claude-code
```

### Step 2: 認証

```bash
claude
```

初回実行時にブラウザが開き、Anthropicアカウントでの認証が求められます。Claude ProまたはAPIキーでログインしてください。

### Step 3: プロジェクトディレクトリで起動

```bash
cd ~/my-project
claude
```

プロジェクトのルートディレクトリで`claude`と入力するだけで、対話モードが始まります。

---

## 基本的な使い方

### 対話モード（基本）

`claude`コマンドでインタラクティブモードに入り、自然言語で指示を出します。

**よく使うコマンド例：**

```
> このプロジェクトの構造を説明して

> src/utils/auth.tsにバリデーション機能を追加して

> テストが落ちている原因を調べて修正して

> READMEを最新の状態に更新して
```

Claude Codeは指示を受けると、必要なファイルを自動で読み込み、変更内容を提案してきます。変更を確認して承認すると、実際にファイルが書き換わります。

### ワンショットモード

対話モードに入らず、一回だけ指示を出すこともできます。

```bash
claude -p "package.jsonの依存関係を最新版に更新して"
```

CI/CDパイプラインやスクリプトに組み込む場合に便利です。

---

## 実際の開発フロー

### 例：新機能を追加する場合

1. **プロジェクトでClaude Codeを起動**
   ```bash
   cd ~/my-project && claude
   ```

2. **要件を伝える**
   ```
   > ユーザープロフィールページを新規作成して。
   > 名前・メール・アバター画像を表示し、
   > 編集ボタンで情報を更新できるようにして。
   ```

3. **Claude Codeが自動で作業**
   - 既存コードの構造を分析
   - 必要なファイルを作成・修正
   - ルーティング設定を更新
   - 型定義を追加

4. **変更内容を確認して承認**
   - diff形式で変更箇所が表示される
   - 問題なければ承認、修正が必要なら追加指示

5. **テスト実行も依頼可能**
   ```
   > 作成した機能のテストを書いて実行して
   ```

---

## CursorとClaude Codeの違い

| 項目 | Cursor | Claude Code |
|------|--------|-------------|
| **操作方法** | GUI（エディタ画面） | ターミナル（CUI） |
| **得意なこと** | ファイル単位の編集・補完 | プロジェクト全体の理解・変更 |
| **学習コスト** | 低い（VS Code感覚） | やや高い（ターミナル必須） |
| **自律性** | ユーザー主導 | AIが自律的に作業 |
| **大規模変更** | ファイル個別に操作 | 複数ファイルを一括変更 |
| **初心者向き** | ◎ | ○（ターミナル慣れが必要） |

**使い分けのポイント：** 日常的なコーディングにはCursor、大規模リファクタリングや新機能の一括実装にはClaude Codeが向いています。両方を併用するのが最も効率的です。

---

## 料金について

Claude Codeの利用方法は2通りあります。

| 方法 | 料金 | 特徴 |
|------|------|------|
| **Claude Pro/Max** | 月額20〜100ドル | 定額で安心。個人開発者向け |
| **API従量課金** | 使った分だけ | 大量利用ならこちらが安い場合も |

まずはClaude Pro（月額20ドル）から始めるのがおすすめです。

---

## まとめ：ターミナル派のエンジニアにこそ試してほしい

Claude Codeは、ターミナルから離れずにAIの力を借りられる画期的なツールです。プロジェクト全体を俯瞰して理解する能力は、他のAIコーディングツールにはない大きな強みです。

ターミナルに慣れている方は、ぜひ一度`npm install -g @anthropic-ai/claude-code`でインストールして試してみてください。AIがコーディングパートナーになる体験は、想像以上に開発を変えてくれます。
