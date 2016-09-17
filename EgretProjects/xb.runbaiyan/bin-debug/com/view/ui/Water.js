/**
 *
 * @author
 *
 */
var Water = (function (_super) {
    __extends(Water, _super);
    function Water() {
        _super.call(this);
        this.animList = [];
        this.curFrame = 0;
        this.count = 0;
        for (var i = 0; i < 4; i++) {
            var te = RES.getRes("water" + i + "_png");
            this.animList.push(te);
        }
        this.texture = this.animList[0];
    }
    var d = __define,c=Water,p=c.prototype;
    p.play = function () {
        this.reset();
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onEnterFrame = function () {
        this.count++;
        if (this.count % 2 == 0) {
            if (this.curFrame >= 4) {
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
                this.dispatchEvent(new egret.Event("waterComplete"));
                return;
            }
            this.texture = this.animList[this.curFrame];
            this.curFrame++;
        }
    };
    p.reset = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.curFrame = 0;
        this.count = 0;
        this.texture = this.animList[0];
    };
    return Water;
}(egret.Bitmap));
egret.registerClass(Water,'Water');
