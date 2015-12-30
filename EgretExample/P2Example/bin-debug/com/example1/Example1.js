/**
 *
 * 第三方物理引擎演示
 *  官方p2教程提供的链接，物理小球示例，其实就是rect和circle...
 * @author
 *
 */
var Example1 = (function (_super) {
    __extends(Example1, _super);
    function Example1() {
        _super.call(this);
        //debug模式，使用图形绘制
        this.isDebug = false;
        this.createGameScene();
    }
    var d = __define,c=Example1;p=c.prototype;
    /**
     * 创建游戏场景
     */
    p.createGameScene = function () {
        //egret.Profiler.getInstance().run();
        var factor = 50;
        //创建world
        var world = new p2.World();
        world.sleepMode = p2.World.BODY_SLEEPING;
        //创建plane
        var planeShape = new p2.Plane();
        var planeBody = new p2.Body();
        planeBody.addShape(planeShape);
        planeBody.displays = [];
        world.addBody(planeBody);
        egret.Ticker.getInstance().register(function (dt) {
            if (dt < 10) {
                return;
            }
            if (dt > 1000) {
                return;
            }
            world.step(dt / 1000);
            var stageHeight = egret.MainContext.instance.stage.stageHeight;
            var l = world.bodies.length;
            for (var i = 0; i < l; i++) {
                var boxBody = world.bodies[i];
                var box = boxBody.displays[0];
                if (box) {
                    box.x = boxBody.position[0] * factor;
                    box.y = stageHeight - boxBody.position[1] * factor;
                    box.rotation = 360 - (boxBody.angle + boxBody.shapeAngles[0]) * 180 / Math.PI;
                    if (boxBody.sleepState == p2.Body.SLEEPING) {
                        box.alpha = 0.5;
                    }
                    else {
                        box.alpha = 1;
                    }
                }
            }
        }, this);
        //鼠标点击添加刚体
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, addOneBox, this);
        var self = this;
        function addOneBox(e) {
            var positionX = Math.floor(e.stageX / factor);
            var positionY = Math.floor((egret.MainContext.instance.stage.stageHeight - e.stageY) / factor);
            var display;
            if (Math.random() > 0.5) {
                //添加方形刚体
                var boxShape = new p2.Rectangle(2, 1);
                var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
                boxBody.addShape(boxShape);
                world.addBody(boxBody);
                if (self.isDebug) {
                    display = self.createBox(boxShape.width * factor, boxShape.height * factor);
                }
                else {
                    display = self.createBitmapByName("rect_jpg");
                }
                display.width = boxShape.width * factor;
                display.height = boxShape.height * factor;
            }
            else {
                //添加圆形刚体
                var boxShape = new p2.Circle(1);
                var boxBody = new p2.Body({ mass: 1, position: [positionX, positionY] });
                boxBody.addShape(boxShape);
                world.addBody(boxBody);
                if (self.isDebug) {
                    display = self.createBall(boxShape.radius * factor);
                }
                else {
                    display = self.createBitmapByName("circle_jpg");
                }
                display.width = boxShape.radius * 2 * factor;
                display.height = boxShape.radius * 2 * factor;
            }
            display.anchorOffsetX = display.width / 2;
            display.anchorOffsetY = display.height / 2;
            boxBody.displays = [display];
            self.addChild(display);
        }
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 创建一个圆形
     */
    p.createBall = function (r) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawCircle(r, r, r);
        shape.graphics.endFill();
        return shape;
    };
    /**
     * 创建一个方形
     */
    p.createBox = function (width, height) {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xfff000);
        shape.graphics.drawRect(0, 0, width, height);
        shape.graphics.endFill();
        return shape;
    };
    return Example1;
})(egret.Sprite);
egret.registerClass(Example1,"Example1");
