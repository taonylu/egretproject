/**
 *
 * @author 
 *
 */
class SoundManager {
	
    public static snd_nextLevel: string= "applause_mp3";
    public  static snd_gameOver: string = "gameover_mp3";
    public  static snd_pop: string = "pop_star_mp3";
    

    public static play(name:string): void { 
       // if(egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) { 
            var snd: egret.Sound = RES.getRes(name)
            snd.play();
       // } 
    }
    
}
