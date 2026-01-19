# shimanpo フロントエンド

Next.js/App Routerを使用したフロントエンドアプリケーションです。クリーンアーキテクチャ風の構造を採用し、外部ライブラリとの分離を実現しています。

## アーキテクチャ

### クリーンアーキテクチャ風の構造

参考: [Next.js/App Router を CleanArchitecture風に構築してみた](https://zenn.dev/ficilcom/articles/clean_architecture_for_frontend)

フロントエンドは、外部ライブラリの置き換え・バージョンアップを容易にするため、関心の分離を実現した3層構造を採用しています。

#### レイヤー構成

```
┌─────────────────────────────────────┐
│   Method Parts (app/)               │ Next.js App Routerのルーティング
├─────────────────────────────────────┤
│   Aggregation Parts (component/page) │ ページコンポーネント
├─────────────────────────────────────┤
│   Element Parts (component/ui)     │ UI Components、hooks、functions
└─────────────────────────────────────┘
```

### 各レイヤーの役割

#### 1. Element Parts (`src/component/ui/`)

UIライブラリに依存しない抽象化されたコンポーネント層です。

- **目的**: 外部UIライブラリ（Mantine、Material-UI等）との分離
- **特徴**: 実装詳細を隠蔽し、インターフェースのみを公開
- **例**: `Button`、`Card`コンポーネント

**ディレクトリ構造**:
```
component/ui/
├── _Button/
│   ├── Button.tsx      # 実装（Tailwind CSSを使用）
│   └── index.ts        # エクスポート
├── _Card/
│   ├── Card.tsx        # 実装
│   └── index.ts
└── index.ts            # 統一エクスポート
```

#### 2. Aggregation Parts (`src/component/page/`)

Element Partsを組み合わせてページを構成する層です。

- **目的**: ページ単位のコンポーネントを定義
- **特徴**: Element Partsのみを参照し、UIライブラリに直接依存しない
- **例**: `Home`、`Health`ページ

**ディレクトリ構造**:
```
component/page/
├── _Home/
│   ├── Home.tsx        # ホームページコンポーネント
│   └── index.ts
├── _Health/
│   ├── Health.tsx       # ヘルスチェックページ
│   └── index.ts
└── index.ts            # 統一エクスポート
```

#### 3. Method Parts (`src/app/`)

Next.js App Routerのルーティング機能を使用する層です。

- **目的**: ルーティング定義とpageコンポーネントの呼び出し
- **特徴**: Next.jsの機能に依存するが、ビジネスロジックは含まない
- **例**: `page.tsx`、`layout.tsx`

**ディレクトリ構造**:
```
app/
├── page.tsx            # ルートページ（/）
├── layout.tsx          # レイアウト
└── health/
    └── page.tsx        # /health ページ
```

## 技術スタック

### フレームワーク・ライブラリ

- **Next.js**: 16.1.3 (App Router)
- **React**: 19.x
- **TypeScript**: 5.x
- **Tailwind CSS**: スタイリング

### 主要パッケージ

- **SWR**: データフェッチング・キャッシング
- **Axios**: HTTPクライアント
- **React Hook Form**: フォーム管理
- **Zod**: バリデーション
- **@t3-oss/env-nextjs**: 環境変数検証

## ディレクトリ構成

```
frontend/
├── src/
│   ├── app/                    # Method Parts（ルーティング）
│   │   ├── page.tsx           # ルートページ
│   │   ├── layout.tsx          # レイアウト
│   │   └── health/
│   │       └── page.tsx        # /health ページ
│   │
│   ├── component/              # コンポーネント層
│   │   ├── ui/                # Element Parts
│   │   │   ├── _Button/
│   │   │   ├── _Card/
│   │   │   └── index.ts
│   │   │
│   │   └── page/              # Aggregation Parts
│   │       ├── _Home/
│   │       ├── _Health/
│   │       └── index.ts
│   │
│   ├── lib/                    # ユーティリティ
│   │   └── api.ts             # API通信の抽象化
│   │
│   └── types/                  # TypeScript型定義
│       └── index.ts
│
├── public/                     # 静的ファイル
├── env.example                 # 環境変数テンプレート
├── package.json
└── tsconfig.json
```

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

```bash
cp env.example .env.local
```

`.env.local`を編集:
```env
# API Endpoint
NEXT_PUBLIC_API_URL=http://localhost:8080

# その他の環境変数
NEXT_PUBLIC_APP_NAME=shimanpo
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` にアクセスして確認。

## 開発ガイド

### 新しいUIコンポーネントの追加

1. `src/component/ui/_ComponentName/`ディレクトリを作成
2. `ComponentName.tsx`に実装（Tailwind CSSを使用）
3. `index.ts`でエクスポート
4. `src/component/ui/index.ts`に追加

**例**:
```typescript
// src/component/ui/_Input/Input.tsx
'use client';

export type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="px-4 py-2 border rounded"
    />
  );
};
```

### 新しいページの追加

1. `src/component/page/_PageName/`ディレクトリを作成
2. `PageName.tsx`にページコンポーネントを実装
3. `index.ts`でエクスポート
4. `src/app/page-name/page.tsx`でルーティング定義

**例**:
```typescript
// src/component/page/_About/About.tsx
'use client';

import { Card } from '@/component/ui';

export const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="About">
        <p>About page content</p>
      </Card>
    </div>
  );
};
```

```typescript
// src/app/about/page.tsx
import { About } from '@/component/page';

export default function AboutPage() {
  return <About />;
}
```

### API通信の追加

`src/lib/api.ts`にAPI通信関数を追加します。

**例**:
```typescript
// src/lib/api.ts
export type UserResponse = {
  id: string;
  name: string;
};

export const fetchUser = async (id: string): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>(`/users/${id}`);
  return response.data;
};
```

## ビルド・デプロイ

### ビルド

```bash
npm run build
```

### 本番サーバーの起動

```bash
npm start
```

### デプロイ

Vercelへのデプロイを推奨:

```bash
# Vercel CLIを使用
npm i -g vercel
vercel
```

## 設計原則

### 関心の分離

- **Element Parts**: UIライブラリの変更に影響を受けない
- **Aggregation Parts**: Element Partsのみを参照し、UIライブラリに直接依存しない
- **Method Parts**: Next.jsのルーティング機能のみを使用

### 依存方向

```
Method Parts → Aggregation Parts → Element Parts
```

外側のレイヤーは内側のレイヤーに依存し、逆方向の依存は避けます。

### 抽象化の利点

- UIライブラリの置き換えが容易（例: Tailwind CSS → Material-UI）
- バージョンアップ時の影響範囲を最小化
- テストが容易（各層が独立）

## トラブルシューティング

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .next
npm run build
```

### 型エラー

```bash
# TypeScriptの型チェック
npm run type-check
```

### 環境変数が読み込まれない

- `.env.local`ファイルが正しい場所にあるか確認
- 環境変数名が`NEXT_PUBLIC_`で始まっているか確認（クライアント側で使用する場合）

## 参考資料

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Next.js/App Router を CleanArchitecture風に構築してみた](https://zenn.dev/ficilcom/articles/clean_architecture_for_frontend)
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)

---

**最終更新**: 2026年1月
