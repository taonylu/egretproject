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
    var __egretProto__ = ArrayTool.prototype;
    /**选择法随机排序数组*/
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
    /**复制二维数组*/
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
})();
ArrayTool.prototype.__class__ = "ArrayTool";
