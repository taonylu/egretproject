/**
 *
 * @author 
 *
 */
class GameConst {
    public static stage: egret.Stage;
    
    public static discountList: Array<any>;  //折扣
    public static scoreList: Array<any>;     //达到折扣所需的分数
    public static scoreMax: number;          //最大折扣对应的分值
    public static cellWidth: number = 80;    //拼图被裁剪的方块大小
    
    public static timeLimit: number;         //时间限制
    
    public static pieceScore: number = 10;   //一个碎片的分值

}
