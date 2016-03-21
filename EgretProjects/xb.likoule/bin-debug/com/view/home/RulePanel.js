/**
 * 游戏规则
 * @author
 *
 */
var RulePanel = (function (_super) {
    __extends(RulePanel, _super);
    function RulePanel() {
        _super.call(this, "RulePanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=RulePanel,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.label0.text = GameConst.config.rule0;
        this.label1.text = GameConst.config.rule1;
        this.label2.text = GameConst.config.rule2;
        this.label2.height = (this.label2.size + this.label2.lineSpacing) * this.label2.maxScrollV;
        this.scroller.scrollPolicyV = eui.ScrollPolicy.AUTO;
        this.scroller.verticalScrollBar.autoVisibility = false;
    };
    p.onEnable = function () {
        this.playArrowAnim();
        this.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onKnowBtnTouch, this);
    };
    p.onRemove = function () {
        this.stopArrowAnim();
        this.knowBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onKnowBtnTouch, this);
    };
    p.onKnowBtnTouch = function () {
        this.hide();
    };
    p.playArrowAnim = function () {
        this.initArrowY = this.arrow.y;
        egret.Tween.get(this.arrow, { loop: true }).to({ y: this.initArrowY - 10 }, 300).to({ y: this.initArrowY }, 300);
    };
    p.stopArrowAnim = function () {
        egret.Tween.removeTweens(this.arrow);
        this.arrow.y = this.initArrowY;
    };
    return RulePanel;
}(BaseUI));
egret.registerClass(RulePanel,'RulePanel');
