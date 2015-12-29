/**
*  文 件 名：PaoPao.ts
*  功    能：玩家吐出的泡泡
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/10/12
*  修改日期：2015/10/12
*  修改日志：
*/
var PaoPao = (function (_super) {
    __extends(PaoPao, _super);
    function PaoPao() {
        _super.call(this);
        this.isChecked = false; //已碰撞检测过，防止碰撞检测时，同时被多个玩家重复吃掉
        this.isCanColliseSelf = false; //泡泡刚吐出来时，不能立刻检查和自己孢子的碰撞
        this.weight = GameConst.paopaoWeight;
        this.width = GameConst.paopaoInitWidth * 2 + this.weight * GameConst.addRaduisRate;
        this.raduis = this.width / 2;
        this.graphics.beginFill(0xff0000);
        this.graphics.drawCircle(this.raduis, this.raduis, this.raduis);
        this.graphics.endFill();
        this.anchorOffsetX = this.raduis;
        this.anchorOffsetY = this.raduis;
    }
    var d = __define,c=PaoPao;p=c.prototype;
    //从指定位置缓动到前方一定距离
    p.movefrom = function (xPos, yPos, angle) {
        xPos += Math.cos(angle) * GameConst.paopaoMoveDis;
        yPos += Math.sin(angle) * GameConst.paopaoMoveDis;
        egret.Tween.get(this).to({ x: xPos, y: yPos }, GameConst.fenlieTime, egret.Ease.quadOut).call(function () {
            this.isCanColliseSelf = true;
        }, this);
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
    };
    return PaoPao;
})(egret.Sprite);
egret.registerClass(PaoPao,"PaoPao");
