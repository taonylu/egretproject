/**
 * 倒计时UI
 * @author
 *
 */
var CountDownUI = (function (_super) {
    __extends(CountDownUI, _super);
    function CountDownUI() {
        _super.call(this, "CountDownUISkin");
    }
    var d = __define,c=CountDownUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.show = function (doc) {
        this.x = (GameConst.stage.stageWidth - this.width) / 2;
        this.y = (GameConst.stage.stageHeight - this.height) / 2;
        doc.addChild(this);
    };
    p.setTimeLabel = function (time) {
        this.timeLabel.text = time + "";
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return CountDownUI;
}(BaseUI));
egret.registerClass(CountDownUI,'CountDownUI');
