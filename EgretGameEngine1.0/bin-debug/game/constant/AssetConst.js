var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 资源常量
 */
var AssetConst = (function () {
    function AssetConst() {
    }
    return AssetConst;
}());
/**预加载*/
AssetConst.Preload = "preload";
/**主页*/
AssetConst.Home = "home";
/**游戏*/
AssetConst.Game = "game";
/**结算*/
AssetConst.Result = "result";
/**声音*/
AssetConst.Sound = "sound";
__reflect(AssetConst.prototype, "AssetConst");
