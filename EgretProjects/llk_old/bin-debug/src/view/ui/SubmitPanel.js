/**
*  文 件 名：SubmitPanel.ts
*  功    能：提交分数
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
var SubmitPanel = (function (_super) {
    __extends(SubmitPanel, _super);
    function SubmitPanel() {
        _super.call(this);
        this.skinName = skins.ui.SubmitPanelSkin;
    }
    var __egretProto__ = SubmitPanel.prototype;
    __egretProto__.childrenCreated = function () {
        this.submitBtn.touchEnabled = true;
        this.submitBtn.touchChildren = false;
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    __egretProto__.setScoreLabel = function () {
        var facade = ApplicationFacade.getInstance();
        var gameMediator = facade.retrieveMediator(GameMediator.NAME);
        var score = gameMediator.gameScene.score;
        var leftTime = gameMediator.gameScene.leftTime;
        if (leftTime >= 0) {
            score += leftTime;
        }
        if (this.initialized) {
            this.scoreLabel.text = "总得分:" + score;
        }
        else {
            var self = this;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE, function () {
                self.scoreLabel.text = "总得分" + score;
            }, this);
        }
    };
    __egretProto__.onTouchTap = function () {
        console.log("submit score...");
        var facade = ApplicationFacade.getInstance();
        var gameMediator = facade.retrieveMediator(GameMediator.NAME);
        var score = gameMediator.gameScene.score;
        var leftTime = gameMediator.gameScene.leftTime;
        if (leftTime >= 0) {
            score += leftTime;
        }
        var userDataProxy = facade.retrieveProxy(UserDataProxy.NAME);
        var json = new SubmitScoreJSON();
        json.name = userDataProxy.userName;
        json.score = score;
        ClientSocket.getInstance().send(json.getJSONString());
        //模拟接收
        //        var json: RankJSON = new RankJSON();
        //        json.cmd = 1001;
        //        json.len = 2;
        //        json.name[0] = "a";
        //        json.score[0] = 1;
        //        json.name[1] = "b";
        //        json.score[1] = 123;
        //        ClientSocket.getInstance().msgHandler(json.getJSONString());    
    };
    __egretProto__.hide = function () {
        this.parent && LayerManager.getInstance().uiPopLayer.removeElement(this);
    };
    return SubmitPanel;
})(egret.gui.SkinnableComponent);
SubmitPanel.prototype.__class__ = "SubmitPanel";
