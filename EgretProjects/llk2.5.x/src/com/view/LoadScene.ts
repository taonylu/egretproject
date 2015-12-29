/**
*  功    能：加载场景
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/10/22
*  修改日期：
*  修改日志：
*/
class LoadScene extends BaseScene{
    
    private loadLabel: eui.Label;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/LoadSceneSkin.exml";
	}
	
	
    public setLoadLabel(str:string): void {
        this.loadLabel.text = str;
    }
}
