var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * @language zh_CN
 * @classdesc
 * 创建单个View3D使用示例
 * @version Egret 3.0
 * @platform Web,Native
 */
var LoadingUI = (function () {
    function LoadingUI() {
        this.div = document.getElementById('descCon');
    }
    LoadingUI.prototype.OnInitLoadingView = function (max) {
        this.max = max;
        this.cur = 0;
        if (max == 0) {
            this.div.innerHTML = "正在加载:100%";
            this.CloseLoadingView();
        }
        else {
            this.div.innerHTML = "正在加载:0%";
        }
    };
    LoadingUI.prototype.OnLoadFinished = function () {
        if (this.cur == this.max) {
            return;
        }
        if (this.cur + 1 >= this.max) {
            this.div.innerHTML = "正在加载:100%";
            this.CloseLoadingView();
        }
        else {
            this.cur++;
            this.div.innerHTML = "\u6B63\u5728\u52A0\u8F7D:" + Math.ceil(this.cur / this.max * 100) + "%";
        }
    };
    LoadingUI.prototype.CloseLoadingView = function () {
        this.div.innerHTML = "正在加载:100%";
        window.setTimeout(function () {
            var loadingMap = document.getElementById('loadingCon');
            loadingMap.hidden = true;
        }, 1000);
    };
    return LoadingUI;
}());
__reflect(LoadingUI.prototype, "LoadingUI");
