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
        this.skillUIList = new Array(); //道具面板列表
        this.blockPool = ObjectPool.getPool(BlockUI.NAME, 10); //方块对象池
        this.boomPool = ObjectPool.getPool(BoomUI.NAME, 10); //炸弹对象池
        this.selectOld = new SelectUI(); //选择框动画，第一个对象
        this.selectNew = new SelectUI(); //选择框动画，第二个对象
        this.blockTypeNum = 11; //方块的数量种类
        this.blockNum = 0; //当前关卡方块数量
        this.blockData = new Array(); //方块的类型数组，用于判断方块皮肤ID后缀数字,"block" + blockData[i]
        this.tempMap = new Array(); //临时地图，二维数组，存放本关的地图数据的拷贝
        this.blockArr = new Array(); //方块数组，二维数组，用于存放Block实例
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
        this.totalScore = 0; //总分
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
        //技能显示面板 测试
        for (var i = 0; i < 4; i++) {
            this.skillUIList.push(this["skillUI" + i]);
        }
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
        var mapData = MapManager.getInstance().level;
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
                    block.name = i + "_" + j;
                    block.x = this.mapStartX + j * (this.blockWidth + 1);
                    block.y = this.mapStartY + i * (this.blockHeight + 1) - this._stage.stageHeight;
                    this.blockGroup.addChild(block);
                    this.blockArr[block.row][block.col] = block;
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
    //删除指定两个方块
    p.cancelBlock = function (blockA, blockB) {
        //画线
        this.lineSprite.graphics.lineStyle(5, 0xff0000);
        var x1 = blockA.col * this.blockWidth + this.blockWidth / 2;
        var y1 = blockA.row * this.blockHeight + this.blockHeight / 2;
        var x2 = blockB.col * this.blockWidth + this.blockWidth / 2;
        var y2 = blockB.row * this.blockHeight + this.blockHeight / 2;
        this.lineSprite.graphics.moveTo(x1, y1);
        this.lineSprite.graphics.lineTo(x2, y2);
        //画完线清空路径数组
        this.lineSprite.graphics.endFill();
        //清理路线
        var self = this;
        setTimeout(function () {
            self.lineSprite.graphics.clear();
        }, 300);
        //爆炸效果
        var boom1 = this.boomPool.getObject();
        var boom2 = this.boomPool.getObject();
        boom1.play(blockA);
        boom2.play(blockB);
        //两方块的消失
        blockA.hide();
        blockB.hide();
        this.tempMap[blockA.row][blockA.col] = 0;
        this.tempMap[blockB.row][blockB.col] = 0;
        this.blockArr[blockA.row][blockA.col] = null;
        this.blockArr[blockB.row][blockB.col] = null;
    };
    ///////////////////////////////////////////////////
    ///-----------------[网络处理]----------------------
    ///////////////////////////////////////////////////
    //玩家消除动作
    p.revEliminate = function (data) {
        var id = data.uid; //用户id
        var pos = data.pos; //消除的位置
        egret.log("玩家消除方块:", id, pos);
        if (id == UserManager.getInstance().luckyUser) {
            var blockA = this.blockArr[pos[0][0]][pos[0][1]];
            var blockB = this.blockArr[pos[1][0]][pos[1][1]];
            if (blockA && blockB) {
                this.cancelBlock(blockA, blockB);
            }
        }
    };
    //过关后，接收新关卡数据
    p.revMapData = function (data) {
        var mapData = data.mapData;
        egret.log("下一关");
        //重置地图数据，进入下一关
        MapManager.getInstance().level = mapData;
        this.nextLevel();
    };
    //本次关卡无可消除，则由用户手机更新地图后，发送到大屏幕，大屏幕接收后更新地图
    p.revluckyMap = function (data) {
        var mapData = data.mapdata;
        egret.log("玩家无可消除，重排地图");
        //更新操作同下一关。都是重置界面。特效方面可能不同
        MapManager.getInstance().level = mapData;
        this.nextLevel();
    };
    //使用道具(大屏幕)
    p.revPro = function (data) {
        var from = data.from; //施放道具的玩家
        var to = data.to; //被施放道具的玩家
        var type = data.type; //道具类型
        var mapData = data.mapData; //道具使用后影响的位置
        egret.log("使用道具:" + type);
        //道具效果
        var toolName = "";
        if (type == "1") {
            toolName = "打乱";
            MapManager.getInstance().level = mapData;
            this.nextLevel();
        }
        else if (type == "2") {
            toolName = "冻结";
        }
        else if (type == "3") {
        }
        //大屏幕显示道具信息
        var img0 = UserManager.getInstance().userList[from].headImg;
        var img1 = UserManager.getInstance().userList[to].headImg;
        this.skillUIList[0].setSkill(img0, img1, toolName);
    };
    //幸运用户的地图因为没有可以消除的，系统自动更换
    p.revLuckyMap = function (data) {
        var mapData = data.mapdata; //地图数据
    };
    //游戏结束
    p.revGameOver = function (data) {
        var winners = data.winners; //前三名玩家ID
        egret.log("游戏结束，前三名ID：" + winners[0], winners[1], winners[2]);
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
