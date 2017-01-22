/**
 * 预加载界面
 * @author chenkai
 * @date 2016/12/27
 */
class PreloadScene extends BaseScene{
    /**进度文本*/
    private progressLabel:eui.Label;
   
	public constructor() {
    	super();
    	this.skinName = "PreloadSceneSkin";
	}
	
	public childrenCreated(){
        this.setProgress(0);
	}

	
	/**
	 * 设置进度
	 * @progress 进度1-100
	 */ 
	public setProgress(progress:number){
    	 this.progressLabel.text = "加载中..." + progress + "%";
	}
	
	
}
