/**
 * 游戏场景
 * @author 
 */
class GameScene extends egret.DisplayObjectContainer{
    
    //----------------UI组件------------------
    private sceneBg: egret.Bitmap;      //场景背景
    private startBtn: egret.Bitmap;     //开始按钮
    private gameBg: egret.Bitmap;       //游戏背景
    private refreshBg: egret.Bitmap;    //刷新区域背景
    private refreshMask: egret.Bitmap;  //刷新半透明遮罩
    private scoreBarUI: ScoreBarUI;     //分数条
    private resultPanel: ResultPanel;   //结算面板
    
    //----------------游戏变量-----------------
    private _stage: egret.Stage;      //舞台
    private curGameState: GameState;  //当前游戏状态
    private rectPool: ObjectPool;     //方块对象池
    private rowMax: number = 12;      //行最大值
    private colMax: number = 10;      //列最大值
    private cellWidth: number = 40;   //单位高宽
    private rectList: Array<any>;     //方块列表
    private startX: number;           //方块起始位置
    private startY: number;      
    private refreshList: Array<Rect> = []; //刷新方块列表
    private gameTimer: egret.Timer;   //游戏计时
    public score: number = 0;         //当前分数
    public picScale: number = 1;      //图片比例

	public constructor() {
        super();
        this.initConfig();
        this.initView();
	}
	
    private initConfig(): void {
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
    }
	
    private initView(): void {
        this._stage = GameConst.stage;
        this.rectPool = ObjectPool.getPool(Rect.NAME,this.rowMax * this.colMax);
        this.rectList = [];
        for(var i: number = 0;i < this.rowMax;i++) {
            this.rectList[i] = new Array<Rect>();
        }

        this.sceneBg = new egret.Bitmap(RES.getRes("bg_png"));
        this.sceneBg.width = this._stage.stageWidth;
        this.sceneBg.height = this._stage.stageHeight;
        this.addChild(this.sceneBg);
        
        this.scoreBarUI = new ScoreBarUI();
        this.scoreBarUI.x = (this._stage.stageWidth - this.scoreBarUI.scoreBg.width) / 2;
        this.scoreBarUI.y = this._stage.stageHeight/20;
        this.addChild(this.scoreBarUI);
        
        this.gameBg = new egret.Bitmap(RES.getRes("gamebg_png"));
        this.gameBg.x = (this._stage.stageWidth - this.gameBg.width) / 2;
        this.gameBg.y = this._stage.stageHeight/5.5;
        this.addChild(this.gameBg);
        this.startX = this.gameBg.x + (this.gameBg.width - this.cellWidth*this.colMax)/2;
        this.startY = this.gameBg.y - 8 + this.gameBg.height - this.cellWidth*this.rowMax;
        
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
        

        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
    }
    
