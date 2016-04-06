/**
 * 玩家类
 * @author 
 *
 */
class Player extends SimpleMC{
    public track:number;   //当前所处的赛道
    public isJumping:boolean = false; //是否跳跃
    
	public constructor() {
    	super("player_png","player_json","player");
    	this.scaleX = this.scaleY = 3;
	}
	
   
}
