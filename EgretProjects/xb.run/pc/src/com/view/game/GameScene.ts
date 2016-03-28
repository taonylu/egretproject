/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
  
    private farPotList: Array<egret.Point> = new Array < egret.Point>();    //远点列表
    private nearPotList: Array<egret.Point> = new Array < egret.Point>();   //进点列表
    private trackXList = [];   //赛道X轴偏移量
    private trackYList = [];   //赛道y轴偏移量
    
    private playerList:Array<Player> = new Array<Player>();  //玩家列表
    private playerGroup:eui.Group;   //玩家Group
    private myHero: Player;          //玩家自己
    
    private carrotPool:ObjectPool = ObjectPool.getPool(Carrot.NAME,20); //胡萝卜对象池
    private fruitList = [];          //二维数组，[赛道][水果]
    private itemGroup:eui.Group;     //物品Group
    
    private isSingleMode:boolean = true;  //是否单人模式
    private singleTrackNum:number = 3;    //单人赛道数量
    private multiTrackNum:number = 7;     //多人赛道
    private trackNum:number;              //赛道数量
    private trackLenth:number = 3000;     //赛道长度
    
    private moveSpeed: number = 20;   //移动速度
    
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
  
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
            
            var dist = egret.Point.distance(farPot, nearPot);   //两点距离
            var dist_pow2 = Math.pow(dist,2);                   //两点距离平方  
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
        this.myHero = new Player();
        this.myHero.anchorOffsetX = this.myHero.width/2;
        this.myHero.anchorOffsetY = this.myHero.height/2;
        this.myHero.x = this.nearPotList[1].x;
        this.myHero.y = this.nearPotList[1].y;
        this.playerGroup.addChild(this.myHero);
    }
    
    //重置物体
    private resetItem(){
        var len = this.fruitList.length;
        for(var i=0;i<len;i++){
            var fruit:BaseFruit = this.fruitList[i];
            fruit.recycle();
        }
        this.fruitList.length = 0;
    }
    
    //重置赛道
    private resetTrack(){
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
    }
    
    //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
    private count:number = 0;
    private createItem(){
        this.count ++;
        if(this.count %30 == 0){
            for(var i = 0;i < this.trackNum;i++) {
                var rand = Math.random();
                //if(rand > 0.8) {
                    var carrot: Carrot = this.carrotPool.getObject();
                    carrot.x = this.farPotList[i].x;
                    carrot.y = this.farPotList[i].y;
                    carrot.track = i;
                    carrot.scaleX = carrot.scaleY = 0;
                    this.itemGroup.addChild(carrot);
                    this.fruitList.push(carrot);
                //}
            }
        }
    }
    
    //移动地图
    private moveItem(){
        var len = this.fruitList.length;
        for(var i=0;i<len;i++){
            var fruit:BaseFruit = this.fruitList[i];
            var track = fruit.track;
            fruit.z += this.moveSpeed;
            fruit.y = this.farPotList[track].y + fruit.z / this.trackLenth * this.trackYList[track];
            fruit.x = this.farPotList[track].x + fruit.z / this.trackLenth * this.trackXList[track];
            fruit.scaleX = fruit.scaleY = fruit.z / this.trackLenth;
        }
    }
    
}









