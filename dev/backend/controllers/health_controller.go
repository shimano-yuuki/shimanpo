package controllers

import (
	"github.com/gin-gonic/gin"
	"github.com/shimanotomoakira/shimanpo/backend/presenters"
	"github.com/shimanotomoakira/shimanpo/backend/usecases"
	"github.com/shimanotomoakira/shimanpo/backend/usecases/input"
)

// HealthController はヘルスチェックコントローラー
type HealthController struct {
	healthInteractor usecases.IHealthInteractor
	healthPresenter  presenters.IHealthPresenter
	errorPresenter   presenters.IErrorPresenter
}

// NewHealthController は新しいHealthControllerを作成
func NewHealthController(
	healthInteractor usecases.IHealthInteractor,
	healthPresenter presenters.IHealthPresenter,
	errorPresenter presenters.IErrorPresenter,
) *HealthController {
	return &HealthController{
		healthInteractor: healthInteractor,
		healthPresenter:  healthPresenter,
		errorPresenter:   errorPresenter,
	}
}

// GetHealth はヘルスチェックエンドポイントのハンドラー
func (c *HealthController) GetHealth(ctx *gin.Context) {
	input := input.NewHealthInput()
	output, err := c.healthInteractor.Execute(ctx.Request.Context(), input)
	if err != nil {
		c.errorPresenter.PresentInternalServerError(ctx, err)
		return
	}

	if err := c.healthPresenter.PresentHealth(ctx, output); err != nil {
		c.errorPresenter.PresentInternalServerError(ctx, err)
		return
	}
}
