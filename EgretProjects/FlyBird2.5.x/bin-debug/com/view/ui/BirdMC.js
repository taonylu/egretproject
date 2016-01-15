/**
 * 小鸟
 * @author 羊力大仙
 * @date 2015.10.27
 */
var BirdMC = (function (_super) {
    __extends(BirdMC, _super);
    function BirdMC() {
        _super.call(this, "bird_png", "bird_json", "flappybird");
        this.upforce = 8; //上升力
        this.speedY = 0; //y速度
        this.width = 50;
        this.height = 50;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.hitRect = new egret.Rectangle(0, 0, 20, 20);
    }
    var d = __define,c=BirdMC,p=c.prototype;
    //向上一个力，飞一下
    p.fly = function () {
        this.speedY = -this.upforce;
    };
    return BirdMC;
})(SimpleMC);
egret.registerClass(BirdMC,'BirdMC');
