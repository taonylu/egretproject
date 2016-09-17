/**
 *
 * @author 
 *
 */
class Test extends eui.Component{
  
	public constructor() {
    	super();
    	this.skinName = "TestSkin";
    	
    	
	}
	
	private tab:eui.TabBar;
	private stak:eui.ViewStack;
	
	protected childrenCreated(){
        this.tab.dataProvider = this.stak;
	}
	

}
