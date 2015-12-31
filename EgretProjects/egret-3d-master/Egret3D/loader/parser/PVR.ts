module egret3d {

    /**
     * @language zh_CN
     * @class egret3d.PVR
     * @classdesc
     * PVR  object
     */
    export class PVR{

        public mipmaps:Array<MipmapData>;
        public width:number;
        public height:number;
        public format:number;
        public mipmapCount:number;
        public isCubemap:boolean;

        constructor() {

        }
    }
}
