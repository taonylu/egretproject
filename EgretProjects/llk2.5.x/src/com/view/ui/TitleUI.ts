/**
*  功    能：顶部标题UI
*  内    容： 鱼、星星数量和标题
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
class TitleUI extends BaseUI{ 
    private fishLabel: eui.Label;   
    private starLabel: eui.Label;
    private titleLabel: eui.Label;
    
    private tempTitle: string;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/TitleUISkin.exml";
        this.horizontalCenter = 0;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        
    }
	
    public setTitle(title:string): void {
        this.tempTitle = title;
        if(this.inited) {
            this.titleLabel.text = this.tempTitle;
        }
    }
	
    
}
