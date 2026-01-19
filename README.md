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

### バックエンドアーキテクチャ

バックエンドは**クリーンアーキテクチャ**を採用しています。

参考: [Golang開発者のためのクリーンアーキテクチャ](https://zenn.dev/edash_tech_blog/articles/b4629f9cd73240)

#### レイヤー構成

```
┌─────────────────────────────────────┐
│      Controllers (HTTP層)           │ 外部からのリクエスト受付
├─────────────────────────────────────┤
│      Presenters (出力層)             │ レスポンス形式の変換
├─────────────────────────────────────┤
│      Use Cases (アプリケーション層)  │ ビジネスロジック
├─────────────────────────────────────┤
│      Domain (ドメイン層)             │ エンティティ、ドメインサービス
│      - Entities                     │
│      - Services                     │
│      - Repositories (Interface)     │
├─────────────────────────────────────┤
│      Infrastructure (インフラ層)     │ DB接続、外部サービス連携
│      - Repositories (実装)          │
│      - Models                       │
│      - DB                           │
└─────────────────────────────────────┘
```

#### 依存関係の原則

- **内側のレイヤーは外側のレイヤーに依存しない**
- **外側のレイヤーは内側のレイヤーに依存する**
- **依存性逆転の原則**: インターフェースは内側に、実装は外側に配置

### 技術スタック

#### バックエンド
- **言語**: Go 1.21+
- **フレームワーク**: Gin
- **ORM**: GORM
- **認証**: JWT
- **データベース**: PostgreSQL 15+
- **アーキテクチャ**: クリーンアーキテクチャ

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
├── backend/                    # Goバックエンド（クリーンアーキテクチャ）
│   ├── cmd/
│   │   └── server/            # エントリーポイント
│   │       └── main.go
│   │
│   ├── domain/                 # ドメイン層（ビジネスロジック）
│   │   ├── entities/          # エンティティ
│   │   ├── services/           # ドメインサービス
│   │   └── repositories/      # リポジトリインターフェース
│   │
│   ├── usecases/               # ユースケース層
│   │   ├── input/             # 入力型
│   │   ├── output/             # 出力型
│   │   └── *_interactor.go    # インタラクター（ビジネスロジック）
│   │
│   ├── infrastructure/         # インフラ層
│   │   ├── repositories/      # リポジトリ実装
│   │   ├── models/            # データモデル
│   │   ├── db.go              # DB接続
│   │   └── router.go          # ルーター設定
│   │
│   ├── controllers/            # コントローラー層
│   │   └── *_controller.go    # HTTPハンドラー
│   │
│   ├── presenters/             # プレゼンター層
│   │   ├── *_presenter.go     # レスポンス生成
│   │   └── error_presenter.go # エラーハンドリング
│   │
│   ├── api/                    # API型定義
│   │   └── types.go           # リクエスト/レスポンス型
│   │
│   ├── migrations/             # DBマイグレーション
│   ├── Dockerfile
│   └── go.mod
│
├── frontend/                   # Next.jsフロントエンド
│   ├── app/                   # App Router
│   ├── components/           # Reactコンポーネント
│   ├── lib/                   # ユーティリティ
│   ├── types/                 # TypeScript型定義
│   └── package.json
│
├── docker-compose.yml          # ローカル開発環境
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

## ドキュメント

- [開発環境構築手順](doc/task.md)
- [技術スタック詳細](doc/1_teck.md)
