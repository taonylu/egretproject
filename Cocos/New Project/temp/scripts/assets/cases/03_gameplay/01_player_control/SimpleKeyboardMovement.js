cc._RFpush(module, 'c3f971iyCdIh6xdaO49XP0F', 'SimpleKeyboardMovement');
// cases\03_gameplay\01_player_control\SimpleKeyboardMovement.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        sheep: {
            'default': null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;

        // set initial move direction
        self.turnRight();

        //add keyboard input listener to call turnLeft and turnRight
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                switch (keyCode) {
                    case cc.KEY.a:
                    case cc.KEY.left:
                        console.log('turn left');
                        self.turnLeft();
                        break;
                    case cc.KEY.d:
                    case cc.KEY.right:
                        console.log('turn right');
                        self.turnRight();
                        break;
                }
            }
        }, self.node);
    },

    // called every frame
    update: function update(dt) {
        this.sheep.x += this.speed * dt;
    },

    turnLeft: function turnLeft() {
        this.speed = -100;
        this.sheep.scaleX = 1;
    },

    turnRight: function turnRight() {
        this.speed = 100;
        this.sheep.scaleX = -1;
    }
});

cc._RFpop();