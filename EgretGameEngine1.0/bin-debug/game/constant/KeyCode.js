var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 键盘按钮值常量
 * @author chenkai
 * @since 2016/12/29
 */
var KeyCode = (function () {
    function KeyCode() {
    }
    return KeyCode;
}());
/* 键盘事件
    window.document.onkeydown = onKeyDownHandler;
    function onKeyDownHandler(e){
        e = (e) ? e : window.event;
        if (e ) {
           if(e.keyCode == KeyCode.Left){
              //TODO
           }
       }
    }
*/
KeyCode.Left = 37;
KeyCode.Up = 38;
KeyCode.Right = 39;
KeyCode.Down = 40;
KeyCode.A = 65;
KeyCode.D = 68;
KeyCode.W = 87;
KeyCode.S = 83;
__reflect(KeyCode.prototype, "KeyCode");
//# sourceMappingURL=KeyCode.js.map