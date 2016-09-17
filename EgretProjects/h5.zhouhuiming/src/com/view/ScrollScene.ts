/**
 * 滚动场景 
 * @author  
 *
 */
class ScrollScene extends BaseScene{
    private scroll:ItemScroller;
    private sceneList = [];
    private sceneGroup:eui.Group;
    
	public constructor() {
    	  super();
          this.skinName = "ScrollSceneSkin";
	}
	
    public onCreated(): void {
        for(var i=0;i<4;i++){
            this.sceneList.push(this.sceneGroup.getChildAt(i));
        }
    }

    public onEnable(): void {
        this.scroll.addEventListener(ItemScroller.ScrollDone, this.onScrollDone, this);
        this.sceneList[0].startAnim();
    }

    public onRemove(): void {

    }

    public onDestroy(): void {
        
    }
    
    //滚动完成
    private onScrollDone(e:egret.Event){
        var scene = this.sceneList[e.data];
        if(scene && scene.isAnimDone == false){
            scene.startAnim();
        }
    }

}














