/**
 * 我的奖品
 * @author
 *
 */
var MyPrizeUI = (function (_super) {
    __extends(MyPrizeUI, _super);
    //private detailScroller:eui.Scroller; //详情页滚动条
    function MyPrizeUI() {
        _super.call(this, "MyPrizeUISkin");
        this.code = "AAA"; //兑换码
        this.detailList = new Array(); //详情页分页Group
        this.prizeNum = 7;
        //this.percentHeight = 100;
    }
    var d = __define,c=MyPrizeUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        //this.detailScroller.bounces = false;
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
        //显示详情页
        this.codeLabel.text = "";
        for (var i = 0; i < this.prizeNum; i++) {
            this.detailList[i].visible = false;
            ;
        }
        if (this.detailList[prizeID - 1]) {
            this.detailList[prizeID - 1].visible = true; //奖品id 1-8， 详情页0-6，现金无详情页，所以少一页
            this.codeLabel.text = "兑换码:" + this.code;
            this.detailGroup.visible = true;
            //监听
            this.detailGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailTouch, this);
        }
    };
    p.onDetailTouch = function (e) {
        console.log(e.target, e.currentTarget);
        if (e.target instanceof eui.Label) {
            return;
        }
        this.detailGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetailTouch, this);
        this.detailGroup.visible = false;
    };
    return MyPrizeUI;
})(BaseUI);
egret.registerClass(MyPrizeUI,'MyPrizeUI');
