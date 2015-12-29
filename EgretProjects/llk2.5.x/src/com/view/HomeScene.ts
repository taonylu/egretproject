/**
*  功    能：主页场景
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
class HomeScene extends BaseScene{
    public startBtn: eui.Button;
    private optionBtn: eui.Button;
    private rankBtn: eui.Button;
    private cupBtn: eui.Button;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/HomeSceneSkin.exml";  
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.onEnable();
    }
	
    public onEnable(): void {
        this.configListeners();
    }
    
    public onRemove(): void {
        this.deConfigListeners();
    }
    
    private configListeners(): void {
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.optionBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onOptionBtnTouch,this);
        this.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.cupBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onCupBtnTouch,this);
    }
    
    private deConfigListeners(): void {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
        this.optionBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onOptionBtnTouch,this);
        this.rankBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onRankBtnTouch,this);
        this.cupBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCupBtnTouch,this);
    }
    
    private onStartBtnTouch(): void {  
        console.log("点击开始");
        LayerManager.getInstance().runScene(GameManager.getInstance().levelScene);
    }
    
    private onOptionBtnTouch(): void {
                
    }
        
    private onRankBtnTouch(): void {
                
    }
    
    private onCupBtnTouch(): void {
                        
    }
}










