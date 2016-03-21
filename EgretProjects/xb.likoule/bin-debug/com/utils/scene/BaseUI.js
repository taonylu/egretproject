/**
*  文 件 名：BaseUI.ts
*  功    能：基础组件UI
*  内    容：
*  作    者：Rikimaru
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var BaseUI = (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI(skinName) {
        _super.call(this);
        this.inited = false;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onEnable, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.skinName = skinName;
    }
    var d = __define,c=BaseUI,p=c.prototype;
    /**组件创建完毕并添加到舞台时触发
     *  组件皮肤在主题json已经加载完毕，所以在this.skinName=skinName时组件是已经创建完毕的
     *  组件addChild到舞台时，会触发eui.UIEvent.CREATION_COMPLETE，无需等待创建完毕
     */
    p.componentCreated = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.inited = true;
    };
    p.onEnable = function () {
    };
    p.onRemove = function () {
    };
    p.hide = function () {
        this.parent && this.parent.removeChild(this);
    };
    return BaseUI;
}(eui.Component));
egret.registerClass(BaseUI,'BaseUI');
