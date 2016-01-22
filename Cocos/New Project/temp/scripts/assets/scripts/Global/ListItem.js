cc._RFpush(module, 'aa63bWNE8hBf4P4Sp0X2uT0', 'ListItem');
// scripts\Global\ListItem.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        url: ''
    },

    loadExample: function loadExample() {
        if (this.url) {
            cc.find('Menu').getComponent('Menu').loadScene(this.url);
        }
    }
});

cc._RFpop();