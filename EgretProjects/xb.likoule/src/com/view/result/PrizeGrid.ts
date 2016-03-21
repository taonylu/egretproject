/**
 * 奖品格子
 * @author 
 *
 */
class PrizeGrid extends eui.Component{
    private back:eui.Image;          //背面
    private resultBg:eui.Image;      //结果背景
    private light:eui.Image;         //结果背景发光
    private thx:eui.Image;           //谢谢参与
    private luck:eui.Image;          //幸运奖
    private bigLuck:eui.Image;       //幸运大奖
    
    
	public constructor() {
    	super();
    	this.skinName = "PrizeGridSkin";
	}
	
	
	private hideAll(){
    	this.back.visible = false;
    	this.resultBg.visible = false;
    	this.light.visible = false;
    	this.thx.visible = false;
    	this.luck.visible = false;
    	this.bigLuck.visible = false;
	}
	
	//显示选中时高亮
	public showLight(){
    	this.light.visible = true;
	}
	
	//显示未有结果前的格子背景
	public showBack(){
    	this.hideAll();
    	this.back.visible = true;
	}
	
	//谢谢参与
	public showThx(){
    	this.hideAll();
    	this.resultBg.visible = true;
    	this.thx.visible = true;
	}
	
	//幸运奖
	public showLuck(){
    	this.hideAll();
      this.resultBg.visible = true;
    	this.luck.visible = true;
	}
	
	//幸运大奖
	public showBigLuck(){
    	this.hideAll();
      this.resultBg.visible = true;
    	this.bigLuck.visible = true;
	}
	    
}













