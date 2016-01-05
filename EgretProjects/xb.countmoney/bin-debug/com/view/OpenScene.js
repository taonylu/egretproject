/**
 * 拆红包场景
 * @author
 *
 */
var OpenScene = (function (_super) {
    __extends(OpenScene, _super);
    function OpenScene() {
        _super.call(this, "OpenSceneSkin");
        this.ruleUI = new RuleUI(); //领奖须知
        this.httpUtil = new HttpUtil(); //请求
    }
    var d = __define,c=OpenScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initShareBtnY = this.shareBtn.y;
    };
    p.onEnable = function () {
        this.openGroup.visible = true;
        this.openedGroup.visible = false;
        //分享按钮动画
        egret.Tween.get(this.shareBtn, { loop: true }).to({ y: this.initShareBtnY + 15 }, 500).to({ y: this.initShareBtnY }, 500);
        //监听
        this.configListeners();
    };
    p.onRemove = function () {
        egret.Tween.removeTweens(this.shareBtn);
        this.deConfigListeners();
    };
    p.configListeners = function () {
        this.openBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
        this.myPrizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyPrizeTouch, this);
        this.ruleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.deConfigListeners = function () {
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
        this.myPrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyPrizeTouch, this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    //拆红包按钮
    p.openBtnTouch = function () {
        //
        this.deConfigListeners();
        //红包晃动
        //发送请求
        this.httpUtil.completeHandler = this.revOpenPrize;
        this.httpUtil.errorHandler = this.onOpenPrizeError;
        var url = "";
        var msg = "";
        this.httpUtil.send(url, egret.HttpMethod.POST, msg, this);
    };
    //接收打开红包结果
    p.revOpenPrize = function (result) {
        this.configListeners();
        console.log("拆红包结果:" + result);
        //测试成功
        this.showPrize();
    };
    //打开红包错误
    p.onOpenPrizeError = function (e) {
        this.configListeners();
        console.log("拆红包错误");
    };
    //拆红包成功，显示奖品
    p.showPrize = function () {
        this.openGroup.visible = false;
        this.openedGroup.visible = true;
    };
    //点击我的奖品
    p.onMyPrizeTouch = function () {
        this.deConfigListeners();
        this.httpUtil.completeHandler = this.revMyPrize;
        this.httpUtil.errorHandler = this.onMyPrizeError;
        var url = "";
        var msg = "";
        this.httpUtil.send(url, egret.HttpMethod.POST, msg, this);
    };
    //接收我的奖品请求结果
    p.revMyPrize = function (result) {
        this.configListeners();
        console.log("我的奖品:" + result);
    };
    //我的奖品请求错误
    p.onMyPrizeError = function (e) {
        this.configListeners();
        console.log("请求错误");
    };
    //点击奖品须知
    p.onRuleBtnTouch = function () {
        this.ruleUI.show();
    };
    //点击再拆一次
    p.onAgainBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return OpenScene;
})(BaseScene);
egret.registerClass(OpenScene,'OpenScene');
