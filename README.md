# サービス名:⚔️ StudyQuest

**サービスの説明**

学習を記録して経験値を貯めていく、RPG風の学習記録アプリです。

---

## これなに？

毎日の勉強、ただ記録するだけだとつまらないなと思って作りました。

学習時間を記録すると経験値（XP）が貯まっていって、目標の **1,000時間** を達成すると「伝説の勇者」になれます。（気持ちの問題です）

### できること

- 学習内容と学習時間を登録する
- 今までの記録を一覧で見る
- いらない記録を削除する
- 合計の学習時間が自動で出る

### 称号（いつか実装したい）

| 累計時間 | 称号             |
| :------: | :--------------- |
|    0h    | 駆け出しの冒険者 |
|   50h    | 見習い戦士       |
|   100h   | 一人前の騎士     |
|   300h   | 魔導師           |
|   500h   | 賢者             |
|  1000h   | **伝説の勇者**   |

---

## 使っている技術

- **React** 19
- **Vite** 7
- **Supabase**（データベース）
- **Jest** + React Testing Library（テスト）
- **GitHub Actions**（CI/CD）

React もSupabase も初めて触ったので、色々手探りで作っています。

---

## 環境設定

### 1. クローン

```bash
git clone https://github.com/<your-username>/vite-project-study2.git
cd vite-project-study2
```

### 2. パッケージインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env` ファイルをプロジェクトのルートに作ってください。

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Supabase のダッシュボード → **Settings** → **API** から取得できます。

> `.env` は `.gitignore` に入れて、GitHub に上げないように注意！

---

## 起動方法

```bash
# 開発サーバー起動
npm run dev
```

`http://localhost:5173` を開けば動きます。

```bash
# その他のコマンド
npm run build    # 本番ビルド
npm run preview  # ビルドしたやつの確認
npm run test     # テスト
npm run lint     # リント
```

---

## フォルダ構成

```
src/
├── App.jsx              # メインのコンポーネント
├── main.jsx             # エントリーポイント
├── supabaseClient.js    # Supabaseの接続設定
├── supabaseFunction.js  # データの取得・追加・削除
└── tests/               # テスト
```

---

## 今後やりたいこと

- [ ] 称号システムの実装
- [ ] 学習のカテゴリ分け
- [ ] グラフで学習時間を可視化
- [ ] ログイン機能

---

まだまだ勉強中ですが、コツコツ改善していきます。
