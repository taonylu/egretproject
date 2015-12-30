/**
 * Created by chenpeng on 2015/5/8.
 */

module flash {

    export class LoaderContext {
        // 指定在加载对象之前是否应检查有无 URL 策略文件。
        private checkPolicyFile:Boolean = false;

        // 指定要用于 Loader 对象的 ApplicationDomain 对象。
        public  applicationDomain:ApplicationDomain = null;

        // 指定要用于 Loader 对象的 SecurityDomain 对象。
        private securityDomain:SecurityDomain = null;

        public allowLoadBytesCodeExcution:boolean = false;
        public imageDecodingPolicy:string = "";
        public requestedContentParent:egret.DisplayObjectContainer;
        public parameters:Object = null;
        public allowCodeImport:boolean = false;


        constructor(checkPolicyFile:Boolean = false, applicationDomain:ApplicationDomain = null, securityDomain:SecurityDomain = null) {
            this.checkPolicyFile = checkPolicyFile;
            this.applicationDomain = applicationDomain;
            this.securityDomain = securityDomain;
        }

    }


}