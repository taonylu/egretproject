var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 场景常量
 * @author chenkai
 * @since 2016/12/28
 */
var SceneConst = (function () {
    function SceneConst() {
    }
    return SceneConst;
}());
/**主页*/
SceneConst.HOME = "HOME";
/**游戏*/
SceneConst.GAME = "GAME";
/**结算*/
SceneConst.RESULT = "RESULT";
__reflect(SceneConst.prototype, "SceneConst");
//# sourceMappingURL=SceneConst.js.map