/**
 * 主页摇头的girl
 * @author
 *
 */
var PlayerUI = (function (_super) {
    __extends(PlayerUI, _super);
    function PlayerUI() {
        _super.call(this);
    }
    var d = __define,c=PlayerUI,p=c.prototype;
    p.shakeHead = function () {
        this.girl0.visible = true;
        this.girl1.visible = false;
        var self = this;
        egret.Tween.get(this, { loop: true }).call(function () {
            self.girl0.visible = false;
            self.girl1.visible = true;
        }).wait(300).
            call(function () {
            self.girl0.visible = true;
            self.girl1.visible = false;
        }).wait(300);
    };
    p.stopShake = function () {
        egret.Tween.removeTweens(this);
    };
    return PlayerUI;
}(eui.Component));
egret.registerClass(PlayerUI,'PlayerUI');
