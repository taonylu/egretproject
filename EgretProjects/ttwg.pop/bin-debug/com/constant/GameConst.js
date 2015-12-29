/**
 * 游戏常量
 * @author
 *
 */
var GameConst = (function () {
    function GameConst() {
    }
    var d = __define,c=GameConst;p=c.prototype;
    GameConst.totalScore = 10000; //封顶分数
    GameConst.zheScore = [1000, 3000, 10000]; //达到相应折扣所需分数
    GameConst.zheList = [9, 8.5, 8]; //折扣
    return GameConst;
})();
egret.registerClass(GameConst,"GameConst");
var GameState;
(function (GameState) {
    GameState[GameState["Free"] = 0] = "Free";
    GameState[GameState["SelectRect"] = 1] = "SelectRect";
    GameState[GameState["WaitCancelRect"] = 2] = "WaitCancelRect";
    GameState[GameState["RefreshRect"] = 3] = "RefreshRect";
})(GameState || (GameState = {}));
var RectColor;
(function (RectColor) {
    RectColor[RectColor["Red"] = 0] = "Red";
    RectColor[RectColor["Blue"] = 1] = "Blue";
    RectColor[RectColor["Green"] = 2] = "Green";
})(RectColor || (RectColor = {}));
;
