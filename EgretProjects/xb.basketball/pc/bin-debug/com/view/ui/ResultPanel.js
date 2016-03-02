/**
 *
 * @author
 *
 */
var ResultPanel = (function (_super) {
    __extends(ResultPanel, _super);
    function ResultPanel() {
        _super.call(this, "ResultPanelSkin");
    }
    var d = __define,c=ResultPanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.setScore = function (score) {
        this.scoreLabel.text = score + "";
    };
    return ResultPanel;
})(BaseUI);
egret.registerClass(ResultPanel,'ResultPanel');
