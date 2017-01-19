/**
 * 骨骼动画工具
 * @author chenkai 
 * @date 2017/1/19
 */
class DragonBonesUtils extends SingleClass{
    /**工厂*/
    private factory: dragonBones.EgretFactory;
    
	public constructor() {
    	super();
        this.factory = new dragonBones.EgretFactory();
	}
	
	/**
	 * 添加龙骨动画数据
	 * @dragonData 龙骨数据
	 * @texureJson 贴图集数据
	 * @texture 贴图
	 */ 
    public addDragonBones(dragonbonesData:any, textureData:any, texture:egret.Texture){
        this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
	}
	
	/**
	 * 获取骨架
	 * @armatureName 骨架名
	 * @return 返回骨架
	 */ 
	public getArmatureDisplay(armatureName:string):dragonBones.EgretArmatureDisplay{
        return this.factory.buildArmatureDisplay(armatureName);
	}
	
}












