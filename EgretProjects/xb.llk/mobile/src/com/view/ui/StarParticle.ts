/**
 * 星星粒子效果
 * @author 
 *
 */
class StarParticle extends egret.DisplayObjectContainer{
    //private system: particle.ParticleSystem;
	public constructor() {
    	  super();
//        var texture = RES.getRes("star_png");
//        var config = RES.getRes("star_json");
//        
//        this.system = new particle.GravityParticleSystem(texture,config);
//        this.addChild(this.system);
        
	}
	
	public play(){
       // this.system.start();
	}
	
	public stop(){
    	//this.system.stop();
	}
}
