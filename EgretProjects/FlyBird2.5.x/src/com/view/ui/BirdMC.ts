/**
 * 小鸟
 * @author 羊力大仙
 * @date 2015.10.27
 */
class BirdMC extends SimpleMC{

	private upforce:number = 8;   //上升力
	public speedY:number = 0;   //y速度
	public hitRect:egret.Rectangle;

	public constructor() {
        super("bird_png","bird_json","flappybird");
		this.width = 50;
		this.height = 50;
		this.anchorOffsetX = this.width/2;
		this.anchorOffsetY = this.height/2;
		this.hitRect = new egret.Rectangle(0,0,20,20);
	}

	//向上一个力，飞一下
	public fly():void{
		this.speedY = -this.upforce;
	}
}
