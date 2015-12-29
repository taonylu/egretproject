/**
 *
 * @author
 * 游戏介绍场景
 */
var IntroduceScene = (function (_super) {
    __extends(IntroduceScene, _super);
    function IntroduceScene() {
        _super.call(this, "resource/myskin/scene/IntroduceSceneSkin.exml");
        this.bgList = [];
        this.curBgIndex = 0;
        this.bgList.push(this.bg1, this.bg2, this.bg3);
    }
    var d = __define,c=IntroduceScene;p=c.prototype;
    p.onEnable = function () {
        this.bgAnim();
        this.handAnimLeft();
    };
    p.onRemove = function () {
        egret.Tween.removeAllTweens();
        this.hand.x = 50;
        this.addChild(this.bg1);
        this.curBgIndex = 0;
    };
    p.bgAnim = function () {
        var self = this;
        egret.Tween.get(this).wait(1000).call(function () {
            self.curBgIndex++;
            if (self.curBgIndex >= self.bgList.length) {
                self.nextScene();
                return;
            }
            self.addChild(self.bgList[self.curBgIndex]);
            self.bgAnim();
        });
    };
    p.handAnimLeft = function () {
        var self = this;
        egret.Tween.get(this.hand).to({ x: this.hand.x - 100 }, 500).call(function () {
            self.handAnimRight();
        });
    };
    p.handAnimRight = function () {
        var self = this;
        egret.Tween.get(this.hand).to({ x: this.hand.x + 100 }, 500).call(function () {
            self.handAnimLeft();
        });
    };
    p.nextScene = function () {
        LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
    };
    return IntroduceScene;
})(BaseScene);
egret.registerClass(IntroduceScene,"IntroduceScene");
