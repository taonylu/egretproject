/**
 *
 * @author 
 *
 */
class Example1 extends egret.Sprite{
    
    //-----------------测试------------------
    //1 新建一个骨骼动画并播放
    //2 骨骼当前动画、动作播放完成，切换下一动作等...
    
    private armature: dragonBones.Armature ;
    private armature2: dragonBones.Armature ;
    
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
        
        //设置骨架显示对象
        this.armature = dragonbonesFactory.buildArmature("robot");
        this.addChild(this.armature.display);
        this.armature.display.x = 200;
        this.armature.display.y = 200;
        this.armature.display.scaleX = 0.5;
        this.armature.display.scaleY = 0.5;
        
        this.armature2= dragonbonesFactory.buildArmature("robot");
        this.addChild(this.armature2.display);
        this.armature2.display.x = 600;
        this.armature2.display.y = 200;
        this.armature2.display.scaleX = 0.5;
        this.armature2.display.scaleY = 0.5;
        
        //世界时钟
        dragonBones.WorldClock.clock.add(this.armature);
        dragonBones.WorldClock.clock.add(this.armature2);
        
        //播放指定动画
        this.armature.animation.gotoAndPlay("Walk",-1,-1,0);
        this.armature2.animation.gotoAndPlay("Walk",-1,-1,0);
        
        //鼠标监听
        Main.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        
        
        egret.Ticker.getInstance().register(
            function(frameTime: number) { dragonBones.WorldClock.clock.advanceTime(0.01) },
            this
            );  
	}
	
	private bWalk:Boolean = true;
	private onTouchTap(){
    	if(this.bWalk){
            this.armature.animation.gotoAndPlay("Run",-1,-1,0);
            this.armature2.animation.gotoAndPlay("Run",-1,-1,0);
    	}else{
            this.armature.animation.gotoAndPlay("Walk",-1,-1,0);
            this.armature2.animation.gotoAndPlay("Walk",-1,-1,0);	
    	}
    	this.bWalk = !this.bWalk;
	}
}












