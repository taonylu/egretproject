/**
 * 数组工具类
 * @author chenkai
 * @date 2016/12/18
 */
var ArrayTool = (function (_super) {
    __extends(ArrayTool, _super);
    function ArrayTool() {
        _super.apply(this, arguments);
    }
    var d = __define,c=ArrayTool,p=c.prototype;
    /**
     * 获取object的长度
     * @obj 目标对象
     * @return object长度
     */
    p.getObjectLen = function (obj) {
        var count = 0;
        for (var key in obj) {
            count++;
        }
        return count;
    };
    return ArrayTool;
}(SingleClass));
egret.registerClass(ArrayTool,'ArrayTool');
