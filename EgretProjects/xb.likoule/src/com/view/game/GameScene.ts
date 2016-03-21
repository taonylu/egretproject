/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private gameBg: GameBg;         //游戏地图
    private controlBtn: eui.Rect;  //上下滑动的控制按钮
    private bee: Bee = new Bee();   //蜜蜂
    
    private scoreLabel: eui.Label;  //分数文本
    private score: number;          //获得分数
    
    private timeLabel: eui.Label;   //时间文本
    private curTime: number;        //当前时间
    private timeLimit: number = 30; //时间限制
    private gameTimer:DateTimer = new DateTimer(1000); //游戏计时器
    
    private itemList:Array<BaseItem> = new Array<BaseItem>();           //item数组
    private item2Pool:ObjectPool = ObjectPool.getPool(Item2.NAME,5);    //item5对象池
    private item5Pool:ObjectPool = ObjectPool.getPool(Item5.NAME, 5);   //item10对象池
    private score2Pool:ObjectPool = ObjectPool.getPool(Score2.NAME, 5); //score5对象池
    private score5Pool:ObjectPool = ObjectPool.getPool(Score5.NAME,5);  //score10对象池
    
    private stageWidth: number;     //舞台高宽
    private stageHeight: number;
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        
        
    }

    public onEnable(): void {
        this.startGame();
    }

    public onRemove(): void {
        this.bee.stop();
    }
    
    private configListeners() {
        this.controlBtn.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onControlTouch, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    private deConfigListeners(){
        this.controlBtn.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onControlTouch,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }

    private onEnterFrame(){
        this.createItem();      //创建Item
        this.moveBee();         //移动蜜蜂
        this.gameBg.render();   //移动地图
        this.moveItem();        //移动Item
    }
    
    //开始游戏
    private startGame(){
        this.reset();
        this.startGameTimer();
        this.configListeners();
    }
    
    //重置游戏
    private reset() {
        //重置时间和分数
        this.score = 0;
        this.scoreLabel.text = this.score + "";
        this.curTime = this.timeLimit;
        this.timeLabel.text = this.curTime + "s";
        
        //重置蜜蜂
        this.bee.play(-1);
        this.bee.x = this.controlBtn.x + this.controlBtn.width;
        this.bee.y = (this.stageHeight - this.bee.height) / 2;
        //this.bee.x = 0;
       // this.bee.y = 0;
        this.addChild(this.bee); 
        
        //重置游戏背景
        this.gameBg.reset();
    }
    
    //游戏结束
    private gameOver(){
        this.deConfigListeners();
        this.stopGameTimer();
    }
    
    private curFingerPos:number;  //当前手指位置
    private onControlTouch(e:egret.TouchEvent){
        this.curFingerPos = e.stageY;
        if(this.bee.y > e.stageY){  //蜜蜂往上移动
            this.bee.direction = -1;
        }else{
            this.bee.direction = 1;
        }
    }
    
    private moveBee(){
        if(Math.abs(this.bee.y - this.curFingerPos) > this.bee.speedY){
            this.bee.y += this.bee.direction * this.bee.speedY;
        } 
    }
    
    private moveItem(){
        var len:number = this.itemList.length;
        var item:BaseItem;
        for(var i:number= len-1;i>=0;i--){
            item = this.itemList[i];
            item.x -= this.bee.speedX;
            //边缘检测
            if(item.x <= -item.width){
                item.recycle();
                this.itemList.splice(i,1);
            //碰撞检测  item.width/2 = 25, bee.width/2 = 50
            }else{      
                if(Math.abs(item.y + 25 - this.bee.y) < 50 && Math.abs(item.x - this.bee.x) < 50){
                    this.createScoreText(item);
                    item.recycle();
                    this.itemList.splice(i,1);
                    this.score+=item.score;
                    this.scoreLabel.text = this.score + "";
                }
            }
        }
    }
    
    private itemCount = 0;
    private createItem(){
        this.itemCount++;
        if(this.itemCount > 20){
            this.itemCount = 0;
            var rand: number = Math.random();
            var item: BaseItem;
            if(rand < 0.5) {
                item = ObjectPool.getPool(Item2.NAME).getObject();
            } else {
                item = ObjectPool.getPool(Item5.NAME).getObject();
            }
            item.x = this.stageWidth + item.width;
            item.y = 50 + (this.stageHeight - 100) * Math.random();
            this.addChild(item);
            this.itemList.push(item);
        }
        
    }
    
    private createScoreText(target:BaseItem){
        var scoreItem;
        if(target.score == 2){
            scoreItem = ObjectPool.getPool(Score2.NAME).getObject();
        }else if(target.score == 5){
            scoreItem = ObjectPool.getPool(Score5.NAME).getObject();   
        }
        scoreItem.x = target.x;
        scoreItem.y = target.y;
        this.addChild(scoreItem);
        var self:GameScene = this;
        egret.Tween.get(scoreItem).wait(300).call(function(){
            scoreItem.recycle();
        },this);
    }
    
    private startGameTimer(){
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onGameTimerHandler(e:egret.TimerEvent){
        this.curTime--;
        this.timeLabel.text = this.curTime + "s";
        if(this.curTime <=  0){
            this.gameOver();
        }
    }
    
    private stopGameTimer(){
        this.gameTimer.stop();
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
    }

    
    
    
}









