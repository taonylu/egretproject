/**
 *
 * @author
 *
 */
var LifeUI = (function (_super) {
    __extends(LifeUI, _super);
    function LifeUI() {
        _super.call(this);
        this.lifeList = [];
        for (var i = 0; i < 3; i++) {
            var life = new egret.Bitmap(RES.getRes("life_png"));
            life.x = i * (10 + life.width);
            this.addChild(life);
            this.lifeList.push(life);
        }
    }
    var d = __define,c=LifeUI;p=c.prototype;
    p.setLife = function (lifeNum) {
        for (var i = 0; i < 3; i++) {
            if (i < lifeNum) {
                this.lifeList[i].visible = true;
            }
            else {
                this.lifeList[i].visible = false;
            }
        }
    };
    return LifeUI;
})(egret.DisplayObjectContainer);
egret.registerClass(LifeUI,"LifeUI");
