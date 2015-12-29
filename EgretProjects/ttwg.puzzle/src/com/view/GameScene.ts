/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends egret.DisplayObjectContainer{
    
    private gameBg: egret.Bitmap;       //游戏背景
    private scoreBarUI: ScoreBarUI;     //分数条UI
    private timerUI: TimerUI;           //计时UI
    private startBtn: egret.Bitmap;     //开始按钮
    private resultPanel: ResultPanel;   //结算面板
    
    private pic: egret.Bitmap;          //拼图
    private picX: number;               //拼图位置
    private picY: number;
    
    private curLevel: number = 0;        //当前关卡
    private rectNumList: Array<any>;     //挖图数量
    private rectList: Array<RectUI> = [];//镂空方块
    private pieceList: Array<PieceUI> = [];//碎片
    
    private scrollView: egret.ScrollView;//滚动窗口
    private pieceContainer: egret.DisplayObjectContainer;//碎片容器
    private cellWidth: number;           //切片高宽
    private halfCellWidth: number;       //切片一半高宽
    
    private gameTimer: egret.Timer = new egret.Timer(1000);  //计时器
    private timeLimit: number;           //时间限制
    
    private score: number;               //当前分数
    
    private mStage: egret.Stage;         //舞台
    
	public constructor() {
        super();
        this.initConfig();
        this.initView();
	}

    private initConfig(): void {
        var json = RES.getRes("config_json");
        
        GameConst.scoreList = json.scoreList;
        GameConst.discountList = json.discountList;
        GameConst.scoreMax = (json.scoreList[json.scoreList.length - 1]);
        GameConst.timeLimit = json.timeLimit;
        this.rectNumList =  json.rectNumList;
    }
    
    private initView(): void {
        this.mStage = GameConst.stage;
        this.cellWidth = GameConst.cellWidth;
        this.halfCellWidth = this.cellWidth / 2;
        
        this.picX = 0;
        this.picY = Math.floor(this.mStage.stageHeight / 4.2);
        
        this.gameBg = new egret.Bitmap(RES.getRes("gamebg_png"));
        this.addChild(this.gameBg);

        this.timerUI = new TimerUI();
        this.timerUI.x = (this.mStage.stageWidth - this.timerUI.width) / 2;
        this.timerUI.y = this.mStage.stageHeight/50;
        this.addChild(this.timerUI);
        
        this.scoreBarUI = new ScoreBarUI();
        this.scoreBarUI.x = (this.mStage.stageWidth - this.scoreBarUI.scoreBg.width) / 2;
        this.scoreBarUI.y = this.mStage.stageHeight /10;
        this.addChild(this.scoreBarUI);
        
        this.pieceContainer = new egret.DisplayObjectContainer();
        
        this.scrollView = new egret.ScrollView();
        this.scrollView.width = 450;
        this.scrollView.height = 100;
        this.scrollView.x = 0;
        this.scrollView.y = this.mStage.stageHeight / 1.18;
        this.scrollView.setContent(this.pieceContainer);
        this.scrollView.scrollBeginThreshold = 1;
        this.scrollView.horizontalScrollPolicy = "off";
        this.scrollView.verticalScrollPolicy = "off";
        this.addChild(this.scrollView);
        
        this.startBtn = new egret.Bitmap(RES.getRes("start_png"));
        this.startBtn.x = (this.mStage.stageWidth - this.startBtn.width) / 2;
        this.startBtn.y = (this.mStage.stageHeight - this.startBtn.height) / 2;
        this.startBtn.touchEnabled = true;
        this.addChild(this.startBtn);
        
        this.resultPanel = new ResultPanel();
        
        this.scrollView.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onScollViewTouch,this);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.startGame,this);
    }
    
    private startGame(): void {
        this.startBtn.parent && this.removeChild(this.startBtn);
        this.startTimer();
        this.resetGame();
        this.createPic();
        this.createRect();
        this.createPiece();
        
    }
    
    private resetGame(): void {
        //重置变量
        this.timeLimit = GameConst.timeLimit;
        this.score = 0;
        //重置UI
        this.resultPanel.hide();
        this.timerUI.setTimeText(this.timeLimit);
        this.scoreBarUI.setScore(0);
        this.scoreBarUI.curDiscount = 0;
        //清理数据
        var len:number = this.rectList.length;
        for(var i: number = 0;i < len;i++) {
            var rectUI: RectUI = this.rectList[i];
            rectUI.parent && rectUI.parent.removeChild(rectUI);
        }
        this.rectList.length = 0;
        
        len = this.pieceList.length;
        for(i = 0;i < len;i++) {
            var piece: PieceUI = this.pieceList[i];
            piece.parent && piece.parent.removeChild(piece);
        }
        this.pieceList.length = 0;
        
        this.pic && this.pic.parent && this.pic.parent.removeChild(this.pic);
        this.pic = null;
    }
    
    //下一关
    private nextLevel(): void {
        this.curLevel++;
        this.startGame();
    }
    
    //检查是否游戏结束
    private checkGameOver(): void {
        if(this.pieceContainer.numChildren <= 0) {
            if(this.curLevel >= this.rectNumList.length - 1) {
                this.gameOver();
            } else {
                this.nextLevel();
            }
        }
    }
    
    private gameOver(): void {
        //移除监听
        this.stopTimer();
        this.scrollView.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onScollViewTouch,this);
        
        this.showResult();
    }
    
    
    //创建图片
    private createPic(): void {
        this.pic = new egret.Bitmap(RES.getRes("pic" + this.curLevel + "_jpg"));
        this.pic.x = this.picX;
        this.pic.y = this.picY;
        this.addChild(this.pic);
    }
	
    //创建镂空方块
    private createRect(): void {
        var rectNum: number = this.rectNumList[this.curLevel];
        var picWidth: number = this.pic.width;
        var picHeight: number = this.pic.height;
        var row: number;
        var col: number;
        if(rectNum <= 6) { //图片数量不同时，划分的格子数量不同
            row = 3;
            col = 3;
        } else {
            row = 4;
            col = 4;
        }
        var gridWidth: number = Math.floor(picWidth / col);  //格子高宽
        var gridHeight: number = Math.floor(picHeight / row);

        var posList: Array<any> = [];   //获取rowxcol格子的随机位置
        var startX: number;
        var endX: number;
        var startY: number;
        var endY: number;
        var xPos: number;
        var yPos: number;
        for(var i: number = 0;i < row;i++) {
            for(var j: number = 0;j < col;j++) {
                if(i % 2 == 0 && j < col - 1) {   //奇数行
                    startX = j * gridWidth + Math.floor(gridWidth / 2);
                    endX = j * gridWidth + gridWidth - this.cellWidth + Math.floor(gridWidth / 2);
                } else if(i % 2 != 0) {  //偶数行
                    startX = j * gridWidth;
                    endX = j * gridWidth + gridWidth - this.cellWidth;
                } else {
                    continue;
                }

                startY = i * gridHeight;
                endY = i * gridHeight + gridHeight - this.cellWidth;
                xPos = NumberTool.getRandomInt(startX,endX);
                yPos = NumberTool.getRandomInt(startY,endY);
                posList.push([xPos,yPos]);
            }
        }

        for(var i: number = rectNum - 1;i >= 0;i--) {  //将rect随机分配到位置上
            //优先分配中间2张
            var index: number;
            if(i <= rectNum - 2) {
                var percent4: number = Math.floor(posList.length / 4);
                index = NumberTool.getRandomInt(percent4,percent4 * 2);
            } else {
                index = NumberTool.getRandomInt(0,posList.length - 1);
            }
            var pos: Array<any> = posList[index];
            posList.splice(index,1);
            var rect: RectUI = new RectUI();
            rect.ID = i;
            rect.x = this.picX + pos[0];
            rect.y = this.picY + pos[1];

            this.addChild(rect);
            this.rectList.push(rect);
        }
    }
    
    //创建碎片
    private createPiece(): void {
        var len: number = this.rectList.length;
        for(var i: number = 0;i < len;i++) {
            var rectUI: RectUI = this.rectList[i];
            var rect: egret.Rectangle = new egret.Rectangle(rectUI.x - this.picX,rectUI.y - this.picY,this.cellWidth,this.cellWidth);
            var texture: egret.MyRenderTexture = new egret.MyRenderTexture();
            texture.drawToTexture(this.pic,rect,1);
            var piece: PieceUI = new PieceUI(texture);
            piece.touchEnabled = true;
            piece.anchorOffsetX = this.halfCellWidth;
            piece.anchorOffsetY = this.halfCellWidth;
            piece.x = this.cellWidth* i + 10*(i+1) + this.halfCellWidth;
            piece.y = this.halfCellWidth;
            piece.ID = rectUI.ID;
            this.pieceContainer.addChild(piece);
            this.pieceList.push(piece);
        }
    }
    
    private dragPiece: PieceUI;
    private dragPieceX: number;
    private dragPieceY: number;
    private disX: number;
    private disY: number;
    //点击滚动组件
    private onScollViewTouch(e:egret.TouchEvent): void {
        console.log("tap:",e.target);
        if(e.target instanceof PieceUI) {
            this.dragPiece = e.target;
            this.dragPieceX = e.target.x;
            this.dragPieceY = e.target.y;
            this.addChild(this.dragPiece);
            this.dragPiece.x = e.stageX;
            this.dragPiece.y = e.stageY;  
            
            egret.Tween.get(this.dragPiece).to({ rotation: 36000 },500000);
            
            this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
    }
    
    //移动碎片
    private onTouchMove(e: egret.TouchEvent): void {
        this.dragPiece.x = e.stageX;
        this.dragPiece.y = e.stageY;
    }
    
    //松开碎片
    private onTouchEnd(e: egret.TouchEvent): void {
        console.log("end");
        //取消监听
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        egret.Tween.removeTweens(this.dragPiece);
        this.dragPiece.rotation = 0;
        
        //判断拼图是否适合镂空位置
        var len: number = this.rectList.length;
        for(var i: number = 0;i < len;i++) {
            var rectUI: RectUI = this.rectList[i];
            if( this.checkColloise(this.dragPiece, rectUI) && rectUI.ID == this.dragPiece.ID) {
                egret.Tween.get(this.dragPiece).to({
                    x: rectUI.x + this.halfCellWidth,
                    y: rectUI.y + this.halfCellWidth
                },100);
                this.sortScrollView();
                this.scoreBarUI.setScore(this.score += GameConst.pieceScore);
                this.checkGameOver();
                return;
            }
        }
        var self: GameScene = this;
        var xPos: number = this.scrollView.x + this.dragPieceX;
        var yPos: number = this.scrollView.y + this.dragPieceY;
        egret.Tween.get(this.dragPiece).to({ x: xPos,y:yPos},100).call(function() {
            self.dragPiece.x = self.dragPieceX;
            self.dragPiece.y = self.dragPieceY;
            self.pieceContainer.addChild(self.dragPiece);
            });
        
    }

    //检查碎片和镂空位置是否符合
    private checkColloise(piece:PieceUI, rectUI:RectUI): boolean {
        if((this.dragPiece.x > (rectUI.x - this.halfCellWidth)
            && this.dragPiece.x < (rectUI.x + this.cellWidth + this.halfCellWidth))
            && (this.dragPiece.y > (rectUI.y - this.halfCellWidth)
                && this.dragPiece.y < (rectUI.y + this.cellWidth + this.halfCellWidth))){
            return true;
                }
        return false;
    }
    
    //排列滚动区域
    private sortScrollView(): void {
        var len: number = this.pieceList.length;
        var count: number = 0;
        for(var i: number = 0;i < len;i++) {
            var piece: PieceUI = this.pieceList[i];
            if(piece.parent == this.pieceContainer) {
                var xPos: number = this.cellWidth * count + 10 * (count + 1) + this.halfCellWidth;
                var yPos: number = this.halfCellWidth;
                egret.Tween.get(piece).to({ x: xPos,y: yPos },200);
                count++;
            }
        }
    }
    
    
    
    private startTimer(): void {
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onTimerHandler(): void {
        this.timeLimit--;
        this.timerUI.setTimeText(this.timeLimit);
        if(this.timeLimit <= 0) {
            this.gameOver();
        }
    }
    
    private stopTimer(): void {
        this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        this.gameTimer.stop();
    }
    
    private showResult(): void {
        this.resultPanel.show();

        var curZhe: number = this.scoreBarUI.curDiscount;
        
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














