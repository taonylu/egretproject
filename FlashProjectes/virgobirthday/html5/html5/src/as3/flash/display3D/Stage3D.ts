module flash {
    export class Stage3D extends egret.EventDispatcher {
        private _context3D:Context3D;
        private _x:number = 0;
        private _y:number = 0;
        private _visible:boolean = true;

        constructor() {
            super();
        }

        public requestContext3D(context3DRenderMode:String = Context3DRenderMode.AUTO, profile:String = Context3DProfile.BASELINE):void {
            egret.setTimeout(this.onCreateContext, this, 1000);
        }

        private onCreateContext():void {
            this._context3D = new Context3D();
            this.dispatchEventWith(flash.Event.CONTEXT3D_CREATE);
        }

        public get x():number {
            return this._x;
        }

        public set x(value:number) {
            this._x = value;
        }

        public get y():number {
            return this._y;
        }

        public set y(value:number) {
            this._y = value;
        }

        public get visible():boolean {
            return this._visible;
        }

        public set visible(value:boolean) {
            this._visible = value;
        }

        public get context3D():Context3D {
            return this._context3D;
        }
    }
}