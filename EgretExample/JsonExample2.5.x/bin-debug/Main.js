//加载一个json文件，并解析它。
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        //加载json前，必须先加载配置文件
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.loadConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    var d = __define,c=Main;p=c.prototype;
    p.loadConfigComplete = function () {
        console.log("加载配置文件完成");
        //异步加载，因为没有事先加载
        RES.getResAsync("gameConfig_json", this.onComplete, this);
    };
    p.onComplete = function (data, key) {
        console.log(data, key); //输出：Object {player: Object, monster: Array[2]} "gameConfig_json"
        console.log(data.player.name); //输出:peter
    };
    return Main;
})(egret.Sprite);
egret.registerClass(Main,"Main");
