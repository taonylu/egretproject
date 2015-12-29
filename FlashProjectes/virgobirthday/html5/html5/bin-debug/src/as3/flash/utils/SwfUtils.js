/**
 * Created by chenpeng on 2015/6/2.
 */
var SwfUtils = (function () {
    function SwfUtils() {
    }
    var __egretProto__ = SwfUtils.prototype;
    /**
     * swf资源的完全限定名 类名
     * @param resModule 资源模块名（相对路径）
     * @param defName 资源定义名
     * @returns {string} 加上前缀“_swfSymbols_”的内部资源完全限定名
     */
    SwfUtils.getDefName = function (resModule, defName) {
        var fullName = resModule + '_' + defName;
        fullName = encodeURI(fullName);
        var illegalCharsLen = SwfUtils.illegalNameChars.length;
        for (var i = 0; i < illegalCharsLen; i++) {
            fullName = fullName.split(SwfUtils.illegalNameChars[i]).join("_");
        }
        fullName = fullName.split("%").join("_");
        return '_swfSymbols_' + fullName;
    };
    // 非法字符集 不会被encodeURIComponent编码的字符：! * ( ) ’
    SwfUtils.illegalNameChars = ['.', '-', '~', '*', '(', ')', '!', '\''];
    // 链接类模板 - 动态生成链接类
    SwfUtils.symbolTemplate = '';
    SwfUtils.bitmapDataTemplate = '';
    SwfUtils.buttonTemplate = '';
    return SwfUtils;
})();
SwfUtils.prototype.__class__ = "SwfUtils";
SwfUtils.symbolTemplate = 'var __extends = this.__extends || function (d, b) {\n     for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n     function __() { this.constructor = d; }\n     __.prototype = b.prototype;\n     d.prototype = new __();\n };\n var TemplateClass1 = (function (_super) {\n     __extends(TemplateClass1, _super);\n     function TemplateClass1() {\n         _super.call(this, TemplateClass1.resConfig, TemplateClass1.symbolName);\n     }\n     TemplateClass1.resConfig = null;\n     TemplateClass1.symbolName = "";\n     return TemplateClass1;\n })(egret.SwfMovie);\n TemplateClass1.prototype.__class__ = "TemplateClass1";\n__global.TemplateClass1 = TemplateClass1;\n';
SwfUtils.bitmapDataTemplate = 'var __extends = this.__extends || function (d, b) {\n     for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n     function __() { this.constructor = d; }\n     __.prototype = b.prototype;\n     d.prototype = new __();\n };\n var TemplateClass2 = (function (_super) {\n     __extends(TemplateClass2, _super);\n     function TemplateClass2() {\n         _super.call(this, 0, 0);\n         this.texture = null;\n         if (null == TemplateClass2.resConfig.symbols[TemplateClass2.symbolName]) {\n             console.warn("symbolName is null!");\n             return;\n         }\n         var symbol = (TemplateClass2.resConfig.symbols[TemplateClass2.symbolName]);\n         var def = (TemplateClass2.resConfig.resDefs[symbol.id]);\n         var imgDis = egret.SwfRes.Pool_getByID(TemplateClass2.resConfig.path, TemplateClass2.resConfig, def.id);\n         var bitmap = imgDis.getChildAt(0);\n         this.texture = bitmap.texture;\n         this.initWidthTexture(this.texture._bitmapWidth, this.texture._bitmapHeight, true, 0xffffffff, this.texture);\n     }\n     TemplateClass2.resConfig = null;\n     TemplateClass2.symbolName = "";\n     return TemplateClass2;\n })(flash.BitmapData);\n TemplateClass2.prototype.__class__ = "TemplateClass2";\n__global.TemplateClass2 = TemplateClass2;';
SwfUtils.buttonTemplate = 'var __extends = this.__extends || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    __.prototype = b.prototype;\n    d.prototype = new __();\n};\nvar ButtonTemplate = (function (_super) {\n    __extends(ButtonTemplate, _super);\n    function ButtonTemplate() {\n        if (null == ButtonTemplate.resConfig.symbols[ButtonTemplate.symbolName]) {\n            console.warn("symbolName is null! " + ButtonTemplate.symbolName);\n            return;\n        }\n        var symbol = (ButtonTemplate.resConfig.symbols[ButtonTemplate.symbolName]);\n        var def = (ButtonTemplate.resConfig.resDefs[symbol.id]);\n        this.conf = ButtonTemplate.resConfig;\n        this.define = def;\n        _super.call(this);\n    }\n    ButtonTemplate.resConfig = null;\n    ButtonTemplate.symbolName = "";\n    return ButtonTemplate;\n})(egret.SwfButton);\nButtonTemplate.prototype.__class__ = "ButtonTemplate";\n__global.ButtonTemplate = ButtonTemplate;\n';
SwfUtils.soundTemplate = 'var SoundTemplate = (function (_super) {\n    __extends(SoundTemplate, _super);\n    function SoundTemplate() {\n        if (null == SoundTemplate.resConfig.symbols[SoundTemplate.symbolName]) {\n            console.warn("symbolName is null! " + SoundTemplate.symbolName);\n            return;\n        }\n        var symbol = (SoundTemplate.resConfig.symbols[SoundTemplate.symbolName]);\n        var def = (SoundTemplate.resConfig.resDefs[symbol.id]);\n        this.conf = SoundTemplate.resConfig;\n        this.define = def;\n        _super.call(this);\n    }\n    var __egretProto__ = SoundTemplate.prototype;\n    SoundTemplate.resConfig = null;\n    SoundTemplate.symbolName = "";\n    return SoundTemplate;\n})(flash.SwfSound);\nSoundTemplate.prototype.__class__ = "SoundTemplate";\n__global.SoundTemplate = SoundTemplate;\n';
