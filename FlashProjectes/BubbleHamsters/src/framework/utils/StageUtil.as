package src.framework.utils 
{
	import flash.display.Stage;
	/**
	 * 舞台工具类
	 * @author rikimaru
	 * @since 2017/1/22
	 */
	public class StageUtil 
	{
		/**舞台*/
		private var stage:Stage;

		/**初始化舞台 egret.MainContext API废弃，这里必须在Main.ts里传入stage*/
		public function init(stage:Stage) {
			this.stage = stage;
		}

		/**获取舞台*/
		public function getStage(): Stage {
			return this.stage;
		}

		/**舞台宽度*/
		public function get stageWidth() {
			return this.stage.stageWidth;
		}

		/**舞台高度*/
		public function get stageHeight() {
			return this.stage.stageHeight;
		}
		
		/**舞台一半宽度*/
		public function get halfStageWidth() {
			return this.stage.stageWidth / 2;
		}
		
		/**舞台一半高度*/
		public function get halfStageHeight() {
			return this.stage.stageHeight / 2;
		}
		
		/**单例*/
		private static var instance:StageUtil;
		/**获取单例*/
		public static function getInstance():StageUtil {
			if (instance == null) {
				instance = new StageUtil();
			}
			return instance;
		}
	}

}