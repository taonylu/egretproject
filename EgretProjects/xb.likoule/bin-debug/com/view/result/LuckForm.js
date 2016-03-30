/**
 * 中奖表格
 * @author
 *
 */
var LuckForm = (function (_super) {
    __extends(LuckForm, _super);
    function LuckForm() {
        _super.call(this, "LuckFormSkin");
        this.http = new HttpUtil();
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=LuckForm,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.reset();
        this.configListeners();
    };
    p.onRemove = function () {
        this.deConfigListeners();
    };
    p.reset = function () {
        this.nameLabel.text = "";
        this.telLabel.text = "";
        this.addressLabel.text = "";
    };
    p.configListeners = function () {
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitTouch, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.deConfigListeners = function () {
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitTouch, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    };
    p.onSubmitTouch = function () {
        this.sendSubmitRequest();
    };
    p.onCloseTouch = function () {
        this.hide();
        GameManager.getInstance().resultScene.btnGroup.visible = true;
    };
    p.setView = function (prizeName) {
        this.prizeLabel.text = "恭喜你获得" + prizeName;
    };
    p.sendSubmitRequest = function () {
        egret.log("sendSubmit");
        if (GameConst.debug) {
            var json = {
                status: true,
                code: 200,
                msg: "aa"
            };
            this.revSubmit(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revSubmit;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "prizeinfo";
            var csrf = "_csrf=" + GameConst.csrf;
            var tel = "&tel=" + this.telLabel.text;
            var name = "&name=" + this.nameLabel.text;
            var addr = "&addr=" + this.addressLabel.text;
            var msg = csrf + tel + name + addr;
            this.http.send(url, msg, this);
        }
        egret.log(url);
    };
    p.revSubmit = function (res) {
        egret.log("revSubmit:", res);
        var json = JSON.parse(res);
        var status = json.status; //true , false
        var code = json.code; //200成功
        var msg = json.msg; //描述消息
        var data = json.data;
        //信息填写成功
        if (status == true && code == 200) {
        }
        else {
            alert(msg);
        }
        this.hide();
        GameManager.getInstance().resultScene.btnGroup.visible = true;
    };
    return LuckForm;
}(BaseUI));
egret.registerClass(LuckForm,'LuckForm');
