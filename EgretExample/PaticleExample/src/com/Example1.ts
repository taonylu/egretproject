/**
 *
 * @author 
 *
 */
class Example1 extends egret.Sprite{
    //----------------------测试--------------------
    //1 使用软件生成粒子效果json和png
    //2 加载第三方粒子库
    //3 生成粒子效果
    
    private system: particle.ParticleSystem;
	public constructor() {
        super();
        
        var texture = RES.getRes("star_png");
        var config = RES.getRes("fireworks_json");

        if(this.system) {
            this.system.stop();
            this.removeChild(this.system);
        }

        this.system = new particle.GravityParticleSystem(texture,config);
        this.addChild(this.system);
        this.system.start();
	}
}
