/**
 * 我的奖品
 * @author
 *
 */
var MyPrizeUI = (function (_super) {
    __extends(MyPrizeUI, _super);
    function MyPrizeUI() {
        _super.call(this, "MyPrizeUISkin");
        this.detailList = new Array(); //详情页分页Group
        this.prizeNum = 8;
        this.beginY = 0;
        this.percentHeight = 100;
    }
    var d = __define,c=MyPrizeUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.detailScroller.bounces = false;
        //初始化详情页
        this.detailGroup.visible = false;
        for (var i = 1; i <= this.prizeNum; i++) {
            this.detailList.push(this["detail" + i]);
        }
    };
    p.show = function (json) {
        //初始化文本
        this.prizeID0 = "";
        this.prizeID1 = "";
        this.contentLabel0.text = "";
        this.contentLabel1.text = "";
        this.detailScroller.touchChildren = false;
        this.detailScroller.touchEnabled = false;
        //显示奖品1
        if (json[0]) {
            this.prizeID0 = json[0].prizenum;
            this.contentLabel0.text = json[0].prizemsg;
            this.contentLabel0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabel0Touch, this);
        }
        //显示奖品2
        if (json[1]) {
            this.prizeID1 = json[1].prizenum;
            this.contentLabel1.text = json[1].prizemsg;
            this.contentLabel1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabel1Touch, this);
        }
        LayerManager.getInstance().popLayer.addChild(this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    };
    p.onOKBtnTouch = function () {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
        this.parent && this.parent.removeChild(this);
    };
    p.onLabel0Touch = function () {
        this.showDetail(parseInt(this.prizeID0));
    };
    p.onLabel1Touch = function () {
        this.showDetail(parseInt(this.prizeID1));
    };
    p.showDetail = function (prizeID) {
        this.detailScroller.touchChildren = true;
        this.detailScroller.touchEnabled = true;
        //清理详情页
        this.codeLabel.text = "";
        //显示详情页
        this.codeLabel.text = "";
        for (var i = 0; i < this.prizeNum; i++) {
            this.detailList[i] && (this.detailList[i].visible = false);
        }
        if (this.detailList[prizeID - 1]) {
            this.detailList[prizeID - 1].visible = true; //奖品id 1-8， 详情页0-6，现金无详情页，所以少一页
            //this.codeLabel.text = "兑换号:" + GameConst.phone;
            this.codeLabel.text = "兑换号:" + egret.localStorage.getItem("gzrb");
            this.detailGroup.visible = true;
            //监听
            this.detailGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDetailBegin, this);
            this.detailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailTouch, this);
        }
    };
    p.onDetailBegin = function (e) {
        this.beginY = e.stageY;
    };
    p.onDetailTouch = function (e) {
        if (e.stageY != this.beginY) {
            return;
        }
        this.detailGroup.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onDetailBegin, this);
        this.detailGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailTouch, this);
        this.detailGroup.visible = false;
        this.detailScroller.touchChildren = false;
        this.detailScroller.touchEnabled = false;
    };
    return MyPrizeUI;
})(BaseUI);
egret.registerClass(MyPrizeUI,'MyPrizeUI');
