/**
 *
 * @author
 *
 */
var HomeMediator = (function (_super) {
    __extends(HomeMediator, _super);
    function HomeMediator() {
        _super.call(this, HomeMediator.NAME);
    }
    var d = __define,c=HomeMediator,p=c.prototype;
    p.listNotificationInterests = function () {
        return [HomeMediator.SHOW];
    };
    p.handleNotification = function (notification) {
        switch (notification.getName()) {
            case HomeMediator.SHOW:
                console.log("homemetiator show");
                this.show(notification.getBody());
                break;
        }
    };
    p.show = function (data) {
        console.log("执行show函数:", data);
    };
    HomeMediator.NAME = "HomeMediator";
    HomeMediator.SHOW = "HomeMediator_SHOW";
    return HomeMediator;
})(puremvc.Mediator);
egret.registerClass(HomeMediator,'HomeMediator',["puremvc.IMediator","puremvc.INotifier"]);
