package api

// HealthResponse はヘルスチェックAPIのレスポンス
type HealthResponse struct {
	Status string `json:"status"`
}
