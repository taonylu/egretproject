/**
 * 我的团队页面
 * @author 
 *
 */
class MyTeamScene extends BaseScene{
    private backBtn:eui.Image;   //返回按钮
    
	public constructor() {
    	super("MyTeamSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
    }
	
    public onEnable(): void {
        
    }

    public onRemove(): void {

    }
    
    public showTeam(){
        wx.downloadImage({
            serverId: "", // 需要下载的图片的服务器端ID，由uploadImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function(res) {
                var localId = res.localId; // 返回图片下载后的本地ID
                //self.showPic(localId);
            }
        });
    }
}
