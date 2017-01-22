/**
 * 键盘按钮值常量
 * @author chenkai
 * @date 2016/12/29
 */
var KeyCode = (function () {
    function KeyCode() {
    }
    var d = __define,c=KeyCode,p=c.prototype;
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
    return KeyCode;
}());
egret.registerClass(KeyCode,'KeyCode');
