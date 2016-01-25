/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类，单例
*  内    容： 游戏图层、场景管理
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class LayerManager {
    
    /**Main*/
    public main: eui.UILayer;
    /**场景层*/
    public sceneLayer:eui.Group;
    /**弹框层*/
    public popLayer: eui.Group;
    /**当前场景*/
    private curScene: BaseScene;


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
        this.popLayer.touchThrough = true;
        this.main.addChild(this.popLayer);
    }
   
    /**          
     * 运行场景          
     * @param 运行的场景名                
     * @param 是否销毁上一场景          
     */
    public runScene(nextScene: BaseScene,destroy: boolean = false): void { 
        //隐藏或销毁当前场景
        if(this.curScene != null) {
            if(this.curScene) {
                this.sceneLayer.removeChild(this.curScene);
                this.curScene.onRemove();
                if(destroy) {
                    this.curScene.onDestroy();
                }
            }
        }  
        
        //添加下一场景
        this.sceneLayer.addChild(nextScene);
        if(nextScene.inited) {
            nextScene.onEnable();
        }
        
        //设置当前场景
        this.curScene = nextScene;
    }
    
    private static instance: LayerManager;
    public static getInstance(): LayerManager {
        if(this.instance == null) {
            this.instance = new LayerManager();
        }
        return this.instance;
    }

} 


















