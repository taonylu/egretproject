cc._RFpush(module, 'ae6fcR8cuFGRYHW525VJD/k', 'SheepAnimation1');
// cases\03_gameplay\03_animation\SheepAnimation1.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        sheepAnim: {
            'default': null,
            type: cc.Animation
        }
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function onLoad() {
        var anim = this.sheepAnim;
        setTimeout(function () {
            anim.play('sheep_jump');
        }, 2000);
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();