/**
 * 预加载界面
 * @author
 *
 */
var PreloadScene = (function (_super) {
    __extends(PreloadScene, _super);
    function PreloadScene() {
        _super.call(this, "PreloadSceneSkin");
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
    var d = __define,c=PreloadScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.boxStartY = this.box.y;
        this.boxEndY = this.boxStartY - 500;
    };
    p.onEnable = function () {
        this.box.y = this.boxStartY;
        this.playAnimThrow();
    };
    p.onRemove = function () {
        egret.Tween.removeAllTweens();
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    p.setProcessLabel = function (process) {
        this.processLabel.text = "Loading " + process + "%";
    };
    p.playAnimThrow = function () {
        this.man0.visible = false;
        this.man1.visible = true;
        this.box.visible = true;
        var self = this;
        egret.Tween.get(this.box).to({ y: this.boxEndY, rotation: 360 }, 800).call(function () {
            self.playAnimFall();
        });
    };
    p.playAnimFall = function () {
        this.man0.visible = false;
        this.man1.visible = true;
        var self = this;
        egret.Tween.get(this.box).to({ y: this.boxStartY, rotation: 360 }, 800).call(function () {
            self.playAnimHold();
        });
    };
    p.playAnimHold = function () {
        this.man0.visible = true;
        this.man1.visible = false;
        this.box.visible = false;
        var self = this;
        egret.Tween.get(this.box).wait(300).call(function () {
            self.playAnimThrow();
        });
    };
    return PreloadScene;
})(BaseScene);
egret.registerClass(PreloadScene,'PreloadScene');
