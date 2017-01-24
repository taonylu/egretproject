package   
{
	import flash.display.LoaderInfo;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.ProgressEvent;
	import src.App;
	import src.game.view.preload.PreloadScene;
	import src.game.view.panel.BigMicePanel;
	import src.game.constant.PanelConst;
	import src.game.constant.SceneConst;
	
	/**
	 * 文档类
	 * @author rikimaru
	 */
	public class Main extends MovieClip
	{	
		/**预加载场景*/
		public var preloadScene:PreloadScene;
		
		public function Main() 
		{
			loaderInfo.addEventListener(ProgressEvent.PROGRESS, this.onProgress);
			loaderInfo.addEventListener(Event.COMPLETE, this.onComplete);
		}
		
		//加载进度
		private function onProgress(e:ProgressEvent) {
			preloadScene.setProgress(Math.round((e.bytesLoaded / e.bytesTotal) * 100));
		}
		
		//加载完成
		private function onComplete(e:Event) {
			trace("load complete");
			loaderInfo.removeEventListener(ProgressEvent.PROGRESS, this.onProgress);
			loaderInfo.removeEventListener(Event.COMPLETE, this.onComplete);
			
			createStartScene();
		}
		
		//创建主页
		private function createStartScene() {
			//跳转到第二帧
			this.gotoAndStop(2);
			
			//初始化stage
			App.StageUtils.init(this.stage);
			
			//启动App
			App.getInstance().startup();
		}
	}

}






