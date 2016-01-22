/**
 * 花瓣掉落粒子效果
 * @author 
 *
 */
class FlowerParticle extends particle.GravityParticleSystem{
	public constructor() {
        var texture = RES.getRes("flower_png");
        var config = RES.getRes("flower_json");
        super(texture, config);
	}
}
