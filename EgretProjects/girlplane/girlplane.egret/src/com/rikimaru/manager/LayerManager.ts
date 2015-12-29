/**
*  文 件 名：LayerManager.ts
*  功    能： 图层管理类
*  内    容： 游戏图层、场景管理
*  作    者： Rikimaru
*  生成日期：2015/8/21
*  修改日期：2015/8/22
*  修改日志：
*/
class LayerManager {
    /**单例*/
    private static instance: LayerManager;
    /**Stage*/
    public  stage: egret.Stage;
    /**UIStage*/
    public  uiStage: egret.gui.UIStage;
    /**UIStage场景层*/
    public uiSceneLayer: egret.gui.Group;
    /**UIStage弹框层*/
    public uiPopLayer: egret.gui.Group;
    /**存放场景数组*/
    private sceneList: Object;
    /**当前场景*/
    private curSceneName: string;
    /**场景动画时间*/
    private tweenTime: number = 500;
    
    /**全局用加载面板*/
    public loadingPanel: LoadingPanel;
   
    public static getInstance(): LayerManager { 
        if(this.instance == null) { 
            this.instance = new LayerManager();
        }
        return this.instance;
    }

    /**初始化*/
    public initialize(stage:egret.Stage): void { 
        this.sceneList = {};
        
        this.stage = stage;
        
        this.uiStage = new egret.gui.UIStage();
        stage.addChild(this.uiStage);
        
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
    public  replaceScene(nextSceneName:string, tween:STween=STween.None, destroy:boolean=false): void { 
        //隐藏或销毁当前场景
        if(this.curSceneName != undefined) {
            var curScene: BaseScene = this.sceneList[this.curSceneName];
            if(curScene) {
                curScene.onRemove();  //缓动前，移除场景监听等
                if(destroy) { 
                    curScene.onDestroy();
                    this.sceneList[this.curSceneName] = null;
                }
            } 
        }       
        //添加要运行的场景
        var nextScene:BaseScene = this.sceneList[nextSceneName];
        if(nextScene == null) {
            var clazz: any = egret.getDefinitionByName(nextSceneName);
            if(clazz != null) {
                nextScene = new clazz();
                this.sceneList[nextSceneName] = nextScene;
            } else {
                console.warn("场景不存在:" + nextSceneName);
                return;
            }
        } else { 
            nextScene.onEnable();
        }    
        this.curSceneName =nextSceneName; 
        
        this.playSceneTween(curScene,nextScene,tween);
    }
    
    /**场景过渡动画*/
    private playSceneTween(curScene:BaseScene, nextScene:BaseScene, tween:STween): void { 
        var self: LayerManager = this;
        switch(tween) { 
            case STween.None:    
                curScene && self.uiSceneLayer.removeElement(curScene);
                self.uiSceneLayer.addElement(nextScene);
            break;
            case STween.R:   
                nextScene.x = self.stage.stageWidth;
                this.uiSceneLayer.addElement(nextScene);
                egret.Tween.get(nextScene).to({ x: 0 },this.tweenTime,egret.Ease.quartOut).call(function(): void {
                    self.uiSceneLayer.removeElement(curScene);
                });
                break;
            }
    }
    
    /**获取场景*/
    public getScene(sceneName: string): BaseScene { 
        return this.sceneList[sceneName];
    }
    
    /**显示加载动画*/
    public showLoading(): void { 
        if(this.loadingPanel == null) { 
            this.loadingPanel = new LoadingPanel();
        }
        this.uiPopLayer.addElement(this.loadingPanel);
        this.loadingPanel.onEnable();
    }
    
    /**隐藏加载动画*/
    public hideLoading(): void { 
        if(this.loadingPanel) { 
            this.loadingPanel.onRemove();
            this.uiPopLayer.removeElement(this.loadingPanel);
        }
    }

}











