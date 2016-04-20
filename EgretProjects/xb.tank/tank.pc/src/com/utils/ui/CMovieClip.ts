/**
 *
 * @author 
 * 自定义MovieClip, 初始帧为1
 */
class CMovieClip extends egret.Bitmap{
    
    private textureList: Array<egret.Texture> = [];     //保存纹理列表
    public curFrame: number = 0;                        //当前帧
    public totalFrame: number = 0;                      //总帧数
    private timer: egret.Timer;                         //计时器
    private delay: number = 1000/24;                    //每帧计时
    
	public constructor() {
        super();
	}

	/**
	 * 添加图片
	 * @bmName 图片名称
	 * @startIndex 起始数字
	 * @endIndex 终止数字
	 * 例如图片 img0.png img1.png img2.png，则addTexture("img",0,2)
	 */ 
    protected addTexture(bmName:string,startIndex:number,endIndex:number): void {
        for(var i=startIndex;i<=endIndex;i++){
            this.textureList.push(RES.getRes(bmName + i + "_png")); 
        }
        //显示第一帧
        this.texture = this.textureList[0];
        this.totalFrame = this.textureList.length;
        
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
            this.timer = new egret.Timer(this.delay);
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
        this.delay = Math.round(1000/value);
        this.timer && (this.timer.delay = this.delay);
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







