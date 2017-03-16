var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 游戏场景
 * @author chenkai
 * @since 2017/3/16
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.skinName = "GameSceneSkin";
        return _this;
    }
    GameScene.prototype.childrenCreated = function () {
        console.log("game childrenCreated");
    };
    GameScene.prototype.onEnable = function () {
        console.log("game onEnable");
    };
    GameScene.prototype.onRemove = function () {
        console.log("game onRemove");
    };
    return GameScene;
}(BaseScene));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map