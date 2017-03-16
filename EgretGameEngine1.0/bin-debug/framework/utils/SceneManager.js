var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        var _this = _super.call(this) || this;
        /**面板实例*/
        _this.sceneMap = {};
        /**面板类定义*/
        _this.clzMap = {};
        return _this;
    }
    /**
     * 注册场景
     * @sceneName 场景名
     * @sceneClz 场景类定义
     */
    SceneManager.prototype.register = function (sceneName, sceneClz) {
        this.clzMap[sceneName] = sceneClz;
    };
    /**
     * 打开场景
     * @sceneName 场景名
     * @data 传入数据
     */
    SceneManager.prototype.open = function (sceneName, data) {
        if (data === void 0) { data = null; }
        var scene = this.sceneMap[sceneName];
        if (scene) {
            this.replaceScene(scene, data);
        }
        else {
            var clz = this.clzMap[sceneName];
            if (clz) {
                scene = new clz();
                this.sceneMap[sceneName] = scene;
                this.replaceScene(scene, data);
            }
        }
    };
    /**
     * 打开场景
     * @sceneName 场景名
     * @data 传入数据
     */
    SceneManager.prototype.replaceScene = function (scene, data) {
        if (data === void 0) { data = null; }
        scene.once(egret.Event.ADDED_TO_STAGE, function () {
            scene.onEnable(data);
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
    SceneManager.prototype.getCurScene = function () {
        return this.curScene;
    };
    return SceneManager;
}(SingleClass));
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map