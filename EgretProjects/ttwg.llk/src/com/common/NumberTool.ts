/**
*  文 件 名：NumberTool.ts
*  功    能：数字工具类
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
class NumberTool {
	
    /**
     * 获取随机数,(1,3) 返回1 2 3
     */ 
    public static getRandomInt(start: number,end: number): number {  //1-3
        return Math.round(Math.random() * (end - start)) + start;
    }
}
