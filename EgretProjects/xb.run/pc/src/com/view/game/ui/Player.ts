/**
 * 玩家类
 * @author 
 *
 */
class Player extends SimpleMC{
    public track:number;              //当前所处的赛道
    public score:number;              //用户得分
    public gameHead:GameHead;         //用户在游戏界面的头像
    public roleID:number;             //角色ID  0兔子 1熊猫 2鹿
    public isJumping:boolean = false; //是否跳跃
    public isMoving:boolean = false;  //是否在移动，防止连续移动导致位置不正确
    public isDie:boolean = false;     //是否死亡
    public openid:string;             //openid
    public shadow:egret.Bitmap;       //影子，因为跳跃时，影子不动，所以影子单独为一张图片
    public offerX:number; //由于mc中点位置不正确，这里增加修正值
    public offerY:number;
    
	public constructor(png:string, json:string, mc:string) {
        super(png,json,mc);
        this.shadow = new egret.Bitmap(RES.getRes("shadow_png"));
        this.shadow.anchorOffsetX = this.shadow.width/2;
        this.shadow.anchorOffsetY = this.shadow.height/2;
	}
	
	public modifyPos(){
    	this.x += this.offerX;
    	this.y += this.offerY;
	}
	
	public stand(){
    	this.gotoAndStop(4);
	}
	
	public run(){
    	this.gotoAndPlay("run",-1);
	}
	
	public initY:number;  //初始Y位置
	public jump(){
    	if(this.isJumping == false){
        	this.isJumping = true;
            this.gotoAndPlay("jump",1);
            var self = this;
            egret.Tween.get(this).to({ y: this.initY - 150},300).to({ y: this.initY },300).
                call(function() {
                    self.isJumping = false;
                    self.run();
                },this);
    	}
    	
	}
	
	public die(){
        this.isDie = true;
    	  this.gotoAndPlay("die",1);
    	  var self = this;
//        egret.Tween.get(this).to({ y: -200,x: Math.random() * GameConst.stage.stageWidth,rotation: 360 * 3 },500).call(function() {
//            GameManager.getInstance().gameScene.resetPlayer(self);
//        });
          egret.Tween.get(this.shadow).to({ y: GameConst.stage.stageHeight + this.width },900);
    	  
	    egret.Tween.get(this).to({ y:GameConst.stage.stageHeight+this.width},1000).call(function() {
            GameManager.getInstance().gameScene.resetPlayer(self);
        });
	}
	
	public hide(){
    	this.parent && this.parent.removeChild(this);
    	this.shadow.parent && this.shadow.parent.removeChild(this.shadow);
    	this.stop();
	}
	
	public clearStatus(){
        this.isJumping = false;
        this.isMoving = false;
        this.isDie = false;
	}
	
	public reset(){
    	this.clearStatus();
    	this.gameHead = null;
    	this.score = 0;
    	this.track = 0;
    	this.roleID = 0;
    	this.openid = "";
	}
   
}
