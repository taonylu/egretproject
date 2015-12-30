/**
 * Created by chenpeng on 2015/9/9.
 * 所有的接口继承映射在这里填写
 */
var AllInterfaceImplements = (function () {
    function AllInterfaceImplements() {
    }
    var __egretProto__ = AllInterfaceImplements.prototype;
    return AllInterfaceImplements;
})();
AllInterfaceImplements.prototype.__class__ = "AllInterfaceImplements";
flash.implementsClass("flash.EventDispatcher", ["flash.IEventDispatcher", "egret.IEventDispatcher"]);
flash.implementsClass("egret.EventDispatcher", ["egret.IEventDispatcher", "flash.IEventDispatcher"]);
