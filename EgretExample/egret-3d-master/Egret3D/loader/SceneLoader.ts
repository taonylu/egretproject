module egret3d {
    /**
     * @language zh_CN
     * @class egret3d.SceneLoader
     * @classdesc
     * SceneLoader类 用于Scene文件加载
     */
    export class SceneLoader extends BaseLoader {

        private _meshList: Array<egret3d.Mesh> = [];
        private _totalNumber: number = 0;

        /**
         * @language zh_CN
         * constructor
         * @param sceneURL {String}
         */
        constructor(sceneURL: string = null) {
            super(LoaderType.LOADER_SCENE_TYPE, sceneURL);
        }

        /**
		 * 场景对象列表;
		 */
        /**
         * @language zh_CN
         * 场景对象列表;
         * @returns Array<egret3d.Mesh>
         */
        public get meshList(): Array<egret3d.Mesh> {
            return this._meshList;
        }

        /**
         * @language zh_CN
         */
        protected onLoad(): void {

            this._meshList = [];

            var emLoader: egret3d.URLLoader = new egret3d.URLLoader();

            emLoader.onLoadComplete = (emLoader: egret3d.URLLoader) => this.onEMFileLoadComplete(this.url, emLoader);

            emLoader.load(this.url + "/config.em");
        }

        private onEMFileLoadComplete(sceneURL: string, emLoader: egret3d.URLLoader) {

            var obj = this.parsingXML(emLoader.data);

            var nodeList: NodeList = obj.getElementsByTagName("mesh");

            this._totalNumber = nodeList.length;

            for (var i: number = 0; i < nodeList.length; i++) {

                var linkURL: string = sceneURL;

                linkURL += "/" + nodeList[i].attributes.getNamedItem("link").value;

                var rotation: egret3d.Vector3D = new egret3d.Vector3D();
                rotation.parsing(nodeList[i].attributes.getNamedItem("rotation").value);

                var scaling: egret3d.Vector3D = new egret3d.Vector3D();
                scaling.parsing(nodeList[i].attributes.getNamedItem("scaling").value);

                var translation: egret3d.Vector3D = new egret3d.Vector3D();
                translation.parsing(nodeList[i].attributes.getNamedItem("translation").value);

                this.loadChild(linkURL, rotation, scaling, translation, sceneURL + "/");
            }
        }

        private loadChild(linkURL: string, rotation: egret3d.Vector3D, scaling: egret3d.Vector3D, translation: egret3d.Vector3D, url: string) {

            var linkLoader: egret3d.URLLoader = new egret3d.URLLoader();

            linkLoader.onLoadComplete = (linkLoader: egret3d.URLLoader) => this.onLoadComplete(linkLoader, rotation, scaling, translation, url);

            linkLoader.load(linkURL);
        }

        private onLoadComplete(linkLoader: egret3d.URLLoader, rotation: egret3d.Vector3D, scaling: egret3d.Vector3D, translation: egret3d.Vector3D, url: string) {

            var geomtry: egret3d.GeometryBase = linkLoader.data;

            var material: egret3d.TextureMaterial = new egret3d.TextureMaterial();

            var asynLoadingMaterial: AsyncLoadingTexturematerial = new AsyncLoadingTexturematerial(material);

            asynLoadingMaterial.loadTexture(
                geomtry.textureFile.length > 0 ? (url + geomtry.textureFile) : null,
                geomtry.textureBump.length > 0 ? (url + geomtry.textureBump) : null,
                geomtry.textureSpecular.length > 0 ? (url + geomtry.textureSpecular) : null
            );

            var mesh: egret3d.Mesh = new egret3d.Mesh(linkLoader.data, material);
            mesh.scaleX = scaling.x;
            mesh.scaleY = scaling.y;
            mesh.scaleZ = scaling.z;
            mesh.rotationX = rotation.x;
            mesh.rotationY = rotation.y;
            mesh.rotationZ = rotation.z;
            mesh.x = translation.x;
            mesh.y = translation.y;
            mesh.z = translation.z;

            this._meshList.push(mesh);

            if (this._meshList.length >= this._totalNumber) {
                this.dispatchEvent(new Event3D(Event3D.EVENT_LOAD_COMPLETE,this));
            }
        }

        private parsingXML(xmlString: string): any {

            var xmlDoc = null;

            if (!window["DOMParser"] && window["ActiveXObject"]) {

                var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];

                for (var i = 0; i < xmlDomVersions.length; i++) {

                    try {
                        xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                        xmlDoc.async = false;
                        xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                        break;
                    } catch (e) {
                    }
                }
            }
            else if (window["DOMParser"] && document.implementation && document.implementation.createDocument) {

                    try {
                        var domParser = new DOMParser();
                        xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
                    } catch (e) {
                }
            }
            else {
                return null;
            }

            return xmlDoc;
        }
    }
}