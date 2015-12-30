/**
 * Created by huitao on 5/6/2015.
 */

module flash {

    export class Sound extends egret.EventDispatcher {
        private $sound:egret.Sound;

        private $bytesLoaded:number;
        public get bytesLoaded():number {
            return this.$bytesLoaded;
        }

        //[read-only] 返回此声音对象中总的字节数。 Sound
        private $bytesTotal:number;
        public get bytesTotal():number {
            return this.$bytesTotal;
        }

        //            [read-only] 提供对作为 MP3 文件一部分的元数据的访问。 Sound
        private $id3:ID3Info;
        public get id3():ID3Info {
            return this.$id3;
        }

        //[read-only] 返回外部 MP3 文件的缓冲状态。  Sound
        private $isBuffering:boolean;

        public isBuffering():boolean {
            return this.$isBuffering;
        }

        //[read-only] 当前声音的长度（以毫秒为单位）。 Sound
        private $length:number;
        public get length():number {
            return this.$length;
        }

        //[read-only] 从中加载此声音的 URL。
        private $url:string;
        public get url():string {
            return this.$url;
        }

        private $loader:egret.URLLoader;

        constructor(stream:egret.URLRequest = null, context:SoundLoaderContext = null) {
            super();
            this.musicLoad(stream);
        }

        //音乐文件
        private _mdata:any;

        private musicLoad(stream:egret.URLRequest = null):void {
            if (stream != null) {
                this.$url = stream.url;
                var res:RES.ResourceItem = new RES.ResourceItem(this.$url, this.$url, RES.ResourceItem.TYPE_SOUND);
                RES.getResByUrl(this.$url, this.completeFun, this, RES.ResourceItem.TYPE_SOUND);
            }
        }

        private id3Fun(e:egret.Event):void {

        }

        private completeFun(data:any, url:string):void {
            this.$sound = data;
            var sevent:egret.Event = new egret.Event(egret.Event.COMPLETE, false, false);
            sevent.data = data;
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }

        private progressFun(e:egret.ProgressEvent):void {
            this.$bytesLoaded = e.bytesLoaded;
            this.$bytesTotal = e.bytesTotal;
            this.dispatchEvent(e)
        }

        public close():void {
            this.$sound.pause();
        }

        /**
         * 启动从指定 URL 加载外部 MP3 文件的过程。 Sound
         * @param stream
         * @param context
         */
        public load(stream:egret.URLRequest, context:SoundLoaderContext = null):void {
            this.musicLoad(stream);
        }

        /**
         * 生成一个新的 SoundChannel 对象来回放该声音。
         * @param startTime
         * @param loops
         * @param sndTransform
         */
        public play(startTime:number = 0, loops:number = 0, sndTransform:SoundTransform = null):SoundChannel {
            var sc:SoundChannel = new SoundChannel(this.$sound);
            if (sndTransform == null)
                sndTransform = new SoundTransform(0.6, 0);
            sc.soundTransform = sndTransform;
            var lp:boolean = loops > 0 ? true : false;
            this.$sound.play(lp);
            if (sndTransform == null) {
                this.$sound.setVolume(1);
            }
            else {
                this.$sound.setVolume(sndTransform.volume);
            }
            return sc;
        }

    }


}