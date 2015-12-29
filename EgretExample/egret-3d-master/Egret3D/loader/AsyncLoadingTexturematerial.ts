module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.AsyncLoadingTexturematerial
     * @classdesc
     * AsyncLoadingTexturematerial类 用于纹理的加载
     */
    export class AsyncLoadingTexturematerial {

        private _mat: egret3d.TextureMaterial;
        /**
        * @language zh_CN
        * constructor 
        * @param mat {egret3d.TextureMaterial}
        */
        constructor(mat: egret3d.TextureMaterial) {
            this._mat = mat;
        }

        /**
         * 加载纹理
         * @param texture 
         * @param bump 
         * @param spec 
         */
        public loadTexture(texture: string, bump: string = null, spec: string = null): void {
            if (texture) {
                var textureUrlLoader: egret3d.URLLoader = new egret3d.URLLoader();
                textureUrlLoader.onLoadComplete = (urlLoader: egret3d.URLLoader) => this.__textureComplete(urlLoader);
                //textureUrlLoader.dataformat = BlackSwan.URLLoader.DATAFORMAT_DDS;
                textureUrlLoader.load(texture);
            }

            if (bump) {
                var bumpUrlLoader: egret3d.URLLoader = new egret3d.URLLoader();
                bumpUrlLoader.onLoadComplete = (urlLoader: egret3d.URLLoader) => this.__bumpComplete(urlLoader);
                //bumpUrlLoader.dataformat = BlackSwan.URLLoader.DATAFORMAT_DDS;
                bumpUrlLoader.load(bump);
            }

            if (spec) {
                var specUrlLoader: egret3d.URLLoader = new egret3d.URLLoader();
                specUrlLoader.onLoadComplete = (urlLoader: egret3d.URLLoader) => this.__specComplete(urlLoader);
                //bumpUrlLoader.dataformat = BlackSwan.URLLoader.DATAFORMAT_DDS;
                specUrlLoader.load(spec);
            }
        }

        private __specComplete(e: egret3d.URLLoader) {
            e.data.upload(Egret3DDrive.context3D);
            this._mat.specularTexture = e.data;
        }

        private __textureComplete(e: egret3d.URLLoader) {
            e.data.upload(Egret3DDrive.context3D);
            this._mat.diffuseTexture = e.data;
        }

        private __bumpComplete(e: egret3d.URLLoader) {
            e.data.upload(Egret3DDrive.context3D);
            this._mat.normalTexture = e.data;
        }
    } 
}