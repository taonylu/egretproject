cc._RFpush(module, 'd4114PgybhJ3L/k0N9TkCZI', 'NonSerializedProperties');
// cases\05_scripting\01_properties\NonSerializedProperties.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        mySerializedText: '',
        myNonSerializedText: {
            'default': '',
            visible: false
        },
        label1: {
            'default': null,
            type: cc.Label
        },
        label2: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.myNonSerializedText = 'Can only set value in script';
        this.label1.string = this.mySerializedText;
        this.label2.string = this.myNonSerializedText;
    }
});

cc._RFpop();