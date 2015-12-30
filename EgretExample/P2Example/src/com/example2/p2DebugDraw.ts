
class p2DebugDraw{

    private sprite: egret.Sprite;
    private world: p2.World;
    private COLOR_D_SLEEP: number = 0x999999;
    private COLOR_D_WAKE: number = 0xe5b2b2;
    private COLOR_K: number = 0x7f7fe5;
    private COLOR_S: number = 0x7fe57f;

    public constructor(world:p2.World) {
        this.world = world;
    }
    public setSprite(sprite: egret.Sprite) {
        this.sprite = sprite;
    }
    public drawDebug(): void {
        this.sprite.graphics.clear();

        var l: number = this.world.bodies.length;
        for (var i: number = 0; i < l; i++) {
            var body: p2.Body = this.world.bodies[i];
            for (var j: number = 0; j < body.shapes.length; j++) {
                var shape: p2.Shape = body.shapes[j];
                if (shape instanceof p2.Convex) {
                    this.drawConvex(<p2.Convex>shape,body);
                }
                else if (shape instanceof p2.Plane) {
                    this.drawPlane(<p2.Plane>shape, body);
                }
                else if (shape instanceof p2.Circle) {
                    this.drawCircle(<p2.Circle>shape, body);
                }
            }
        }
    }

    private drawConvex(shape: p2.Convex, b: p2.Body): void {
        var color: number = this.getColor(b);

        var l: number = shape.vertices.length;
        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);

        var worldPoint: number[] = new Array();
        b.toWorldFrame(worldPoint, shape.vertices[0]);
        //g.moveTo(worldPoint[0], worldPoint[1]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(worldPoint[0], worldPoint[1]);
        for (var i: number = 1; i <= l; i++) {
            b.toWorldFrame(worldPoint, shape.vertices[i%l]);
            g.lineTo(worldPoint[0], worldPoint[1]);
        }

        
        g.endFill();
    }
    private drawCircle(shape:p2.Circle,b:p2.Body): void {
        var color: number = this.getColor(b);

        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 0.5);
        g.drawCircle(b.position[0], b.position[1], shape.radius);

        var edge: number[] = new Array();
        b.toWorldFrame(edge, [shape.radius, 0]);
        g.moveTo(b.position[0], b.position[1]);
        g.lineTo(edge[0], edge[1]);

        g.endFill();
    }
    private drawPlane(shape: p2.Plane, b: p2.Body): void {
        var color: number = this.COLOR_D_SLEEP;
        var g: egret.Graphics = this.sprite.graphics;
        g.lineStyle(1, color);
        g.beginFill(color, 1);

        var start: number[] = new Array();
        var end: number[] = new Array();
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

    }
    private getColor(b: p2.Body): number {
        var color: number = this.COLOR_D_SLEEP;
        if (b.type == p2.Body.KINEMATIC) {
            color = this.COLOR_K;
        } else if (b.type == p2.Body.STATIC) {
            color = this.COLOR_S;
        } else if (b.sleepState == p2.Body.AWAKE) {
            color = this.COLOR_D_WAKE;
        }
        
        return color;
    }
}


