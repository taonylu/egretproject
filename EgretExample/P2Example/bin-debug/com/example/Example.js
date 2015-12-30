/**
 *
 * @author
 *
 */
var Example = (function (_super) {
    __extends(Example, _super);
    function Example() {
        _super.call(this);
        this.createWorld();
        this.createGround();
        this.createFlyRect();
        this.world.on("beginContact", this.onBeginContact, this);
        this.world.on("endContact", this.onEndContact, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addOne, this);
    }
    var d = __define,c=Example;p=c.prototype;
    //碰撞开始
    p.onBeginContact = function (e) {
        var bodyA = e.bodyA;
        var bodyB = e.bodyB;
        bodyA.displays[0].alpha = 0.5;
        bodyB.displays[0].alpha = 0.5;
    };
    //碰撞结束
    p.onEndContact = function (e) {
        var bodyA = e.bodyA;
        var bodyB = e.bodyB;
        bodyA.displays[0].alpha = 1;
        bodyB.displays[0].alpha = 1;
    };
    //每帧更新刚体皮肤
    p.onEnterFrame = function () {
        this.world.step(60 / 1000);
        var len = this.world.bodies.length;
        for (var i = 0; i < len; i++) {
            var body = this.world.bodies[i];
            var display = body.displays[0];
            display.x = body.position[0];
            display.y = body.position[1];
            display.rotation = body.angle * 180 / Math.PI;
        }
    };
    //点击添加一个物体
    p.addOne = function (e) {
        var shape = new p2.Rectangle(50, 50);
        var body = new p2.Body({ mass: 10, position: [e.stageX, e.stageY] });
        body.addShape(shape);
        this.world.addBody(body);
        var display = this.createRect(50, 50);
        display.x = e.stageX;
        display.y = e.stageY;
        this.addChild(display);
        body.displays = [display];
    };
    //创建world
    p.createWorld = function () {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0, 10];
    };
    //创建地板
    p.createGround = function () {
        var shape = new p2.Plane();
        var body = new p2.Body();
        body.position[1] = GameConst.stage.stageHeight - 100;
        body.angle = Math.PI;
        body.addShape(shape);
        this.world.addBody(body);
        var display = this.createRect(500, 100);
        body.displays = [display];
        this.addChild(display);
    };
    //创建一个受力的飞行方块
    p.createFlyRect = function () {
        var shape = new p2.Rectangle(50, 50);
        // velocity 速度，  force力。 力貌似要根据mass得出velocity？
        //var body: p2.Body = new p2.Body({ mass: 10,position: [100,100],angularVelocity: 1,velocity: [10,-10]});
        var body = new p2.Body({ mass: 1, position: [100, 100], angularVelocity: 1, force: [100, -10] });
        body.addShape(shape);
        this.world.addBody(body);
        var display = this.createRect(50, 50);
        display.x = 100;
        display.y = 100;
        this.addChild(display);
        body.displays = [display];
    };
    //创建一个方块皮肤
    p.createRect = function (w, h) {
        var sp = new egret.Sprite();
        sp.graphics.beginFill(0xff0000);
        sp.graphics.drawRect(0, 0, w, h);
        sp.graphics.endFill();
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        return sp;
    };
    return Example;
})(egret.Sprite);
egret.registerClass(Example,"Example");
