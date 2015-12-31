class Sample_CreateSky extends Sample_CreateView3D {

    public constructor() {
        super();
    }

    protected onView3DInitComplete(): void {

        var skyTexture: egret3d.SkyTexture = new egret3d.SkyTexture(
            <HTMLImageElement>document.getElementById("t1"),
            <HTMLImageElement>document.getElementById("t2"),
            <HTMLImageElement>document.getElementById("t3"),
            <HTMLImageElement>document.getElementById("t4"),
            <HTMLImageElement>document.getElementById("t5"),
            <HTMLImageElement>document.getElementById("t6")
        );

        this._view3D.sky = new egret3d.Sky(skyTexture);
    }
}