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
    public tank_boom: string = "tank_boom_mp3";
    public home_bgm: string = "home_bg_mp3";
    
    private soundList = {};     //声音列表
    private channelList = {};   //声道列表
    private moveChannelList:Array<egret.SoundChannel> = []; //移动音效
    
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
        this.addSound(this.tank_boom);
        this.addSound(this.home_bgm);
        
        this.moveChannelList[0] = this.play(this.user_move,9999);
        this.moveChannelList[1] = this.play(this.user_move,9999);
        this.moveChannelList[0].stop();
        this.moveChannelList[1].stop();
	}
	
	public addSound(soundName:string){
        this.soundList[soundName] = RES.getRes(soundName);
	}
	
	//播放声音
    public play(soundName: string,loops: number = 1, volume:number = 1):egret.SoundChannel{
    	var snd:egret.Sound = this.soundList[soundName];
    	if(snd){
        	this.channelList[soundName] = snd.play(0,loops);
        	(this.channelList[soundName] as egret.SoundChannel).volume = volume;
        	return this.channelList[soundName];
    	}
    	return null;
	}
	
	//坦克移动
	public playMove(playerNo){
    	 this.moveChannelList[playerNo-1].stop();
    	 this.moveChannelList[playerNo-1] = this.play(this.user_move,9999);
	}
	
	//坦克停止移动
	public stopMove(playerNo){
    	if(this.moveChannelList[playerNo-1]){
        this.moveChannelList[playerNo - 1].stop();
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
        this.bgmChannel = bgm.play(0,Number.MAX_VALUE);
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
