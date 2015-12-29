/**
 * Created by huitao on 2015/5/14.
 */
var flash;
(function (flash) {
    var EventDispatcher = (function (_super) {
        __extends(EventDispatcher, _super);
        function EventDispatcher(target) {
            if (target === void 0) { target = null; }
            _super.call(this);
            this.$eventTarget = null;
            this.$eventsMap = null;
            this.$captureEventsMap = null;
            this.$eventsMap = {};
            this.$captureEventsMap = {};
            if (target) {
                this.$eventTarget = target;
            }
            else {
                this.$eventTarget = this;
            }
        }
        var __egretProto__ = EventDispatcher.prototype;
        __egretProto__.addEventListener = function (type, listener, useCapture, priority) {
            if (useCapture === void 0) { useCapture = false; }
            if (priority === void 0) { priority = 0; }
            if (typeof useCapture === "undefined") {
                useCapture = false;
            }
            if (typeof priority === "undefined") {
                priority = 0;
            }
            var eventMap;
            if (useCapture) {
                eventMap = this.$captureEventsMap;
            }
            else {
                eventMap = this.$eventsMap;
            }
            var list = eventMap[type];
            if (!list) {
                list = eventMap[type] = [];
            }
            this._insertEventBin(list, listener, priority);
        };
        /**
         * 在一个事件列表中按优先级插入事件对象
         */
        __egretProto__._insertEventBin = function (list, listener, priority, display) {
            if (display === void 0) { display = undefined; }
            var insertIndex = -1;
            var length = list.length;
            for (var i = 0; i < length; i++) {
                var bin = list[i];
                if (bin.listener["function"] == listener["function"] && bin.listener["owner"] == listener["owner"] && bin.display == display) {
                    return false;
                }
                if (insertIndex == -1 && bin.priority < priority) {
                    insertIndex = i;
                }
            }
            var eventBin = { listener: listener, priority: priority };
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
        };
        __egretProto__.removeEventListener = function (type, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            var eventMap = useCapture ? this.$captureEventsMap : this.$eventsMap;
            if (!eventMap)
                return;
            var list = eventMap[type];
            if (!list) {
                return;
            }
            this._removeEventBin(list, listener);
            if (list.length == 0) {
                delete eventMap[type];
            }
        };
        __egretProto__._removeEventBin = function (list, listener, display, fromIdx) {
            if (display === void 0) { display = undefined; }
            if (fromIdx === void 0) { fromIdx = 0; }
            var length = list.length;
            for (var i = fromIdx; i < length; i++) {
                var bin = list[i];
                if (bin.listener["function"] == listener["function"] && bin.listener["owner"] == listener["owner"] && bin.display == display) {
                    list.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
        __egretProto__.hasEventListener = function (type) {
            return !!(this.$eventsMap && this.$eventsMap[type] || this.$captureEventsMap && this.$captureEventsMap[type]);
        };
        __egretProto__.willTrigger = function (type) {
            return this.hasEventListener(type);
        };
        __egretProto__.dispatchEvent = function (event) {
            event._reset();
            event._target = this.$eventTarget;
            event._currentTarget = this.$eventTarget;
            if (this.$eventTarget instanceof egret.DisplayObject) {
                return this.$eventTarget.dispatchEvent(event);
            }
            else {
                return this._notifyListener(event);
            }
        };
        __egretProto__._notifyListener = function (event) {
            var eventMap = event._eventPhase == 1 ? this.$captureEventsMap : this.$eventsMap;
            if (!eventMap) {
                return true;
            }
            var list = eventMap[event._type];
            if (!list) {
                return true;
            }
            var length = list.length;
            if (length == 0) {
                return true;
            }
            list = list.concat();
            for (var i = 0; i < length; i++) {
                var eventBin = list[i];
                eventBin.listener(event);
                if (event._isPropagationImmediateStopped) {
                    break;
                }
            }
            return !event._isDefaultPrevented;
        };
        return EventDispatcher;
    })(egret.HashObject);
    flash.EventDispatcher = EventDispatcher;
    EventDispatcher.prototype.__class__ = "flash.EventDispatcher";
})(flash || (flash = {}));
