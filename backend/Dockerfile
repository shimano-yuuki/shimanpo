FROM golang:1.21-alpine

WORKDIR /app

# 依存関係のコピーとインストール
COPY go.mod go.sum ./
RUN go mod download

# ソースコードのコピー
COPY . .

# ビルド
RUN go build -o bin/server ./cmd/server

# 実行
CMD ["./bin/server"]
