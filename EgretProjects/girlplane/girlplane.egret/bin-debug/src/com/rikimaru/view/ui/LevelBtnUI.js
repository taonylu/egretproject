/**
*  文 件 名：LevelBtnUI.ts
*  功    能   : 关卡按钮
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
var LevelBtnUI = (function (_super) {
    __extends(LevelBtnUI, _super);
    function LevelBtnUI() {
        _super.call(this);
        /**状态数量*/
        this.stateNum = 3;
        this.touchChildren = false;
    }
    var __egretProto__ = LevelBtnUI.prototype;
    __egretProto__.childrenCreated = function () {
        this.starList = new Array();
        this.emptyList = new Array();
        this.btnList = new Array();
        this.starList.push(this.star1, this.star2, this.star3);
        this.emptyList.push(this.empty1, this.empty2, this.empty3);
        this.btnList.push(this.notRead, this.read, this.cur);
        this.setState(0 /* NotRead */);
        this.setStar(0);
        this.setLevelNum(0);
    };
    /**设置状态 0未解锁 1已过关 2当前所在关卡*/
    __egretProto__.setState = function (state) {
        for (var i = 0; i < this.stateNum; i++) {
            this.btnList[i].visible = false;
        }
        this.btnList[state].visible = true;
    };
    /**设置星星数*/
    __egretProto__.setStar = function (count) {
        for (var i = 0; i < this.stateNum; i++) {
            if (i < count) {
                this.starList[i].visible = true;
                this.emptyList[i].visible = false;
            }
            else {
                this.starList[i].visible = false;
                this.emptyList[i].visible = true;
            }
        }
    };
    /**设置关卡数*/
    __egretProto__.setLevelNum = function (count) {
        this.levelLabel.text = count.toString();
    };
    return LevelBtnUI;
})(egret.gui.SkinnableComponent);
LevelBtnUI.prototype.__class__ = "LevelBtnUI";
