/**
*  文 件 名：LoadingSceneA.ts
*  功    能： 加载界面A
*  内    容： activity->home加载界面
*  作    者： Rikimaru
*  生成日期：2015/8/22
*  修改日期：2015/8/23
*  修改日志：
*/
class LoadingSceneA extends BaseScene{
    /**加载动画*/
    private loadingAnim: LoadingAnim;
    
	public constructor() {
        super();
        this.skinName = skins.scene.LoadingSceneASkin;
	}
	
    public childrenCreated(): void { 
        this.onEnable();
    }
	
    public onEnable(): void { 
        this.loadingAnim.play();
    }
    
    public onRemove(): void { 
        this.loadingAnim.stop();
    }
}
