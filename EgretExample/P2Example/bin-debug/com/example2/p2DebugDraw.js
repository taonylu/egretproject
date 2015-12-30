var p2DebugDraw = (function () {
    function p2DebugDraw(world) {
        this.COLOR_D_SLEEP = 0x999999;
        this.COLOR_D_WAKE = 0xe5b2b2;
        this.COLOR_K = 0x7f7fe5;
        this.COLOR_S = 0x7fe57f;
        this.world = world;
    }
    var d = __define,c=p2DebugDraw;p=c.prototype;
    p.setSprite = function (sprite) {
        this.sprite = sprite;
    };
    p.drawDebug = function () {
        this.sprite.graphics.clear();
        var l = this.world.bodies.length;
        for (var i = 0; i < l; i++) {
            var body = this.world.bodies[i];
            for (var j = 0; j < body.shapes.length; j++) {
                var shape = body.shapes[j];
                if (shape instanceof p2.Convex) {
                    this.drawConvex(shape, body);
                }
                else if (shape instanceof p2.Plane) {
                    this.drawPlane(shape, body);
                }
                else if (shape instanceof p2.Circle) {
                    this.drawCircle(shape, body);
                }
            }
        }
    };
    p.drawConvex = function (shape, b) {
        var color = this.getColor(b);
        var l = shape.vertices.length;
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        var worldPoint = new Array();
        b.toWorldFrame(worldPoint, shape.vertices[0]);
        //g.moveTo(worldPoint[0], worldPoint[1]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(worldPoint[0], worldPoint[1]);
        for (var i = 1; i <= l; i++) {
            b.toWorldFrame(worldPoint, shape.vertices[i % l]);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }
        g.endFill();
    };
    p.drawCircle = function (shape, b) {
        var color = this.getColor(b);
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], shape.radius);
        var edge = new Array();
        b.toWorldFrame(edge, [shape.radius, 0]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(edge[0], edge[1]);
        g.endFill();
    };
    p.drawPlane = function (shape, b) {
        var color = this.COLOR_D_SLEEP;
        var g = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 1);
        var start = new Array();
        var end = new Array();
        b.toWorldFrame(start, [-1000, 0]);
        g.moveTo(start[0], start[1]);
        b.toWorldFrame(end, [1000, 0]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [1000, -1000]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [-1000, -1000]);
        g.lineTo(end[0], end[1]);
        b.toWorldFrame(end, [-1000, -0]);
        g.lineTo(end[0], end[1]);
        g.endFill();
    };
    p.getColor = function (b) {
        var color = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        }
        else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        }
        else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }
        return color;
    };
    return p2DebugDraw;
})();
egret.registerClass(p2DebugDraw,"p2DebugDraw");
