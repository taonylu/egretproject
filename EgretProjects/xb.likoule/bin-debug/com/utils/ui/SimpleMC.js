/**
 *  文 件 名： SimpleMC.ts
 *  功    能： 简单MC
 *  内    容： 简化了新建json和png以及Factory的代码
 *  作    者： Rikimaru
 *  生成日期：2015/9/23
 *  修改日期：2015/9/23
 *  修改日志：
 */
var SimpleMC = (function (_super) {
    __extends(SimpleMC, _super);
    function SimpleMC(pngName, jsonName, mcName) {
        var png = RES.getRes(pngName);
        var json = RES.getRes(jsonName);
        var mcF = new egret.MovieClipDataFactory(json, png);
        _super.call(this, mcF.generateMovieClipData(mcName));
    }
    var d = __define,c=SimpleMC,p=c.prototype;
    return SimpleMC;
}(egret.MovieClip));
egret.registerClass(SimpleMC,'SimpleMC');
