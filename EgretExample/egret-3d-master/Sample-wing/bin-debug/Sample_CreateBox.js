var Sample_CreateBox = (function (_super) {
    __extends(Sample_CreateBox, _super);
    function Sample_CreateBox() {
        _super.call(this);
    }
    var d = __define,c=Sample_CreateBox;p=c.prototype;
    p.onView3DInitComplete = function () {
        var box = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial());
        var lightGroup = new egret3d.LightGroup();
        var directLight = new egret3d.DirectLight(new egret3d.Vector3D(100, 100, 100));
        directLight.diffuse = 0xffffff;
        lightGroup.addDirectLight(directLight);
        box.material.lightGroup = lightGroup;
        this._view3D.addChild3D(box);
        this._cameraCtl.setEyesLength(1000);
        _super.prototype.onView3DInitComplete.call(this);
    };
    return Sample_CreateBox;
})(Sample_CreateSky);
egret.registerClass(Sample_CreateBox,"Sample_CreateBox");
