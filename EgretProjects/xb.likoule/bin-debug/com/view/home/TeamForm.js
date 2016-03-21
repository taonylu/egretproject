/**
 * 创建团队
 * @author
 *
 */
var TeamForm = (function (_super) {
    __extends(TeamForm, _super);
    function TeamForm() {
        _super.call(this, "TeamFormSkin");
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
    };
    p.onSubmitBtnTouch = function () {
        //TPDO 提交信息
    };
    return TeamForm;
}(BaseUI));
egret.registerClass(TeamForm,'TeamForm');
