var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * command常量
 * @author chenkai
 * @date 2017/2/8
 */
var CmdConst = (function () {
    function CmdConst() {
    }
    return CmdConst;
}());
/**启动命令*/
CmdConst.STARTUP = "STARTUP";
__reflect(CmdConst.prototype, "CmdConst");
