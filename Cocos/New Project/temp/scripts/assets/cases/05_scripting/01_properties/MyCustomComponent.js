cc._RFpush(module, '6b8baEpLuxACIMNlIL2vw2W', 'MyCustomComponent');
// cases\05_scripting\01_properties\MyCustomComponent.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        power: 10
    },

    getPower: function getPower() {
        return this.power;
    }
});

cc._RFpop();