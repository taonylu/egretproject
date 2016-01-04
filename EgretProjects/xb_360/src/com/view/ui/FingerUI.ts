/**
 *
 * @author 
 *
 */
class FingerUI  extends BaseUI{
    
    private light:eui.Image;
    private finger0:eui.Image;
    private finger1:eui.Image;
    private lock:eui.Image;
    private gou:eui.Image;
    
    private startX:number = 222;   //光标的坐标
    private startY:number = 87;
    private midX:number = 118;
    private midY:number = 53;
    private endX:number = 28;
    private endY:number = 23;
    
	public constructor() {
	    super();
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.light.visible = false;
        this.finger1.visible = false;
        this.lock.visible = false;
        this.gou.visible = false;
    }
    
     //光标扫描第一遍
    public lightScan():void{
       
        this.light.alpha = 0;
        this.light.x = this.startX;
        this.light.y = this.startY;
        this.light.visible = true;
        
        egret.Tween.get(this.light).to({ x: this.midX,y: this.midY,alpha: 1 },200).
            to({ x: this.endX,y: this.endY,alpha: 0 },200).call(this.fingerFlash,this);
        
    }
    
    //指纹闪烁第一次
    private fingerFlash(){
        this.finger0.visible  = false;
        this.finger1.visible = true;
        var self:FingerUI = this;
        egret.Tween.get(this).wait(300).call(function(){
            self.finger0.visible = true;
            self.finger1.visible = false;
            }, this).call(this.lightScan2, this);
    }
    
    //光标扫描第二次
    private  lightScan2():void{
        this.light.alpha = 0;
        this.light.x = this.startX;
        this.light.y = this.startY;
        this.light.visible = true;

        egret.Tween.get(this.light).to({ x: this.midX,y: this.midY, alpha:1 },200).
            to({ x: this.endX,y: this.endY , alpha:0},200).call(this.fingerFlash2,this);
    }
    
    //指纹闪烁第二次
    private fingerFlash2() {
        this.finger0.visible = false;
        this.finger1.visible = true;
        var self: FingerUI = this;
        egret.Tween.get(this).wait(100).call(function() {
            self.finger0.visible = true;
            self.finger1.visible = false;
        },this).wait(100).call(function(){
            self.finger0.visible = false;
            self.finger1.visible = true;
            },this).wait(100).call(function() {
                self.finger0.visible = true;
                self.finger1.visible = false;
            },this).wait(100).call(function() {
                self.finger0.visible = false;
                self.finger1.visible = true;
            },this).call(this.unlock, this);
    }
    
    //解锁
    private unlock():void{
        egret.Tween.get(this.finger1).to({alpha:0}, 200);
        
        this.lock.alpha = 0;
        this.lock.visible = true;
        this.gou.alpha = 0;
        this.gou.visible = true;
        egret.Tween.get(this.lock).wait(200).to({alpha:1},1500);
        
        var self:FingerUI = this;
        egret.Tween.get(this.gou).wait(800).to({ alpha: 1 },500).wait(500).call(function(){
            self.dispatchEvent(new egret.Event("fingerComplete"));
            },this);
    }
    
}






















