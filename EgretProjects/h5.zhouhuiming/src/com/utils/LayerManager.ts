/**
*  功    能： 图层管理类
*/
class LayerManager {
    
    /**Main*/
    public main: eui.UILayer;
    /**场景层*/
    public sceneLayer:eui.Group;
    /**当前场景*/
    private curScene: BaseScene;


    /**初始化*/
    public init(main:eui.UILayer): void {
        this.main = main;
        
        this.sceneLayer = new eui.Group();
        this.sceneLayer.percentWidth = 100;
        this.sceneLayer.percentHeight = 100;
        this.main.addChild(this.sceneLayer);
    }
   
    /**          
     * 运行场景          
     * @param 运行的场景名                
     * @param 是否销毁上一场景          
     */
    public runScene(nextScene: BaseScene,destroy: boolean = false): void {
        //隐藏或销毁当前场景
        if(this.curScene != null) {
            this.sceneLayer.removeChild(this.curScene);
        } 
        
        //设置当前场景
        this.curScene = nextScene;
        
        //添加下一场景
        this.sceneLayer.addChild(nextScene); 
    }

} 


















