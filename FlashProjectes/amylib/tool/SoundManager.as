package com.mylib.tool
{
	import flash.media.Sound;
	import flash.media.SoundMixer;
	import flash.media.SoundChannel;
	import flash.media.SoundTransform;

	/**
	 * 声音管理类
	 */
	public class SoundManager 
	{		
		private var sounds:Array;		                                       //存储声音
		private var soundTrackChannel:SoundChannel=new SoundChannel();         //用来播放指定声道
		private var soundChannels:Array = [];                                  //存储SoundChannel对象
		private var soundMute:Boolean = false;                                 //记录声音是否正在播放
		private var tempSoundTransform:SoundTransform = new SoundTransform();  //重用的soundTransform对象
		private var muteSoundTransform:SoundTransform = new SoundTransform();  //用来消去声音
		private var tempSound:Sound;                                           //用来存放我们想播放的声音
		
		public function SoundManager() 	{
			sounds = new Array();
		}
			
		
		/**
		 * 播放声音
		 * @param	soundName      播放声音的名字
		 * @param	isSoundTrack   声音是否当做声道来播放，声道特殊处理
		 * @param	loops          声音循环次数
		 * @param	offset         声音偏移量，决定声音从哪里开始播放
		 * @param	volume         音量大小 0~1之间
		 */
		public function playSound(soundName:String, isSoundTrack:Boolean=false, loops:int=1, offset:Number=0, volume:Number=1):void{
			tempSoundTransform.volume=volume;
			tempSound = sounds[soundName];
			
			if (isSoundTrack) {
				if (soundTrackChannel != null) {
					soundTrackChannel.stop();
				}
				soundTrackChannel = tempSound.play(offset,loops);								
				soundTrackChannel.soundTransform=tempSoundTransform;	
			}else {
				soundChannels[soundName] = tempSound.play(offset, loops);
				soundChannels[soundName].soundTransform=tempSoundTransform;		
			}		
		}
		
		/**
		 * 添加声音
		 * @param	soundName  声音名
		 * @param	sound      声音类
		 */
		public function addSound(soundName:String, sound:Sound):void {
			sounds[soundName] = sound;
			
		}

		/**
		 * 停止播放声音
		 * @param	soundName     声音名
		 * @param	isSoundTrack  是否被当做声道播放
		 */
		public function stopSound(soundName:String, isSoundTrack:Boolean = false):void {
			if (isSoundTrack) {
				soundTrackChannel.stop();
			}else {
				soundChannels[soundName].stop();
			}
		}
	
		/**
		 * 声音开关
		 */
		public function muteSound():void {
			if (soundMute) {
				soundMute=false;
				muteSoundTransform.volume=1;
				SoundMixer.soundTransform=muteSoundTransform;
			}else{
				//flash.media.SoundMixer.stopAll();
				muteSoundTransform.volume=0;
				SoundMixer.soundTransform=muteSoundTransform;
				soundMute=true;
			}
		}
	}
	
}
