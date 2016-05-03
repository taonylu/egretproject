/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public start_stage: string = "start_stage_mp3";
    public lose: string = "lose_mp3";
    public gift_life: string = "gift_life_mp3";
    public gift_bomb: string = "gift_bomb_mp3";
    public gift: string = "gift_mp3";
    public fire_reach_wall: string = "fire_reach_wall_mp3";
    public fire: string = "fire_mp3";
    public user_move: string = "user_move_mp3";
    
    private soundList = {};     //声音列表
    private channelList = {};   //声道列表
    
    private bgmChannel:egret.SoundChannel;  //背景音乐声道
    
	public constructor() {
        this.addSound(this.start_stage);
        this.addSound(this.lose);
        this.addSound(this.gift_life);
        this.addSound(this.gift_bomb);
        this.addSound(this.gift);
        this.addSound(this.fire_reach_wall);
        this.addSound(this.fire);
        this.addSound(this.user_move);
	}
	
	public addSound(soundName:string){
        this.soundList[soundName] = RES.getRes(soundName);
	}
	
	//播放声音
    public play(soundName: string,loops: number = 1, volume:number = 1){
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
