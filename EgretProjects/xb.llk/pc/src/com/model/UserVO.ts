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
	public cancelBloukNum:number=0;     //消除方块的数量,用于计算进度
	
	//只清理引用的数据
	public clear(){
    	  this.headBmd = null;
    	
    	  if(this.gameHeadUI){
          this.gameHeadUI.clear();
          this.gameHeadUI = null; 
    	  }
    	  
        if(this.headUI){
            this.headUI.reset();
            this.headUI = null;
        }  
	}
}
