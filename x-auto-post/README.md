# LIKaNON X (Twitter) 自動投稿システム

@likanon_web アカウント用の自動投稿システムです。

## セットアップ手順

### 1. X Developer Account の作成

1. [X Developer Portal](https://developer.twitter.com/en/portal/dashboard) にアクセス
2. @likanon_web アカウントでログイン
3. 「Sign up for Free Account」をクリック
4. 利用目的を入力（例: "Automated posting for my web design business account"）
5. 規約に同意して作成

### 2. アプリの作成と権限設定

1. Developer Portal で「Projects & Apps」→「+ Add App」
2. アプリ名を入力（例: LIKaNON Auto Post）
3. **重要**: App Settings → User authentication settings で以下を設定:
   - App permissions: **Read and Write** に変更
   - Type of App: Web App, Automated App or Bot
   - Callback URI: `https://likanon.com` (任意)
   - Website URL: `https://likanon.com`

### 3. APIキーの取得

1. 「Keys and Tokens」タブを開く
2. 以下の4つをメモ:
   - API Key
   - API Key Secret
   - Access Token
   - Access Token Secret

   ⚠️ Access Token は権限を「Read and Write」に変更した後に**再生成**してください

### 4. 環境設定

```bash
# x-auto-post フォルダに移動
cd x-auto-post

# パッケージインストール
npm install

# .env ファイルを作成
cp .env.example .env
```

`.env` ファイルを編集してAPIキーを設定:

```
X_API_KEY=取得したAPIキー
X_API_SECRET=取得したAPIシークレット
X_ACCESS_TOKEN=取得したアクセストークン
X_ACCESS_TOKEN_SECRET=取得したアクセストークンシークレット
```

### 5. 接続テスト

```bash
npm run test
```

「✅ 接続成功!」と表示されればOK

---

## 使い方

### 手動で投稿

```bash
# 指定した内容を投稿
npm run post "投稿したい内容をここに"

# 用意された投稿からランダムに1件投稿
npm run post:random

# 特定カテゴリからランダムに投稿
npm run post:random blog      # ブログ記事紹介
npm run post:random service   # サービス紹介
npm run post:random tips      # お役立ちTips
```

### 自動投稿（スケジューラー）

```bash
npm run schedule
```

デフォルト設定:
- 毎日 9:00（朝）
- 毎日 12:00（昼）
- 毎日 18:00（夕）

に自動投稿されます。

#### スケジューラーをバックグラウンドで実行

```bash
# PM2を使う場合（推奨）
npm install -g pm2
pm2 start scheduler.js --name "x-auto-post"
pm2 save

# nohup を使う場合
nohup npm run schedule > scheduler.log 2>&1 &
```

---

## 投稿内容の追加・編集

`posts-content.js` を編集して投稿を追加できます。

```javascript
// 例: 新しいブログ記事の投稿を追加
{
    id: 'blog-new',  // ユニークなID
    text: `【新着記事】
記事タイトル

説明文...

https://likanon.com/blog/xxx.html

#ハッシュタグ`,
}
```

### カテゴリ
- `blog`: ブログ記事紹介
- `service`: サービス紹介
- `tips`: お役立ちTips
- `trust`: 実績・信頼性
- `seasonal`: 季節投稿

---

## ファイル構成

```
x-auto-post/
├── .env                  # APIキー（git管理外）
├── .env.example          # 設定例
├── .gitignore
├── config.js             # API設定
├── package.json
├── post.js               # 手動投稿スクリプト
├── post-random.js        # ランダム投稿スクリプト
├── posts-content.js      # 投稿内容
├── posted-log.json       # 投稿済みログ（自動生成）
├── scheduler.js          # 自動投稿スケジューラー
├── test-connection.js    # 接続テスト
└── README.md
```

---

## トラブルシューティング

### 「401 Unauthorized」エラー
- .env のAPIキーが正しいか確認
- Access Token を再生成してみる

### 「403 Forbidden」エラー
- アプリ権限が「Read and Write」になっているか確認
- 権限変更後、Access Token を再生成する

### 「429 Too Many Requests」エラー
- API制限に達しました。しばらく待ってから再試行
- Free tier は月500投稿まで

### 重複投稿エラー
- 同じ内容は連続投稿できません
- 少し内容を変えるか、時間を空けてください

---

## API制限について

X API Free tier の制限:
- 月500投稿まで
- 1日約16〜17投稿が目安
- 1日3投稿なら余裕あり

---

## サポート

不明点があればお気軽にご連絡ください。
