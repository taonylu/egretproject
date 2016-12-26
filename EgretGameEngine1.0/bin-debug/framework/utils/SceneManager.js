/**
 * 场景管理类
 * @author chenkai
 * @date 2016/12/23
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
     * 运行场景
     * @sceneName 场景名
     * @destory 是否销毁上一场景
     */
    p.open = function (sceneName, destroy) {
        if (destroy === void 0) { destroy = false; }
        var scene = this.sceneMap[sceneName];
        if (scene) {
            this.openScene(scene);
        }
        else {
            var clz = this.clzMap[sceneName];
            if (clz) {
                scene = new clz();
                this.sceneMap[sceneName] = scene;
                this.openScene(scene, destroy);
            }
        }
    };
    /**
     * 打开场景
     * @sceneName 场景名
     * @destroy 是否销毁上一场景
     */
    p.openScene = function (scene, destroy) {
        if (destroy === void 0) { destroy = false; }
        scene.once(egret.Event.ADDED_TO_STAGE, function () {
            scene.onEnable();
        }, this);
        App.LayerManager.sceneLayer.addChild(scene);
        var removeScene = this.curScene;
        if (removeScene) {
            removeScene.once(egret.Event.REMOVED_FROM_STAGE, function () {
                removeScene.onRemove();
                //TODO 销毁上一场景
            }, this);
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
