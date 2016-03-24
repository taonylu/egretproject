/**
 * 预加载场景
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.progressLabel.text = "0%";
        this.loadBar.mask = this.barMask;
        this.barMask.scaleX = 0;
        this.bee = new SimpleMC("bee_png", "bee_json", "bee");
        this.bee.play(1000);
        this.beeGroup.addChild(this.bee);
    };
    p.setProgress = function (process) {
        if (this.inited) {
            this.progressLabel.text = process.toString() + "%";
            this.barMask.scaleX = process / 100;
            this.beeGroup.x = this.loadBg.x + this.loadBg.width * process / 100 - this.beeGroup.width / 2;
        }
    };
    p.destroy = function () {
        this.bee.parent && this.bee.parent.removeChild(this.bee);
        this.bee.stop();
        this.bee = null;
    };
    return PreloadScene;
}(BaseScene));
egret.registerClass(PreloadScene,'PreloadScene');
