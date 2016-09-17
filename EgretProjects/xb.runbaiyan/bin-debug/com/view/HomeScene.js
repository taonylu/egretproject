/**
 * 主页场景
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this, "HomeSceneSkin");
        this.initCodeX = -135;
        this.ininCodeEndY = 20;
        this.codeSpeed = 10;
        this.nextCodeX = 0;
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.ruleScroller.bounces = false;
        this.initGirlX = this.girl.x;
        this.initStartBtnX = this.startBtn.x;
        this.initIntroduceBtnX = this.introduceBtn.x;
        this.initbigGirlX = this.bigGril.x;
        this.initArrowY = this.arrow.y;
        this.initCodeY = 820 / 1150 * document.body.clientHeight;
        this.qrcode = new QRCode();
        this.qrcode.createCode();
    };
    p.onEnable = function () {
        this.girl.shakeHead();
        this.girl.x = this.initGirlX;
        this.startBtn.x = this.initStartBtnX;
        this.introduceBtn.x = this.initIntroduceBtnX;
        this.bigGril.x = this.initbigGirlX;
        this.ruleScroller.alpha = 0;
        this.ruleBg.alpha = 0;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.introduceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIntroduceBtnTouch, this);
        this.ruleGroup.y = 874 / 1150 * GameConst.stage.stageHeight;
        this.arrow.visible = false;
        this.arrow.y = this.initArrowY;
        egret.Tween.get(this.arrow, { loop: true }).to({ y: this.arrow.y - 10 }, 500).to({ y: this.arrow.y + 10 }, 500);
        this.qrcode.showCode(this.initCodeX, this.initCodeY, 100, 100);
    };
    p.onRemove = function () {
        this.girl.stopShake();
        egret.Tween.removeTweens(this.arrow);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.introduceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIntroduceBtnTouch, this);
    };
    p.onStartBtnTouch = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    p.onIntroduceBtnTouch = function () {
        this.showRule();
    };
    p.showRule = function () {
        //移除监听
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onStartBtnTouch, this);
        this.introduceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIntroduceBtnTouch, this);
        //小女孩右边出场
        egret.Tween.get(this.girl).to({ x: GameConst.stage.stageWidth }, 200, egret.Ease.quadIn); //0-0.3
        //大女孩左边进场
        egret.Tween.get(this.bigGril).to({ x: 271 }, 300, egret.Ease.quadIn); //0.38-0.78
        //按钮左边退场
        egret.Tween.get(this.startBtn).wait(100).to({ x: this.initStartBtnX - 700 }, 200, egret.Ease.quadIn); //0.5-0.85
        egret.Tween.get(this.introduceBtn).wait(100).to({ x: this.initIntroduceBtnX - 700 }, 200, egret.Ease.quadIn);
        //显示规则
        egret.Tween.get(this.ruleBg).wait(200).to({ alpha: 1 }, 300, egret.Ease.quadIn); //0.5-0.85
        egret.Tween.get(this.ruleScroller).wait(200).to({ alpha: 1 }, 300, egret.Ease.quadIn);
        //移动二维码
        this.nextCodeX = this.initCodeX;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onCodeEnter, this);
        //添加监听
        var self = this;
        egret.Tween.get(this).wait(500).call(function () {
            self.bigGril.addEventListener(egret.TouchEvent.TOUCH_TAP, self.hideRule, self);
            self.title.addEventListener(egret.TouchEvent.TOUCH_TAP, self.hideRule, self);
            self.arrow.visible = true;
            //QRCode.showCode(codePos.x, codePos.y,200,200);
        });
    };
    p.hideRule = function () {
        //移除监听
        this.bigGril.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideRule, this);
        this.title.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hideRule, this);
        //隐藏规则
        egret.Tween.get(this.ruleBg).to({ alpha: 0 }, 300, egret.Ease.quadIn); //0-0.5
        egret.Tween.get(this.ruleScroller).to({ alpha: 0 }, 300, egret.Ease.quadIn);
        //移动二维码
        this.addEventListener(egret.Event.ENTER_FRAME, this.onCodeQuit, this);
        //按钮左边进场
        egret.Tween.get(this.startBtn).wait(100).to({ x: this.initStartBtnX }, 200, egret.Ease.quadIn); //0.4-1
        egret.Tween.get(this.introduceBtn).wait(100).to({ x: this.initIntroduceBtnX }, 200, egret.Ease.quadIn);
        //大女孩左边退场
        egret.Tween.get(this.bigGril).to({ x: this.initbigGirlX }, 300, egret.Ease.quadIn); //0.62-1.12
        //小女孩右边进场
        egret.Tween.get(this.girl).wait(200).to({ x: this.initGirlX }, 200, egret.Ease.quadIn); //1.1-1.5
        //添加监听
        var self = this;
        egret.Tween.get(this).wait(500).call(function () {
            self.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onStartBtnTouch, self);
            self.introduceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, self.onIntroduceBtnTouch, self);
            self.arrow.visible = false;
        });
    };
    p.onCodeEnter = function () {
        this.nextCodeX += this.codeSpeed;
        if (this.nextCodeX >= this.ininCodeEndY) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onCodeEnter, this);
        }
        this.qrcode.setPosition(this.nextCodeX, this.initCodeY);
    };
    p.onCodeQuit = function () {
        this.nextCodeX -= this.codeSpeed;
        if (this.nextCodeX <= this.initCodeX) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onCodeQuit, this);
        }
        this.qrcode.setPosition(this.nextCodeX, this.initCodeY);
    };
    return HomeScene;
}(BaseScene));
egret.registerClass(HomeScene,'HomeScene');
