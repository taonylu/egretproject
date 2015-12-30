/**
 * Created by huitao on 5/6/2015.
 */
module flash {

    export class SoundChannel extends egret.EventDispatcher {
        //[read-only] 左声道的当前幅度（音量），范围从 0（静音）至 1（最大幅度）。 SoundChannel
        private $leftPeak:number;
        public get leftPeak():number {
            return this.$leftPeak;
        }

        private $position:number;
        public get position():number {
            return this.$position;
        }

        private $rightPeak:number;
        public get rightPeak():number {
            return this.$rightPeak;
        }

        /**分配给该声道的 SoundTransform 对象。*/
        private $soundTransform:SoundTransform;

        public get soundTransform():SoundTransform {
            return this.$soundTransform;
        }

        public set soundTransform($value:SoundTransform) {
            if (this.$sound != null) {
                this.$sound.setVolume($value.volume)
            }
        }

        private $sound:egret.Sound;

        constructor($s?:egret.Sound) {
            super();
            this.$sound = $s;
        }

        private scompleteFun(e:egret.Event):void {
            this.dispatchEvent(e);
        }


        public stop():void {
            if (this.$sound != null) {
                this.$sound.pause();
            }
        }


    }


}