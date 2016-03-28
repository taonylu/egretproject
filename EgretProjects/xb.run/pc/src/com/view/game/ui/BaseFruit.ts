/**
 * 水果基类
 * @author 
 *
 */
class BaseFruit extends egret.Bitmap{
    public z:number = 0;      //虚拟z轴
    public score:number = 0;  //分值
    public track:number = 0;  //赛道
	public constructor() {
    	super();
	}
	
	public recycle(){
    	
	}
}
