/**
 * 滚动场景
 * @author
 *
 */
var ScrollScene = (function (_super) {
    __extends(ScrollScene, _super);
    function ScrollScene() {
        _super.call(this);
        this.sceneList = [];
        this.skinName = "ScrollSceneSkin";
    }
    var d = __define,c=ScrollScene,p=c.prototype;
    p.onCreated = function () {
        for (var i = 0; i < 4; i++) {
            this.sceneList.push(this.sceneGroup.getChildAt(i));
        }
    };
    p.onEnable = function () {
        this.scroll.addEventListener(ItemScroller.ScrollDone, this.onScrollDone, this);
        this.sceneList[0].startAnim();
    };
    p.onRemove = function () {
    };
    p.onDestroy = function () {
    };
    //滚动完成
    p.onScrollDone = function (e) {
        var scene = this.sceneList[e.data];
        if (scene && scene.isAnimDone == false) {
            scene.startAnim();
        }
    };
    return ScrollScene;
}(BaseScene));
egret.registerClass(ScrollScene,'ScrollScene');
