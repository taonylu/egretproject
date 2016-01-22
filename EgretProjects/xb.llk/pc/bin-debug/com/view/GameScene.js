/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        //=============[声音]=============
        this.snd = SoundManager.getInstance();
        //---------------[游戏UI]-----------------
        this.blockPool = ObjectPool.getPool(BlockUI.NAME, 10); //方块对象池
        this.boomPool = ObjectPool.getPool(Boom.NAME, 10); //炸弹对象池
        this.selectOld = new SelectUI(); //选择框动画，第一个对象
        this.selectNew = new SelectUI(); //选择框动画，第二个对象
        this.gameHeadUIList = new Array(); //进度头像列表
        this.lineSuPool = ObjectPool.getPool(LineSu.NAME, 10); //连线
        this.lineZhePool = ObjectPool.getPool(LineZhe.NAME, 4);
        this.skillUIList = new Array(); //道具面板列表
        this.skillCount = 0; //技能使用次数，用于显示技能面板
        this.nameLabelList = new Array(); //结果面板昵称文本数组
        this.resultHeadList = new Array(); //结果头像Group数组
        this.resultTimeList = new Array(); //结果时间文本
        this.blockNum = 0; //当前关卡方块数量
        this.blockData = new Array(); //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
        this.tempMap = new Array(); //临时地图，二维数组，存放本关的地图数据的拷贝
        this.blockArr = new Array(); //方块数组，二维数组，用于存放Block实例
        this.rowMax = 10; //地图最大行
        this.colMax = 9; //地图最大列
        this.blockWidth = 80; //方块宽
        this.blockHeight = 80; //方块高
        this.mapStartY = 0; //方块起始位置
        this.mapStartX = 0;
        //------------------[游戏变量]--------------------
        this.isSelect = false; //是否已经选择了一个方块
        this.score = 0; //得分
        this.curLevel = 1; //当前关卡
        this.totalScore = 0; //总分
        this.userMax = 8; //用户最大数量
        this.blockTotal = 0; //3个关卡所有方块总数
        //------------------[寻路数据]--------------------
        this.minRoadPoint = 10000; //路径数
        this.route = new Array(); //记录路径
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView();
    };
    p.onEnable = function () {
        this.snd.playBgm(this.snd.gameBgm);
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.reset = function () {
    };
    p.startGame = function () {
        //初始化
        this.curLevel = 1;
        this.skillCount = 0;
        this.blockTotal = MapManager.getInstance().getBlockNum();
        this.hideResutl();
        this.initGameHead();
        this.createMap();
        this.setLuckyInfo();
    };
    p.resetGame = function () {
        //清理剩余方块
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.blockArr[i][j] != null) {
                    this.blockArr[i][j].hideImmediately();
                }
            }
            this.blockArr[i].length = 0;
        }
        //重置参数
        this.isSelect = false;
        this.oldTarget = null;
        this.newTarget = null;
        this.blockNum = 0;
        this.blockData.length = 0;
        this.tempMap = null;
        //隐藏组件
        this.selectOld.hide();
        this.selectNew.hide();
    };
    p.gameOver = function () {
        console.log("game over");
    };
    //下一关
    p.nextLevel = function () {
        this.curLevel++;
        this.resetGame();
        this.createMap();
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    p.initView = function () {
        this._stage = GameConst.stage;
        //方块
        for (var i = 0; i < this.rowMax; i++) {
            this.blockArr.push(new Array());
        }
        //技能显示面板
        for (var i = 0; i < 4; i++) {
            this.skillUIList.push(this["skillUI" + i]);
        }
        //进度头像
        for (var i = 0; i < this.userMax; i++) {
            this.gameHeadUIList.push(new GameHeadUI());
        }
        for (var i = 0; i < this.userMax; i++) {
            this.nameLabelList.push(this["nameLabel" + i]);
            this.resultHeadList.push(this["resultHead" + i]);
            this.resultTimeList.push(this["resultTimeLabel" + i]);
        }
    };
    //初始化用户进度头像
    p.initGameHead = function () {
        var userList = UserManager.getInstance().userList;
        var index = 0; //游戏进度头像计数
        var userVO; //用户信息
        var gameHeadUI; //游戏进度头像
        for (var key in userList) {
            userVO = userList[key];
            gameHeadUI = this.gameHeadUIList[index];
            gameHeadUI.x = 0;
            index++;
            gameHeadUI.setHeadBmd(userVO.headBmd);
            userVO.gameHeadUI = gameHeadUI;
            this.headGroup.addChild(gameHeadUI);
        }
    };
    //玩家消除一次，则游戏进度头像移动
    p.moveGameHead = function (uid) {
        var userVO = UserManager.getInstance().userList[uid];
        if (userVO) {
            var gameHeadUI = userVO.gameHeadUI;
            // 头像y / 进度条总长 = 消除方块数/总方块数
            gameHeadUI.x = userVO.cancelBloukNum / this.blockTotal * this.headGroup.width;
        }
    };
    //游戏结束，显示结果
    p.showResult = function (data) {
        this.skillGroup.visible = false;
        this.skillIntroGroup.visible = false;
        this.gameOverBg.visible = true;
        this.gameOverText.visible = true;
        this.resultGroup.visible = true;
        //显示排名
        for (var i = 0; i < this.userMax; i++) {
            this.nameLabelList[i].text = "";
            this.resultTimeList[i].text = "";
            if (data.winners[i] != null) {
                var uid = data.winners[i].uid;
                var spend = data.winners[i].spend;
                var userVO = UserManager.getInstance().getUser(uid);
                if (userVO) {
                    this.nameLabelList[i].text = userVO.name;
                    var bm = new egret.Bitmap(userVO.headBmd);
                    bm.width = 65;
                    bm.height = 65;
                    this.resultHeadList[i].addChild(bm);
                    if (spend > 0) {
                        var min = Math.floor(spend / 1000 / 60);
                        var sec = Math.floor(spend / 1000 % 60);
                        this.resultTimeList[i].text = NumberTool.getTimeString(min) + ":" + NumberTool.getTimeString(sec);
                    }
                    else {
                        this.resultTimeList[i].text = "未完成";
                    }
                }
            }
        }
    };
    //隐藏游戏结束
    p.hideResutl = function () {
        this.skillGroup.visible = true;
        this.skillIntroGroup.visible = true;
        this.gameOverBg.visible = false;
        this.gameOverText.visible = false;
        this.resultGroup.visible = false;
        //删除头像
        for (var i = 0; i < this.userMax; i++) {
            if (this.resultHeadList[i].numChildren > 0) {
                var headImg = this.resultHeadList[i].getChildAt(0);
                headImg && headImg.parent && headImg.parent.removeChild(headImg);
            }
        }
    };
    //设置幸运玩家
    p.setLuckyInfo = function () {
        this.luckyGroup.visible = false;
        if (this.luckyHeadGroup.numChildren > 0) {
            var headBm = this.luckyHeadGroup.getChildAt(0);
            headBm && headBm.parent && headBm.parent.removeChild(headBm);
        }
        this.luckNameLabel.text = "";
        var userM = UserManager.getInstance();
        var userVO = userM.getUser(userM.luckyUser);
        if (userVO) {
            this.luckyGroup.visible = true;
            var bm = new egret.Bitmap(userVO.headBmd);
            bm.width = 55;
            bm.height = 55;
            this.luckyHeadGroup.addChild(bm);
            this.luckNameLabel.text = userVO.name;
        }
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏逻辑]----------------------
    ///////////////////////////////////////////////////
    //创建地图
    p.createMap = function () {
        //引用原始地图的数据
        var mapData = MapManager.getInstance().level[this.curLevel - 1]; //关卡1-3 ，数组下标0-2
        if (mapData == null) {
            return;
        }
        this.tempMap = ArrayTool.copy2DArr(mapData);
        //创建方块
        var index = 0; //已经生成的方块数
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.tempMap[i][j] > 0) {
                    var block = this.blockPool.getObject();
                    block.setSkin(this.tempMap[i][j]);
                    block.row = i;
                    block.col = j;
                    block.x = this.mapStartX + j * (this.blockWidth);
                    block.y = this.mapStartY + i * (this.blockHeight) - this._stage.stageHeight;
                    this.blockGroup.addChild(block);
                    this.blockArr[block.row][block.col] = block;
                    egret.Tween.get(block).to({ y: (this.mapStartY + i * this.blockHeight) }, 500);
                    index++;
                }
            }
        }
    };
    //直线、一折、二折、综合检查函数
    p.checkRoad = function (oldTarget, newTarget) {
        var r1 = oldTarget.row;
        var c1 = oldTarget.col;
        var r2 = newTarget.row;
        var c2 = newTarget.col;
        var result = false;
        //两者处于同一行
        if (r1 == r2) {
            //直线扫描
            if (this.lineCheck(r1, c1, r2, c2)) {
                //直线是最短路径不需要计算直接传给路径数组
                this.saveLinePath(r1, c1, r2, c2);
                return true;
            }
            //同一行两折点扫描
            for (var i = 0; i < this.rowMax; i++) {
                //两者上或下同时为0垂直扫描3条线
                if (this.tempMap[i][c1] == 0 && this.tempMap[i][c2] == 0) {
                    if (this.lineCheck(r1, c1, i, c1) && this.lineCheck(i, c1, i, c2) && this.lineCheck(i, c2, r2, c2)) {
                        //this.route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1, c1, i, c1, i, c2, r2, c2);
                        result = true;
                    }
                }
            }
        }
        else if (c1 == c2) {
            //两者处于同一列
            if (this.lineCheck(r1, c1, r2, c2)) {
                //直线是最短路径不需要计算直接传给路径数组
                //this.route.push({ x: c1,y: r1 },{ x: c2,y: r2 });
                this.saveLinePath(r1, c1, r2, c2);
                return true;
            }
            //同一列两折点扫描
            for (i = 0; i < this.colMax; i++) {
                //两者前或后同时为0横向扫描3条线
                if (this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if (this.lineCheck(r1, c1, r1, i) && this.lineCheck(r1, i, r2, i) && this.lineCheck(r2, i, r2, c2)) {
                        //this.route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1, c1, r1, i, r2, i, r2, c2);
                        result = true;
                    }
                }
            }
        }
        else {
            //不在同一行也不在同一列拐角处必须为0
            //第二个对象那一行第一个对象那一列拐角扫描
            if (this.tempMap[r2][c1] == 0) {
                if (this.lineCheck(r1, c1, r2, c1) && this.lineCheck(r2, c1, r2, c2)) {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    //this.route.push({ x: c1,y: r1 },{ x: c1,y: r2 },{ x: c2,y: r2 });
                    this.saveLinePath(r1, c1, r2, c1);
                    this.route.pop();
                    this.saveLinePath(r2, c1, r2, c2);
                    return true;
                }
            }
            //第一个对象那一行第二个对象那一列拐角扫描
            if (this.tempMap[r1][c2] == 0) {
                if (this.lineCheck(r1, c1, r1, c2) && this.lineCheck(r2, c2, r1, c2)) {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    //this.route.push({ x: c1,y: r1 },{ x: c2,y: r1 },{ x: c2,y: r2 });
                    this.saveLinePath(r1, c1, r1, c2);
                    this.route.pop();
                    this.saveLinePath(r1, c2, r2, c2);
                    return true;
                }
            }
            //两折点综合扫描
            //横向扫描
            for (i = 0; i < this.colMax; i++) {
                //两者前或后同时为0横向扫描3条线
                if (this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if (this.lineCheck(r1, c1, r1, i) && this.lineCheck(r1, i, r2, i) && this.lineCheck(r2, i, r2, c2)) {
                        //this.route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1, c1, r1, i, r2, i, r2, c2);
                        result = true;
                    }
                }
            }
            //垂直扫描
            for (i = 0; i < this.rowMax; i++) {
                //两者上或下同时为0垂直扫描3条线
                if (this.tempMap[i][c1] == 0 && this.tempMap[i][c2] == 0) {
                    if (this.lineCheck(r1, c1, i, c1) && this.lineCheck(i, c1, i, c2) && this.lineCheck(i, c2, r2, c2)) {
                        //this.route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
                        //两折点需要计算出最短路径
                        this.theShortest(r1, c1, i, c1, i, c2, r2, c2);
                        result = true;
                    }
                }
            }
        }
        return result;
    };
    //直线检查函数
    p.lineCheck = function (r1, c1, r2, c2) {
        //两者处于同一行
        if (r1 == r2) {
            //前者大于后者就交换位置
            if (c1 > c2) {
                var t = c1;
                c1 = c2;
                c2 = t;
            }
            //两者相邻就直接消除
            if (c1 + 1 == c2) {
                return true;
            }
            //不相邻就搜索两者之间是否通路不对自身进行搜索
            for (var i = c1 + 1; i < c2; i++) {
                if (this.tempMap[r1][i] > 0) {
                    return false;
                }
            }
            return true;
        }
        else if (c1 == c2) {
            //两者处于同一列
            //前者大于后者就交换位置
            if (r1 > r2) {
                t = r1;
                r1 = r2;
                r2 = t;
            }
            //两者相邻就直接消除
            if (r1 + 1 == r2) {
                return true;
            }
            //不相邻就搜索两者之间是否通路不对自身进行搜索
            for (i = r1 + 1; i < r2; i++) {
                if (this.tempMap[i][c1] > 0) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    //保存直线数组数组
    p.saveLinePath = function (r1, c1, r2, c2) {
        if (r1 == r2) {
            if (c1 > c2) {
                for (var i = c1; i >= c2; i--) {
                    this.route.push({ x: i, y: r1 });
                }
            }
            else {
                for (var i = c1; i <= c2; i++) {
                    this.route.push({ x: i, y: r1 });
                }
            }
        }
        else if (c1 == c2) {
            if (r1 > r2) {
                for (var i = r1; i >= r2; i--) {
                    this.route.push({ x: c1, y: i });
                }
            }
            else {
                for (var i = r1; i <= r2; i++) {
                    this.route.push({ x: c1, y: i });
                }
            }
        }
    };
    //画线函数
    p.linkRoad = function () {
        //挨个对比
        var len = this.route.length - 1; //倒数第1个不需要判断
        var lineList = new Array();
        for (var i = 0; i < len; i++) {
            //每次取出前两个
            var obj1 = this.route[i];
            var obj2 = this.route[i + 1];
            if (i + 2 <= len) {
                var obj3 = this.route[i + 2];
                var c3 = obj3["x"];
                var r3 = obj3["y"];
            }
            if (i + 1 == len) {
                break;
            }
            var c1 = obj1["x"];
            var r1 = obj1["y"];
            var c2 = obj2["x"];
            var r2 = obj2["y"];
            console.log(r1, c1, r2, c2);
            if (c1 == c2 && (obj3 == null || c2 == c3)) {
                var lineSu = this.lineSuPool.getObject();
                lineSu.rotation = 0;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
                console.log("同列");
            }
            else if (r1 == r2 && (obj3 == null || r2 == r3)) {
                var lineSu = this.lineSuPool.getObject();
                lineSu.rotation = 90;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
                console.log("同行");
            }
            else if (obj3) {
                var lineZhe = this.lineZhePool.getObject();
                lineZhe.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineZhe.y = r2 * this.blockHeight + this.blockHeight / 2;
                this.blockGroup.addChild(lineZhe);
                lineList.push(lineZhe);
                if ((c1 == c2 && r2 > r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 < r2)) {
                    lineZhe.rotation = 0;
                    console.log("L");
                }
                else if ((c1 == c2 && r2 < r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 > r2)) {
                    lineZhe.rotation = 90;
                    console.log("|-");
                }
                else if ((r1 == r2 && c2 > c1 && c2 == c3 && r3 > r2) || (c1 == c2 && r1 > r2 && r2 == r3 && c3 < c2)) {
                    lineZhe.rotation = 180;
                    console.log("-|");
                }
                else {
                    lineZhe.rotation = 270;
                    console.log("_|");
                }
            }
        }
        //画完线清空路径数组
        this.route.length = 0;
        this.minRoadPoint = 10000;
        var len = lineList.length;
        for (var i = 0; i < len; i++) {
            lineList[i].recycle();
        }
    };
    //计算出最短的线路
    p.theShortest = function (r1, c1, r2, c2, r3, c3, r4, c4) {
        //越靠近下或右的值越大，越大的值只要不超过自身取绝对值越小
        var count = 0;
        count = Math.abs(r2 - r1) + Math.abs(r3 - r2) + Math.abs(r4 - r3) + Math.abs(c2 - c1) + Math.abs(c3 - c2) + Math.abs(c4 - c3);
        //当前数小于上一次的数就把当前的值赋给路径数组,如果大于就不去管它了我们只需要最短路径点即可。
        if (count <= this.minRoadPoint) {
            //            this.route[0] = { x: c1,y: r1 };
            //            this.route[1] = { x: c2,y: r2 };
            //            this.route[2] = { x: c3,y: r3 };
            //            this.route[3] = { x: c4,y: r4 };
            this.route.length = 0;
            this.saveLinePath(r1, c1, r2, c2);
            this.route.pop();
            this.saveLinePath(r2, c2, r3, c3);
            this.route.pop();
            this.saveLinePath(r3, c3, r4, c4);
            //上一次的数等于当前的数以便下一次计算
            this.minRoadPoint = count;
        }
    };
    //删除指定两个方块
    p.cancelBlock = function (blockA, blockB) {
        if (this.checkRoad(blockA, blockB)) {
            //画线
            this.linkRoad();
            //爆炸效果
            var boom1 = this.boomPool.getObject();
            var boom2 = this.boomPool.getObject();
            boom1.playAnim(blockA);
            boom2.playAnim(blockB);
            //两方块的消失
            blockA.hide();
            blockB.hide();
            this.tempMap[blockA.row][blockA.col] = 0;
            this.tempMap[blockB.row][blockB.col] = 0;
            this.blockArr[blockA.row][blockA.col] = null;
            this.blockArr[blockB.row][blockB.col] = null;
            //检查游戏是否结束
            if (this.checkGameOver()) {
                this.nextLevel();
            }
        }
    };
    //检查方块是否消除完毕
    p.checkGameOver = function () {
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.tempMap[i][j] > 0) {
                    return false;
                }
            }
        }
        return true;
    };
    //点击提示
    p.tishi = function () {
        this.oldTarget && this.selectOld.hide();
        this.newTarget && this.selectNew.hide();
        this.oldTarget = null;
        this.newTarget = null;
        this.isSelect = false;
        if (this.bangzhu()) {
            egret.log("提示方块:", this.oldTarget.row, this.oldTarget.col, this.newTarget.row, this.newTarget.col);
            this.selectOld.play(this.oldTarget);
            this.selectNew.play(this.newTarget);
        }
    };
    //帮助找到两个通路的方块
    p.bangzhu = function () {
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.tempMap[i][j] > 0) {
                    //每一个方块遍历每一个元素
                    for (var m = i; m < this.rowMax; m++) {
                        var n;
                        if (m == i) {
                            n = j + 1;
                        }
                        else {
                            n = 0;
                        }
                        for (; n < this.colMax; n++) {
                            if (this.tempMap[m][n] > 0) {
                                var obj1 = this.blockArr[i][j];
                                var obj2 = this.blockArr[m][n];
                                //检查两者是否通路
                                if (obj1.skinID == obj2.skinID) {
                                    if (this.checkRoad(obj1, obj2)) {
                                        //只提示两个方块不记录线路
                                        this.route.length = 0;
                                        this.oldTarget = obj1;
                                        this.newTarget = obj2;
                                        return true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //玩家消除动作
    p.revEliminate = function (data) {
        var uid = data.uid; //用户id
        var pos = data.pos; //消除的位置
        egret.log("玩家消除方块:", uid, pos);
        //计算用户消除和头像移动
        UserManager.getInstance().userList[uid].cancelBloukNum += 2; //一次消除2个方块
        this.moveGameHead(uid);
        //大屏用户消除
        if (uid == UserManager.getInstance().luckyUser) {
            var blockA = this.blockArr[pos[0][0]][pos[0][1]];
            var blockB = this.blockArr[pos[1][0]][pos[1][1]];
            if (blockA && blockB) {
                //播放声音
                this.snd.play(this.snd.line);
                this.cancelBlock(blockA, blockB);
            }
        }
    };
    //使用道具(大屏幕)
    p.revPro = function (data) {
        var from = data.from; //施放道具的玩家uid
        var to = data.to; //被施放道具的玩家uid
        var type = data.type; //道具类型
        var mapData = data.mapData; //道具使用后影响的位置
        var time = data.time; //冰冻时间
        egret.log("使用道具:" + from, to, type, mapData, time);
        egret.log("是否大屏幕:", UserManager.getInstance().luckyUser == to);
        //道具效果
        var toolName = "";
        switch (type) {
            case "disturb":
                toolName = "打乱";
                if (UserManager.getInstance().luckyUser == to) {
                    MapManager.getInstance().level[this.curLevel - 1] = mapData;
                    this.resetGame();
                    this.createMap();
                }
                break;
            case "ice":
                toolName = "冻结";
                if (UserManager.getInstance().luckyUser == to) {
                    this.skillIce.visible = true;
                    var self = this;
                    egret.Tween.removeTweens(this.skillIce);
                    egret.Tween.get(this.skillIce).wait(time).call(function () {
                        self.skillIce.visible = false;
                    });
                }
                break;
            case "find":
                toolName = "提示";
                if (UserManager.getInstance().luckyUser == to) {
                    this.tishi();
                }
                break;
        }
        //大屏幕显示道具信息
        if (toolName != "" && UserManager.getInstance().getUser(from).headBmd && UserManager.getInstance().getUser(to).headBmd) {
            var img0 = new egret.Bitmap(UserManager.getInstance().getUser(from).headBmd);
            var img1 = new egret.Bitmap(UserManager.getInstance().getUser(to).headBmd);
            var index = this.skillCount % 4;
            this.skillUIList[index].setSkill(img0, img1, toolName);
            this.skillCount++;
        }
    };
    //幸运用户的地图因为没有可以消除的，系统自动更换
    p.revLuckyMap = function (data) {
        var mapData = data.mapData; //地图数据
        //重置地图
        MapManager.getInstance().level[this.curLevel - 1] = mapData;
        this.resetGame();
        this.createMap();
    };
    //游戏结束
    p.revGameOver = function (data) {
        var winners = data.winners; //前三名玩家ID
        var rankLast = data.rankLast; //结果页面显示时间
        egret.log("游戏结束");
        //播放声音
        this.snd.play(this.snd.gameOver);
        //TODO 返回首页?还是在游戏界面进行某些显示？
        this.showResult(data);
        var self = this;
        egret.Tween.get(this).wait(rankLast).call(function () {
            self.resetGame();
            UserManager.getInstance().clear();
            LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
        }, this);
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
