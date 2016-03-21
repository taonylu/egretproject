/**
 * 主页场景
 * @author 
 *
 */
class HomeScene extends BaseScene{
    private acceptGroup:eui.Group;  //接收邀请Group
    private acceptBtn:eui.Image;    //接收邀请
    private ruleBtn:eui.Image;      //游戏规则
    
    private invitFailGroup:eui.Group; //邀请失败Group
    private closeBtn:eui.Image;       //关闭按钮
    private invitFailLabel:eui.Label; //邀请失败文本
    
    private beginGroup:eui.Group;    //开始Group
    private beginBtn:eui.Image;      //开始
    private ruleBtn2:eui.Image;      //游戏规则
    private teamBtn:eui.Image;       //组队
    
    private rankGroup:eui.Group;     //排行榜Group
    private rankBtn:eui.Image;       //排行榜
    private prizeBtn:eui.Image;      //获取名单
    
    
    public constructor() {
        super("HomeSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.invitFailLabel.text = GameConst.config.invitFail;
        
    }

    public onEnable(): void {
        //隐藏
        this.acceptGroup.visible = false;
        this.invitFailGroup.visible = false;
        this.beginGroup.visible = false;
        this.rankGroup.visible = true;
        
        //TODO 根据获取的变量显示Group
        this.beginGroup.visible = true;

        this.configListeners();
    }

    public onRemove(): void {
        
    }
    
    private configListeners(){
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
    }
    
    private deConfigListeners(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this);
    }
    
    private onTouchTap(e:egret.TouchEvent){
        switch(e.target){
            case this.acceptBtn:   //接收邀请
               
                break;
            case this.ruleBtn:     //游戏规则
            case this.ruleBtn2:
                 this.addChild(GameManager.getInstance().rulePanel);
                break;
            case this.closeBtn:    //关闭邀请失败
                
                break;
            case this.beginBtn:    //开始游戏
                LayerManager.getInstance().runScene(GameManager.getInstance().gameScene);
                break;
            case this.teamBtn:     //组队
                //TODO 判断显示组队按钮
                this.addChild(GameManager.getInstance().teamForm);
                break;
            case this.rankBtn:     //排行榜
                this.addChild(GameManager.getInstance().rankPanle);
                break;
            case this.prizeBtn:    //获奖名单
                this.addChild(GameManager.getInstance().prizePanel);
                break;
        }
    }
    
    
    
}















