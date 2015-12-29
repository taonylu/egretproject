/**
*  文 件 名：LevelBtnUI.ts
*  功    能   : 关卡按钮
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/8/23
*  修改日期：2015/8/23
*  修改日志：
*/
class LevelBtnUI extends egret.gui.SkinnableComponent{
    /**关卡文本*/
    private levelLabel: egret.gui.BitmapLabel;
    /**当前玩的关卡*/
    private cur: egret.gui.UIAsset;
    /**已过关关卡*/
    private read: egret.gui.UIAsset;
    /**未解锁关卡*/
    private notRead: egret.gui.UIAsset;
    /**星星*/
    private star1: egret.gui.UIAsset;
    private star2: egret.gui.UIAsset;
    private star3: egret.gui.UIAsset;
    /**空的星星*/
    private empty1: egret.gui.UIAsset;
    private empty2: egret.gui.UIAsset;
    private empty3: egret.gui.UIAsset;
    private starList: Array<egret.gui.UIAsset>;
    private emptyList: Array<egret.gui.UIAsset>;
    /**关卡按钮*/
    private btnList: Array<egret.gui.UIAsset>;
    /**关卡数*/
    private levelNum: number;
    /**状态数量*/
    private stateNum: number = 3;
    /**当前状态*/
    private curState: LevelState;
    
	public constructor() {
        super();
        this.touchChildren = false;
	}
	
	
    public childrenCreated(): void { 
        this.starList = new Array<egret.gui.UIAsset>();
        this.emptyList = new Array<egret.gui.UIAsset>();
        this.btnList = new Array<egret.gui.UIAsset>();
        
        this.starList.push(this.star1,this.star2,this.star3);
        this.emptyList.push(this.empty1,this.empty2,this.empty3);
        this.btnList.push(this.notRead,this.read,this.cur);
        
        this.setState(LevelState.NotRead);
        this.setStar(0);
        this.setLevelNum(0);
    }
    
    /**设置状态 0未解锁 1已过关 2当前所在关卡*/
    public setState(state:LevelState): void { 
        for(var i: number = 0;i < this.stateNum;i++) { 
            this.btnList[i].visible = false;
        }
        this.btnList[state].visible = true;
    }  
    
    /**设置星星数*/
    public setStar(count:number): void { 
        for(var i: number = 0;i < this.stateNum;i++) { 
            if(i < count) {
                this.starList[i].visible = true;
                this.emptyList[i].visible = false;
            } else { 
                this.starList[i].visible = false;
                this.emptyList[i].visible = true;
            }
        }
    }
    
    /**设置关卡数*/
    public setLevelNum(count:number): void { 
        this.levelLabel.text = count.toString();
    }
	
}















