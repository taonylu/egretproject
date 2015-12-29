var Sample_CreateSky = (function (_super) {
    __extends(Sample_CreateSky, _super);
    function Sample_CreateSky() {
        _super.call(this);
    }
    var d = __define,c=Sample_CreateSky;p=c.prototype;
    p.onView3DInitComplete = function () {
        var skyTexture = new egret3d.SkyTexture(document.getElementById("t1"), document.getElementById("t2"), document.getElementById("t3"), document.getElementById("t4"), document.getElementById("t5"), document.getElementById("t6"));
        this._view3D.sky = new egret3d.Sky(skyTexture);
    };
    return Sample_CreateSky;
})(Sample_CreateView3D);
egret.registerClass(Sample_CreateSky,"Sample_CreateSky");
