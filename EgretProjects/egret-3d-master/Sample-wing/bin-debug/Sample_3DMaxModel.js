/**
 *
 * @author
 *
 */
var Sample_3DMaxModel = (function () {
    function Sample_3DMaxModel() {
        var _this = this;
        this.delay = 0;
        this.time = 0;
        //获取网页内屏幕大小
        this.viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this.viewPort.width, this.viewPort.height), function () { return _this.init3D(); });
    }
    var d = __define,c=Sample_3DMaxModel;p=c.prototype;
    p.init3D = function () {
        var _this = this;
        this.view3D = new egret3d.View3D(this.viewPort);
        var loadModel = new egret3d.ModeLoader("resource/robot/", "body.esm");
        loadModel.addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.checkComplete(e); });
        loadModel.load();
        this.cameraController = new egret3d.LookAtController(this.view3D.camera3D, new egret3d.Object3D());
        this.cameraController.setEyesLength(400);
        requestAnimationFrame(function () { return _this.update(); });
    };
    p.checkComplete = function (e) {
        var loader = e.data;
        var mesh = loader.mesh;
        this.view3D.addChild3D(mesh);
    };
    p.update = function () {
        var _this = this;
        var data = new Date();
        this.delay = data.getTime() - this.time;
        this.time = data.getTime();
        this.view3D.renden(this.time, this.delay);
        this.cameraController.update();
        window.requestAnimationFrame(function () { return _this.update(); });
    };
    return Sample_3DMaxModel;
})();
egret.registerClass(Sample_3DMaxModel,"Sample_3DMaxModel");
