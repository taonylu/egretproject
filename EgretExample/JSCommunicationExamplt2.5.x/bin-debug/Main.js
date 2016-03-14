var Main = (function (_super) {
    __extends(Main, _super);
    //-------------------测试目的------------
    //1. TS调用JS
    //2. JS调用TS
    function Main() {
        _super.call(this);
        //调用JS函数
        console.log("egret调用js函数:", window['getJS']());
        //调用JS变量
        var weixinConfig = window["weixinConfig"];
        console.log("egret调用JS变量:", window["weixinConfig"], weixinConfig.desc);
        //定义变量，供html调用
        var tsValue = "I'm tsValue";
        window["tsValue"] = tsValue;
        //定义函数，供html调用，必须传递对象
        window["main"] = this;
    }
    var d = __define,c=Main,p=c.prototype;
    //被html调用的函数
    p.sayHello = function () {
        return "hello";
    };
    //静态函数
    Main.getTS = function () {
        return "I'm ts";
    };
    return Main;
})(egret.Sprite);
egret.registerClass(Main,'Main');
