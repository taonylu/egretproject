/**
 * 蓝月亮SDK
 * 后台记录玩家行为
 * @author chenkai
 * @date 2017/1/5
 */
var BluemoonSDK = (function (_super) {
    __extends(BluemoonSDK, _super);
    function BluemoonSDK() {
        _super.apply(this, arguments);
    }
    var d = __define,c=BluemoonSDK,p=c.prototype;
    /**
     * 记录数据
     * @title 标题
     */
    p.tracking = function (title) {
        if (window["tracking"]) {
            console.log("bluemoon tracking:", title);
            window["tracking"].event(title, this.getDate());
        }
    };
    /**获取日期*/
    p.getDate = function () {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        //日
        var ri = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var month_s, ri_s, hour_s, min_s;
        month_s = ((month >= 1 && month <= 9) ? "0" : "") + month;
        ri_s = ((ri >= 0 && ri <= 9) ? "0" : "") + ri;
        hour_s = ((hour >= 0 && hour <= 9) ? "0" : "") + hour;
        min_s = ((min >= 0 && min <= 9) ? "0" : "") + min;
        var currentdate = date.getFullYear() + seperator1 + month_s + seperator1 + ri_s
            + " " + hour_s + seperator2 + min_s
            + seperator2 + date.getSeconds();
        return currentdate;
    };
    /**进入游戏*/
    BluemoonSDK.ENTER_GAME = "enter_game";
    /**分享游戏*/
    BluemoonSDK.SHARE_GAME = "share_game";
    /**开始游戏*/
    BluemoonSDK.START_GAME = "start_game";
    /**进入商城*/
    BluemoonSDK.ENTER_SHOP = "enter_shop";
    return BluemoonSDK;
}(SingleClass));
egret.registerClass(BluemoonSDK,'BluemoonSDK');
