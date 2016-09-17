/**
 *
 * @author 
 *
 */
class Example1 extends eui.Component{
    
    //-------------------------测试--------------------
    //1 播放视频
    //2 如何像吴亦凡视频一样，填满整个手机屏幕？ 设置高宽、比例并没有用
    
    public static stage: egret.Stage;
    
    private video: egret.Video;
    
	public constructor() {
        super();
        this.addEventListener(eui.UIEvent.COMPLETE,this.componentCreated,this);
        this.skinName = "resource/myskin/Example1Skin.exml";
        console.log("example1");
	}
	
    private componentCreated(): void {
        egret.log("created13");
//        this.video = new egret.Video();
//        this.video.x = 0;                       //设置视频坐标x
//        this.video.y = 0;                       //设置视频坐标y
//       // this.video.width = 400;                 //设置视频宽
//       // this.video.height = 800;                //设置视频高
//        //this.video.fullscreen = false;          //设置是否全屏（暂不支持移动设备）
//        //this.video.poster = "resource/post.png"; //设置loding图
//        this.video.load("resource/assets/trailer.mp4");
//        this.addChild(this.video);              //将视频添加到舞台
//        //监听视频加载完成
//        //this.video.once(egret.Event.COMPLETE,this.onLoad,this);
//        //监听视频加载失败
//        //this.video.once(egret.IOErrorEvent.IO_ERROR,this.onLoadErr,this);
//        
//        var btnPlay: eui.Button = new eui.Button(); //新建播放按钮
//        btnPlay.label = "播放";
//        btnPlay.x = this.video.x + 20;
//        btnPlay.y = this.video.y + this.video.height + 20;
//        this.addChild(btnPlay);
//        //监听按钮行为，当按下时调用播放函数。
//        btnPlay.addEventListener(egret.TouchEvent.TOUCH_TAP,this.play,this);
        
        this.video = new egret.Video();
        this.video.height = Example1.stage.stageWidth;
        this.video.width = Example1.stage.stageHeight;
       // this.video.width = 320 * Example1.stage.stageHeight / 176;
        this.video.x =0;
        this.video.y = 0;
        //this.video.rotation = 90;
        this.video.touchEnabled = true;
       this.video.fullscreen = false;  
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.play,this);
        this.addEventListener(egret.Event.COMPLETE, this.onLoad, this);
        this.video.load("resource/assets/video2.mp4");
        this.addChild(this.video);
       
        

    }
    
    private black:egret.Sprite = new egret.Sprite();
    
    private onLoad(e: egret.Event) {
        egret.log("loaded");
    }
    
    private onLoadErr(e: egret.Event) {
        console.log("video load error happened");
    }
    
    public play(e: egret.TouchEvent) {
        egret.log("play");
        
        
      
        
        this.black.width = 1000;
        this.black.height = 1000;
        this.black.graphics.beginFill(0x000000);
        this.black.graphics.drawRect(0,0,1000,1000);
        this.black.graphics.endFill();
        this.black.touchEnabled = false;
        this.addChild(this.black);
        
        egret.log("play1");
        
        var self:Example1 = this;
        egret.log("play2");

        egret.log("play3");
        this.video.play();
        
       
    }
}












