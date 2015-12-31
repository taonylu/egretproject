var Sample_MousePick = (function (_super) {
    __extends(Sample_MousePick, _super);
    function Sample_MousePick() {
        _super.call(this);
        this._boxs = [null, null];
        this._currentSelected = null;
    }
    var d = __define,c=Sample_MousePick;p=c.prototype;
    p.onView3DInitComplete = function () {
        var _this = this;
        var lightGroup = new egret3d.LightGroup();
        var directLight = new egret3d.DirectLight(new egret3d.Vector3D(100, 100, 100));
        directLight.diffuse = 0xffffff;
        lightGroup.addDirectLight(directLight);
        this._boxs[0] = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial());
        this._boxs[0].x = -80;
        this._boxs[0].mouseEnable = true;
        this._boxs[0].addEventListener(egret3d.Event3D.MOUSE_CLICK, function (e) { return _this.onMouseClick(e); });
        this._boxs[0].material.lightGroup = lightGroup;
        this._view3D.addChild3D(this._boxs[0]);
        this._boxs[1] = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial());
        this._boxs[1].x = 80;
        this._boxs[1].mouseEnable = true;
        this._boxs[1].addEventListener(egret3d.Event3D.MOUSE_CLICK, function (e) { return _this.onMouseClick(e); });
        this._boxs[1].material.lightGroup = lightGroup;
        this._view3D.addChild3D(this._boxs[1]);
        this._cameraCtl.setEyesLength(1000);
        _super.prototype.onView3DInitComplete.call(this);
    };
    p.onMouseClick = function (e) {
        this._currentSelected = e.currentTarget;
    };
    p.onUpdate = function () {
        if (this._currentSelected != null) {
            this._currentSelected.rotationY += this._delay / 4.0;
        }
        _super.prototype.onUpdate.call(this);
    };
    return Sample_MousePick;
})(Sample_CreateSky);
egret.registerClass(Sample_MousePick,"Sample_MousePick");
