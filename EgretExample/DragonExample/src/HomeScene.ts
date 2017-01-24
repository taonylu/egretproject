/**
 *
 * @author 
 *
 */
class HomeScene extends eui.Component{
    /**龙骨动画配置列表*/
    private dragonbonesList = [
        ["scorpion_json","scorpion_texture_json","scorpion_texture_png"],
        ["SwordsMan_json","SwordsMan_texture_json","SwordsMan_texture_png"]
    ];
    
    
	public constructor() {
    	super();
    	this.skinName = "HomeSceneSkin";
	}
	
	public childrenCreated(){
    	  
        
        
	}
	
	/**初始化龙骨*/
	private initDragonBones(){
        DragonBonesUtils.getInstance().addDragonBonesByConfig(this.dragonbonesList);
	}
}












