/**
 *  拉登的p2物理demo
 */
var Example2 = (function (_super) {
    __extends(Example2, _super);
    function Example2() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Example2;p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);
        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);
        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
    };
    p.createWorld = function () {
        var wrd = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0, 10];
        this.world = wrd;
    };
    p.createGround = function () {
        var stageHeight = egret.MainContext.instance.stage.stageHeight;
        var groundShape = new p2.Plane();
        var groundBody = new p2.Body();
        groundBody.position[1] = stageHeight - 100;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);
        this.world.addBody(groundBody);
    };
    p.createBodies = function () {
        var boxShape = new p2.Rectangle(100, 50);
        var boxBody = new p2.Body({ mass: 1, position: [200, 200] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
        var boxShape = new p2.Rectangle(50, 50);
        var boxBody = new p2.Body({ mass: 1, position: [200, 180], angularVelocity: 1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    };
    p.loop = function () {
        this.world.step(60 / 1000);
        this.debugDraw.drawDebug();
    };
    p.addOneBox = function (e) {
        var positionX = Math.floor(e.stageX);
        var positionY = Math.floor(e.stageY);
        if (Math.random() > 0.5) {
            //添加方形刚体
            var boxShape = new p2.Rectangle(Math.random() * 150 + 50, 100);
            var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
        else {
            //添加圆形刚体
            var boxShape = new p2.Circle(50);
            var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
    };
    p.createDebug = function () {
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);
        var sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    };
    return Example2;
})(egret.Sprite);
egret.registerClass(Example2,"Example2");
