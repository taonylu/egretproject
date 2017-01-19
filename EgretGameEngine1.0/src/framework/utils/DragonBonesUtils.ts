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
	 * 添加龙骨动画数据
	 * @configList 龙骨配置数组 [[dataRes, textureDataRes, textureRes],...]
	 */ 
    public addDragonBonesByConfig(configList:Array<any>){
        var len = configList.length;
        for(var i=0;i<len;i++){
            var config = configList[i];
            var dragonbonesData = RES.getRes(config[0]);
            var textureData = RES.getRes(config[1]);
            var texture = RES.getRes(config[2]);
            this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
        }
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












