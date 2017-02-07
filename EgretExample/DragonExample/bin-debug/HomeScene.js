/**
 *
 * @author
 *
 */
var HomeScene = (function (_super) {
    __extends(HomeScene, _super);
    function HomeScene() {
        _super.call(this);
        /**龙骨动画配置列表*/
        this.dragonbonesList = [
            ["scorpion_json", "scorpion_texture_json", "scorpion_texture_png"],
            ["SwordsMan_json", "SwordsMan_texture_json", "SwordsMan_texture_png"]
        ];
        this.skinName = "HomeSceneSkin";
    }
    var d = __define,c=HomeScene,p=c.prototype;
    p.childrenCreated = function () {
        this.initDragonBones();
    };
    /**初始化龙骨*/
    p.initDragonBones = function () {
        var dragonBonesUtils = DragonBonesUtils.getInstance();
        dragonBonesUtils.addDragonBonesByConfig(this.dragonbonesList);
        var display = dragonBonesUtils.getArmatureDisplay("scorpion");
        this.addChild(display);
        display.x = 200;
        display.y = 200;
        display.animation.play("attack");
    };
    return HomeScene;
}(eui.Component));
egret.registerClass(HomeScene,'HomeScene');
