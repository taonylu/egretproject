/**
 * 我的团队
 * @author 
 *
 */
class MyTeamPanel extends BaseUI{
    private closeBtn:eui.Image;
    
    private teamLabel0:eui.Label;   
    private teamLabel1:eui.Label;
    
    private memberHeadList:Array<eui.Group> = new Array<eui.Group>();
    private memberNameList:Array<eui.Label> = new Array<eui.Label>();
    private memberScoreList: Array<eui.Label> = new Array<eui.Label>();
    private memberNum:number = 6;
    
    private imageLoaderList: Array<CImageLoader> = new Array < CImageLoader>();
    
	public constructor() {
    	super("MyTeamPanelSkin");
        this.percentWidth = 100;
        this.percentHeight = 100;
	}
	
    protected componentCreated(): void {
        super.componentCreated();
        for(var i=0;i<this.memberNum;i++){
            this.memberHeadList.push(this["memberHead" + i]);
            this.memberNameList.push(this["memberName" + i]);
            this.memberScoreList.push(this["memberScore" + i]);
            this.imageLoaderList.push(new CImageLoader());
        }
    }

    protected onEnable() {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseTouch, this);
    }

    protected onRemove() {
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onCloseTouch,this);
    }
    
    private onCloseTouch(){
        this.hide();
        LayerManager.getInstance().popLayer.addChild(GameManager.getInstance().rankPanel);
    }
    
    public setView(data){
        //清理
        this.teamLabel0.text = "";
        this.teamLabel1.text = "";
        for(var i = 0;i < this.memberNum;i++) {
            if(this.memberHeadList[i].numChildren > 0){
                this.memberHeadList[i].removeChildAt(0);
            }
            this.memberNameList[i].text = "";
            this.memberScoreList[i].text = "";
        }

        //设置新的
        var teamLen = data.length;
        for(var i=0;i<teamLen;i++){
            var team = data[i];
            this["teamLabel" + i].text = team.teamName;
            var member = team.member;
            for(var j = 0;j < member.length;j++) {
                var index = j+3*i;  //ui组件的数组下标
                this.memberNameList[index].text = member[j].nickName;
                this.memberScoreList[index].text = member[j].score;
                var imageLoader: CImageLoader = this.imageLoaderList[index];
                imageLoader.id = index;
                imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler,this);
                imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onLoadError, this);
                imageLoader.load(member[j].headImg);
            }
        }  
    }
    
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <CImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        this.memberHeadList[imageLoader.id].addChild(bitmap);
    }
    
    private onLoadError(){
        alert("加载头像错误");
    }
}















