/**
*  文 件 名：GameSprite.ts
*  功    能：游戏原生界面
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
var GameSprite = (function (_super) {
    __extends(GameSprite, _super);
    function GameSprite() {
        _super.call(this);
        this.blockTypeNum = 45; //方块的数量种类
        this.blockNum = 0; //当前关卡方块数量
        this.blockData = new Array(); //方块的类型数组，用于判断方块皮肤
        this.tempMap = new Array(); //临时地图，存放本关的地图数据
        this.blockArr = new Array(); //方块数组，用于存放Block实例
        this.isSelect = false; //是否已经选择了一个方块
        this.minRoadPoint = 10000; //路径数
        this.route = new Array(); //记录路径
        this.level = 1; //关数
        this.blockPool = ObjectPool.getPool(Block.NAME, 80); //方块对象池
        this.boomPool = ObjectPool.getPool(Boom.NAME, 2); //爆炸对象池
        this.lightningPool = ObjectPool.getPool(Lightning.NAME, 10); //闪电对象池
    }
    var __egretProto__ = GameSprite.prototype;
    //初始化
    __egretProto__.init = function () {
        switch (this.level) {
            case 1:
                this.tempMap = ArrayTool.copy2DArr(MapData.map1);
                break;
        }
        for (var i = 0; i < MapData.rows; i++) {
            for (var j = 0; j < MapData.cols; j++) {
                if (this.tempMap[i][j] > 0) {
                    this.blockNum++;
                }
            }
        }
        //根据方块数量创建编号
        this.initBlockData(this.blockNum);
        //地图有了、方块数量有了、方块编号有了,接下来创建方块;
        var index = 0;
        for (var i = 0; i < MapData.rows; i++) {
            for (var j = 0; j < MapData.cols; j++) {
                if (this.tempMap[i][j] > 0) {
                    var block = this.blockPool.getObject();
                    block.setSkin(this.blockData[index]);
                    block.type = this.blockData[index];
                    block.row = i;
                    block.col = j;
                    block.name = i + "_" + j;
                    block.x = j * (Block.cellWidth + 1);
                    block.y = i * (Block.cellWidth + 1);
                    block.index = index;
                    this.addChild(block);
                    this.blockArr.push(block);
                    index++;
                }
            }
        }
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    //初始化方块数据
    __egretProto__.initBlockData = function (blockNum) {
        for (var i = 0; i < blockNum / 2; i++) {
            var date = Math.ceil(Math.random() * this.blockTypeNum);
            this.blockData.push(date, date);
        }
        //随机排序数组
        ArrayTool.randomArr(this.blockData);
    };
    //点击
    __egretProto__.onTouchTap = function (e) {
        if (e.target instanceof Block) {
            this.checkBlock(e.target);
        }
    };
    //检查方块是否相连
    __egretProto__.checkBlock = function (block) {
        var self = this;
        if (self.isSelect) {
            //记录老对象
            self.oldTarget = self.newTarget;
            self.oldTarget.setSelect(false);
        }
        //记录新对象;
        self.newTarget = block;
        self.newTarget.setSelect(true);
        if (self.isSelect) {
            //两次点击不是同一个方块，且他们是同一类型的图片便可开始扫描是否通路
            if (self.newTarget != self.oldTarget && self.newTarget.type == self.oldTarget.type) {
                //通路检查
                if (self.checkRoad(self.oldTarget, self.newTarget)) {
                    //画线
                    self.linkRoad();
                    //爆炸效果
                    var boom1 = self.boomPool.getObject();
                    var boom2 = self.boomPool.getObject();
                    this.addChild(boom1);
                    this.addChild(boom2);
                    boom1.playMC(self.newTarget);
                    boom2.playMC(self.oldTarget);
                    //两方块的消失
                    self.oldTarget.hide();
                    self.newTarget.hide();
                    self.tempMap[self.oldTarget.row][self.oldTarget.col] = 0;
                    self.tempMap[self.newTarget.row][self.newTarget.col] = 0;
                    self.blockArr[self.oldTarget.index] = null;
                    self.blockArr[self.newTarget.index] = null;
                    self.oldTarget = self.newTarget = null;
                    //闪电声音
                    //sound.soundArr[0].play();
                    //得分
                    this.gameScene.addScore(20);
                    //检查游戏是否结束
                    if (self.checkGameOver()) {
                        self.gameWin();
                    }
                    self.isSelect = false;
                    return;
                }
            }
        }
        self.isSelect = true;
    };
    //直线、一折、二折、综合检查函数
    __egretProto__.checkRoad = function (oldTarget, newTarget) {
        console.log("checkRoad...");
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
            for (var i = 0; i < MapData.rows; i++) {
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
            for (i = 0; i < MapData.cols; i++) {
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
            for (i = 0; i < MapData.cols; i++) {
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
            for (i = 0; i < MapData.rows; i++) {
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
    __egretProto__.lineCheck = function (r1, c1, r2, c2) {
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
    __egretProto__.linkRoad = function () {
        var self = this;
        //挨个对比
        var len = this.route.length - 1;
        var cellWidth = Block.cellWidth;
        for (var i = 0; i < len; i++) {
            //每次取出前两个
            var obj1 = this.route[i];
            var obj2 = this.route[i + 1];
            //如果是在同一行则画横线
            if (obj1["y"] == obj2["y"]) {
                //取得最小列数和最大列数
                var minCol = Math.min(obj1["x"], obj2["x"]);
                var maxCol = Math.max(obj1["x"], obj2["x"]);
                for (var col = minCol; col < maxCol; col++) {
                    //创建闪电
                    var light = this.lightningPool.getObject();
                    light.playMC();
                    light.rotation = 0;
                    light.x = col * cellWidth + cellWidth / 2;
                    light.y = obj1["y"] * cellWidth + cellWidth / 2;
                    this.addChild(light);
                }
            }
            else if (obj1["x"] == obj2["x"]) {
                //如果是在同一列则画竖线
                var minRow = Math.min(obj1["y"], obj2["y"]);
                var maxRow = Math.max(obj1["y"], obj2["y"]);
                for (var row = minRow; row < maxRow; row++) {
                    //创建闪电
                    light = this.lightningPool.getObject();
                    light.playMC();
                    light.rotation = 90;
                    light.y = row * cellWidth + cellWidth / 2;
                    light.x = obj1["x"] * cellWidth + cellWidth / 2;
                    this.addChild(light);
                }
            }
        }
        //画完线清空路径数组
        this.route.length = 0;
        this.minRoadPoint = 10000;
    };
    //计算出最短的线路
    __egretProto__.theShortest = function (r1, c1, r2, c2, r3, c3, r4, c4) {
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
    //点击提示
    __egretProto__.tishi = function () {
        this.oldTarget && this.oldTarget.setSelect(false);
        this.newTarget && this.newTarget.setSelect(false);
        this.oldTarget = null;
        this.newTarget = null;
        if (this.bangzhu()) {
            console.log("tishi success...");
            this.oldTarget.startFlash();
            this.newTarget.startFlash();
        }
    };
    //点击重新排列
    __egretProto__.sortBlock = function () {
        //打乱编号
        ArrayTool.randomArr(this.blockData);
        var index = 0;
        var len = this.blockArr.length;
        var block;
        for (var i = 0; i < len; i++) {
            block = this.blockArr[i];
            if (block != null) {
                block.setSkin(this.blockData[block.index]);
                block.type = this.blockData[block.index];
                block.reset();
            }
        }
    };
    //帮助找到两个通路的方块
    __egretProto__.bangzhu = function () {
        for (var i = 1; i < MapData.rows - 1; i++) {
            for (var j = 1; j < MapData.cols - 1; j++) {
                if (this.tempMap[i][j] > 0) {
                    for (var k = i; k < MapData.rows - 1; k++) {
                        //两者处在同一行第二个方块在方块一的后面
                        var l;
                        if (k == i) {
                            l = j + 1;
                        }
                        else {
                            l = 1;
                        }
                        for (; l < this.tempMap[k].length - 1; l++) {
                            if (this.tempMap[i][j] == this.tempMap[k][l]) {
                                var obj1 = this.getChildByName(i + "_" + j);
                                var obj2 = this.getChildByName(k + "_" + l);
                                //检查两者是否通路
                                if (obj1.type == obj2.type) {
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
    //检查方块是否消除完毕
    __egretProto__.checkGameOver = function () {
        for (var i = 0; i < MapData.rows; i++) {
            for (var j = 0; j < MapData.cols; j++) {
                if (this.tempMap[i][j] > 0) {
                    return false;
                }
            }
        }
        return true;
    };
    //游戏完成
    __egretProto__.gameWin = function () {
        this.gameScene.stopTimer();
        this.gameScene.showSubmitPanel();
    };
    //游戏失败
    __egretProto__.gameLose = function () {
        this.gameScene.stopTimer();
        this.gameScene.showSubmitPanel();
    };
    //重置游戏
    __egretProto__.resetGame = function () {
        //清理剩余方块
        var len = this.blockArr.length;
        for (var i = 0; i < len; i++) {
            if (this.blockArr[i] != null) {
                this.blockArr[i].hide();
            }
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
    };
    return GameSprite;
})(egret.Sprite);
GameSprite.prototype.__class__ = "GameSprite";
