/**
*  文 件 名：HomeScene.ts
*  功    能：开始页面
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/11
*  修改日志：
*/
class HomeScene extends BaseScene{
    //开始按钮
    private startBtn: egret.gui.UIAsset;
    //输入框
    private inputLabel: egret.gui.EditableText;
    
	public constructor() {
        super();
        this.skinName = skins.scene.HomeSceneSkin;
	}
	
    public childrenCreated(): void { 
        this.onEnable();
    }
    
    public onEnable(): void {
        this.inputLabel.text = "";
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
    }
    
    public onRemove(): void {
        this.inputLabel.text = "";
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onStartBtnTouch,this);
    }
    
    private onStartBtnTouch(): void {
        console.log("click startBtn...");
        if(this.inputLabel.text != ""){
            var json: LoginJSON = new LoginJSON();
            json.userID = (<number><any>this.inputLabel.text);
            ClientSocket.getInstance().send(json.getJSONString()); 
        }
    }
    
   
}











