/**
 * 结算面板UI
 * @author
 *
 */
var ResultUI = (function (_super) {
    __extends(ResultUI, _super);
    function ResultUI() {
        _super.call(this, "ResultUISkin");
    }
    var d = __define,c=ResultUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.setScoreLabel = function (score) {
        this.scoreLabel.text = score.toString();
    };
    p.setTelLabel = function (tel) {
        this.telLabel.text = tel.toString();
    };
    //清理
    p.clear = function () {
        this.scoreLabel.text = "";
        this.telLabel.text = "";
    };
    return ResultUI;
})(BaseUI);
egret.registerClass(ResultUI,'ResultUI');
