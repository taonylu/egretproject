/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public line:string = "line";
    public enterMan:string = "enterMan";
    public enterWoman:string = "enterWoman";
    public homeBgm:string = "homeBgm";
    public gameBgm:string = "gameBgm";
    public gameOver:string = "gameOver";
    
    private soundList = {};     //声音列表
    private channelList = {};   //声道列表
    
    private bgmChannel:egret.SoundChannel;  //背景音乐声道
    
	public constructor() {
    	  this.soundList[this.line] = RES.getRes("line_mp3");
        this.soundList[this.enterMan] = RES.getRes("enter_man_mp3");
        this.soundList[this.enterWoman] = RES.getRes("enter_woman_mp3");
        this.soundList[this.homeBgm] = RES.getRes("bgm_home_mp3");
        this.soundList[this.gameBgm] = RES.getRes("bgm_game_mp3");
        this.soundList[this.gameOver] = RES.getRes("game_over_mp3");
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
	
	//播放背景音乐
	public playBgm(bgmName:string){
    	if(this.bgmChannel){
      	  this.bgmChannel.stop();
    	}
    	var bgm:egret.Sound = this.soundList[bgmName];
    	if(bgm){
        this.bgmChannel = bgm.play();
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
