


class Main extends egret.Sprite {

    //-------------------测试目的------------
    //1. TS调用JS
    //2. JS调用TS
    
    public constructor() {
        super();
        
        //----------------TS调用JS---------------------
        //1. index.html中定义getJS函数
        //2. 使用window['函数']调用JS   
        //3. index.html的getJS函数必须写在 egret.runEgret()中的<script>标签中
        console.log(window['getJS']());
        
        //------------------JS调用TS----------------
        //1. 直接在JS中使用 Main.getTS即可
        //2. 发布后的代码都是JS，所以可以互相访问?
        
    }

    public static getTS(): string {
        return "I'm ts";
    }
}