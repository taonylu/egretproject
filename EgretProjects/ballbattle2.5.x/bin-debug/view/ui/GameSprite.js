/**
*  文 件 名：GameSprite.ts
*  功    能：游戏容器
*  内    容： 原生游戏对象容器
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var GameSprite = (function (_super) {
    __extends(GameSprite, _super);
    function GameSprite() {
        _super.call(this);
        this.handleUI = new HandleUI(); //控制杆
        this.beEatenUI = new BeEatenUI(); //自己被吃掉后的弹出框
        //---------------[游戏元素]---------------
        this.playerM = PlayerManager.getInstance(); //玩家列表管理类
        this.rectPool = ObjectPool.getPool(Rect.NAME, 100); //方块对象池
        this.rectList = {}; //方块列表
        this.paopaoList = {}; //泡泡列表
        //---------------[游戏变量]-------------
        this.mapWidth = 0; //地图高宽
        this.mapHeight = 0;
        this.stageWidth = 0; //场景高宽
        this.stageHeight = 0;
        this.halfStageWidth = 0; //场景一半高宽
        this.halfStageHeight = 0;
        this.bSendMoveing = false;
        this.touchBeginP = new egret.Point(); //触摸起始点
        this.distX = 0; //触摸点距离控制杆圆心x距离
        this.distY = 0; //触摸点距离控制杆圆心y距离
        this.moveAngle = 0; //移动角度
        this.moveCount = 5; //移动判断间隔，减少cpu消耗
        this.distLimit = 20; //手指滑动距离超过n，才算有效移动
        this.angleLimit = 0.05; //手指滑动角度改变超过n，才算有效移动
        this.stopAngle = 10; //发送该角度，表示停止移动
        this.colloiseCount = 0;
        this.eatRectList = []; //存放被吃掉的方块
        this.sendTime = 0;
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
        this.anchorOffsetX = this.width / 2;
        this.anchorOffsetY = this.height / 2;
        this.x = this.width / 2;
        this.y = this.height / 2;
        this.facade = ApplicationFacade.getInstance();
        this.drawLine();
    }
    var d = __define,c=GameSprite;p=c.prototype;
    p.startGame = function () {
        this.createHero();
        this.createRect();
        this.createPlayer();
        this.gameScene.setRankLabel();
        this.configListeners();
        this.startGameTimer();
    };
    p.quitGame = function () {
        this.deConfigListeners();
        this.stopGameTimer();
        this.deleteAllPlayer();
        this.deleteAllRect();
        this.resetGameData();
        ApplicationFacade.getInstance().sendNotification(HomeMediator.SHOW);
    };
    p.onEnterFrame = function () {
        this.movePlayer();
        this.setRectVisible();
        this.checkColloise();
    };
    p.drawLine = function () {
        this.graphics.lineStyle(1, 0xffffff);
        var len = this.mapWidth / 100 + 1;
        for (var i = 0; i < len; i++) {
            this.graphics.moveTo(0, i * 100);
            this.graphics.lineTo(this.mapWidth, i * 100);
            this.graphics.moveTo(i * 100, 0);
            this.graphics.lineTo(i * 100, this.mapHeight);
        }
    };
    p.configListeners = function () {
        var stage = LayerManager.getInstance().stage;
        stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.deConfigListeners = function () {
        var stage = LayerManager.getInstance().stage;
        stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    p.onTouchBegin = function (e) {
        if (e.target instanceof NarrowButton) {
            return;
        }
        this.handleUI.show(e.localX, e.localY, this.topSprite);
        this.touchBeginP.x = e.localX;
        this.touchBeginP.y = e.localY;
    };
    //触摸弹起后，未超过指定范围，则停止移动
    p.onTouchTap = function (e) {
        if (e.target instanceof NarrowButton) {
            return;
        }
        if (Math.abs(this.touchBeginP.x - e.localX) < this.distLimit && Math.abs(this.touchBeginP.y - e.localY) < this.distLimit) {
            this.sendPlayerMove(this.stopAngle);
        }
    };
    p.onTouchEnd = function (e) {
        this.handleUI.hide();
    };
    p.onTouchMove = function (e) {
        this.distX = e.localX - this.handleUI.x;
        this.distY = e.localY - this.handleUI.y;
        this.moveAngle = Math.atan2(this.distY, this.distX);
        this.handleUI.setCirclePos(this.moveAngle);
        this.moveCount++;
        if (this.moveCount > 5) {
            this.moveCount = 0;
            if (Math.abs(this.moveAngle - this.myHero.angle) > this.angleLimit) {
                this.sendPlayerMove(this.moveAngle);
            }
        }
    };
    p.createHero = function () {
        var data = ApplicationFacade.getInstance().retrieveProxy(RevStartGame.NAME);
        var myHero = new BaseSpore();
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
        console.log("添加自己", myHero.userID, myHero.sporeID);
    };
    p.createPlayer = function () {
        var data = ApplicationFacade.getInstance().retrieveProxy(RevStartGame.NAME);
        var playerList = data.playerlist;
        for (var i = 0; i < data.playernum; i++) {
            var player = new BaseSpore();
            player.userID = playerList[i][0];
            player.setName(StringTool.mixUnicodeToCh(playerList[i][1]));
            player.setSkin(playerList[i][4]);
            player.eat(playerList[i][2] - player.weight);
            player.x = parseFloat(playerList[i][5]); //字符串转成浮点数
            player.y = parseFloat(playerList[i][6]);
            player.sporeID = playerList[i][7];
            this.addChild(player);
            this.playerM.addPlayer(player);
            console.log("添加其他人", player.userID, player.sporeID);
        }
    };
    p.createRect = function () {
        var data = ApplicationFacade.getInstance().retrieveProxy(RevStartGame.NAME);
        this.generationRect(data.rectnum, data.rectlist);
    };
    p.generationRect = function (rectNum, rectList) {
        var rect;
        for (var i = 0; i < rectNum; i++) {
            rect = this.rectPool.getObject();
            rect.reset();
            rect.id = rectList[i][0];
            rect.x = rectList[i][1];
            rect.y = rectList[i][2];
            this.rectList[rect.id] = rect;
            this.addChild(rect);
        }
    };
    //六角方块的显示
    p.setRectVisible = function () {
        var rect;
        var xPos = this.myHero.x;
        var yPos = this.myHero.y;
        for (var key in this.rectList) {
            rect = this.rectList[key];
            if (Math.abs(xPos - rect.x) < this.halfStageWidth * 1.5 && Math.abs(yPos - rect.y) < this.halfStageHeight * 1.5) {
                rect.visible = true;
            }
            else {
                rect.visible = false;
            }
        }
    };
    p.movePlayer = function () {
        var sporeList = this.playerM.sporeList;
        for (var key in sporeList) {
            sporeList[key].onEnterFrame();
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
    };
    p.moveCamera = function () {
        this.x = (this.halfStageWidth - this.myHero.x + this.mapWidth / 2) * this.scaleX;
        this.y = (this.halfStageHeight - this.myHero.y + this.mapHeight / 2) * this.scaleY;
        //TODO 分身较多时，视野的控制。主体被吃掉时，视野的控制。
    };
    //根据孢子数和距离，来决定舞台的scale
    p.changeCamera = function () {
        var sporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
        var sporeCount = ArrayTool.getObjectLen(sporeList);
        if (sporeCount <= 1) {
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
        var scale = 1 - sporeCount * 0.05;
        if (scale >= 0.8) {
            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({ scaleX: scale, scaleY: scale }, 1000);
        }
    };
    p.checkColloise = function () {
        this.colloiseCount++;
        switch (this.colloiseCount) {
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
    };
    p.checkRectColloise = function () {
        var rect;
        var myHero;
        var sporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
        for (var i in sporeList) {
            myHero = sporeList[i];
            for (var j in this.rectList) {
                rect = this.rectList[j];
                if (rect.visible && !rect.isChecked) {
                    if (Math.abs(myHero.x - rect.x) < myHero.radius && Math.abs(myHero.y - rect.y) < myHero.radius) {
                        this.eatRectList.push(rect.id);
                        rect.isChecked = true;
                    }
                }
            }
            //发送吃方块
            if (this.eatRectList.length != 0) {
                var data = new SendEatRect();
                data.cmd = NetConst.EAT_RECT;
                data.hunterid = myHero.sporeID;
                data.rectlist = this.eatRectList;
                ClientSocket.getInstance().send(data);
                this.eatRectList.length = 0;
            }
        }
    };
    p.checkPlayerColloise = function () {
        var spore; //临时存放玩家孢子(自己+其他玩家)
        var mySpore; //临时存放自己孢子
        var sporeList;
        var playerList = this.playerM.playerList;
        var mySporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
        for (var i in playerList) {
            sporeList = playerList[i];
            for (var j in sporeList) {
                spore = sporeList[j];
                for (var k in mySporeList) {
                    mySpore = mySporeList[k];
                    if (spore.isChecked == false && mySpore.isChecked == false && spore.sporeID != mySpore.sporeID) {
                        var hitArea = (mySpore.radius + spore.radius) / 2;
                        if (Math.abs(spore.x - mySpore.x) < hitArea && Math.abs(spore.y - mySpore.y) < hitArea) {
                            console.log("碰撞:" + spore.x, spore.y, mySpore.x, mySpore.y, mySpore.radius);
                            if (spore.userID == mySpore.userID && (spore.isCanColliseSelf == false || mySpore.isCanColliseSelf == false)) {
                                continue;
                            }
                            if (spore.weight != mySpore.weight) {
                                var hunterID;
                                var foodID;
                                if (spore.weight < mySpore.weight) {
                                    hunterID = mySpore.sporeID;
                                    foodID = spore.sporeID;
                                    spore.isChecked = true;
                                }
                                else {
                                    hunterID = spore.sporeID;
                                    foodID = mySpore.sporeID;
                                    mySpore.isChecked = true;
                                }
                                //发送玩家互吃
                                var data = new SendEatPlayer();
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
    };
    p.checkPaoPaoColloise = function () {
        var paopao;
        var myHero;
        var sporelist = this.playerM.getSporeListByUserID(this.myHero.userID);
        for (var i in this.paopaoList) {
            paopao = this.paopaoList[i];
            if (!paopao.isChecked) {
                for (var j in sporelist) {
                    myHero = sporelist[j];
                    if (Math.abs(paopao.x - myHero.x) < myHero.radius && Math.abs(paopao.y - myHero.y) < myHero.radius) {
                        if (myHero.userID == paopao.userID && paopao.isCanColliseSelf == false) {
                            continue;
                        }
                        paopao.isChecked = true;
                        var data = new SendEatPaoPao();
                        data.cmd = NetConst.EAT_PAO_PAO;
                        data.hunterid = myHero.sporeID;
                        data.paopaoid = paopao.ID;
                        ClientSocket.getInstance().send(data);
                        break;
                    }
                }
            }
        }
    };
    p.startGameTimer = function () {
        if (this.gameTimer == null) {
            this.gameTimer = new egret.Timer(1000);
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onGameTimerHandler = function () {
        var timeCount = this.gameTimer.currentCount;
        if (timeCount % 5 == 0) {
            this.gameScene.setRankLabel();
        }
        // if(timeCount%10 == 0){
        //this.changeCamera(); //每10秒设置一次camero
        // }
    };
    p.stopGameTimer = function () {
        if (this.gameTimer != null) {
            this.gameTimer.stop();
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onGameTimerHandler, this);
        }
    };
    p.deleteAllPlayer = function () {
        //销毁玩家
        var player;
        var playerList = this.playerM.playerList;
        var sporeList;
        for (var i in playerList) {
            sporeList = playerList[i];
            for (var j in sporeList) {
                player = sporeList[j];
                if (player != null) {
                    player.hide();
                    player = null;
                }
            }
        }
        this.playerM.deleteAll();
    };
    p.deleteAllRect = function () {
        for (var key in this.rectList) {
            var rect = this.rectList[key];
            delete this.rectList[key];
            rect.hide();
        }
    };
    p.resetGameData = function () {
        //隐藏手柄
        this.handleUI.hide();
        //重置状态
        if (UserManager.getInstance().userType == 0) {
            UserManager.getInstance().userID = 0;
        }
        this.bSendMoveing = false;
        //重置碰撞计数
        this.colloiseCount = 0;
        //重置舞台大小
        this.scaleX = 1;
        this.scaleY = 1;
    };
    p.sendPlayerMove = function (angle) {
        if (this.bSendMoveing) {
            return;
        }
        this.sendTime = egret.getTimer();
        this.bSendMoveing = true;
        var data = new SendMovePlayer();
        data.cmd = NetConst.MOVE_REQUEST;
        data.userid = UserManager.getInstance().userID;
        data.angle = angle;
        var myHero;
        var myHeroList = this.playerM.getSporeListByUserID(this.myHero.userID);
        for (var i in myHeroList) {
            myHero = myHeroList[i];
            data.sporelist.push([myHero.sporeID, myHero.x.toString(), myHero.y.toString()]);
        }
        ClientSocket.getInstance().send(data);
    };
    p.revMovePlayer = function (byteArray) {
        console.log("lag:" + (egret.getTimer() - this.sendTime));
        var data = new RevMovePlayer();
        data.readData(byteArray);
        var sporelist = data.sporelist;
        var localSporeList = this.playerM.getSporeListByUserID(data.userid);
        var sporeID;
        for (var i = 0; i < sporelist.length; i++) {
            sporeID = sporelist[i][0];
            if (localSporeList[sporeID]) {
                //TODO 每次校对位置，都会有些微差别，因为无对时包、时间戳，无法进行预测拉扯
                var player = localSporeList[sporeID];
                player.moveToByAngle(data.angle);
                var x = parseFloat(sporelist[i][1]) + player.xSpeed * 2; //假设延迟5帧
                var y = parseFloat(sporelist[i][2]) + player.ySpeed * 2;
                if (Math.abs(player.x - x) > 25 || Math.abs(player.y - y) > 25) {
                    console.log("拉扯:", player.x, player.y, x, y);
                    egret.Tween.removeTweens(player);
                    egret.Tween.get(player).to({ x: x }, 100);
                    egret.Tween.get(player).to({ y: y }, 100);
                }
            }
            else {
                console.log("error:" + sporeID + " player is null");
            }
        }
        this.bSendMoveing = false;
    };
    p.revAddPlayer = function (byteArray) {
        var data = new RevJoinPlayer();
        data.readData(byteArray);
        //判断新玩家是否是自己。
        console.log("新玩家加入:" + data.userid);
        if (data.userid != UserManager.getInstance().userID) {
            var player = new BaseSpore();
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
    };
    p.revEatRect = function (byteArray) {
        var data = new RevEatRect();
        data.readData(byteArray);
        var player = this.playerM.getPlayerBySporeID(data.hunterid);
        if (player != null) {
            var rectlist = data.rectlist;
            var len = rectlist.length;
            var rectID;
            var rect;
            for (var i = 0; i < len; i++) {
                rectID = rectlist[i];
                rect = this.rectList[rectID];
                rect.hide();
                delete this.rectList[rectID];
                player.eat(rect.weight);
                this.playerM.addWeightBySporeID(data.hunterid, rect.weight);
            }
            if (player.userID == this.myHero.userID) {
                this.gameScene.setWeightLabel(this.playerM.getWeightByUserID(this.myHero.userID));
            }
        }
    };
    p.revEatPlayer = function (byteArray) {
        var data = new RevEatPlayer();
        data.readData(byteArray);
        var hunter = this.playerM.getSporeBySporeID(data.hunterid);
        var food = this.playerM.getSporeBySporeID(data.foodid);
        if (hunter == null || food == null) {
            console.log("error: ear player is null");
            return;
        }
        hunter.eat(food.weight);
        food.die();
        this.playerM.addWeightBySporeID(data.hunterid, food.weight);
        this.playerM.reduceWeightBySporeID(data.foodid, food.weight);
        this.playerM.deleteSpore(data.foodid);
        //自己被吃掉
        if (food.userID == this.myHero.userID) {
            if (food.sporeID == this.myHero.sporeID) {
                this.myHero = this.playerM.getOneSporeByUserID(this.myHero.userID);
            }
            //所有自己的孢子都被吃掉了
            if (this.myHero == null) {
                this.deConfigListeners();
                this.beEatenUI.show();
                this.beEatenUI.setTitle(hunter.userName);
            }
            else {
                //分裂孢子数量减少后，缩放场景
                this.changeCamera();
            }
        }
    };
    p.revCreateNewRect = function (byteArray) {
        var data = new RevCreateRect();
        data.readData(byteArray);
        this.generationRect(data.rectnum, data.rectlist);
    };
    p.revUserLeave = function (byteArray) {
        var data = new RevPlayerLeave();
        data.readData(byteArray);
        var sporeList = this.playerM.getSporeListByUserID(data.userid);
        if (sporeList == null) {
            console.log("error:rev userleave player is null");
        }
        var player;
        for (var key in sporeList) {
            player = sporeList[key];
            player.hide();
        }
        this.playerM.deleteUser(data.userid);
    };
    p.sendTuPaoPao = function () {
        var myWeight = this.playerM.getWeightByUserID(this.myHero.userID);
        if (myWeight >= GameConst.tuPaoPaoWeightLimit) {
            var data = new SendTuPaoPao();
            data.cmd = NetConst.TU_PAO_PAO;
            data.userid = this.myHero.userID;
            ClientSocket.getInstance().send(data);
        }
    };
    p.revTuPaoPao = function (byteArray) {
        var data = new RevTuPaoPao();
        data.readData(byteArray);
        var localScopeList = this.playerM.getSporeListByUserID(data.userid);
        var paopaoList = data.paopaolist;
        var spore;
        var paopao;
        if (localScopeList == null) {
            console.log("error：rev tupaopao player is null");
            return;
        }
        for (var key in paopaoList) {
            spore = localScopeList[paopaoList[key][0]];
            if (spore.weight >= GameConst.tuPaoPaoWeightLimit) {
                paopao = spore.tuPaoPao();
                paopao.ID = data.paopaolist[key][1];
                this.paopaoList[paopao.ID] = paopao;
                this.playerM.reduceWeightBySporeID(spore.sporeID, GameConst.paopaoWeight);
            }
        }
        if (data.userid == this.myHero.userID) {
            this.gameScene.setWeightLabel(this.playerM.getWeightByUserID(this.myHero.userID));
        }
    };
    p.revEatPaoPao = function (byteArray) {
        var data = new RevEatPaoPao();
        data.readData(byteArray);
        var player = this.playerM.getSporeBySporeID(data.hunterid);
        var paopao = this.paopaoList[data.paopaoid];
        if (player == null) {
            console.log("error: revEatpaopao player is null");
        }
        player.eat(paopao.weight);
        paopao.hide();
        delete this.paopaoList[data.paopaoid];
        this.playerM.addWeightBySporeID(player.sporeID, paopao.weight);
        if (player.userID = this.myHero.userID) {
            this.gameScene.setWeightLabel(this.playerM.getWeightByUserID(this.myHero.userID));
        }
    };
    p.sendFenLie = function () {
        if (this.myHero.weight >= GameConst.fenlieLimit) {
            var sporeList = this.playerM.getSporeListByUserID(this.myHero.userID);
            //当前孢子数量小于一定数量时，才能分裂
            if (ArrayTool.getObjectLen(sporeList) <= GameConst.fenlieMax) {
                var data = new SendFenLie();
                data.cmd = NetConst.FEN_LIE;
                data.userid = this.myHero.userID;
                ClientSocket.getInstance().send(data);
            }
        }
    };
    p.revFenLie = function (byteArray) {
        var data = new RevFenLie();
        data.readData(byteArray);
        var sporeList = data.sporelist;
        var localSporeList = this.playerM.getSporeListByUserID(data.userid);
        var player;
        if (localSporeList == null) {
            console.log("error: revFenLie player is null");
        }
        for (var key in sporeList) {
            player = localSporeList[sporeList[key][0]];
            var newSpore = player.fenLie();
            newSpore.moveFrom(player.x, player.y, player.angle);
            newSpore.sporeID = sporeList[key][1];
            this.playerM.addPlayer(newSpore);
        }
        if (player.userID == this.myHero.userID) {
            this.changeCamera();
        }
    };
    return GameSprite;
})(egret.Sprite);
egret.registerClass(GameSprite,"GameSprite");
