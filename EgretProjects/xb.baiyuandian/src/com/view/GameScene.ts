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
    //private packetPool:ObjectPool = ObjectPool.getPool(PacketUI.NAME,3);  //红包对象池
    private packetPool0:ObjectPool = ObjectPool.getPool("Packet0",3);
    private packetPool10: ObjectPool = ObjectPool.getPool("Packet10",5);
    private packetPool20: ObjectPool = ObjectPool.getPool("Packet20",5);
    private packetPool30: ObjectPool = ObjectPool.getPool("Packet30",5);
    private packetPool50: ObjectPool = ObjectPool.getPool("Packet50",3);
    private packetPool80: ObjectPool = ObjectPool.getPool("Packet80",3);
    private packetPool100: ObjectPool = ObjectPool.getPool("Packet100",3);
    private poolList:Array<ObjectPool> = [this.packetPool0, this.packetPool10, this.packetPool20, this.packetPool30, this.packetPool50, this.packetPool80, this.packetPool100];
    
    private packetList:Array<BasePacket> = [];
    
    private bFirstGame:Boolean = true; //是否第一次游戏
    
    private countDownLabel:eui.BitmapLabel;  //倒计时数字
    
    private stageWidth:number;   //舞台高宽
    private stageHeight:number;
    
    private gameTimer:egret.Timer = new egret.Timer(1000);  //计时
    public timeLimit:number = 20;    //时间限制
    public curTime:number = this.timeLimit;
    
    private snd:SoundManager = SoundManager.getInstance();
    
    private os: string = ""; //操作系统
    
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
       this.soundCount = 0;
    }
    
    private initView(){
        this.validateNow();

        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        
        this.countDownLabel.parent && this.removeChild(this.countDownLabel);
        
        this.timeLabel.text = this.timeLimit.toString();
        
        this.os = egret.Capabilities.os;
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
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    }
    
    //游戏失败
    private gameLose(){
        egret.Tween.removeTweens(this.bag);
        this.stopGameTimer();
        LayerManager.getInstance().runScene(GameManager.getInstance().gameLoseScene);
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
        egret.Tween.get(this, {loop:true}).wait(700).call(function(){
            count--;
            if(count<=0){
                self.countDownComplete();
                return;
            }
            self.countDownLabel.text = count.toString();
        });
    }
    
    private countDownComplete(){
        egret.Tween.removeTweens(this);
        this.removeChild(this.countDownLabel);
        this.startGameTimer();
        this.launchPacket();  //开始发射红包
        //this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.packetGroup.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onPacketTouch, this);
    }
    
    private onEnterFrame():boolean{
        var len:number = this.packetList.length;
        for(var i:number = len - 1;i>=0;i--){
            var packet:BasePacket = this.packetList[i];
            packet.x += packet.speedX;
            packet.y += packet.speedY;
            
            if(packet.y <= -200 ||packet.x <= -100 || packet.x >= (this.stageWidth + 100)){
                packet.recycle();
                this.packetList.splice(i,1);
            }
        }
        return true;
    }
    
    //发射红包
    private launchPacket(){
        var packet:BasePacket;
        
        if(Math.random() > 0.2){
//            if(this.curTime >= 15) { //前5秒小额红包，后15秒大额红包
//                packet = this.poolList[NumberTool.getRandomInt(0,4)].getObject();
//            } else {
                packet = this.poolList[NumberTool.getRandomInt(0,6)].getObject();
           // }
        }else{
            packet = this.poolList[0].getObject();
        }
        
       packet.x = this.bag.x + this.bag.width / 2;
        packet.y = this.bag.y + this.bag.height / 2;
        
        packet.shoot();
        this.packetGroup.addChild(packet);
        
        
        //再次发射红包
        var time: number = 250;
        egret.Tween.get(this.bag).wait(time).call(this.launchPacket,this);
    }
    
    private soundCount:number = 0; //声音播放次数，超过次数，则不能播放声音，否则会出现异常
    
    
    //点击红包
    private onPacketTouch(e:egret.TouchEvent){    

        if(e.target instanceof BasePacket || e.currentTarget instanceof BasePacket){
            //window["playGet"]();
            
            if(this.os == "Android"){
                if(this.soundCount < 1) {
                    this.soundCount++;
                    this.snd.play(this.snd.get);
                    var self: GameScene = this;
                    egret.Tween.get(this).wait(1500).call(function() {
                        self.soundCount = 0;
                    });
                }
            }else{
                this.snd.play(this.snd.get);
            }
            
            var packet: BasePacket = (<BasePacket>e.target);
            this.score += packet.score;
           packet.parent && packet.parent.removeChild(packet);
            if(packet.score <= 0) {
                this.gameLose(); //游戏失败
            }
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









