var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 弹框面板加载类
 * @author chenkai
 * @date 2016/12/23
 *
 * Example:
 * //注册面板
 * App.PanelManager.register("LoginPanel", LoginPanel, AssetConst.LoginPanel);
 * //打开面板
 * App.PanelManager.open("LoginPanel");
 * //关闭面板
 * App.PanelManager.close("LoginPanel");
 */
var PanelManager = (function (_super) {
    __extends(PanelManager, _super);
    function PanelManager() {
        var _this = _super.call(this) || this;
        /**面板实例*/
        _this.panelMap = {};
        /**面板类定义*/
        _this.clzMap = {};
        /**面板所需资源组*/
        _this.groupMap = {};
        return _this;
    }
    /**
     * @注册
     * @clz panel类名
     */
    PanelManager.prototype.register = function (panelName, panelClz, groupName) {
        if (groupName === void 0) { groupName = null; }
        this.clzMap[panelName] = panelClz;
        this.groupMap[panelName] = groupName;
    };
    /**
     * 打开弹框面板，若需要实时加载资源，则加载完成后打开
     * @panelName 面板名
     * @callBack 面板添加到舞台后的回调函数
     * @thisObject 回调函数执行对象
     * @reutrn 返回打开的面板
     */
    PanelManager.prototype.open = function (panelName, callBack, thisObject) {
        var _this = this;
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        var panel = this.panelMap[panelName];
        if (panel) {
            panel = this.openPanel(panelName, callBack, thisObject);
        }
        else {
            //panel不存在，则加载panel所需资源并新建一个
            var clz = this.clzMap[panelName];
            if (clz) {
                panel = new clz();
                this.panelMap[panelName] = panel;
                var groupName = this.groupMap[panelName];
                if (groupName != null) {
                    App.ResUtils.loadGroup(groupName, function () {
                        _this.openPanel(panelName, callBack, thisObject);
                    }, this);
                }
                else {
                    this.openPanel(panelName, callBack, thisObject);
                }
            }
        }
        return panel;
    };
    /**打开弹框*/
    PanelManager.prototype.openPanel = function (panelName, callBack, thisObject) {
        if (callBack === void 0) { callBack = null; }
        if (thisObject === void 0) { thisObject = null; }
        var panel = this.panelMap[panelName];
        if (panel) {
            panel.once(egret.Event.ADDED_TO_STAGE, function () {
                panel.onEnable();
                if (callBack && thisObject) {
                    callBack.apply(thisObject);
                }
            }, this);
            App.LayerManager.panelLayer.addChild(panel);
        }
        return panel;
    };
    /**
     * 关闭弹框
     * @panelName 弹框名
    */
    PanelManager.prototype.close = function (panelName) {
        var panel = this.panelMap[panelName];
        if (panel) {
            panel.once(egret.Event.REMOVED_FROM_STAGE, function () {
                panel.onRemove();
            }, this);
            panel.parent && panel.parent.removeChild(panel);
        }
    };
    /**关闭所有弹框*/
    PanelManager.prototype.closeAll = function () {
        for (var key in this.panelMap) {
            this.close(key);
        }
    };
    return PanelManager;
}(SingleClass));
__reflect(PanelManager.prototype, "PanelManager");
