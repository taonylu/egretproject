/**
 * 预加载场景
 * @author 
 *
 */
class PreloadScene extends BaseScene{
    //private fengChe:eui.Image;
    public progressLabel:eui.Label;
    
	public constructor() {
        super("PreloadSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        //this.startFengAnim();
       // this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveStage, this);
    }
    
    public setProgress(process:number){
        if(this.inited){
            this.progressLabel.text = process.toString() + "%";
        }    
    }
    
//    private startFengAnim(){
//        egret.Tween.get(this.fengChe,{ loop: true }).to({ rotation: 1800 },10000).to({ rotation: 1800 },3000);
//    }
//    
//    private onRemoveStage(){
//        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoveStage,this);
//        egret.Tween.removeTweens(this.fengChe);
//    }
}
