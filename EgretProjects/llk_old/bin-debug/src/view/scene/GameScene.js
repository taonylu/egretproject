/**
*  文 件 名：GameScene.ts
*  功    能： 游戏场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.timeLimit = 30; //时间限制
        this.leftTime = 0; //剩余时间
        this.skinName = skins.scene.GameSceneSkin;
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.gameSprite = new GameSprite;
        this.gameSprite.touchEnabled = true;
        this.gameSprite.gameScene = this;
        var uiAsset = new egret.gui.UIAsset();
        uiAsset.source = this.gameSprite;
        uiAsset.touchChildren = true;
        this.gameGroup.addElement(uiAsset);
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.startGame();
    };
    __egretProto__.onRemove = function () {
    };
    //开始游戏
    __egretProto__.startGame = function () {
        //初始化游戏
        this.gameSprite.init();
        //面板
        this.submitPanel && this.submitPanel.hide();
        this.rankPanel && this.rankPanel.hide();
        //设置进度条
        this.leftTime = this.timeLimit;
        this.setProgress();
        //设置分数
        this.score = 0;
        this.addScore(0);
        //添加监听
        this.tishiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTishiBtnTouch, this);
        this.sortBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSortBtnTouch, this);
        this.quitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuitBtnTouch, this);
        //开始计时
        this.startTimer();
    };
    //重玩游戏
    __egretProto__.playAgain = function () {
        this.gameSprite.resetGame();
        this.startGame();
    };
    __egretProto__.onTishiBtnTouch = function () {
        console.log("click tishi...");
        this.gameSprite.tishi();
    };
    __egretProto__.onSortBtnTouch = function () {
        console.log("click sort...");
        this.gameSprite.sortBlock();
    };
    __egretProto__.onQuitBtnTouch = function () {
        this.stopTimer();
        this.gameSprite.resetGame();
        ApplicationFacade.getInstance().sendNotification(HomeMediator.SHOW);
    };
    __egretProto__.startTimer = function () {
        if (this.timer == null) {
            this.timer = new egret.Timer(1000);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.timer.reset();
        this.timer.start();
    };
    __egretProto__.stopTimer = function () {
        if (this.timer != null) {
            this.timer.stop();
            this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        }
    };
    __egretProto__.onTimerHandler = function (e) {
        this.leftTime = this.timeLimit - this.timer.currentCount;
        if (this.leftTime > -1) {
            this.setProgress();
        }
        else {
            this.gameSprite.gameLose();
        }
    };
    __egretProto__.setProgress = function () {
        this.timeLabel.text = this.leftTime.toString();
        this.progressBar.scaleX = this.leftTime / this.timeLimit;
    };
    __egretProto__.addScore = function (add) {
        this.score += add;
        this.scoreLabel.text = "得分：" + this.score;
    };
    __egretProto__.showSubmitPanel = function () {
        if (this.submitPanel == null) {
            this.submitPanel = new SubmitPanel();
        }
        this.submitPanel.setScoreLabel();
        LayerManager.getInstance().uiPopLayer.addElement(this.submitPanel);
    };
    __egretProto__.hideSubmitPanel = function () {
        this.submitPanel && this.submitPanel.hide();
    };
    __egretProto__.showRank = function (data) {
        this.hideSubmitPanel();
        this.showRankPanel(data);
    };
    __egretProto__.showRankPanel = function (data) {
        if (this.rankPanel == null) {
            this.rankPanel = new RankPanel();
        }
        LayerManager.getInstance().uiPopLayer.addElement(this.rankPanel);
        if (this.rankPanel.initialized) {
            this.rankPanel.showRank(data);
        }
        else {
            var self = this;
            this.rankPanel.childrenCreated = function () {
                self.rankPanel.onEnable();
                self.rankPanel.showRank(data);
            };
        }
    };
    __egretProto__.hideRankPanel = function () {
        if (this.rankPanel != null) {
            this.rankPanel.hide();
        }
    };
    return GameScene;
})(BaseScene);
GameScene.prototype.__class__ = "GameScene";
