package input

// HealthInput はヘルスチェックユースケースへの入力
type HealthInput struct{}

// NewHealthInput は新しいHealthInputを作成
func NewHealthInput() *HealthInput {
	return &HealthInput{}
}
