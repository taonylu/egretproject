/**
 * 击杀榜UI
 * @author
 *
 */
var KillHeadUI = (function (_super) {
    __extends(KillHeadUI, _super);
    function KillHeadUI() {
        _super.call(this);
        this.skinName = "KillHeadUISkin";
    }
    var d = __define,c=KillHeadUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.setValue = function (headUrl, kill) {
        this.headUI.loadImg(headUrl);
        this.killLabel.text = "X  " + kill;
        this._Label.visible = true;
        this.tank.visible = true;
    };
    p.clear = function () {
        this.headUI.clear();
        this.killLabel.text = "";
        this._Label.visible = false;
        this.tank.visible = false;
    };
    return KillHeadUI;
}(BaseUI));
egret.registerClass(KillHeadUI,'KillHeadUI');
