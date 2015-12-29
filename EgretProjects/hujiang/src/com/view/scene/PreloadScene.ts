/**
 *
 * @author 
 * 预加载场景
 */
class PreloadScene extends BaseScene{
    
    private loadingUI: LoadingUI;
    
	public constructor() {
        super("resource/myskin/scene/PreloadSkin.exml");
	}
    
    //设置加载动画，progress = 1~10
    public setAnimByProcess(progress:number): void {
        this.loadingUI.setAnimByProcess(progress);
    }
}
