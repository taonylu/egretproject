/**
 * Created by huitao on 2015/5/8.
 */
var flash;
(function (flash) {
    var Event = (function (_super) {
        __extends(Event, _super);
        function Event(type, bubbles, cancelable) {
            _super.call(this, type, bubbles, cancelable);
        }
        var __egretProto__ = Event.prototype;
        Event.CANCEL = "cancel";
        Event.FULLSCREEN = "fullScreen";
        Event.ID3 = "id3";
        Event.INIT = "init";
        Event.MOUSE_LEAVE = "mouseLeave";
        Event.OPEN = "open";
        Event.SCROLL = "scroll";
        Event.SELECT = "select";
        Event.SOUND_COMPLETE = "soundComplete";
        Event.TAB_CHILDREN_CHANGE = "tabChildrenChange";
        Event.TAB_ENABLED_CHANGE = "tabEnabledChange";
        Event.TAB_INDEX_CHANGE = "tabIndexChange";
        Event.UNLOAD = "unload";
        Event.CONTEXT3D_CREATE = "context3dCreate";
        return Event;
    })(egret.Event);
    flash.Event = Event;
    Event.prototype.__class__ = "flash.Event";
})(flash || (flash = {}));
