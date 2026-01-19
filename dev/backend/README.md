# shimanpo

技術ブログプラットフォーム

## アーキテクチャ

### システム構成

```
┌─────────────┐
│   Next.js   │ フロントエンド (React + TypeScript)
│  (Port 3000)│
└──────┬──────┘
       │ HTTP/REST API
       │
┌──────▼──────┐
│  Go (Gin)   │ バックエンド API
│ (Port 8080) │
└──────┬──────┘
       │
┌──────▼──────┐
│ PostgreSQL  │ データベース
│ (Port 5432) │
└─────────────┘
```

### 技術スタック

#### バックエンド
- **言語**: Go 1.21+
- **フレームワーク**: Gin
- **ORM**: GORM
- **認証**: JWT
- **データベース**: PostgreSQL 15+

#### フロントエンド
- **フレームワーク**: Next.js 14+ (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **データフェッチング**: SWR / TanStack Query

#### インフラ
- **開発環境**: Docker Compose
- **本番DB**: AWS RDS for PostgreSQL
- **デプロイ**: Railway / Render / Vercel

### ディレクトリ構成

```
shimanpo/
├── backend/              # Goバックエンド
│   ├── cmd/
│   │   └── server/       # エントリーポイント
│   ├── internal/         # 内部パッケージ
│   │   ├── handler/      # HTTPハンドラー
│   │   ├── service/      # ビジネスロジック
│   │   ├── repository/   # データアクセス層
│   │   └── model/        # データモデル
│   ├── pkg/              # 公開パッケージ
│   ├── migrations/       # DBマイグレーション
│   ├── Dockerfile
│   └── go.mod
│
├── frontend/             # Next.jsフロントエンド
│   ├── app/              # App Router
│   ├── components/       # Reactコンポーネント
│   ├── lib/              # ユーティリティ
│   ├── types/            # TypeScript型定義
│   └── package.json
│
├── docker-compose.yml    # ローカル開発環境
└── README.md
```

### API設計

- **スタイル**: RESTful API
- **データ形式**: JSON
- **認証**: JWT (Bearer Token)
- **CORS**: フロントエンドからのアクセスを許可

### 開発環境

ローカル開発ではDocker Composeを使用して、以下のサービスを起動します：

- **PostgreSQL**: ローカル開発用データベース
- **Backend**: Go APIサーバー
- **Frontend**: Next.js開発サーバー

詳細なセットアップ手順は [doc/task.md](doc/task.md) を参照してください。

### セキュリティ

- 環境変数による機密情報管理
- CORS設定
- SQLインジェクション対策（ORMのパラメータ化クエリ）
- JWT認証によるセキュア通信
- HTTPS通信（本番環境）

## セットアップ

詳細なセットアップ手順は [doc/task.md](doc/task.md) を参照してください。

### クイックスタート

```bash
# Docker Composeで全サービスを起動
docker-compose up -d

# バックエンドのみ起動
cd backend
go run cmd/server/main.go

# フロントエンドのみ起動
cd frontend
npm run dev
```

