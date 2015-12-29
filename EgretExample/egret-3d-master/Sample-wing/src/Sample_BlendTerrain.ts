class Sample_BlendTerrain extends Sample_CreateView3D{

    protected _wireframeMesh: egret3d.WireframeMesh = null;
    protected _enableWireframe: boolean = false;

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        this._view3D.sky = new egret3d.Sky(new egret3d.SkyTexture(
            <HTMLImageElement>document.getElementById("t1_1"),
            <HTMLImageElement>document.getElementById("t1_2"),
            <HTMLImageElement>document.getElementById("t1_3"),
            <HTMLImageElement>document.getElementById("t1_4"),
            <HTMLImageElement>document.getElementById("t1_5"),
            <HTMLImageElement>document.getElementById("t1_6")
        ));

        egret3d.AssetsManager.getInstance().setRootURL("resource/");
        egret3d.AssetsManager.getInstance().addEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.onLoadComplete(e));
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

        egret3d.Input.instance.addListenerKeyUp((keyCode: number) => this.onKeyUp(keyCode));

    }

    protected onKeyUp(keyCode: number): void {

        if (keyCode == egret3d.KeyCode.Key_1) {

            this._enableWireframe = !this._enableWireframe;

            if (true == this._enableWireframe) {
                this._view3D.addWireframe(this._wireframeMesh);
            }
            else {
                this._view3D.delWireframe(this._wireframeMesh);
            }
        }
    }

    protected onLoadComplete(e: egret3d.Event3D): void {

        egret3d.AssetsManager.getInstance().removeEventListener(egret3d.Event3D.EVENT_LOAD_COMPLETE, (e: egret3d.Event3D) => this.onLoadComplete(e));

        this._cameraCtl.setEyesLength(5000);

        var dir: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(0.5, 0.9, 0.7));

        dir.intensity = 0.6;

        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();

        lightGroup.addDirectLight(dir);

        var colorMap: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/ColorMap.jpg");
        var mask: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/Mask.jpg");
        var rtexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand.jpg");
        var gtexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Cliff.jpg");
        var btexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand_stone.jpg");
        var atexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/ground/Sand_2.jpg");
        var height: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/height.jpg");
        var light: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/light.jpg");
        var normalTexture: egret3d.TextureBase = egret3d.AssetsManager.getInstance().findTexture("terrain/normal.jpg");
        var geo: egret3d.ElevationGeometry = new egret3d.ElevationGeometry(height, 5000, 1000, 5000, 200, 200, 2000, -1000);

        var fog: egret3d.DistanceFog = new egret3d.DistanceFog();
        fog.fogColor = 0xefbe95;
        fog.globalDensity = 0.002;
        fog.startDistance = 700;
        fog.distanceScale = 0.08;

        var mat: egret3d.TerrainMaterial = new egret3d.TerrainMaterial(colorMap, mask, rtexture, gtexture, btexture, atexture, light);
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

        var mesh: egret3d.Mesh = new egret3d.Mesh(geo, mat);

        mesh.isCut = false;

        mesh.material.acceptShadow = false;

        mesh.material.castShadow = false;

        //this._view3D.addChild3D(mesh);

        this._wireframeMesh = new egret3d.WireframeMesh();

        this._wireframeMesh.creatByMesh(mesh);

        this.onKeyUp(egret3d.KeyCode.Key_1);
    }

    protected onUpdate(): void {

        super.onUpdate();
    }
} 