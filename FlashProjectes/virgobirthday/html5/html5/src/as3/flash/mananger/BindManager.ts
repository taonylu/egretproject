/**
 * Created by huitao on 2015/6/6.
 */
module flash
{
    export class BindManager
    {


        public bindEvent():void
        {
            egret.Event.prototype["clone"] = function():Event
            {
                return new egret.Event(this.type, this.bubbles, this.cancelable);
            }

            egret.Event.prototype["toString"] = function():string
            {
                return "[Event type="+this.type+" bubbles="+this.bubbles +" cancelable="+this.cancelable +"]";
            }

            egret.Event.prototype["formatToString"] = function():string
            {
                return JSON.stringify(this)
            }
        }

        /**
         * 为DisplayObject 绑定属性
         */
        public bindDisplayObject():void
        {
            //注册mouseX、mouseY
            if(!egret.DisplayObject.prototype.hasOwnProperty("mouseX")){
                Object.defineProperty(egret.DisplayObject.prototype, "mouseX", {
                    get: function () {
                        return this.globalToLocal(egret.MainContext.instance.touchContext["lastTouchX"],egret.MainContext.instance.touchContext["lastTouchY"]).x;
                    },
                    enumerable: true,
                    configurable: true
                });
            }

            if(!egret.DisplayObject.prototype.hasOwnProperty("root")){
                Object.defineProperty(egret.DisplayObject.prototype, "root", {
                    get: function () {
                        return this;
                    },
                    enumerable: true,
                    configurable: true
                });
            }


            if(!egret.DisplayObject.prototype.hasOwnProperty("mouseY")){
                Object.defineProperty(egret.DisplayObject.prototype, "mouseY", {
                    get: function () {
                        return this.globalToLocal(egret.MainContext.instance.touchContext["lastTouchX"],egret.MainContext.instance.touchContext["lastTouchY"]).y;
                    },
                    enumerable: true,
                    configurable: true
                });
            }

            if(!egret.DisplayObject.prototype.hasOwnProperty("loaderInfo"))
            {

                Object.defineProperty(egret.DisplayObject.prototype, "loaderInfo", {
                    get: function () {
                        var info:flash.LoaderInfo = new flash.LoaderInfo();
                        info.applicationDomain = new ApplicationDomain();
                        return info;
                    },
                    enumerable: true,
                    configurable: true
                });
            }

        }

        public bindSprite():void
        {

        }

        public bindStage():void
        {

            if(!egret.Stage.prototype.hasOwnProperty("invalidate"))
            {
                egret.Stage.prototype.invalidate = function():void
                {

                }
            }



            if(!egret.Stage.prototype.hasOwnProperty("focus"))
            {
                egret.Stage.prototype.invalidate = function():void
                {

                }
            }


            if(!egret.Stage.prototype.hasOwnProperty("quality"))
            {
                egret.Stage.prototype.invalidate = function():void
                {

                }
            }

            if(!egret.Stage.prototype.hasOwnProperty("isFocusInaccessible"))
            {
                egret.Stage.prototype["isFocusInaccessible"] = function():boolean
                {
                    return false;
                }
            }

            if(!egret.Stage.prototype.hasOwnProperty("allowsFullScreen"))
            {
                Object.defineProperty(egret.Stage.prototype, "allowsFullScreen", {
                    get: function () {
                        //不起作用
                        return false;
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }


        public  bindDisplayObjectContainer():void
        {

            if(!egret.DisplayObjectContainer.prototype.hasOwnProperty("tabChildren"))
            {
                Object.defineProperty(egret.DisplayObjectContainer.prototype, "tabChildren", {
                    get: function () {
                        //不起作用
                        return false;
                    },
                    set: function(b:boolean)
                    {
                        //没有处理
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }

        public bindMatrix():void
        {
            if(!egret.Matrix.prototype.hasOwnProperty("concat"))
            {
                egret.Matrix.prototype["concat"] = function(mtx:egret.Matrix):void
                {
                    this.prepend(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty);
                    //this.append(mtx.a,mtx.b,mtx.c,mtx.d,mtx.tx,mtx.ty);
                }
            }
        }

        public bindBitmap():void
        {
            if(!flash.Bitmap.prototype.hasOwnProperty("pixelSnapping"))
            {
                Object.defineProperty(flash.Bitmap.prototype, "pixelSnapping", {
                    get: function () {
                        //不起作用
                        return false;
                    },
                    set: function(b:boolean)
                    {
                        //没有处理
                    },
                    enumerable: true,
                    configurable: true
                });
            }
        }

        constructor()
        {
            this.bindDisplayObject();
            this.bindMatrix();
            this.bindDisplayObjectContainer();
            this.bindSprite();
            this.bindStage();
        }

    }
}