    private startGame(): void {
        this.removeChild(this.startBtn);
        this.createRect();
        this.createRefreshRect();
        this.startTimer();
        this.changeState(GameState.SelectRect);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private resetGame(): void {
        
    }

    private gameOver(): void {
        this.stopTimer();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
        this.showResult();
    }
    
    private changeState(state: GameState): void {
        this.curGameState = state;
    }

    //创建方块
    private createRect(): void {
        var rand: number;
        var rect: Rect;
        for(var i: number = 4;i < this.rowMax;i++) {
            for(var j: number = 0;j < this.colMax;j++) {
                rand = Math.floor(Math.random() * 3);  //随机0-2
                rect = this.rectPool.getObject();
                rect.scaleX = this.picScale;
                rect.scaleY = this.picScale;
                rect.changeColor(<RectColor>rand);
                rect.row = i;
                rect.col = j;
                rect.isSelected = false;
                rect.x = this.startX + this.cellWidth * j;
                rect.y = this.startY + this.cellWidth*i;
                this.addChild(rect);
                this.rectList[i][j] = rect;
            }
        }
        
    }
    
    //增加刷新区域方块
    private createRefreshRect(): void {
        var rand: number;
        var rect: Rect;
        for(var i:number = 0;i < this.colMax;i++) {
            rand = Math.floor(Math.random() * 3);  //随机0-2
            rect = this.rectPool.getObject();
            rect.scaleX = this.picScale;
            rect.scaleY = this.picScale;
            rect.changeColor(<RectColor>rand);
            rect.row = this.rowMax - 1;
            rect.col = i;
            rect.isSelected = false;
            rect.x = this.refreshMask.x + this.cellWidth*i;
            rect.y = this.refreshMask.y ;
            this.addChild(rect);
            this.refreshList[i] = rect;
        }
        this.addChild(this.refreshMask);
    }
    
    //刷新方块
    private refreshRect(): void {
        var rect: Rect;
        //判断游戏结束
        for(var i: number = 0;i < this.colMax;i++) {
            if(this.rectList[0][i] != null) {
                this.gameOver();
                return;
            }
        }
        
        //将所有游戏区域方块上移动
        for(i = 1;i < this.rowMax;i++) {
            for(var j: number = 0; j < this.colMax; j++){
                rect = this.rectList[i][j];
                if(rect) {
                    rect.row -= 1;
                    this.rectList[i - 1][j] = rect;
                    //this.rectList[i][j] = null;
                }
            }
        }
        
        
        //将刷新区域方块上移
        for(i = 0;i < this.colMax;i++) {
            this.rectList[this.rowMax - 1][i] = this.refreshList[i];
        }
        this.refreshList.length = 0;
        
        //移动方块
        this.moveRect();
        
    }
    
    private onTouchTap(e:egret.TouchEvent): void {
        if(e.target instanceof Rect) {
            this.checkRect(e.target);
        } 
    }

    //检查方块
    public checkRect(rect: Rect): void {
        if(this.curGameState != GameState.SelectRect) {
            return;
        }
        this.changeState(GameState.WaitCancelRect);

        var row: number;
        var col: number;
        var color: RectColor = rect.color;
        var checkTile: Rect;
        var resultList: Array<Rect> = [];    //结果列表
        var checkList: Array<Rect> = [];   //待检查列表
        checkList.push(rect);
        rect.isSelected = true;
        //开始检查
        while(checkList.length > 0) { 
            //从待检查列表开头开始检查
            row = checkList[0].row;
            col = checkList[0].col;
            //检查上方
            this.checkLine(row - 1,col,color,checkList);
            //检查下方
            this.checkLine(row + 1,col,color,checkList);
            //检查左方
            this.checkLine(row,col - 1,color,checkList);
            //检查右方
            this.checkLine(row,col + 1,color,checkList);
            //处理当前检查的方块
            checkTile = checkList.shift();
            resultList.push(checkTile);
        }

        if(resultList.length > 2) {
            this.cancelTile(resultList);
        } else {
            for(var i: number = 0;i < resultList.length;i++) {
                resultList[i].isSelected = false;
            }
            this.changeState(GameState.SelectRect);
        }
    }
    
    //检查指定位置连线颜色相同的方块，将符合条件的方块存入待检查列表
    private checkLine(row: number,col: number,color: RectColor,checkList: Array<Rect>): void {
        if(row >= 0 && row < this.rowMax && col >= 0 && col < this.colMax) {
            var checkTile: Rect = this.rectList[row][col];
            if(checkTile != null && checkTile.isSelected == false && checkTile.color == color) {
                checkTile.isSelected = true;
                checkList.push(checkTile);
            }
        }
    }
    
    /**删除选中的方块*/
    private cancelTile(resultList: Array<Rect>): void {
        var len: number = resultList.length;
        var rect: Rect;
        var row: number;
        var col: number;
        //计算得分
        this.score += len * 10 + 20 +(len - 3)*10;
        this.scoreBarUI.setScore(this.score);
   
        //从舞台移除选中的方块
        for(var i: number = 0;i < len;i++) {
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
        
        //垂直方向排列方块
        for(var i: number = this.rowMax-2;i>=0;i--) {  //总倒数第二行开始计算
            for(var j: number = 0;j < this.colMax;j++) {
                rect = this.rectList[i][j];
                if(rect != null) {
                    for(var n: number = i + 1;n < this.rowMax;n++) {  //该方块下方有空位置，则row+1
                        if(this.rectList[n][j] == null) {
                            rect.row += 1;
                        }
                    }
                    this.rectList[i][j] = null;
                    this.rectList[rect.row][rect.col] = rect;
                }
            }
        }
            
        //右边水平方向排列方块
        var halfCol: number = this.colMax / 2;
        for(var i: number = this.colMax-2;i >=halfCol;i--) {  //从倒数第二列开始判断
            for(var j: number = 0;j < this.rowMax;j++) {
                rect = this.rectList[j][i];
                if(rect != null) {
                    break;
                }
            }
            if(j == this.rowMax) {  //i整列为null
                for(var n: number = 0;n < this.rowMax;n++) {
                    for(var m: number = i + 1;m < this.colMax;m++) {
                        rect = this.rectList[n][m];
                        if(rect != null) {
                            rect.col -= 1;
                            this.rectList[n][m] = null;
                            this.rectList[rect.row][rect.col] = rect;
                        }
                    }
                }
            }
        }
        
        //左边水平方向排列方块
        for(var i: number = 1;i <halfCol ;i++) {  //从第2列开始判断
            for(var j: number = 0;j < this.rowMax;j++) {
                rect = this.rectList[j][i];
                if(rect != null) {
                    break;
                }
            }
            if(j == this.rowMax) {  //i整列为null
                for(var n: number = 0;n < this.rowMax;n++) {
                    for(var m: number = i-1;m>=0;m--) {
                        rect = this.rectList[n][m];
                        if(rect != null) {
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
    }
    
    //移动方块
    private moveRect(): void {
        var rect: Rect;
        var row: number;
        var col: number;
        var endX: number;
        var endY: number;
        for(var i: number = 0;i <this.rowMax;i++) {
            for(var j: number = 0;j < this.colMax;j++) {
                rect = this.rectList[i][j];
                if(rect != null) {
                    row = rect.row;
                    col = rect.col;
                    endX = this.startX + this.cellWidth * col;
                    endY = this.startY + this.cellWidth * row;
                    egret.Tween.get(rect).to({ x: endX,y: endY },200,egret.Ease.backIn);
                }
            }
        }

        var self: GameScene = this;
        egret.Tween.get(this).wait(200).call(function(): void {
            if(self.curGameState == GameState.RefreshRect) {
                self.createRefreshRect();
            }
            self.changeState(GameState.SelectRect);
        });
    }
    
    
    private startTimer(): void {
        if(this.gameTimer == null) {
            this.gameTimer = new egret.Timer(20);
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private refreshCount: number = 0;
    private levelupCount: number = 0;
    private onTimerHandler(): void {
        this.refreshCount += 0.02;
        this.levelupCount += 0.02;
        //方块刷新
        
        if(this.refreshCount >= (GameConst.refreshTime/50)) {
            this.refreshCount = 0;
            this.refreshMask.scaleY -= 0.02;
            if(this.refreshMask.scaleY <= 0) {
                this.changeState(GameState.RefreshRect);
                this.refreshMask.scaleY = 1;
                this.refreshRect();
            }
        }
        //难度提升
        if(this.levelupCount >= GameConst.levelUpTime) {
            this.levelupCount = 0;
            GameConst.refreshTime -= GameConst.reduceTime;
            if(GameConst.refreshTime < 0) {
                GameConst.refreshTime = 0;
            }
        }
    }
    
    private stopTimer(): void {
        if(this.gameTimer != null) {
            this.gameTimer.stop();
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        }
    }
    
    private showResult(): void {
        this.resultPanel.show(this);

        var curZhe: number = this.scoreBarUI.curZhe;
        
        //拼显示内容
        var msg: string = "";
        if(curZhe <= 0) {
            msg += "很遗憾，未获得折扣";
        } else {
            msg += "获得:" + curZhe + "折";
            msg += "\n￥1000" + "   -￥" + Math.round(1000 * (1 - curZhe / 10));
        }
        msg += "\n获得天天币:" + 100;
        this.resultPanel.setText(msg);
    }
}


