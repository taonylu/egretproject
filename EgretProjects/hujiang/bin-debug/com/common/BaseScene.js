/**
*  文 件 名：BaseScene.ts
*  功    能： 场景基类
*  内    容： 将场景自适应到容器的100%
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene(skinName) {
        _super.call(this);
        this.inited = false;
        this.percentWidth = 100;
        this.percentHeight = 100;
        this.touchEnabled = false;
        this.addEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.skinName = skinName;
    }
    var d = __define,c=BaseScene;p=c.prototype;
    /**组件创建完毕并添加到舞台时触发
     *  组件皮肤在主题json已经加载完毕，所以在this.skinName=skinName时组件是已经创建完毕的
     *  组件addChild到舞台时，会触发eui.UIEvent.CREATION_COMPLETE，无需等待创建完毕
     */
    p.componentCreated = function () {
        this.removeEventListener(eui.UIEvent.CREATION_COMPLETE, this.componentCreated, this);
        this.inited = true;
    };
    /**组建创建完毕的情况下，添加到舞台时执行*/
    p.onEnable = function () {
    };
    /**移除界面时执行*/
    p.onRemove = function () {
    };
    /**销毁界面时执行*/
    p.onDestroy = function () {
    };
    return BaseScene;
})(eui.Component);
egret.registerClass(BaseScene,"BaseScene");
