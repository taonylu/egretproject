/**
 * 创建团队
 * @author
 *
 */
var TeamForm = (function (_super) {
    __extends(TeamForm, _super);
    function TeamForm() {
        _super.call(this, "TeamFormSkin");
        this.http = new HttpUtil(); //http请求
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=TeamForm,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
    };
    p.onEnable = function () {
        this.nameLabel.text = "";
        this.telLabel.text = "";
        this.addressLabel.text = "";
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
    };
    p.onRemove = function () {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtnTouch, this);
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
    };
    p.onCloseBtnTouch = function () {
        this.hide();
        GameManager.getInstance().homeScene.rankGroup.visible = true;
    };
    //提交
    p.onSubmitBtnTouch = function () {
        egret.log("sendSubmit");
        //TPDO 提交信息
        if (GameConst.debug) {
            var json = { status: true, code: 200, msg: "abc" };
            this.revSubmit(JSON.stringify(json));
        }
        else {
            this.http.completeHandler = this.revSubmit;
            this.http.httpMethod = egret.HttpMethod.POST;
            var url = window["httpUrl"] + "saveinfo";
            var csrf = "_csrf=" + GameConst.csrf;
            var tel = "&tel=" + this.telLabel.text;
            var name = "&name=" + this.nameLabel.text;
            var addr = "&addr=" + this.addressLabel.text;
            var msg = csrf + tel + name + addr;
            this.http.send(url, msg, this);
        }
    };
    p.revSubmit = function (res) {
        egret.log("revSubmit:", res);
        var json = JSON.parse(res);
        var status = json.status;
        var code = json.code;
        var msg = json.msg;
        if (status == true && code == 200) {
        }
        else {
            alert(msg);
        }
        this.hide();
    };
    return TeamForm;
}(BaseUI));
egret.registerClass(TeamForm,'TeamForm');
