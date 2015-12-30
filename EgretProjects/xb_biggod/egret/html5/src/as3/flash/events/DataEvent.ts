module flash {
    export class DataEvent extends Event {

        public data:string = "";

        // [��̬] ���� data �¼������ type ����ֵ��
        static DATA:string = "data";

        // [��̬] ���� uploadCompleteData �¼������ type ����ֵ��
        static UPLOAD_COMPLETE_DATA : string = "uploadCompleteData"

        constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
            super(type, bubbles, cancelable);
        }
    }
}
