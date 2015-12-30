/**
 * Created by huitao on 2015/5/12.
 */
var flash;
(function (flash) {
    var MouseEvent = (function (_super) {
        __extends(MouseEvent, _super);
        function MouseEvent(type, bubbles, cancelable, touchPointID, stageX, stageY, ctrlKey, altKey, shiftKey, touchDown) {
            if (bubbles === void 0) { bubbles = true; }
            if (cancelable === void 0) { cancelable = true; }
            if (touchPointID === void 0) { touchPointID = 0; }
            if (stageX === void 0) { stageX = 0; }
            if (stageY === void 0) { stageY = 0; }
            if (ctrlKey === void 0) { ctrlKey = false; }
            if (altKey === void 0) { altKey = false; }
            if (shiftKey === void 0) { shiftKey = false; }
            if (touchDown === void 0) { touchDown = false; }
            _super.call(this, type, bubbles, cancelable);
            this.touchPointID = touchPointID;
            this._stageX = stageX;
            this._stageY = stageY;
            this.ctrlKey = ctrlKey;
            this.altKey = altKey;
            this.touchDown = touchDown;
        }
        var __egretProto__ = MouseEvent.prototype;
        __egretProto__.updateAfterEvent = function () {
        };
        /**不建议使用*/
        MouseEvent.DOUBLE_CLICK = "doubleClick";
        /**不建议使用*/
        MouseEvent.MOUSE_OVER = "mouseOver";
        /**不建议使用*/
        MouseEvent.MOUSE_WHEEL = "mouseWheel";
        /**不建议使用*/
        MouseEvent.ROLL_OUT = "rollOut";
        /**不建议使用*/
        MouseEvent.ROLL_OVER = "rollOver";
        return MouseEvent;
    })(egret.TouchEvent);
    flash.MouseEvent = MouseEvent;
    MouseEvent.prototype.__class__ = "flash.MouseEvent";
})(flash || (flash = {}));
