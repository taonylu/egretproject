/**
*  文 件 名：GameSprite.ts
*  功    能：游戏容器
*  内    容： 原生游戏对象容器
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class GameSprite extends egret.Sprite{

    //---------------[场景]---------------
    private facade: ApplicationFacade;               //facade引用
    public gameScene: GameScene;                     //游戏场景
    public topSprite: egret.DisplayObjectContainer;  //顶级容器，显示控制杆，避免遮挡
    private handleUI: HandleUI = new HandleUI();     //控制杆
    private beEatenUI:BeEatenUI = new BeEatenUI();   //自己被吃掉后的弹出框
    
    //---------------[游戏元素]---------------
    public playerM:PlayerManager = PlayerManager.getInstance();       //玩家列表管理类
    private rectPool: ObjectPool = ObjectPool.getPool(Rect.NAME,100); //方块对象池
    private rectList: Object = {};           //方块列表
    private paopaoList: Object = {};         //泡泡列表
    private myHero:BaseSpore;               //玩家主体

    //---------------[游戏变量]-------------
    private mapWidth: number = 0;            //地图高宽
    private mapHeight: number = 0;
    private stageWidth: number = 0;          //场景高宽
    private stageHeight: number = 0;
    private halfStageWidth: number = 0;      //场景一半高宽
    private halfStageHeight: number = 0;
    private gameTimer: egret.Timer;          //计时器

    private bSendMoveing:boolean = false;

	public constructor() {
        super();
        this.touchEnabled = false;
        this.touchChildren = false;
        this.mapWidth = GameConst.MapWidth;
        this.mapHeight = GameConst.MapHeight;
        this.stageWidth = GameConst.StageWidth;
        this.stageHeight = GameConst.StageHeight;
        this.halfStageWidth = GameConst.HalfStageWidth;
        this.halfStageHeight = GameConst.HalfStageHeight;
        this.width = this.mapWidth;
        this.height = this.mapHeight;
        this.anchorOffsetX = this.width/2;
        this.anchorOffsetY = this.height/2;
        this.x = this.width/2;
        this.y = this.height/2;
        this.facade = ApplicationFacade.getInstance();
        this.drawLine();
	}
	
    public startGame(): void {
        this.createHero();
        this.createRect();
        this.createPlayer();
        this.gameScene.setRankLabel();
        this.configListeners();
        this.startGameTimer();
    }

    public quitGame():void{
        this.deConfigListeners();
        this.stopGameTimer();
        this.deleteAllPlayer();
        this.deleteAllRect();
        this.resetGameData();
        ApplicationFacade.getInstance().sendNotification(HomeMediator.SHOW);
    }

    private onEnterFrame(): void {
        this.movePlayer();
        this.setRectVisible();
        this.checkColloise();
    }

    private drawLine(): void {
        this.graphics.lineStyle(1,0xffffff);
        var len: number = this.mapWidth / 100 + 1;
        for(var i: number = 0;i < len;i++) {
            this.graphics.moveTo(0,i * 100);
            this.graphics.lineTo(this.mapWidth,i * 100);
            this.graphics.moveTo(i * 100,0);
            this.graphics.lineTo(i * 100,this.mapHeight);
        }
    }

    private configListeners():void{
        var stage: egret.Stage = LayerManager.getInstance().stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }

    private deConfigListeners():void{
        var stage: egret.Stage = LayerManager.getInstance().stage;
        stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }

    private touchBeginP: egret.Point = new egret.Point();  //触摸起始点
    private onTouchBegin(e:egret.TouchEvent): void {
        if(e.target instanceof  NarrowButton){
            return;
        }

        this.handleUI.show(e.localX,e.localY,this.topSprite);
        this.touchBeginP.x = e.localX;
        this.touchBeginP.y = e.localY;
    }


    //触摸弹起后，未超过指定范围，则停止移动
    private onTouchTap(e: egret.TouchEvent): void {
        if(e.target instanceof  NarrowButton){
            return;
        }
        if(Math.abs(this.touchBeginP.x - e.localX) < this.distLimit && Math.abs(this.touchBeginP.y - e.localY) < this.distLimit) {
            this.sendPlayerMove(this.stopAngle);
        }
    }
    
    private onTouchEnd(e:egret.TouchEvent): void { 
        this.handleUI.hide();
    }
    
    private distX: number = 0;       //触摸点距离控制杆圆心x距离
    private distY: number = 0;       //触摸点距离控制杆圆心y距离
    private moveAngle: number = 0;       //移动角度
    private moveCount: number = 5;   //移动判断间隔，减少cpu消耗
    private distLimit: number = 20;  //手指滑动距离超过n，才算有效移动
    private angleLimit: number = 0.05;//手指滑动角度改变超过n，才算有效移动
    private stopAngle: number = 10;   //发送该角度，表示停止移动
    private onTouchMove(e: egret.TouchEvent): void { 
        this.distX = e.localX - this.handleUI.x;
        this.distY = e.localY - this.handleUI.y;
        this.moveAngle = Math.atan2(this.distY,this.distX);
        this.handleUI.setCirclePos(this.moveAngle);
        this.moveCount++;
        if(this.moveCount > 5) {
            this.moveCount = 0;
            if(Math.abs(this.moveAngle - this.myHero.angle)> this.angleLimit){
                this.sendPlayerMove(this.moveAngle);
            }
        }
    }

    private createHero(): void { 
        var data: RevStartGame = <RevStartGame>ApplicationFacade.getInstance().retrieveProxy(RevStartGame.NAME);
        var myHero:BaseSpore = new BaseSpore();
        myHero.setName(StringTool.mixUnicodeToCh(data.username));
        myHero.setSkin(data.skinid);
        myHero.x = data.x;
        myHero.y = data.y;
        this.addChild(myHero);
        myHero.userID = data.userid;
        myHero.sporeID = data.sporeid;
        myHero.isCanColliseSelf = true;
        myHero.angle = this.stopAngle;
        UserManager.getInstance().userID = myHero.userID;
        this.playerM.addPlayer(myHero);
        this.myHero = myHero;
        console.log("添加自己" ,myHero.userID, myHero.sporeID);
    }

    private createPlayer(): void { 
        var data: RevStartGame = <RevStartGame>ApplicationFacade.getInstance().retrieveProxy(RevStartGame.NAME);
        var playerList = data.playerlist;
        for(var i: number = 0;i < data.playernum;i++) {  //遍历玩家列表
            var player: BaseSpore = new BaseSpore();
            player.userID = playerList[i][0];
            player.setName(StringTool.mixUnicodeToCh(playerList[i][1]));
            player.setSkin(playerList[i][4]);
            player.eat(playerList[i][2] - player.weight);
            player.x = parseFloat(playerList[i][5]);  //字符串转成浮点数
            player.y = parseFloat(playerList[i][6]);
            player.sporeID = playerList[i][7];
            this.addChild(player);
            this.playerM.addPlayer(player);
            console.log("添加其他人" ,player.userID,player.sporeID);
            //TODO 没有对时包，无法同步已在场景中正在移动的玩家位置和方向
        }
    }

    private createRect(): void { 
        var data: RevStartGame = <RevStartGame>ApplicationFacade.getInstance().retrieveProxy(RevStartGame.NAME);
        this.generationRect(data.rectnum,data.rectlist);
    }

    private generationRect(rectNum,rectList): void {
        var rect: Rect;
        for(var i: number = 0;i < rectNum;i++) {
            rect = this.rectPool.getObject();
            rect.reset();
            rect.id = rectList[i][0];
            rect.x = rectList[i][1];
            rect.y = rectList[i][2];
            this.rectList[rect.id] = rect;
            this.addChild(rect);
        }
    }

    //六角方块的显示
    private setRectVisible(): void {
        var rect: Rect;
        var xPos:number = this.myHero.x;
        var yPos:number = this.myHero.y;
        for(var key in this.rectList) {
            rect = this.rectList[key];
            if(Math.abs(xPos - rect.x) < this.halfStageWidth*1.5 && Math.abs(yPos - rect.y) < this.halfStageHeight*1.5) {
                rect.visible = true;
            } else{
                rect.visible = false;
            }
        }
    }


    private movePlayer(): void {
        var sporeList = this.playerM.sporeList;
        for(var key in sporeList) {
            (<BaseSpore>sporeList[key]).onEnterFrame();
        }
        //当孢子脱离太远时，会减少孢子的移动速度
        //sporeList = this.playerM.getSporeBySporeID(this.myHero.userID);
        //var spore:BaseSpore;
        //for(key in sporeList){
        //    spore = sporeList[key];
        //    if((Math.abs(spore.x - this.myHero.x) > 350 ||(Math.abs(spore.y - this.myHero.y))> 350)){
        //        spore.speed = GameConst.playerMinSpeed;
        //    }
        //}
        this.moveCamera();
    }

    private moveCamera(): void {
        this.x = (this.halfStageWidth - this.myHero.x + this.mapWidth/2)*this.scaleX;
        this.y = (this.halfStageHeight - this.myHero.y + this.mapHeight/2)*this.scaleY;

        //TODO 分身较多时，视野的控制。主体被吃掉时，视野的控制。
    }

    //根据孢子数和距离，来决定舞台的scale
    private changeCamera():void{
        var sporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
        var sporeCount = ArrayTool.getObjectLen(sporeList);
        if(sporeCount <= 1){
            return;
        }
        //
        //console.log("多孢子状态下调整镜头");
        //
        //var maxX:number = this.myHero.x;
        //var maxY:number = this.myHero.y;
        //var minX:number = this.myHero.x;
        //var minY:number = this.myHero.y;
        //var max:number = 0;
        //var x:number;
        //var y :number;
        //var spore:BaseSpore;
        //for(var i in sporeList){
        //    spore = sporeList[i];
        //    x = spore.x;
        //    y = spore.y;
        //    maxX = (maxX > x)?maxX:x;
        //    maxY = (maxY > y)?maxY:y;
        //    minX = (minX < x)?minX:x;
        //    minY = (minY < y)?minY:y;
        //}
        //max = ((maxX - minX) > (maxY - minY))?(maxX-minX):(maxY-minY);
        //var scale:number = 1 - max/this.stageWidth;
        var scale:number = 1 - sporeCount*0.05;
        if(scale >= 0.8){
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({scaleX:scale,scaleY:scale},1000);
        }
    }




    private colloiseCount:number = 0;
    private checkColloise(): void {
        this.colloiseCount++;
        switch (this.colloiseCount){
            case 1:
                this.checkRectColloise();
                break;
            case 2:
                this.checkPlayerColloise();
                break;
            case 3:
                this.checkPaoPaoColloise();
                this.colloiseCount = 0;
                break;
        }
    }
o
    private eatRectList:Array<any> = [];  //存放被吃掉的方块
    private checkRectColloise():void{
        var rect:Rect;
        var myHero:BaseSpore;
        var sporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
        for(var i in sporeList){    //遍历玩家自身列表
            myHero = sporeList[i];
            for(var j in this.rectList) {   //遍历方块列表
                rect = this.rectList[j];
                if (rect.visible && !rect.isChecked) {
                    if (Math.abs(myHero.x - rect.x) < myHero.radius && Math.abs(myHero.y - rect.y) < myHero.radius) {
                        this.eatRectList.push(rect.id);
                        rect.isChecked = true;
                    }
                }
            }
            //发送吃方块
            if(this.eatRectList.length != 0){
                var data: SendEatRect = new SendEatRect();
                data.cmd = NetConst.EAT_RECT;
                data.hunterid = myHero.sporeID;
                data.rectlist = this.eatRectList;
                ClientSocket.getInstance().send(data);
                this.eatRectList.length = 0;
            }
          }
    }

    private checkPlayerColloise():void{
        var spore:BaseSpore;   //临时存放玩家孢子(自己+其他玩家)
        var mySpore:BaseSpore; //临时存放自己孢子
        var sporeList:Object;
        var playerList = this.playerM.playerList;
        var mySporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
        for(var i in playerList){       //遍历全玩家列表
            sporeList = playerList[i];
            for(var j in sporeList){      //遍历玩家孢子列表
                spore = sporeList[j];
                for(var k in mySporeList){//遍历自己孢子列表
                    mySpore = mySporeList[k];
                    if(spore.isChecked==false && mySpore.isChecked == false && spore.sporeID != mySpore.sporeID){ //两个孢子未检查过，并且不是同一个
                        var hitArea:number = (mySpore.radius+spore.radius)/2;
                        if(Math.abs(spore.x - mySpore.x) < hitArea && Math.abs(spore.y - mySpore.y)<hitArea) { //两个孢子距离足够碰撞
                            console.log("碰撞:" + spore.x, spore.y, mySpore.x,mySpore.y,mySpore.radius);
                            if(spore.userID == mySpore.userID && (spore.isCanColliseSelf == false || mySpore.isCanColliseSelf == false)){ //两个孢子属于同一ID，并且在弹射状态
                                continue;
                            }
                            if(spore.weight != mySpore.weight){
                                var hunterID:number;
                                var foodID:number;
                                if(spore.weight < mySpore.weight){ //根据重量判断
                                    hunterID = mySpore.sporeID;
                                    foodID = spore.sporeID;
                                    spore.isChecked = true;
                                }else{
                                    hunterID = spore.sporeID;
                                    foodID = mySpore.sporeID;
                                    mySpore.isChecked = true;
                                }
                                //发送玩家互吃
                                var data: SendEatPlayer = new SendEatPlayer();
                                data.cmd = NetConst.EAT_PLAYER;
                                data.hunterid = hunterID;
                                data.foodid = foodID;
                                ClientSocket.getInstance().send(data);
                            }
                        }
                    }
                }
            }
        }
    }

    private checkPaoPaoColloise():void{
        var paopao:PaoPao;
        var myHero:BaseSpore;
        var sporelist = this.playerM.getSporeListByUserID(this.myHero.userID);
        for(var i in this.paopaoList){   //遍历泡泡列表
            paopao = this.paopaoList[i];
            if(!paopao.isChecked){
                for(var j in sporelist){    //遍历自己孢子列表
                    myHero = sporelist[j];
                    if(Math.abs(paopao.x - myHero.x) < myHero.radius && Math.abs(paopao.y - myHero.y)<myHero.radius) { //孢子和泡泡碰撞
                        if(myHero.userID == paopao.userID && paopao.isCanColliseSelf == false){  //泡泡在弹射状态不和自己的孢子碰撞
                            continue;
                        }
                        paopao.isChecked = true;
                        var data: SendEatPaoPao = new SendEatPaoPao();
                        data.cmd = NetConst.EAT_PAO_PAO;
                        data.hunterid = myHero.sporeID;
                        data.paopaoid = paopao.ID;
                        ClientSocket.getInstance().send(data);
                        break;
                    }
                }
            }
        }
    }

    private startGameTimer(): void { 
        if(this.gameTimer == null) { 
            this.gameTimer = new egret.Timer(1000);
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }

    private onGameTimerHandler(): void {
        var timeCount = this.gameTimer.currentCount;
        if(timeCount % 5 == 0) {     //每5秒设置一次排行榜
            this.gameScene.setRankLabel();
        }
       // if(timeCount%10 == 0){
            //this.changeCamera(); //每10秒设置一次camero
       // }
    }
    
    private stopGameTimer(): void { 
        if(this.gameTimer != null) {
            this.gameTimer.stop();
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimerHandler,this);
        }
    }

    private deleteAllPlayer():void{
        //销毁玩家
        var player:BaseSpore;
        var playerList = this.playerM.playerList;
        var sporeList;
        for(var i in playerList){
            sporeList = playerList[i];
            for(var j in sporeList){
                player = sporeList[j];
                if(player != null){
                    player.hide();
                    player = null;
                }
            }
        }
        this.playerM.deleteAll();
    }

    private deleteAllRect():void{
        for(var key in this.rectList) {
            var rect:Rect = this.rectList[key];
            delete  this.rectList[key];
            rect.hide();
        }
    }

    private resetGameData():void{
        //隐藏手柄
        this.handleUI.hide();

        //重置状态
        if(UserManager.getInstance().userType == 0) {
            UserManager.getInstance().userID = 0;
        }
        this.bSendMoveing = false;

        //重置碰撞计数
        this.colloiseCount = 0;

        //重置舞台大小
        this.scaleX = 1;
        this.scaleY = 1;
    }

    private sendTime:number = 0;
    private sendPlayerMove(angle:number): void {
        if(this.bSendMoveing){
            return;
        }
        this.sendTime = egret.getTimer();
        this.bSendMoveing = true;
        
        var data: SendMovePlayer = new SendMovePlayer();
        data.cmd = NetConst.MOVE_REQUEST;
        data.userid = UserManager.getInstance().userID;
        data.angle = angle;
        var myHero:BaseSpore;
        var myHeroList = this.playerM.getSporeListByUserID(this.myHero.userID);
        for(var i in myHeroList){
            myHero= myHeroList[i];
            data.sporelist.push([myHero.sporeID,myHero.x.toString(),myHero.y.toString()]);
        }
        ClientSocket.getInstance().send(data);
    }

    public revMovePlayer(byteArray:egret.ByteArray): void {
        console.log("lag:" + (egret.getTimer() - this.sendTime));
        var data: RevMovePlayer = new RevMovePlayer();
        data.readData(byteArray);

        var sporelist = data.sporelist;
        var localSporeList = this.playerM.getSporeListByUserID(data.userid);
        var sporeID:number;
        for(var i:number = 0;i<sporelist.length;i++){   //遍历需要移动的孢子列表
            sporeID = sporelist[i][0];
            if(localSporeList[sporeID]){
                //TODO 每次校对位置，都会有些微差别，因为无对时包、时间戳，无法进行预测拉扯
                var player:BaseSpore = localSporeList[sporeID];
                player.moveToByAngle(data.angle);
                var x = parseFloat(sporelist[i][1]) + player.xSpeed*2;  //假设延迟5帧
                var y = parseFloat(sporelist[i][2]) + player.ySpeed*2;
                if(Math.abs(player.x - x)>25 || Math.abs(player.y - y)>25){
                    console.log("拉扯:",player.x, player.y,x,y);
                    egret.Tween.removeTweens(player);
                    egret.Tween.get(player).to({x:x},100);
                    egret.Tween.get(player).to({y:y},100);
                }
            }else{
                console.log("error:" + sporeID + " player is null");
            }
        }
        this.bSendMoveing = false;
    }

    public revAddPlayer(byteArray:egret.ByteArray): void {
        var data: RevJoinPlayer = new RevJoinPlayer();
        data.readData(byteArray);
        //判断新玩家是否是自己。
        console.log("新玩家加入:" + data.userid);
        if(data.userid != UserManager.getInstance().userID) {
            var player: BaseSpore = new BaseSpore();
            player.setSkin(data.skinid);
            player.setName(StringTool.mixUnicodeToCh(data.username));
            player.reset();
            player.weight = data.weight;
            player.x = data.x;
            player.y = data.y;
            player.userID = data.userid;
            player.sporeID = data.sporeid;
            this.addChild(player);
            this.playerM.addPlayer(player);

            //当有新玩家加入时，发送一次自己的移动方向和位置，临时用来同步
            this.sendPlayerMove(this.myHero.angle);
        }       
     }

    public revEatRect(byteArray:egret.ByteArray): void {
        var data: RevEatRect = new RevEatRect();
        data.readData(byteArray);

        var player: BaseSpore = this.playerM.getPlayerBySporeID(data.hunterid);

        if(player != null) {
            var rectlist = data.rectlist;
            var len: number = rectlist.length;
            var rectID: number;
            var rect: Rect;
            for(var i: number = 0;i < len;i++) {
                rectID = rectlist[i];
                rect = this.rectList[rectID];
                rect.hide();
                delete this.rectList[rectID];
                player.eat(rect.weight);
                this.playerM.addWeightBySporeID(data.hunterid, rect.weight);
            }

            if(player.userID == this.myHero.userID) {
                this.gameScene.setWeightLabel(this.playerM.getWeightByUserID(this.myHero.userID));
            }
        }    
    }

    public revEatPlayer(byteArray:egret.ByteArray): void {
        var data: RevEatPlayer = new RevEatPlayer();
        data.readData(byteArray);
        var hunter: BaseSpore = this.playerM.getSporeBySporeID(data.hunterid);
        var food: BaseSpore = this.playerM.getSporeBySporeID(data.foodid);

        if(hunter == null || food == null){
            console.log("error: ear player is null");
            return;
        }

        hunter.eat(food.weight);
        food.die();

        this.playerM.addWeightBySporeID(data.hunterid, food.weight);
        this.playerM.reduceWeightBySporeID(data.foodid, food.weight);
        this.playerM.deleteSpore(data.foodid);

        //自己被吃掉
        if(food.userID == this.myHero.userID) {
            if(food.sporeID == this.myHero.sporeID){
                this.myHero = this.playerM.getOneSporeByUserID(this.myHero.userID);
            }

            //所有自己的孢子都被吃掉了
            if(this.myHero == null){
                this.deConfigListeners();
                this.beEatenUI.show();
                this.beEatenUI.setTitle(hunter.userName);
            }else{
                //分裂孢子数量减少后，缩放场景
                this.changeCamera();

            }
        }
    }

    public revCreateNewRect(byteArray:egret.ByteArray): void {
        var data: RevCreateRect = new RevCreateRect();
        data.readData(byteArray);
        this.generationRect(data.rectnum,data.rectlist);
    }

    public revUserLeave(byteArray:egret.ByteArray): void { 
        var data: RevPlayerLeave = new RevPlayerLeave();
        data.readData(byteArray);
        var sporeList = this.playerM.getSporeListByUserID(data.userid);
        if(sporeList == null){
            console.log("error:rev userleave player is null");
        }
        var player:BaseSpore;
        for(var key in sporeList){
            player = sporeList[key];
            player.hide();
        }
        this.playerM.deleteUser(data.userid);
    }

    public sendTuPaoPao(): void {
        var myWeight:number =  this.playerM.getWeightByUserID(this.myHero.userID);
        if(myWeight >= GameConst.tuPaoPaoWeightLimit) {
            var data: SendTuPaoPao = new SendTuPaoPao();
            data.cmd = NetConst.TU_PAO_PAO;
            data.userid = this.myHero.userID;
            ClientSocket.getInstance().send(data);
        }
    }

    public revTuPaoPao(byteArray:egret.ByteArray): void { 
        var data: RevTuPaoPao = new RevTuPaoPao();
        data.readData(byteArray);
        var localScopeList = this.playerM.getSporeListByUserID(data.userid);
        var paopaoList = data.paopaolist;
        var spore: BaseSpore;
        var paopao:PaoPao;

        if(localScopeList == null){
            console.log("error：rev tupaopao player is null");
            return;
        }
        //重量满足的孢子才能吐泡泡
        for(var key in paopaoList){
            spore = localScopeList[paopaoList[key][0]];
            if(spore.weight >= GameConst.tuPaoPaoWeightLimit){
                paopao = spore.tuPaoPao();
                paopao.ID = data.paopaolist[key][1];
                this.paopaoList[paopao.ID] = paopao;
                this.playerM.reduceWeightBySporeID(spore.sporeID, GameConst.paopaoWeight);
            }
        }

        if(data.userid == this.myHero.userID){
            this.gameScene.setWeightLabel(this.playerM.getWeightByUserID(this.myHero.userID));
        }

    }

    public revEatPaoPao(byteArray:egret.ByteArray):void{
        var data: RevEatPaoPao = new RevEatPaoPao();
        data.readData(byteArray);
        var player: BaseSpore = this.playerM.getSporeBySporeID(data.hunterid);
        var paopao: PaoPao = this.paopaoList[data.paopaoid];

        if(player == null){
            console.log("error: revEatpaopao player is null");
        }

        player.eat(paopao.weight);
        paopao.hide();
        delete this.paopaoList[data.paopaoid];
        this.playerM.addWeightBySporeID(player.sporeID, paopao.weight);

        if(player.userID = this.myHero.userID){
            this.gameScene.setWeightLabel(this.playerM.getWeightByUserID(this.myHero.userID));
        }
    }

    public sendFenLie(): void { 
        if(this.myHero.weight >= GameConst.fenlieLimit) {
            var sporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
            //当前孢子数量小于一定数量时，才能分裂
            if(ArrayTool.getObjectLen(sporeList) <= GameConst.fenlieMax){
                var data: SendFenLie = new SendFenLie();
                data.cmd = NetConst.FEN_LIE;
                data.userid = this.myHero.userID;
                ClientSocket.getInstance().send(data);
            }
        }
    }

    public revFenLie(byteArray:egret.ByteArray):void{
        var data: RevFenLie = new RevFenLie();
        data.readData(byteArray);
        var sporeList = data.sporelist;
        var localSporeList = this.playerM.getSporeListByUserID(data.userid);
        var player:BaseSpore;

        if(localSporeList == null){
            console.log("error: revFenLie player is null");
        }

        for(var key in sporeList){
            player = localSporeList[sporeList[key][0]];
            var newSpore:BaseSpore = player.fenLie();
            newSpore.moveFrom(player.x, player.y, player.angle);
            newSpore.sporeID = sporeList[key][1];
            this.playerM.addPlayer(newSpore);
        }

        if(player.userID == this.myHero.userID){
            this.changeCamera();
        }

    }

}
















