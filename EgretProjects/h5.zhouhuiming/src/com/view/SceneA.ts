/**
 * 场景A
 * @author 
 *
 */
class SceneA extends BaseScene{
    private phoneBtn:eui.Image;  //接听按钮
    
	public constructor() {
    	super();
    	this.skinName = "SceneASkin"
	}
	
    public onCreated(): void {
            
    }

    public onEnable(): void {
        App.sndMgr.play(App.sndMgr.phone, Number.MAX_VALUE);
        this.playPhoneAnim();
        this.phoneBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);   
    }

    public onRemove(): void {
        
    }
    
    private onTouch(){
        this.nextScene();
    }
    
    //按钮晃动
    private playPhoneAnim(){
        this.phoneBtn.rotation = 0;
        egret.Tween.get(this.phoneBtn,{ loop: true }).to({ rotation: -10 },100).to({ rotation: 10 },100).
            to({ rotation: -10 },100).to({ rotation: 10 },100).
            to({ rotation: -10 },100).to({ rotation: 10 },100).wait(1500);
    }
    
    private nextScene(){
        App.sndMgr.stop();
        egret.Tween.removeTweens(this.phoneBtn);
        this.phoneBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        App.layerMgr.runScene(App.sceneMgr.sceneB);
    }
	
}










