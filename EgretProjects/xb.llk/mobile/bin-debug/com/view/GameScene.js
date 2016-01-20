/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.blockPool = ObjectPool.getPool(BlockUI.NAME, 10); //方块对象池
        this.boomPool = ObjectPool.getPool(BoomUI.NAME, 10); //炸弹对象池
        this.selectOld = new SelectUI(); //选择框动画，第一个对象
        this.selectNew = new SelectUI(); //选择框动画，第二个对象
        this.lineSuPool = ObjectPool.getPool(LineSu.NAME, 10); //连线
        this.lineZhePool = ObjectPool.getPool(LineZhe.NAME, 4);
        this.barStart = 0.15; //进度条scaleX
        this.barEnd = 1.45;
        this.blockNum = 0; //当前关卡方块数量
        this.blockData = new Array(); //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
        this.tempMap = new Array(); //临时地图，二维数组，存放本关的地图数据的拷贝
        this.blockArr = new Array(); //方块数组，二维数组，用于存放Block实例
        this.rowMax = 10; //地图最大行
        this.colMax = 9; //地图最大列
        this.blockWidth = 60; //方块宽
        this.blockHeight = 60; //方块高
        this.mapStartY = 0; //方块起始位置
        this.mapStartX = 0;
        //------------------[游戏变量]--------------------
        this.isSelect = false; //是否已经选择了一个方块
        this.curLevel = 1; //当前关卡，1-3
        this.cancelBlockNum = 0; //已消除方块
        this.totalBlock = 0; //总方块
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
        this.startGame();
    };
    p.onRemove = function () {
    };
    p.reset = function () {
        this.resetGame(); //重置方块、寻路等
        this.deConfigListener(); //清理监听
        this.hideResult(); //隐藏结果面板
        MapManager.getInstance().level.length = 0; //清理地图
    };
    p.startGame = function () {
        this.curLevel = 1;
        this.cancelBlockNum = 0;
        this.progressBar.scaleX = this.barStart;
        this.waitGroup.visible = false;
        this.totalBlock = MapManager.getInstance().getBlockNum();
        this.skillLabel0.text = "3";
        this.skillLabel1.text = "3";
        this.skillLabel2.text = "3";
        this.hideResult();
        this.createMap();
        this.configListener();
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
        this.minRoadPoint = 10000;
        this.route.length = 0;
        this.blockNum = 0;
        this.blockData.length = 0;
        this.tempMap = null;
        //隐藏组件
        this.selectOld.hide();
        this.selectNew.hide();
    };
    //游戏结束
    p.gameOver = function () {
        console.log("game over");
    };
    //下一关
    p.nextLevel = function () {
        this.curLevel++;
        this.resetGame();
        this.createMap();
        //无其他关卡
        if (MapManager.getInstance().level[this.curLevel - 1] == null) {
            this.waitGroup.visible = true;
            this.waitLabel.text = "您已完成游戏\n请等待其他玩家完成游戏";
        }
        this.configListener();
    };
    p.configListener = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.skillResetBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetTouch, this);
        this.skillIceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onIceTouch, this);
        this.skillTipBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTipTouch, this);
    };
    p.deConfigListener = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.skillResetBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onResetTouch, this);
        this.skillIceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onIceTouch, this);
        this.skillTipBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTipTouch, this);
    };
    //打乱对手
    p.onResetTouch = function () {
        this.sendUserPro("disturb");
    };
    //冰冻对手
    p.onIceTouch = function () {
        this.sendUserPro("ice");
    };
    //重排自己
    p.onTipTouch = function () {
        this.sendUserPro("find");
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏UI]----------------------
    ///////////////////////////////////////////////////
    p.initView = function () {
        this._stage = GameConst.stage;
        for (var i = 0; i < this.rowMax; i++) {
            this.blockArr.push(new Array());
        }
    };
    //显示结果
    p.showResult = function (data) {
        var rank = data.rank; //排名
        var spend = data.spend; //花费时间
        this.addChild(this.resultGroup);
        this.rankLabel.text = rank.toString();
        if (spend > 0) {
            var min = Math.floor(spend / 1000 / 60);
            var sec = Math.floor(spend / 1000 % 60);
            this.timeLabel.text = min + ":" + sec;
        }
        else {
            this.timeLabel.text = "0";
        }
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    //点击再斗一次按钮
    p.onAgainBtnTouch = function () {
        this.reset();
        LayerManager.getInstance().runScene(GameManager.getInstance().homeScene);
    };
    //隐藏结果
    p.hideResult = function () {
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
        this.resultGroup.parent && this.resultGroup.parent.removeChild(this.resultGroup);
    };
    ///////////////////////////////////////////////////
    ///-----------------[游戏逻辑]----------------------
    ///////////////////////////////////////////////////
    //创建地图
    p.createMap = function () {
        //引用原始地图的数据
        var mapData = MapManager.getInstance().level[this.curLevel - 1]; //关卡1-3，数组下标0-2
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
                    egret.Tween.get(block).to({ y: (this.mapStartY + i * (this.blockHeight)) }, 500);
                    index++;
                }
            }
        }
    };
    //点击方块
    p.onTouchTap = function (e) {
        if (e.target instanceof BlockUI) {
            //消除方块时，不能进行点击
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.checkBlock(e.target);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
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
            if (this.newTarget != this.oldTarget && this.newTarget.skinID == this.oldTarget.skinID) {
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
                    //发送消除信息
                    this.sendEliminate(this.oldTarget, this.newTarget);
                    //两方块的消失
                    this.oldTarget.hide();
                    this.newTarget.hide();
                    this.tempMap[this.oldTarget.row][this.oldTarget.col] = 0;
                    this.tempMap[this.newTarget.row][this.newTarget.col] = 0;
                    this.blockArr[this.oldTarget.row][this.oldTarget.col] = null;
                    this.blockArr[this.newTarget.row][this.newTarget.col] = null;
                    this.oldTarget = this.newTarget = null;
                    //声音
                    //得分
                    this.cancelBlockNum += 2;
                    // 当前长度 = 初始长度 + 已消除方块数/总方块数*(最长长度-初始长度)
                    this.progressBar.scaleX = this.barStart + this.cancelBlockNum / this.totalBlock * (this.barEnd - this.barStart);
                    //隐藏选择框
                    this.selectOld.hide();
                    this.selectNew.hide();
                    this.isSelect = false;
                    //检查游戏是否结束
                    if (this.checkGameOver()) {
                        this.nextLevel();
                        return;
                    }
                    //检查地图上是否有能相连的方块，如果没有，则重新排列
                    if (this.bangzhu() == false) {
                        console.log("重排前数组:", this.tempMap);
                        this.sortBlock();
                        this.sendUpMap();
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
            if (c1 == c2 && (obj3 == null || c2 == c3)) {
                var lineSu = this.lineSuPool.getObject();
                lineSu.rotation = 0;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
            }
            else if (r1 == r2 && (obj3 == null || r2 == r3)) {
                var lineSu = this.lineSuPool.getObject();
                lineSu.rotation = 90;
                lineSu.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineSu.y = r2 * this.blockHeight + this.blockHeight / 2;
                lineList.push(lineSu);
                this.blockGroup.addChild(lineSu);
            }
            else if (obj3) {
                var lineZhe = this.lineZhePool.getObject();
                lineZhe.x = c2 * this.blockWidth + this.blockWidth / 2;
                lineZhe.y = r2 * this.blockHeight + this.blockHeight / 2;
                this.blockGroup.addChild(lineZhe);
                lineList.push(lineZhe);
                if ((c1 == c2 && r2 > r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 < r2)) {
                    lineZhe.rotation = 0;
                }
                else if ((c1 == c2 && r2 < r1 && r2 == r3 && c3 > c2) || (r1 == r2 && c1 > c2 && c2 == c3 && r3 > r2)) {
                    lineZhe.rotation = 90;
                }
                else if ((r1 == r2 && c2 > c1 && c2 == c3 && r3 > r2) || (c1 == c2 && r1 > r2 && r2 == r3 && c3 < c2)) {
                    lineZhe.rotation = 180;
                }
                else {
                    lineZhe.rotation = 270;
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
    //点击重新排列
    p.sortBlock = function () {
        //获取现存的方块
        var tempBlockArr = new Array();
        var block;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                block = this.blockArr[i][j];
                if (block != null) {
                    tempBlockArr.push(block);
                }
            }
        }
        //打乱顺序
        ArrayTool.randomArr(tempBlockArr);
        //交换皮肤和tempMap
        var len = tempBlockArr.length / 2;
        var blockA;
        var blockB;
        for (var i = 0; i < len; i += 2) {
            blockA = tempBlockArr[i];
            blockB = tempBlockArr[i + 1];
            var temp = blockA.skinID;
            blockA.setSkin(blockB.skinID);
            blockB.setSkin(temp);
            temp = this.tempMap[blockA.row][blockA.col];
            this.tempMap[blockA.row][blockA.col] = this.tempMap[blockB.row][blockB.col];
            this.tempMap[blockB.row][blockB.col] = temp;
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
                                        this.minRoadPoint = 10000;
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
    //--------------------[发送]----------------------
    //发送弹幕
    p.sendBarrage = function (msg) {
        var json = { "msg": msg };
        this.socket.sendMessage(NetConst.C2S_barrage, json);
    };
    //发送地图
    p.sendUpMap = function () {
        egret.log("无可消除，发送重排");
        var json = { "mapData": this.tempMap };
        this.socket.sendMessage(NetConst.C2S_upMap, json);
    };
    //发送消除，pos是二维数组
    p.sendEliminate = function (blockA, blockB) {
        var json = { "pos": [[blockA.row, blockA.col], [blockB.row, blockB.col]] };
        this.socket.sendMessage(NetConst.C2S_eliminate, json);
    };
    //发送用户使用道具
    p.sendUserPro = function (type) {
        var json = { "type": type };
        egret.log("使用道具:" + type);
        this.socket.sendMessage(NetConst.C2S_usePro, json, this.CB_userPro, this);
        switch (type) {
            case "disturb":
                var num = parseInt(this.skillLabel0.text);
                num--;
                num = num > 0 ? num : 0;
                this.skillLabel0.text = num.toString();
                break;
            case "ice":
                var num = parseInt(this.skillLabel1.text);
                num--;
                num = num > 0 ? num : 0;
                this.skillLabel1.text = num.toString();
                break;
            case "find":
                var num = parseInt(this.skillLabel2.text);
                num--;
                num = num > 0 ? num : 0;
                this.skillLabel2.text = num.toString();
                break;
        }
    };
    //发送道具回调函数
    p.CB_userPro = function (data) {
        var bSuccess = data.bSuccess;
        var chance = data.chance;
        egret.log("使用道具回调:", bSuccess, chance);
    };
    //--------------------[接收]----------------------
    //游戏结束
    p.revGameOver = function (data) {
        var rank = data.rank; //前三名玩家ID
        egret.log("游戏结束，排名" + rank);
        this.showResult(data);
    };
    //玩家被使用道具
    p.revPro = function (data) {
        var type = data.type; //道具类型
        var mapData = data.mapData; //道具使用后影响的位置
        var time = data.time; //ice时间
        egret.log("被使用道具:", type, time);
        console.log("被使用道具:", mapData);
        switch (type) {
            case "disturb":
                this.deConfigListener();
                MapManager.getInstance().level[this.curLevel - 1] = mapData;
                this.resetGame();
                this.createMap();
                this.configListener();
                break;
            case "ice":
                this.deConfigListener();
                this.skillIce.visible = true;
                this.blockGroup.addChild(this.skillIce);
                var self = this;
                egret.Tween.removeTweens(this.skillIce);
                egret.Tween.get(this.skillIce).wait(time).call(function () {
                    self.skillIce.parent && self.skillIce.parent.removeChild(self.skillIce);
                    self.configListener();
                });
                break;
            case "find":
                this.tishi();
                break;
        }
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
