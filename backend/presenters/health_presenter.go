package presenters

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/shimanotomoakira/shimanpo/backend/api"
	"github.com/shimanotomoakira/shimanpo/backend/usecases/output"
)

// IHealthPresenter はヘルスチェックプレゼンターのインターフェース
type IHealthPresenter interface {
	PresentHealth(c *gin.Context, out *output.HealthOutput) error
}

// HealthPresenter はヘルスチェックプレゼンターの実装
type HealthPresenter struct{}

// NewHealthPresenter は新しいHealthPresenterを作成
func NewHealthPresenter() IHealthPresenter {
	return &HealthPresenter{}
}

// PresentHealth はヘルスチェックのレスポンスを生成
func (p *HealthPresenter) PresentHealth(c *gin.Context, out *output.HealthOutput) error {
	response := api.HealthResponse{
		Status: out.GetHealth().GetStatus(),
	}
	c.JSON(http.StatusOK, response)
	return nil
}
