/**
 * 用户数据
 * @author 
 *
 */
class UserVO {
	public uid:string = "";   //用户ID
	public name:string = "";  //用户名
	public headBmd:egret.BitmapData;  //用户头像数据
	public gameHeadUI:GameHeadUI;     //用户所使用的gameHeadUI，游戏时进度头像
	public headUI:HeadUI;             //用户所使用的headUI，主页玩家加入时头像
	public cancelBloukNum:number;     //消除方块的数量,用于计算进度
	
	
	public clear(){
    	  this.cancelBloukNum = 0;
    	  this.gameHeadUI.clear();
    	  this.headUI.clear();
    	  this.headUI = null;
	    this.gameHeadUI = null;
	}
}
