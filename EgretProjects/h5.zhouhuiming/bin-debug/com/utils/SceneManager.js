/**
 * 场景管理类
 * @author
 *
 */
var SceneManager = (function () {
    function SceneManager() {
        this.sceneA = new SceneA();
        this.sceneB = new SceneB();
        this.sceneC = new SceneC();
        this.sceneD = new SceneD();
        this.scrollScene = new ScrollScene();
    }
    var d = __define,c=SceneManager,p=c.prototype;
    return SceneManager;
}());
egret.registerClass(SceneManager,'SceneManager');
