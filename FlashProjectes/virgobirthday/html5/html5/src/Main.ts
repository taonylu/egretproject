 class Main extends egret.Sprite {

	private loader:flash.Loader;
	private loadMC:egret.SwfMovie;
	private progressText:flash.TextField;

	public constructor()
	{
		super();
		var _self__:any = this;
		if(this.stage)
			this.init();
		else
			_self__.addEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
	}

	private init(e:egret.Event = null)
	{
		var _self__:any = this;
		_self__.removeEventListener(egret.Event.ADDED_TO_STAGE,flash.bind(this.init,this),null);
		this.progressText = new flash.TextField();
		this.progressText.width = 300;
		this.progressText.x = this.stage.stageWidth / 2 - this.progressText.width / 2;
		this.progressText.y = this.stage.stageHeight / 2 - this.progressText.height / 2;
		this.progressText.textColor = 0xffffff;
		var format:flash.TextFormat = new flash.TextFormat();
		format.size = 50;
		format.align = flash.TextFormatAlign.CENTER;
		this.progressText.defaultTextFormat = format;
		this.addChild(this.progressText);
		this.progressText.text = "123";
		var context:flash.LoaderContext = new flash.LoaderContext(false,flash.ApplicationDomain.currentDomain,null);
		this.loader = new flash.Loader();
		this.loader.contentLoaderInfo.addEventListener(egret.ProgressEvent.PROGRESS,flash.bind(this.onProgress,this),null);
		this.loader.contentLoaderInfo.addEventListener(egret.Event.COMPLETE,flash.bind(this.onComplete,this),null);
		this.loader.load(new egret.URLRequest("birthday.swf"),context);
	}

	private onProgress(e:egret.ProgressEvent)
	{
		this.progressText.text = flash.tranint((e.bytesLoaded / e.bytesTotal) * 100) + "%";
	}

	private onComplete(e:egret.Event)
	{
		var _self__:any = this;
		_self__.removeChild(this.progressText);
		this.addChild(new BirthdayScene());
	}

}

