package com.common
{
	import flash.media.Sound;
	import flash.media.SoundChannel;
	import flash.media.SoundMixer;
	import flash.utils.Dictionary;
	
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class SoundManager 
	{
		public static var instance:SoundManager = new SoundManager();
		public static var SND_MONEY:String = "Snd_Money";
		public static var SND_BOOM:String = "Snd_Boom";
		public static var SND_BGM:String = "Snd_BGM";
		public static var SND_STONE:String = "Snd_Stone";
		public static var SND_POWER:String = "Snd_Power";
		public static var SND_OVER:String = "Snd_Over";
		public static var SND_POWERUP:String = "Snd_PowerUp";
		
		public var bOpen:Boolean = true;
		public var bgmChannel:SoundChannel;
		private var soundList:Dictionary = new Dictionary();
		
		
		
		public function SoundManager():void{
			soundList[SND_MONEY] = new Snd_Money();
			soundList[SND_BOOM] = new Snd_Boom();
			soundList[SND_BGM] = new Snd_BGM();
			soundList[SND_STONE] = new Snd_Stone();
			soundList[SND_POWER] = new Snd_Power();
			soundList[SND_OVER] = new Snd_Over();
			soundList[SND_POWERUP] = new Snd_PowerUp();
		}
		
		
		public function play(soundName:String):void{
			if(bOpen){
				var sound:Sound = soundList[soundName];
				sound && sound.play();
			}
		}
		
		public function playBGM():void {
			if(bOpen){
				bgmChannel = (soundList[SND_BGM] as Sound).play(0, int.MAX_VALUE);
			}
		}
		
		public function stopBGM():void {
			if(bgmChannel != null){
				bgmChannel.stop();
			}
			
		}
		
		public function stopAll():void{
			SoundMixer.stopAll();
		}
		
		
		public function soundClose():void {
			stopAll();
			bOpen = false;
			bgmChannel && bgmChannel.stop();
		}
		
		public function soundOpen():void {
			bOpen = true;
			playBGM();
		}
		
	}

}