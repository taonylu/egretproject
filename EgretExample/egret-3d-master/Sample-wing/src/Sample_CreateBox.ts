class Sample_CreateBox extends Sample_CreateSky{

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        var box: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(), new egret3d.TextureMaterial());

        var lightGroup: egret3d.LightGroup = new egret3d.LightGroup();

        var directLight: egret3d.DirectLight = new egret3d.DirectLight(new egret3d.Vector3D(100, 100, 100));

        directLight.diffuse = 0xffffff;

        lightGroup.addDirectLight(directLight);

        box.material.lightGroup = lightGroup;

        this._view3D.addChild3D(box);

        this._cameraCtl.setEyesLength(1000);

        super.onView3DInitComplete();
    }
} 