/**
 *
 * @author 
 *
 */

enum GameState {
    Free,
    SelectTile,
    WaitCancelTile,
    Shua
}

class GameScene extends BaseScene{
    /**目标分数文本*/
    private targetScoreLabel: egret.gui.Label;
    /**当前分数文本*/
    private curScoreLabel: egret.gui.Label;
    /**当前关卡文本*/
    private curLevelLabel: egret.gui.Label;
    /**下一关图标*/
    private nextLevelUI: egret.gui.UIAsset;
    /**游戏结束图标*/
    private gameOverUI: egret.gui.UIAsset;
    /**方块数组*/
    private tileList: Array<any>;
    /**方块对象池*/
    private tilePool: ObjectPool;
    /**粒子对象池*/
    private particlePool: ObjectPool;
    /**当前关卡*/
    private curLevel: number = 1;
    /**行最大值*/
    private rowMax: number = 10;
    /**列最大值*/
    private colMax: number = 10;
    /**方块宽*/
    private tileWidth: number = 48;
    /**方块起始点*/
    private startX: number = 0;
    /**方块起始点*/
    private startY: number = 320;
    /**当前游戏状态*/
    private curGameState: GameState;
    /**目标分数*/
    private targetScore: number;
    /**当前分数*/
    private curScore: number;
    /**关卡分数列表*/
    private levelScoreList: number[];
    /**基础得分*/
    private baseScore: number = 10;
    /**额外得分*/
    private mutileScore: number = 15;
    /**游戏方块容器*/
    private gameSprite: egret.Sprite;
    
    public constructor() {
        super();
        this.skinName = skins.scene.GameSceneSkin;
        this.initView();
    }
	
