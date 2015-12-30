var Main = (function (_super) {
    __extends(Main, _super);
    //-------------------测试目的------------
    //1. TS调用JS
    //2. JS调用TS
    function Main() {
        _super.call(this);
        //----------------TS调用JS---------------------
        //1. index.html中定义getJS函数
        //2. 使用window['函数']调用JS   
        //3. index.html的getJS函数必须写在 egret.runEgret()中的<script>标签中
        console.log(window['getJS']());
        //------------------JS调用TS----------------
        //1. 直接在JS中使用 Main.getTS即可
        //2. 发布后的代码都是JS，所以可以互相访问?
    }
    var d = __define,c=Main;p=c.prototype;
    Main.getTS = function () {
        return "I'm ts";
    };
    return Main;
})(egret.Sprite);
egret.registerClass(Main,"Main");
