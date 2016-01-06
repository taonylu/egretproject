/**
 * 拆红包场景
 * @author
 *
 */
var OpenScene = (function (_super) {
    __extends(OpenScene, _super);
    function OpenScene() {
        _super.call(this, "OpenSceneSkin");
        this.prizeList = []; //奖品图片数组
        this.ruleUI = new RuleUI(); //领奖须知
        this.bSubmit = false;
    }
    var d = __define,c=OpenScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initShareBtnY = this.shareBtn.y;
        for (var i = 0; i < 7; i++) {
            this.prizeList.push(this["prize" + (i + 1)]);
            this.prizeList[i].touchEnabled = false;
            this.prizeList[i].visible = false;
        }
    };
    p.onEnable = function () {
        this.openGroup.visible = true;
        this.openedGroup.visible = false;
        this.phoneGroup.visible = false;
        this.phoneLabel.prompt = "请输入手机号码";
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
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        //this.phoneRect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPhoneRectTouch,this);
    };
    p.deConfigListeners = function () {
        this.openBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
        this.myPrizeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMyPrizeTouch, this);
        this.ruleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRuleBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBtnTouch, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        //this.phoneRect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onPhoneRectTouch,this);
    };
    //拆红包按钮
    p.openBtnTouch = function () {
        this.deConfigListeners();
        //红包晃动
        egret.Tween.get(this.openBg, { loop: true }).to({ rotation: this.openBg.rotation + 5 }, 50).
            to({ rotation: this.openBg.rotation - 5 }, 50);
        //发送请求
        var http = SingleHttp.getInstance();
        http.completeHandler = this.revOpenPrize;
        http.errorHandler = this.onOpenPrizeError;
        var pass = window["pass"];
        var url = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/xbLottery" + "/pass/" + pass;
        var msg = "";
        http.send(url, egret.HttpMethod.GET, msg, this);
    };
    //接收打开红包结果
    p.revOpenPrize = function (result) {
        this.configListeners();
        egret.Tween.removeTweens(this.openBg);
        this.openBg.rotation = 0;
        var json = JSON.parse(result);
        if (json.code == "200") {
            window["pass"] = json.pass;
            this.showPrize(json.prizeid);
        }
        else {
            //alert(json.msg);
            GameManager.getInstance().shareUI.show();
        }
    };
    //打开红包错误
    p.onOpenPrizeError = function (e) {
        this.configListeners();
        egret.Tween.removeTweens(this.openBg);
        this.openBg.rotation = 0;
        alert("链接已失效");
    };
    //拆红包成功，显示奖品
    p.showPrize = function (prizeid) {
        //显示拆开红包
        this.openGroup.visible = false;
        this.openedGroup.visible = true;
        //显示奖品
        if (this.curPrizeImg) {
            this.curPrizeImg.visible = false;
            this.curPrizeImg.y = this.initPrizeImgY;
        }
        this.curPrizeImg = this.prizeList[prizeid - 1]; //奖品id1-7，数组下标0-6
        this.initPrizeImgY = this.curPrizeImg.y;
        this.curPrizeImg.y += 300;
        this.curPrizeImg.visible = true;
        egret.Tween.get(this.curPrizeImg).to({ y: this.initPrizeImgY }, 1000);
        //过一段时间出现提交手机号
        var self = this;
        egret.Tween.get(this).wait(4000).call(function () {
            self.phoneGroup.visible = true;
        }, this);
    };
    //点击我的奖品
    p.onMyPrizeTouch = function () {
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
        var str = "";
        for (var item in json) {
            str += json[item].prizemsg + "\n";
        }
        GameManager.getInstance().myPrizeUI.show(str);
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
    //分享按钮
    p.onShareBtnTouch = function () {
        GameManager.getInstance().shareUI.show();
    };
    //提交手机号码
    p.onSubmitBtnTouch = function () {
        egret.log("提交号码:" + this.phoneLabel.text);
        var patt = /^1\d{10}$/;
        var result = patt.test(this.phoneLabel.text);
        if (result == false) {
            alert("手机号码不正确");
            return;
        }
        this.deConfigListeners();
        var http = SingleHttp.getInstance();
        http.completeHandler = this.submitComplete;
        http.errorHandler = this.submitError;
        var url = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/addTel/tel/" + this.phoneLabel.text;
        var msg = "";
        http.send(url, egret.HttpMethod.GET, msg, this);
        //超时
        var self = this;
        egret.Tween.get(this.submitBtn).wait(3000).call(function () {
            self.configListeners();
        });
    };
    //提交完成
    p.submitComplete = function (result) {
        egret.Tween.removeTweens(this.submitBtn);
        this.configListeners();
        if (this.bSubmit == false) {
            this.phoneGroup.visible = false;
        }
        this.bSubmit = true;
        var json = JSON.parse(result);
        alert(json.msg);
    };
    //提交失败
    p.submitError = function (e) {
        egret.Tween.removeTweens(this.submitBtn);
        this.configListeners();
        this.phoneGroup.visible = false;
        alert("链接已失效");
    };
    //点击手机背景
    p.onPhoneRectTouch = function () {
        this.phoneGroup.visible = false;
        this.configListeners();
    };
    //分享成功后，发送分享次数请求
    p.sendAddChance = function () {
        //超时增加监听
        this.deConfigListeners();
        var self = this;
        egret.Tween.get(this.shareBtn).wait(3000).call(function () {
            self.configListeners();
        });
        var http = SingleHttp.getInstance();
        http.completeHandler = this.revShareResult;
        http.errorHandler = this.revShareError;
        var pass = window["pass"];
        var url = "http://www.cisigo.com/index.php?s=/addon/Newspaper/Newspaper/addLottery/pass/" + pass;
        var msg = "";
        http.send(url, egret.HttpMethod.GET, msg, this);
    };
    //接收分享成功后
    p.revShareResult = function (result) {
        this.configListeners();
        var json = JSON.parse(result);
        egret.Tween.removeTweens(this.shareBtn);
        if (json.code == "200") {
            window["pass"] = json.pass;
            GameManager.getInstance().shareUI.hide();
            alert(json.msg);
        }
        else {
            GameConst.haveChance = false;
            GameManager.getInstance().shareUI.show();
            alert(json.msg);
        }
    };
    //请求失败
    p.revShareError = function () {
        this.configListeners();
        egret.Tween.removeTweens(this.shareBtn);
        alert("增加拆红包次数失败");
    };
    return OpenScene;
})(BaseScene);
egret.registerClass(OpenScene,'OpenScene');
