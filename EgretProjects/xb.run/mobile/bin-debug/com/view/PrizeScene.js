/**
 * 领奖页面
 * @author
 *
 */
var PrizeScene = (function (_super) {
    __extends(PrizeScene, _super);
    function PrizeScene() {
        _super.call(this, "PrizeSceneSkin");
    }
    var d = __define,c=PrizeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.phoneLabel.text = "";
    };
    p.onEnable = function () {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    };
    p.onRemove = function () {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
    };
    p.onOKBtnTouch = function () {
        var patt = /^1\d{10}$/;
        var result = patt.test(this.phoneLabel.text);
        if (result == false) {
            alert("手机号码不正确");
            return;
        }
        if (this.http == null) {
            this.http = new HttpUtil();
            this.http.completeHandler = this.completeHandler;
            this.http.errorHandler = this.errorHandler;
            this.http.httpMethod = egret.HttpMethod.POST;
        }
        var url = "http://node.ekche.com/game/phpFiles/paoku/gameAction.php";
        var openid = "openid=" + GameConst.gameConfig.openid;
        var sign = "&sign=" + GameConst.gameConfig.sign;
        var timestamp = "&timestamp=" + GameConst.gameConfig.timestamp;
        var acType = "&acType=" + "sendMobileData";
        var tel = "&tel=" + this.phoneLabel.text;
        var msg = openid + sign + timestamp + acType + tel;
        this.http.send(url, msg, this);
        egret.log("sendPrizeHttp:", url, msg);
    };
    p.completeHandler = function (res) {
        var json = JSON.parse(res);
        var status = json.status;
        var msg = json.msg;
        egret.log("revPrizeHttp:", "status:", json.status, "msg:", json.msg);
        //显示提示信息
        var msgBox = GameManager.getInstance().messageBox;
        msgBox.showMsg(msg);
        msgBox.addEventListener("close", function () {
            //显示结果页面
            LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        }, this);
    };
    p.errorHandler = function () {
        //显示提示信息
        var msgBox = GameManager.getInstance().messageBox;
        msgBox.showMsg("提交失败");
        msgBox.addEventListener("close", function () {
            //显示结果页面
            LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
        }, this);
    };
    return PrizeScene;
}(BaseScene));
egret.registerClass(PrizeScene,'PrizeScene');
