var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 蓝月亮SDK
 * 后台记录玩家行为
 * @author chenkai
 * @date 2017/1/5
 *
 * Example:
 * App.BluemoonSDK.tracking(App.BluemoonSDK.SHARE_GAME);
 */
var BluemoonSDK = (function (_super) {
    __extends(BluemoonSDK, _super);
    function BluemoonSDK() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 记录数据
     * @title 标题
     */
    BluemoonSDK.prototype.tracking = function (title) {
        if (window["tracking"]) {
            console.log("bluemoon tracking:", title);
            window["tracking"].event(title, this.getDate());
        }
    };
    /**获取日期*/
    BluemoonSDK.prototype.getDate = function () {
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
    return BluemoonSDK;
}(SingleClass));
/**进入游戏*/
BluemoonSDK.ENTER_GAME = "enter_game";
/**分享游戏*/
BluemoonSDK.SHARE_GAME = "share_game";
/**开始游戏*/
BluemoonSDK.START_GAME = "start_game";
/**进入商城*/
BluemoonSDK.ENTER_SHOP = "enter_shop";
__reflect(BluemoonSDK.prototype, "BluemoonSDK");
