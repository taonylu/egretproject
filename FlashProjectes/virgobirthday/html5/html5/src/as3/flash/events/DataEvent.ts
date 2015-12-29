module flash {
    export class DataEvent extends Event {

        public data:string = "";

        // [静态] 定义 data 事件对象的 type 属性值。
        static DATA:string = "data";

        // [静态] 定义 uploadCompleteData 事件对象的 type 属性值。
        static UPLOAD_COMPLETE_DATA : string = "uploadCompleteData"

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            super(type, bubbles, cancelable);
        }
    }
}
