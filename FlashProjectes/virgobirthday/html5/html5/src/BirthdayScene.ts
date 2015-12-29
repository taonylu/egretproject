 class BirthdayScene extends egret.SwfMovie {

	private scene:egret.SwfMovie;

	public constructor()
	{
		super();
		this.addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.onAddToStage,this),null);
	}

	private onAddToStage(e:egret.Event)
	{
		var _self__:any = this;
		this.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.onAddToStage,this),null);
		var clz:any = <any>flash.ApplicationDomain.currentDomain.getDefinition("Birthday");
		this.scene = new clz();
		this.scene.x = this.stage.stageWidth / 2;
		this.scene.y = this.stage.stageHeight / 2;
		this.scene.gotoAndPlay(1);
		this.addChild(this.scene);
		_self__.addEventListener(egret.Event.ENTER_FRAME,flash.bind(this.onEnterFrame,this),null);
		this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,flash.bind(this.onMouseClick,this),null);
		SoundM.init();
		SoundM.play(SoundM.welcome);
	}

	private yaoqingFlow:number = 21;
	private yaoqingOpen:number = 22;
	private yaoqingFlow2:number = 38;
	private door:number = 39;
	private door_wait:number = 52;
	private door_takeoff:number = 53;
	private door_waitin:number = 104;
	private hair:number = 105;
	private hair_wait:number = 118;
	private hair_clear:number = 119;
	private hair_over:number = 183;
	private room:number = 184;
	private onEnterFrame(e:egret.Event)
	{
		switch(this.scene.currentFrame)
		{
		case this.yaoqingFlow :
			this.scene.stop();
			break;
		case this.yaoqingFlow2 :
			this.scene.stop();
			break;
		case this.door_wait :
			this.scene.stop();
			break;
		case this.door_waitin :
			this.scene.stop();
			break;
		case this.hair_wait :
			this.scene.stop();
			break;
		case this.hair_over :
			this.scene.stop();
			break;
		}
	}

	private onMouseClick(e:flash.MouseEvent)
	{
		switch(this.scene.currentFrame)
		{
		case this.yaoqingFlow :
			this.scene.gotoAndPlay(this.yaoqingOpen);
			break;
		case this.yaoqingFlow2 :
			this.scene.gotoAndPlay(this.door);
			break;
		case this.door_wait :
			this.scene.gotoAndPlay(this.door_takeoff);
			break;
		case this.door_waitin :
			this.scene.gotoAndPlay(this.hair);
			break;
		case this.hair_wait :
			this.scene.gotoAndPlay(this.hair_clear);
			break;
		case this.hair_over :
			this.scene.gotoAndPlay(this.room);
			break;
		}
	}

}

