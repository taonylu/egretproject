/**
 *
 * @author
 *
 */
var MsgPanel = (function (_super) {
    __extends(MsgPanel, _super);
    function MsgPanel() {
        _super.call(this);
    }
    var __egretProto__ = MsgPanel.prototype;
    __egretProto__.show = function (msg) {
        if (this.txt == null) {
            this.txt = new egret.TextField();
        }
        LayerManager.getInstance().stage.addChild(this.txt);
        this.txt.text = msg;
        var self = this;
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).wait(5000).call(function () {
            self.parent && self.parent.removeChild(self);
        });
    };
    return MsgPanel;
})(egret.Sprite);
MsgPanel.prototype.__class__ = "MsgPanel";
