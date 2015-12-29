/**
 * 结果界面
 * @author 
 *
 */
class ResultScene extends BaseScene{
    private resultGroup: eui.Group;
    private prizeLabel: eui.Label;
    private codeLabel: eui.EditableText;
    private code: eui.Image;
    private moneyImg: eui.Image;
    private moneybg: eui.Image;
    private itemImg:eui.Image;
    
    private htmlText: HTMLText;
    private qrcode: QRCode;
    
	public constructor() {
        super("ResultSceneSkin");  
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.qrcode = new QRCode();
        this.qrcode.createCode();
        
        this.resultGroup.y = GameConst.stage.stageHeight - this.resultGroup.height;
        
        this.htmlText = new HTMLText();
        
        var xPos: number = 80/640*document.body.clientWidth;
        var yPos: number = (this.resultGroup.y + 310) / 1150 * document.body.clientHeight;
        
        this.htmlText.setPosition(xPos,yPos);
        
        this.setPrizeLabel("");
        this.setCodeLabel("");
    }
    
    public onEnable(): void {
        //显示二维码
        var yPos: number = document.body.clientHeight * (820 / 1150);
        
        this.qrcode.showCode(20,yPos,70,70);

        this.setPrizeLabel(GameConst.prizeJson.msg);     //奖品描述
        this.setCodeLabel(GameConst.prizeJson.prizenum); //优惠券码
        this.setPrizeImg(GameConst.prizeJson.prizeid);   //奖品图片         
    }
    
    public onRemove(): void {
        this.qrcode.hideCode();
    }
	
    public setPrizeLabel(prize:string): void {
        this.prizeLabel.text = prize;
    }
    
    public setCodeLabel(code:string): void {
        //this.codeLabel.text = code;
        this.htmlText.setValue(code);
    }
    
    public setPrizeImg(prizeid:number): void {
        this.moneyImg.visible = false;
        this.itemImg.visible = false;
        this.moneybg.visible = false;
        if(prizeid >= 1 && prizeid <= 5) {  //显示物品
            this.itemImg.visible = true;
            this.itemImg.texture = RES.getRes("prize" + prizeid + "_png");
        } else if(prizeid >=6 && prizeid <=9){  //显示现金劵
            this.moneybg.visible = true;
            this.moneyImg.visible = true;
            this.moneyImg.texture = RES.getRes("prize" + prizeid + "_png");
        }
    }
	
}
