/**
 *
 * @author 
 *
 */
class StarParticle extends particle.GravityParticleSystem{
	public constructor() {
        var partTexture = RES.getRes("starParticle_png");
        var partJson = RES.getRes("starParticle_json");
        super(partTexture, partJson);
        this.emissionRate = 0.5;
	}
	
    public play(x:number, y:number, doc:egret.DisplayObjectContainer): void { 
        this.x = x;
        this.y = y;
        this.start();
        doc.addChild(this);
      
        var that = this;
        egret.Tween.get(this).wait(1000).call(function(): void {
            var pool: ObjectPool = ObjectPool.getPool("StarParticle");
            that.stop(true);
            pool.returnObject(that);
            doc.removeChild(that);
            });
    }
}
