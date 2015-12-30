/**
 *
 * @author
 *
 */
var GameManager = (function () {
    function GameManager() {
        this.textExample = new TextExample();
        this.buttonExample = new ButtonExample();
    }
    var d = __define,c=GameManager;p=c.prototype;
    //启动
    p.startup = function () {
        //this.textExample.test();
        this.buttonExample.test();
    };
    return GameManager;
})();
egret.registerClass(GameManager,"GameManager");
