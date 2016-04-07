/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    private socket:ClientSocket;
    
    private farPotList: Array<egret.Point> = new Array < egret.Point>();    //远点列表
    private nearPotList: Array<egret.Point> = new Array < egret.Point>();   //进点列表
    private trackXList = [];   //赛道X轴偏移量
    private trackYList = [];   //赛道y轴偏移量
    
    private playerList:Array<Player> = new Array<Player>();  //玩家列表
    private playerGroup:eui.Group;   //玩家Group
    
    private carrotPool:ObjectPool = ObjectPool.getPool(Carrot.NAME,1); //胡萝卜对象池
    private bananaPool: ObjectPool = ObjectPool.getPool(Banana.NAME,1);     //香蕉对象池
    private stonePool:ObjectPool = ObjectPool.getPool(Stone.NAME,1);   //石头对象池
    private micePool:ObjectPool = ObjectPool.getPool(Mice.NAME);       //地鼠对象池
    private highWoodPool:ObjectPool = ObjectPool.getPool(HighWood.NAME,1); //高木桩对象池
    private lowWoodPool:ObjectPool = ObjectPool.getPool(LowWood.NAME,1);   //矮木桩对象池
    private waterPool:ObjectPool = ObjectPool.getPool(Water.NAME,1);       //水池对象池
    private scorePoolList = [this.carrotPool, this.bananaPool];            //得分物品对象池数组
    private zhangAiPoolList = [this.stonePool, this.micePool, this.highWoodPool, this.lowWoodPool, this.waterPool];//障碍物对象池数组
    private itemList = [];           //物品列表(水果、障碍物)
    private itemGroup:eui.Group;     //物品Group
    
    private isSingleMode:boolean = false;  //是否单人模式
    private singleTrackNum:number = 3;    //单人赛道数量
    private multiTrackNum:number = 7;     //多人赛道
    private trackNum:number;              //赛道数量
    
    private moveSpeed: number = 4;   //移动速度
    private stageWidth:number;        //舞台高宽
    private stageHeight:number;
    
    private grassGroup:eui.Group;    //草地Group
    private grassPot0:eui.Rect;      //草地刷新位置
    private grassPot1:eui.Rect; 
    private grassSpeedX:number = 2;  //草地X轴移动速度
    private grassPool:ObjectPool = ObjectPool.getPool(Grass.NAME); //草地对象池
    private grassList:Array<Grass> = new Array<Grass>(); //草地数组 
    
    private gameTimer:egret.Timer = new egret.Timer(1000); //游戏计时器
    private gameTimeLimit:number = 60;  //游戏时间限制
    
    private countDownTimer:egret.Timer = new egret.Timer(1000);  //倒计时
    private countDownLimit:number = 3;  //倒计时限制
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        
        this.initFarAndNear();  //初始化远点和近点
        this.initGrass();       //初始化草地
    }

    public onEnable(): void {
        this.resetGame();    //重置游戏
        this.startGame();    //开始游戏
    }

    public onRemove(): void {
        
    }
    
    private startGame(){
        this.configListeners();
    }
    
    private resetGame(){
        this.resetAllPlayer();  //重置玩家
        this.clearItem();       //清理移动物体
        this.clearGrass();      //清理草地
    }
    
    private gameOver(){
        
    }
    
    private configListeners(){
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    private deConfigListeners(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    private onEnterFrame(){
        this.createItem();
        this.moveItem();
        this.createGrass();
        this.moveGrass();
    }
    
    //初始化远点和进点列表
    private initFarAndNear(){
        //赛道数量
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
        //清理数组
        this.farPotList.length = 0;
        this.nearPotList.length = 0;
        this.trackXList.length = 0;
        //获取赛道近点和远点
        var len = this.trackNum;
        for(var i=0;i<len;i++){
            var far: eui.Rect = this["far0" + i];
            var near: eui.Rect = this["near0" + i];
            var farPot: egret.Point = new egret.Point(far.x,far.y);
            var nearPot:egret.Point = new egret.Point(near.x, near.y);
            this.farPotList.push(farPot);
            this.nearPotList.push(nearPot);
            far.parent && far.parent.removeChild(far);
            near.parent && near.parent.removeChild(near);
            
            var dist = egret.Point.distance(farPot, nearPot);    //两点距离
            var dist_pow2 = Math.pow(dist,2);                    //两点距离平方  
            var y_pow2 = Math.pow((farPot.y - near.y),2);        //两点垂直距离平方
            var xOffset: number = Math.sqrt(dist_pow2 - y_pow2); //两点水平距离
            if(i < len/2){ //左边跑道偏移量为负
                xOffset = - xOffset;
            }
            this.trackXList.push(xOffset);
            this.trackYList.push(near.y - farPot.y);
        }
    }
    
    //初始化草地
    private initGrass(){
        this.grassPot0.parent && this.grassGroup.removeChild(this.grassPot0);
        this.grassPot1.parent && this.grassGroup.removeChild(this.grassPot1);
    }
    
    //重置所有玩家
    private resetAllPlayer(){
        var playNum = UserManager.getInstance().getUserNum();
        if(playNum == 1){  //1人站中间
            
        }
        
//        this.myHero.anchorOffsetX = this.myHero.width/2;
//        this.myHero.anchorOffsetY = this.myHero.height/2;
//        this.myHero.x = this.nearPotList[1].x;
//        this.myHero.y = this.nearPotList[1].y;
//        this.myHero.track = Math.floor(this.trackNum/2);
//        this.myHero.isJumping = false;
//        this.playerGroup.addChild(this.myHero);
//        this.myHero.gotoAndPlay("run",-1);
    }

    //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
    private count:number = 0;
    private createItem(){
        this.count ++;
        var rand;
        var item;
        if(this.count %40 == 0){
            for(var i = 0;i < this.trackNum;i++) {
                rand = Math.random();
                if(rand <0.7) {  //创建得分物品
                    item = this.scorePoolList[NumberTool.getRandomInt(0,1)].getObject();
                }else if(rand <0.9){    //创建障碍物
                    item= this.zhangAiPoolList[NumberTool.getRandomInt(0,4)].getObject();   
                }else{  //不创建
                    return;
                }
                item.x = this.farPotList[i].x;
                item.y = this.farPotList[i].y;
                item.z = 0;
                item.track = i;
                item.scaleX = 0.4;
                item.scaleY = 0.4;
                this.itemGroup.addChild(item);
                this.itemList.push(item);
            }
        }
    }
    
    //移动物体
    private moveItem(){
        var len = this.itemList.length;
        var item:BaseItem;
        var track;
        for(var i=len-1;i>=0;i--){
            item = this.itemList[i];
            track = item.track;
            //移动
            item.y += this.moveSpeed;
            var rate = (item.y - this.farPotList[track].y) / this.trackYList[track]; //所在y轴位置比例
            item.x = this.farPotList[track].x +  rate* this.trackXList[track];
            item.scaleX = 0.4 + rate*0.1;
            item.scaleY = 0.4 + rate*0.1;
//            //碰撞检测
//            if(this.myHero.track == item.track){
//                if(Math.abs(this.myHero.y - item.y) < 100){
//                    var self:GameScene = this;
//                    if(item.type == 0){  //得分物品
//                        this.itemList.splice(i,1);
//                    }else if(item.type == 1){ //不可跨越障碍
//                        egret.log("hit stone:",item.x, item.y,item.scaleX);
//                        this.myHero.gotoAndPlay("jump");
//                        egret.Tween.get(this.myHero).to({y:-200,x:Math.random()*this.stageWidth,rotation:360*3},500).call(function(){
//                           self.resetPlayer();
//                        });
//                    }else if(item.type == 2){ //可跨越障碍物
//                        
//                    }
//                }
//            }
            //边界检测
            if(item.y > (this.stageHeight + item.height)){
                item.recycle();
                this.itemList.splice(i,1);
            }
        }
    }
    
    //清理物体
    private clearItem() {
        var len = this.itemList.length;
        for(var i = 0;i < len;i++) {
            var item: BaseItem = this.itemList[i];
            item.recycle();
        }
        this.itemList.length = 0;
    }
    
    //创建草地
    private grassCount = 0;
    private createGrass(){
        this.grassCount++;
        if(this.grassCount %80 == 0){
            if(this.grassList.length >= 6){
                return;
            }
            var rand = Math.random();
            var grass:Grass = this.grassPool.getObject();
            grass.randomSkin();
            grass.x = this.grassPot0.x;
            grass.y = this.grassPot0.y;
            grass.speedX = -Math.abs(grass.speedX);
            this.grassGroup.addChild(grass);
            this.grassList.push(grass);
            
            grass = this.grassPool.getObject();
            grass.randomSkin();
            grass.x = this.grassPot1.x;
            grass.y = this.grassPot1.y;
            grass.speedX = Math.abs(grass.speedX);
            this.grassGroup.addChild(grass);
            this.grassList.push(grass);
        }
    }
    
    //移动草地
    private moveGrass(){
        var len = this.grassList.length;
        var grass:Grass;
        for(var i=len-1; i>=0; i--){
            grass = this.grassList[i];
            grass.x += grass.speedX;
            grass.y += this.moveSpeed;
            if(grass.y > this.stageHeight){
                grass.recycle();
                this.grassList.splice(i,1);
            }
        }
    }
    
    //重置草地
    private clearGrass(){
        var len = this.grassList.length;
        var grass:Grass;
        for(var i=0;i<len;i++){
            grass = this.grassList[i];
            grass.recycle();
        }
        this.grassList.length = 0;
    }
    
    //开始游戏计时
    private startGameTimer(){
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    //游戏计时处理
    private onGameTimerHandler(){
        var count = this.gameTimeLimit - this.gameTimer.currentCount;
        if(count <= 0){
            this.gameOver();
        }
    }
    
    //停止计时
    private stopGameTimer(){
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
        this.gameTimer.stop();
    }
    
    //开始倒计时
    private startCountDown(){
        this.countDownTimer.addEventListener(egret.TimerEvent.TIMER, this.onCountDownHandler, this);
        this.countDownTimer.reset();
        this.countDownTimer.start();
    }
    
    //倒计时处理
    private onCountDownHandler(){
        var count = this.countDownLimit - this.countDownTimer.currentCount;
        if(count <= 0){
            //TODO 开始游戏
        }
    }
    
    //停止倒计时
    private stopCountDown(){
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
    //////////////////////////////////////////////////////
    //------------------Socket数据处理---------------------
    //////////////////////////////////////////////////////
    
    //跳跃
    public revAction(data){
        egret.log("revAction:",data);
//        var actionType = data.actionType;
//        var myTrack = this.myHero.track;
//        var self: GameScene = this;
//        if(actionType == "left"){
//            if(myTrack > 0){
//                myTrack--;
//                egret.Tween.get(this.myHero).to({x:this.nearPotList[myTrack].x},300);
//                this.myHero.track = myTrack;
//            }
//        }else if(actionType == "right"){
//            if(myTrack < (this.trackNum-1)){
//                myTrack++;
//                egret.Tween.get(this.myHero).to({ x: this.nearPotList[myTrack].x},300);
//                this.myHero.track = myTrack;
//            }
//        }else if(actionType == "up"){
//            if(this.myHero.isJumping == false){
//                this.myHero.isJumping = true;
//                var myHeroY = this.myHero.y;
//                this.myHero.gotoAndPlay("jump");
//                egret.Tween.get(this.myHero).to({y:this.myHero.y - 500},300).to({y:myHeroY},300).
//                    call(function(){
//                        self.myHero.isJumping = false;
//                        self.myHero.gotoAndPlay("run",-1);
//                    },this);
//            }
//        }
        
    }
    
    //发送游戏结束
    public sendGameOver(){
        egret.log("sendGameOver");
        var json;
        if(GameConst.debug){
            json = {
                scoreList:[{openid:"ABC",score:999 }]
            }
        }else{
            //TODO 实际数据
        }
        this.socket.sendMessage("gameOver",json);
    }
    
}









