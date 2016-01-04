/**
 *
 * @author
 *
 */
var FingerUI = (function (_super) {
    __extends(FingerUI, _super);
    function FingerUI() {
        _super.call(this);
        this.startX = 222; //光标的坐标
        this.startY = 87;
        this.midX = 118;
        this.midY = 53;
        this.endX = 28;
        this.endY = 23;
    }
    var d = __define,c=FingerUI,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.light.visible = false;
        this.finger1.visible = false;
        this.lock.visible = false;
        this.gou.visible = false;
    };
    //光标扫描第一遍
    p.lightScan = function () {
        this.light.alpha = 0;
        this.light.x = this.startX;
        this.light.y = this.startY;
        this.light.visible = true;
        egret.Tween.get(this.light).to({ x: this.midX, y: this.midY, alpha: 1 }, 200).
            to({ x: this.endX, y: this.endY, alpha: 0 }, 200).call(this.fingerFlash, this);
    };
    //指纹闪烁第一次
    p.fingerFlash = function () {
        this.finger0.visible = false;
        this.finger1.visible = true;
        var self = this;
        egret.Tween.get(this).wait(300).call(function () {
            self.finger0.visible = true;
            self.finger1.visible = false;
        }, this).call(this.lightScan2, this);
    };
    //光标扫描第二次
    p.lightScan2 = function () {
        this.light.alpha = 0;
        this.light.x = this.startX;
        this.light.y = this.startY;
        this.light.visible = true;
        egret.Tween.get(this.light).to({ x: this.midX, y: this.midY, alpha: 1 }, 200).
            to({ x: this.endX, y: this.endY, alpha: 0 }, 200).call(this.fingerFlash2, this);
    };
    //指纹闪烁第二次
    p.fingerFlash2 = function () {
        this.finger0.visible = false;
        this.finger1.visible = true;
        var self = this;
        egret.Tween.get(this).wait(100).call(function () {
            self.finger0.visible = true;
            self.finger1.visible = false;
        }, this).wait(100).call(function () {
            self.finger0.visible = false;
            self.finger1.visible = true;
        }, this).wait(100).call(function () {
            self.finger0.visible = true;
            self.finger1.visible = false;
        }, this).wait(100).call(function () {
            self.finger0.visible = false;
            self.finger1.visible = true;
        }, this).call(this.unlock, this);
    };
    //解锁
    p.unlock = function () {
        egret.Tween.get(this.finger1).to({ alpha: 0 }, 200);
        this.lock.alpha = 0;
        this.lock.visible = true;
        this.gou.alpha = 0;
        this.gou.visible = true;
        egret.Tween.get(this.lock).wait(200).to({ alpha: 1 }, 1500);
        var self = this;
        egret.Tween.get(this.gou).wait(800).to({ alpha: 1 }, 500).wait(500).call(function () {
            self.dispatchEvent(new egret.Event("fingerComplete"));
        }, this);
    };
    return FingerUI;
})(BaseUI);
egret.registerClass(FingerUI,'FingerUI');
