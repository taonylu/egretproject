/**
*  功    能：关卡选择界面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var LevelScene = (function (_super) {
    __extends(LevelScene, _super);
    function LevelScene() {
        _super.call(this);
        this.levelBtnList = [];
        this.levelBtnMax = 6;
        this.skinName = "resource/myskins/LevelSceneSkin.exml";
    }
    var d = __define,c=LevelScene;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.onEnable();
        this.createLevelBtn();
    };
    p.onEnable = function () {
        this.initTitle();
        this.configListeners();
    };
    p.onRemove = function () {
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.deConfigListeners = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.onTouchTap = function (e) {
        console.log("点击关卡", e.target);
        if (e.target instanceof LevelBtnUI) {
            var levelBtn = e.target;
            GameManager.getInstance().startGame(levelBtn.levelNum);
        }
        else if (e.target == this.backBtn) {
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        }
    };
    p.initTitle = function () {
        var titleUI = GameManager.getInstance().titleUI;
        this.addChild(titleUI);
        titleUI.setTitle("选择一个关卡");
    };
    p.createLevelBtn = function () {
        for (var i = 1; i <= this.levelBtnMax; i++) {
            var levelBtn = new LevelBtnUI();
            if (i % 2 == 0) {
                levelBtn.horizontalCenter = 120;
            }
            else {
                levelBtn.horizontalCenter = -120;
            }
            levelBtn.y = 170 * (Math.ceil(i / 2));
            levelBtn.levelNum = i;
            levelBtn.setLevelNumLabel(i);
            levelBtn.setTitleLabel("新手");
            levelBtn.setFishLabel(0);
            levelBtn.setStarLabel(0);
            this.addChild(levelBtn);
        }
    };
    return LevelScene;
})(BaseScene);
egret.registerClass(LevelScene,"LevelScene");
