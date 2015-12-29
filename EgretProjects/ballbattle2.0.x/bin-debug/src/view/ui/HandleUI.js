/**
*  文 件 名：HandleUI.ts
*  功    能: 圆形控制杆
*  内    容： 游戏中手指点击屏幕后，指示小球移动方向的圆形图标
*  作    者： 羊力大仙
*  生成日期：2015/9/18
*  修改日期：2015/9/18
*  修改日志：
*/
var HandleUI = (function (_super) {
    __extends(HandleUI, _super);
    function HandleUI() {
        _super.call(this);
        this.radius = 0; //半径
        this.centerX = 0; //中心点x
        this.centerY = 0; //中心点y
        this.circleFrame = new egret.Bitmap(RES.getRes("circleFrame_png"));
        this.addChild(this.circleFrame);
        this.circle = new egret.Bitmap(RES.getRes("circle_png"));
        this.circle.anchorOffsetX = this.circle.width / 2;
        this.circle.anchorOffsetY = this.circle.height / 2;
        this.addChild(this.circle);
        this.anchorOffsetX = this.circleFrame.width / 2;
        this.anchorOffsetY = this.circleFrame.height / 2;
        this.radius = (this.circleFrame.width - this.circle.width) / 2;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.reset();
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    var __egretProto__ = HandleUI.prototype;
    __egretProto__.show = function (x, y, doc) {
        this.x = x;
        this.y = y;
        doc.addChild(this);
    };
    __egretProto__.setCirclePos = function (angle) {
        this.circle.x = Math.cos(angle) * this.radius + this.centerX;
        this.circle.y = Math.sin(angle) * this.radius + this.centerY;
    };
    __egretProto__.hide = function () {
        this.reset();
        this.parent && this.parent.removeChild(this);
    };
    __egretProto__.reset = function () {
        this.circle.x = this.centerX;
        this.circle.y = this.centerY;
    };
    return HandleUI;
})(egret.DisplayObjectContainer);
HandleUI.prototype.__class__ = "HandleUI";
