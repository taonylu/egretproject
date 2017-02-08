/**
 * 数字工具类
 * @author chenkai
 * @date 2016/12/18
 */
var NumberTool = (function (_super) {
    __extends(NumberTool, _super);
    function NumberTool() {
        _super.apply(this, arguments);
    }
    var d = __define,c=NumberTool,p=c.prototype;
    /**
     * 获取范围内随机整数 getRandInt(1,3)随机获取1,2,3
     * @start 起始整数
     * @end 终止整数
     */
    p.getRandInt = function (start, end) {
        return start + Math.round(Math.random() * (end - start));
    };
    return NumberTool;
}(SingleClass));
egret.registerClass(NumberTool,'NumberTool');
