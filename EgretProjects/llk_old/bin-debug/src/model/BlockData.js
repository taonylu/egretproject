/**
*  文 件 名：BlockData.ts
*  功    能：方块编号类
*  内    容：
*  作    者：羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
var BlockData = (function () {
    function BlockData() {
    }
    var __egretProto__ = BlockData.prototype;
    /**创建方块编号*/
    BlockData.init = function (blockNum) {
        for (var i = 0; i < blockNum / 2; i++) {
            var date = Math.random() * BlockData.picType + 2;
            BlockData.dataArr.push(date, date);
        }
        //随机排序数组
        ArrayTool.randomArr(BlockData.dataArr);
    };
    BlockData.picType = 45;
    BlockData.dataArr = new Array();
    return BlockData;
})();
BlockData.prototype.__class__ = "BlockData";
