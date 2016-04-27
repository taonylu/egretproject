/**
 *
 * @author 
 *
 */
class TankBoom extends SimpleMC{
    public static NAME: string = "TankBoom";
    public constructor() {
        super();
        this.setMovieClip("tankBoom_png","tankBoom_json","tankBoom");
        this.anchorOffsetX = 64;
        this.anchorOffsetY = 64;
        this.addEventListener(egret.MovieClipEvent.COMPLETE,this.recycle,this);
    }

    public playBoom() {
        this.gotoAndPlay(1,1);
    }

    private onComplete() {
        this.recycle();
    }

    public recycle() {
        this.parent && this.parent.removeChild(this);
        this.gotoAndStop(1);
        ObjectPool.getPool(TankBoom.NAME).returnObject(this);
    }
}
