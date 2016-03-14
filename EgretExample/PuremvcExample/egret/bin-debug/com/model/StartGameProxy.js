/**
 *
 * @author
 *
 */
var StartGameProxy = (function (_super) {
    __extends(StartGameProxy, _super);
    function StartGameProxy() {
        _super.call(this, StartGameProxy.NAME);
        //this.sendNotification("xxx",{body:"abc"});
    }
    var d = __define,c=StartGameProxy,p=c.prototype;
    StartGameProxy.NAME = "StartGameProxy";
    return StartGameProxy;
})(puremvc.Proxy);
egret.registerClass(StartGameProxy,'StartGameProxy',["puremvc.IProxy","puremvc.INotifier"]);
