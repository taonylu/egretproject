/**
*  文 件 名： GesturePinch.ts
*  功    能： 二指滑动，收缩和拉伸
*  内    容：
*  作    者： Rikimaru
*  生成日期： 2016/3/14
*  修改日期：
*  修改日志：
*
* Example:
*
*
*
*/
var GesturePinch = (function () {
    function GesturePinch(target) {
        this.touchIDList = new Array(); //触点ID
        this.initTouchPos = {}; //触点初始位置
        this.curTouchPos = {}; //触点当前位置
        this.target = target;
        this.start();
    }
    var d = __define,c=GesturePinch,p=c.prototype;
    p.start = function () {
        this.target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
    };
    p.stop = function () {
        this.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    };
    p.onTouchBegin = function (e) {
        this.touchIDLen = this.touchIDList.length;
        if (this.touchIDLen < 2) {
            this.touchIDList.push(e.touchPointID);
            this.initTouchPos[e.touchPointID] = new egret.Point(e.stageX, e.stageY);
            this.curTouchPos[e.touchPointID] = this.initTouchPos[e.touchPointID];
        }
        if (this.touchIDLen == 2) {
            this.target.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.initDist = egret.Point.distance(this.initTouchPos[this.touchIDList[0]], this.initTouchPos[this.touchIDList[1]]);
            this.startScale = this.target.scaleX;
            console.log("two fingers");
        }
    };
    p.onTouchMove = function (e) {
        this.curPot = this.curTouchPos[e.touchPointID];
        if (this.curPot) {
            this.curPot.x = e.stageX;
            this.curPot.y = e.stageY;
            var dist = egret.Point.distance(this.curTouchPos[this.touchIDList[0]], this.curTouchPos[this.touchIDList[1]]);
            var scale = (dist / this.initDist);
            this.target.scaleX = scale * this.startScale;
            this.target.scaleY = this.target.scaleX;
        }
    };
    p.onTouchEnd = function (e) {
        var index = this.touchIDList.indexOf(e.touchPointID);
        if (index != -1) {
            this.touchIDList.splice(index, 1);
        }
        if (this.touchIDList.length < 2) {
            this.target.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        }
    };
    p.destroy = function () {
        this.stop();
        this.target = null;
    };
    return GesturePinch;
})();
egret.registerClass(GesturePinch,'GesturePinch');
