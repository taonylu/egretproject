/**
 * 赛道信息，用于地图的生成
 * @author
 *
 */
var TrackData = (function () {
    function TrackData() {
        this.lastItemType = 0; //上一次生成物品类型  0无 1 水果 2障碍物
        this.fruitNum = 0; //生成了多少次水果
        this.shouldCreate = 0; //应该生成多少个水果
    }
    var d = __define,c=TrackData,p=c.prototype;
    p.clear = function () {
        this.lastItemType = 0;
        this.fruitNum = 0;
        this.shouldCreate = 0;
    };
    return TrackData;
}());
egret.registerClass(TrackData,'TrackData');
