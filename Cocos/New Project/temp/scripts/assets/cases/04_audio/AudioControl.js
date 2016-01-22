cc._RFpush(module, '8c95bT2M3hBPIdRDVftiUQG', 'AudioControl');
// cases\04_audio\AudioControl.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        musicPlayer: {
            "default": null,
            type: cc.AudioSource
        },
        dingClip: {
            "default": null,
            url: cc.AudioClip
        },
        cheeringClip: {
            "default": null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        // play audioSource
        self.musicPlayer.play();

        // play ding in 1 sec, play cheering in 2 sec
        setTimeout(function () {
            cc.audioEngine.playEffect(self.dingClip, false);
            setTimeout(function () {
                cc.audioEngine.playEffect(self.cheeringClip, false);
            }, 2000);
        }, 1000);
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();