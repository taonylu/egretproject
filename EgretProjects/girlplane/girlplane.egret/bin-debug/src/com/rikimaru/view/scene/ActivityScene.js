/**
*  文 件 名：ActivityScene.ts
*  功    能：活动界面
*  内    容：
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/22
*  修改日志：
*/
var ActivityScene = (function (_super) {
    __extends(ActivityScene, _super);
    function ActivityScene() {
        _super.call(this);
        this.delay = 300;
        this.dist = 15;
        this.skinName = skins.scene.ActivitySceneSkin;
    }
    var __egretProto__ = ActivityScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.knowPng.touchEnabled = false;
        this.radioList = new Array();
        this.radioList.push(this.radio1, this.radio2, this.radio3, this.radio4);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.scroll.addEventListener(ScrollEvent.CHANGE_START, this.onScrollChangeStart, this);
        this.moveArrowToLeft();
    };
    __egretProto__.onEnable = function () {
        this.moveArrowToLeft();
    };
    __egretProto__.onRemove = function () {
        this.stopArrowMove();
    };
    __egretProto__.onTouchTap = function (e) {
        switch (e.target) {
            case this.leftArrow:
                this.scroll.scrollToLeft();
                break;
            case this.rightArrow:
                this.scroll.scrollToRight();
                break;
            case this.konwBtn:
                this.stopArrowMove();
                LayerManager.getInstance().replaceScene(GameConfig.SN_LoadingA);
                LoadManager.getInstance().loadGroup(GameConfig.GN_Home, this, function () {
                    LayerManager.getInstance().replaceScene(GameConfig.SN_Home);
                });
                break;
        }
    };
    /**点击箭头后，改变radio*/
    __egretProto__.onScrollChangeStart = function () {
        var radio = this.radioList[this.scroll.itemCount];
        this.circle.x = radio.x;
        this.circle.y = radio.y;
    };
    /**箭头动画*/
    __egretProto__.moveArrowToLeft = function () {
        egret.Tween.get(this.leftArrow).to({ x: this.leftArrow.x + this.dist, ease: egret.Ease.quartOut }, this.delay);
        egret.Tween.get(this.rightArrow).to({ x: (this.rightArrow.x - this.dist), ease: egret.Ease.quartOut }, this.delay).call(this.moveArrowToRight, this);
    };
    /**箭头动画*/
    __egretProto__.moveArrowToRight = function () {
        egret.Tween.get(this.leftArrow).to({ x: this.leftArrow.x - this.dist, ease: egret.Ease.quartOut }, this.delay);
        egret.Tween.get(this.rightArrow).to({ x: (this.rightArrow.x + this.dist), ease: egret.Ease.quartOut }, this.delay).call(this.moveArrowToLeft, this);
    };
    /**移除箭头动画*/
    __egretProto__.stopArrowMove = function () {
        egret.Tween.removeTweens(this.leftArrow);
        egret.Tween.removeTweens(this.rightArrow);
    };
    return ActivityScene;
})(BaseScene);
ActivityScene.prototype.__class__ = "ActivityScene";
