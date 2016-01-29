/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private timeBg:eui.Rect;      //计时背景
    private timeLabel:eui.Label;  //计时文本
    public score:number=0;          //分数
    
    private bag:eui.Image;         //福袋
    private packetGroup:eui.Group; //红包容器
    private packetPool:ObjectPool = ObjectPool.getPool(PacketUI.NAME,3);  //红包对象池
    
    private bFirstGame:Boolean = true; //是否第一次游戏
    
    private countDownLabel:eui.BitmapLabel;  //倒计时数字
    
    private stageWidth:number;   //舞台高宽
    private stageHeight:number;
    
    private gameTimer:egret.Timer = new egret.Timer(1000);  //计时
    public timeLimit:number = 20; 
    public curTime:number = this.timeLimit;
    
    public bWin:Boolean = false;  //游戏是否胜利
    
    public snd:SoundManager = SoundManager.getInstance();
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        if(this.bFirstGame){
            this.fallBag();
            this.bFirstGame = false;
        }else{
            this.startGame();
        }
  
    }

    public onRemove(): void {
        
    }
    
    private initView(){
        this.validateNow();

        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        
        this.countDownLabel.parent && this.removeChild(this.countDownLabel);
        
        this.timeLabel.text = this.timeLimit.toString();
    }

    private startGame(){
        this.resetGame();
        this.countDown();
    }
    
    private resetGame(){
        //停止tween
        egret.Tween.removeTweens(this);
        //重置分数
        this.score = 0;
        //重置计时
        this.stopGameTimer();
        this.curTime = this.timeLimit;
        this.timeLabel.text = this.timeLimit.toString();
        this.timeBg.scaleX = 1;
    }
    
    //游戏胜利
    private gameWin(){
        egret.Tween.removeTweens(this.bag);
        this.stopGameTimer();
        this.bWin = true;
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    }
    
    //游戏失败
    private gameLose(){
        egret.Tween.removeTweens(this.bag);
        this.stopGameTimer();
        this.bWin = false;
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    }
    
    private fallBag(){
        this.bag.y = -this.bag.height;
        egret.Tween.get(this.bag).to({y:(this.stageHeight-this.bag.height/2 + 100)},800,egret.Ease.bounceOut).
        call(this.countDown, this);
    }
    
    //倒计时
    private countDown(){
        var self:GameScene = this;
        var count = 5;
        this.addChild(this.countDownLabel);
        this.countDownLabel.text = count.toString();
        egret.Tween.get(this, {loop:true}).wait(1000).call(function(){
            count--;
            if(count<=0){
                egret.Tween.removeTweens(this);
                self.removeChild(self.countDownLabel);
                self.startGameTimer();
                self.launchPacket();  //开始发射红包
                return;
            }
            self.countDownLabel.text = count.toString();
        });
    }
    
    //倒计时结束，发射红包
    private launchPacket(){
        var packet:PacketUI = this.packetPool.getObject();
        packet.x = this.bag.x + this.bag.width/2;
        packet.y = this.bag.y + this.bag.height/2;
        this.packetGroup.addChild(packet);
        
        if(this.curTime >= 10){ //前10秒小额红包，后10秒大额红包
            packet.randomSkin(0,4);
        }else{
            packet.randomSkin(0,6);
        }
        
        packet.shoot();
        
        packet.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onPacketTouch, this);
        
        //再次发射红包
        var time: number = Math.random() * 400;
        egret.Tween.get(this.bag).wait(time).call(this.launchPacket,this);
    }
    
    //点击红包
    private onPacketTouch(e:egret.TouchEvent){
        this.snd.play(this.snd.get);
        var packet: PacketUI = (<PacketUI>e.target);
        this.score += packet.score;
        packet.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onPacketTouch,this);
        packet.recycle();
        if(packet.score <= 0){
            this.gameLose(); //游戏失败
        }
    }
    
    //开始游戏计时
    private startGameTimer(){
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimer, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    //游戏计时
    private onGameTimer(){
        this.curTime--;
        if(this.curTime <=0){  //计时结束
            this.gameWin();
            return;
        }
        this.timeLabel.text = this.curTime.toString();
        this.timeBg.scaleX = this.curTime/this.timeLimit;
    }
    
    //停止游戏计时
    private stopGameTimer(){
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimer,this);
        this.gameTimer.stop();
    }
}









