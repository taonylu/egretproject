/**
 *
 * @author 
 *
 */
class GameScene extends egret.DisplayObjectContainer{
    
    private gameBg: egret.Bitmap;      //游戏背景
    private scoreBarUI: ScoreBarUI;    //分数条UI
    private timerUI: TimerUI;          //计时器UI
    private startBtn: egret.Bitmap;    //开始按钮
    private lifeUI: LifeUI;            //生命UI
    private resultPanel: ResultPanel;  //结算面板
    
    private player: Player = new Player(); //玩家
    private goldPool: ObjectPool = ObjectPool.getPool(Gold.NAME,10);  //金币对象池
    private boomPool: ObjectPool = ObjectPool.getPool(Boom.NAME,3);   //炸弹对象池
    private itemList: Array<egret.Bitmap> = []; //下落物品列表
    
    private score:number;              //分数
    private life: number;              //生命
    
    private gameTimer: egret.Timer = new egret.Timer(1000);  //计时器
    private timeLimit: number;  //游戏倒计时
    private refreshTime: number = 20; //刷新物品计时
    private dropSpeed: number = 5;   //物品下落时间
    private boomRate: number = 0.2;  //炸弹概率
    
    private mStage: egret.Stage;
    
	public constructor() {
        super();
        this.initConfig();
        this.initView();
	}
	
    private initConfig(): void {
        var json = RES.getRes("config_json");

        GameConst.scoreList = json.scoreList;
        GameConst.discountList = json.discountList;
        GameConst.scoreMax = (json.scoreList[json.scoreList.length - 1]);
        GameConst.timeLimit = json.timeLimit;
        GameConst.playerSpeed = json.playerSpeed;
        
        this.boomRate = json.boomRate/100;
        this.dropSpeed = json.dropSpeed;
        this.refreshTime = Math.floor(json.refreshTime/1000*60);
    }
    
    private initView(): void {
        this.mStage = GameConst.stage;
        
        this.gameBg = new egret.Bitmap(RES.getRes("gamebg_jpg"));
        this.addChild(this.gameBg);
        
        this.scoreBarUI = new ScoreBarUI();
        this.scoreBarUI.x = (this.mStage.stageWidth - this.scoreBarUI.scoreBg.width) / 2;
        this.scoreBarUI.y = this.mStage.stageHeight / 10;
        this.addChild(this.scoreBarUI);
        
        this.timerUI = new TimerUI();
        this.timerUI.x = (this.mStage.stageWidth - this.timerUI.width) / 2;
        this.timerUI.y = this.mStage.stageHeight / 50;
        this.addChild(this.timerUI);
        
        this.lifeUI = new LifeUI();
        this.lifeUI.x = 10;
        this.lifeUI.y = this.timerUI.y;
        this.addChild(this.lifeUI);
        
        this.resultPanel = new ResultPanel();
        
        this.startBtn = new egret.Bitmap(RES.getRes("start_png"));
        this.startBtn.x = (this.mStage.stageWidth - this.startBtn.width) / 2;
        this.startBtn.y = (this.mStage.stageHeight - this.startBtn.height) / 2;
        this.startBtn.touchEnabled = true;
        this.addChild(this.startBtn);

        this.player.anchorOffsetX = this.player.width / 2;
        this.player.x = this.mStage.stageWidth / 2;
        this.player.y = this.mStage.stageHeight - this.player.height;
        this.player.speed = GameConst.playerSpeed;
        

        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
    }
    
    private startGame(): void {
        this.startBtn.parent && this.removeChild(this.startBtn);
        this.startTimer();
        this.resetGame();
        this.mStage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    private resetGame(): void {
        //重置角色
        this.player.x = this.mStage.stageWidth / 2;
        this.player.y = this.mStage.stageHeight - this.player.height;
        this.addChild(this.player);
        //重置变量
        this.score = 0;
        this.timeLimit = GameConst.timeLimit;
        this.life = 3;
        this.targetX = this.player.x;
        //重置UI
        this.scoreBarUI.setScore(0);
        this.scoreBarUI.curDiscount = 0;
        this.timerUI.setTimeText(0);
        this.lifeUI.setLife(this.life);
        
        
    }
    

    private gameOver(): void {
        this.mStage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        this.stopTimer();
        
        this.showResult();
    }
    
    private targetX: number;  //目的坐标
    private onTouchMove(e:egret.TouchEvent): void {
        this.targetX = e.stageX;
    }
    
    private onEnterFrame(): void {
        this.movePlayer();
        this.createItem();
        this.moveItem();
    }
    
    private movePlayer(): void {
      
        if(Math.abs(this.targetX - this.player.x) <this.player.speed) {
            this.player.x = this.targetX;
        } else if(this.targetX > this.player.x) {
            this.player.x += this.player.speed;
        } else {
            this.player.x -= this.player.speed;
        }
    }
    
    private moveItem(): void {
        var len: number = this.itemList.length;
        for(var i: number = len-1;i >=0;i--) {
            var item: egret.Bitmap = this.itemList[i];
            item.y += this.dropSpeed;
            //碰撞检测
            var left: number = item.x - this.player.width / 2 + 20;
            var right: number = item.x + item.width + this.player.width / 2 - 20;
            var top: number = item.y + item.height - 20;
            var buttom: number = item.y - this.player.height + 10;
            if((this.player.x > left && this.player.x < right)
                && (this.player.y > buttom && this.player.y < top)
            ){
                this.removeItem(item);
                this.itemList.splice(i,1);
                if(item instanceof Gold) {
                    this.score += GameConst.goldScore;
                    this.scoreBarUI.setScore(this.score);
                    
                } else {
                    this.life -= 1;
                    this.lifeUI.setLife(this.life);
                    if(this.life <= 0) {
                        this.gameOver();
                        return;
                    }
                }
                continue;
            }
            
            //边界检测
            if(item.y >= this.mStage.stageHeight) {
                this.removeItem(item);
                this.itemList.splice(i,1);
            }
        }
    }
    
    private removeItem(item:egret.Bitmap): void {
        if(item instanceof Gold) {
            this.goldPool.returnObject(item);
        } else {
            this.boomPool.returnObject(item);
        }
        this.removeChild(item);
    }
    
    private itemCount: number = 0;  //创建物品计时
    private createItem(): void {
        this.itemCount++;
        if(this.itemCount > this.refreshTime) {
            this.itemCount = 0;
            var rand: number = Math.random();
            var item: egret.Bitmap;
            if(rand > this.boomRate) {
                item = this.goldPool.getObject();
            } else {
                item = this.boomPool.getObject();
            }
            item.x = Math.random() * (this.mStage.stageWidth - item.width);
            item.y = -item.height;
            this.addChild(item);
            this.itemList.push(item);
        }
    }

    private startTimer(): void {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onTimerHandler(): void {
        this.timeLimit--;
        this.timerUI.setTimeText(this.timeLimit);
        if(this.timeLimit <= 0) {
            this.gameOver();
        }
    }
    
    private stopTimer(): void {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.gameTimer.stop();
    }
    
    private showResult(): void {
        this.resultPanel.show();

        var curZhe: number = this.scoreBarUI.curDiscount;
        
        //拼显示内容
        var msg: string = "";
        if(curZhe <= 0) {
            msg += "很遗憾，未获得折扣";
        } else {
            msg += "获得:" + curZhe + "折";
            msg += "\n￥1000" + "   -￥" + Math.round(1000 * (1 - curZhe / 10));
        }
        msg += "\n获得天天币:" + 100;
        this.resultPanel.setText(msg);
    }
}









