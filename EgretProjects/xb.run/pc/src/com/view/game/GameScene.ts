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
    private myHero: Player;          //玩家自己
    
    private carrotPool:ObjectPool = ObjectPool.getPool(Carrot.NAME,1); //胡萝卜对象池
    private stonePool:ObjectPool = ObjectPool.getPool(Stone.NAME,1);    //石头对象池
    private itemList = [];           //物品
    private itemGroup:eui.Group;     //物品Group
    
    private isSingleMode:boolean = true;  //是否单人模式
    private singleTrackNum:number = 3;    //单人赛道数量
    private multiTrackNum:number = 7;     //多人赛道
    private trackNum:number;              //赛道数量
    
    private moveSpeed: number = 10;   //移动速度
    private stageWidth:number;        //舞台高宽
    private stageHeight:number;
    
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.socket = ClientSocket.getInstance();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
    }

    public onEnable(): void {
        this.resetGame();    //重置游戏
        this.startGame();
    }

    public onRemove(): void {
        
    }
    
    private startGame(){
        this.configListeners();
    }
    
    private resetGame(){
        this.resetTrack();      //重置赛道
        this.clearFarAndNear(); //清理远点和近点
        this.initFarAndNear();  //初始化远点和近点
        this.resetPlayer();     //重置玩家
        this.resetItem();       //重置移动物体
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
    }
    
    //初始化远点和进点列表
    private initFarAndNear(){
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
    
    //清理远点和近点列表
    private clearFarAndNear(){
        this.farPotList.length = 0;
        this.nearPotList.length = 0;
        this.trackXList.length = 0;
    }
    
    //重置玩家
    private resetPlayer(){
        if(this.myHero == null){
            this.myHero = new Player();
        }
        this.myHero.anchorOffsetX = this.myHero.width/2;
        this.myHero.anchorOffsetY = this.myHero.height/2;
        this.myHero.x = this.nearPotList[1].x;
        this.myHero.y = this.nearPotList[1].y;
        this.myHero.track = Math.floor(this.trackNum/2);
        this.myHero.isJumping = false;
        this.playerGroup.addChild(this.myHero);
        this.myHero.gotoAndPlay("run",-1);
    }
    
    //重置物体
    private resetItem(){
        var len = this.itemList.length;
        for(var i=0;i<len;i++){
            var fruit: BaseItem = this.itemList[i];
            fruit.recycle();
        }
        this.itemList.length = 0;
    }
    
    //重置赛道
    private resetTrack(){
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
    }
    
    //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
    private count:number = 0;
    private createItem(){
        this.count ++;
        var rand;
        var item;
        if(this.count %30 == 0){
            for(var i = 0;i < this.trackNum;i++) {
                rand = Math.random();
                if(rand > 0.2) {
                    item = this.carrotPool.getObject();
                }else{
                    item= this.stonePool.getObject();   
                }
                item.x = this.farPotList[i].x;
                item.y = this.farPotList[i].y;
                item.z = 0;
                item.track = i;
                item.scaleX = 0;
                item.scaleY = 0;
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
            item.scaleX = rate;
            item.scaleY = rate;
            //碰撞检测
            if(this.myHero.track == item.track){
                if(Math.abs(this.myHero.y - item.y) < 100){
                    var self:GameScene = this;
                    if(item instanceof Carrot){
                        item.changeAlpha();
                        this.itemList.splice(i,1);
                    }else if(item instanceof Stone){
                        egret.log("hit stone:",item.x, item.y,item.scaleX);
                        this.myHero.gotoAndPlay("jump");
                        egret.Tween.get(this.myHero).to({y:-200,x:Math.random()*this.stageWidth,rotation:360*3},500).call(function(){
                           self.resetPlayer();
                        });
                    }
                }
            }
            //边界检测
            if(item.y > (this.stageHeight + item.height)){
                item.recycle();
                this.itemList.splice(i,1);
            }
        }
    }
    
    //////////////////////////////////////////////////////
    //------------------Socket数据处理---------------------
    //////////////////////////////////////////////////////
    
    //跳跃
    public revAction(data){
        egret.log("revAction:",data);
        var actionType = data.actionType;
        var myTrack = this.myHero.track;
        var self: GameScene = this;
        if(actionType == "left"){
            if(myTrack > 0){
                myTrack--;
                egret.Tween.get(this.myHero).to({x:this.nearPotList[myTrack].x},300);
                this.myHero.track = myTrack;
            }
        }else if(actionType == "right"){
            if(myTrack < (this.trackNum-1)){
                myTrack++;
                egret.Tween.get(this.myHero).to({ x: this.nearPotList[myTrack].x},300);
                this.myHero.track = myTrack;
            }
        }else if(actionType == "up"){
            if(this.myHero.isJumping == false){
                this.myHero.isJumping = true;
                var myHeroY = this.myHero.y;
                this.myHero.gotoAndPlay("jump");
                egret.Tween.get(this.myHero).to({y:this.myHero.y - 500},300).to({y:myHeroY},300).
                    call(function(){
                        self.myHero.isJumping = false;
                        self.myHero.gotoAndPlay("run",-1);
                    },this);
            }
        }
        
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









