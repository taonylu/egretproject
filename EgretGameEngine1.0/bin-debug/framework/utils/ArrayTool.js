var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 数组工具类
 * @author chenkai
 * @date 2016/12/18
 */
var ArrayTool = (function (_super) {
    __extends(ArrayTool, _super);
    function ArrayTool() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 获取object的长度
     * @obj 目标对象
     * @return object长度
     */
    ArrayTool.prototype.getObjectLen = function (obj) {
        var count = 0;
        for (var key in obj) {
            count++;
        }
        return count;
    };
    /**
     * 选择法随机排序数组
     * 传入一个数组，打乱数组元素的顺序
     * @param arr 源数组
     */
    ArrayTool.randomArr = function (arr) {
        var i = arr.length;
        var temp;
        var indexA;
        var indexB;
        while (i) {
            indexA = i - 1;
            indexB = Math.floor(Math.random() * i);
            i--;
            if (indexA == indexB)
                continue;
            temp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = temp;
        }
    };
    /**
     * 选择法随机排序二维数组
     * 传入一个二维数组，打乱数组中元素顺序
     * @param srcArr 源数组
     */
    ArrayTool.random2DArr = function (srcArr) {
        //将二维数组变成1维
        var tempArr = [];
        var row = srcArr.length;
        var col = srcArr[0].length;
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                tempArr.push(srcArr[i][j]);
            }
        }
        //打乱顺序
        ArrayTool.randomArr(tempArr);
        //将1维数组重新赋值给二维数组
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                srcArr[i][j] = tempArr[i * col + j];
            }
        }
    };
    /**
     * 浅复制二维数组
     * 传入一个二维数组，复制该数组中元素，返回新的二维数组
     * @param arr 源数组
     * @return 返回新的二维数组
     */
    ArrayTool.copy2DArr = function (arr) {
        var outArr = new Array();
        var len = arr.length;
        var len2 = arr[0].length;
        for (var i = 0; i < len; i++) {
            var outArr2D = new Array();
            outArr.push(outArr2D);
            for (var j = 0; j < len2; j++) {
                outArr2D.push(arr[i][j]);
            }
        }
        return outArr;
    };
    return ArrayTool;
}(SingleClass));
__reflect(ArrayTool.prototype, "ArrayTool");
//# sourceMappingURL=ArrayTool.js.map