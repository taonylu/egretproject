

//---------------测试目的-----------
//1.加载一个json文件，并解析它。
class Main extends egret.Sprite {
    
    public constructor() {
        super();
        //加载json前，必须先加载配置文件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadConfigComplete, this);
        RES.loadConfig("resource/default.res.json","resource/");
        
    }

    private loadConfigComplete():void{
       console.log("加载配置文件完成");
       //异步加载，因为没有事先加载
        RES.getResAsync("gameConfig_json", this.onComplete, this);
    }

    private onComplete(data,key):void{
        console.log(data,key);   //输出：Object {player: Object, monster: Array[2]} "gameConfig_json"
        console.log(data.player.name);//输出:peter
    }
}