/**
 *
 * 游戏类
 * @author 
 *
 */

enum SceneID { 
    homeScene,
    gameScene
}

class App {
    
    /**游戏主类App实例*/
    private static instance: App;
    /**UIStage*/
    public uiStage: egret.gui.UIStage;
    /**当前场景ID*/
    private curSceneID: number;
    /**场景列表*/
    private sceneList: Object;
    
    public static getInstance(): App { 
        if(this.instance == null) { 
            this.instance = new App();
        }
        return this.instance;
    }
    
    /**启动游戏，进行初始化*/
    public startup(): void { 
        this.uiStage = <egret.gui.UIStage>egret.gui.UIGlobals.uiStage;
        this.sceneList = new Object();
        this.runScene(AppConst.SceneID_Home);   
        }
            
        /**
        * 运行场景
        */ 
        public runScene(sceneID:number): void { 
            switch(sceneID) { 
                case AppConst.SceneID_Home:
                if(this.sceneList[sceneID] == null) { 
                    this.sceneList[sceneID] = new HomeScene();
                }
                break;
                case AppConst.SceneID_Game:
                if(this.sceneList[sceneID] == null) { 
                    this.sceneList[sceneID] = new GameScene();
                }
                break;
                default:
                throw new Error("当前场景不存在");
                return;
            }
            //移除当前场景
            if(this.sceneList[this.curSceneID] != null) {
                this.uiStage.removeElement(this.sceneList[this.curSceneID]);
            }
            //添加要运行的场景
            this.uiStage.addElement(this.sceneList[sceneID]);
            this.curSceneID = sceneID;  
            }
    
}





