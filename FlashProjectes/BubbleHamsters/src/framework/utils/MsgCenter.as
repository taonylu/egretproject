package src.framework.utils 
{
	/**
	 * 事件管理类
	 * @author rikimaru
	 * @since 2017/1/22
	 */
	public class MsgCenter
	{
		/**事件列表*/
		private var eventList = { };
		/**control列表*/
		private var commandList = { };

		/**
		 * 添加消息监听
		 * @param type 事件类型
		 * @param listener 侦听函数
		 * @param thisObject 侦听函数所属对象
		 */
		public function addEvent(type: String,listener: Function,thisObject:*): void {
			var arr = this.eventList[type];
			if(arr == null) {
				arr = [];
				this.eventList[type] = arr;
			}

			//检测是否已经存在
			var len: Number = arr.length;
			for(var i:Number = 0;i < len;i++) {
				if(arr[i][0] == listener && arr[i][1] == thisObject) {
					return;
				}
			}
			arr.push([listener,thisObject]);
		}

		/**
		 * 移除消息监听
		 * @param type 事件类型
		 * @param listener 侦听函数
		 * @param thisObject 侦听函数所属对象
		 */
		public function removeEvent(type: String,listener: Function,thisObject: *): void {
			var arr = this.eventList[type];
			if(arr == null) {
				return;
			}
			var len: Number = arr.length;
			for(var i:Number = 0;i < len;i++) {
				if(arr[i][0] == listener && arr[i][1] == thisObject) {
					arr.splice(i,1);
					break;
				}
			}

			if(arr.length == 0) {
				this.eventList[type] = null;
				delete this.eventList[type];
			}
		}

		/**
		 * 发送事件
		 * @param type 事件类型
		 * @param param 消息参数
		 *
		 */
		public function sendEvent(type: String,...args): void {
			var arr = this.eventList[type];

			if(arr == null) {
				return;
			}

			var len: Number = arr.length;
			var listener;
			for (var i:Number = 0; i < len; i++) {
				listener = arr[i];
				listener[0].apply(listener[1], args);
			}
		}
		
		/**
		 * 添加command
		 * @param cmdName 命令名
		 * @param cmdClz 命令类定义
		 */
		public function addCommand(cmdName:String, cmdClz:*) {
			this.commandList[cmdName] = cmdClz;
		}
		
		/**
		 * 发送命令
		 * @param cmdName 命令名
		 * @param args 参数
		 */
		public function sendCommand(cmdName:String, ...args) {
			var clz:Class = this.commandList[cmdName];
			if (clz) {
				var len:Number = args.length;
				if (len == 0) {
					new clz();
				}else if (len == 1) {
					new clz(args[0]);
				}else if (len == 2) {
					new clz(args[0], args[1]);
				}else if (len == 3) {
					new clz(args[0], args[1], args[2]);
				}else if (len == 4) {
					new clz(args[0], args[1], args[2], args[3]);
				}
			}
		}
		
		/**
		 * 移除命令
		 * @param	cmdName 命令名
		 */
		public function removeCommand(cmdName:String) {
			delete this.commandList[cmdName];
		}
		
		
		/**单例*/
		private static var instance:MsgCenter;
		/**获取单例*/
		public static function getInstance():MsgCenter {
			if (instance == null) {
				instance = new MsgCenter();
			}
			return instance;
		}
		
	}

}