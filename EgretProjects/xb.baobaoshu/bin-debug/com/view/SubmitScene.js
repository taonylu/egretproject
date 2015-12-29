/**
 * 获取红包场景
 * @author
 *
 */
var SubmitScene = (function (_super) {
    __extends(SubmitScene, _super);
    function SubmitScene() {
        _super.call(this, "SubmitSceneSkin");
    }
    var d = __define,c=SubmitScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.phoneLabel.border = true;
        this.phoneLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.phoneLabel.textAlign = egret.HorizontalAlign.CENTER;
        this.phoneLabel.border = false;
        this.initPhoneLabelY = this.phoneLabel.y;
        this.stageHeight = GameConst.stage.stageHeight;
        this.contentGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onContentGroupBegin, this);
        this.contentGroup.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onContentGroupMove, this);
        window["submitScene"] = this; //在index.php页面使用
    };
    p.onEnable = function () {
        this.phoneLabel.prompt = "请输入手机号";
        this.submitBtn.visible = true;
        this.successBtn.visible = false;
        this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
    };
    p.onRemove = function () {
    };
    p.onContentGroupBegin = function (e) {
        this.beginY = e.stageY;
    };
    p.onContentGroupMove = function (e) {
        //this.phoneLabel.y = this.initPhoneLabelY;
        this.endY = this.contentGroup.y + e.stageY - this.beginY;
        if (this.endY < (this.stageHeight - this.contentGroup.height)) {
            this.contentGroup.y = this.stageHeight - this.contentGroup.height;
        }
        else if (this.endY > 0) {
            this.contentGroup.y = 0;
        }
        else {
            this.contentGroup.y = this.endY;
        }
    };
    p.onSubmitBtnTouch = function () {
        var patt = /^1\d{10}$/;
        var result = patt.test(this.phoneLabel.text);
        if (result == false) {
            alert("手机号码不正确");
            return;
        }
        this.submitBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        var json = {
            "couponnumber": "81682F81D828C180",
            "mobile": this.phoneLabel.text
        };
        //提交
        window['submit'](json);
    };
    //index.php提交完成后回调
    p.onResult = function (bSuccess) {
        //领取成功
        if (bSuccess == true) {
            this.submitBtn.visible = false;
            this.successBtn.visible = true;
            egret.Tween.get(this).wait(2000).call(function () {
                window.location.href = "http://m.meitun.com/download.html?tcode=sdtgsp1212";
            });
        }
        else {
            this.submitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSubmitBtnTouch, this);
        }
    };
    return SubmitScene;
})(BaseScene);
egret.registerClass(SubmitScene,'SubmitScene');
