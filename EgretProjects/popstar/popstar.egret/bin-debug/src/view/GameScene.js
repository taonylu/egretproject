/**
 *
 * @author
 *
 */
var GameState;
(function (GameState) {
    GameState[GameState["Free"] = 0] = "Free";
    GameState[GameState["SelectTile"] = 1] = "SelectTile";
    GameState[GameState["WaitCancelTile"] = 2] = "WaitCancelTile";
    GameState[GameState["Shua"] = 3] = "Shua";
})(GameState || (GameState = {}));
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        /**当前关卡*/
        this.curLevel = 1;
        /**行最大值*/
        this.rowMax = 10;
        /**列最大值*/
        this.colMax = 10;
        /**方块宽*/
        this.tileWidth = 48;
        /**方块起始点*/
        this.startX = 0;
        /**方块起始点*/
        this.startY = 320;
        /**基础得分*/
        this.baseScore = 10;
        /**额外得分*/
        this.mutileScore = 15;
        this.count = 0;
        this.skinName = skins.scene.GameSceneSkin;
        this.initView();
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.onEnable = function () {
        this.stage.addChild(this.gameSprite);
        //this.gameSprite.cacheAsBitmap = true;
        this.gameSprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.startGame();
    };
    __egretProto__.onRemove = function () {
    };
    __egretProto__.changeState = function (state) {
        this.curGameState = state;
    };
    /**初始化*/
    __egretProto__.initView = function () {
        this.tileList = new Array();
        for (var i = 0; i < this.rowMax; i++) {
            this.tileList[i] = new Array();
        }
        this.tilePool = ObjectPool.getPool("TileUI", this.rowMax * this.colMax);
        this.particlePool = ObjectPool.getPool("StarParticle", 10);
        this.levelScoreList = [1000, 3000, 6000, 10000];
        this.gameSprite = new egret.Sprite();
    };
    /**开始游戏*/
    __egretProto__.startGame = function () {
        this.nextLevelUI.visible = false;
        this.gameOverUI.visible = false;
        this.setCurLevel(1);
        this.setCurScore(0);
        this.setTargetScore();
        this.createTiles();
        this.changeState(1 /* SelectTile */);
    };
    /**下一关*/
    __egretProto__.nextLevel = function (level) {
        egret.Tween.get(this).wait(3000).call(function () {
            this.clearTile();
        }).wait(1000).call(function () {
            this.setCurLevel(level);
            if (level == 1) {
                this.setCurScore(0);
            }
            this.setTargetScore();
            this.nextLevelUI.visible = false;
            this.gameOverUI.visible = false;
            this.createTiles();
            this.changeState(1 /* SelectTile */);
        });
    };
    /**创建方块*/
    __egretProto__.createTiles = function () {
        var rand;
        var tile;
        var endY;
        var uiStage = App.getInstance().uiStage;
        var stageHeight = this.stage.stageHeight;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                rand = Math.floor(Math.random() * 5); //随机0-4
                tile = this.tilePool.getObject();
                tile.changeColor(rand);
                tile.row = i;
                tile.col = j;
                tile.isSelected = false;
                tile.x = this.startX + this.tileWidth * j;
                endY = this.startY + i * this.tileWidth;
                tile.y = endY - 700;
                //this.stage.addChild(tile);
                this.gameSprite.addChild(tile);
                this.tileList[i][j] = tile;
                egret.Tween.get(tile).to({ y: endY }, 1500 - i * 100);
            }
        }
    };
    /**点击舞台*/
    __egretProto__.onTouchTap = function (e) {
        if (e.target instanceof TileUI) {
            this.xiaoChuTiles(e.target);
        }
    };
    /**消除方块*/
    __egretProto__.xiaoChuTiles = function (tile) {
        console.log("点击消除:" + tile.row + "," + tile.col + " " + this.curGameState);
        if (this.curGameState != 1 /* SelectTile */) {
            return;
        }
        this.changeState(2 /* WaitCancelTile */);
        var row;
        var col;
        var color = tile.color;
        var checkTile;
        var resultList = []; //结果列表
        var checkList = []; //待检查列表
        checkList.push(tile);
        tile.isSelected = true;
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
        if (resultList.length > 1) {
            this.cancelTile(resultList);
        }
        else {
            tile.isSelected = false;
            this.changeState(1 /* SelectTile */);
        }
    };
    /**检查指定位置连线颜色相同的方块，将符合条件的方块存入待检查列表*/
    __egretProto__.checkLine = function (row, col, color, checkList) {
        if (row >= 0 && row < this.rowMax && col >= 0 && col < this.colMax) {
            var checkTile = this.tileList[row][col];
            if (checkTile != null && checkTile.isSelected == false && checkTile.color == color) {
                checkTile.isSelected = true;
                checkList.push(checkTile);
            }
        }
    };
    /**删除选中的方块*/
    __egretProto__.cancelTile = function (resultList) {
        var len = resultList.length;
        var tile;
        var row;
        var col;
        var endX;
        var endY;
        //计算得分
        this.setCurScore(this.curScore + len * this.baseScore + (len - 2) * this.mutileScore);
        for (var i = 0; i < len; i++) {
            tile = resultList[i];
            row = tile.row;
            col = tile.col;
            this.tileList[row][col] = null;
            tile.row = -1;
            tile.col = -1;
            this.tilePool.returnObject(tile);
            this.gameSprite.removeChild(tile);
            resultList[i] = null;
            //播放星星爆炸粒子效果
            this.playStarParticle(tile);
        }
        //播放声音
        SoundManager.play(SoundManager.snd_pop);
        for (var i = 0; i < this.rowMax - 1; i++) {
            for (var j = 0; j < this.colMax; j++) {
                tile = this.tileList[i][j];
                if (tile != null) {
                    for (var n = i + 1; n < this.rowMax; n++) {
                        if (this.tileList[n][j] == null) {
                            tile.row += 1;
                        }
                    }
                }
            }
        }
        for (var i = 0; i < this.colMax - 1; i++) {
            for (var j = 0; j < this.rowMax; j++) {
                tile = this.tileList[j][i];
                if (tile != null) {
                    break;
                }
            }
            if (j == this.rowMax) {
                for (var n = 0; n < this.rowMax; n++) {
                    for (var m = i + 1; m < this.colMax; m++) {
                        tile = this.tileList[n][m];
                        if (tile != null) {
                            tile.col -= 1;
                        }
                    }
                }
            }
        }
        for (var i = this.rowMax - 1; i >= 0; i--) {
            for (var j = 0; j < this.colMax; j++) {
                tile = this.tileList[i][j];
                if (tile != null) {
                    row = tile.row;
                    col = tile.col;
                    if (row != i || col != j) {
                        endX = this.startX + this.tileWidth * col;
                        endY = this.startY + this.tileWidth * row;
                        this.tileList[i][j] = null;
                        if (this.tileList[row][col] != null) {
                            console.log(row + "," + col + "该位置不应该被覆盖");
                        }
                        this.tileList[row][col] = tile;
                        egret.Tween.get(tile).to({ x: endX, y: endY }, 200, egret.Ease.backIn);
                    }
                }
            }
        }
        //检查游戏是否结束
        this.checkGameOver();
    };
    /**播放星星粒子效果*/
    __egretProto__.playStarParticle = function (tile) {
        var starParticle = this.particlePool.getObject();
        starParticle.play(tile.x + this.tileWidth / 2, tile.y + this.tileWidth / 2, this.stage);
    };
    /**检查游戏是否结束*/
    __egretProto__.checkGameOver = function () {
        var isOver = true;
        var tile;
        var rightTile;
        var buttomTile;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                tile = this.tileList[i][j];
                if (tile != null) {
                    //检查右边
                    if (j < this.colMax - 1) {
                        rightTile = this.tileList[i][j + 1];
                        if (rightTile != null && rightTile.color == tile.color) {
                            isOver = false;
                            break;
                        }
                    }
                    //检查下边
                    if (i < this.rowMax - 1) {
                        buttomTile = this.tileList[i + 1][j];
                        if (buttomTile != null && buttomTile.color == tile.color) {
                            isOver = false;
                            break;
                        }
                    }
                }
            }
            if (isOver == false) {
                break;
            }
        }
        if (isOver) {
            console.log("游戏结束");
            if (this.curScore >= this.targetScore) {
                console.log("下一关");
                SoundManager.play(SoundManager.snd_nextLevel);
                this.nextLevelUI.visible = true;
                this.nextLevel(++this.curLevel);
            }
            else {
                console.log("重新开始游戏");
                SoundManager.play(SoundManager.snd_gameOver);
                this.gameOverUI.visible = true;
                this.nextLevel(1);
            }
        }
        else {
            this.changeState(1 /* SelectTile */);
        }
    };
    /**清理当前的方块*/
    __egretProto__.clearTile = function () {
        var tile;
        for (var i = 0; i < this.rowMax; i++) {
            for (var j = 0; j < this.colMax; j++) {
                tile = this.tileList[i][j];
                if (tile != null) {
                    this.tilePool.returnObject(tile);
                    this.gameSprite.removeChild(tile);
                    this.tileList[i][j] = null;
                }
            }
        }
    };
    /**设置当前分数*/
    __egretProto__.setCurScore = function (score) {
        this.curScore = score;
        this.curScoreLabel.text = score.toString();
    };
    /**设置目标分数*/
    __egretProto__.setTargetScore = function () {
        this.targetScore = this.levelScoreList[this.curLevel - 1];
        this.targetScoreLabel.text = "目标分数:" + this.targetScore;
    };
    /**设置当前关卡*/
    __egretProto__.setCurLevel = function (level) {
        this.curLevel = level;
        this.curLevelLabel.text = "关卡:" + level.toString();
    };
    return GameScene;
})(BaseScene);
GameScene.prototype.__class__ = "GameScene";
