package output

import "github.com/shimanotomoakira/shimanpo/backend/domain/entities"

// HealthOutput はヘルスチェックユースケースからの出力
type HealthOutput struct {
	Health *entities.Health
}

// NewHealthOutput は新しいHealthOutputを作成
func NewHealthOutput(health *entities.Health) *HealthOutput {
	return &HealthOutput{
		Health: health,
	}
}

// GetHealth はHealthエンティティを取得
func (o *HealthOutput) GetHealth() *entities.Health {
	return o.Health
}
