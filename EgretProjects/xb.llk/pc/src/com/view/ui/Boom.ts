/**
 * 爆炸效果
 * @author 
 *
 */
class Boom extends egret.MovieClip{
    public static NAME:string = "Boom";
	public constructor() {
    	  super();
        var png = RES.getRes("boom_png");
        var json = RES.getRes("boom_json");
        var mcF: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(json,png);
        this.movieClipData = mcF.generateMovieClipData("boom");
	}
	
    public playAnim(block:BlockUI){
       
        this.x = block.x - (140 -block.width)/2;  //140是movieClip最大宽度
        this.y = block.y - (140 - block.height)/2;
        block.parent.addChild(this);
        this.addEventListener(egret.Event.COMPLETE,this.onComplete,this);
        this.gotoAndPlay(0,1);
    }
    
    private onComplete(){
        this.parent && this.parent.removeChild(this);
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    }
}
