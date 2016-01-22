cc._RFpush(module, '920c8a5MahAhbCTSvmQvaB+', 'Item');
// cases\02_ui\05_scrollView\Item.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        label: {
            'default': null,
            type: cc.Label
        },
        itemID: 0
    },

    updateItem: function updateItem(tmplId, itemId) {
        this.itemID = itemId;
        this.label.string = 'Tmpl#' + tmplId + ' Item#' + this.itemID;
    }
});

cc._RFpop();