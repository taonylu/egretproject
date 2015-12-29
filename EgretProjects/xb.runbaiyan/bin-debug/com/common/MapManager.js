/**
 * 地图类
 * @author
 *
 */
var MapManager = (function () {
    function MapManager() {
        this.mapSize = 9;
        this.isPlayTurn = true; //是否玩家可以行动
    }
    var d = __define,c=MapManager,p=c.prototype;
    p.lock = function () {
        this.isPlayTurn = false;
    };
    p.unlock = function () {
        this.isPlayTurn = true;
    };
    p.findPath = function (__from) {
        //清理其他的格子
        var node;
        for (var i = 0; i < this.mapSize; i++) {
            for (var j = 0; j < this.mapSize; j++) {
                node = this.mapList[i][j];
                node.clean();
            }
        }
        node = this.findNode(__from);
        var path = [];
        if (node) {
            while (node.parentNode) {
                path.push(node.getPos());
                node = node.parentNode;
            }
        }
        else {
            //
            console.log("已经被困随便走一步");
            //GameManager.getInstance().gameScene.player.shakeHead();
            //随便走一步
            path = this.getNear(__from);
        }
        return path.reverse();
    };
    p.findNode = function (__from) {
        var used = [__from]; //已经覆盖的点
        var next = [__from]; //下一轮可以走的点
        var flag = true;
        var around;
        //around = this.getRound(__from.getPos());
        var i = 0;
        var l = 0;
        var j = 0;
        var k = 0;
        var node; //当前中心点
        var tnode; //当前周围点
        while (flag) {
            l = next.length;
            //console.log("寻路中..." + l);
            if (l == 0) {
                flag = false;
                return null; //无解
            }
            var tnext = [];
            for (i = 0; i < l; i++) {
                node = next.shift();
                around = this.getRound(node.getPos());
                k = around.length;
                //console.log("下一层路点..." + k)
                for (j = 0; j < k; j++) {
                    var rnd = around[j];
                    tnode = this.mapList[rnd[0]][rnd[1]];
                    if (tnode.bHave) {
                        used.push(tnode);
                        continue;
                    }
                    if (used.indexOf(tnode) > -1 || next.indexOf(tnode) > -1) {
                        continue;
                    }
                    tnode.parentNode = node;
                    if (this.isExit(tnode)) {
                        //console.log("找到出口，最短路径")
                        return tnode; //最短路径
                    }
                    tnext.push(tnode);
                }
                used.push(node);
            }
            next = tnext;
        }
    };
    /**计算周围格子**/
    p.getRound = function (__point) {
        var xx = __point[0];
        var yy = __point[1];
        var arr;
        var ret = [];
        if (xx % 2 == 0) {
            //arr =  [[xx-1,yy-1],[xx-1,yy],[xx-1,yy+1],[xx,yy+1],[xx+1,yy],[xx,yy-1]];
            arr = [[xx - 1, yy - 1], [xx - 1, yy], [xx, yy + 1], [xx, yy - 1], [xx + 1, yy - 1], [xx + 1, yy]];
        }
        else {
            //arr =  [[xx,yy-1],[xx-1,yy],[xx,yy+1],[xx+1,yy+1],[xx+1,yy],[xx+1,yy-1]];
            arr = [[xx - 1, yy + 1], [xx - 1, yy], [xx, yy + 1], [xx, yy - 1], [xx + 1, yy + 1], [xx + 1, yy]];
        }
        for (var i = 0; i < 6; i++) {
            var rnd = arr[i];
            if (rnd[0] >= 0 && rnd[1] >= 0 && rnd[0] < this.mapSize && rnd[1] < this.mapSize) {
                ret.push(rnd);
            }
        }
        return ret;
    };
    /**是否是出口**/
    p.isExit = function (__node) {
        var sd = __node.getPos();
        if (sd[0] == 0 || sd[1] == 0 || sd[0] == this.mapSize - 1 || sd[1] == this.mapSize - 1) {
            return true;
        }
        return false;
    };
    /**获得可走的点**/
    p.getNear = function (__node) {
        var pos = __node.getPos();
        var arr = this.getRound(pos);
        var l = arr.length;
        for (var i = 0; i < l; i++) {
            if (!this.getNode(arr[i]).bHave) {
                return [arr[i]];
            }
        }
        return [];
    };
    p.getNode = function (arr) {
        return this.mapList[arr[0]][arr[1]];
    };
    return MapManager;
})();
egret.registerClass(MapManager,'MapManager');
