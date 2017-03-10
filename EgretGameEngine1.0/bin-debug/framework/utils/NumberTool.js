var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 数字工具类
 * @author chenkai
 * @date 2016/12/18
 */
var NumberTool = (function (_super) {
    __extends(NumberTool, _super);
    function NumberTool() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 获取范围内随机整数 getRandInt(1,3)随机获取1,2,3
     * @start 起始整数
     * @end 终止整数
     */
    NumberTool.prototype.getRandInt = function (start, end) {
        return start + Math.round(Math.random() * (end - start));
    };
    return NumberTool;
}(SingleClass));
__reflect(NumberTool.prototype, "NumberTool");
