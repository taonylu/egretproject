/**
 * 获奖列表
 * @author
 *
 */
var PrizePanel = (function (_super) {
    __extends(PrizePanel, _super);
    function PrizePanel() {
        _super.call(this, "PrizePanelSkin");
        this.weekLabelList = new Array(); //周榜
        this.weekNum = 6; //周榜显示数量
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=PrizePanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        for (var i = 0; i < this.weekNum; i++) {
            this.weekLabelList.push(this["weekLabel" + i]);
        }
    };
    p.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.leaderBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaderBtnTouch, this);
    };
    p.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.leaderBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaderBtnTouch, this);
    };
    p.onCloseBtnTouch = function () {
        this.hide();
        if (GameConst.prizeLastView == GameManager.getInstance().homeScene) {
            GameManager.getInstance().homeScene.rankGroup.visible = true;
        }
        else {
            LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().rankPanel);
        }
    };
    p.onLeaderBtnTouch = function () {
        this.hide();
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().teamForm);
    };
    p.setView = function (data) {
        //清零显示
        for (var i = 0; i < this.weekNum; i++) {
            this.weekLabelList[i].text = "";
        }
        this.fourLabel.text = "";
        //显示周榜和四强
        var weekRank = data.weekRank;
        var rankWin = data.rankWin;
        var len = weekRank.length;
        len = (len > 6) ? 6 : len;
        len = (len > this.weekNum) ? this.weekNum : len;
        for (var i = 0; i < len; i++) {
            var teamName = weekRank[i].teamName;
            var teamScore = weekRank[i].teamScore;
            this.weekLabelList[i].text = "第" + (i + 1) + "周最高奖：" + teamName;
        }
        len = rankWin.length;
        len = (len > 4) ? 4 : len;
        for (var i = 0; i < len; i++) {
            this.fourLabel.text += rankWin[i].teamName + " ";
        }
    };
    return PrizePanel;
}(BaseUI));
egret.registerClass(PrizePanel,'PrizePanel');
