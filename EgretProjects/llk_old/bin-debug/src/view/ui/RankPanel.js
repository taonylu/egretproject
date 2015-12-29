/**
*  文 件 名：RankPanel.ts
*  功    能：排行榜
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
var RankPanel = (function (_super) {
    __extends(RankPanel, _super);
    function RankPanel() {
        _super.call(this);
        this.nameList = new Array();
        this.scoreList = new Array();
        this.skinName = skins.ui.RankPanelSkin;
    }
    var __egretProto__ = RankPanel.prototype;
    __egretProto__.onEnable = function () {
        this.nameList.push(this.name1Label, this.name2Label, this.name3Label);
        this.scoreList.push(this.score1Label, this.score2Label, this.score3Label);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
    };
    __egretProto__.onCloseBtnTouch = function () {
        this.hide();
        ApplicationFacade.getInstance().sendNotification(GameMediator.PLAY_AGAIN);
    };
    __egretProto__.showRank = function (data) {
        LayerManager.getInstance().uiPopLayer.addElement(this);
        for (var i = 0; i < 3; i++) {
            if (i < data.len) {
                this.nameList[i].text = StringTool.mixUnicodeToCh(data.name[i]);
                this.scoreList[i].text = data.score[i].toString();
            }
            else {
                this.nameList[i].text = "";
                this.scoreList[i].text = "";
            }
        }
    };
    __egretProto__.hide = function () {
        this.parent && LayerManager.getInstance().uiPopLayer.removeElement(this);
    };
    return RankPanel;
})(egret.gui.SkinnableComponent);
RankPanel.prototype.__class__ = "RankPanel";
