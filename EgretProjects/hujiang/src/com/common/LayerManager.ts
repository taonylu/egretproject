/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类
*  内    容： 游戏图层、场景管理
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class LayerManager {
    /**单例*/
    private static instance: LayerManager;
    /**Main*/
    public main: eui.UILayer;
    /**UIStage场景层*/
    public sceneLayer:eui.Group;
    /**UIStage弹框层*/
    public popLayer: eui.Group;
    /**当前场景*/
    private curScene: BaseScene;
    /**场景动画时间*/
    private tweenTime: number = 500;

    public static getInstance(): LayerManager {
        if(this.instance == null) {
            this.instance = new LayerManager();
        }
        return this.instance;
    }

    /**初始化*/
    public initialize(main:eui.UILayer): void {
        this.main = main;
        
        this.sceneLayer = new eui.Group();
        this.sceneLayer.percentWidth = 100;
        this.sceneLayer.percentHeight = 100;
        this.main.addChild(this.sceneLayer);

        this.popLayer = new eui.Group();
        this.popLayer.percentWidth = 100;
        this.popLayer.percentHeight = 100;
        this.popLayer.touchEnabled = false;
        this.main.addChild(this.popLayer);
    }
   
    /**          
     * 运行场景          
     * @param 运行的场景名          
     * @param 切换场景过渡动画类型          
     * @param 是否销毁上一场景          
     */
    public runScene(nextScene: BaseScene,tween: STween = STween.None,destroy: boolean = false): void { 
        //隐藏或销毁当前场景
        if(this.curScene != null) {
            if(this.curScene) {
                this.curScene.onRemove();
                if(destroy) {
                    this.curScene.onDestroy();
                }
            }
        }       
        //添加当前场景，并执行过渡动画
        this.sceneLayer.addChild(nextScene);
        if(nextScene.inited){
            nextScene.onEnable();
        }

        this.playSceneTween(this.curScene,nextScene,tween);

        this.curScene = nextScene;
    }

    /**场景过渡动画*/
    private playSceneTween(curScene: BaseScene,nextScene: BaseScene,tween: STween): void {
        var self: LayerManager = this;
        switch(tween) {
            case STween.None:
                curScene && self.sceneLayer.removeChild(curScene);
                break;
            case STween.R:
               curScene && self.sceneLayer.removeChild(curScene);
                break;
        }
    }
} 
    /**场景过渡动画*/
enum STween {
    None = 0,
    /**新场景从右边入场*/
    R
}

















