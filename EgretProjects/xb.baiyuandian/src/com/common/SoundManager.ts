/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public get:string = "get";
    public bgm:string = "bgm";
    
    public soundList = {};     //声音列表
    public bgmChannel:egret.SoundChannel;
    
	public constructor() {
    	  this.soundList[this.get] = RES.getRes("get_mp3");
        this.soundList[this.bgm] = RES.getRes("bgm_mp3");
	}
	
	//播放声音
	public play(soundName:string, loops:number=1){
    	var snd:egret.Sound = this.soundList[soundName];
    	if(snd){
        	snd.play(0,loops);
    	}
	}
	
	public playBGM(){
        
        if(this.bgmChannel != null){ 
            this.bgmChannel.stop();
            this.bgmChannel = null;
    	  }
    	  
        var bgm: egret.Sound = this.soundList[this.bgm]
    	  if(bgm){
        	  this.bgmChannel = bgm.play();
    	  }
	}
	
	public stopBGM(){
    	if(this.bgmChannel != null){
        	this.bgmChannel.stop();
        	this.bgmChannel = null;
    	}
	}
	
	
	private static instance:SoundManager;
	public static getInstance():SoundManager{
    	if(this.instance == null){
        	this.instance = new SoundManager();
    	}
    	return this.instance;
	}
}
