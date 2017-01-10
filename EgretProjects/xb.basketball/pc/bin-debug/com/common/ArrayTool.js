/**
*  文 件 名：ArrayTool.ts
*  功    能：数组工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var ArrayTool = (function () {
    function ArrayTool() {
    }
    var d = __define,c=ArrayTool,p=c.prototype;
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
    /**
     * 获取Object的长度
     * @param obj 源Object
     * @return 返回Object长度
     */
    ArrayTool.getObjectLen = function (obj) {
        var count = 0;
        for (var i in obj) {
            count++;
        }
        return count;
    };
    return ArrayTool;
}());
egret.registerClass(ArrayTool,'ArrayTool');
