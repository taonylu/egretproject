module egret3d {
                
    /**
    * @language zh_CN
    * @class egret3d.Mouse3DManager
    * @classdesc
    * 鼠标事件管理
    */
    export class Mouse3DManager {
        public static left_mouse_over: string = "left_mouse_over" ;
        public static left_mouse_down: string = "left_mouse_down";
        public static left_mouse_up: string = "left_mouse_up";
        public static left_mouse_click: string = "left_mouse_click";

        public static right_mouse_over: string = "right_mouse_over";
        public static right_mouse_down: string = "right_mouse_down";
        public static right_mouse_up: string = "right_mouse_up";
        public static right_mouse_click: string = "right_mouse_click";

        public static middle_mouse_over: string = "middle_mouse_over";
        public static middle_mouse_down: string = "middle_mouse_down";
        public static middle_mouse_up: string = "middle_mouse_up";
        public static middle_mouse_click: string = "middle_mouse_click";

        public static mouse_move: string = "mouse_move";

        public type: string;
        public data: PickResult;

        private _camera: Camera3D;
        private _collect: CollectBase;

        /**
        * @language zh_CN
        * constructor
        * @param camera {Camera3D}
        * @param collect {CollectBase}
        */
        constructor(camera: Camera3D, collect: CollectBase) {

            this._camera = camera;
            this._collect = collect;

            Input.instance.addListenerKeyClick((e: Event)=>this.onMouseClick(e));
            Input.instance.addListenerKeyDown((e: Event) => this.onMouseDown(e));
            Input.instance.addListenerKeyUp((e: Event) => this.onMouseUp(e));
            Input.instance.addListenerMouseMove((e: Event) => this.onMouseMove(e));
        }

        private onMouseClick(e: Event) {

            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.renderList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                if (ret[i].mouseEnable) {
                    event = new Event3D(Event3D.MOUSE_CLICK);
                    event.currentTarget = ret[i];
                    ret[i].dispatchEvent(event);
                }
            }
        }

        private onMouseDown(e: Event) {

            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.renderList);
            var event: Event3D;

            for (var i: number = 0; i < ret.length; i++) {
                if (ret[i].mouseEnable) {
                    event = new Event3D(Event3D.MOUSE_DOWN);
                    event.currentTarget = ret[i]; 
                    ret[i].dispatchEvent(event);
                }

            }
        }

        private onMouseUp(e: Event) {

            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.renderList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                if (ret[i].mouseEnable) {
                    event = new Event3D(Event3D.MOUSE_UP);
                    event.currentTarget = ret[i];
                    ret[i].dispatchEvent(event);
                }
            }
        }

        private onMouseOver(e: Event) {

            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.renderList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                if (ret[i].mouseEnable) {
                    event = new Event3D(Event3D.MOUSE_OVER);
                    event.currentTarget = ret[i];
                    ret[i].dispatchEvent(event);
                }
            }
        }
        private onMouseOut(e: Event) {

            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.renderList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                if (ret[i].mouseEnable) {
                    event = new Event3D(Event3D.MOUSE_OUT);
                    event.currentTarget = ret[i];
                    ret[i].dispatchEvent(event);
                }
            }
        }

        private onMouseMove(e: Event) {

            var ret: Array<Object3D> = Picker.pickObject3DList(this._camera, this._collect.renderList);
            var event: Event3D;
            for (var i: number = 0; i < ret.length; i++) {
                if (ret[i].mouseEnable) {
                    event = new Event3D(Event3D.MOUSE_MOVE);
                    event.currentTarget = ret[i];
                    ret[i].dispatchEvent(event);
                }
            }
        }
    }
} 