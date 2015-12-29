 class SoundM extends egret.HashObject {

	public static welcome:string;
	public static soundDict:flash.Dictionary;

	public constructor()
	{
		super();
	}

	public static init()
	{
		var clazz:any = <any>flash.ApplicationDomain.currentDomain.getDefinition("Welcome");
		SoundM.soundDict.setItem(SoundM.welcome,<flash.Sound>flash.As3As(new clazz(),flash.Sound));
	}

	public static play(sound:string)
	{
		(<flash.Sound>flash.As3As(SoundM.soundDict.getItem(sound),flash.Sound)).play();
	}

}

SoundM.welcome = "Welcome";
SoundM.soundDict = new flash.Dictionary();
