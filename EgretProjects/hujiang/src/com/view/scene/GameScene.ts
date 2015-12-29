/**
 *
 * @author 
 *
 */
class GameScene extends BaseScene{
    private scoreLabel: eui.Label;
    private timeLabel: eui.Label;
    private gameTimeLimit: number = 20;
    public score: number = 0;
    public time: number = 0;
    private gameTimer: egret.Timer = new egret.Timer(1000);
    private dropTimer: egret.Timer = new egret.Timer(300);
    private dropSpeed: number = 5;
    private playerSpeed: number = 7;
    
    private pillPool: ObjectPool = ObjectPool.getPool(Pill.NAME, 10);
    private pill5Pool: ObjectPool = ObjectPool.getPool(Pill5.NAME, 1);
    private pill10Pool: ObjectPool = ObjectPool.getPool(Pill10.NAME,1);
    private poisonPool: ObjectPool = ObjectPool.getPool(PoisonPill.NAME,1);
    private pillList: Array<BasePill> = [];
    
    private player: Player = new Player();
    
	public constructor() {
        super("resource/myskin/scene/GameSceneSkin.exml");
	}
	
    public onEnable(): void {
        //设置主角
        this.player.x = this.stage.stageWidth / 2;
        this.player.y = this.stage.stageHeight - this.player.height;
        this.addChild(this.player);
        //设置界面
        this.setScoreLabel(0);
        this.setTimeLabel(this.gameTimeLimit);
        //设置参数
        this.targetX = this.player.x;
        //设置计时器
        this.startGameTimer();
        this.startDropTimer();
        //设置监听
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
    }
    
    public onRemove(): void {
        
        
    }
    
    //每帧执行
    private onEnterFrame(): void {
        this.movePlayer();
        this.moveItem();
    }
    
    private gameOver(): void {
        console.log("game over");
        //移除监听
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        //停止计时器
        this.stopGameTimer();
        this.stopDropTimer();
        //清理药片
        var len: number = this.pillList.length;
        var pill: BasePill;
        for(var i: number = 0;i < len;i++) {
            pill = this.pillList[i];
            pill.recycle();
            this.removeChild(pill);
        }
        this.pillList.length = 0;
        
        if(this.time >= 0) {
            LayerManager.getInstance().runScene(GameManager.getInstance().loseScene);
        } else {
            LayerManager.getInstance().runScene(GameManager.getInstance().winScene);
        }
        
    }
    

    //移动物品
    private moveItem(): void {
        var len: number = this.pillList.length;
        var pill: BasePill;
        for(var i: number = len - 1;i >= 0;i--) {
            pill = this.pillList[i];
            pill.y += this.dropSpeed;
            
            //药片移动
            if(pill.y >= GameConst.stage.stageHeight) {
                this.pillList.splice(i,1);
                pill.recycle();
                this.removeChild(pill);
            }
            //碰撞检测
            else if(this.hitTest(this.player,pill)) {
                this.pillList.splice(i,1);
                pill.recycle();
                this.removeChild(pill);
                this.player.eat();
                if(pill instanceof PoisonPill) {
                    this.gameOver();
                    return;
                } else {
                    this.score += pill.score;
                    this.setScoreLabel(this.score);
                }

            }
        }
    }
    
    //移动玩家
    private movePlayer(): void {
        if(Math.abs(this.targetX - this.player.x) < this.playerSpeed) {
            this.player.x = this.targetX;
        } else if(this.targetX > this.player.x) {
            this.player.x += this.playerSpeed;
        } else {
            this.player.x -= this.playerSpeed;
        }
    }
    
    private targetX: number;  //目的坐标
    private onTouchMove(e:egret.TouchEvent): void {
        this.targetX = e.stageX - this.player.width/2;
    }
    
    public hitTest(player: egret.DisplayObject,pill: egret.DisplayObject): boolean {
        var rect1: egret.Rectangle = player.getBounds();
        var rect2: egret.Rectangle = pill.getBounds();
        rect1.width -= 30;     //将player的碰撞rect缩小30
        rect1.height -= 30;
        rect1.x = player.x + 30;
        rect1.y = player.y  + 30;
        rect2.x = pill.x;
        rect2.y = pill.y;
        return rect1.intersects(rect2);
    }

    private setScoreLabel(score:number): void {
        this.score = score;
        this.scoreLabel.text = this.score.toString();
    }
    
    private setTimeLabel(_time: number): void {
        this.time = _time;
        this.timeLabel.text = this.time.toString();
    }
	
    private startGameTimer(): void {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onGameTimerHandler(): void {
        this.time--;
        if(this.time < 0) {
            this.gameOver();
            return;
        } else {
            this.setTimeLabel(this.time);
        }
    }
    
    private stopGameTimer(): void {
        this.gameTimer.stop();
    }
    
    private startDropTimer(): void {
        this.dropTimer.addEventListener(egret.TimerEvent.TIMER,this.onDropTimerHandler,this);
        this.dropTimer.reset();
        this.dropTimer.start();
    }

    private onDropTimerHandler(): void {
        var rand: number = Math.floor(Math.random() * 100);  //概率100
        var pill: BasePill;
        if(rand < 80) {
            pill = this.pillPool.getObject();
        } else if(rand < 85) {
            pill = this.pill5Pool.getObject();
        } else if(rand < 90) {
            pill = this.pill10Pool.getObject();
        } else {
            pill = this.poisonPool.getObject();
        }
        pill.x = 10 + (Math.random() * (GameConst.stage.stageWidth - 80)); //防止药片超出场景
        pill.y = -pill.height;
        this.addChild(pill);
        this.pillList.push(pill);
    }

    private stopDropTimer(): void {
        this.dropTimer.stop();
    }
    
}
