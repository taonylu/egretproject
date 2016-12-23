/**
 * 面板加载类
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
     * 打开面板
     * @panelName 面板名
     */
    p.open = function (panelName) {
        if (this.panelMap[panelName] != null) {
        }
    };
    return PanelManager;
}(SingleClass));
egret.registerClass(PanelManager,'PanelManager');
//# sourceMappingURL=PanelManager.js.map