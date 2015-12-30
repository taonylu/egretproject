/**
 *
 * @author 
 *
 */
class Example1 extends egret.Sprite{
    
    //-----------------测试------------------
    //1 新建一个骨骼动画并播放
    //2 骨骼当前动画、动作播放完成，切换下一动作等...
    
    
	public constructor() {
        super();
        console.log(dragonBones.DragonBones.DATA_VERSION);
        
        //获取资源
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");

        //工厂类，获取骨架
        var dragonbonesFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
        var armature: dragonBones.Armature = dragonbonesFactory.buildArmature("robot");
        this.addChild(armature.display);
        
        //设置骨架显示对象
        armature.display.x = 200;
        armature.display.y = 300;
        armature.display.scaleX = 0.5;
        armature.display.scaleY = 0.5;

        //世界时钟
        dragonBones.WorldClock.clock.add(armature);
        
        //播放指定动画
        armature.animation.gotoAndPlay("Run");

        egret.Ticker.getInstance().register(
            function(frameTime: number) { dragonBones.WorldClock.clock.advanceTime(0.01) },
            this
            );  
	}
}
