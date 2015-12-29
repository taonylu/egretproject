/**
 * 获奖文本
 * @author 
 *
 */
class LuckText extends BaseUI{
    private nameLabel: eui.Label;
    private prizeLabel: eui.Label;
    private __name: string = "";
    private __prize: string = "";
    
	public constructor() {
        super("LuckTextSkin");
        
	}
	
    public componentCreated(): void {
        super.componentCreated();
        this.setNameLabel(this.__name);
        this.setPrizeLabel(this.__prize);
    }
	
    public setNameLabel(nickname:string): void {
        this.__name = nickname;
        if(this.inited) {
            this.nameLabel.text = this.__name;
        }
    }
    
    public setPrizeLabel(prize:string): void {
        this.__prize = prize;
        if(this.inited) {
            this.prizeLabel.text = this.__prize;
        }
    }
}
