/**
 * 游戏场景
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this, "GameSceneSkin");
        this.gridBgList = []; //格子背景数组
        this.gridList = []; //格子数组，保存已占的格子
        this.rowMax = 9; //行最大值
        this.colMax = 9; //列最大值
        this.gridStartX = 60; //格子起始坐标x
        this.gridStartY = 33; //格子起始坐标y
        this.gridIntervalX = 62; //格子水平间隔
        this.gridIntervalY = 56; //格子垂直间隔
        this.player = new Player(); //玩家
        this.initPlayerRow = 4; //玩家初始行列
        this.initPlayerCol = 4;
        this.randGridLimit = 16; //随机生成已占用格子
        this.gridPool = ObjectPool.getPool(Grid.NAME, 20); //已占用格子对象池
        this.map = new MapManager(); //地图类
    }
    var d = __define,c=GameScene,p=c.prototype;
    p.componentCreated = function () {
        _super.prototype.componentCreated.call(this);
        this.initGrid();
        this.map.mapList = this.gridBgList;
        this.luckScroller.scrollPolicyV = eui.ScrollPolicy.ON;
    };
    p.onEnable = function () {
        this.startGame();
    };
    p.onRemove = function () {
        this.resetGame();
    };
    p.startGame = function () {
        this.resetGame();
        this.randGrid(); //随机生成已占用格子
        this.gridBgGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPlaceGrid, this);
    };
    p.gameOver = function (bWin) {
        this.showResult(bWin);
    };
    p.resetGame = function () {
        this.resetPlayer();
        this.resetMap();
        this.hideResult();
        this.hideLuck();
        this.hideWater();
    };
    p.onPlaceGrid = function (e) {
        if (e.target instanceof GridBg) {
            //格子已占用，则不操作
            var gridBg = e.target;
            if (gridBg.bHave) {
                return;
            }
            //寻路中，则不操作
            if (this.map.isPlayTurn == false) {
                return;
            }
            //添加一个格子
            gridBg.bHave = true;
            var grid = this.gridPool.getObject();
            grid.x = gridBg.x;
            grid.y = gridBg.y;
            this.gridList.push(grid);
            this.gridGroup.addChild(grid);
            //判断游戏是否结束
            if (this.checkGameOver() == false) {
                this.movePlayer();
            }
        }
    };
    p.checkGameOver = function () {
        var row = this.player.row;
        var col = this.player.col;
        //玩家在最边缘，则游戏结束
        if (row == 0 || row == this.rowMax - 1 || col == 0 || col == this.colMax - 1) {
            this.gameOver(false);
            return true;
        }
        //判断玩家四周格子是否占用
        var offerCol = (row % 2 == 0) ? -1 : 0; //0,2偶数行-1
        if (this.gridBgList[row - 1][col + offerCol].bHave &&
            this.gridBgList[row - 1][col + offerCol + 1].bHave &&
            this.gridBgList[row][col - 1].bHave &&
            this.gridBgList[row][col + 1].bHave &&
            this.gridBgList[row + 1][col + offerCol].bHave &&
            this.gridBgList[row + 1][col + offerCol + 1].bHave) {
            this.gameOver(true);
            return true;
        }
        //玩家不在边缘，并且四周格子未占满，则游戏继续
        return false;
    };
    p.movePlayer = function () {
        var row = this.player.row;
        var col = this.player.col;
        this.map.lock();
        var pathes = this.map.findPath(this.gridBgList[row][col]);
        if (pathes.length) {
            var path = pathes[0];
            var gridBg = this.gridBgList[path[0]][path[1]];
            var self = this;
            this.player.row = gridBg.row;
            this.player.col = gridBg.col;
            egret.Tween.get(this.player).to({ x: gridBg.x, y: gridBg.y }, 100).call(function () {
                self.map.unlock();
                //当点击自己所在格子位置时，移动完成后是否结束
                var result = self.map.getNear(gridBg);
                if (result.length == 0) {
                    self.gameOver(true);
                }
            });
        }
        else {
            console.log("win");
            this.gameOver(true);
        }
    };
    p.randGrid = function () {
        var count = 0;
        var randRow;
        var randCol;
        var grid;
        var gridBg;
        for (var i = 0; i < this.randGridLimit; i++) {
            randRow = Math.floor(Math.random() * this.rowMax);
            randCol = Math.floor(Math.random() * this.colMax);
            //生成在玩家所在格子，则重新随机
            if (randRow == this.initPlayerRow && randCol == this.initPlayerCol) {
                i--;
                continue;
            }
            //已占用，则重新随机
            gridBg = this.gridBgList[randRow][randCol];
            if (gridBg.bHave) {
                i--;
                continue;
            }
            //可用
            gridBg.bHave = true;
            grid = this.gridPool.getObject();
            grid.x = gridBg.x;
            grid.y = gridBg.y;
            this.gridList.push(grid);
            this.gridGroup.addChild(grid);
        }
    };
    p.initGrid = function () {
        //初始化格子背景 
        var gridBg;
        for (var i = 0; i < this.rowMax; i++) {
            this.gridBgList[i] = [];
            for (var j = 0; j < this.colMax; j++) {
                gridBg = new GridBg();
                gridBg.row = i;
                gridBg.col = j;
                if (i % 2 == 0) {
                    gridBg.x = this.gridStartX + j * this.gridIntervalX;
                }
                else {
                    gridBg.x = this.gridStartX + j * this.gridIntervalX + 30;
                }
                gridBg.y = this.gridStartY + i * this.gridIntervalY;
                gridBg.anchorOffsetX = gridBg.width / 2;
                gridBg.anchorOffsetY = gridBg.height / 2;
                this.gridBgGroup.addChild(gridBg);
                this.gridBgList[i][j] = gridBg;
            }
        }
        this.gridBgGroup.cacheAsBitmap = true;
    };
    p.resetPlayer = function () {
        var gridBg = this.gridBgList[this.initPlayerRow][this.initPlayerCol];
        this.player.x = gridBg.x;
        this.player.y = gridBg.y;
        this.player.row = this.initPlayerRow;
        this.player.col = this.initPlayerCol;
        this.player.shakeHead();
        this.playerGroup.addChild(this.player);
    };
    p.resetMap = function () {
        //解锁地图
        this.map.unlock();
        //回收占用格子
        var len = this.gridList.length;
        var grid;
        for (var i = 0; i < len; i++) {
            grid = this.gridList[i];
            this.gridGroup.removeChild(grid);
            this.gridPool.returnObject(grid);
        }
        this.gridList.length = 0;
        //重置格子占用状态
        var gridBg;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                gridBg = this.gridBgList[i][j];
                gridBg.bHave = false;
            }
        }
    };
    p.showResult = function (bWin) {
        if (bWin) {
            //显示成功
            this.successText.visible = true;
            this.failText.visible = false;
            this.luckBtn.visible = true;
        }
        else {
            //显示失败
            this.successText.visible = false;
            this.failText.visible = true;
            this.luckBtn.visible = false;
        }
        this.addChild(this.resultGroup);
        //按钮监听
        this.configResultListener();
    };
    p.hideResult = function () {
        this.removeChild(this.resultGroup);
        this.deConfigResultListener();
    };
    p.configResultListener = function () {
        this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookBtnTouch, this);
        this.luckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLuckBtnTouch, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.deConfigResultListener = function () {
        this.lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLookBtnTouch, this);
        this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLuckBtnTouch, this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareBtnTouch, this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgainBtnTouch, this);
    };
    p.onLookBtnTouch = function () {
        this.deConfigResultListener();
        window['getPrizeList']();
    };
    p.recivePrizeListResult = function (json) {
        if (json != null) {
            //alert("egret接受后:" + json[0].nickname);
            this.removeChild(this.resultGroup);
            this.showLuckList(json);
        }
        this.configResultListener();
    };
    p.onLuckBtnTouch = function () {
        //点击抽奖
        this.deConfigResultListener();
        window['sendGetPrize']();
    };
    p.reciveLuckResult = function (json) {
        if (json != null) {
            GameConst.prizeJson = json;
            if (json.code != 200) {
                alert(json.msg);
            }
            else {
                LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
            }
        }
        this.configResultListener();
    };
    p.onShareBtnTouch = function () {
        if (this.water == null) {
            this.water = new Water();
        }
        this.water.x = this.shareBtn.x;
        this.water.y = this.shareBtn.y;
        this.water.reset();
        this.addChild(this.water);
        egret.Tween.get(this.water).to({ x: -this.water.width }, 200).
            to({ y: 0 }, 10).
            to({ x: GameConst.stage.stageWidth - this.water.width }, 600).
            call(this.showWater, this);
    };
    p.showWater = function () {
        var self = this;
        this.water.addEventListener("waterComplete", function () {
            self.water.parent && self.removeChild(self.water);
        }, this);
        this.water.play();
    };
    p.hideWater = function () {
        this.water && this.water.parent && this.water.parent.removeChild(this.water);
    };
    p.onAgainBtnTouch = function () {
        this.startGame();
    };
    p.hideLuck = function () {
        this.luckGroup.parent && this.removeChild(this.luckGroup);
    };
    p.showLuckList = function (json) {
        this.addChild(this.luckGroup);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
        for (var i = 0; i < 50; i++) {
            if (json[0] == null) {
                break;
            }
            var luckText = new LuckText();
            luckText.setNameLabel(json[i].nickname);
            luckText.setPrizeLabel(json[i].prizemsg);
            this.luckScrollerGroup.addChild(luckText);
        }
    };
    p.onOKBtnTouch = function () {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onOKBtnTouch, this);
        this.removeChild(this.luckGroup);
        this.luckScroller.viewport.scrollV = 0;
        this.addChild(this.resultGroup);
        this.configResultListener();
    };
    return GameScene;
})(BaseScene);
egret.registerClass(GameScene,'GameScene');
