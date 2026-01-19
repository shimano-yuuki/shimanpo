# shimanpo 技術ブログ - 使用技術

## 概要
shimanpoは、モダンな技術スタックを採用した技術ブログプラットフォームです。バックエンドにGo、フロントエンドにNext.js、データベースにPostgreSQLを使用し、高パフォーマンスで保守性の高いアーキテクチャを実現します。

## 技術スタック

### バックエンド

#### Go
- **バージョン**: 1.21以上推奨
- **選定理由**:
  - 高速なコンパイル・実行速度
  - シンプルな文法で保守性が高い
  - 並行処理のサポートが標準で組み込まれている
  - 静的型付けによる安全性

- **主要フレームワーク・ライブラリ**:
  - **Gin** または **Echo**: 軽量で高速なWebフレームワーク
  - **GORM**: ORMライブラリ（PostgreSQL対応）
  - **go-jwt**: 認証・認可のためのJWT実装
  - **validator**: リクエストバリデーション
  - **godotenv**: 環境変数管理

### フロントエンド

#### Next.js
- **バージョン**: 14以上（App Router使用）
- **選定理由**:
  - SSR/SSGによるSEO最適化
  - ファイルベースルーティング
  - 画像最適化などのパフォーマンス機能が豊富
  - React Server Componentsのサポート

- **主要ライブラリ**:
  - **React**: UIライブラリ（Next.jsに含まれる）
  - **TypeScript**: 型安全性の確保
  - **Tailwind CSS**: スタイリング
  - **SWR** または **TanStack Query**: データフェッチング・キャッシング
  - **React Hook Form**: フォーム管理
  - **Zod**: バリデーション

### データベース

#### PostgreSQL (AWS RDS)
- **サービス**: Amazon RDS for PostgreSQL
- **バージョン**: 15以上推奨
- **選定理由**:
  - 高い信頼性と実績
  - 豊富なデータ型とインデックス機能
  - JSON型のサポート（柔軟なデータ構造）
  - 全文検索機能
  - AWS RDSによる自動バックアップ・スケーリング
  - マルチAZ配置による高可用性

- **RDS設定**:
  - **無料利用枠**: 12ヶ月間無料（新規AWSアカウント）
  - **インスタンスクラス**: db.t3.micro（無料枠対象）
  - **ストレージ**: 汎用SSD (gp2) 20GB（無料枠範囲内）
  - **バックアップ**: 自動バックアップ有効（保持期間7日、無料枠範囲内）
  - **Multi-AZ**: 無料枠では単一AZ
  - **月間制限**: 750時間/月のインスタンス稼働時間（無料枠）

- **拡張機能**（検討）:
  - **pg_trgm**: 曖昧検索の高速化
  - **uuid-ossp**: UUID生成

## インフラ・開発環境

### コンテナ化
- **Docker**: 開発環境の統一
- **Docker Compose**: ローカル開発での複数サービス管理

### CI/CD
- **GitHub Actions**: 自動テスト・デプロイ
- ビルド、テスト、リント、デプロイの自動化

### ホスティング（候補）
- **バックエンド**: Railway、Render、AWS App Runner、AWS ECS/Fargate
- **フロントエンド**: Vercel（Next.js推奨）
- **データベース**: AWS RDS for PostgreSQL

### その他ツール
- **Git/GitHub**: バージョン管理
- **ESLint/Prettier**: コード品質管理（フロントエンド）
- **golangci-lint**: Goのリンター
- **Makefile**: タスクランナー

## アーキテクチャ

### API設計
- RESTful API
- JSON形式でのデータ通信
- JWT認証によるセキュア通信

### ディレクトリ構成例

#### バックエンド（Go）
```
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── handler/
│   ├── service/
│   ├── repository/
│   └── model/
├── pkg/
├── config/
├── migrations/
├── go.mod
└── go.sum
```

#### フロントエンド（Next.js）
```
frontend/
├── app/
│   ├── (routes)/
│   ├── api/
│   └── layout.tsx
├── components/
├── lib/
├── types/
├── public/
├── package.json
└── tsconfig.json
```

## 開発フロー

1. **ローカル開発**: Docker Composeで全サービスを起動
2. **機能開発**: ブランチを切って開発
3. **プルリクエスト**: CIでテスト・リント実行
4. **マージ**: mainブランチへマージ後、自動デプロイ

## セキュリティ
- 環境変数による機密情報管理
- CORS設定
- SQLインジェクション対策（ORMのパラメータ化クエリ）
- XSS対策（適切なエスケープ処理）
- HTTPS通信
- **AWS関連**:
  - RDSセキュリティグループによるアクセス制限
  - VPC内でのプライベート配置
  - IAM認証の活用
  - Secrets Managerでのデータベース認証情報管理

## パフォーマンス最適化
- Next.jsのSSG/ISRによる静的生成
- データベースインデックスの最適化
- 画像最適化（Next.js Image Component）
- CDNの活用

## AWS無料利用枠について

### RDS for PostgreSQL無料枠
- **期間**: 新規AWSアカウントから12ヶ月間
- **インスタンス**: db.t3.micro（単一AZ配置）を750時間/月
- **ストレージ**: 20GB 汎用SSD (gp2)
- **バックアップ**: 20GBまで無料

### 注意事項
- 無料枠は新規AWSアカウント作成から12ヶ月間のみ
- 月間750時間を超えると課金が発生
- ストレージが20GBを超えると追加料金
- Multi-AZ配置は無料枠対象外
- 無料期間終了後の課金に注意

---

**最終更新**: 2026年1月