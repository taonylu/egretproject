/**
*  文 件 名：ArrayTool.ts
*  功    能：数组工具类
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/10
*  修改日期：2015/9/10
*  修改日志：
*/
class ArrayTool {
    /**选择法随机排序数组*/
    public static randomArr(arr: Array<any>):void{
        var i: number = arr.length;
        var temp: any;
        var indexA: number;
        var indexB: number;

        while(i) {
            indexA = i - 1;
            indexB = Math.floor(Math.random() * i);
            i--;

            if(indexA == indexB) continue;
            temp = arr[indexA];
            arr[indexA] = arr[indexB];
            arr[indexB] = temp;
        }
    }
    
    /**浅复制二维数组*/
    public static copy2DArr(arr: Array<any>): Array<any> { 
        var outArr: Array<any> = new Array<any>();
        var len: number = arr.length;
        var len2: number = arr[0].length;
        for(var i: number = 0;i < len;i++) { 
            var outArr2D: Array<any> = new Array<any>();
            outArr.push(outArr2D);
            for(var j: number = 0;j < len2;j++) { 
                outArr2D.push(arr[i][j]);
            }
        }
        return outArr;
    }

    /**获取Object的长度*/
    public static getObjectLen(obj:Object):number{
        var count:number = 0;
        for(var i in obj){
            count++;
        }
        return count;
    }
}

