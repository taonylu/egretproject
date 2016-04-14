/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public die0: string = "die0_mp3";
    public die1: string = "die1_mp3";
    public die2: string = "die2_mp3";
    public bgm_home: string = "bgm_home_mp3";
    public bgm_game: string = "bgm_game_mp3";
    public gameover: string = "gameover_mp3";
    public coin: string = "coin_mp3";
    public countDown1: string = "1_mp3";
    public countDown2: string = "2_mp3";
    public countDown3: string = "3_mp3";
    public jump0: string = "jump0_mp3";
    public jump1: string = "jump1_mp3";
    public jump2: string = "jump2_mp3";
    public jump3: string = "jump3_mp3";
    public jump4: string = "jump4_mp3";
    private jumpList = [];
    
    private soundList = {};     //声音列表
    private channelList = {};   //声道列表
    
    private bgmChannel:egret.SoundChannel;  //背景音乐声道
    
	public constructor() {
        this.addSound(this.bgm_home);
        this.addSound(this.bgm_game);
        this.addSound(this.gameover);

        this.addSound(this.die0);
        this.addSound(this.die1);
        this.addSound(this.die2);
        
        this.addSound(this.countDown1);
        this.addSound(this.countDown2);
        this.addSound(this.countDown3);
        
        this.addSound(this.coin);
        
        this.addSound(this.jump0);
        this.addSound(this.jump1);
        this.addSound(this.jump2);
        this.addSound(this.jump3);
        this.addSound(this.jump4);
        this.jumpList.push(this.jump0, this.jump1, this.jump2, this.jump3, this.jump4);
	}
	
	public addSound(soundName:string){
        this.soundList[soundName] = RES.getRes(soundName);
	}
	
	//播放声音
	public play(soundName:string, volume:number = 1, loops:number=1){
    	var snd:egret.Sound = this.soundList[soundName];
    	if(snd){
        	this.channelList[soundName] = snd.play(0,loops);
        	(this.channelList[soundName] as egret.SoundChannel).volume = volume;
    	}
	}
	
	public playDie(){
    	var rand = Math.random();
    	if(rand < 0.5){
        	this.play(this.die0);
    	}else{
        	this.play(this.die1);
    	}
	}
	
	public playJump(){
    	this.play(this.jumpList[NumberTool.getRandomInt(0,this.jumpList.length-1)]);
	}
	
	public playCountDown(num:number){
    	if(num == 3){
        	this.play(this.countDown3);
    	}else if(num == 2){
            this.play(this.countDown2);
        } else if(num == 1) {
            this.play(this.countDown1);
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
