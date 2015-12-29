/**
*  功    能：排行榜
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
var RankUI = (function (_super) {
    __extends(RankUI, _super);
    function RankUI() {
        _super.call(this);
        this.nameList = [];
        this.scoreList = [];
        this.skinName = "resource/myskins/RankUISkin.exml";
    }
    var d = __define,c=RankUI;p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
        this.rank(JsonManager.revSubmit);
    };
    p.initView = function () {
        this.quitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQuitBtnTouch, this);
        for (var i = 0; i < 3; i++) {
            this.nameList.push(this["name" + i + "Label"]);
            this.scoreList.push(this["score" + i + "Label"]);
        }
    };
    p.show = function (doc) {
        this.x = (doc.width - this.width) / 2;
        this.y = (doc.height - this.height) / 2;
        doc.addChild(this);
    };
    p.rank = function (json) {
        JsonManager.revSubmit = json;
        if (this.inited) {
            var data = JsonManager.revSubmit;
            for (var i = 0; i < 3; i++) {
                if (data.scorelist[i] != null && data.scorelist[i][0] != "") {
                    this.nameList[i].text = data.scorelist[i][0];
                    this.scoreList[i].text = data.scorelist[i][1];
                }
                else {
                    this.nameList[i].text = "";
                    this.scoreList[i].text = "";
                }
            }
        }
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    p.onQuitBtnTouch = function () {
        GameManager.getInstance().gameScene.quitGame();
    };
    return RankUI;
})(BaseUI);
egret.registerClass(RankUI,"RankUI");
