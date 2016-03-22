/**
 * 我的团队
 * @author
 *
 */
var MyTeamPanel = (function (_super) {
    __extends(MyTeamPanel, _super);
    function MyTeamPanel() {
        _super.call(this, "MyTeamPanelSkin");
        this.memberHeadList = new Array();
        this.memberNameList = new Array();
        this.memberScoreList = new Array();
        this.memberNum = 6;
        this.imageLoaderList = new Array();
    }
    var d = __define,c=MyTeamPanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        for (var i = 0; i < this.memberNum; i++) {
            this.memberHeadList.push(this["memberHead" + i]);
            this.memberNameList.push(this["memberName" + i]);
            this.memberScoreList.push(this["memberScore" + i]);
            this.imageLoaderList.push(new CImageLoader());
        }
    };
    p.onEnable = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.onCloseTouch = function () {
        this.hide();
        GameManager.getInstance().homeScene.rankGroup.visible = true;
    };
    p.setView = function (data) {
        //清理
        this.teamLabel0.text = "";
        this.teamLabel1.text = "";
        for (var i = 0; i < this.memberNum; i++) {
            if (this.memberHeadList[i].numChildren > 0) {
                this.memberHeadList[i].removeChildAt(0);
            }
            this.memberNameList[i].text = "";
            this.memberScoreList[i].text = "";
        }
        //设置新的
        if (data[0] != undefined) {
            var team = data[0];
            this.teamLabel0.text = team.teamName;
            var member = team.member;
            for (var i = 0; i < team.totalScore; i++) {
                this.memberNameList[i].text = member[i].nickName;
                this.memberScoreList[i].text = member[i].score;
                var imageLoader = this.imageLoaderList[i];
                imageLoader.id = i;
                imageLoader.addEventListener(egret.Event.COMPLETE, this.loadCompleteHandler, this);
            }
        }
    };
    p.loadCompleteHandler = function (event) {
        var imageLoader = event.currentTarget;
        var bitmap = new egret.Bitmap(imageLoader.data);
        this.memberHeadList[imageLoader.id].addChild(bitmap);
    };
    return MyTeamPanel;
}(BaseUI));
egret.registerClass(MyTeamPanel,'MyTeamPanel');
