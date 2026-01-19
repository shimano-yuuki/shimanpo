FROM golang:1.25-alpine

WORKDIR /app

# 依存関係のコピーとインストール
COPY go.mod go.sum ./
RUN go mod download

# ソースコードのコピー
COPY . .

# 開発環境では直接go runで実行（ホットリロード対応）
CMD ["go", "run", "./cmd/server/main.go"]
