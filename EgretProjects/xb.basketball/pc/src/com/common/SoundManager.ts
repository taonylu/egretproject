/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public frame:string = "frame";
    public floor:string = "floor";
    public wang:string = "wang";
    public bgm_home:string = "bgm_home";
    public bgm_game:string = "bgm_game";
    
    private soundList = {};     //声音列表
    private channelList = {};   //声道列表
    
    private bgmChannel:egret.SoundChannel;  //背景音乐声道
    
	public constructor() {
	  this.soundList[this.frame] = RES.getRes("frame_mp3");
      this.soundList[this.floor] = RES.getRes("floor_mp3");
      this.soundList[this.wang] = RES.getRes("wang_mp3");
      this.soundList[this.bgm_home] = RES.getRes("bgm_home_mp3");
      this.soundList[this.bgm_game] = RES.getRes("bgm_game_mp3");
	}
	
	//播放声音
	public play(soundName:string, volume:number = 1, loops:number=1){
    	var snd:egret.Sound = this.soundList[soundName];
    	if(snd){
        	this.channelList[soundName] = snd.play(0,loops);
        	(this.channelList[soundName] as egret.SoundChannel).volume = volume;
    	}
	}
	
	//停止声音
	public stop(soundName:string){
    	var channel:egret.SoundChannel = this.channelList[soundName];
    	if(channel){
        	channel.stop();
    	}
	}
	
	//播放背景音乐
	public playBgm(bgmName:string, volume:number = 1){
    	if(this.bgmChannel){
      	  this.bgmChannel.stop();
    	}
    	var bgm:egret.Sound = this.soundList[bgmName];
    	if(bgm){
        this.bgmChannel = bgm.play();
        this.bgmChannel.volume = volume;
      }
	}
	
	//停止背景音乐
	public stopBgm(){
    	if(this.bgmChannel){
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
