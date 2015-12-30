/**
 * Created by mengj_000 on 2015/4/27.
 */
var flash;
(function (flash) {
    var ApplicationDomain = (function () {
        function ApplicationDomain(parentDomain) {
            this.$parentDomain = null;
            this.domainMemory = null;
            // 所有的完全限定名称
            this.defNames = [];
            // 资源所在的模块
            this.resModule = "";
            this.$parentDomain = parentDomain;
        }
        var __egretProto__ = ApplicationDomain.prototype;
        Object.defineProperty(__egretProto__, "parentDomain", {
            get: function () {
                return this.$parentDomain;
            },
            enumerable: true,
            configurable: true
        });
        /*
         // 判断字符串是不是纯数字
         public static isNumber(str:string):boolean
         {
         if("" == str || null == str)
         {
         return false;
         }
         for(var index = 0; index < str.length; index++)
         {
         var ch:string = str[index];
         if(ch >= "0" && ch <= "9")
         {
         continue;
         }
         else
         {
         return false;
         }
         }
         return true;
         }

         private getDefName(name:string):string
         {
         var arr:string[] = this.resModule.split(".");
         for(var index:number = 0; index < arr.length; index++)
         {
         if(ApplicationDomain.isNumber(arr[index]))
         {
         arr[index] = "a" + arr[index];
         }
         }
         var moduleName = arr.join("_");
         if( "_" == moduleName.charAt(moduleName.length-1) )
         {
         moduleName = moduleName.substring(0, moduleName.length-1);
         }

         arr = name.split(".");
         for(index = 0; index < arr.length; index++)
         {
         if(ApplicationDomain.isNumber(arr[index]))
         {
         arr[index] = "a" + arr[index];
         }
         }
         var clsName:string = arr.join("_");
         var defName:string = moduleName + "." + clsName;
         return defName;
         }
         */
        /**
         * 从指定的应用程序域获取一个公共定义。
         * @param name
         */
        __egretProto__.getDefinition = function (name) {
            var defName = SwfUtils.getDefName(this.resModule, name);
            var hasDef = this.hasDefinition(name);
            if (!hasDef) {
                hasDef = egret.hasDefinition(name);
                if (!hasDef) {
                    //throw new ReferenceError("Error #1065: Variable " + name + " is not defined.", 1065);
                    return null;
                }
                else {
                    return egret.getDefinitionByName(name);
                }
            }
            else {
                var def = egret.getDefinitionByName(defName);
                return def;
            }
        };
        /**
         * 检查指定的应用程序域之内是否存在一个公共定义。
         * @param name
         */
        __egretProto__.hasDefinition = function (name) {
            var defName = SwfUtils.getDefName(this.resModule, name);
            var hasDef = egret.hasDefinition(defName);
            return hasDef;
        };
        /**
         *
         从指定应用程序域获取各个公共定义的所有完全限定名称。该定义可以是一个类、一个命名空间或一个函数的定义。可将从此方法返回的名称传递给 getDefinition() 方法，以获取实际定义的对象。
         */
        __egretProto__.getQualifiedDefinitionNames = function () {
            return this.defNames;
        };
        ApplicationDomain.MIN_DOMAIN_MEMORY_LENGTH = 0;
        return ApplicationDomain;
    })();
    flash.ApplicationDomain = ApplicationDomain;
    ApplicationDomain.prototype.__class__ = "flash.ApplicationDomain";
})(flash || (flash = {}));
flash.ApplicationDomain.currentDomain = new flash.ApplicationDomain();
flash.ApplicationDomain.currentDomain['name'] = "SWFGlobalDomain";
