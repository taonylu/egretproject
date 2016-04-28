/**
 * 爆炸效果
 * @author 
 *
 */
class Boom extends SimpleMC{
    public static NAME:string = "Boom";
    public constructor() {
        super();
        this.setMovieClip("boom_png","boom_json","boom");
        this.addEventListener(egret.MovieClipEvent.COMPLETE,this.recycle,this);
    }
    
    public playBoom(){
        this.gotoAndPlay(1,1);
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.gotoAndStop(1);
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    }
    
}
