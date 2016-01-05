/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private fallPacketList: Array<egret.Bitmap>; //掉红包数组
    private fallPacketGroup: eui.Group;          //掉红包容器
    private fallEdge: number;                    //掉红包下边界
    
    private packetLabel: eui.Label;              //获得红包总数文本
    private countPacketList: Array<egret.Bitmap>;//触摸飞出的红包数组
    private staticPacket: eui.Image;             //固定的红包
    private totalPacket: number = 0;             //当前红包总数
    
    private timeLabel: eui.Label;                //计时文本
    private timeLimit: number = 3;               //时间限制
    private gameTimer: egret.Timer;              //游戏计时器
    
    private item_box:eui.Image;                  //杂物
    private item_ipad:eui.Image;
    private item_paper:eui.Image;
    private hand:eui.Image;                      //手拿红包
    private arrow:eui.Image;                     //箭头
    
    private initArrowY:number;                   //箭头Y
    private initPacketY:number;                  //固定红包上滑的位置
    
    private resultUI: ResultUI = new ResultUI(); //结果UI
    
    private bFirstGame:Boolean = true;           //是否首次游戏，第一次游戏会有杂物，第二次则不出现杂物
    
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.initView();
        this.initFallPacket();
        this.initCountPacket();
    }

    public onEnable(): void {
        this.playArrowAnim();
        this.startGame();
    }

    public onRemove(): void {
        egret.Tween.removeTweens(this.arrow);
    }
    
    public startGame(): void {
        //重置游戏
        this.resetGame();
        
        if(this.bFirstGame){   //首次游戏，出现杂物
            this.bFirstGame = false;
            GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onFirstGameTouchBegin, this);
            GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onFirstGameTouchEnd, this);
        }else{  //非首次游戏，则直接开始
            this.addEventListener(egret.TouchEvent.ENTER_FRAME,this.onFallPacket,this);
            this.staticPacket.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            GameConst.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
    }
    
    private resetGame(): void {
        //重置下落的红包位置
        this.resetAllPacketMoney();
        //重置飞出红包
        this.resetCountPacket();
        //重置时间
        this.setTimeLabel(this.timeLimit.toString());
        //重置红包总数
        this.totalPacket = 0;
        this.setPacketLabel(this.totalPacket.toString());
    }
    
    private gameOver(): void {
        //停止计时器
        this.stopTimer();
        //移除监听
        this.staticPacket.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
        GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        //显示结果面板
        this.resultUI.showInScene(this,this.totalPacket);
        
    }
    
    //初始化界面元素
    private initView(): void {
        //固定红包上滑位置
        this.initPacketY = this.staticPacket.y - 610;  //610用于确定红包高度
        //箭头位置
        this.initArrowY = this.arrow.y;
    }
    
    //播放箭头动画
    private playArrowAnim():void{
        this.arrow.y = this.initArrowY;
        egret.Tween.get(this.arrow,{ loop: true }).to({ y: this.initArrowY - 20 },500).to({ y: this.initArrowY},500);
    }
    
    //第一次游戏滑动屏幕，触摸开始
    private onFirstGameTouchBegin(e:egret.TouchEvent):void{
        this.beginY = e.stageY;
    }
    
    //第一次游戏滑动屏幕，触摸结束
    private onFirstGameTouchEnd(e:egret.TouchEvent):void{
        if(this.beginY - e.stageY > 50){  //滑动距离达到50，则将杂物退散，开始游戏
            //移除监听
            GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onFirstGameTouchBegin,this);
            GameConst.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onFirstGameTouchEnd,this);
            //杂物退散
            var self:GameScene = this;
            egret.Tween.get(this.item_box).to({x:-this.item_box.width},500);
            egret.Tween.get(this.item_ipad).to({x:GameConst.stage.stageWidth},500);
            egret.Tween.get(this.item_paper).to({ x: GameConst.stage.stageWidth },500);
            egret.Tween.get(this.hand).to({ y: GameConst.stage.stageHeight },500);
            //红包进场
            egret.Tween.get(this.staticPacket).to({ y: this.initPacketY},1000).call(function() {
                self.startGame();
            },this);  
        }
    }
    
    
    
    private beginY: number;             //触摸初始位置
    private isDrag: Boolean = false;    //是否拖拽状态
    private curDragPacket: egret.Bitmap;//当前拖拽的红包
    
    private onTouchBegin(e:egret.TouchEvent): void {
        this.beginY = e.stageY;
        this.isDrag = true;
        this.curDragPacket = this.countPacketList.pop();
        this.curDragPacket.x = this.staticPacket.x;
        this.curDragPacket.y = this.staticPacket.y;
        this.addChild(this.curDragPacket);
        
    }
    
    private onTouchMove(e: egret.TouchEvent): void {
        if(this.isDrag && this.curDragPacket) {
            this.curDragPacket.y += e.stageY - this.beginY;
            this.beginY = e.stageY;
        }
    }
    
    private onTouchEnd(e: egret.TouchEvent): void {
        //滑动距离超过50，则将红包飞出
        if(this.isDrag && this.curDragPacket && (this.staticPacket.y - this.curDragPacket.y > 50)) {
            //根据距离计算滑动时间       当前所需时间=  当前位置/起始位置*起始位置到终点时间 
            var time: number = (this.curDragPacket.y / this.staticPacket.y) * 200;
            var tempMoney: egret.Bitmap = this.curDragPacket;
            this.curDragPacket = null;
            var self: GameScene = this;
            egret.Tween.get(tempMoney).to({ y: -tempMoney.height },time).call(function() {
                self.countPacketList.push(tempMoney);
            });
            //计算红包
            this.totalPacket ++;
            this.setPacketLabel(this.totalPacket.toString());
            //第一张红包滑动后，开始计时
            if(this.totalPacket == 1) {
                this.startTimer();
            } 
        }else if(this.curDragPacket){  //重置红包位置
            this.curDragPacket.y = -this.curDragPacket.height;
        }
        
        //重置拖拽状态
        this.isDrag = false;
    }
    
    
    
    //初始化数红包数组
    private initCountPacket(): void {
        this.countPacketList = new Array<egret.Bitmap>();
        var bm: egret.Bitmap;
        for(var i: number = 0;i < 10;i++) {  //初始化飞出红包数10个
            bm = new egret.Bitmap(RES.getRes("game_packet_png"));
            this.countPacketList.push(bm);
        }
    }
    
    //重置飞出红包
    private resetCountPacket():void{
        //拖拽的红包
        if(this.curDragPacket){
            this.curDragPacket.y = -this.curDragPacket.height;
            this.countPacketList.push(this.curDragPacket);
            this.curDragPacket = null;
        }
        //重置所有红包位置
        var len:number = this.countPacketList.length;
        var bm: egret.Bitmap;
        for(var i: number = 0;i < len;i++) {
            bm = this.countPacketList[i];
            bm.y = -bm.height;
        }
    }
    
    
    
    
    //初始化下落的红包
    private initFallPacket(): void {
        this.fallPacketList = new Array<egret.Bitmap>();
        var bm: egret.Bitmap;
        for(var i: number = 0;i < 3;i++) { //初始化下落红包3个
            bm = new egret.Bitmap(RES.getRes("game_fall_png"));
            bm.anchorOffsetX = bm.width / 2;
            bm.anchorOffsetY = bm.height / 2;
            this.fallPacketList.push(bm);
            this.resetFallPacketPos(bm);
            this.fallPacketGroup.addChild(bm);
        }
        this.fallEdge = GameConst.stage.stageHeight + bm.height;
    }
    
    //下落红包处理函数
    private onFallPacket(): void {
        var len = this.fallPacketList.length;
        var bm: egret.Bitmap;
        for(var i: number = 0;i < len;i++) {
            bm = this.fallPacketList[i];
            bm.rotation += 10; //下落红包旋转和位置
            bm.y += 20;
            if(bm.y >= this.fallEdge) {
                this.resetFallPacketPos(bm);
            }
        }
    }
    
    //重置下落红包位置
    private resetFallPacketPos(bm:egret.Bitmap): void { 
        bm.y = -bm.height - Math.random() * 1000; //随机红包位置，舞台以上红包高度+600位置内随机
        bm.x = Math.random() * 640;                       //640舞台宽度
    }
    
    //重置所有下落的红包位置
    private resetAllPacketMoney(): void {
        var len = this.fallPacketList.length;
        for(var i: number = 0;i < len;i++) {
            this.resetFallPacketPos(this.fallPacketList[i]);
        }
    }
    
    private setPacketLabel(str: string): void {
        this.packetLabel.text = str;
    }
    
    private setTimeLabel(str: string): void {
        this.timeLabel.text = str;
    }
    
    private startTimer(): void {
        if(this.gameTimer == null) {
            this.gameTimer = new egret.Timer(800); //计时为800ms减1
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















