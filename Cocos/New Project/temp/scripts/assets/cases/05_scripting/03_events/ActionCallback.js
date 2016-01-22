cc._RFpush(module, '2881e6K1edLBbgvc+6/YN7o', 'ActionCallback');
// cases\05_scripting\03_events\ActionCallback.js

'use strict';

cc.Class({
    'extends': cc.Component,

    // use this for initialization
    onLoad: function onLoad() {
        var touchEvent = this.getComponent('TouchEvent');
        var mouseEvent = this.getComponent('MouseEvent');
        var event = touchEvent || mouseEvent;
        event._callback = function () {
            this.node.runAction(cc.sequence(cc.scaleTo(0.5, 2, 1), cc.scaleTo(0.25, 1, 1)));
        };
    }
});

cc._RFpop();