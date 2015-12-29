var Sample_Light = (function () {
    function Sample_Light() {
        var _this = this;
        this.time = 0;
        this.delay = 0;
        this._viewPort = new egret3d.Rectangle(0, 0, window.innerWidth, window.innerHeight);
        egret3d.Egret3DDrive.requstContext3D(DeviceUtil.getGPUMode, new egret3d.Rectangle(0, 0, this._viewPort.width, this._viewPort.height), function () { return _this.init3D(); });
    }
    var d = __define,c=Sample_Light;p=c.prototype;
    p.init3D = function () {
        var _this = this;
        this._view3D = new egret3d.View3D(this._viewPort);
        this._view3D.useShadow = true;
        this._view3D.camera3D.position = new egret3d.Vector3D(0, 5, -10);
        this._cameraCtl = new egret3d.LookAtController(this._view3D.camera3D, new egret3d.Object3D());
        this._cameraCtl.setEyesLength(400);
        this.initScene();
        window.requestAnimationFrame(function () { return _this.update(); });
        egret3d.Input.instance.addListenerKeyDown(function (e) { return _this.keyDown(e); });
    };
    p.keyDown = function (e) {
        switch (e) {
            case egret3d.KeyCode.Key_L:
                this._shadowMaping.bias += 0.00001;
                break;
            case egret3d.KeyCode.Key_K:
                this._shadowMaping.bias -= 0.00001;
                break;
            case egret3d.KeyCode.Key_H:
                this._shadowMaping.bias += 0.001;
                break;
            case egret3d.KeyCode.Key_J:
                this._shadowMaping.bias -= 0.001;
                break;
        }
    };
    p.initScene = function () {
        var sprherMesh = new egret3d.Mesh(new egret3d.SphereGeometry(5, 25, 25), new egret3d.TextureMaterial());
        sprherMesh.x = 120;
        sprherMesh.y = 120;
        sprherMesh.z = 120;
        var lightGroup = new egret3d.LightGroup();
        var directLight = new egret3d.DirectLight(sprherMesh.position.clone());
        directLight.position = sprherMesh.position;
        directLight.diffuse = 0xffffff;
        lightGroup.addDirectLight(directLight);
        egret3d.ShadowRender.castShadowLight = directLight;
        var cubeMesh = new egret3d.Mesh(new egret3d.CubeGeometry(50, 50, 50), new egret3d.TextureMaterial());
        var planeMesh = new egret3d.Mesh(new egret3d.PlaneGeometry(1000, 1000, 1, 1, 10, 10), new egret3d.TextureMaterial());
        cubeMesh.material.lightGroup = lightGroup;
        this._shadowMaping = new egret3d.ShadowMapingMethod();
        for (var i = 0; i < 1; i++) {
            var mesh = cubeMesh.clone();
            mesh.material.acceptShadow = true;
            mesh.material.castShadow = true;
            mesh.material.lightGroup = lightGroup;
            mesh.material.shadowMapingMethod = this._shadowMaping;
            mesh.y = 25;
            this._view3D.addChild3D(mesh);
            var wireframeMesh = new egret3d.WireframeMesh();
            wireframeMesh.creatByMesh(mesh);
            this._view3D.addWireframe(wireframeMesh);
        }
        planeMesh.material.lightGroup = lightGroup;
        planeMesh.material.shadowMapingMethod = this._shadowMaping;
        cubeMesh.material.specularColor = 0xffffff;
        planeMesh.material.specularColor = 0xffffff;
        cubeMesh.material.specularPower = 0.5;
        planeMesh.material.specularPower = 0.5;
        cubeMesh.material.ambientColor = 0x00235c;
        planeMesh.material.ambientColor = 0x00235c;
        cubeMesh.material.shininess = 10.0;
        planeMesh.material.shininess = 10.0;
        planeMesh.material.castShadow = true;
        cubeMesh.material.acceptShadow = true;
        planeMesh.material.acceptShadow = true;
        this._view3D.addChild3D(sprherMesh);
        this._view3D.addChild3D(planeMesh);
    };
    p.update = function () {
        var _this = this;
        this.timeDate = new Date();
        this.delay = this.timeDate.getTime() - this.time;
        this.time = this.timeDate.getTime();
        this._cameraCtl.update();
        this._view3D.renden(this.time, this.delay);
        window.requestAnimationFrame(function () { return _this.update(); });
    };
    return Sample_Light;
})();
egret.registerClass(Sample_Light,"Sample_Light");
