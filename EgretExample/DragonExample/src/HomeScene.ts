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
        this.initDragonBones();
	}
	
	/**初始化龙骨*/
	private initDragonBones(){
        var dragonBonesUtils: DragonBonesUtils = DragonBonesUtils.getInstance();
        dragonBonesUtils.addDragonBonesByConfig(this.dragonbonesList);
        var display:dragonBones.EgretArmatureDisplay =  dragonBonesUtils.getArmatureDisplay("scorpion");
        this.addChild(display);
        display.x = 200;
        display.y = 200;
        display.animation.play("attack");
	}
}












