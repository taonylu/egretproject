package src.framework.utils 
{
	import flash.utils.getDefinitionByName;
	import flash.media.SoundChannel;
	import flash.media.Sound;
	/**
	 * 声音管理
	 * @author rikimaru
	 * @since 2017/1/23
	 */
	public class SoundMgr 
	{
		/**允许播放音效*/
		private var _allowEffect: Boolean = true;
		/**允许播放背景音乐*/
		private var _allowBGM: Boolean = true;
		/**声音列表*/
		private var soundList = {};
		/**背景音乐声道*/
		private var bgmChannel: SoundChannel;
		
		/**
		 * 添加声音
		 * @soundName 声音名
		 */
		public function addSound(soundName: String) {
			var clz = getDefinitionByName(soundName);
			if(clz) {
				this.soundList[soundName] = new clz();
			} else {
				trace("声音不存在:",soundName);
			}
		}
		
		/**
		 * 播放声音
		 * @soundName 声音名
		 * @loop 循环次数
		 */
		public function playEffect(soundName: String,loop: Number = 1) {
			if(this.allowEffect == false){
				return;
			}
			var sound: Sound = this.soundList[soundName];
			if(sound) {
				sound.play(0,loop);
			} else {
				//TODO
			}
		}
		
		/**
		 * 播放背景音乐
		 * @soundName 声音名
		 */
		public function playBGM(soundName: String) {
			if(this.allowBGM == false){
				return;
			}
			var sound: Sound = this.soundList[soundName];
			if(sound) {
				if(this.bgmChannel == null) {
					this.bgmChannel = sound.play(0,Number.MAX_VALUE);
				}
			}else{
				//TODO
			}
		}
		
		/**
		 * 停止背景音乐
		 */
		public function stopBGM() {
			if(this.bgmChannel) {
				this.bgmChannel.stop();
				this.bgmChannel = null;
			}
		}
		
		/**是否允许播放音效*/
		public function get allowEffect(): Boolean {
			return this._allowEffect;
		}
		
		/**是否允许播放音效*/
		public function set allowEffect(allow: Boolean) {
			this._allowEffect = allow;
		}
		
		/**是否允许播放背景音乐*/
		public function get allowBGM(): Boolean {
			return this._allowBGM;
		}
		
		/**是否允许播放背景音乐*/
		public function set allowBGM(allow: Boolean) {
			this._allowBGM = allow;
		}
		
		/**单例*/
		private static var instance:SoundMgr;
		/**获取单例*/
		public static function getInstance():SoundMgr {
			if (instance == null) {
				instance = new SoundMgr();
			}
			return instance;
		}
		
	}

}