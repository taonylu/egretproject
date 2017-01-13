/**
 * 声音管理类
 * @author chenkai
 * @date 2016/12/26 
 *
 */
class SoundManager extends SingleClass {
    /**允许播放音效*/
    private _allowEffect: boolean = true;
    /**允许播放背景音乐*/
    private _allowBGM: boolean = true;
    /**声音列表*/
    private soundList = {};
    /**背景音乐声道*/
    private bgmChannel: egret.SoundChannel;
	
	/**
	 * 添加声音
	 * @soundName 声音名
	 */
    public addSound(soundName: string) {
        var sound: egret.Sound = RES.getRes(soundName);
        if(sound) {
            this.soundList[soundName] = sound;
        } else {
            console.error("声音不存在:",soundName);
        }
    }
	
	/**
	 * 播放声音
	 * @soundName 声音名
	 * @loop 循环次数
	 */
    public playEffect(soundName: string,loop: number = 1) {
        if(this.allowEffect == false){
            return;
        }
        var sound: egret.Sound = this.soundList[soundName];
        if(sound) {
            sound.type = egret.Sound.EFFECT;
            sound.play(0,loop);
        } else {
            //TODO
        }
    }
	
	/**
	 * 播放背景音乐
	 * @soundName 声音名
	 */
    public playBGM(soundName: string) {
        if(this.allowBGM == false){
            return;
        }
        var sound: egret.Sound = this.soundList[soundName];
        if(sound) {
            sound.type = egret.Sound.MUSIC;
            if(this.bgmChannel == null) {
                this.bgmChannel = sound.play(0,Number.MAX_VALUE);
            }
        }else{
            //TODO
        }
    }
	
	/**
	 * 停止背景音乐
	 */
    public stopBGM() {
        if(this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    }
    
    /**暂停背景音乐*/
    public pauseBGM(){
        if(this.bgmChannel){
            this.bgmChannel.volume = 0;
        }
    }
    
    /**继续背景音乐*/
    public resumeBGM(){
        if(this.bgmChannel){
            this.bgmChannel.volume = 1;
        }
    }
	
    /**是否允许播放音效*/
    public get allowEffect(): boolean {
        return this._allowEffect;
    }
	
    /**是否允许播放音效*/
    public set allowEffect(allow: boolean) {
        this._allowEffect = allow;
    }
	
    /**是否允许播放背景音乐*/
    public get allowBGM(): boolean {
        return this._allowBGM;
    }
	
    /**是否允许播放背景音乐*/
    public set allowBGM(allow: boolean) {
        this._allowBGM = allow;
    }
}

















