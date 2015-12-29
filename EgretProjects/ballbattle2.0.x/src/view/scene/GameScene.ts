/**
*  文 件 名：GameScene.ts
*  功    能：主页场景
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class GameScene extends BaseScene{
    private contentGroup: egret.gui.Group;    //内容容器
    public weightLabel: egret.gui.Label;      //体重文本
    private rank0Label: egret.gui.Label;      //排行榜文本
    private rank1Label: egret.gui.Label;
    private rank2Label: egret.gui.Label;
    private rank3Label: egret.gui.Label;
    private rank4Label: egret.gui.Label;
    private rankLabelNum: number = 5;         //排行榜列表
    private rankLabelList: Array<egret.gui.Label> = new Array<egret.gui.Label>();  //排行榜数组
    private fenlieBtn: NarrowButton;      //分裂按钮
    private tupaopaoBtn:NarrowButton;     //吐泡泡按钮
    private topLabel: egret.gui.Label;        //顶部文本
    
    public gameSprite: GameSprite;                  //场景容器
    public topSprite: egret.DisplayObjectContainer; //顶层场景容器
    
	public constructor() {
        super();
        this.skinName = skins.scene.GameSceneSkin;
        this.gameSprite = new GameSprite();
	}
	
    public childrenCreated(): void {
        this.initView();
        this.onEnable();
    }
    
    public onEnable(): void { 
        this.gameSprite.startGame();
        this.configListeners();
    }
    
    public onRemove(): void { 
        this.deConfigListeners();
    }
    
    private configListeners(): void { 
        this.fenlieBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onFenLieBtnClick,this);
        this.tupaopaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTuPaoPaoBtnClick,this);
    }
    
    private deConfigListeners(): void { 
        this.fenlieBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onFenLieBtnClick,this);
        this.tupaopaoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTuPaoPaoBtnClick,this);
    }
    
    private onFenLieBtnClick(): void { 
        this.gameSprite.sendFenLie();
    }
        
    private onTuPaoPaoBtnClick(): void { 
        this.gameSprite.sendTuPaoPao();
    }

    //初始化视图
    private initView():void{
        //添加游戏容器
        var uiAsset: egret.gui.UIAsset = new egret.gui.UIAsset(this.gameSprite);
        uiAsset.touchEnabled = false;
        uiAsset.touchChildren = false;
        this.contentGroup.addElement(uiAsset);
        this.gameSprite.gameScene = this;

        this.topSprite = new egret.DisplayObjectContainer();
        this.topSprite.touchEnabled = false;
        this.topSprite.touchChildren = false;
        var topUIAsset: egret.gui.UIAsset = new egret.gui.UIAsset(this.topSprite);
        topUIAsset.touchChildren = false;
        topUIAsset.touchEnabled = false;
        this.contentGroup.addElement(topUIAsset);
        this.gameSprite.topSprite = this.topSprite;

        //组件初始化
        for(var i: number=0;i < this.rankLabelNum;i++) {
            this.rankLabelList.push(this["rank" + i + "Label"]);
        }
        this.fenlieBtn.setMode(NarrowButton.MODE_BIG);
        this.tupaopaoBtn.setMode(NarrowButton.MODE_BIG);
    }

    
    //设置排行榜
    public setRankLabel(): void {
        var playerM:PlayerManager = PlayerManager.getInstance();
        var weightList:Object = playerM.weightList;
        var tempArr: Array<any> = new Array<any>();
        //根据用户名称存储重量
        for(var i in weightList) {
            var player:BaseSpore = playerM.getOneSporeByUserID(i);
            if(player != null){
                var userName:string = player.userName;
                tempArr.push([userName ,weightList[i]]);
            }
        }
        //排序
        var len: number = tempArr.length;
        for(i = 0;i < len;i++) { 
            for(var j = i+1;j < len;j++) {
                if(tempArr[i][1] < tempArr[j][1]) {
                    var temp =tempArr[i];
                    tempArr[i] = tempArr[j];
                    tempArr[j] = temp;
                }
            }
        }
        //显示
        for(i = 0;i < this.rankLabelNum;i++) { 
            if(tempArr[i] != null) {
                this.rankLabelList[i].text = tempArr[i][0];
            } else { 
                this.rankLabelList[i].text = "";
            }
        }
    }
    
    //设置重量文本
    public setWeightLabel(weight: number): void { 
        this.weightLabel.text = "体重：" + weight + "毫克";
    }
    
    //设置顶部文本
    public setTopLabel(msg: string): void { 
        this.topLabel.text = msg;
    } 
}




