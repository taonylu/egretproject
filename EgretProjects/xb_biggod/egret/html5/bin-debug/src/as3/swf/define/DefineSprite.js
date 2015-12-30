var egret;
(function (egret) {
    var DefineSprite = (function (_super) {
        __extends(DefineSprite, _super);
        function DefineSprite(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this);
            /**
             * FrameCount
             */
            this.f = 1;
            /**
             * 帧数据，每一帧是一个数组Vector.<PlaceObject>，这种数据格式支持嵌套
             */
            this.fd = [];
            this.createFromObject(obj);
            //this.t = Config.RESSprite;
        }
        var __egretProto__ = DefineSprite.prototype;
        //public saveKey(key:string, keyobj:any):boolean{
        //	if(key == "fd"){
        //		if(null != keyobj){
        //			var keyobjarr:any[] = <any[]> keyobj;
        //			for(var i:number=0;i<keyobjarr.length;i++){
        //				var vec:Array<PlaceObject> = new Array<PlaceObject>();
        //				this.fd[i] = vec;
        //				var vecarr:any[] = <any[]> (keyobjarr[i]);
        //				for(var j:number=0;j<vecarr.length;j++){
        //					var po:PlaceObject = new PlaceObject(vecarr[j]);
        //					vec.push(po);
        //				}
        //			}
        //		}
        //		return true;
        //	}
        //	return false;
        //}
        /**
         * 从帧中取出实例名为name的对象
         * @param frame
         * @param name
         * @return
         *
         */
        __egretProto__.getObjByInstanceName = function (frame, name) {
            var frameObjs = this.fd[frame];
            var length = frameObjs.length;
            for (var i = 0; i < length; i++) {
                var po = frameObjs[i];
                if (po.instanceName == name) {
                    return po;
                }
            }
            return null;
        };
        __egretProto__.checkLegal = function () {
            if (this.f != this.fd.length) {
                return false;
            }
            return true;
        };
        __egretProto__.createFromObject = function (obj) {
            _super.prototype.createFromObject.call(this, obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.fromSlimData(obj);
            }
        };
        __egretProto__.fromSlimData = function (obj) {
            this.f = obj[2];
            this.fd = [];
            var slimFD = obj[3];
            if (slimFD && slimFD.length > 0) {
                for (var i = 0; i < slimFD.length; i++) {
                    var pos = slimFD[i];
                    var vec = [];
                    this.fd[i] = vec;
                    for (var j = 0; j < pos.length; j++) {
                        var po = new egret.PlaceObject(pos[j]);
                        vec.push(po);
                    }
                }
            }
        };
        return DefineSprite;
    })(egret.DefineBase);
    egret.DefineSprite = DefineSprite;
    DefineSprite.prototype.__class__ = "egret.DefineSprite";
})(egret || (egret = {}));
