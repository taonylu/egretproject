/**
 * 水管基类
 * @author 羊力大仙 
 * @date 2015.10.27
 */
class BaseGuan extends egret.Bitmap{

	public isChecked:boolean = false;  //小鸟飞过水管，是否已经计数过

	public constructor() {
        super()
	}
	
    public reset(): void {
        this.isChecked = false;
    }
}
