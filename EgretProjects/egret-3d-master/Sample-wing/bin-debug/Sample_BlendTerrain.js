var Sample_BlendTerrain = (function (_super) {
    __extends(Sample_BlendTerrain, _super);
    function Sample_BlendTerrain() {
        _super.call(this);
        this._wireframeMesh = null;
        this._enableWireframe = false;
    }
    var d = __define,c=Sample_BlendTerrain;p=c.prototype;
    p.onView3DInitComplete = function () {
        var _this = this;
        this._view3D.sky = new egret3d.Sky(new egret3d.SkyTexture(document.getElementById("t1_1"), document.getElementById("t1_2"), document.getElementById("t1_3"), document.getElementById("t1_4"), document.getElementById("t1_5"), document.getElementById("t1_6")));
        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.onLoadComplete(e); });
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/height.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/light.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/normal.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ColorMap.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/Mask.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Cliff.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand_2.jpg");
        egret3d.AssetsManager.getInstance().addLoadTexture("terrain/ground/Sand_stone.jpg");
        egret3d.AssetsManager.getInstance().startLoad();
        egret3d.Input.instance.addListenerKeyUp(function (keyCode) { return _this.onKeyUp(keyCode); });
    };
    p.onKeyUp = function (keyCode) {
        if (keyCode == egret3d.KeyCode.Key_1) {
            this._enableWireframe = !this._enableWireframe;
            if (true == this._enableWireframe) {
                this._view3D.addWireframe(this._wireframeMesh);
            }
            else {
                this._view3D.delWireframe(this._wireframeMesh);
            }
        }
    };
    p.onLoadComplete = function (e) {
        var _this = this;
        egret3d.AssetsManager.getInstance().removeEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, function (e) { return _this.onLoadComplete(e); });
        this._cameraCtl.setEyesLength(5000);
        var dir = new egret3d.DirectLight(new egret3d.Vector3D(0.5, 0.9, 0.7));
        dir.intensity = 0.6;
        var lightGroup = new egret3d.LightGroup();
        lightGroup.addDirectLight(dir);
        var colorMap = egret3d.AssetsManager.getInstance().findTexture("terrain/ColorMap.jpg");
        var mask = egret3d.AssetsManager.getInstance().findTexture("terrain/Mask.jpg");
        var rtexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand.jpg");
        var gtexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Cliff.jpg");
        var btexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand_stone.jpg");
        var atexture = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand_2.jpg");
        var height = egret3d.AssetsManager.getInstance().findTexture("terrain/height.jpg");
        var light = egret3d.AssetsManager.getInstance().findTexture("terrain/light.jpg");
        var normalTexture = egret3d.AssetsManager.getInstance().findTexture("terrain/normal.jpg");
        var geo = new egret3d.ElevationGeometry(height, 5000, 1000, 5000, 200, 200, 2000, -1000);
        var fog = new egret3d.DistanceFog();
        fog.fogColor = 0xefbe95;
        fog.globalDensity = 0.002;
        fog.startDistance = 700;
        fog.distanceScale = 0.08;
        var mat = new egret3d.TerrainMaterial(colorMap, mask, rtexture, gtexture, btexture, atexture, light);
        mat.normalTexture = normalTexture;
        mat.specularColor = 0xffffff;
        mat.shininess = 100.0;
        mat.specularPower = 0.9;
        mat.setUVTitling(0, 60, 60);
        mat.setUVTitling(1, 60, 60);
        mat.setUVTitling(2, 60, 60);
        mat.setUVTitling(3, 60, 60);
        mat.lightGroup = lightGroup;
        mat.addDiffusePassEffectMothod(fog);
        var mesh = new egret3d.Mesh(geo, mat);
        mesh.isCut = false;
        mesh.material.acceptShadow = false;
        mesh.material.castShadow = false;
        //this._view3D.addChild3D(mesh);
        this._wireframeMesh = new egret3d.WireframeMesh();
        this._wireframeMesh.creatByMesh(mesh);
        this.onKeyUp(egret3d.KeyCode.Key_1);
    };
    p.onUpdate = function () {
        _super.prototype.onUpdate.call(this);
    };
    return Sample_BlendTerrain;
})(Sample_CreateView3D);
egret.registerClass(Sample_BlendTerrain,"Sample_BlendTerrain");
