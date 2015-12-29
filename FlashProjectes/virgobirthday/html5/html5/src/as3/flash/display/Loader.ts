/**
 * Created by mengj_000 on 2015/4/27.
 */


module flash
{

        export class Loader extends egret.DisplayObjectContainer
        {
            private $contentLoaderInfo:LoaderInfo = null;

            private $context:LoaderContext = null;


            private $uncaughtErrorEvents:UncaughtErrorEvents;
            public get uncaughtErrorEvents():UncaughtErrorEvents
            {
                return this.$uncaughtErrorEvents;
            }
            public constructor()
            {
                super();
                this.$contentLoaderInfo = new LoaderInfo();
                this.$contentLoaderInfo.addEventListener(egret.Event.COMPLETE,this.loadComplete,this, false, 0);
                this.$uncaughtErrorEvents = new UncaughtErrorEvents();
            }

            public addEventListener_as3(type: string, listener: Function, useCapture?: boolean, priority?: number,weak?:boolean): void
            {
                this.addEventListener(type,listener,null,useCapture,priority);
            }

            public loadComplete(e:egret.Event):void
            {
                this.addChild(this.$contentLoaderInfo.content);
            }

            public get content()
            {
                return this.$contentLoaderInfo.content;
            }

            public get contentLoaderInfo():LoaderInfo
            {
                return this.$contentLoaderInfo;
            }

            public loadBytes(byts:ByteArray, context:LoaderContext = null):void
            {

            }

            public load(req:egret.URLRequest, context:LoaderContext = null):void
            {
                if(req.url.indexOf(".swf") != -1 || req.url.indexOf(".SWF") != -1)
                {
                    if(null == context)
                    {
                        context = new LoaderContext(false, ApplicationDomain.currentDomain);
                    }

                    if(null == context.applicationDomain)
                    {// 默认是加载到当前域中
                        context.applicationDomain = ApplicationDomain.currentDomain;
                    }
                    this.$context = context;
                    this.$contentLoaderInfo.applicationDomain = context.applicationDomain;
                }
                this.$contentLoaderInfo.initWidthLoader(this,req);
            }
            
            public close():void
            {
    
            }
        }

        
}