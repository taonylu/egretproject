

/**
 *  拉登的p2物理demo
 */ 
class Example2 extends egret.Sprite {

    private debugDraw: p2DebugDraw;
    private world: p2.World;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.loop, this);

        //鼠标点击添加刚体
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addOneBox, this);

        this.createWorld();
        this.createGround();
        this.createBodies();
        this.createDebug();
    }
    private createWorld(): void {
        var wrd:p2.World = new p2.World();
        wrd.sleepMode = p2.World.BODY_SLEEPING;
        wrd.gravity = [0,10];
        this.world = wrd;
    }
    private createGround(): void {
        var stageHeight:number = egret.MainContext.instance.stage.stageHeight;
        var groundShape: p2.Plane = new p2.Plane();
        var groundBody: p2.Body = new p2.Body();
        groundBody.position[1] = stageHeight-100;
        groundBody.angle = Math.PI;
        groundBody.addShape(groundShape);

        this.world.addBody(groundBody);
    }
    private createBodies(): void {
        var boxShape: p2.Shape = new p2.Rectangle(100, 50);
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 200] });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);

        var boxShape: p2.Shape = new p2.Rectangle(50, 50);
        var boxBody: p2.Body = new p2.Body({ mass: 1, position: [200, 180],angularVelocity:1 });
        boxBody.addShape(boxShape);
        this.world.addBody(boxBody);
    }
    private loop(): void {
        this.world.step(60 / 1000);
        this.debugDraw.drawDebug();
    }
    private addOneBox(e: egret.TouchEvent): void {
        var positionX: number = Math.floor(e.stageX);
        var positionY: number = Math.floor(e.stageY);

        if (Math.random() > 0.5) {
            //添加方形刚体
            var boxShape: p2.Shape = new p2.Rectangle(Math.random() *150 + 50, 100);
            var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY], angularVelocity: 1 });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
        else {
            //添加圆形刚体
            var boxShape: p2.Shape = new p2.Circle(50);
            var boxBody: p2.Body = new p2.Body({ mass: 1, position: [positionX, positionY] });
            boxBody.addShape(boxShape);
            this.world.addBody(boxBody);
        }
    }
    private createDebug(): void {
        
        //创建调试试图
        this.debugDraw = new p2DebugDraw(this.world);

        var sprite: egret.Sprite = new egret.Sprite();
        this.addChild(sprite);
        this.debugDraw.setSprite(sprite);
    }
}


