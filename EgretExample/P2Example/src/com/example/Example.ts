/**
 *
 * @author 
 *   
 */
class Example extends egret.Sprite{
    
    //-----------------------------测试------------------------
    //1.  world物理世界 
    //2.  shape 刚体形状
    //3.  body 刚体，集合了shape和displayObject，以及位置、质量等属性
    //4.  plane 地板，角度面向y轴的。当为0度时，和y轴一个方向，朝下。
    //4.  display  刚体皮肤
    //5.  onEnterFrame中，display位置和角度跟随body变化，在视觉上体现刚体的移动
    //6.  碰撞检测, 根据id来判断碰撞的物体
    //7.  物体受力方向和强度   velocity速度  force力，一般用速度来让物体移动
    //8. 判断物体是否静止 boxBody.sleepState == p2.Body.SLEEPING
    
    private world: p2.World;
    
    public constructor() {
        super();
        
        this.createWorld();
        this.createGround();
        this.createFlyRect();
        
        this.world.on("beginContact",this.onBeginContact,this);
        this.world.on("endContact",this.onEndContact,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addOne,this);
    }
    
    //碰撞开始
    private onBeginContact(e): void {
        var bodyA: p2.Body = e.bodyA;
        var bodyB: p2.Body = e.bodyB;
        bodyA.displays[0].alpha = 0.5;
        bodyB.displays[0].alpha = 0.5;
    }
    
    //碰撞结束
    private onEndContact(e): void {
        var bodyA: p2.Body = e.bodyA;
        var bodyB: p2.Body = e.bodyB;
        bodyA.displays[0].alpha = 1;
        bodyB.displays[0].alpha = 1;
    }
    
    //每帧更新刚体皮肤
    private onEnterFrame(): void {
        this.world.step(60 / 1000);
        
        var len:number = this.world.bodies.length;
        for(var i: number = 0;i < len;i++) {
            var body: p2.Body = this.world.bodies[i];
            var display: egret.DisplayObject = body.displays[0];
            display.x = body.position[0];
            display.y = body.position[1];
            display.rotation = body.angle  * 180 / Math.PI;
        }
        
    }
    
    //点击添加一个物体
    private addOne(e:egret.TouchEvent): void {
        var shape: p2.Rectangle = new p2.Rectangle(50,50);
        var body: p2.Body = new p2.Body({mass:10, position:[e.stageX,e.stageY]});
        body.addShape(shape);
        this.world.addBody(body);
        var display: egret.Sprite = this.createRect(50,50);
        display.x = e.stageX;
        display.y = e.stageY;
        this.addChild(display);
        body.displays = [display];
    }
	
    //创建world
    private createWorld(): void {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world.gravity = [0,10];
    }
    
    //创建地板
    private createGround(): void {
        var shape: p2.Plane = new p2.Plane();
        var body: p2.Body = new p2.Body();
        body.position[1] = GameConst.stage.stageHeight - 100;
        body.angle = Math.PI;
        body.addShape(shape);
        this.world.addBody(body);
        var display: egret.Sprite = this.createRect(500,100);
        body.displays = [display];
        this.addChild(display);
    }
    
    //创建一个受力的飞行方块
    private createFlyRect(): void {
        var shape: p2.Rectangle = new p2.Rectangle(50,50);
        // velocity 速度，  force力。 力貌似要根据mass得出velocity？
        //var body: p2.Body = new p2.Body({ mass: 10,position: [100,100],angularVelocity: 1,velocity: [10,-10]});
        var body: p2.Body = new p2.Body({ mass: 1,position: [100,100],angularVelocity: 1,force: [100,-10] });
        body.addShape(shape);
        this.world.addBody(body);
        var display: egret.Sprite = this.createRect(50,50);
        display.x = 100;
        display.y = 100;
        this.addChild(display);
        body.displays = [display];

    }
    
    //创建一个方块皮肤
    private createRect(w:number, h:number): egret.Sprite {
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(0xff0000);
        sp.graphics.drawRect(0,0,w,h);
        sp.graphics.endFill();
        sp.anchorOffsetX = sp.width / 2;
        sp.anchorOffsetY = sp.height / 2;
        return sp;
    }
    
}













