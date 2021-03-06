/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public click:string = "click";
    public line:string = "line";
    
    public soundList = {};     //声音列表
    public channelList = {};   //声道列表
    
	public constructor() {
    	  this.soundList[this.click] = RES.getRes("click_mp3");
    	  this.soundList[this.line] = RES.getRes("line_mp3");
	}
	
	//播放声音
	public play(soundName:string, loops:number=1){
    	var snd:egret.Sound = this.soundList[soundName];
    	if(snd){
        	this.channelList[soundName] = snd.play(0,loops);
    	}
	}
	
	//停止声音
	public stop(soundName:string){
    	var channel:egret.SoundChannel = this.channelList[soundName];
    	if(channel){
        	channel.stop();
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
