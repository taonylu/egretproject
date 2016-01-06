/**
 * 加载场景
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private progressLabel: eui.Label;    //进度文本
    private bar:eui.Image;              //进度条   
    private anim0:eui.Image;            //动画
    private anim1:eui.Image;
    private anim2:eui.Image;
    private anim3:eui.Image;
    private imageMC:ImageMC;            //图片动画
    
	public constructor() {
    	super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        //图片动画
        this.imageMC = new ImageMC();
        this.imageMC.addImage(this.anim0);
        this.imageMC.addImage(this.anim1);
        this.imageMC.addImage(this.anim2);
        this.imageMC.addImage(this.anim3);
        
        //进度条进度
        this.bar.scaleX = 1;
        this.setProgress(0);
        
        //播放动画
        this.startAnim();
    }

    
    public setProgress(progress:number):void{
        this.progressLabel.text = progress + "%";
        this.bar.scaleX = progress / 100;
    }
    
    public startAnim():void{
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    
    public stopAnim():void{
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
    }
    
    private count:number=0;
    private onEnterFrame():void{
        this.count ++;
        if(this.imageMC.curFrame == 0){
            if(this.count%20 == 0){            //第一帧播放时间较长
                this.imageMC.nextFrame();
            }
        }else {
            if(this.count%5 == 0){             //其他帧播放时间
                this.imageMC.nextFrame();
            }
        }
    }

	
}










