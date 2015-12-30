/**
 * Created by mengj_000 on 2015/4/27.
 */
var flash;
(function (flash) {
    /**
     * 返回对象的完全限定类名
     * @param value
     */
    function getQualifiedClassName(value) {
        var name = egret.getQualifiedClassName(value);
        if (name == "egret.Sprite")
            return "flash.display::Sprite";
        else if (name.split(".").length > 1)
            name = name.slice(0, name.length - name.split(".")[name.split(".").length - 1].length - 1) + "::" + name.split(".")[name.split(".").length - 1];
        return name;
    }
    flash.getQualifiedClassName = getQualifiedClassName;
    function getClassName(prototype) {
        if (prototype.hasOwnProperty("prototype") && prototype.prototype.hasOwnProperty("__class__")) {
            return prototype.prototype["__class__"];
        }
        var constructorString = prototype.toString();
        var index = constructorString.indexOf("(");
        var className = constructorString.substring(9, index);
        Object.defineProperty(prototype, "__class__", {
            value: className,
            enumerable: false,
            writable: true
        });
        return className;
    }
    flash.getClassName = getClassName;
    function getClassSuper(prototype) {
        if (prototype.hasOwnProperty("__proto__")) {
            return prototype["__proto__"];
        }
        return null;
    }
    flash.getClassSuper = getClassSuper;
    /**
     * 返回 name 参数指定的类的类对象引用
     * @param name 类的名称
     * @returns {any} name 参数指定的类的类对象引用
     */
    function getDefinitionByName(name) {
        var def = egret.getDefinitionByName(name);
        if (def) {
            return def;
        }
        // 如果是flash里的类flash.display.Sprite，通过转换表转换下
        var transName = flash.TransTable.getTransClassDefName(name);
        def = egret.getDefinitionByName(transName);
        if (def) {
            return def;
        }
        // 先从自定义的全局domain里取定义，如果没有再从egret的全局函数getDefinitionByName来取定义
        // 否则如果把swf加载到全局域里，在获取定义时找不到
        var def = flash.ApplicationDomain.currentDomain.getDefinition(name);
        if (null != def) {
            return def;
        }
        return null;
    }
    flash.getDefinitionByName = getDefinitionByName;
})(flash || (flash = {}));
