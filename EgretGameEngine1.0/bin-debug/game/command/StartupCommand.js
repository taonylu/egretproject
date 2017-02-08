/**
 * 启动
 * @author chenkai
 * @date 2017/2/8
 */
var StartupCommand = (function () {
    function StartupCommand() {
    }
    var d = __define,c=StartupCommand,p=c.prototype;
    p.execute = function () {
        //注册控制模块
        //注册场景
        App.SceneManager.register(SceneConst.HOME, HomeScene);
        //注册弹框
        //切换主页
        App.SceneManager.open(SceneConst.HOME);
    };
    return StartupCommand;
}());
egret.registerClass(StartupCommand,'StartupCommand',["ICommand"]);
