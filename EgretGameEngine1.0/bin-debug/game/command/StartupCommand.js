var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 启动
 * @author chenkai
 * @date 2017/2/8
 */
var StartupCommand = (function (_super) {
    __extends(StartupCommand, _super);
    function StartupCommand() {
        return _super.apply(this, arguments) || this;
    }
    StartupCommand.prototype.execute = function (notification) {
        //注册控制模块
        //注册场景
        App.SceneManager.register(SceneConst.HOME, HomeScene);
        //注册弹框
        //切换主页
        App.SceneManager.open(SceneConst.HOME);
    };
    return StartupCommand;
}(puremvc.SimpleCommand));
__reflect(StartupCommand.prototype, "StartupCommand");
