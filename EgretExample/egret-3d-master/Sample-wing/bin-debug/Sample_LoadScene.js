var Sample_LoadScene = (function (_super) {
    __extends(Sample_LoadScene, _super);
    function Sample_LoadScene() {
        _super.call(this);
    }
    var d = __define,c=Sample_LoadScene;p=c.prototype;
    p.onView3DInitComplete = function () {
        var _this = this;
        egret3d.AssetsManager.getInstance().addLoadScene("resource/scene");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.onLoadComplete(e); });
        egret3d.AssetsManager.getInstance().startLoad();
    };
    p.onLoadComplete = function (e) {
        var meshList = egret3d.AssetsManager.getInstance().findScene("resource/scene");
        var container = new egret3d.Object3D();
        for (var i = 0; i < meshList.length; i++) {
            container.addChild(meshList[i]);
        }
        this._view3D.addChild3D(container);
    };
    return Sample_LoadScene;
})(Sample_CreateSky);
egret.registerClass(Sample_LoadScene,"Sample_LoadScene");
