/**
 * Created by huitao on 2015/5/14.
 */
module flash {

    export class URLStream extends URLLoader {
        //URLLoaderDataFormat.BINARY


        constructor(req?:URLRequest) {
            super(req);

            //以二进制方式取出文件
            this.dataFormat = egret.URLLoaderDataFormat.BINARY;
        }


    }


}
