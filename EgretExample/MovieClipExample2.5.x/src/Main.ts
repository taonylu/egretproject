class Main extends egret.Sprite {

    public constructor() {
        super();
        
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.configComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");
        
        
    }
    
    private configComplete(): void {
        console.log("load config complete");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadGroupComplete,this);
        RES.loadGroup("preload");
    }
    
    private mc: egret.MovieClip;
    private loadGroupComplete(): void {
        console.log("load group complete");
        
        //----------------------MovieClip测试-----------------------
        // 测试内容
        //1. 帧标签事件
        //2. 帧播放完成事件
        //3. 帧循环播放事件
        
        
        var json = RES.getRes("Ball_json");
        var png = RES.getRes("Ball_png");
        var mcF: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.mc = new egret.MovieClip(mcF.generateMovieClipData("Ball"));
        this.addChild(this.mc);
        this.mc.gotoAndPlay("start");    //单次播放会自动运行到帧标签处前一帧然后停止，而不是连续播放。
        this.mc.gotoAndPlay("start",3);  //mc会自动运行到帧标签处前一帧然后停止，再重新循环播放一次。
        
        //在json里定义帧事件，这里到达指定帧时，会触发该事件
        this.mc.addEventListener(egret.MovieClipEvent.FRAME_LABEL, this.labelFrame,this);
        
        //3次循环每完成其中一次，则触发一次，最后一次不触发...
        this.mc.addEventListener(egret.MovieClipEvent.LOOP_COMPLETE,this.loopComplete,this);
        
        //播放完成（三次循环都播放完），则触发一次
        this.mc.addEventListener(egret.MovieClipEvent.COMPLETE,this.onComplete,this);
    }
    
    private labelFrame(e: egret.MovieClipEvent): void {
        //输出：@startComplete frame_label 29 start
        console.log(e.frameLabel,e.type,this.mc.currentFrame, this.mc.currentLabel);   
    }
    
    private loopComplete(e:egret.MovieClipEvent): void {
        console.log("loop complete");
    }
    
    private onComplete(): void {
        console.log("complete");
    }
}









