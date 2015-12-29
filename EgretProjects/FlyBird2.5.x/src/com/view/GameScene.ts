/**
 * 游戏场景
 * @author 羊力大仙 
 * @date 2015.10.27
 */
class GameScene extends BaseScene{

    private bird:BirdMC = new BirdMC();
    private introduceUI:IntorduceUI = new IntorduceUI();
    private gameOverUI: GameOverUI = new GameOverUI();
    private guanupPool:ObjectPool = ObjectPool.getPool(GuanUpUI.NAME);
    private guandownPool:ObjectPool = ObjectPool.getPool(GuanDownUI.NAME);
    private guanList:Array<BaseGuan> = [];
    private screenMoveSpeed:number = -3;
    private stageWidth:number;
    private stageHeight:number;
    private scoreLabel:eui.Label;
    public score:number = 0;
    private gravity:number = 0.5;  //重力

	public constructor() {
        super();
        this.skinName = "resource/myskins/scene/GameSceneSkin.exml";
        this.stageWidth = LayerManager.getInstance().stage.stageWidth;
        this.stageHeight = LayerManager.getInstance().stage.stageHeight;
	}


    public onEnable(): void {
        LayerManager.getInstance().popLayer.addChild(this.scoreLabel);
        this.addBird();
        this.addIntroduceUI();
        this.setScoreLable(0);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    
    public onRemove(): void {
        this.addChild(this.scoreLabel);
        this.bird.stop();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }

    private addBird():void{
        this.bird.x = this.bird.width;
        this.bird.y = LayerManager.getInstance().stage.stageHeight/2;
        this.addChild(this.bird);
        this.bird.play(-1);
    }

    private addIntroduceUI():void{
        this.addChild(this.introduceUI);
    }

    private startGame():void{
        this.removeChild(this.introduceUI);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    public resetGame(): void {
        var len: number = this.guanList.length;
        var guan: BaseGuan;
        for(var i: number = 0;i < len;i++) {
            guan = this.guanList[i];
            guan.reset();
            guan.parent && guan.parent.removeChild(guan);
        }
        this.guanList.length = 0;
        
        this.onEnable();
        
    }

    private onTouchTap():void{
        this.bird.fly();
    }

    private onEnterFrame():void{
        this.moveBird();
        this.createGuan();
        this.moveGuan();
    }

    private createTime:number = 80;   //创建水管间隔
    private craeteCount:number = 0;   //创建水管间隔计数
    private minDis:number = 70;       //两水管之间最小距离
    private maxDis:number = 150;      //两水管之间最大距离
    private upMin:number = 120;        //朝上水管露出最低的长度
    private createGuan():void{
        this.craeteCount++;
        if(this.craeteCount%this.createTime == 0){
            var up:GuanUpUI = this.guanupPool.getObject();
            var down:GuanDownUI = this.guandownPool.getObject();
            up.x = this.stageWidth + up.width;
            up.y = (this.stageHeight - up.height)  + Math.random()*(up.height - this.upMin);
            down.x = up.x;
            down.y = up.y - down.height - NumberTool.getRandomInt(this.minDis, this.maxDis);
            this.addChild(up);
            this.addChild(down);
            this.guanList.push(up,down);
        }
    }

    private moveBird():void{
        this.bird.speedY += this.gravity;
        this.bird.y += this.bird.speedY;
        this.bird.rotation = this.bird.speedY*3;
        if(this.bird.y <= 0 || this.bird.y >= this.stageHeight){
            this.gameOver();
        }
    }


    private birdRect:egret.Rectangle = new egret.Rectangle();
    private guanRect:egret.Rectangle = new egret.Rectangle();
    private moveGuan():void{
        var len:number = this.guanList.length;
        var guan:BaseGuan;
        for(var i:number=len-1;i>=0;i--){
            //移动
            guan = this.guanList[i];
            guan.x += this.screenMoveSpeed;
            //算分
            if(i%2 == 0 && guan.isChecked == false && guan.x < this.bird.x){
                this.setScoreLable(++this.score);
                guan.isChecked = true;
            }
            //边界检测
            if(guan.x <= -guan.width){
                guan.reset();
                this.guanList.splice(i,1);
                if(guan instanceof GuanUpUI){
                    this.guanupPool.returnObject(guan);
                }else{
                    this.guandownPool.returnObject(guan);
                }
            }
            //碰撞检测
            if(this.hitTest(this.bird,guan,this.bird.hitRect, guan.getBounds())){
                this.gameOver();
            }

        }
    }

    public  hitTest(obj1:egret.DisplayObject,obj2:egret.DisplayObject,rect1:egret.Rectangle,rect2:egret.Rectangle):boolean
    {
        rect1.x = obj1.x - 10;
        rect1.y = obj1.y - 10;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    }


    private setScoreLable(score:number):void{
        this.score = score;
        this.scoreLabel.text = "score:" + this.score;
    }

    private gameOver():void{
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
        this.bird.stop();
        this.gameOverUI.show(this);
    }

}


















