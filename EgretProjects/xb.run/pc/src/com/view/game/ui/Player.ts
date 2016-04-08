/**
 * 玩家类
 * @author 
 *
 */
class Player extends SimpleMC{
    public track:number;              //当前所处的赛道
    public isJumping:boolean = false; //是否跳跃
    public openid:string;             //openid
    public hitY:number;               //碰撞检测的Y值
    
	public constructor(png:string, json:string, mc:string) {
        super(png,json,mc);
	}
	
	public run(){
    	//this.gotoAndPlay("run",-1);
    	this.play(-1);
	}
	
	private initY:number;
	public jump(){
    	if(this.isJumping == false){
        	this.isJumping = true;
            //this.gotoAndPlay("jump",1);
            this.initY = this.y;
            var self = this;
            egret.Tween.get(this).to({ y: this.y - 500 },300).to({ y: this.initY },300).
                call(function() {
                    self.isJumping = false;
                    self.run();
                },this);
    	}
    	
	}
	
	public die(){
    	  //this.gotoAndPlay("die",1);
    	  var self = this;
        egret.Tween.get(this).to({ y: -200,x: Math.random() * GameConst.stage.stageWidth,rotation: 360 * 3 },500).call(function() {
            GameManager.getInstance().gameScene.resetPlayer(self);
        });
	}
	
	public hide(){
    	this.parent && this.parent.removeChild(this);
    	this.stop();
	}
   
}
