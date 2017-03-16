var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 骨骼动画工具
 * @author chenkai
 * @date 2017/1/19
 Example:
 //龙骨配置列表
 private dragonbonesList = [
        ["scorpion_json","scorpion_texture_json","scorpion_texture_png"],
        ["SwordsMan_json","SwordsMan_texture_json","SwordsMan_texture_png"]
    ];
//配置数据，并获取骨骼动画
var dragonBonesUtils: DragonBonesUtils = DragonBonesUtils.getInstance();
dragonBonesUtils.addDragonBonesByConfig(this.dragonbonesList);
var display:dragonBones.EgretArmatureDisplay =  dragonBonesUtils.getArmatureDisplay("scorpion");
this.addChild(display);
display.x = 200;
display.y = 200;
display.animation.play("attack");
 
 */
var DragonBonesUtils = (function (_super) {
    __extends(DragonBonesUtils, _super);
    function DragonBonesUtils() {
        var _this = _super.call(this) || this;
        _this.factory = new dragonBones.EgretFactory();
        return _this;
    }
    /**
     * 添加龙骨动画数据
     * @dragonData 龙骨数据
     * @texureJson 贴图集数据
     * @texture 贴图
     */
    DragonBonesUtils.prototype.addDragonBones = function (dragonbonesData, textureData, texture) {
        this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
    };
    /**
     * 添加龙骨动画数据
     * @configList 龙骨配置数组 [[dataRes, textureDataRes, textureRes],...]
     */
    DragonBonesUtils.prototype.addDragonBonesByConfig = function (configList) {
        var len = configList.length;
        for (var i = 0; i < len; i++) {
            var config = configList[i];
            var dragonbonesData = RES.getRes(config[0]);
            var textureData = RES.getRes(config[1]);
            var texture = RES.getRes(config[2]);
            this.factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
            this.factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        }
    };
    /**
     * 获取骨架
     * @armatureName 骨架名
     * @return 返回骨架
     */
    DragonBonesUtils.prototype.getArmatureDisplay = function (armatureName) {
        return this.factory.buildArmatureDisplay(armatureName);
    };
    return DragonBonesUtils;
}(SingleClass));
__reflect(DragonBonesUtils.prototype, "DragonBonesUtils");
//# sourceMappingURL=DragonBonesUtils.js.map