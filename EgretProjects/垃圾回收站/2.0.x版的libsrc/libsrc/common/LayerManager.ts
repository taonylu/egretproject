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
    /**Stage*/
    public stage: egret.Stage;
    /**UIStage*/
    public uiStage: egret.gui.UIStage;
    /**Main*/
    public main: egret.DisplayObjectContainer;
    /**UIStage场景层*/
    public uiSceneLayer: egret.gui.Group;
    /**UIStage弹框层*/
    public uiPopLayer: egret.gui.Group;
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
    public initialize(main:egret.DisplayObjectContainer): void {
        this.main = main;
        
        this.stage = main.stage;

        this.uiStage = new egret.gui.UIStage();
        this.stage.addChild(this.uiStage);

        this.uiSceneLayer = new egret.gui.Group();
        this.uiSceneLayer.percentWidth = 100;
        this.uiSceneLayer.percentHeight = 100;
        this.uiStage.addElement(this.uiSceneLayer);

        this.uiPopLayer = new egret.gui.Group();
        this.uiPopLayer.percentWidth = 100;
        this.uiPopLayer.percentHeight = 100;
        this.uiStage.addElement(this.uiPopLayer);
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
        if(nextScene.initialized) {
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
                self.uiSceneLayer.addElement(nextScene);
                curScene && self.uiSceneLayer.removeElement(curScene);
                break;
            case STween.R:
                nextScene.x = self.stage.stageWidth;
                this.uiSceneLayer.addElement(nextScene);
                egret.Tween.get(nextScene).to({ x: 0 },this.tweenTime,egret.Ease.quartOut).call(function(): void {
                    curScene && self.uiSceneLayer.removeElement(curScene);
                });
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

















