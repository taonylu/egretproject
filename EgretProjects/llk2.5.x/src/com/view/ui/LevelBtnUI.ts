/**
*  功    能： 选关按钮
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/10/23
*  修改日期：
*  修改日志：
*/
class LevelBtnUI extends BaseUI{
    private levelNumLabel: eui.Label;
    private titleLabel: eui.Label;
    private fishLabel: eui.Label;
    private starLabel: eui.Label;
    
    public levelNum: number = 0;
    
    private tempLevelNum: number;
    private tempTitle: string;
    private tempFishNum: number;
    private tempStarNum: number;
    
	public constructor() {
        super();
        this.skinName = "resource/myskins/LevelBtnUISkin.exml";
        this.touchChildren = false;
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.levelNumLabel.touchEnabled = false;
        this.titleLabel.touchEnabled = false;
        this.fishLabel.touchEnabled = false;
        this.starLabel.touchEnabled = false;
        
        this.setLevelNumLabel(this.tempLevelNum);
        this.setTitleLabel(this.tempTitle);
        this.setFishLabel(this.tempFishNum);
        this.setStarLabel(this.tempStarNum);
    }
    
    public setLevelNumLabel(levelNum: number):void {
        this.tempLevelNum = levelNum;
        this.levelNum = levelNum;
        if(this.inited) {
            this.levelNumLabel.text = "-" + this.tempLevelNum + "-";
        }
        
    }
    
    public setTitleLabel(title:string): void {
        this.tempTitle = title;
        if(this.inited) {
            this.titleLabel.text = this.tempTitle;
        }
    }
    
    public setFishLabel(fishNum: number): void {
        this.tempFishNum = fishNum;
        if(this.inited) {
            this.fishLabel.text = this.tempFishNum.toString();
        }
        
    }
    public setStarLabel(starNum: number): void {
        this.tempStarNum = starNum;
        if(this.inited) {
            this.starLabel.text = this.tempStarNum.toString();
        }
    }
}













