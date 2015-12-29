package  
{
	import flash.media.Sound;
	import flash.utils.Dictionary;
	import flash.system.ApplicationDomain;
	import flash.utils.getDefinitionByName;
	/**
	 * ...
	 * @author Rikimaru
	 */
	public class SoundM 
	{
		public static var welcome:String = "Welcome";
		public static var soundDict:Dictionary = new Dictionary();
		
		public function SoundM() 
		{
			
		}
		
		public static function  init():void {
			var clazz:Class = ApplicationDomain.currentDomain.getDefinition("Welcome") as Class;
			soundDict[welcome] = new clazz() as Sound;
		}
		
		public static function play(sound:String):void {
			(soundDict[sound] as Sound).play();
		}
		
	}

}