/**
 *
 * @author
 *  preload加载时的吃药动画
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        //根据Process设置动画
        this.curProcess = 0;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.initView, this);
        this.skinName = "resource/myskin/ui/LoadingUISkin.exml";
    }
    var d = __define,c=LoadingUI;p=c.prototype;
    p.initView = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.initView, this);
        this.pillMC0 = new PillMC();
        this.pillMC0.x = this.pill0.x;
        this.pillMC0.y = this.pill0.y;
        this.addChild(this.pillMC0);
        this.removeChild(this.pill0);
        this.pillMC1 = new PillMC();
        this.pillMC1.x = this.pill1.x;
        this.pillMC1.y = this.pill1.y;
        this.addChild(this.pillMC1);
        this.removeChild(this.pill1);
        this.pillMC2 = new PillMC();
        this.pillMC2.x = this.pill2.x;
        this.pillMC2.y = this.pill2.y;
        this.addChild(this.pillMC2);
        this.removeChild(this.pill2);
        this.eatMC = new EatMC();
        this.eatMC.x = this.eat0.x;
        this.eatMC.y = this.eat0.y;
        this.addChild(this.eatMC);
        this.removeChild(this.eat0);
        this.eatMC.frameRate = 200;
        this.eatMC.play();
    };
    p.setAnimByProcess = function (process) {
        if (this.curProcess == process) {
            return;
        }
        this.curProcess = process;
        if (process > 0) {
            this.eatMC.x -= 20;
        }
        switch (process) {
            case 1:
                this.pillMC2.gotoAndStop(2);
                break;
            case 2:
                this.pillMC2.gotoAndStop(3);
                break;
            case 3:
                this.removeChild(this.pillMC2);
                break;
            case 4:
                this.pillMC1.gotoAndStop(2);
                break;
            case 5:
                this.pillMC1.gotoAndStop(3);
                break;
            case 6:
                this.removeChild(this.pillMC1);
                break;
            case 7:
                this.pillMC0.gotoAndStop(2);
                break;
            case 8:
                this.pillMC0.gotoAndStop(3);
                break;
            case 9:
                this.removeChild(this.pillMC0);
                break;
            case 10:
                this.eatMC.stop();
                break;
        }
    };
    //销毁
    p.destory = function () {
    };
    return LoadingUI;
})(eui.Component);
egret.registerClass(LoadingUI,"LoadingUI");
