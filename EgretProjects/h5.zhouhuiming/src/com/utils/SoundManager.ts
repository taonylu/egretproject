/**
 * 声音控制
 * @author 
 *
 */
class SoundManager {
    //声音名
    public phone: string = "phone_mp3";
    public sceneC_bgm: string = "sceneC_bgm_mp3";
    public say: string = "say_mp3";
    
    private soundList = {};     //声音列表
    private sound:egret.Sound;
    private soundChannel:egret.SoundChannel;  //背景音乐声道
    private loops:number = 1;
    
	public constructor() {
        this.soundList[this.phone] = "resource/assets/sound/phone.mp3";
        this.soundList[this.sceneC_bgm] = "resource/assets/sound/sceneC_bgm.mp3";
        this.soundList[this.say] = "resource/assets/sound/say.mp3"
	}

	
    public play(soundName: string,loops: number = 1){
      this.loops = loops;
      this.sound = RES.getRes(soundName);
      if(this.sound  == null) {
          this.sound  = new egret.Sound();
          this.sound .type = egret.Sound.MUSIC;
          this.sound .load(this.soundList[soundName]);
          this.sound .addEventListener(egret.Event.COMPLETE,this.onLoadSound,this);
      } else {
          this.onLoadSound();
      }
	}
	
	private onLoadSound(){
        this.soundChannel = this.sound.play(0,this.loops);
	}
	

	public stop(){
      this.sound.removeEventListener(egret.Event.COMPLETE,this.onLoadSound,this);
      if(this.soundChannel){
          this.soundChannel.stop();
          this.soundChannel = null;
    	}
	}
}
