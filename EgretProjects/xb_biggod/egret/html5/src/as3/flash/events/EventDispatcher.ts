/**
 * Created by huitao on 2015/5/14.
 */
module flash {
    export class EventDispatcher extends egret.HashObject implements IEventDispatcher {

        private $eventTarget:any = null;
        public $eventsMap:Object = null;
        public $captureEventsMap:Object = null;

        public constructor(target:IEventDispatcher = null) {
            super();
            this.$eventsMap = {};
            this.$captureEventsMap = {};

            if (target) {
                this.$eventTarget = target;
            }
            else {
                this.$eventTarget = this;
            }
        }

        public addEventListener(type:string, listener:Function, useCapture:boolean = false, priority:number = 0):void {
            if (typeof useCapture === "undefined") {
                useCapture = false;
            }
            if (typeof priority === "undefined") {
                priority = 0;
            }
            var eventMap:Object;
            if (useCapture) {
                eventMap = this.$captureEventsMap;
            }
            else {
                eventMap = this.$eventsMap;
            }
            var list:Array<any> = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            this._insertEventBin(list, listener, priority);
        }

        /**
         * 在一个事件列表中按优先级插入事件对象
         */
        public _insertEventBin(list:Array<any>, listener:Function, priority:number, display = undefined):boolean {
            var insertIndex:number = -1;
            var length:number = list.length;
            for (var i:number = 0; i < length; i++) {
                var bin:any = list[i];
                if (bin.listener["function"] == listener["function"] && bin.listener["owner"] == listener["owner"] && bin.display == display) {
                    return false;
                }
                if (insertIndex == -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            var eventBin:any = {listener: listener, priority: priority};
            if (display) {
                eventBin.display = display;
            }
            if (insertIndex != -1) {
                list.splice(insertIndex, 0, eventBin);
            }
            else {
                list.push(eventBin);
            }
            return true;
        }

        public removeEventListener(type:string, listener:Function, useCapture:boolean = false):void {

            var eventMap:Object = useCapture ? this.$captureEventsMap : this.$eventsMap;
            if (!eventMap)
                return;
            var list:Array<any> = eventMap[type];
            if (!list) {
                return;
            }
            this._removeEventBin(list, listener);
            if (list.length == 0) {
                delete eventMap[type];
            }
        }

        public _removeEventBin(list:Array<any>, listener:Function, display = undefined, fromIdx:number = 0):boolean {
            var length:number = list.length;
            for (var i:number = fromIdx; i < length; i++) {
                var bin:any = list[i];
                if (bin.listener["function"] == listener["function"] && bin.listener["owner"] == listener["owner"] && bin.display == display) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        }

        public hasEventListener(type:string):boolean {
            return !!(this.$eventsMap && this.$eventsMap[type] ||
            this.$captureEventsMap && this.$captureEventsMap[type]);
        }

        public willTrigger(type:string):boolean {
            return this.hasEventListener(type);
        }

        public dispatchEvent(event:Event):boolean {
            event._reset();
            event._target = this.$eventTarget;
            event._currentTarget = this.$eventTarget;
            if (this.$eventTarget instanceof egret.DisplayObject) {
                return (<egret.DisplayObject>this.$eventTarget).dispatchEvent(event);
            } else {
                return this._notifyListener(event);
            }
        }

        public _notifyListener(event:Event):boolean {
            var eventMap:Object = event._eventPhase == 1 ? this.$captureEventsMap : this.$eventsMap;
            if (!eventMap) {
                return true;
            }
            var list:Array<any> = eventMap[event._type];

            if (!list) {
                return true;
            }
            var length:number = list.length;
            if (length == 0) {
                return true;
            }
            list = list.concat();
            for (var i:number = 0; i < length; i++) {
                var eventBin:any = list[i];
                eventBin.listener(event);
                if (event._isPropagationImmediateStopped) {
                    break;
                }
            }
            return !event._isDefaultPrevented;
        }
    }
}