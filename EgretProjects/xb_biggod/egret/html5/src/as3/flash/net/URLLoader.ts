/**
 * Created by huitao on 2015/5/11.
 */

module flash {

    export class URLLoader extends egret.URLLoader {

        /**sorry  这个目前还不支持*/
        public bytesLoaded:number = 0;
        public bytesTotal:number = 0;

        constructor(req?:URLRequest) {
            super(req);
        }

    }


}