    protected onEnable(): void { 
        
        this.stage.addChild(this.gameSprite);
        //this.gameSprite.cacheAsBitmap = true;
        
        this.gameSprite.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap ,this);
        this.startGame();
       
    }
    
    protected onRemove(): void { 
        
    }
    
    private changeState(state:GameState): void { 
        this.curGameState = state;
    }
    
    /**初始化*/
    private initView(): void { 
        
        this.tileList = new Array<any>();
        for(var i: number = 0;i < this.rowMax;i++) { 
            this.tileList[i] = new Array<TileUI>();
        }           
        
        this.tilePool = ObjectPool.getPool("TileUI", this.rowMax*this.colMax);
        
        this.particlePool = ObjectPool.getPool("StarParticle", 10);
        
        this.levelScoreList = [1000,3000,6000,10000];
        
        this.gameSprite = new egret.Sprite();
    }
    
    /**开始游戏*/
    private startGame(): void { 
        this.nextLevelUI.visible = false;
        this.gameOverUI.visible = false;
        this.setCurLevel(1);
        this.setCurScore(0);
        this.setTargetScore(); 
        this.createTiles();
         this.changeState(GameState.SelectTile);
    }
    
    /**下一关*/
    private nextLevel(level:number ): void { 

        egret.Tween.get(this).wait(3000).call(function(): void {
            this.clearTile();
        }).wait(1000).call(function(): void {
                this.setCurLevel(level);
                if(level == 1) { 
                    this.setCurScore(0);
                }
                this.setTargetScore();
                this.nextLevelUI.visible = false;
                this.gameOverUI.visible = false;
                this.createTiles();
                this.changeState(GameState.SelectTile);
        });
       
    }

    
    /**创建方块*/
    public createTiles(): void {
        var rand: number;
        var tile: TileUI;
        var endY: number;
        var uiStage: egret.gui.UIStage = App.getInstance().uiStage;
        var stageHeight: number = this.stage.stageHeight;
        for(var i: number = 0;i < this.rowMax;i++) {
            for(var j: number = 0;j < this.colMax;j++) {
                rand = Math.floor(Math.random() * 5);  //随机0-4
                tile = this.tilePool.getObject();
                tile.changeColor(<TileColor>rand);
                tile.row = i;
                tile.col = j;
                tile.isSelected = false;
                tile.x = this.startX +  this.tileWidth * j;
                endY =this.startY +  i*this.tileWidth;
                tile.y = endY - 700;
                //this.stage.addChild(tile);
                this.gameSprite.addChild(tile);
                this.tileList[i][j] = tile;
                egret.Tween.get(tile).to({ y: endY },1500-i*100);
                }
            }
        }
        
    private count: number = 0;
    private snd: egret.Sound;
        
        /**点击舞台*/
    private onTouchTap(e: egret.TouchEvent): void { 
        if(e.target instanceof TileUI) {
           this.xiaoChuTiles(e.target);
        } 
    }

            
    /**消除方块*/
    public xiaoChuTiles(tile: TileUI ): void { 
        console.log("点击消除:" + tile.row + "," + tile.col + " " + this.curGameState);
        if(this.curGameState != GameState.SelectTile) { 
            return;
        }
        this.changeState(GameState.WaitCancelTile);
        
        var row: number;
        var col: number;
        var color: TileColor = tile.color;
        var checkTile: TileUI;
        var resultList: Array<TileUI> = [];    //结果列表
        var checkList: Array<TileUI> = [];   //待检查列表
        checkList.push(tile);
        tile.isSelected = true;
        //开始检查
        while(checkList.length > 0) { 
            //从待检查列表开头开始检查
            row = checkList[0].row;
            col = checkList[0].col;
            //检查上方
            this.checkLine(row - 1,col,color,checkList);
            //检查下方
            this.checkLine(row +1,col,color,checkList);
            //检查左方
            this.checkLine(row,col-1,color,checkList);
            //检查右方
            this.checkLine(row,col+1,color,checkList);
            //处理当前检查的方块
            checkTile = checkList.shift();
            resultList.push(checkTile);
            //this.tileList[row][col] = null;
        }
                
        if(resultList.length > 1) {
            this.cancelTile(resultList);
        } else { 
            tile.isSelected = false;
            this.changeState(GameState.SelectTile);
        }
                
    }
            
    /**检查指定位置连线颜色相同的方块，将符合条件的方块存入待检查列表*/
    private checkLine(row:number, col:number ,color:TileColor, checkList:Array<TileUI>): void { 
        if(row >= 0 && row < this.rowMax && col >= 0 && col < this.colMax) { 
            var checkTile:TileUI = this.tileList[row][col];
            if(checkTile != null && checkTile.isSelected == false && checkTile.color == color) { 
                checkTile.isSelected = true;
                checkList.push(checkTile);
            }
        }
    }
            
        /**删除选中的方块*/
        private cancelTile(resultList:Array<TileUI>): void { 
            var len: number = resultList.length;
            var tile: TileUI;
            var row: number;
            var col: number;
            var endX: number;
            var endY: number;
            //计算得分
            this.setCurScore(this.curScore + len*this.baseScore + (len-2)*this.mutileScore);
 
            
            //从舞台移除选中的方块
            for(var i: number = 0;i < len;i++) { 
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
            //垂直方向排列方块
            for(var i: number = 0;i<this.rowMax-1;i++) { 
                for(var j: number = 0;j < this.colMax;j++) { 
                    tile = this.tileList[i][j];
                    if(tile != null) { 
                        for(var n: number = i + 1;n < this.rowMax;n++) {  //该方块下方有空位置，则row+1
                            if(this.tileList[n][j] == null) { 
                                tile.row += 1;
                            }
                        }
                    }
                }
            }
            
            //水平方向排列方块
            for(var i: number = 0;i < this.colMax-1;i++) { 
                for(var j: number = 0;j < this.rowMax;j++) { 
                    tile = this.tileList[j][i];
                    if(tile != null) { 
                        break;
                    }
                }
                if(j == this.rowMax) {  //i整列为null，则将i列右边所有方块左移
                    for(var n: number = 0;n < this.rowMax;n++) { 
                        for(var m: number = i + 1;m < this.colMax;m++) { 
                            tile = this.tileList[n][m];
                            if(tile != null) { 
                                tile.col -= 1;
                            }
                        }
                    }
                }
            }

            //移动方块
            for(var i: number = this.rowMax-1; i>=0; i--) { 
                for(var j: number = 0; j < this.colMax; j++) { 
                    tile = this.tileList[i][j];
                    if(tile != null) { 
                        row = tile.row;
                        col = tile.col;
                        if(row != i || col != j) { 
                            endX = this.startX + this.tileWidth * col;
                            endY = this.startY + this.tileWidth * row;
                            this.tileList[i][j] = null;
                            if(this.tileList[row][col] != null) { 
                                console.log(row + "," + col+ "该位置不应该被覆盖");
                            }
                            this.tileList[row][col] = tile;
                           
                            egret.Tween.get(tile).to({ x: endX,y: endY },200, egret.Ease.backIn);
                        }
                    }
                }
            }
            
            //检查游戏是否结束
           this.checkGameOver();
        }
        
        /**播放星星粒子效果*/
        private playStarParticle(tile:TileUI): void { 
            var starParticle:StarParticle =  this.particlePool.getObject();
            
            starParticle.play(tile.x + this.tileWidth/2,tile.y + this.tileWidth/2,this.stage);
        }
        
        /**检查游戏是否结束*/
        private checkGameOver(): void { 
            var isOver: boolean = true;
            var tile: TileUI;
            var rightTile: TileUI;
            var buttomTile: TileUI;
            for(var i: number = 0;i < this.rowMax;i++) { 
                for(var j: number = 0;j < this.colMax;j++) { 
                    tile = this.tileList[i][j];
                    if(tile != null) {
                        //检查右边
                        if(j < this.colMax - 1) { 
                            rightTile = this.tileList[i][j + 1];
                            if(rightTile != null && rightTile.color == tile.color) { 
                                isOver = false;
                                break;
                            }
                        }
                       
                        //检查下边
                        if(i < this.rowMax - 1) { 
                            buttomTile = this.tileList[i + 1][j];
                            if(buttomTile != null && buttomTile.color == tile.color){ 
                                isOver = false;
                                break;
                            }
                        }
                    }
                }
                if(isOver == false) { 
                    break;
                }
            }
            
            if(isOver) {
                console.log("游戏结束");
                if(this.curScore >= this.targetScore) {
                    console.log("下一关");
                    SoundManager.play(SoundManager.snd_nextLevel);
                    this.nextLevelUI.visible = true;
                    this.nextLevel(++this.curLevel);
                } else { 
                    console.log("重新开始游戏");
                    SoundManager.play(SoundManager.snd_gameOver);
                    this.gameOverUI.visible = true;
                    this.nextLevel(1);
                }
            } else { 
                this.changeState(GameState.SelectTile);
            }
        }
        
        /**清理当前的方块*/
        private clearTile(): void { 
            var tile: TileUI;
            for(var i: number = 0;i < this.rowMax;i++) { 
                for(var j: number = 0;j < this.colMax;j++) { 
                    tile = this.tileList[i][j];
                    if(tile != null) { 
                        this.tilePool.returnObject(tile);
                        this.gameSprite.removeChild(tile);
                        this.tileList[i][j] = null;
                    }
                }
            }
        }
    
        /**设置当前分数*/
        private setCurScore(score: number):void { 
            this.curScore = score;
            this.curScoreLabel.text = score.toString();
        }
        
        /**设置目标分数*/
        private setTargetScore(): void { 
            this.targetScore = this.levelScoreList[this.curLevel-1];
            this.targetScoreLabel.text = "目标分数:" +this.targetScore;
        }
        
        /**设置当前关卡*/
        private setCurLevel(level:number): void { 
            this.curLevel = level;
            this.curLevelLabel.text = "关卡:" + level.toString();
        }
}














