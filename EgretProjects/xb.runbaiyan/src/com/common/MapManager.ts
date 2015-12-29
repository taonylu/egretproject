/**
 * 地图类
 * @author 
 *
 */
class MapManager {
    
    public mapList;
    public mapSize: number = 9;
    public isPlayTurn: Boolean = true;  //是否玩家可以行动
    
    public lock(): void {
        this.isPlayTurn = false;
    }
    public unlock(): void {
        this.isPlayTurn = true; 
    }
    
  
    public findPath(__from: GridBg) {
        //清理其他的格子
        var node: GridBg;
        for(var i: number = 0;i < this.mapSize;i++) {
            for(var j: number = 0;j < this.mapSize;j++) {
                node = this.mapList[i][j];
                node.clean();
            }
        }

        node = this.findNode(__from);

        var path: any[] = [];
        if(node) {
            while(node.parentNode) {
                path.push(node.getPos());
                node = node.parentNode;
            }

        } else {
            //
            console.log("已经被困随便走一步");
            //GameManager.getInstance().gameScene.player.shakeHead();
            //随便走一步
            path = this.getNear(__from);

        }
        return path.reverse();
    }
    
    private findNode(__from: GridBg) {
        var used = [__from]; //已经覆盖的点
        var next = [__from];  //下一轮可以走的点
        var flag: boolean = true;
        var around: any[];
        //around = this.getRound(__from.getPos());
        var i: number = 0;
        var l: number = 0;
        var j: number = 0;
        var k: number = 0;
        var node: GridBg;//当前中心点
        var tnode: GridBg;//当前周围点
        while(flag) {
            l = next.length;
            //console.log("寻路中..." + l);
            if(l == 0) {
                flag = false;
                return null;//无解
            }
            var tnext = [];
            for(i = 0;i < l;i++) {
                node = next.shift();
                around = this.getRound(node.getPos());
                k = around.length;
                //console.log("下一层路点..." + k)
                for(j = 0;j < k;j++) {
                    var rnd: number[] = around[j];
                    tnode = this.mapList[rnd[0]][rnd[1]];
                    if(tnode.bHave) { //不可走
                        used.push(tnode);
                        continue;
                    }
                    if(used.indexOf(tnode) > -1 || next.indexOf(tnode) > -1) {//已经计算过了,或者已经在下一轮计算备选中了
                        continue;
                    }
                    tnode.parentNode = node;
                    if(this.isExit(tnode)) {
                        //console.log("找到出口，最短路径")
                        return tnode;//最短路径
                    }
                    tnext.push(tnode);
                }
                used.push(node);
            }
            next = tnext;
        }
    }
    /**计算周围格子**/
    private getRound(__point:number[]){
      var xx : number = __point[0];
      var yy : number = __point[1];
      var arr:any[];
      var ret:any[] = [];
      if(xx % 2 == 0){
        //arr =  [[xx-1,yy-1],[xx-1,yy],[xx-1,yy+1],[xx,yy+1],[xx+1,yy],[xx,yy-1]];
          arr = [[xx - 1,yy - 1],[xx - 1,yy],[xx,yy + 1],[xx,yy - 1],[xx+1,yy-1],[xx+1,yy]];
      }else{
        //arr =  [[xx,yy-1],[xx-1,yy],[xx,yy+1],[xx+1,yy+1],[xx+1,yy],[xx+1,yy-1]];
          arr = [[xx - 1,yy + 1],[xx - 1,yy],[xx,yy + 1],[xx,yy - 1],[xx + 1,yy + 1],[xx + 1,yy]];
      }
      for(var i : number = 0 ; i < 6 ; i++){
        var rnd:number[] = arr[i];
        if(rnd[0] >= 0 && rnd[1] >=0 && rnd[0]<this.mapSize && rnd[1]<this.mapSize){
          ret.push(rnd);
        }
      }
      return ret;
    }
    
    /**是否是出口**/
    public isExit(__node: GridBg) {
        var sd: number[] = __node.getPos();
        if(sd[0] == 0 || sd[1] == 0 || sd[0] == this.mapSize - 1 || sd[1] == this.mapSize - 1) {
            return true;
        }
        return false;
    }
    
    /**获得可走的点**/
    public getNear(__node: GridBg) {
        var pos: number[] = __node.getPos();
        var arr: any[] = this.getRound(pos);
        var l: number = arr.length;
        for(var i: number = 0;i < l;i++) {
            if(!this.getNode(arr[i]).bHave) {
                return [arr[i]];
            }
        }
        return [];
    }
    
    public getNode(arr: number[]) {
        return this.mapList[arr[0]][arr[1]];
    }
    
}
