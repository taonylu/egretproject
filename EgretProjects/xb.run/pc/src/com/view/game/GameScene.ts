/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    private socket:ClientSocket;
    
    private bg0Group:eui.Group;  //单人赛道
    private bg1Group:eui.Group;  //多人赛道
    private farPotList: Array<egret.Point> = new Array < egret.Point>();    //远点列表
    private nearPotList: Array<egret.Point> = new Array < egret.Point>();   //进点列表
    private trackXList = [];   //赛道X轴偏移量
    private trackYList = [];   //赛道y轴偏移量
    private roleList:Array<Player> = new Array<Player>();    //角色列表，保存3个角色。按数组下标0兔子 1熊猫 2鹿
    private playerGroup:eui.Group;   //玩家Group
    private playerLimit:number = 3;  //玩家人数限制
    private playerList: Array<Player> = new Array<Player>(); //当前玩家列表
    
    private gameHeadList:Array<GameHead> = new Array<GameHead>(); //游戏中头像
    private gameHeadPosList = [];  //游戏中头像的y位置，用于排名变化
    private scoreGroup:eui.Group;  //游戏中头像分数容器
    
    private carrotPool:ObjectPool = ObjectPool.getPool(Carrot.NAME,1); //胡萝卜对象池
    private bananaPool: ObjectPool = ObjectPool.getPool(Banana.NAME,1);//香蕉对象池
    private stonePool:ObjectPool = ObjectPool.getPool(Stone.NAME,1);   //石头对象池
    private micePool:ObjectPool = ObjectPool.getPool(Mice.NAME,1);       //地鼠对象池
    private highWoodPool:ObjectPool = ObjectPool.getPool(HighWood.NAME,1); //高木桩对象池
    private lowWoodPool:ObjectPool = ObjectPool.getPool(LowWood.NAME,1);   //矮木桩对象池
    private waterPool:ObjectPool = ObjectPool.getPool(Water.NAME,1);       //水池对象池
    private scorePoolList = [this.carrotPool, this.bananaPool];            //得分物品对象池数组
    private zhangAiPoolList = [this.stonePool, this.micePool, this.highWoodPool, this.lowWoodPool, this.waterPool];//障碍物对象池数组
    private itemList = [];           //物品列表(水果、障碍物)
    private itemGroup:eui.Group;     //物品Group
    
    private isSingleMode:boolean = true; //是否单人模式
    private singleTrackNum:number = 3;    //单人赛道数量
    private multiTrackNum:number = 7;     //多人赛道
    private trackNum:number;              //赛道数量
    
    private progressBar:eui.Image;        //进度条
    private progressSlider:eui.Image;
    
    private moveSpeed: number = 4;   //移动速度
    private stageWidth:number;       //舞台高宽
    private stageHeight:number;
    
    private grassGroup:eui.Group;    //草地Group
    private grassPot0:eui.Rect;      //草地刷新位置
    private grassPot1:eui.Rect; 
    private grassSpeedX:number = 2;  //草地X轴移动速度
    private grassPool:ObjectPool = ObjectPool.getPool(Grass.NAME); //草地对象池
    private grassList:Array<Grass> = new Array<Grass>(); //草地数组 
    
    private gameTimer:egret.Timer = new egret.Timer(1000); //游戏计时器
    private gameTimeLimit:number = 15;  //游戏时间限制
    
    private countDownTimer:egret.Timer = new egret.Timer(1000);  //倒计时
    private countDownLimit:number = 3;  //倒计时限制
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        this.resetGame();      //重置游戏
        this.startCountDown(); //开始倒计时
     }

    public onRemove(): void {
        
    }
    
    private startGame(){
        this.configListeners();  //每帧更新
        this.startGameTimer();   //开始游戏计时
        this.runAllPlayer();     //所有玩家跑动
    }
    
    private resetGame(){
        this.clearPlayerList(); //重置用户列表
        this.initMap();         //初始化地图
        this.initFarAndNear();  //初始化远点和近点
        this.resetAllPlayer();  //重置所有玩家
        this.clearItem();       //清理移动物体
        this.clearGrass();      //清理草地
        this.resetProgressBar();//重置进度条
        this.resetGameHead();   //重置用户头像
    }
    
    private gameOver(){
        this.stopGameTimer();      //停止游戏计时
        this.deConfigListeners();  //停止物体移动
        this.stopAllPlayer();      //停止玩家动作
        this.sendGameOver();       //发送游戏结束
    }
    
    //初始化场景
    private initView(){
        this.socket = ClientSocket.getInstance();
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight; 
        
        this.initRole();        //初始化角色
        this.initGrass();       //初始化草地
        this.initGameHead();    //初始化用户头像
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
    
    //初始化角色
    private initRole(){
        for(var i = 0;i < this.playerLimit;i++){
            var player: Player = new Player("player" + i + "_png","player" + i + "_json", "player" + i);
            this.roleList.push(player);
            player.offerX = -90;   //mc中心位置不准确，修正值
            player.offerY = -250;  
        }
    }
    
    //初始化地图
    private initMap(){
        //模式选择
        var userNum = UserManager.getInstance().getUserNum();
        if(userNum <= 1){
            this.isSingleMode = true;
            this.bg0Group.visible = true;
            this.bg1Group.visible = false;
        }else{
            this.isSingleMode = false;
            this.bg0Group.visible = false;
            this.bg1Group.visible = true;
        }
        //赛道数量
        this.trackNum = this.isSingleMode ? this.singleTrackNum : this.multiTrackNum;
    }
    
    //初始化远点和进点列表
    private initFarAndNear(){
        //清理数组
        this.farPotList.length = 0;
        this.nearPotList.length = 0;
        this.trackXList.length = 0;
        //获取赛道近点和远点
        var len = this.trackNum;
        var far: eui.Rect;
        var near: eui.Rect;
        for(var i=0;i<len;i++){
            if(this.isSingleMode){
                far = this["singleFar" + i];
                near = this["singleNear" + i];
            }else{
                far = this["far0" + i];
                near = this["near0" + i];
            }
            
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
    
    //初始化用户头像
    private initGameHead(){
        for(var i=0;i<this.playerLimit;i++){
            var gameHead: GameHead = this["gameHead" + i];
            this.gameHeadList.push(gameHead);
            gameHead.bg.texture = RES.getRes("scoreBg" + i + "_png");
            this.gameHeadPosList.push(gameHead.y);
        }
    }
    
    //重置用户头像
    private resetGameHead(){
        //清理头像
        var len = this.gameHeadList.length;
        for(var i=0;i<len;i++){
            var gameHead:GameHead = this.gameHeadList[i];
            gameHead.clear();
            gameHead.hide();
        }
        //将分数头像UI  绑定到玩家对象上
        len = this.playerList.length;
        for(var i = 0;i < len;i++){
            var player:Player = this.playerList[i];
            var gameHead:GameHead = this.gameHeadList[player.roleID];
            player.gameHead = gameHead;
            var userVO: UserVO = UserManager.getInstance().getUser(player.openid);
            gameHead.loadImg(userVO.headUrl);
            gameHead.setNameLabel(userVO.nickName);
            gameHead.openid = userVO.openid;
            gameHead.y = this.gameHeadPosList[i];
            this.scoreGroup.addChild(gameHead);
        }
    }
    
    //清理玩家列表
    private clearPlayerList(){
        this.playerList.length = 0;
    }
    
    //重置所有玩家
    private resetAllPlayer(){
        //隐藏所有玩家
        var len = this.roleList.length;
        for(var i=0;i<len;i++){
            var role:Player = this.roleList[i];
            role.hide();
        }
        //根据用户角色ID，创建用户角色
        var userList = UserManager.getInstance().userList;
        var userNum = userList.length;    
        for(var i=0;i<userNum;i++){
            var userVO:UserVO = userList[i];
            var player: Player = this.roleList[userVO.role];
            //player.reset();
            player.roleID = userVO.role;
            player.openid = userVO.openid;
            this.playerList.push(player);
        }
        //放置用户
        for(var i=0;i<userNum;i++){
            var player: Player = this.playerList[i];
            if(i==0){
                player.track = Math.floor(this.trackNum / 2);
            }else if(i==1){
                player.track = Math.floor(this.trackNum / 2) - 2;
            } else if(i == 2) {
                player.track = Math.floor(this.trackNum / 2) + 2;
            }
            player.x = this.nearPotList[player.track].x;
            player.y = this.nearPotList[player.track].y;
            player.shadow.x = player.x;
            player.shadow.y = player.y;
            player.modifyPos();
            player.clearStatus();
            player.score = 0;
            player.gameHead = null;
            player.stand();
            this.playerGroup.addChild(player.shadow);
            this.playerGroup.addChild(player);
        }
    }
    
    //根据openid获取Player
    private getPlayerByOpenid(openid:string):Player{
        var len = this.playerList.length;
        for(var i=0;i<len;i++){
            var player:Player = this.playerList[i];
            if(player.openid == openid){
                return player;
            }
        }
        return null;
    }
    
    //玩家撞到障碍物后，重置
    public resetPlayer(player:Player){
        player.track = Math.floor(this.trackNum / 2);
        player.x = this.nearPotList[player.track].x;
        player.y = this.nearPotList[player.track].y;
        player.shadow.x = player.x;
        player.shadow.y = player.y;
        player.modifyPos();
        player.run();
        player.clearStatus();
    }
    
    //停止用户跑步动作
    public stopAllPlayer(){
        var len = this.playerList.length;
        for(var i=0;i<len;i++){
            var player:Player = this.playerList[i];
            player.stand();
        }
    }
    
    //用户跑动
    public runAllPlayer(){
        var len = this.playerList.length;
        for(var i = 0;i < len;i++) {
            var player: Player = this.playerList[i];
            player.run();
        }
    }

    //创建地图，算法以单赛道创建为主，每隔一段距离创建一次
    private count:number = 0;
    private createItem(){
        this.count ++;
        var rand;
        var item:BaseItem;
        if(this.count %40 == 0){
            for(var i = 0;i < this.trackNum;i++) {
                rand = Math.random();
                if(rand <0.7) {  //创建得分物品
                    item = this.scorePoolList[NumberTool.getRandomInt(0,1)].getObject();
                }else{    //创建障碍物
                    item= this.zhangAiPoolList[NumberTool.getRandomInt(0,4)].getObject();   
                }
                item.x = this.farPotList[i].x;
                item.y = this.farPotList[i].y;
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
            item.y += this.moveSpeed + this.moveSpeed*item.scaleX;
            var rate = (item.y - this.farPotList[track].y) / this.trackYList[track]; //所在y轴位置比例
            item.x = this.farPotList[track].x +  rate* this.trackXList[track];
            item.scaleX = 0.4 + rate*0.3;
            item.scaleY = 0.4 + rate*0.3;
            
            //边界检测
            if(item.y > (this.stageHeight + item.height)) {
                item.recycle();
                this.itemList.splice(i,1);
                continue;
            }
            
            //遍历玩家 碰撞检测
            var playerLen = this.playerList.length;
            for(var j=0;j<playerLen;j++){
                var player = this.playerList[j];
                if(player.track == item.track && player.isDie == false){
                    var dist = player.shadow.y - item.y; //玩家和物体的距离，简略判断，因为取不了物体影子范围
                    if(dist >0 && dist < item.height/2){
                        var self:GameScene = this;
                        if(item.type == 0){  //得分物品
                            if( player.isJumping && ((item.y - player.y) > player.height/2)){
                                //TODO 跳跃，且不触碰物品
                            }else if(player.isDie){
                                //TODO 玩家死亡
                            }else{
                                item.changeAlpha();
                                this.itemList.splice(i,1);
                                player.score += item.score;
                                player.gameHead.setScoreLabel(player.score);
                                break; //该物品已移除，则不需要继续判断
                            } 
                        }else if(item.type == 1){ //可跨越障碍
                            if(player.isJumping && ((item.y -player.y)> player.height/2)) {
                                //TODO 跳跃，且不触碰物品
                            } else {
                                player.die();
                            }
                        }else if(item.type == 2){ //不可跨越障碍物
                            player.die();
                            
                        }
                    }
                }
            }

            
        }
    }
    
    //清理物体
    private clearItem() {
        var len = this.itemList.length;
        for(var i = 0;i < len;i++) {
            var item = this.itemList[i];
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
    
    //重置进度条
    private resetProgressBar(){
        this.progressSlider.x = this.progressBar.x;
        this.progressBar.scaleX = 0;
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
        this.progressBar.scaleX = this.gameTimer.currentCount/this.gameTimeLimit;
        this.progressSlider.x = this.progressBar.x + this.progressBar.width*this.progressBar.scaleX;
        
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
            this.stopCountDown();
            this.startGame();
        }
    }
    
    //停止倒计时
    private stopCountDown(){
        this.countDownTimer.removeEventListener(egret.TimerEvent.TIMER,this.onCountDownHandler,this);
        this.countDownTimer.stop();
    }
    
    //删除用户
    public deleteUser(openid:string){
        //清理用户列表
        var userManager: UserManager = UserManager.getInstance();
        userManager.deleteUser(openid);
        //所有人退出，则游戏结束
        if(userManager.getUserNum() == 0){
            this.gameOver();
        }
    }
    
    //////////////////////////////////////////////////////
    //------------------Socket数据处理---------------------
    //////////////////////////////////////////////////////
    
    //跳跃
    public revAction(data){
        //egret.log("revAction:",data);
        var actionType = data.actionType;
        var openid = data.openid;
        
        var player:Player = this.getPlayerByOpenid(openid);
        if(player == null){
            egret.log("行动的Player为null");
            return;
        }
        if(player.isMoving || player.isDie || player.isJumping){
            return;
        }
        
        var myTrack = player.track;
        var self: GameScene = this;
        if(actionType == "left"){
            if(myTrack > 0){
                myTrack--;
                player.isMoving = true;
                var dist = this.nearPotList[myTrack].x - this.nearPotList[myTrack+1].x;
                egret.Tween.get(player).to({x:player.x + dist},300);
                egret.Tween.get(player.shadow).to({ x: player.shadow.x + dist},300).call(function(){
                       player.isMoving = false;
                });
                player.track = myTrack;
            }
        }else if(actionType == "right"){
            if(myTrack < (this.trackNum-1)){
                myTrack++;
                player.isMoving = true;
                var dist = this.nearPotList[myTrack].x - this.nearPotList[myTrack - 1].x;
                egret.Tween.get(player).to({ x: player.x + dist},300);
                egret.Tween.get(player.shadow).to({ x: player.shadow.x + dist },300).call(function() {
                    player.isMoving = false;
                });;
                player.track = myTrack;
            }
        }else if(actionType == "up"){
            player.jump();
        }
        
    }
    
    //发送游戏结束
    public sendGameOver(){
        console.log("sendGameOver");
        
        //将本次游戏用户数据打包
        var json = {scoreList:[]};
        var len = this.playerList.length;
        for(var i=0;i<len;i++){
            var obj = {openid:"", score:0};
            obj.openid = this.playerList[i].openid;
            obj.score = this.playerList[i].score;
            json.scoreList.push(obj);
        }
        
        //排序本次用户数据
        for(var i=0;i<len;i++){
            for(var j=i+1;j<len;j++){
                var objA = json.scoreList[i];
                var objB = json.scoreList[j];
                if(objA.score < objB.score){
                    var temp = objA.openid;
                    objA.openid = objB.openid;
                    objB.openid = temp;
                    
                    temp = objA.score;
                    objA.score = objB.score;
                    objB.score = temp;
                }
            }
        }
        
        //保存本次游戏用户数据
        this.resultData.scoreList = json.scoreList;
        //发送
        this.socket.sendMessage("gameOver",json, this.revGameOver, this);
    }
    
    //结果数据，临时保存本地玩家分数和服务器返回分数，用于结果场景显示
    public resultData = {scoreList:[], rankList:[], gameRankList:[]};  
    //接收游戏结束
    private revGameOver(data){
        console.log("revGameOver",data);
        if(GameConst.debug){
            this.resultData.rankList = [
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 },
                  { nickName: "AA",headUrl: "resource/assets/home/home_arrow0.png",score: 999 }
              ]
        }else{
            this.resultData.rankList = data.rankList;
            this.resultData.gameRankList = data.gameRankList;
        }
        LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
    }
}









