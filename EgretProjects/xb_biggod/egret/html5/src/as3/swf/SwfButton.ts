/**
 * Created by chenpeng on 2015/6/2.
 */
module egret
{
    /*
     * flash.display.SimpleButton 映射为 SwfButton
     * 当前SwfButton不从as3.InteractiveObject继承，在flash中4个状态的实现原理和这里不一样。
    */
    export class SwfButton extends egret.Sprite
    {
        public static STATE_UP:string = "up";
        //public static STATE_OVER:string = "over";
        public static STATE_DOWN:string = "down";
        //public static STATE_HIT:string = "hit";

        //资源定义id
        public defId:number;

        private $enabled:boolean;
        public get enabled():boolean{
            return this.$enabled;
        }
        public set enabled(value:boolean){
            this.touchChildren = value;
            this.touchEnabled = value;
            this.$enabled = value;
        }

        private $instanceName:string;
        public get instanceName():string
        {
            return this.$instanceName;
        }
        public set instanceName(value:string)
        {
            this.name = value;
            this.$instanceName = value;
        }

        public conf:egret.Resconfig;// 配置的引用
        public define:egret.DefineButton;//按钮的配置

        private $upState:egret.DisplayObject;
        private $overState:egret.DisplayObject;
        private $downState:egret.DisplayObject;
        private $hitTestState:egret.DisplayObject;
        /**
         * 创建一个新的 SimpleButton 实例。可以将表示各种按钮状态的任意或全部显示对象都设置为构造函数中的参数。
         参数:
         upState SimpleButton 弹起状态的初始值。
         overState SimpleButton 经过状态的初始值。
         downState SimpleButton 按下状态的初始值。
         hitTestState SimpleButton hitTest 状态的初始值。
         */
        public constructor(upState:egret.DisplayObject=null, overState:egret.DisplayObject=null, downState:egret.DisplayObject=null, hitTestState:egret.DisplayObject=null){
            super();
            this.$upState = upState;
            this.$overState = overState;
            this.$downState = downState;
            this.$hitTestState = hitTestState;
            this.enabled = true;
            this.$init();
        }

        private $init():void{
            if(null != this.define && null != this.conf){// 如果从配置创建按钮，四个状态从配置生成。conf不能为空
                this.initWithDefine(this.define);
            }else{
                this.initWithDefine(null);
            }
        }

