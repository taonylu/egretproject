cc._RFpush(module, '6a871gy73FDLap3Eje/2h6i', 'Instruction');
// scripts\Global\Instruction.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        text: {
            'default': '',
            type: String,
            multiline: true
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
    onLoad: function onLoad() {},

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();