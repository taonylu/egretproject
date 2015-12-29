/**
 *
 * @author 
 * 主页场景
 */
class HomeScene extends BaseScene{
    private ring1: eui.Image;      //圆环
    private ring2: eui.Image;
    private ring3: eui.Image;
    private ring4: eui.Image;
    private ring5: eui.Image;
    private figure1: eui.Image;  //人物
    private figure2: eui.Image;
    private figure3: eui.Image;
    private figure4: eui.Image;
    private scan: eui.Image;       //扫描光标
    private zw: eui.Image;          //指纹
    private turnAngle: number = 60;     //旋转角度
    private turnTime: number = 1500;   //旋转角度的时间
    private figureList: Array<eui.Image> = []; //人物数组
    private curFigureIndex: number = 0;         //当前动画人物索引
    private timeoutID: number;                        //计时ID
    private scanInitY: number;                           //扫描光标原始位置
    
	public constructor() {
        super("resource/myskin/scene/HomeSceneSkin.exml");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.figureList.push(this.figure1,this.figure2,this.figure3,this.figure4);
        this.figure1.parent.removeChild(this.figure1);
        this.figure2.parent.removeChild(this.figure2);
        this.figure3.parent.removeChild(this.figure3);
        
        this.scanInitY = this.scan.y;
    }    
	
    public onEnable(): void {
        this.scan.y = this.scanInitY;
        this.ringAnimFront();
        //this.figureAnim();
        this.zw.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        this.zw.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
    }
    
    public onRemove(): void {
        //移除旋转动画
        egret.Tween.removeAllTweens();
        this.ring1.rotation = 0;
        this.ring2.rotation = 0;
        this.ring3.rotation = 0;
        this.ring4.rotation = 0;
        //移除时间监听
        this.onTouchEnd();
    }
    
    //手指按在指纹上
    private onTouchBegin(): void {
        this.scanAnim();
        var self: HomeScene = this;
        this.timeoutID = setTimeout(function() {
            self.nextScene();
        },1000);
    }
    
    //手指离开指纹
    private onTouchEnd(): void {
        clearTimeout(this.timeoutID);
    }
    
    //下一场景
    private nextScene(): void {
        LayerManager.getInstance().runScene(GameManager.getInstance().roleScene);
    }
    
    //ring向前旋转
    public ringAnimFront(): void {
        var self: HomeScene = this;
        egret.Tween.get(this.ring1).to({ rotation: this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring2).to({ rotation: -this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring3).to({ rotation: -this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring4).to({ rotation: -this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring5).to({ rotation: -this.turnAngle/3 },this.turnTime).call(function() {
            self.ringAnimBack();
            });
    }
    
    //ring向后旋转
    public ringAnimBack(): void {
        var self: HomeScene = this;
        egret.Tween.get(this.ring1).to({ rotation: -this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring2).to({ rotation: this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring3).to({ rotation: this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring4).to({ rotation: this.turnAngle },this.turnTime);
        egret.Tween.get(this.ring5).to({ rotation: this.turnAngle/3 },this.turnTime).call(function() {
            self.ringAnimFront();
        });
    }
    
    //人物缩放动画  由于缩放动画有问题，所以这里去掉了
    private figureAnim(): void {
        var self: HomeScene = this;
        var image: eui.Image = this.figureList[this.curFigureIndex];
        this.curFigureIndex++;
        if(this.curFigureIndex >= this.figureList.length) {
            this.curFigureIndex = 0;
        }
        image.alpha = 0;
        image.scaleX = 0.5;
        image.scaleY = 0.5;
        egret.Tween.get(image).to({ alpha: 1,scaleX:1, scaleY:1},1000,egret.Ease.backOut).call(function(){
            //self.figureAnim();
        });
    }
    
    //扫描光标动画
    private scanAnim(): void {
        var self: HomeScene = this;
        egret.Tween.get(this).wait(150).call(function() {  //光标每隔一段时间移动一段距离
            self.scan.y += 50;   
            if(self.scan.y > self.scanInitY + 150) {
                self.scan.y = self.scanInitY;
            }
            self.scanAnim();
        });
    }
    
}









