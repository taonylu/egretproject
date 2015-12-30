/**
 * Created by mengj_000 on 2015/4/27.
 */


module flash
{
    export class LoaderInfo extends egret.EventDispatcher
    {
        //public actionScriptVersion : number;
        private $applicationDomain : ApplicationDomain;
        //public bytes : egret.ByteArray;
        //public bytesLoaded : number;
        //public bytesTotal : number;
        //public childAllowsParent : boolean;
        //public childSandboxBridge : Object
        private $content : egret.DisplayObject;
        //public contentType : String
        //public frameRate : Number
        //public height : int
        //public isURLInaccessible : Boolean
        public loader : Loader;
        //public loaderURL : String
        //public parameters : Object
        //public parentAllowsChild : Boolean
        //public parentSandboxBridge : Object
        //public sameDomain : Boolean
        //public sharedEvents : EventDispatcher
        //public swfVersion : uint
        //public uncaughtErrorEvents : UncaughtErrorEvents
        //public url : String
        //public width : int
        private $urlLoader:egret.URLLoader;

        public constructor()
        {
            super();
        }

        public get applicationDomain()
        {
            return this.$applicationDomain;
        }

        public set applicationDomain(domain:ApplicationDomain)
        {
            this.$applicationDomain = domain;
        }

        public get content():egret.DisplayObject
        {
            return this.$content;
        }

        public initWidthLoader(loader:Loader,req:egret.URLRequest)
        {
            this.loader = loader;

            var url = req.url;
            url = url.split("?")[0];
            var arr:Array<string> = url.split(".");
            var end = arr[arr.length - 1];
            if(end == "png" || end == "jpg" || end == "PNG" || end == "JPG") {
                if(this.$urlLoader == null)
                {
                    this.$urlLoader = new egret.URLLoader();
                    this.$urlLoader.addEventListener(egret.Event.COMPLETE,this.$onLoadComplete,this);
                }
                this.$urlLoader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
                this.$urlLoader.load(req);
            }
            else if(end == "swf" || end == "SWF")
            {
               //this.$loadSWF(url.split(".")[0]);//不能处理scale.9.in.Flash.IDE.swf这种情况
               var pathAndName:string = url.substring(0,url.length-4);
               this.$loadSWF(pathAndName);
            }
        }

        private $onLoadComplete(e:egret.Event)
        {
            var txt:egret.Texture = this.$urlLoader.data;
            var bmd:BitmapData = new BitmapData(txt._bitmapWidth,txt._bitmapHeight,false,0,txt);
            this.$content = new Bitmap(bmd);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }

