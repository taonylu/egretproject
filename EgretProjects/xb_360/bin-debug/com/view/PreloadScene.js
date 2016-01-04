/**
 *
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
        this.vr = .05;
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.cos = Math.cos(this.vr);
        this.sin = Math.sin(this.vr);
        this.centerX = this.center.x + 64; //取不到width
        this.centerY = this.center.y + 66;
    };
    p.playAnim = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.stopAnim = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.setProgress = function (progress) {
        if (this.inited) {
            this.progressLabel.text = "Loading..." + progress + "%";
        }
    };
    p.onEnterFrame = function () {
        if (this.inited) {
            var x1 = this.circle.x - this.centerX;
            var y1 = this.circle.y - this.centerY;
            var x2 = this.cos * x1 - this.sin * y1;
            var y2 = this.cos * y1 + this.sin * x1;
            this.circle.x = this.centerX + x2;
            this.circle.y = this.centerY + y2;
        }
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
