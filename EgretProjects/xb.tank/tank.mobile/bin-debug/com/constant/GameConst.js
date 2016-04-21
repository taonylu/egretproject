/**
 * 游戏常量
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst,p=c.prototype;
    return GameConst;
}());
egret.registerClass(GameConst,'GameConst');
//坦克行为
var ActionEnum;
(function (ActionEnum) {
    ActionEnum[ActionEnum["up"] = 0] = "up";
    ActionEnum[ActionEnum["down"] = 1] = "down";
    ActionEnum[ActionEnum["left"] = 2] = "left";
    ActionEnum[ActionEnum["right"] = 3] = "right";
    ActionEnum[ActionEnum["stopMove"] = 4] = "stopMove";
    ActionEnum[ActionEnum["stopShoot"] = 5] = "stopShoot";
    ActionEnum[ActionEnum["shoot"] = 6] = "shoot";
})(ActionEnum || (ActionEnum = {}));
