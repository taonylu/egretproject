/**
 * 舞台管理类
 * @author chenkai
 * @date 2016/12/23
 */
class StageUtils extends SingleClass {
    /**舞台*/
    private stage: egret.Stage;

    /**初始化舞台 egret.MainContext API废弃，这里必须在Main.ts里传入stage*/
    public init(stage: egret.Stage) {
        this.stage = stage;
    }

    /**获取舞台*/
    public getStage(): egret.Stage {
        return this.stage;
    }

    /**舞台宽度*/
    public get stageWidth() {
        return this.stage.stageWidth;
    }

    /**舞台高度*/
    public get stageHeight() {
        return this.stage.stageHeight;
    }
	
    /**改变舞台适配模式 PC上showall，手机上大于4:3FixedWidth，小于4:3showAll*/
    public changeStageMode() {
        if(App.DeviceUtils.isPC) {
            this.changeBgColor("#ffffff");
            this.getStage().orientation = egret.OrientationMode.AUTO;
            this.getStage().scaleMode = egret.StageScaleMode.SHOW_ALL;
        } else {
            this.changeBgColor("#fb5116");
            if(this.stageHeight / this.stageWidth <= 4 / 3) {
                this.getStage().scaleMode = egret.StageScaleMode.SHOW_ALL;
            } else {
                this.getStage().scaleMode = egret.StageScaleMode.FIXED_WIDTH;
            }
        }
    }
	
    /**改变背景颜色*/
    public changeBgColor(color: string) {
        document.body.style.backgroundColor = color;
    }
	
    /**激活和非激活处理*/
    public activeHandler() {
        this.stage.addEventListener(egret.Event.ACTIVATE,() => {
            egret.log("active");
            App.Sound.resumeBGM();
        },this);

        this.stage.addEventListener(egret.Event.DEACTIVATE,() => {
            egret.log("deactive");
            App.Sound.pauseBGM();
        },this);
    }
	
   


}








