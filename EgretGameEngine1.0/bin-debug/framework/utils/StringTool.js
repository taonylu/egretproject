var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 字符串工具
 * @author chenkai
 * @date 2016/12/18
 */
var StringTool = (function (_super) {
    __extends(StringTool, _super);
    function StringTool() {
        return _super.apply(this, arguments) || this;
    }
    return StringTool;
}(SingleClass));
__reflect(StringTool.prototype, "StringTool");
