class Sample_MaterialBlend extends Sample_CreateSky{

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        super.onView3DInitComplete();

        var plane: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(), new egret3d.TextureMaterial());

        var box1: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(40, 40, 40), new egret3d.TextureMaterial());
        box1.x = -40;
        box1.y = 20;
        box1.material.blendMode = egret3d.BlendMode.ADD;

        var box2: egret3d.Mesh = new egret3d.Mesh(new egret3d.CubeGeometry(40, 40, 40), new egret3d.TextureMaterial());
        box2.x = 40;
        box2.y = 20;
        box2.material.blendMode = egret3d.BlendMode.ALPHA;

        this._view3D.addChild3D(box1);

        this._view3D.addChild3D(box2);

        this._view3D.addChild3D(plane);

        this._cameraCtl.setEyesLength(500);
    }
}