package
{
	import flash.display.Loader;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.events.ProgressEvent;
	import flash.net.URLRequest;
	import flash.system.LoaderContext;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.system.ApplicationDomain;
	
	/**
	 * ...
	 * @author 
	 */
	 [SWF(width=640,height=1150,backgroundColor=0xffffff,frameRate=30)]
	public class Main extends Sprite 
	{
		private var loader:Loader;                 //加载器
		private var loadMC:MovieClip;              //加载的MovieClip
		private var progressText:TextField;        //进度文本
		
		public function Main() 
		{
			if (stage) init();
			else addEventListener(Event.ADDED_TO_STAGE, init);
		}
		
		private function init(e:Event = null):void 
		{
			removeEventListener(Event.ADDED_TO_STAGE, init);
			
			progressText = new TextField();
			progressText.width = 300;
			progressText.x = this.stage.stageWidth / 2 - progressText.width/2;
			progressText.y = this.stage.stageHeight /2 - progressText.height/2;
			progressText.textColor = 0xffffff;
			var format:TextFormat = new TextFormat();
			format.size = 50;
			format.align = TextFormatAlign.CENTER;
			progressText.defaultTextFormat = format;
			this.addChild(progressText);
			progressText.text = "";
			
			
			var context:LoaderContext = new LoaderContext(false, ApplicationDomain.currentDomain, null);
			loader = new Loader();
			loader.contentLoaderInfo.addEventListener(ProgressEvent.PROGRESS, onProgress);
			loader.contentLoaderInfo.addEventListener(Event.COMPLETE, onComplete);
			loader.load(new URLRequest("movie.swf"),context);
		}
		
		private function onProgress(e:ProgressEvent):void{
			progressText.text = int((e.bytesLoaded / e.bytesTotal) * 100) + "%";
		}
		
		private function onComplete(e:Event):void {
			removeChild(progressText);
			
			this.addChild(new GameScene());
		}
		
		
		
		
		
		
		
	}
	
}