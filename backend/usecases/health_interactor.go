package usecases

import (
	"context"

	"github.com/shimanotomoakira/shimanpo/backend/domain/entities"
	"github.com/shimanotomoakira/shimanpo/backend/usecases/input"
	"github.com/shimanotomoakira/shimanpo/backend/usecases/output"
)

// IHealthInteractor はヘルスチェックユースケースのインターフェース
type IHealthInteractor interface {
	Execute(ctx context.Context, in *input.HealthInput) (*output.HealthOutput, error)
}

// HealthInteractor はヘルスチェックユースケースの実装
type HealthInteractor struct{}

// NewHealthInteractor は新しいHealthInteractorを作成
func NewHealthInteractor() IHealthInteractor {
	return &HealthInteractor{}
}

// Execute はヘルスチェックを実行
func (i *HealthInteractor) Execute(ctx context.Context, in *input.HealthInput) (*output.HealthOutput, error) {
	health := entities.NewHealth("ok")
	return output.NewHealthOutput(health), nil
}
