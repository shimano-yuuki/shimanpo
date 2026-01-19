package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/shimanotomoakira/shimanpo/backend/controllers"
	"github.com/shimanotomoakira/shimanpo/backend/infrastructure"
	"github.com/shimanotomoakira/shimanpo/backend/presenters"
	"github.com/shimanotomoakira/shimanpo/backend/usecases"
)

func main() {
	// 環境変数の読み込み
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// データベース接続（必要に応じて使用）
	_, err := infrastructure.NewDB()
	if err != nil {
		log.Printf("Warning: Database connection failed: %v", err)
		log.Println("Continuing without database connection...")
	}

	// ルーターの初期化
	r := infrastructure.NewRouter()

	// 依存性の注入
	healthInteractor := usecases.NewHealthInteractor()
	healthPresenter := presenters.NewHealthPresenter()
	errorPresenter := presenters.NewErrorPresenter()
	healthController := controllers.NewHealthController(
		healthInteractor,
		healthPresenter,
		errorPresenter,
	)

	// ルーティング設定
	r.GET("/health", healthController.GetHealth)

	// サーバーの起動
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
