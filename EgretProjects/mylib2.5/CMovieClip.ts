/**
 *
 * @author 
 * 自定义MovieClip, 初始帧为1
 */
class CMovieClip extends egret.Bitmap{
    
    private textureList: Array<egret.Texture> = [];  //保存纹理列表
    public curFrame: number = 0;                           //当前帧
    public totalFrame: number = 0;                        //总帧数
    private timer: egret.Timer;                                 //计时器
    private frameTime: number = 20;                     //每帧计时
    
	public constructor() {
        super();
	}

	//添加图片
    protected addTexture(bmName:string): void {
        this.textureList.push(RES.getRes(bmName));
        this.totalFrame = this.textureList.length;
        //只显示第一帧
        if(this.totalFrame == 1) {
            this.texture = this.textureList[0];
        }
    }
    
    //播放动画
    public play(): void {
        this.startTimer();
    }
    
    //跳转到指定帧并播放
    public gotoAndPlay(frame:number): void {
        this.gotoAndStop(frame);
        this.play();
    }
    
    //停止动画
    public stop(): void {
        this.stopTimer();
    }

    //跳转并停留在指定帧，从第1帧开始
    public gotoAndStop(frame: number): void {
        this.texture = this.textureList[frame-1];
        this.curFrame = frame;
    }
    
    private startTimer(): void {
        if(this.timer == null) {
            this.timer = new egret.Timer(this.frameTime);
        }
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler,this);
        this.timer.reset();
        this.timer.start();
    }
    
    private onTimerHandler(): void {
        this.curFrame++;
        if(this.curFrame > this.totalFrame) {
            this.curFrame = 1;
        }
        this.gotoAndStop(this.curFrame);
    }
    
    private stopTimer(): void {
        if(this.timer != null) {
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
            this.timer.stop();
        }
    }
    
    public set frameRate(value:number){
        this.frameTime = value;
        this.timer && (this.timer.delay = value);
    }
    
    //销毁
    public destory(): void {
        this.stopTimer();
        this.timer = null;
        
        var len: number = this.textureList.length;
        for(var i: number = 0;i < len;i++) {
            this.textureList[i].dispose();
        }
        this.textureList.length = 0;
    }
	
}







