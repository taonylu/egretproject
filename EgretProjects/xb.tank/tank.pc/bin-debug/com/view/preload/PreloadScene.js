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
        this.boom = new TankBoom();
        this.bar.scaleX = 0;
    };
    p.setProgress = function (process) {
        if (this.inited) {
            //this.progressLabel.text = process.toString() + "%";
            this.bullet.x = this.bar.x + process / 100 * this.bar.width;
            this.bar.scaleX = process / 100;
            if (process >= 100 && this.enemyTank.visible) {
                this.enemyTank.visible = false;
                this.bullet.visible = false;
                this.boom.x = this.enemyTank.x;
                this.boom.y = this.enemyTank.y;
                this.addChild(this.boom);
                this.boom.playBoom();
                var self = this;
                egret.Tween.get(this).wait(500).call(function () {
                    self.dispatchEvent(new egret.Event("BoomComplete"));
                });
            }
        }
    };
    return PreloadScene;
}(BaseScene));
egret.registerClass(PreloadScene,'PreloadScene');
