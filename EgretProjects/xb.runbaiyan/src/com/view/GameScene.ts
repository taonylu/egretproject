/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    
    private gridBgGroup: eui.Group;      //格子背景Group，用于缓存位图减少drawcall数
    private gridBgList = [];             //格子背景数组
    private gridList = [];               //格子数组，保存已占的格子
    private rowMax: number = 9;          //行最大值
    private colMax: number = 9;          //列最大值
    private gridStartX: number = 60;     //格子起始坐标x
    private gridStartY: number = 33;     //格子起始坐标y
    private gridIntervalX: number = 62;  //格子水平间隔
    private gridIntervalY: number = 56;  //格子垂直间隔
    
    private resultGroup: eui.Group;      //结果容器
    private luckBtn: eui.Image;          //抽奖
    private lookBtn: eui.Image;          //查看获奖
    private shareBtn: eui.Image;         //通知好友
    private againBtn: eui.Image;         //再玩一次
    private successText: eui.Image;      //成功文本
    private failText: eui.Image;         //失败文本
    private water: Water;                //水动画
    
    private luckGroup: eui.Group;        //获奖结果列表容器
    private luckScroller: eui.Scroller;  //滚动容器
    private luckScrollerGroup: eui.Group;//scroller的group
    private okBtn: eui.Image;            //我知道了按钮
    
    public player: Player = new Player();//玩家
    private playerGroup: eui.Group;       //玩家容器
    private initPlayerRow: number = 4;    //玩家初始行列
    private initPlayerCol: number = 4;
    
    private gridGroup: eui.Group;         //格子Group，用于存放player和已占用格子
    private randGridLimit: number = 16;   //随机生成已占用格子
    private gridPool: ObjectPool = ObjectPool.getPool(Grid.NAME,20);  //已占用格子对象池
    
    private map: MapManager = new MapManager(); //地图类

	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initGrid();
        this.map.mapList = this.gridBgList;
        this.luckScroller.scrollPolicyV = eui.ScrollPolicy.ON;
    }
	
    public onEnable(): void {
        this.startGame();
    }
    
    public onRemove(): void {
        this.resetGame();
    }
    
    private startGame(): void {
        this.resetGame();
        
        this.randGrid();      //随机生成已占用格子
        
        this.gridBgGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onPlaceGrid,this);
    }
    
    private gameOver(bWin:Boolean): void {
        this.showResult(bWin);
    }
    
    private resetGame(): void {
        this.resetPlayer();
        this.resetMap();
        this.hideResult();
        this.hideLuck();
        this.hideWater();
    }
    
    private onPlaceGrid(e:egret.TouchEvent): void {
        if(e.target instanceof GridBg) {
            
            //格子已占用，则不操作
            var gridBg: GridBg = <GridBg>e.target;
            if(gridBg.bHave) {
                return;
            }
            //寻路中，则不操作
            if(this.map.isPlayTurn == false) {
                return;
            }
            //添加一个格子
            gridBg.bHave = true;
            var grid:Grid = this.gridPool.getObject();
            grid.x = gridBg.x;
            grid.y = gridBg.y;
            this.gridList.push(grid);
            this.gridGroup.addChild(grid);
            //判断游戏是否结束
            if(this.checkGameOver() == false) {
                this.movePlayer();   
            }
        }
    }
    
    private checkGameOver(): Boolean {
        var row: number = this.player.row;
        var col: number = this.player.col;
        //玩家在最边缘，则游戏结束
        if(row == 0 || row == this.rowMax-1 || col == 0 || col == this.colMax-1) {
            this.gameOver(false);
            return true;
        }
        //判断玩家四周格子是否占用
        var offerCol: number = (row % 2 == 0) ? -1 : 0;  //0,2偶数行-1

        if(this.gridBgList[row - 1][col + offerCol].bHave &&
            this.gridBgList[row - 1][col + offerCol + 1].bHave &&
            this.gridBgList[row][col - 1].bHave &&
            this.gridBgList[row][col + 1].bHave &&
            this.gridBgList[row + 1][col + offerCol].bHave &&
            this.gridBgList[row + 1][col + offerCol + 1].bHave) 
        {
            this.gameOver(true);
            return true;          
        }
        //玩家不在边缘，并且四周格子未占满，则游戏继续
        return false;   
    }
    
    
    private movePlayer(): void {
        var row: number = this.player.row;
        var col: number = this.player.col;

        this.map.lock();
        var pathes: any[] = this.map.findPath(this.gridBgList[row][col]);
        if(pathes.length) {
            var path: number[] = pathes[0];
            var gridBg:GridBg = this.gridBgList[path[0]][path[1]];
            var self: GameScene = this;
            this.player.row = gridBg.row;
            this.player.col = gridBg.col;
            egret.Tween.get(this.player).to({ x: gridBg.x,y: gridBg.y },100).call(function() {
                self.map.unlock();
                //当点击自己所在格子位置时，移动完成后是否结束
                var result = self.map.getNear(gridBg);
                if(result.length == 0) {
                    self.gameOver(true);
                }
            });  
        } else {
            console.log("win");
            this.gameOver(true);
        }
    }
    
    
    private randGrid(): void {
        var count: number = 0;
        var randRow: number;
        var randCol: number;
        var grid: Grid;
        var gridBg: GridBg;
        for(var i: number = 0;i < this.randGridLimit;i++) {
            randRow = Math.floor(Math.random()*this.rowMax);
            randCol = Math.floor(Math.random() * this.colMax);
            
            //生成在玩家所在格子，则重新随机
            if(randRow == this.initPlayerRow && randCol == this.initPlayerCol) {
                i--;
                continue;
            }
                
            //已占用，则重新随机
            gridBg = this.gridBgList[randRow][randCol];
            if(gridBg.bHave) {  
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
    }
    
    
    
    private initGrid(): void {
        //初始化格子背景 
        var gridBg: GridBg;
        for(var i: number = 0;i < this.rowMax;i++) {
            this.gridBgList[i] = [];
            for(var j: number = 0;j < this.colMax;j++) {
                gridBg = new GridBg();
                gridBg.row = i;
                gridBg.col = j;
                if(i % 2 == 0) {  //奇数行缩进30
                    gridBg.x = this.gridStartX + j * this.gridIntervalX;
                } else {
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
    }

    private resetPlayer(): void {
        var gridBg: GridBg = this.gridBgList[this.initPlayerRow][this.initPlayerCol];
        this.player.x = gridBg.x;
        this.player.y = gridBg.y;
        this.player.row = this.initPlayerRow;
        this.player.col = this.initPlayerCol;
        this.player.shakeHead();
        this.playerGroup.addChild(this.player);
    }
    
    private resetMap(): void {
        //解锁地图
        this.map.unlock();
        
        //回收占用格子
        var len: number = this.gridList.length;
        var grid: Grid;
        for(var i: number = 0;i < len;i++) {
            grid = this.gridList[i];
            this.gridGroup.removeChild(grid);
            this.gridPool.returnObject(grid);
        }
        this.gridList.length = 0;
        
        //重置格子占用状态
        var gridBg: GridBg;
        for(var i: number = 0;i < this.rowMax;i++) {
            for(var j: number = 0;j < this.colMax;j++){
                gridBg = this.gridBgList[i][j];
                gridBg.bHave = false;
            }
        }
    }
    
    private showResult(bWin:Boolean): void {
        if(bWin) {
            //显示成功
            this.successText.visible = true;
            this.failText.visible = false;
            this.luckBtn.visible = true;
            
        } else {
            //显示失败
            this.successText.visible = false;
            this.failText.visible = true;
            this.luckBtn.visible = false;
        }
        this.addChild(this.resultGroup);
        
        //按钮监听
        this.configResultListener();
        
    }
    
    private hideResult(): void {
        this.removeChild(this.resultGroup);
        this.deConfigResultListener();
    }
    
    private configResultListener(): void {
        this.lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLookBtnTouch,this);
        this.luckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onLuckBtnTouch,this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.againBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    private deConfigResultListener(): void {
        this.lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLookBtnTouch,this);
        this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onLuckBtnTouch,this);
        this.shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onShareBtnTouch,this);
        this.againBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onAgainBtnTouch,this);
    }
    
    private onLookBtnTouch(): void {
        this.deConfigResultListener();
        window['getPrizeList']();
        
    }
    
    private recivePrizeListResult(json): void {
        if(json != null) {
            //alert("egret接受后:" + json[0].nickname);
            this.removeChild(this.resultGroup);
            this.showLuckList(json);
        }
        this.configResultListener();
    }
    
    private onLuckBtnTouch(): void {
        //点击抽奖
        this.deConfigResultListener();
        window['sendGetPrize']();
        
        
    }
    
    public reciveLuckResult(json): void {
        if(json != null) {
            GameConst.prizeJson = json;
            
            if(json.code != 200) {
                alert(json.msg);
            } else {
                LayerManager.getInstance().runScene(GameManager.getInstance().resultScene);
            } 
        }
        this.configResultListener();
    }
    
    private onShareBtnTouch(): void {
        if(this.water == null) {
            this.water = new Water();
        }
        this.water.x = this.shareBtn.x;
        this.water.y = this.shareBtn.y;
        this.water.reset();
        this.addChild(this.water);
        egret.Tween.get(this.water).to({ x: -this.water.width },200).
            to({ y: 0 },10).
            to({ x: GameConst.stage.stageWidth - this.water.width },600).
            call(this.showWater,this);
    }
    
    private showWater(): void {
        var self: GameScene = this;
        this.water.addEventListener("waterComplete",function() {
            self.water.parent && self.removeChild(self.water);
        },this);
        this.water.play();
    }
    
    private hideWater(): void {
        this.water && this.water.parent && this.water.parent.removeChild(this.water);
    }
    
    private onAgainBtnTouch(): void {
        this.startGame();
    }
    
    
    
    private hideLuck(): void {
        this.luckGroup.parent && this.removeChild(this.luckGroup);
    }
    
    private showLuckList(json): void {
        this.addChild(this.luckGroup);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOKBtnTouch,this);

        for(var i: number = 0;i < 50;i++) {
            if(json[0] == null) {
                break;
            }
            var luckText: LuckText = new LuckText()
            luckText.setNameLabel(json[i].nickname);
            luckText.setPrizeLabel(json[i].prizemsg);
            this.luckScrollerGroup.addChild(luckText);
        }
    }
    
    private onOKBtnTouch(): void {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOKBtnTouch,this);
        this.removeChild(this.luckGroup);
        this.luckScroller.viewport.scrollV = 0;
        
        this.addChild(this.resultGroup);
        this.configResultListener();
    }
    
	
}







