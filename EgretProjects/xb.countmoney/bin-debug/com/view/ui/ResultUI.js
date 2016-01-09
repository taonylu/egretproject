/**
 * 结果UI
 * @author
 *
 */
var ResultUI = (function (_super) {
    __extends(ResultUI, _super);
    function ResultUI() {
        _super.call(this, "ResultUISkin");
    }
    var d = __define,c=ResultUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initShareBtnY = this.shareBtn.y;
    };
    p.showInScene = function (doc, totalPacket) {
        doc.addChild(this);
        //分享按钮动画
        egret.Tween.get(this.shareBtn, { loop: true }).to({ y: this.initShareBtnY + 15 }, 500).to({ y: this.initShareBtnY }, 500);
        //this.packetLabel.text = totalPacket.toString();
        this.countLabel.text = "你数了" + totalPacket + "个红包";
        var rate = Math.round(totalPacket / 110 * 100);
        if (totalPacket > 150) {
            rate = 100;
        }
        else if (totalPacket > 130) {
            rate = 99;
        }
        else if (totalPacket >= 110) {
            rate = 98;
        }
        this.fightLabel.text = "你打败了" + rate + "%的人"; //30暂定为最多数红包个数
        //监听
        this.configListeners();
    };
    p.hide = function () {
        //从场景移除
        this.parent && this.parent.removeChild(this);
        //停止分享按钮动画
        egret.Tween.removeTweens(this.shareBtn);
        //移除监听
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.openPacketBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.openPacketBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOpenBtnTouch, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.prizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPrizeBtnTouch, this);
    };
    //再拆一次
    p.onAgainBtnTouch = function () {
        this.hide();
        GameManager.getInstance().gameScene.startGame();
    };
    //去拆红包
    p.onOpenBtnTouch = function () {
        this.hide();
        LayerManager.getInstance().runScene(GameManager.getInstance().openScene);
    };
    //分享按钮
    p.onShareBtnTouch = function () {
        GameManager.getInstance().shareUI.show();
    };
    //我的奖品
    p.onPrizeBtnTouch = function () {
        this.deConfigListeners();
        var http = SingleHttp.getInstance();
        http.completeHandler = this.revMyPrize;
        http.errorHandler = this.onMyPrizeError;
        var url = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/prizeList";
        var msg = "";
        http.send(url, egret.HttpMethod.GET, msg, this);
    };
    //接收我的奖品请求结果
    p.revMyPrize = function (result) {
        this.configListeners();
        console.log("我的奖品:" + result);
        var json = JSON.parse(result);
        for (var item in json) {
            egret.log("查看奖品:" + json[item].prizenum, json[item].prizemsg);
        }
        GameManager.getInstance().myPrizeUI.show(json);
    };
    //接收我的奖品请求结果
    p.onMyPrizeError = function (e) {
        this.configListeners();
        console.log("请求错误");
    };
    return ResultUI;
})(BaseUI);
egret.registerClass(ResultUI,'ResultUI');
