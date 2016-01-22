cc._RFpush(module, '79ae3hiP+JAhIKehaWyiKuh', 'ParticleControl1');
// cases\01_graphics\02_particle\ParticleControl1.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        particle: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        // use space to toggle particle
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed: function onKeyPressed(keyCode, event) {
                if (keyCode === cc.KEY.space) {
                    self.toggleParticlePlay();
                }
            }
        }, self);
    },

    toggleParticlePlay: function toggleParticlePlay() {
        var myParticle = this.particle.getComponent(cc.ParticleSystem);
        if (myParticle.isFull()) {
            // check if particle has fully plaed
            myParticle.stopSystem(); // stop particle system
        } else {
                myParticle.resetSystem(); // restart particle system
            }
    }
});

cc._RFpop();