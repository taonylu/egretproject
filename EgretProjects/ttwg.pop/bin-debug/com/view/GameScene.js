/**
 * 游戏场景
 * @author
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.rowMax = 12; //行最大值
        this.colMax = 10; //列最大值
        this.cellWidth = 40; //单位高宽
        this.refreshList = []; //刷新方块列表
        this.score = 0; //当前分数
        this.picScale = 1; //图片比例
        this.refreshCount = 0;
        this.levelupCount = 0;
        this.initConfig();
        this.initView();
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.initConfig = function () {
        var json = RES.getRes("config_json");
        GameConst.zheScore = json.scoreList;
        GameConst.zheList = json.discountList;
        GameConst.reduceTime = json.reduceTime;
        GameConst.refreshTime = json.refreshTime;
        GameConst.levelUpTime = json.levelUpTime;
        GameConst.totalScore = (json.scoreList[json.scoreList.length - 1]);
        this.rowMax = json.rowMax;
        this.colMax = json.colMax;
        this.picScale = json.picScale;
        this.cellWidth *= this.picScale;
    };
    p.initView = function () {
        this._stage = GameConst.stage;
        this.rectPool = ObjectPool.getPool(Rect.NAME, this.rowMax * this.colMax);
        this.rectList = [];
        for (var i = 0; i < this.rowMax; i++) {
            this.rectList[i] = new Array();
        }
        this.sceneBg = new egret.Bitmap(RES.getRes("bg_png"));
        this.sceneBg.width = this._stage.stageWidth;
        this.sceneBg.height = this._stage.stageHeight;
        this.addChild(this.sceneBg);
        this.scoreBarUI = new ScoreBarUI();
        this.scoreBarUI.x = (this._stage.stageWidth - this.scoreBarUI.scoreBg.width) / 2;
        this.scoreBarUI.y = this._stage.stageHeight / 20;
        this.addChild(this.scoreBarUI);
        this.gameBg = new egret.Bitmap(RES.getRes("gamebg_png"));
        this.gameBg.x = (this._stage.stageWidth - this.gameBg.width) / 2;
        this.gameBg.y = this._stage.stageHeight / 5.5;
        this.addChild(this.gameBg);
        this.startX = this.gameBg.x + (this.gameBg.width - this.cellWidth * this.colMax) / 2;
        this.startY = this.gameBg.y - 8 + this.gameBg.height - this.cellWidth * this.rowMax;
        this.refreshBg = new egret.Bitmap(RES.getRes("refreshbg_png"));
        this.refreshBg.x = this.gameBg.x;
        this.refreshBg.y = this.gameBg.y + this.gameBg.height;
        this.addChild(this.refreshBg);
        this.refreshMask = new egret.Bitmap(RES.getRes("refreshmask_png"));
        this.refreshMask.x = this.refreshBg.x + 2.5;
        this.refreshMask.y = this.refreshBg.y + 2.5;
        this.addChild(this.refreshMask);
        this.startBtn = new egret.Bitmap(RES.getRes("start_png"));
        this.startBtn.x = (this._stage.stageWidth - this.startBtn.width) / 2;
        this.startBtn.y = (this._stage.stageHeight - this.startBtn.height) / 2;
        this.startBtn.touchEnabled = true;
        this.addChild(this.startBtn);
        this.resultPanel = new ResultPanel();
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
    };
    p.startGame = function () {
        this.removeChild(this.startBtn);
        this.createRect();
        this.createRefreshRect();
        this.startTimer();
        this.changeState(1 /* SelectRect */);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    };
    p.resetGame = function () {
    };
    p.gameOver = function () {
        this.stopTimer();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.showResult();
    };
    p.changeState = function (state) {
        this.curGameState = state;
    };
    //创建方块
    p.createRect = function () {
        var rand;
        var rect;
        for (var i = 4; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                rand = Math.floor(Math.random() * 3); //随机0-2
                rect = this.rectPool.getObject();
                rect.scaleX = this.picScale;
                rect.scaleY = this.picScale;
                rect.changeColor(rand);
                rect.row = i;
                rect.col = j;
                rect.isSelected = false;
                rect.x = this.startX + this.cellWidth * j;
                rect.y = this.startY + this.cellWidth * i;
                this.addChild(rect);
                this.rectList[i][j] = rect;
            }
        }
    };
    //增加刷新区域方块
    p.createRefreshRect = function () {
        var rand;
        var rect;
        for (var i = 0; i < this.colMax; i++) {
            rand = Math.floor(Math.random() * 3); //随机0-2
            rect = this.rectPool.getObject();
            rect.scaleX = this.picScale;
            rect.scaleY = this.picScale;
            rect.changeColor(rand);
            rect.row = this.rowMax - 1;
            rect.col = i;
            rect.isSelected = false;
            rect.x = this.refreshMask.x + this.cellWidth * i;
            rect.y = this.refreshMask.y;
            this.addChild(rect);
            this.refreshList[i] = rect;
        }
        this.addChild(this.refreshMask);
    };
    //刷新方块
    p.refreshRect = function () {
        var rect;
        for (var i = 0; i < this.colMax; i++) {
            if (this.rectList[0][i] != null) {
                this.gameOver();
                return;
            }
        }
        for (i = 1; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                rect = this.rectList[i][j];
                if (rect) {
                    rect.row -= 1;
                    this.rectList[i - 1][j] = rect;
                }
            }
        }
        for (i = 0; i < this.colMax; i++) {
            this.rectList[this.rowMax - 1][i] = this.refreshList[i];
        }
        this.refreshList.length = 0;
        //移动方块
        this.moveRect();
    };
    p.onTouchTap = function (e) {
        if (e.target instanceof Rect) {
            this.checkRect(e.target);
        }
    };
    //检查方块
    p.checkRect = function (rect) {
        if (this.curGameState != 1 /* SelectRect */) {
            return;
        }
        this.changeState(2 /* WaitCancelRect */);
        var row;
        var col;
        var color = rect.color;
        var checkTile;
        var resultList = []; //结果列表
        var checkList = []; //待检查列表
        checkList.push(rect);
        rect.isSelected = true;
        while (checkList.length > 0) {
            //从待检查列表开头开始检查
            row = checkList[0].row;
            col = checkList[0].col;
            //检查上方
            this.checkLine(row - 1, col, color, checkList);
            //检查下方
            this.checkLine(row + 1, col, color, checkList);
            //检查左方
            this.checkLine(row, col - 1, color, checkList);
            //检查右方
            this.checkLine(row, col + 1, color, checkList);
            //处理当前检查的方块
            checkTile = checkList.shift();
            resultList.push(checkTile);
        }
        if (resultList.length > 2) {
            this.cancelTile(resultList);
        }
        else {
            for (var i = 0; i < resultList.length; i++) {
                resultList[i].isSelected = false;
            }
            this.changeState(1 /* SelectRect */);
        }
    };
    //检查指定位置连线颜色相同的方块，将符合条件的方块存入待检查列表
    p.checkLine = function (row, col, color, checkList) {
        if (row >= 0 && row < this.rowMax && col >= 0 && col < this.colMax) {
            var checkTile = this.rectList[row][col];
            if (checkTile != null && checkTile.isSelected == false && checkTile.color == color) {
                checkTile.isSelected = true;
                checkList.push(checkTile);
            }
        }
    };
    /**删除选中的方块*/
    p.cancelTile = function (resultList) {
        var len = resultList.length;
        var rect;
        var row;
        var col;
        //计算得分
        this.score += len * 10 + 20 + (len - 3) * 10;
        this.scoreBarUI.setScore(this.score);
        for (var i = 0; i < len; i++) {
            rect = resultList[i];
            row = rect.row;
            col = rect.col;
            this.rectList[row][col] = null;
            rect.row = -1;
            rect.col = -1;
            this.rectPool.returnObject(rect);
            this.removeChild(rect);
        }
        resultList.length = 0;
        for (var i = this.rowMax - 2; i >= 0; i--) {
            for (var j = 0; j < this.colMax; j++) {
                rect = this.rectList[i][j];
                if (rect != null) {
                    for (var n = i + 1; n < this.rowMax; n++) {
                        if (this.rectList[n][j] == null) {
                            rect.row += 1;
                        }
                    }
                    this.rectList[i][j] = null;
                    this.rectList[rect.row][rect.col] = rect;
                }
            }
        }
        //右边水平方向排列方块
        var halfCol = this.colMax / 2;
        for (var i = this.colMax - 2; i >= halfCol; i--) {
            for (var j = 0; j < this.rowMax; j++) {
                rect = this.rectList[j][i];
                if (rect != null) {
                    break;
                }
            }
            if (j == this.rowMax) {
                for (var n = 0; n < this.rowMax; n++) {
                    for (var m = i + 1; m < this.colMax; m++) {
                        rect = this.rectList[n][m];
                        if (rect != null) {
                            rect.col -= 1;
                            this.rectList[n][m] = null;
                            this.rectList[rect.row][rect.col] = rect;
                        }
                    }
                }
            }
        }
        for (var i = 1; i < halfCol; i++) {
            for (var j = 0; j < this.rowMax; j++) {
                rect = this.rectList[j][i];
                if (rect != null) {
                    break;
                }
            }
            if (j == this.rowMax) {
                for (var n = 0; n < this.rowMax; n++) {
                    for (var m = i - 1; m >= 0; m--) {
                        rect = this.rectList[n][m];
                        if (rect != null) {
                            rect.col += 1;
                            this.rectList[n][m] = null;
                            this.rectList[rect.row][rect.col] = rect;
                        }
                    }
                }
            }
        }
        //移动方块
        this.moveRect();
    };
    //移动方块
    p.moveRect = function () {
        var rect;
        var row;
        var col;
        var endX;
        var endY;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                rect = this.rectList[i][j];
                if (rect != null) {
                    row = rect.row;
                    col = rect.col;
                    endX = this.startX + this.cellWidth * col;
                    endY = this.startY + this.cellWidth * row;
                    egret.Tween.get(rect).to({ x: endX, y: endY }, 200, egret.Ease.backIn);
                }
            }
        }
        var self = this;
        egret.Tween.get(this).wait(200).call(function () {
            if (self.curGameState == 3 /* RefreshRect */) {
                self.createRefreshRect();
            }
            self.changeState(1 /* SelectRect */);
        });
    };
    p.startTimer = function () {
        if (this.gameTimer == null) {
            this.gameTimer = new egret.Timer(20);
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        this.gameTimer.reset();
        this.gameTimer.start();
    };
    p.onTimerHandler = function () {
        this.refreshCount += 0.02;
        this.levelupCount += 0.02;
        //方块刷新
        if (this.refreshCount >= (GameConst.refreshTime / 50)) {
            this.refreshCount = 0;
            this.refreshMask.scaleY -= 0.02;
            if (this.refreshMask.scaleY <= 0) {
                this.changeState(3 /* RefreshRect */);
                this.refreshMask.scaleY = 1;
                this.refreshRect();
            }
        }
        //难度提升
        if (this.levelupCount >= GameConst.levelUpTime) {
            this.levelupCount = 0;
            GameConst.refreshTime -= GameConst.reduceTime;
            if (GameConst.refreshTime < 0) {
                GameConst.refreshTime = 0;
            }
        }
    };
    p.stopTimer = function () {
        if (this.gameTimer != null) {
            this.gameTimer.stop();
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        }
    };
    p.showResult = function () {
        this.resultPanel.show(this);
        var curZhe = this.scoreBarUI.curZhe;
        //拼显示内容
        var msg = "";
        if (curZhe <= 0) {
            msg += "很遗憾，未获得折扣";
        }
        else {
            msg += "获得:" + curZhe + "折";
            msg += "\n￥1000" + "   -￥" + Math.round(1000 * (1 - curZhe / 10));
        }
        msg += "\n获得天天币:" + 100;
        this.resultPanel.setText(msg);
    };
    return GameScene;
})(egret.DisplayObjectContainer);
egret.registerClass(GameScene,"GameScene");
