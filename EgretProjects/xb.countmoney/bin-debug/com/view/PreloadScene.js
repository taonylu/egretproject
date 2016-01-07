/**
 * 加载场景
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
        this.count = 0;
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        //图片动画
        this.imageMC = new ImageMC();
        this.imageMC.addImage(this.anim0);
        this.imageMC.addImage(this.anim1);
        this.imageMC.addImage(this.anim2);
        this.imageMC.addImage(this.anim3);
        //进度条进度
        this.bar.scaleX = 1;
        this.setProgress(0);
        //播放动画
        this.startAnim();
    };
    p.setProgress = function (progress) {
        this.progressLabel.text = progress + "%";
        this.bar.scaleX = progress / 100;
    };
    p.startAnim = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.stopAnim = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onEnterFrame = function () {
        this.count++;
        if (this.imageMC.curFrame == 0) {
            if (this.count % 30 == 0) {
                this.imageMC.nextFrame();
            }
        }
        else {
            if (this.count % 10 == 0) {
                this.imageMC.nextFrame();
            }
        }
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
