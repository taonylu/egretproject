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
        this.percentWidth = 100;
        this.percentHeight = 100;
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
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().rankPanel);
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
            this.imageLoaderList[i].clear();
        }
        //设置新的
        var teamLen = data.length;
        for (var i = 0; i < teamLen; i++) {
            var team = data[i];
            this["teamLabel" + i].text = team.teamName;
            var member = team.member;
            for (var j = 0; j < member.length; j++) {
                var index = j + 3 * i; //ui组件的数组下标
                this.memberNameList[index].text = member[j].nickName;
                this.memberScoreList[index].text = member[j].score;
                var imageLoader = this.imageLoaderList[index];
                imageLoader.doc = this.memberHeadList[index];
                imageLoader.load(member[j].headImg);
            }
        }
    };
    return MyTeamPanel;
}(BaseUI));
egret.registerClass(MyTeamPanel,'MyTeamPanel');
