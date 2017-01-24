package src.framework.utils 
{
	import src.framework.display.BasePanel;
	import flash.events.Event;
	import src.App;
	/**
	 * 弹框管理类
	 * @author rikimaru
	 * @since 2017/1/22
	 */
	public class PanelMgr 
	{
		/**面板实例*/
		private var panelMap = {};
		/**面板类定义*/
		private var clzMap = { };

		/**
		 * 注册
		 * @clz panel类名
		 */
		public function register(panelName: String,panelClz: *) {
			this.clzMap[panelName] = panelClz;
		}

		/**
		 * 打开弹框面板
		 * @panelName 面板名
		 * @callBack 面板添加到舞台后的回调函数
		 * @thisObject 回调函数执行对象
		 * @reutrn 返回打开的面板
		 */
		public function open(panelName: String,callBack: Function = null,thisObject: * = null): BasePanel {
			var panel: BasePanel = this.panelMap[panelName];
			if(panel) {
				panel = this.openPanel(panelName, callBack, thisObject);
			} else {
				//panel不存在，则加载panel所需资源并新建一个
				var clz = this.clzMap[panelName];
				if(clz) {
					panel = new clz();
					this.panelMap[panelName] = panel;
					this.openPanel(panelName, callBack, thisObject);
				}
			}
			return panel;
		}

		/**打开弹框*/
		private function openPanel(panelName: String, callBack: Function = null,thisObject: * = null) {
			var panel: BasePanel = this.panelMap[panelName];
			if (panel) {
				panel.addEventListener(Event.ADDED_TO_STAGE, function():void {
					panel.removeEventListener(Event.ADDED_TO_STAGE, arguments.callee);
					panel.onEnable();
					if (callBack != null && thisObject != null) {
						callBack.apply(thisObject);
					}
				});
				App.LayerManager.panelLayer.addChild(panel);
			}
			return panel;
		}
		
		/**
		 * 获取面板
		 * @param	panelName 面板名
		 */
		public function getPanel(panelName:String) {
			return this.panelMap[panelName];
		}

		/**
		 * 关闭弹框
		 * @panelName 弹框名
		*/
		public function close(panelName: String) {
			var panel:BasePanel = this.panelMap[panelName];
			if (panel) {
				panel.addEventListener(Event.REMOVED_FROM_STAGE, function():void {
					panel.removeEventListener(Event.REMOVED_FROM_STAGE, arguments.callee);
					panel.onRemove();
				});
				panel.parent && panel.parent.removeChild(panel);
			}
		}

		/**关闭所有弹框*/
		public function closeAll() {
			for(var key in this.panelMap) {
				this.close(key);
			}
		}
		
		/**单例*/
		private static var instance:PanelMgr;
		/**获取单例*/
		public static function getInstance():PanelMgr {
			if (instance == null) {
				instance = new PanelMgr();
			}
			return instance;
		}
		
	}

}