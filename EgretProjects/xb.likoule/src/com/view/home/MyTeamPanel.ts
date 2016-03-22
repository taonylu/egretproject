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
        GameManager.getInstance().homeScene.rankGroup.visible = true;
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
        if(data[0] != undefined){
            var team = data[0];
            this.teamLabel0.text = team.teamName;
            var member = team.member;
            for(var i = 0;i < team.totalScore;i++){
                this.memberNameList[i].text = member[i].nickName;
                this.memberScoreList[i].text = member[i].score;
                var imageLoader:CImageLoader= this.imageLoaderList[i];
                imageLoader.id = i;
                imageLoader.addEventListener(egret.Event.COMPLETE,this.loadCompleteHandler, this); 
                //imageLoader.load(member[i].headImg);
            }
        }
       
    }
    
    private loadCompleteHandler(event: egret.Event): void {
        var imageLoader = <CImageLoader>event.currentTarget;
        var bitmap: egret.Bitmap = new egret.Bitmap(imageLoader.data);
        this.memberHeadList[imageLoader.id].addChild(bitmap);

    }
}















