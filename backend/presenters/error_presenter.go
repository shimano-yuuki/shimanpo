package presenters

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// IErrorPresenter はエラープレゼンターのインターフェース
type IErrorPresenter interface {
	PresentBadRequest(c *gin.Context, message string) error
	PresentInternalServerError(c *gin.Context, err error) error
	PresentNotFound(c *gin.Context, message string) error
}

// ErrorPresenter はエラープレゼンターの実装
type ErrorPresenter struct{}

// NewErrorPresenter は新しいErrorPresenterを作成
func NewErrorPresenter() IErrorPresenter {
	return &ErrorPresenter{}
}

// PresentBadRequest は400エラーレスポンスを生成
func (p *ErrorPresenter) PresentBadRequest(c *gin.Context, message string) error {
	response := struct {
		Error string `json:"error"`
	}{
		Error: message,
	}
	c.JSON(http.StatusBadRequest, response)
	return nil
}

// PresentInternalServerError は500エラーレスポンスを生成
func (p *ErrorPresenter) PresentInternalServerError(c *gin.Context, err error) error {
	response := struct {
		Error string `json:"error"`
	}{
		Error: "Internal server error",
	}
	c.JSON(http.StatusInternalServerError, response)
	return nil
}

// PresentNotFound は404エラーレスポンスを生成
func (p *ErrorPresenter) PresentNotFound(c *gin.Context, message string) error {
	response := struct {
		Error string `json:"error"`
	}{
		Error: message,
	}
	c.JSON(http.StatusNotFound, response)
	return nil
}
