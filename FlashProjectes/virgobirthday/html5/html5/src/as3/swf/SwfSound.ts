/**
 * Created by chenpeng on 2015/6/11.
 */
module flash
{
    export class SwfSound extends flash.Sound
    {
        public conf:egret.Resconfig;
        public define:egret.DefineSound;

        /**
         * 创建一个新的 Sound 对象。
         * @param stream
         * @param context 不支持
         */
        constructor(stream:egret.URLRequest = null, context:flash.SoundLoaderContext = null){
           super(stream, context);
            this.$init();
        }

        private $init():void{
            if(null == this.conf){
                return;
            }
            else{
                if(null != this.define){
                    this.initWithDefine(this.define);
                }
            }
        }

        public initWithDefine(define:egret.DefineSound):void{
            this.define = define;
            var soundName:string = egret.Config.GetResName(this.define.id, egret.Config.RESSound);
            soundName = this.conf.resNamePrefix + soundName;
            var sound:egret.Sound = RES.getRes(soundName);
            sound.type = egret.Sound.EFFECT;
            this['_sound'] = sound;
        }

    }
}