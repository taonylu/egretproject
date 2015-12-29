var Sample_MaterialBlend = (function (_super) {
    __extends(Sample_MaterialBlend, _super);
    function Sample_MaterialBlend() {
        _super.call(this);
    }
    var d = __define,c=Sample_MaterialBlend;p=c.prototype;
    p.onView3DInitComplete = function () {
        _super.prototype.onView3DInitComplete.call(this);
        var plane = new egret3d.Mesh(new egret3d.PlaneGeometry(), new egret3d.TextureMaterial());
        var box1 = new egret3d.Mesh(new egret3d.CubeGeometry(40, 40, 40), new egret3d.TextureMaterial());
        box1.x = -40;
        box1.y = 20;
        box1.material.blendMode = egret3d.BlendMode.ADD;
        var box2 = new egret3d.Mesh(new egret3d.CubeGeometry(40, 40, 40), new egret3d.TextureMaterial());
        box2.x = 40;
        box2.y = 20;
        box2.material.blendMode = egret3d.BlendMode.ALPHA;
        this._view3D.addChild3D(box1);
        this._view3D.addChild3D(box2);
        this._view3D.addChild3D(plane);
        this._cameraCtl.setEyesLength(500);
    };
    return Sample_MaterialBlend;
})(Sample_CreateSky);
egret.registerClass(Sample_MaterialBlend,"Sample_MaterialBlend");
