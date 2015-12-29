/**
 * 预加载界面
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    private processLabel: eui.Label;
    
	public constructor() {
        super("PreloadSceneSkin");
	}

    public onEnable(): void {
        this.setProcessLabel(0);
    }

    public setProcessLabel(process: number): void {
        if(this.inited) {
            this.processLabel.text = process + "%";
        }
    }
}
