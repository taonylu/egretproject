/**
 * 弹框面板加载类
 * @author chenkai
 * @date 2016/12/23
 */
var PanelManager = (function (_super) {
    __extends(PanelManager, _super);
    function PanelManager() {
        _super.call(this);
        /**面板实例*/
        this.panelMap = {};
        /**面板类定义*/
        this.clzMap = {};
        /**面板所需资源组*/
        this.groupMap = {};
    }
    var d = __define,c=PanelManager,p=c.prototype;
    /**
     * @注册
     * @clz panel类名
     */
    p.register = function (panelName, panelClz, groupName) {
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
    p.open = function (panelName, callBack, thisObject) {
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
    p.openPanel = function (panelName, callBack, thisObject) {
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
    p.close = function (panelName) {
        var panel = this.panelMap[panelName];
        if (panel) {
            panel.once(egret.Event.REMOVED_FROM_STAGE, function () {
                panel.onRemove();
            }, this);
            panel.parent && panel.parent.removeChild(panel);
        }
    };
    /**关闭所有弹框*/
    p.closeAll = function () {
        for (var key in this.panelMap) {
            this.close(key);
        }
    };
    return PanelManager;
}(SingleClass));
egret.registerClass(PanelManager,'PanelManager');
