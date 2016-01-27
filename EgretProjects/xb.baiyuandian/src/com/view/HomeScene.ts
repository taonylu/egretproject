/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    
    private clockGroup:eui.Group;  //钟Group
    
    private guizi0:eui.Image;  //柜子0最后 2最前
    private guizi1:eui.Image;
    private guizi2:eui.Image;
    private man0:eui.Image;    //探出头的人
    private initGuizi0X:number;  //柜子位置
    private initGuizi1X: number;
    private initGuizi2X: number;
    private initMan0X:number;
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
    }

    public onEnable(): void {
        this.playAnim();
    }

    public onRemove(): void {
        
    }
    
    //视图初始化
    public initView(){
        //初始柜子
        this.initGuizi0X = this.guizi0.x;
        this.initGuizi1X = this.guizi1.x;
        this.initGuizi2X = this.guizi2.x;
        var stageWidth = GameConst.stage.stageWidth;
        this.guizi0.x = stageWidth;
        this.guizi1.x = stageWidth;
        this.guizi2.x = stageWidth;
        this.man0.x = stageWidth
    }
    
    //开始播放动画
    public playAnim(){
        //钟上移
        egret.Tween.get(this.clockGroup).to({y:30},500);
        
        //柜子出来
        egret.Tween.get(this.guizi0).wait(200).to({x:this.initGuizi0X},500);
        egret.Tween.get(this.guizi1).wait(300).to({ x: this.initGuizi1X },500);
        egret.Tween.get(this.guizi2).wait(400).to({ x: this.initGuizi2X },500);
    }
    
    
}















