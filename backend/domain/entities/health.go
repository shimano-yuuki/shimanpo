package entities

// Health はヘルスチェック用のエンティティ
type Health struct {
	Status string
}

// NewHealth は新しいHealthエンティティを作成
func NewHealth(status string) *Health {
	return &Health{
		Status: status,
	}
}

// GetStatus はステータスを取得
func (h *Health) GetStatus() string {
	return h.Status
}
