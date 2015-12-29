/**
*  文 件 名：Rect.ts
*  功    能：六角型方块
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.call(this);
        this.weight = 0;
        this.isChecked = false; //碰撞检测中，防止同时被多个玩家同时吃掉
        this.weight = GameConst.rectInitWeight;
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.cacheAsBitmap = true;
    }
    var d = __define,c=Rect;p=c.prototype;
    p.reset = function () {
        var rand = NumberTool.getRandomInt(0, 3);
        this.texture = RES.getRes("sixrect" + rand + "_png");
        this.visible = false;
        this.isChecked = false;
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Rect.NAME).returnObject(this);
    };
    Rect.NAME = "Rect";
    return Rect;
})(egret.Bitmap);
egret.registerClass(Rect,"Rect");
