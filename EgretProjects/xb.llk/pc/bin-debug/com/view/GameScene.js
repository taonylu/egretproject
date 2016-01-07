/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        //---------------[游戏UI]-----------------
        this.blockPool = ObjectPool.getPool(BlockUI.NAME, 10); //方块对象池
        this.boomPool = ObjectPool.getPool(BoomUI.NAME, 10); //炸弹对象池
        this.selectOld = new SelectUI(); //选择框动画，第一个对象
        this.selectNew = new SelectUI(); //选择框动画，第二个对象
        this.blockTypeNum = 11; //方块的数量种类
        this.blockNum = 0; //当前关卡方块数量
        this.blockData = new Array(); //方块的类型数组，用于判断方块皮肤
        this.tempMap = new Array(); //临时地图，存放本关的地图数据的拷贝
        this.blockArr = new Array(); //方块数组，用于存放Block实例
        this.rowMax = 8; //地图最大行
        this.colMax = 7; //地图最大列
        this.blockWidth = 80; //方块宽
        this.blockHeight = 80; //方块高
        this.mapStartY = 0; //方块起始位置
        this.mapStartX = 0;
        //------------------[游戏变量]--------------------
        this.isSelect = false; //是否已经选择了一个方块
        this.score = 0; //得分
        this.curLevel = 1; //当前关卡
        //private gameTimer: egret.Timer;         //计时器
        //private timeLimit: number = 10;         //计时时间限制
        this.totalScore = 0; //总分
        //------------------[寻路数据]--------------------
        this.minRoadPoint = 10000; //路径数
        this.route = new Array(); //记录路径
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initView(); //初始化界面参数
        this.initLineSprite(); //初始化画线容器
    };
    p.onEnable = function () {
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.startGame = function () {
        this.createMap();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.resetGame = function () {
    };
    p.gameOver = function () {
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    p.initView = function () {
        this.socket = ClientSocket.getInstance();
        this._stage = GameConst.stage;
        //this.mapStartX = (this._stage.stageWidth - this.blockWidth * this.colMax) / 2;
    };
    p.initLineSprite = function () {
        //初始变量
        this.lineSprite = new egret.Sprite();
        this.lineSprite.x = this.mapStartX;
        this.lineSprite.y = this.mapStartY;
        this.lineSprite.width = this._stage.stageWidth;
        this.lineSprite.height = this._stage.stageHeight;
        this.lineSprite.touchChildren = false;
        this.lineSprite.touchEnabled = false;
        this.blockGroup.addChild(this.lineSprite);
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏逻辑]----------------------
    ///////////////////////////////////////////////////
    //创建地图
    p.createMap = function () {
        //引用原始地图的数据
        var mapData = MapManager.getInstance()["level" + this.curLevel];
        this.tempMap = ArrayTool.copy2DArr(mapData);
        //获得当前地图的方块数量
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.tempMap[i][j] > 0) {
                    this.blockNum++;
                }
            }
        }
        //根据方块数量创建编号
        this.initBlockData(this.blockNum);
        //创建方块
        var index = 0;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                if (this.tempMap[i][j] > 0) {
                    var block = this.blockPool.getObject();
                    block.setSkin(this.blockData[index]);
                    block.type = this.blockData[index];
                    block.row = i;
                    block.col = j;
                    block.name = i + "_" + j;
                    block.x = this.mapStartX + j * (this.blockWidth + 1);
                    block.y = this.mapStartY + i * (this.blockHeight + 1) - this._stage.stageHeight;
                    block.index = index;
                    this.blockGroup.addChild(block);
                    this.blockArr.push(block);
                    egret.Tween.get(block).to({ y: (this.mapStartY + i * (this.blockHeight + 1)) }, 500);
                    index++;
                }
            }
        }
    };
    //初始化方块数据
    p.initBlockData = function (blockNum) {
        //方块数量除以2只创建一半编号另一半是相同的。
        for (var i = 0; i < blockNum / 2; i++) {
            var date = NumberTool.getRandomInt(1, this.blockTypeNum); //1-方块总数
            this.blockData.push(date, date);
        }
        //随机排序数组
        ArrayTool.randomArr(this.blockData);
    };
    //点击方块
    p.onTouchTap = function (e) {
        if (e.target instanceof BlockUI) {
            this.checkBlock(e.target);
        }
    };
    //检查方块是否相连
    p.checkBlock = function (block) {
        if (this.isSelect) {
            //记录老对象
            this.oldTarget = this.newTarget;
            this.selectOld.play(this.oldTarget);
        }
        //记录新对象;
        this.newTarget = block;
        this.selectNew.play(this.newTarget);
        if (this.isSelect) {
            //两次点击不是同一个方块，且他们是同一类型的图片便可开始扫描是否通路
            if (this.newTarget != this.oldTarget && this.newTarget.type == this.oldTarget.type) {
                //通路检查
                if (this.checkRoad(this.oldTarget, this.newTarget)) {
                    //画线
                    this.linkRoad();
                    //爆炸效果
                    var boom1 = this.boomPool.getObject();
                    var boom2 = this.boomPool.getObject();
                    this.addChild(boom1);
                    this.addChild(boom2);
                    boom1.play(this.newTarget);
                    boom2.play(this.oldTarget);
                    //两方块的消失
                    this.oldTarget.hide();
                    this.newTarget.hide();
                    this.tempMap[this.oldTarget.row][this.oldTarget.col] = 0;
                    this.tempMap[this.newTarget.row][this.newTarget.col] = 0;
                    this.blockArr[this.oldTarget.index] = null;
                    this.blockArr[this.newTarget.index] = null;
                    this.oldTarget = this.newTarget = null;
                    //声音
                    //得分
                    //this.setScoreText(this.score += 20);
                    //隐藏选择框
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;
                    //检查游戏是否结束
                    if (this.checkGameOver()) {
                        this.nextLevel();
                    }
                    return;
                }
                else {
                    this.oldTarget = null;
                    this.newTarget = null;
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;
                    return;
                }
            }
            else {
                this.selectOld.hide();
                var temp = this.selectOld;
                this.selectOld = this.selectNew;
                this.selectNew = temp;
                return;
            }
        }
        this.isSelect = true;
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
                this.route.push({ x: c1, y: r1 }, { x: c2, y: r2 });
                return true;
            }
            //同一行两折点扫描
            for (var i = 0; i < this.rowMax; i++) {
                //两者上或下同时为0垂直扫描3条线
                if (this.tempMap[i][c1] == 0 && this.tempMap[i][c2] == 0) {
                    if (this.lineCheck(r1, c1, i, c1) && this.lineCheck(i, c1, i, c2) && this.lineCheck(i, c2, r2, c2)) {
                        //route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
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
                this.route.push({ x: c1, y: r1 }, { x: c2, y: r2 });
                return true;
            }
            //同一列两折点扫描
            for (i = 0; i < this.colMax; i++) {
                //两者前或后同时为0横向扫描3条线
                if (this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if (this.lineCheck(r1, c1, r1, i) && this.lineCheck(r1, i, r2, i) && this.lineCheck(r2, i, r2, c2)) {
                        //route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
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
                    this.route.push({ x: c1, y: r1 }, { x: c1, y: r2 }, { x: c2, y: r2 });
                    return true;
                }
            }
            //第一个对象那一行第二个对象那一列拐角扫描
            if (this.tempMap[r1][c2] == 0) {
                if (this.lineCheck(r1, c1, r1, c2) && this.lineCheck(r2, c2, r1, c2)) {
                    //一折拐角没有最短路径直接传给数组不需要计算
                    this.route.push({ x: c1, y: r1 }, { x: c2, y: r1 }, { x: c2, y: r2 });
                    return true;
                }
            }
            //两折点综合扫描
            //横向扫描
            for (i = 0; i < this.colMax; i++) {
                //两者前或后同时为0横向扫描3条线
                if (this.tempMap[r1][i] == 0 && this.tempMap[r2][i] == 0) {
                    if (this.lineCheck(r1, c1, r1, i) && this.lineCheck(r1, i, r2, i) && this.lineCheck(r2, i, r2, c2)) {
                        //route.push({x:c1,y:r1},{x:i,y:r1},{x:i,y:r2},{x:c2,y:r2});
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
                        //route.push({x:c1,y:r1},{x:c1,y:i},{x:c2,y:i},{x:c2,y:r2});
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
    //画线函数
    p.linkRoad = function () {
        this.lineSprite.graphics.lineStyle(5, 0xff0000);
        //挨个对比
        var len = this.route.length - 1;
        for (var i = 0; i < len; i++) {
            //每次取出前两个
            var obj1 = this.route[i];
            var obj2 = this.route[i + 1];
            var x1 = obj1["x"] * this.blockWidth + this.blockWidth / 2;
            var y1 = obj1["y"] * this.blockHeight + this.blockHeight / 2;
            var x2 = obj2["x"] * this.blockWidth + this.blockWidth / 2;
            var y2 = obj2["y"] * this.blockHeight + this.blockHeight / 2;
            this.lineSprite.graphics.moveTo(x1, y1);
            this.lineSprite.graphics.lineTo(x2, y2);
        }
        //画完线清空路径数组
        this.lineSprite.graphics.endFill();
        this.route.length = 0;
        this.minRoadPoint = 10000;
        var self = this;
        setTimeout(function () {
            self.lineSprite.graphics.clear();
        }, 300);
    };
    //计算出最短的线路
    p.theShortest = function (r1, c1, r2, c2, r3, c3, r4, c4) {
        //越靠近下或右的值越大，越大的值只要不超过自身取绝对值越小
        var count = 0;
        count = Math.abs(r2 - r1) + Math.abs(r3 - r2) + Math.abs(r4 - r3) + Math.abs(c2 - c1) + Math.abs(c3 - c2) + Math.abs(c4 - c3);
        //当前数小于上一次的数就把当前的值赋给路径数组,如果大于就不去管它了我们只需要最短路径点即可。
        if (count <= this.minRoadPoint) {
            this.route[0] = { x: c1, y: r1 };
            this.route[1] = { x: c2, y: r2 };
            this.route[2] = { x: c3, y: r3 };
            this.route[3] = { x: c4, y: r4 };
            //上一次的数等于当前的数以便下一次计算
            this.minRoadPoint = count;
        }
    };
    //点击重新排列
    p.sortBlock = function () {
        //打乱编号
        ArrayTool.randomArr(this.blockData);
        var index = 0;
        var len = this.blockArr.length;
        var block;
        //挨个检查没消除的方块进行洗牌
        for (var i = 0; i < len; i++) {
            block = this.blockArr[i];
            if (block != null) {
                block.setSkin(this.blockData[block.index]);
                block.type = this.blockData[block.index];
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
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //发送消除，pos是二维数组
    p.sendEliminate = function (pos) {
        this.socket.sendMessage(NetConst.eliminate, pos);
    };
    //发送用户使用道具
    p.sendUserPro = function (type) {
        this.socket.sendMessage(NetConst.userPro, type);
    };
    //发送完成一关
    p.sendLevelDone = function (isFinish, mapData) {
        this.socket.sendMessage(NetConst.levelDone, { isFinish: isFinish, mapData: mapData });
    };
    //玩家消除动作(大屏选中用户)
    p.revEliminate = function (data) {
        var id = data.id; //用户id
        var pos = data.pos; //消除的位置
    };
    //使用道具(大屏幕)
    p.revPro = function (data) {
        var type = data.type; //道具类型
        var mapData = data.mapData; //道具使用后影响的位置
    };
    //使用道具(用户)
    p.revUserPro = function (data) {
        var status = data.status; //是否使用成功 1 0
        var change = data.data.change; // 该道具剩余次数
    };
    //幸运用户的地图因为没有可以消除的，系统自动更换
    p.revLuckyMap = function (data) {
        var mapData = data.mapdata; //地图数据
    };
    //游戏结束
    p.revGameOver = function (data) {
        if (egret.Capabilities.isMobile) {
            var rank = data.rank; //自己的排名
        }
        else {
            var winners = data.winners; //前三名玩家ID
        }
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
