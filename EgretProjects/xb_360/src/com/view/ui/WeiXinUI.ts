/**
 *
 * @author 
 *
 */
class WeiXinUI extends BaseUI{
    private img0:eui.Image;
    private img1:eui.Image;
    private img2:eui.Image;
    private img3:eui.Image;
    
	public constructor() {
    	super();
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.img0.visible = false;
        this.img1.visible = false;
        this.img2.visible = false;
        this.img3.visible = false;
    }
    
    public play():void{
        var self: WeiXinUI = this;
        this.img0.visible = true;
        egret.Tween.get(this).wait(100).call(function(){
            self.img0.visible = false;
            self.img1.visible = true;
        },this).wait(100).call(function(){
                self.img1.visible = false;
                self.img2.visible = true;
            },this).wait(100).call(function(){
                    self.img2.visible = false;
                    self.img3.visible = true;
                    },this);
    }
}