        public initWithDefine(define:DefineButton):void{
            this.define = define;
            this.$addHit();
            this.$addUp();
            //this.$addOver();
            this.$addDown();
            this.$showState(SwfButton.STATE_UP);
        }
        // 添加有效点击区
        private $addHit():void{
            if(null != this.define){
                var hitTestState:egret.Sprite = this.$addStateChildrenFromDefine(this.define.hit);
                //hitTestState.touchChildren = true;
                this.$hitTestState = hitTestState;
            }
            else{
                this.$hitTestState = this.$addStateFromConstructor(this.$hitTestState);
            }
            this.$hitTestState.name = "hitTestState";
            this.$hitTestState.touchEnabled = true;
            this.$hitTestState.alpha = 0.01;
            this.$hitTestState.addEventListener(TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            //this.$hitTestState.addEventListener(TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.$hitTestState.addEventListener(TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.$hitTestState.addEventListener(TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        }
        private onTouchBegin(event:TouchEvent):void{
            //console.log("down");
            this.$showState(SwfButton.STATE_DOWN);
        }
        private onTouchEnd(event:TouchEvent):void{
            //console.log("up")
            this.$showState(SwfButton.STATE_UP);
        }
        private onTouchReleaseOutside(event:TouchEvent):void{
            this.$showState(SwfButton.STATE_UP);
        }
        private onTouchTap(event:TouchEvent):void{
            //console.log("tap");
            this.$showState(SwfButton.STATE_UP);
        }
        private $addUp():void{
            if(null != this.define){
                this.$upState = this.$addStateChildrenFromDefine(this.define.up);
            }
            else{
                this.$upState = this.$addStateFromConstructor(this.$upState);
            }
            this.$upState.alpha = 1;//this.$hitTestState有可能本状态公用，在此重置alpha为1
            this.$upState.name = "upState";
        }
        //private $addOver():void{
        //    if(null != this.define){
        //        this.$overState = this.$addStateChildrenFromDefine(this.define.over);
        //    }else{
        //        this.$overState = this.$addStateFromConstructor(this.$overState);
        //    }
        //    this.$upState.alpha = 1;//this.$hitTestState有可能本状态公用，在此重置alpha为1
        //}
        private $addDown():void{
            if(null != this.define){
                this.$downState = this.$addStateChildrenFromDefine(this.define.down);
            }else{
                this.$downState = this.$addStateFromConstructor(this.$downState);
            }
            this.$downState.alpha = 1;//this.$hitTestState有可能本状态公用，在此重置alpha为1
            this.$downState.name = "downState";
        }
        // 判断并添加状态
        private $addStateFromConstructor(state:egret.DisplayObject):egret.DisplayObject{
            if(null == state){
                state = new egret.Sprite();
            }
            this.addChild(state);
            return state;
        }
        /**
         * 该状态的显示子对象列表，加入到一个容器中并返回
         * @param children
         * @returns {egret.Sprite}
         */
        private $addStateChildrenFromDefine(children:Array<any>):egret.Sprite{
            var con:egret.Sprite = new egret.Sprite();
            con.touchChildren = con.touchEnabled = false;
            this.addChild(con);
            if(null == children || 0 == children.length){
                return con;
            }
            else{
                for(var index:number = 0; index < children.length; index++){
                    var dis:any = children[index];
                    var def:DefineBase = this.conf.resDefs[dis.characterId];
                    if(def){
                        switch (def.t){
                            case Config.RESImage:
                                this.$addImage(<DefineImage>def, con, dis);
                                break;
                            case Config.RESShape:
                                this.$addShape(<DefineShape>def, con, dis);
                                break;
                            case Config.RESSprite:
                                this.$addSprite(<DefineSprite>def, con, dis);
                                break;
                            default :
                                break;
                        }
                    }
                }
            }
            return con;
        }

        private $showState(state:string):void{
            this.$upState.visible = false;
            //this.$overState.visible = false;
            this.$downState.visible = false;
            this.$hitTestState.visible = true;
            this.$hitTestState.alpha = 0.01;
            if(SwfButton.STATE_UP == state){
                this.$upState.visible = true;
                this.$upState.alpha = 1;
            //}else if(SwfButton.STATE_OVER == state){
            //    this.$overState.visible = true;
            //    this.$overState.alpha = 1;
            }else if(SwfButton.STATE_DOWN == state){
                this.$downState.visible = true;
                this.$downState.alpha = 1;
            }else{
                this.$upState.visible = true;
                this.$upState.alpha = 1;
            }
        }

        private $addImage(defImg:DefineImage, parentSP:egret.Sprite, po:any):void{
            var imgDis:egret.SwfSprite = SwfRes.Pool_getByID(this.conf.path, this.conf, defImg.id);
            parentSP.addChild(imgDis);
            S2PUtils.SetMatrixAndColorTransform(imgDis, po);
        }
        private $addShape(shape:DefineShape, parantSP:egret.Sprite, transInfo:TransformInfo):void{
            var shapeContainer:egret.Sprite = new egret.Sprite();
            parantSP.addChild(shapeContainer);
            S2PUtils.SetTransform(shapeContainer, transInfo);// 设置placeobject的放置位置，颜色信息
            //shape png
            if(shape.isexportpng){
                var shapePNG:SwfSprite = <SwfSprite>SwfRes.Pool_getByID(this.conf.path, this.conf, shape.id);
                shapeContainer.addChild(shapePNG);
                // 设置自身的偏移（图形在帧上不是放置在0,0点的）
                shapePNG.x = shape.x;
                shapePNG.y = shape.y;
            }
            //bitmap fill
            if(shape.hasOwnProperty(DefineShape.Dynamic_Fillstyles)){
                var fills:FillStyle[] = <FillStyle[]> (shape[DefineShape.Dynamic_Fillstyles]);
                var length:number = fills.length;
                for(var i:number = 0;i < length;i++){
                    var fillstyle:FillStyle = fills[i];
                    this.$addImage(<DefineImage> (this.conf.resDefs[fillstyle.bitmapId]), shapeContainer, fillstyle);
                }
            }
        }
        private $addSprite(defsp:DefineSprite, parantSP:egret.Sprite, po:PlaceObject):void{
            var mc:egret.SwfMovie = null;
            mc = new egret.SwfMovie(this.conf, "", defsp.id);
            parantSP.addChild(mc);
            // 更新属性
            S2PUtils.SetTransform(mc, po);
        }
    }
}