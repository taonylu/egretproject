/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private fallMoneyList: Array<egret.Bitmap>;  //掉钱数组
    private fallMoneyGroup: eui.Group;           //掉钱容器
    private fallEdge: number;                    //掉钱下边界
    
    private moneyLabel: eui.Label;               //获得钱总数文本
    private countMoneyList: Array<egret.Bitmap>; //数钱数组
    private staticMoney: eui.Image;              //固定的钱
    private totalMoney: number = 0;              //当前钱总数
    private moneyValue: number = 100;            //一张钱的价值
    
    private timeLabel: eui.Label;                //计时文本
    private timeLimit: number = 3;               //时间限制
    private gameTimer: egret.Timer;              //游戏计时器
    
    private resultUI: ResultUI = new ResultUI(); //结果UI
    
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initFallMoney();
        this.initCountMoney();
    }

    public onEnable(): void {
        this.startGame();
    }

    public onRemove(): void {

    }
    
    public startGame(): void {
        this.resetGame();
        
        this.addEventListener(egret.TouchEvent.ENTER_FRAME,this.onFallMoney,this);
        this.staticMoney.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    private resetGame(): void {
        //重置下落的钱位置
        this.resetAllFallMoney();
        //重置时间
        this.setTimeLabel(this.timeLimit.toString());
        //重置钱总数
        this.totalMoney = 0;
        this.setMoneyLabel(this.totalMoney.toString());
    }
    
    private gameOver(): void {
        this.stopTimer();
        this.staticMoney.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        
        this.resultUI.showInScene(this,this.totalMoney);
        
    }
    
    
    private beginY: number;             //触摸初始位置
    private isDrag: Boolean = false;    //是否拖拽状态
    private curCountMoney: egret.Bitmap;//当前拖拽的钱
    
    private onTouchBegin(e:egret.TouchEvent): void {
        this.beginY = e.stageY;
        this.isDrag = true;
        this.curCountMoney = this.countMoneyList.pop();
        this.curCountMoney.x = this.staticMoney.x;
        this.curCountMoney.y = this.staticMoney.y;
        this.addChild(this.curCountMoney);
        
    }
    
    private onTouchMove(e: egret.TouchEvent): void {
        if(this.isDrag && this.curCountMoney) {
            this.curCountMoney.y += e.stageY - this.beginY;
            this.beginY = e.stageY;
        }
    }
    
    private onTouchEnd(e: egret.TouchEvent): void {
        
        //滑动距离超过一段距离
        if(this.isDrag && this.curCountMoney && (Math.abs(this.curCountMoney.y - this.staticMoney.y) > 10)) {
            //根据距离计算滑动时间
            var time: number = (this.curCountMoney.y / this.staticMoney.y) * 200;
            var tempMoney: egret.Bitmap = this.curCountMoney;
            this.curCountMoney = null;
            var self: GameScene = this;
            egret.Tween.get(tempMoney).to({ y: -tempMoney.height },time).call(function() {
                self.countMoneyList.push(tempMoney);
            });
            //计算钱
            this.totalMoney += this.moneyValue;
            this.setMoneyLabel(this.totalMoney.toString());
            //第一张钱滑动后，开始计时
            if(this.totalMoney == this.moneyValue) {
                this.startTimer();
            } 
        }
        
        //重置拖拽状态
        this.isDrag = false;
    }
    
    
    //初始化数钱数组
    private initCountMoney(): void {
        this.countMoneyList = new Array<egret.Bitmap>();
        var bm: egret.Bitmap;
        for(var i: number = 0;i < 10;i++) {
            bm = new egret.Bitmap(RES.getRes("m0_png"));
            this.countMoneyList.push(bm);
        }
    }
    
    //初始化下落的钱
    private initFallMoney(): void {
        this.fallMoneyList = new Array<egret.Bitmap>();
        var bm: egret.Bitmap;
        for(var i: number = 0;i < 3;i++) {
            bm = new egret.Bitmap(RES.getRes("d0_png"));
            bm.anchorOffsetX = bm.width / 2;
            bm.anchorOffsetY = bm.height / 2;
            this.fallMoneyList.push(bm);
            this.resetFallMoneyPos(bm);
            this.fallMoneyGroup.addChild(bm);
        }
        this.fallEdge = GameConst.stage.stageHeight + bm.height;
    }
    
    //下落钱处理函数
    private onFallMoney(): void {
        var len = this.fallMoneyList.length;
        var bm: egret.Bitmap;
        for(var i: number = 0;i < len;i++) {
            bm = this.fallMoneyList[i];
            bm.rotation += 10;
            bm.y += 20;
            if(bm.y >= this.fallEdge) {
                this.resetFallMoneyPos(bm);
            }
        }
    }
    
    //重置下落钱位置
    private resetFallMoneyPos(bm:egret.Bitmap): void { 
        bm.y = -bm.height - Math.random() * 600; //随机钱位置
        bm.x = Math.random() * 640;
    }
    
    //重置所有下落的钱位置
    private resetAllFallMoney(): void {
        var len = this.fallMoneyList.length;
        for(var i: number = 0;i < len;i++) {
            this.resetFallMoneyPos(this.fallMoneyList[i]);
        }
    }
    
    private setMoneyLabel(str: string): void {
        this.moneyLabel.text = str;
    }
    
    private setTimeLabel(str: string): void {
        this.timeLabel.text = str;
    }
    
    private startTimer(): void {
        if(this.gameTimer == null) {
            this.gameTimer = new egret.Timer(800);
        }
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.onGameTimer,this);
        this.gameTimer.reset();
        this.gameTimer.start();
    }
    
    private onGameTimer(): void {
        var time = this.timeLimit - this.gameTimer.currentCount;
        this.setTimeLabel(time.toString());
        if(time <= 0) {
            this.gameOver();
        }
    }
    
    private stopTimer(): void {
        if(this.gameTimer != null) {
            this.gameTimer.removeEventListener(egret.TimerEvent.TIMER,this.onGameTimer,this);
        }
    }
}















