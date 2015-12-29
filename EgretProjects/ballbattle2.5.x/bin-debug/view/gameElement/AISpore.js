/**
*  文 件 名：AISpore.ts
*  功    能：AI玩家
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/18
*  修改日期：2015/9/18
*  修改日志：
*/
var AIPlayer = (function (_super) {
    __extends(AIPlayer, _super);
    function AIPlayer() {
        _super.call(this);
        this.turnRoundLimit = 180;
        this.turnRoundCount = 180; //多久转换一次方向
    }
    var d = __define,c=AIPlayer;p=c.prototype;
    p.autoMove = function () {
        if (this.turnRound()) {
            console.log("auto move");
            this.moveToByAngle(Math.random() * 360);
        }
    };
    p.findTarget = function (target) {
        if (this.turnRound()) {
            console.log("find target");
            this.moveToByAngle(target.angle);
        }
    };
    p.escape = function (target) {
        if (this.turnRound()) {
            console.log("escaple");
            this.moveToByAngle(target.angle);
        }
    };
    p.turnRound = function () {
        this.turnRoundCount++;
        if (this.turnRoundCount > this.turnRoundLimit) {
            this.turnRoundCount = 0;
            return true;
        }
        return false;
    };
    return AIPlayer;
})(BaseSpore);
egret.registerClass(AIPlayer,"AIPlayer");