        private $loadGroupName:string = "";
        private $loadSWF(swfName:string):void
        {
            //swfName:swf加载路径，与导出端的方式保持一致。支持中文名非法字符等
            swfName = encodeURI(swfName);
            var reg:RegExp = /\./g;
            swfName = swfName.replace(reg, "_");//替换scale.9.in.Flash.IDE为scale_9_in_Flash_IDE
            swfName = "swfres/" + swfName;
            this.$loadGroupName = swfName.split("/").join("_") + "_";
            var resJsonURL:string = "resource/" + swfName + "/res.json";
            RES.getResByUrl(resJsonURL, this.$getResComplete, this, RES.ResourceItem.TYPE_JSON);
        }
        private $getResComplete(p:any){
            RES.parseConfig(p, "");//直接读取资源配置
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.$onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.$onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.$onResourceProgress, this);
            //console.log(this.$loadGroupName);
            RES.loadGroup(this.$loadGroupName);
        }
        private $onResourceLoadComplete(event: RES.ResourceEvent): void {
            // console.log("loaded group:" + event.groupName);
            if (event.groupName == this.$loadGroupName) {
                //必须在接收到本组加载成功后移除，不能放在if外面
                this.$removeEvents();
                RES.getResAsync(event.groupName+"config", this.$onLoadConfig, this);
            }
        }

        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private $onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //Ignore the loading failed projects
            this.$onResourceLoadComplete(event);
        }

        /**
         * preload资源组加载进度
         * Loading process of preload resource group
         */
        private $onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == this.$loadGroupName) {
                //console.log("$onResourceProgress  ", event.itemsLoaded, "  " + event.itemsTotal);
                var progressEvent:egret.ProgressEvent = new egret.ProgressEvent(egret.ProgressEvent.PROGRESS, true, true, event.itemsLoaded, event.itemsTotal);
                this.dispatchEvent(progressEvent);
            }
        }

        private $removeEvents():void
        {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.$onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.$onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.$onResourceProgress, this);
        }

        private $onLoadConfig(obj:any):void {
            var resConfig:egret.Resconfig = new egret.Resconfig(obj);
            if(resConfig.picMerge){
                resConfig.resNamePrefix = resConfig.relativeDir.split("/").join("_") + "pic.";
            }else{
                resConfig.resNamePrefix = resConfig.relativeDir.split("/").join("_");
            }
            resConfig.resModule = resConfig.relativeDir.split("/").join(".");
            //console.log(resConfig);
            if(this.$applicationDomain == ApplicationDomain.currentDomain){
                // 如果加载到主应用程序域中，不需要保存模块名。都加载到同一个模块中。
                this.$applicationDomain.resModule = "";
            }else{
                this.$applicationDomain.resModule = resConfig.resModule;
                this.$applicationDomain['name'] = resConfig.resModule;
            }
            for(var key in resConfig.symbols)
            {
                if(!resConfig.symbols.hasOwnProperty(key)){
                    continue;
                }
                var symbol:egret.SymbolClass = resConfig.symbols[key];
                this.$applicationDomain.defNames.push(symbol.className);
                var def:any = resConfig.resDefs[symbol.id];
                if(null != def) {
                    if (egret.Config.RESSprite == def.t) {
                        var templateStr:string = SwfUtils.symbolTemplate;
                        var clsName:string = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        //var parentClsName:string = "egret.SwfMovie";
                        var reg:RegExp = new RegExp("TemplateClass1", "g");
                        templateStr = templateStr.replace(reg, clsName);

                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else if(egret.Config.RESStage == def.t){//舞台的文档类设置config
                        var clsDefine:any = egret.getDefinitionByName(symbol.className);
                        if(null != clsDefine){
                            clsDefine.prototype.resConfig = resConfig;
                            clsDefine.prototype.symbolName = symbol.className;
                        }
                    }
                    else if (egret.Config.RESImage == def.t) {
                        var templateStr:string = SwfUtils.bitmapDataTemplate;
                        var clsName:string = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        var reg:RegExp = new RegExp("TemplateClass2", "g");
                        templateStr = templateStr.replace(reg, clsName);

                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else if (egret.Config.RESButton == def.t)
                    {
                        var templateStr:string = SwfUtils.buttonTemplate;
                        var clsName:string = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        var reg:RegExp = new RegExp("ButtonTemplate", "g");
                        templateStr = templateStr.replace(reg, clsName);
                        /*reg = new RegExp("egret.SwfMovie", "g");
                        var parentClsName:string = "egret.SwfButton";
                        templateStr = templateStr.replace(reg, parentClsName);*/

                        eval(templateStr);
                        var clsDefinition = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else if (egret.Config.RESSound == def.t)
                    {
                        var templateStr:string = SwfUtils.soundTemplate;
                        var clsName:string = SwfUtils.getDefName(this.$applicationDomain.resModule, symbol.className);
                        var reg:RegExp = new RegExp("SoundTemplate", "g");
                        templateStr = templateStr.replace(reg, clsName);
                        eval(templateStr);
                        var clsDefinition:any = __global[clsName];
                        clsDefinition.resConfig = resConfig;
                        clsDefinition.symbolName = symbol.className;
                    }
                    else
                    {

                    }
                }

            }
            this.$content = new egret.SwfMovie(resConfig, "", 0);//舞台对象;
            //console.log(this.$applicationDomain.defNames);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }

        public addEventListener_as3(type: string, listener: Function, useCapture?: boolean, priority?: number,weak?:boolean): void
        {
            this.addEventListener(type,listener,null,useCapture,priority);
        }

    }
}