


class Main extends egret.Sprite {

    //-------------------测试目的------------
    //1. TS调用JS
    //2. JS调用TS
    
    public constructor() {
        super();
        
       //调用JS函数
        console.log("egret调用js函数:",window['getJS']());
        
        //调用JS变量
        var weixinConfig = window["weixinConfig"];
        console.log("egret调用JS变量:",window["weixinConfig"],weixinConfig.desc);
        
        //定义变量，供html调用
        var tsValue = "I'm tsValue";
        window["tsValue"] = tsValue;
        
        //定义函数，供html调用，必须传递对象
        window["main"] = this;
    }
    
    //被html调用的函数
    public sayHello():string{
        return "hello";
    }
    
    //静态函数
    public static getTS(): string {
        return "I'm ts";
    }
}