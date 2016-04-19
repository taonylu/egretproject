/**
 * 爆炸效果
 * @author 
 *
 */
class Boom extends SimpleMC{
    public static NAME:string = "Boom";
    public constructor(pngName: string,jsonName: string,mcName: string) {
        super(pngName, jsonName, mcName);
    }
    
    public playAnim(){
        this.gotoAndPlay(1,1);
        this.addEventListener(egret.MovieClipEvent.COMPLETE,this.onComplete, this);
    }
    
    private onComplete(){
        this.recycle();
    }
    
    public recycle(){
        this.parent && this.parent.removeChild(this);
        this.gotoAndStop(1);
        ObjectPool.getPool(Boom.NAME).returnObject(this);
    }
    
}
