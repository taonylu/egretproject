/**
 * 场景管理类
 * @author chenkai
 * @date 2016/12/23
 *
 * Example:
 * App.SceneManager.register("HomeScene", HomeScene);
 * App.SceneManager.open("HomeScene");
 */
var SceneManager = (function (_super) {
    __extends(SceneManager, _super);
    function SceneManager() {
        _super.call(this);
        /**面板实例*/
        this.sceneMap = {};
        /**面板类定义*/
        this.clzMap = {};
    }
    var d = __define,c=SceneManager,p=c.prototype;
    /**
     * 注册场景
     * @sceneName 场景名
     * @sceneClz 场景类定义
     */
    p.register = function (sceneName, sceneClz) {
        this.clzMap[sceneName] = sceneClz;
    };
    /**
     * 打开场景
     * @sceneName 场景名
     */
    p.open = function (sceneName) {
        var scene = this.sceneMap[sceneName];
        if (scene) {
            this.replaceScene(scene);
        }
        else {
            var clz = this.clzMap[sceneName];
            if (clz) {
                scene = new clz();
                this.sceneMap[sceneName] = scene;
                this.replaceScene(scene);
            }
        }
    };
    /**
     * 打开场景
     * @sceneName 场景名
     */
    p.replaceScene = function (scene) {
        scene.once(egret.Event.ADDED_TO_STAGE, function () {
            scene.onEnable();
        }, this);
        App.LayerManager.sceneLayer.addChild(scene);
        var removeScene = this.curScene;
        if (removeScene) {
            removeScene.once(egret.Event.REMOVED_FROM_STAGE, function () {
                removeScene.onRemove();
            }, this);
            App.LayerManager.sceneLayer.removeChild(removeScene);
        }
        this.curScene = scene;
    };
    /**
     * 获取当前场景
     */
    p.getCurScene = function () {
        return this.curScene;
    };
    return SceneManager;
}(SingleClass));
egret.registerClass(SceneManager,'SceneManager');
