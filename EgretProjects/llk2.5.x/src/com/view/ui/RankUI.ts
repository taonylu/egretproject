/**
*  功    能：排行榜
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class RankUI extends BaseUI{
    private quitBtn: eui.Button;
    private nameList: Array<eui.Label> = [];
    private scoreList: Array<eui.Label> = [];
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/RankUISkin.exml";
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.initView();
        this.rank(JsonManager.revSubmit);
    }
    
    private initView(): void {
        this.quitBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onQuitBtnTouch,this);
        
        for(var i: number = 0;i < 3;i++) {
            this.nameList.push(this["name" + i + "Label"]);
            this.scoreList.push(this["score" + i + "Label"]);
        }
    }
    
    public show(doc: egret.DisplayObjectContainer): void {
        this.x = (doc.width - this.width)/2;
        this.y = (doc.height - this.height)/2;
        doc.addChild(this);
    }
    
    public rank(json): void {
        JsonManager.revSubmit = json;
        if(this.inited){
            var data = JsonManager.revSubmit;
            for(var i: number = 0;i < 3;i++) {
                if(data.scorelist[i] != null && data.scorelist[i][0] != "") {
                    this.nameList[i].text = data.scorelist[i][0];
                    this.scoreList[i].text = data.scorelist[i][1];
                }else{
                    this.nameList[i].text = "";
                    this.scoreList[i].text = "";
                }
            }
        }
    }
    
    public hide(): void {
        this.parent && this.parent.removeChild(this);

   }

    private onQuitBtnTouch(): void {
        GameManager.getInstance().gameScene.quitGame();
   }
    
   
}





