/**
 * 弹幕UI
 * @author
 *
 */
var BarrageUI = (function (_super) {
    __extends(BarrageUI, _super);
    function BarrageUI() {
        _super.call(this);
        this.width = GameConst.stage.width;
        this.height = GameConst.stage.height;
        this.touchChildren = false;
        this.touchEnabled = false;
    }
    var d = __define,c=BarrageUI,p=c.prototype;
    //显示一条弹幕
    p.showOne = function (msg) {
    };
    return BarrageUI;
})(egret.Sprite);
egret.registerClass(BarrageUI,'BarrageUI');
