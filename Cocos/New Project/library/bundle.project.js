require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ActionCallback":[function(require,module,exports){
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
},{}],"AudioControl":[function(require,module,exports){
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
},{}],"ButtonControl1":[function(require,module,exports){
cc._RFpush(module, 'e6dc7dWcxxJuofXB7ergGnC', 'ButtonControl1');
// cases\02_ui\03_button\ButtonControl1.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        buttonLeft: {
            'default': null,
            type: cc.Button
        },
        buttonRight: {
            'default': null,
            type: cc.Button
        },
        display: {
            'default': null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        // You can also register event listener using the method below
        // this.buttonLeft.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnLeftClicked, this);
        // this.buttonRight.getComponent(cc.Button).on(cc.EButton.EVENT_TOUCH_UP, this.onBtnRightClicked, this);
    },

    onBtnLeftClicked: function onBtnLeftClicked() {
        console.log('Left button clicked!');
        this.display.string = 'Left button clicked!';
    },

    onBtnRightClicked: function onBtnRightClicked() {
        console.log('Right button clicked!');
        this.display.string = 'Right button clicked!';
    },

    onBtnInScrollClicked: function onBtnInScrollClicked() {
        console.log('Button in Scrollview clicked!');
        this.display.string = 'Button in ScrollView clicked!';
    }
});

cc._RFpop();
},{}],"CustomEvent":[function(require,module,exports){
cc._RFpush(module, '5cc23aoYcxIKazRFwKWGEI7', 'CustomEvent');
// cases\05_scripting\03_events\CustomEvent.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
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
        var touchEvent = this.getComponent('TouchEvent');

        // Emit CUSTOM_EVENT to its listeners while touch end
        touchEvent._callback = (function () {
            this.node.emit('CUSTOM_EVENT');
        }).bind(this);

        var addButton = cc.find('Canvas/add');
        var cancelButton = cc.find('Canvas/cancel');

        function onCustomEvent(event) {
            this.runAction(cc.sequence(cc.scaleTo(0.5, 2, 1), cc.scaleTo(0.25, 1, 1)));
        }

        this.node.on('CUSTOM_EVENT', onCustomEvent, addButton);
        this.node.on('CUSTOM_EVENT', onCustomEvent, cancelButton);
    }
});

cc._RFpop();
},{}],"Helpers":[function(require,module,exports){
cc._RFpush(module, 'c8640M3ozRErrV/Go3uTknt', 'Helpers');
// scripts\Global\Helpers.js

// Returns a random integer between min (included) and max (excluded)
"use strict";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
  getRandomInt: getRandomInt
};

cc._RFpop();
},{}],"Instruction":[function(require,module,exports){
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
},{}],"Item":[function(require,module,exports){
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
},{}],"ListItem":[function(require,module,exports){
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
},{}],"ListView":[function(require,module,exports){
cc._RFpush(module, 'e6458+hf5VAnIXocmvhggqC', 'ListView');
// cases\02_ui\05_scrollView\ListView.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        itemTemplate: { // item template to instantiate other items
            'default': null,
            type: cc.Node
        },
        scrollView: {
            'default': null,
            type: cc.ScrollView
        },
        spawnCount: 0, // how many items we actually spawn
        totalCount: 0, // how many items we need for the whole list
        spacing: 0, // space between each item
        bufferZone: 0 },

    // when item is away from bufferZone, we relocate it
    // use this for initialization
    onLoad: function onLoad() {
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
        this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.2;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
    },

    initialize: function initialize() {
        this.content.height = this.totalCount * (this.itemTemplate.height + this.spacing) + this.spacing; // get total content height
        for (var i = 0; i < this.spawnCount; ++i) {
            // spawn items, we only need to do this once
            var item = cc.instantiate(this.itemTemplate);
            this.content.addChild(item);
            item.setPosition(0, -item.height * (0.5 + i) - this.spacing * (i + 1));
            item.getComponent('Item').updateItem(i, i);
            this.items.push(item);
        }
    },

    getPositionInView: function getPositionInView(item) {
        // get item position in scrollview's node space
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    },

    update: function update(dt) {
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        var items = this.items;
        var buffer = this.bufferZone;
        var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        var offset = (this.itemTemplate.height + this.spacing) * items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (isDown) {
                // if away from buffer zone and not reaching top of content
                if (viewPos.y < -buffer && items[i].y + offset < 0) {
                    items[i].setPositionY(items[i].y + offset);
                    var item = items[i].getComponent('Item');
                    var itemId = item.itemID - items.length; // update item id
                    item.updateItem(i, itemId);
                }
            } else {
                // if away from buffer zone and not reaching bottom of content
                if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                    items[i].setPositionY(items[i].y - offset);
                    var item = items[i].getComponent('Item');
                    console.log('itemID: ' + item.itemID);
                    var itemId = item.itemID + items.length;
                    item.updateItem(i, itemId);
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    }
});

cc._RFpop();
},{}],"Menu":[function(require,module,exports){
cc._RFpush(module, '04525pyYBlN26SWawaUF3dA', 'Menu');
// scripts\Global\Menu.js

'use strict';

var emptyFunc = function emptyFunc(event) {
    event.stopPropagation();
};

cc.Class({
    'extends': cc.Component,

    properties: {
        text: {
            'default': null,
            type: cc.Label
        },
        readme: {
            'default': null,
            type: cc.Node
        },
        mask: {
            'default': null,
            type: cc.Node
        },
        btnInfo: {
            'default': null,
            type: cc.Button
        },
        btnBack: {
            'default': null,
            type: cc.Button
        }
    },

    onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.node);
        this.currentSceneUrl = 'TestList.fire';
        this.loadInstruction(this.currentSceneUrl);
    },

    backToList: function backToList() {
        this.showReadme(false);
        this.currentSceneUrl = 'TestList.fire';
        cc.director.loadScene('TestList', this.onLoadSceneFinish.bind(this));
    },

    loadScene: function loadScene(url) {
        this.currentSceneUrl = url;
        cc.director.loadScene(url, this.onLoadSceneFinish.bind(this));
    },

    onLoadSceneFinish: function onLoadSceneFinish() {
        var url = this.currentSceneUrl;
        this.loadInstruction(url);
    },

    loadInstruction: function loadInstruction(url) {
        var self = this;
        var mdUrl = url.replace(/\.fire$/, '.md').replace('db://assets/', '');
        cc.loader.loadTxt(cc.url.raw(mdUrl), function (err, txt) {
            if (err) {
                self.text.string = '说明暂缺';
                return;
            }
            self.text.string = txt;
        });
    },

    showReadme: function showReadme(active) {
        if (active === undefined) {
            this.readme.active = !this.readme.active;
        } else {
            this.readme.active = active;
        }
        if (this.readme.active) {
            this.mask.on('touchstart', emptyFunc, this);
        } else {
            this.mask.off('touchstart', emptyFunc, this);
        }
        var labelTxt = this.readme.active ? '关闭说明' : '查看说明';
        cc.find('label', this.btnInfo.node).getComponent(cc.Label).string = labelTxt;
    }
});

cc._RFpop();
},{}],"MonsterPrefab":[function(require,module,exports){
cc._RFpush(module, '8cb4dm2QEpJ7pnaS/cjrvgF', 'MonsterPrefab');
// cases\05_scripting\02_prefab\MonsterPrefab.js

'use strict';

var Helpers = require('Helpers');

cc.Class({
    'extends': cc.Component,

    properties: {
        spriteList: {
            'default': [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
    }

});

cc._RFpop();
},{"Helpers":"Helpers"}],"MouseEvent":[function(require,module,exports){
cc._RFpush(module, '6df0ft1jy5Jg4cQ039jt8jC', 'MouseEvent');
// cases\05_scripting\03_events\MouseEvent.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
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
        this.scroll = 0;
        this.node.opacity = 50;
        this.node.on(cc.Node.EventType.MOUSE_DOWN, function () {
            this.node.opacity = 255;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER, function () {
            this.node.opacity = 160;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE, function () {
            this.node.opacity = 50;
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_UP, function () {
            this.node.opacity = 50;
            if (this._callback) {
                this._callback();
            }
        }, this);
        this.node.on(cc.Node.EventType.MOUSE_WHEEL, function (event) {
            this.scroll += event.getScrollY();
            var h = this.node.height;
            this.scroll = cc.clampf(this.scroll, -2 * h, 0.7 * h);
            this.node.scale = 1 - this.scroll / h;
        }, this);
    }
});

cc._RFpop();
},{}],"MyCustomComponent":[function(require,module,exports){
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
},{}],"NodeGroupControl":[function(require,module,exports){
cc._RFpush(module, 'bd4a2+britAlof0UdMCVB8c', 'NodeGroupControl');
// cases\05_scripting\01_properties\NodeGroupControl.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        nodeList: {
            'default': [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        this.inervalId = setInterval(function () {
            self.toggleNodesVisibility();
        }, 1000);
    },

    onDestroy: function onDestroy() {
        clearInterval(this.inervalId);
    },

    toggleNodesVisibility: function toggleNodesVisibility() {
        console.log('toggle visibility');
        for (var i = 0; i < this.nodeList.length; ++i) {
            this.nodeList[i].active = !this.nodeList[i].active;
        }
    }
});

cc._RFpop();
},{}],"NonSerializedProperties":[function(require,module,exports){
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
},{}],"ParticleControl1":[function(require,module,exports){
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
},{}],"PopulatePrefab":[function(require,module,exports){
cc._RFpush(module, '75518I0ImJHXqWNNGRIOmJg', 'PopulatePrefab');
// cases\05_scripting\02_prefab\PopulatePrefab.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        prefab: {
            "default": null,
            type: cc.Prefab
        },
        canvas: {
            "default": null,
            type: cc.Canvas
        },
        numberToSpawn: 0,
        spawnInterval: 0
    },

    addSpawn: function addSpawn() {
        if (this.spawnCount >= this.numberToSpawn) {
            this.clearRepeater();
            return;
        }
        var monster = cc.instantiate(this.prefab);
        this.canvas.node.addChild(monster);
        monster.position = this.getRandomPosition();
        this.spawnCount++;
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.randomRange = cc.p(300, 200);
        self.spawnCount = 0;
        self.schedule(self.addSpawn, self.spawnInterval);
    },

    getRandomPosition: function getRandomPosition() {
        return cc.p(cc.randomMinus1To1() * this.randomRange.x, cc.randomMinus1To1() * this.randomRange.y);
    },

    clearRepeater: function clearRepeater() {
        this.unschedule(this.addSpawn);
    }
});

cc._RFpop();
},{}],"ProgressBar":[function(require,module,exports){
cc._RFpush(module, '84a43yb9OxBX6HMQxPzHQyz', 'ProgressBar');
// cases\02_ui\04_progressbar\ProgressBar.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        horizontalBar: {
            type: cc.ProgressBar,
            "default": null
        },
        horizontalBarReverse: {
            type: cc.ProgressBar,
            "default": null
        },
        verticalBar: {
            type: cc.ProgressBar,
            "default": null
        },
        verticalBarReverse: {
            type: cc.ProgressBar,
            "default": null
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this._updateProgressBar(this.horizontalBar, dt);
        this._updateProgressBar(this.verticalBar, dt);
        this._updateProgressBar(this.horizontalBarReverse, dt);
        this._updateProgressBar(this.verticalBarReverse, dt);
    },

    _updateProgressBar: function _updateProgressBar(progressBar, dt) {
        var progress = progressBar.progress;
        if (progress < 1.0) {
            progress += dt;
        } else {
            progress = 0;
        }
        progressBar.progress = progress;
    }
});

cc._RFpop();
},{}],"ReferenceTypeProperties":[function(require,module,exports){
cc._RFpush(module, '9341f3fDdBMjJLKh4D+kJJK', 'ReferenceTypeProperties');
// cases\05_scripting\01_properties\ReferenceTypeProperties.js

'use strict';

var MyCustomComponent = require('MyCustomComponent');

cc.Class({
    'extends': cc.Component,

    properties: {
        myNode: {
            'default': null,
            type: cc.Node
        },
        mySprite: {
            'default': null,
            type: cc.Sprite
        },
        myLabel: {
            'default': null,
            type: cc.Label
        },
        myComponent: {
            'default': null,
            type: MyCustomComponent
        },
        mySpriteFrame: {
            'default': null,
            type: cc.SpriteFrame
        },
        myAtlas: {
            'default': null,
            type: cc.SpriteAtlas
        },
        myPrefab: {
            'default': null,
            type: cc.Prefab
        },
        myAudioClip: {
            'default': null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.myLabel.string = this.myComponent.getPower().toString();
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{"MyCustomComponent":"MyCustomComponent"}],"SceneList":[function(require,module,exports){
cc._RFpush(module, '473b8wxs55OsJvoxVdYCzTF', 'SceneList');
// scripts\Global\SceneList.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        itemPrefab: {
            'default': null,
            type: cc.Prefab
        }
    },

    createItem: function createItem(x, y, name, url) {
        var item = cc.instantiate(this.itemPrefab);
        var itemComp = item.getComponent('ListItem');
        var label = itemComp.label;
        label.string = name;

        if (url) {
            itemComp.url = url;
        }

        // item.width = w;
        item.x = x;
        item.y = y;
        this.node.addChild(item);
        return item;
    },

    // use this for initialization
    onLoad: function onLoad() {
        var scenes = cc.game._sceneInfos;
        var list = {};
        if (scenes) {
            var i, j;
            for (i = 0; i < scenes.length; ++i) {
                var url = scenes[i].url;
                var dirname = cc.path.dirname(url).replace('db://assets/cases/', '');
                var scenename = cc.path.basename(url, '.fire');
                if (scenename === 'TestList') continue;

                if (!dirname) dirname = '_root';
                if (!list[dirname]) {
                    list[dirname] = {};
                }
                list[dirname][scenename] = url;
            }

            var dirs = Object.keys(list);
            dirs.sort();
            var y = -50;

            for (i = 0; i < dirs.length; ++i) {
                var dirname = dirs[i];
                var item = this.createItem(100, y, dirname);
                item.getComponent(cc.Widget).left = 60;
                item.getComponent(cc.Sprite).enabled = false;
                y -= 50;
                var scenenames = Object.keys(list[dirname]);
                scenenames.sort();
                for (j = 0; j < scenenames.length; ++j) {
                    var _name = scenenames[j];
                    var url = list[dirname][_name];
                    var _item = this.createItem(200, y, _name, url);
                    _item.getComponent(cc.Widget).left = 120;
                    _item.color = cc.Color.WHITE;
                    y -= 50;
                }
            }
            this.node.height = Math.abs(y) + 30;
        }
    }
});

cc._RFpop();
},{}],"SheepAnimation1":[function(require,module,exports){
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
},{}],"SimpleAction":[function(require,module,exports){
cc._RFpush(module, 'b6067a1+J5FW4G30nmVLU/d', 'SimpleAction');
// cases\03_gameplay\02_actions\SimpleAction.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
        jumper: {
            "default": null,
            type: cc.Node
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.squashAction = cc.scaleTo(0.2, 1, 0.6);
        this.stretchAction = cc.scaleTo(0.2, 1, 1.2);
        this.scaleBackAction = cc.scaleTo(0.1, 1, 1);
        this.moveUpAction = cc.moveBy(1, cc.p(0, 200)).easing(cc.easeCubicActionOut());
        this.moveDownAction = cc.moveBy(1, cc.p(0, -200)).easing(cc.easeCubicActionIn());
        var seq = cc.sequence(this.squashAction, this.stretchAction, this.moveUpAction, this.scaleBackAction, this.moveDownAction, this.squashAction, this.scaleBackAction);
        // this is a temp api which will be combined to cc.Node
        this.jumper.runAction(seq);
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"SimpleKeyboardMovement":[function(require,module,exports){
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
},{}],"SpriteFollowTouch":[function(require,module,exports){
cc._RFpush(module, '90aed86Xu1DZoaevFdcthY3', 'SpriteFollowTouch');
// cases\03_gameplay\01_player_control\SpriteFollowTouch.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        touchLocationDisplay: {
            'default': null,
            type: cc.Label
        },
        follower: {
            'default': null,
            type: cc.Node
        },
        followSpeed: 0
    },

    // use this for initialization
    onLoad: function onLoad() {
        var self = this;
        self.moveToPos = cc.p(0, 0);
        self.isMoving = false;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function onTouchBegan(touch, event) {
                var touchLoc = touch.getLocation();
                self.isMoving = true;
                self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
                return true; // don't capture event
            },
            onTouchMoved: function onTouchMoved(touch, event) {
                var touchLoc = touch.getLocation();
                self.touchLocationDisplay.string = 'touch (' + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
                self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            },
            onTouchEnded: function onTouchEnded(touch, event) {
                self.isMoving = false; // when touch ended, stop moving
            }
        }, self.node);
    },

    // called every frame
    update: function update(dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        // get move direction
        var direction = cc.pNormalize(cc.pSub(this.moveToPos, oldPos));
        // multiply direction with distance to get new position
        var newPos = cc.pAdd(oldPos, cc.pMult(direction, this.followSpeed * dt));
        // set new position
        this.follower.setPosition(newPos);
    }
});

cc._RFpop();
},{}],"TouchDragger":[function(require,module,exports){
cc._RFpush(module, '95021X5KjxP369OONe316sH', 'TouchDragger');
// cases\05_scripting\03_events\TouchDragger.js

"use strict";

var TouchDragger = cc.Class({
    "extends": cc.Component,

    properties: {
        propagate: {
            "default": false
        }
    },

    // ...
    // use this for initialization
    onLoad: function onLoad() {
        this.node.opacity = 160;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.opacity = 255;
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            this.opacity = 255;
            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
            if (this.getComponent(TouchDragger).propagate) event.stopPropagation();
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.opacity = 160;
        }, this.node);
    }
});

cc._RFpop();
},{}],"TouchEvent":[function(require,module,exports){
cc._RFpush(module, 'a14bfaD+gRJKrTVjKwitc53', 'TouchEvent');
// cases\05_scripting\03_events\TouchEvent.js

"use strict";

cc.Class({
    "extends": cc.Component,

    properties: {
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

    _callback: null,

    // use this for initialization
    onLoad: function onLoad() {
        this.node.opacity = 100;
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.node.opacity = 255;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.node.opacity = 100;
            if (this._callback) {
                this._callback();
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.node.opacity = 100;
        }, this);
    }
});

cc._RFpop();
},{}],"ValueTypeProperties":[function(require,module,exports){
cc._RFpush(module, 'd9bf6bFb+tF779stLEmjzTV', 'ValueTypeProperties');
// cases\05_scripting\01_properties\ValueTypeProperties.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        // number
        myNumber: {
            'default': 0,
            type: Number
        },
        // string
        myString: {
            'default': 'default text',
            type: String
        },
        myVec2: {
            'default': cc.Vec2.ZERO,
            type: cc.Vec2
        },
        myColor: {
            'default': cc.Color.WHITE,
            type: cc.Color
        },
        myOtherNumber: 0,
        myOtherString: 'no type definition',
        myOtherVec2: cc.Vec2.ONE,
        myOtherColor: cc.Color.BLACK
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{}],"scheduleCallbacks":[function(require,module,exports){
cc._RFpush(module, '930deImxoZIkp6ugjMU5ULW', 'scheduleCallbacks');
// cases\05_scripting\04_scheduler\scheduleCallbacks.js

'use strict';

cc.Class({
    'extends': cc.Component,

    properties: {
        time: {
            'default': 5
        }
    },

    _callback: function _callback() {
        this.node.runAction(this.seq);
        if (this.repeat) {
            this.counting = true;
        } else {
            this.counting = false;
        }
        this.time = 5;
        this.counter.string = this.time.toFixed(2) + ' s';
    },

    // use this for initialization
    onLoad: function onLoad() {
        var squashAction = cc.scaleTo(0.2, 1, 0.6);
        var stretchAction = cc.scaleTo(0.2, 1, 1.2);
        var scaleBackAction = cc.scaleTo(0.1, 1, 1);
        var moveUpAction = cc.moveBy(1, cc.p(0, 100)).easing(cc.easeCubicActionOut());
        var moveDownAction = cc.moveBy(1, cc.p(0, -100)).easing(cc.easeCubicActionIn());
        this.seq = cc.sequence(squashAction, stretchAction, moveUpAction, scaleBackAction, moveDownAction, squashAction, scaleBackAction);

        this.counter = cc.find('Canvas/count_label').getComponent(cc.Label);
        this.counter.string = this.time.toFixed(2) + ' s';
        this.counting = false;
        this.repeat = false;
    },

    // called every frame
    update: function update(dt) {
        if (this.counting) {
            this.time -= dt;
            this.counter.string = this.time.toFixed(2) + ' s';
        }
    },

    stopCounting: function stopCounting() {
        this.unschedule(this._callback);
        this.counting = false;
        this.counter.string = '5.00 s';
        this.time = 5;
    },

    repeatSchedule: function repeatSchedule() {
        this.stopCounting();
        this.schedule(this._callback, 5);
        this.repeat = true;
        this.counting = true;
    },

    oneSchedule: function oneSchedule() {
        this.stopCounting();
        this.scheduleOnce(this._callback, 5);
        this.repeat = false;
        this.counting = true;
    },

    cancelSchedules: function cancelSchedules() {
        this.repeat = false;
        this.stopCounting();
    }
});

cc._RFpop();
},{}]},{},["Menu","ActionCallback","SceneList","CustomEvent","Instruction","MyCustomComponent","MouseEvent","PopulatePrefab","ParticleControl1","ProgressBar","SpriteFollowTouch","AudioControl","MonsterPrefab","Item","scheduleCallbacks","ReferenceTypeProperties","TouchDragger","TouchEvent","ListItem","SheepAnimation1","SimpleAction","NodeGroupControl","SimpleKeyboardMovement","Helpers","NonSerializedProperties","ValueTypeProperties","ListView","ButtonControl1"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1Rvb2xCYWNrL0NvY29zL0NvY29zQ3JlYXRvcl92MC43LjBfd2luL2Rpc3QvcmVzb3VyY2VzL2FwcC5hc2FyL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvY2FzZXMvMDVfc2NyaXB0aW5nLzAzX2V2ZW50cy9BY3Rpb25DYWxsYmFjay5qcyIsImFzc2V0cy9jYXNlcy8wNF9hdWRpby9BdWRpb0NvbnRyb2wuanMiLCJhc3NldHMvY2FzZXMvMDJfdWkvMDNfYnV0dG9uL0J1dHRvbkNvbnRyb2wxLmpzIiwiYXNzZXRzL2Nhc2VzLzA1X3NjcmlwdGluZy8wM19ldmVudHMvQ3VzdG9tRXZlbnQuanMiLCJhc3NldHMvc2NyaXB0cy9HbG9iYWwvSGVscGVycy5qcyIsImFzc2V0cy9zY3JpcHRzL0dsb2JhbC9JbnN0cnVjdGlvbi5qcyIsImFzc2V0cy9jYXNlcy8wMl91aS8wNV9zY3JvbGxWaWV3L0l0ZW0uanMiLCJhc3NldHMvc2NyaXB0cy9HbG9iYWwvTGlzdEl0ZW0uanMiLCJhc3NldHMvY2FzZXMvMDJfdWkvMDVfc2Nyb2xsVmlldy9MaXN0Vmlldy5qcyIsImFzc2V0cy9zY3JpcHRzL0dsb2JhbC9NZW51LmpzIiwiYXNzZXRzL2Nhc2VzLzA1X3NjcmlwdGluZy8wMl9wcmVmYWIvTW9uc3RlclByZWZhYi5qcyIsImFzc2V0cy9jYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL01vdXNlRXZlbnQuanMiLCJhc3NldHMvY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTXlDdXN0b21Db21wb25lbnQuanMiLCJhc3NldHMvY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvTm9kZUdyb3VwQ29udHJvbC5qcyIsImFzc2V0cy9jYXNlcy8wNV9zY3JpcHRpbmcvMDFfcHJvcGVydGllcy9Ob25TZXJpYWxpemVkUHJvcGVydGllcy5qcyIsImFzc2V0cy9jYXNlcy8wMV9ncmFwaGljcy8wMl9wYXJ0aWNsZS9QYXJ0aWNsZUNvbnRyb2wxLmpzIiwiYXNzZXRzL2Nhc2VzLzA1X3NjcmlwdGluZy8wMl9wcmVmYWIvUG9wdWxhdGVQcmVmYWIuanMiLCJhc3NldHMvY2FzZXMvMDJfdWkvMDRfcHJvZ3Jlc3NiYXIvUHJvZ3Jlc3NCYXIuanMiLCJhc3NldHMvY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvUmVmZXJlbmNlVHlwZVByb3BlcnRpZXMuanMiLCJhc3NldHMvc2NyaXB0cy9HbG9iYWwvU2NlbmVMaXN0LmpzIiwiYXNzZXRzL2Nhc2VzLzAzX2dhbWVwbGF5LzAzX2FuaW1hdGlvbi9TaGVlcEFuaW1hdGlvbjEuanMiLCJhc3NldHMvY2FzZXMvMDNfZ2FtZXBsYXkvMDJfYWN0aW9ucy9TaW1wbGVBY3Rpb24uanMiLCJhc3NldHMvY2FzZXMvMDNfZ2FtZXBsYXkvMDFfcGxheWVyX2NvbnRyb2wvU2ltcGxlS2V5Ym9hcmRNb3ZlbWVudC5qcyIsImFzc2V0cy9jYXNlcy8wM19nYW1lcGxheS8wMV9wbGF5ZXJfY29udHJvbC9TcHJpdGVGb2xsb3dUb3VjaC5qcyIsImFzc2V0cy9jYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1RvdWNoRHJhZ2dlci5qcyIsImFzc2V0cy9jYXNlcy8wNV9zY3JpcHRpbmcvMDNfZXZlbnRzL1RvdWNoRXZlbnQuanMiLCJhc3NldHMvY2FzZXMvMDVfc2NyaXB0aW5nLzAxX3Byb3BlcnRpZXMvVmFsdWVUeXBlUHJvcGVydGllcy5qcyIsImFzc2V0cy9jYXNlcy8wNV9zY3JpcHRpbmcvMDRfc2NoZWR1bGVyL3NjaGVkdWxlQ2FsbGJhY2tzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2MuX1JGcHVzaChtb2R1bGUsICcyODgxZTZLMWVkTEJiZ3ZjKzYvWU43bycsICdBY3Rpb25DYWxsYmFjaycpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDNfZXZlbnRzXFxBY3Rpb25DYWxsYmFjay5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgdG91Y2hFdmVudCA9IHRoaXMuZ2V0Q29tcG9uZW50KCdUb3VjaEV2ZW50Jyk7XG4gICAgICAgIHZhciBtb3VzZUV2ZW50ID0gdGhpcy5nZXRDb21wb25lbnQoJ01vdXNlRXZlbnQnKTtcbiAgICAgICAgdmFyIGV2ZW50ID0gdG91Y2hFdmVudCB8fCBtb3VzZUV2ZW50O1xuICAgICAgICBldmVudC5fY2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKGNjLnNlcXVlbmNlKGNjLnNjYWxlVG8oMC41LCAyLCAxKSwgY2Muc2NhbGVUbygwLjI1LCAxLCAxKSkpO1xuICAgICAgICB9O1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzhjOTViVDJNM2hCUElkUkRWZnRpVVFHJywgJ0F1ZGlvQ29udHJvbCcpO1xuLy8gY2FzZXNcXDA0X2F1ZGlvXFxBdWRpb0NvbnRyb2wuanNcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBtdXNpY1BsYXllcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5BdWRpb1NvdXJjZVxuICAgICAgICB9LFxuICAgICAgICBkaW5nQ2xpcDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB1cmw6IGNjLkF1ZGlvQ2xpcFxuICAgICAgICB9LFxuICAgICAgICBjaGVlcmluZ0NsaXA6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdXJsOiBjYy5BdWRpb0NsaXBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyBwbGF5IGF1ZGlvU291cmNlXG4gICAgICAgIHNlbGYubXVzaWNQbGF5ZXIucGxheSgpO1xuXG4gICAgICAgIC8vIHBsYXkgZGluZyBpbiAxIHNlYywgcGxheSBjaGVlcmluZyBpbiAyIHNlY1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3Qoc2VsZi5kaW5nQ2xpcCwgZmFsc2UpO1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUucGxheUVmZmVjdChzZWxmLmNoZWVyaW5nQ2xpcCwgZmFsc2UpO1xuICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2U2ZGM3ZFdjeHhKdW9mWEI3ZXJnR25DJywgJ0J1dHRvbkNvbnRyb2wxJyk7XG4vLyBjYXNlc1xcMDJfdWlcXDAzX2J1dHRvblxcQnV0dG9uQ29udHJvbDEuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGJ1dHRvbkxlZnQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9LFxuICAgICAgICBidXR0b25SaWdodDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIGRpc3BsYXk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vIFlvdSBjYW4gYWxzbyByZWdpc3RlciBldmVudCBsaXN0ZW5lciB1c2luZyB0aGUgbWV0aG9kIGJlbG93XG4gICAgICAgIC8vIHRoaXMuYnV0dG9uTGVmdC5nZXRDb21wb25lbnQoY2MuQnV0dG9uKS5vbihjYy5FQnV0dG9uLkVWRU5UX1RPVUNIX1VQLCB0aGlzLm9uQnRuTGVmdENsaWNrZWQsIHRoaXMpO1xuICAgICAgICAvLyB0aGlzLmJ1dHRvblJpZ2h0LmdldENvbXBvbmVudChjYy5CdXR0b24pLm9uKGNjLkVCdXR0b24uRVZFTlRfVE9VQ0hfVVAsIHRoaXMub25CdG5SaWdodENsaWNrZWQsIHRoaXMpO1xuICAgIH0sXG5cbiAgICBvbkJ0bkxlZnRDbGlja2VkOiBmdW5jdGlvbiBvbkJ0bkxlZnRDbGlja2VkKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnTGVmdCBidXR0b24gY2xpY2tlZCEnKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5LnN0cmluZyA9ICdMZWZ0IGJ1dHRvbiBjbGlja2VkISc7XG4gICAgfSxcblxuICAgIG9uQnRuUmlnaHRDbGlja2VkOiBmdW5jdGlvbiBvbkJ0blJpZ2h0Q2xpY2tlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1JpZ2h0IGJ1dHRvbiBjbGlja2VkIScpO1xuICAgICAgICB0aGlzLmRpc3BsYXkuc3RyaW5nID0gJ1JpZ2h0IGJ1dHRvbiBjbGlja2VkISc7XG4gICAgfSxcblxuICAgIG9uQnRuSW5TY3JvbGxDbGlja2VkOiBmdW5jdGlvbiBvbkJ0bkluU2Nyb2xsQ2xpY2tlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0J1dHRvbiBpbiBTY3JvbGx2aWV3IGNsaWNrZWQhJyk7XG4gICAgICAgIHRoaXMuZGlzcGxheS5zdHJpbmcgPSAnQnV0dG9uIGluIFNjcm9sbFZpZXcgY2xpY2tlZCEnO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzVjYzIzYW9ZY3hJS2F6UkZ3S1dHRUk3JywgJ0N1c3RvbUV2ZW50Jyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwM19ldmVudHNcXEN1c3RvbUV2ZW50LmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciB0b3VjaEV2ZW50ID0gdGhpcy5nZXRDb21wb25lbnQoJ1RvdWNoRXZlbnQnKTtcblxuICAgICAgICAvLyBFbWl0IENVU1RPTV9FVkVOVCB0byBpdHMgbGlzdGVuZXJzIHdoaWxlIHRvdWNoIGVuZFxuICAgICAgICB0b3VjaEV2ZW50Ll9jYWxsYmFjayA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZW1pdCgnQ1VTVE9NX0VWRU5UJyk7XG4gICAgICAgIH0pLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdmFyIGFkZEJ1dHRvbiA9IGNjLmZpbmQoJ0NhbnZhcy9hZGQnKTtcbiAgICAgICAgdmFyIGNhbmNlbEJ1dHRvbiA9IGNjLmZpbmQoJ0NhbnZhcy9jYW5jZWwnKTtcblxuICAgICAgICBmdW5jdGlvbiBvbkN1c3RvbUV2ZW50KGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJ1bkFjdGlvbihjYy5zZXF1ZW5jZShjYy5zY2FsZVRvKDAuNSwgMiwgMSksIGNjLnNjYWxlVG8oMC4yNSwgMSwgMSkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubm9kZS5vbignQ1VTVE9NX0VWRU5UJywgb25DdXN0b21FdmVudCwgYWRkQnV0dG9uKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCdDVVNUT01fRVZFTlQnLCBvbkN1c3RvbUV2ZW50LCBjYW5jZWxCdXR0b24pO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2M4NjQwTTNvelJFcnJWL0dvM3VUa250JywgJ0hlbHBlcnMnKTtcbi8vIHNjcmlwdHNcXEdsb2JhbFxcSGVscGVycy5qc1xuXG4vLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgYmV0d2VlbiBtaW4gKGluY2x1ZGVkKSBhbmQgbWF4IChleGNsdWRlZClcblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWluLCBtYXgpIHtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldFJhbmRvbUludDogZ2V0UmFuZG9tSW50XG59O1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzZhODcxZ3k3M0ZETGFwM0VqZS8yaDZpJywgJ0luc3RydWN0aW9uJyk7XG4vLyBzY3JpcHRzXFxHbG9iYWxcXEluc3RydWN0aW9uLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICB0ZXh0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6ICcnLFxuICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgbXVsdGlsaW5lOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzkyMGM4YTVNYWhBaGJDVFN2bVF2YUIrJywgJ0l0ZW0nKTtcbi8vIGNhc2VzXFwwMl91aVxcMDVfc2Nyb2xsVmlld1xcSXRlbS5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGl0ZW1JRDogMFxuICAgIH0sXG5cbiAgICB1cGRhdGVJdGVtOiBmdW5jdGlvbiB1cGRhdGVJdGVtKHRtcGxJZCwgaXRlbUlkKSB7XG4gICAgICAgIHRoaXMuaXRlbUlEID0gaXRlbUlkO1xuICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICdUbXBsIycgKyB0bXBsSWQgKyAnIEl0ZW0jJyArIHRoaXMuaXRlbUlEO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2FhNjNiV05FOGhCZjRQNFNwMFgydVQwJywgJ0xpc3RJdGVtJyk7XG4vLyBzY3JpcHRzXFxHbG9iYWxcXExpc3RJdGVtLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgdXJsOiAnJ1xuICAgIH0sXG5cbiAgICBsb2FkRXhhbXBsZTogZnVuY3Rpb24gbG9hZEV4YW1wbGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgICAgICAgY2MuZmluZCgnTWVudScpLmdldENvbXBvbmVudCgnTWVudScpLmxvYWRTY2VuZSh0aGlzLnVybCk7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdlNjQ1OCtoZjVWQW5JWG9jbXZoZ2dxQycsICdMaXN0VmlldycpO1xuLy8gY2FzZXNcXDAyX3VpXFwwNV9zY3JvbGxWaWV3XFxMaXN0Vmlldy5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaXRlbVRlbXBsYXRlOiB7IC8vIGl0ZW0gdGVtcGxhdGUgdG8gaW5zdGFudGlhdGUgb3RoZXIgaXRlbXNcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgc2Nyb2xsVmlldzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuU2Nyb2xsVmlld1xuICAgICAgICB9LFxuICAgICAgICBzcGF3bkNvdW50OiAwLCAvLyBob3cgbWFueSBpdGVtcyB3ZSBhY3R1YWxseSBzcGF3blxuICAgICAgICB0b3RhbENvdW50OiAwLCAvLyBob3cgbWFueSBpdGVtcyB3ZSBuZWVkIGZvciB0aGUgd2hvbGUgbGlzdFxuICAgICAgICBzcGFjaW5nOiAwLCAvLyBzcGFjZSBiZXR3ZWVuIGVhY2ggaXRlbVxuICAgICAgICBidWZmZXJab25lOiAwIH0sXG5cbiAgICAvLyB3aGVuIGl0ZW0gaXMgYXdheSBmcm9tIGJ1ZmZlclpvbmUsIHdlIHJlbG9jYXRlIGl0XG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMuc2Nyb2xsVmlldy5jb250ZW50O1xuICAgICAgICB0aGlzLml0ZW1zID0gW107IC8vIGFycmF5IHRvIHN0b3JlIHNwYXduZWQgaXRlbXNcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgICAgIHRoaXMudXBkYXRlVGltZXIgPSAwO1xuICAgICAgICB0aGlzLnVwZGF0ZUludGVydmFsID0gMC4yO1xuICAgICAgICB0aGlzLmxhc3RDb250ZW50UG9zWSA9IDA7IC8vIHVzZSB0aGlzIHZhcmlhYmxlIHRvIGRldGVjdCBpZiB3ZSBhcmUgc2Nyb2xsaW5nIHVwIG9yIGRvd25cbiAgICB9LFxuXG4gICAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmhlaWdodCA9IHRoaXMudG90YWxDb3VudCAqICh0aGlzLml0ZW1UZW1wbGF0ZS5oZWlnaHQgKyB0aGlzLnNwYWNpbmcpICsgdGhpcy5zcGFjaW5nOyAvLyBnZXQgdG90YWwgY29udGVudCBoZWlnaHRcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNwYXduQ291bnQ7ICsraSkge1xuICAgICAgICAgICAgLy8gc3Bhd24gaXRlbXMsIHdlIG9ubHkgbmVlZCB0byBkbyB0aGlzIG9uY2VcbiAgICAgICAgICAgIHZhciBpdGVtID0gY2MuaW5zdGFudGlhdGUodGhpcy5pdGVtVGVtcGxhdGUpO1xuICAgICAgICAgICAgdGhpcy5jb250ZW50LmFkZENoaWxkKGl0ZW0pO1xuICAgICAgICAgICAgaXRlbS5zZXRQb3NpdGlvbigwLCAtaXRlbS5oZWlnaHQgKiAoMC41ICsgaSkgLSB0aGlzLnNwYWNpbmcgKiAoaSArIDEpKTtcbiAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KCdJdGVtJykudXBkYXRlSXRlbShpLCBpKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRQb3NpdGlvbkluVmlldzogZnVuY3Rpb24gZ2V0UG9zaXRpb25JblZpZXcoaXRlbSkge1xuICAgICAgICAvLyBnZXQgaXRlbSBwb3NpdGlvbiBpbiBzY3JvbGx2aWV3J3Mgbm9kZSBzcGFjZVxuICAgICAgICB2YXIgd29ybGRQb3MgPSBpdGVtLnBhcmVudC5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIoaXRlbS5wb3NpdGlvbik7XG4gICAgICAgIHZhciB2aWV3UG9zID0gdGhpcy5zY3JvbGxWaWV3Lm5vZGUuY29udmVydFRvTm9kZVNwYWNlQVIod29ybGRQb3MpO1xuICAgICAgICByZXR1cm4gdmlld1BvcztcbiAgICB9LFxuXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciArPSBkdDtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlVGltZXIgPCB0aGlzLnVwZGF0ZUludGVydmFsKSByZXR1cm47IC8vIHdlIGRvbid0IG5lZWQgdG8gZG8gdGhlIG1hdGggZXZlcnkgZnJhbWVcbiAgICAgICAgdGhpcy51cGRhdGVUaW1lciA9IDA7XG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgICAgIHZhciBidWZmZXIgPSB0aGlzLmJ1ZmZlclpvbmU7XG4gICAgICAgIHZhciBpc0Rvd24gPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55IDwgdGhpcy5sYXN0Q29udGVudFBvc1k7IC8vIHNjcm9sbGluZyBkaXJlY3Rpb25cbiAgICAgICAgdmFyIG9mZnNldCA9ICh0aGlzLml0ZW1UZW1wbGF0ZS5oZWlnaHQgKyB0aGlzLnNwYWNpbmcpICogaXRlbXMubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgdmlld1BvcyA9IHRoaXMuZ2V0UG9zaXRpb25JblZpZXcoaXRlbXNbaV0pO1xuICAgICAgICAgICAgaWYgKGlzRG93bikge1xuICAgICAgICAgICAgICAgIC8vIGlmIGF3YXkgZnJvbSBidWZmZXIgem9uZSBhbmQgbm90IHJlYWNoaW5nIHRvcCBvZiBjb250ZW50XG4gICAgICAgICAgICAgICAgaWYgKHZpZXdQb3MueSA8IC1idWZmZXIgJiYgaXRlbXNbaV0ueSArIG9mZnNldCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbXNbaV0uc2V0UG9zaXRpb25ZKGl0ZW1zW2ldLnkgKyBvZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldLmdldENvbXBvbmVudCgnSXRlbScpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbUlkID0gaXRlbS5pdGVtSUQgLSBpdGVtcy5sZW5ndGg7IC8vIHVwZGF0ZSBpdGVtIGlkXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0udXBkYXRlSXRlbShpLCBpdGVtSWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgYXdheSBmcm9tIGJ1ZmZlciB6b25lIGFuZCBub3QgcmVhY2hpbmcgYm90dG9tIG9mIGNvbnRlbnRcbiAgICAgICAgICAgICAgICBpZiAodmlld1Bvcy55ID4gYnVmZmVyICYmIGl0ZW1zW2ldLnkgLSBvZmZzZXQgPiAtdGhpcy5jb250ZW50LmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtc1tpXS5zZXRQb3NpdGlvblkoaXRlbXNbaV0ueSAtIG9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV0uZ2V0Q29tcG9uZW50KCdJdGVtJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpdGVtSUQ6ICcgKyBpdGVtLml0ZW1JRCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtSWQgPSBpdGVtLml0ZW1JRCArIGl0ZW1zLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS51cGRhdGVJdGVtKGksIGl0ZW1JZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBsYXN0Q29udGVudFBvc1lcbiAgICAgICAgdGhpcy5sYXN0Q29udGVudFBvc1kgPSB0aGlzLnNjcm9sbFZpZXcuY29udGVudC55O1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzA0NTI1cHlZQmxOMjZTV2F3YVVGM2RBJywgJ01lbnUnKTtcbi8vIHNjcmlwdHNcXEdsb2JhbFxcTWVudS5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmMgPSBmdW5jdGlvbiBlbXB0eUZ1bmMoZXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbn07XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdGV4dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgcmVhZG1lOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIG1hc2s6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcbiAgICAgICAgYnRuSW5mbzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQnV0dG9uXG4gICAgICAgIH0sXG4gICAgICAgIGJ0bkJhY2s6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkJ1dHRvblxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZVVybCA9ICdUZXN0TGlzdC5maXJlJztcbiAgICAgICAgdGhpcy5sb2FkSW5zdHJ1Y3Rpb24odGhpcy5jdXJyZW50U2NlbmVVcmwpO1xuICAgIH0sXG5cbiAgICBiYWNrVG9MaXN0OiBmdW5jdGlvbiBiYWNrVG9MaXN0KCkge1xuICAgICAgICB0aGlzLnNob3dSZWFkbWUoZmFsc2UpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZVVybCA9ICdUZXN0TGlzdC5maXJlJztcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKCdUZXN0TGlzdCcsIHRoaXMub25Mb2FkU2NlbmVGaW5pc2guYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIGxvYWRTY2VuZTogZnVuY3Rpb24gbG9hZFNjZW5lKHVybCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2VuZVVybCA9IHVybDtcbiAgICAgICAgY2MuZGlyZWN0b3IubG9hZFNjZW5lKHVybCwgdGhpcy5vbkxvYWRTY2VuZUZpbmlzaC5iaW5kKHRoaXMpKTtcbiAgICB9LFxuXG4gICAgb25Mb2FkU2NlbmVGaW5pc2g6IGZ1bmN0aW9uIG9uTG9hZFNjZW5lRmluaXNoKCkge1xuICAgICAgICB2YXIgdXJsID0gdGhpcy5jdXJyZW50U2NlbmVVcmw7XG4gICAgICAgIHRoaXMubG9hZEluc3RydWN0aW9uKHVybCk7XG4gICAgfSxcblxuICAgIGxvYWRJbnN0cnVjdGlvbjogZnVuY3Rpb24gbG9hZEluc3RydWN0aW9uKHVybCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBtZFVybCA9IHVybC5yZXBsYWNlKC9cXC5maXJlJC8sICcubWQnKS5yZXBsYWNlKCdkYjovL2Fzc2V0cy8nLCAnJyk7XG4gICAgICAgIGNjLmxvYWRlci5sb2FkVHh0KGNjLnVybC5yYXcobWRVcmwpLCBmdW5jdGlvbiAoZXJyLCB0eHQpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnRleHQuc3RyaW5nID0gJ+ivtOaYjuaague8uic7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi50ZXh0LnN0cmluZyA9IHR4dDtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dSZWFkbWU6IGZ1bmN0aW9uIHNob3dSZWFkbWUoYWN0aXZlKSB7XG4gICAgICAgIGlmIChhY3RpdmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZWFkbWUuYWN0aXZlID0gIXRoaXMucmVhZG1lLmFjdGl2ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVhZG1lLmFjdGl2ZSA9IGFjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yZWFkbWUuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLm1hc2sub24oJ3RvdWNoc3RhcnQnLCBlbXB0eUZ1bmMsIHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXNrLm9mZigndG91Y2hzdGFydCcsIGVtcHR5RnVuYywgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhYmVsVHh0ID0gdGhpcy5yZWFkbWUuYWN0aXZlID8gJ+WFs+mXreivtOaYjicgOiAn5p+l55yL6K+05piOJztcbiAgICAgICAgY2MuZmluZCgnbGFiZWwnLCB0aGlzLmJ0bkluZm8ubm9kZSkuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKS5zdHJpbmcgPSBsYWJlbFR4dDtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICc4Y2I0ZG0yUUVwSjdwbmFTL2NqcnZnRicsICdNb25zdGVyUHJlZmFiJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMl9wcmVmYWJcXE1vbnN0ZXJQcmVmYWIuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgSGVscGVycyA9IHJlcXVpcmUoJ0hlbHBlcnMnKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzcHJpdGVMaXN0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLlNwcml0ZUZyYW1lXVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgcmFuZG9tSWR4ID0gSGVscGVycy5nZXRSYW5kb21JbnQoMCwgdGhpcy5zcHJpdGVMaXN0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBzcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xuICAgICAgICBzcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnNwcml0ZUxpc3RbcmFuZG9tSWR4XTtcbiAgICB9XG5cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzZkZjBmdDFqeTVKZzRjUTAzOWp0OGpDJywgJ01vdXNlRXZlbnQnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAzX2V2ZW50c1xcTW91c2VFdmVudC5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zY3JvbGwgPSAwO1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDUwO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRE9XTiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTYwO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDUwO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX1VQLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDUwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9XSEVFTCwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbCArPSBldmVudC5nZXRTY3JvbGxZKCk7XG4gICAgICAgICAgICB2YXIgaCA9IHRoaXMubm9kZS5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnNjcm9sbCA9IGNjLmNsYW1wZih0aGlzLnNjcm9sbCwgLTIgKiBoLCAwLjcgKiBoKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDEgLSB0aGlzLnNjcm9sbCAvIGg7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzZiOGJhRXBMdXhBQ0lNTmxJTDJ2dzJXJywgJ015Q3VzdG9tQ29tcG9uZW50Jyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMV9wcm9wZXJ0aWVzXFxNeUN1c3RvbUNvbXBvbmVudC5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBvd2VyOiAxMFxuICAgIH0sXG5cbiAgICBnZXRQb3dlcjogZnVuY3Rpb24gZ2V0UG93ZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBvd2VyO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJ2JkNGEyK2JyaXRBbG9mMFVkTUNWQjhjJywgJ05vZGVHcm91cENvbnRyb2wnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAxX3Byb3BlcnRpZXNcXE5vZGVHcm91cENvbnRyb2wuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG5vZGVMaXN0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdLFxuICAgICAgICAgICAgdHlwZTogW2NjLk5vZGVdXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5pbmVydmFsSWQgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnRvZ2dsZU5vZGVzVmlzaWJpbGl0eSgpO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICB9LFxuXG4gICAgb25EZXN0cm95OiBmdW5jdGlvbiBvbkRlc3Ryb3koKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5pbmVydmFsSWQpO1xuICAgIH0sXG5cbiAgICB0b2dnbGVOb2Rlc1Zpc2liaWxpdHk6IGZ1bmN0aW9uIHRvZ2dsZU5vZGVzVmlzaWJpbGl0eSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RvZ2dsZSB2aXNpYmlsaXR5Jyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ub2RlTGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5ub2RlTGlzdFtpXS5hY3RpdmUgPSAhdGhpcy5ub2RlTGlzdFtpXS5hY3RpdmU7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdkNDExNFBneWJoSjNML2swTjlUa0NaSScsICdOb25TZXJpYWxpemVkUHJvcGVydGllcycpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDFfcHJvcGVydGllc1xcTm9uU2VyaWFsaXplZFByb3BlcnRpZXMuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIG15U2VyaWFsaXplZFRleHQ6ICcnLFxuICAgICAgICBteU5vblNlcmlhbGl6ZWRUZXh0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6ICcnLFxuICAgICAgICAgICAgdmlzaWJsZTogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWwxOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubXlOb25TZXJpYWxpemVkVGV4dCA9ICdDYW4gb25seSBzZXQgdmFsdWUgaW4gc2NyaXB0JztcbiAgICAgICAgdGhpcy5sYWJlbDEuc3RyaW5nID0gdGhpcy5teVNlcmlhbGl6ZWRUZXh0O1xuICAgICAgICB0aGlzLmxhYmVsMi5zdHJpbmcgPSB0aGlzLm15Tm9uU2VyaWFsaXplZFRleHQ7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnNzlhZTNoaVArSkFoSUtlaGFXeWlLdWgnLCAnUGFydGljbGVDb250cm9sMScpO1xuLy8gY2FzZXNcXDAxX2dyYXBoaWNzXFwwMl9wYXJ0aWNsZVxcUGFydGljbGVDb250cm9sMS5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHBhcnRpY2xlOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAvLyB1c2Ugc3BhY2UgdG8gdG9nZ2xlIHBhcnRpY2xlXG4gICAgICAgIGNjLmV2ZW50TWFuYWdlci5hZGRMaXN0ZW5lcih7XG4gICAgICAgICAgICBldmVudDogY2MuRXZlbnRMaXN0ZW5lci5LRVlCT0FSRCxcbiAgICAgICAgICAgIG9uS2V5UHJlc3NlZDogZnVuY3Rpb24gb25LZXlQcmVzc2VkKGtleUNvZGUsIGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleUNvZGUgPT09IGNjLktFWS5zcGFjZSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnRvZ2dsZVBhcnRpY2xlUGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZik7XG4gICAgfSxcblxuICAgIHRvZ2dsZVBhcnRpY2xlUGxheTogZnVuY3Rpb24gdG9nZ2xlUGFydGljbGVQbGF5KCkge1xuICAgICAgICB2YXIgbXlQYXJ0aWNsZSA9IHRoaXMucGFydGljbGUuZ2V0Q29tcG9uZW50KGNjLlBhcnRpY2xlU3lzdGVtKTtcbiAgICAgICAgaWYgKG15UGFydGljbGUuaXNGdWxsKCkpIHtcbiAgICAgICAgICAgIC8vIGNoZWNrIGlmIHBhcnRpY2xlIGhhcyBmdWxseSBwbGFlZFxuICAgICAgICAgICAgbXlQYXJ0aWNsZS5zdG9wU3lzdGVtKCk7IC8vIHN0b3AgcGFydGljbGUgc3lzdGVtXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXlQYXJ0aWNsZS5yZXNldFN5c3RlbSgpOyAvLyByZXN0YXJ0IHBhcnRpY2xlIHN5c3RlbVxuICAgICAgICAgICAgfVxuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzc1NTE4STBJbUpIWHFXTk5HUklPbUpnJywgJ1BvcHVsYXRlUHJlZmFiJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMl9wcmVmYWJcXFBvcHVsYXRlUHJlZmFiLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgcHJlZmFiOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuICAgICAgICBjYW52YXM6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuQ2FudmFzXG4gICAgICAgIH0sXG4gICAgICAgIG51bWJlclRvU3Bhd246IDAsXG4gICAgICAgIHNwYXduSW50ZXJ2YWw6IDBcbiAgICB9LFxuXG4gICAgYWRkU3Bhd246IGZ1bmN0aW9uIGFkZFNwYXduKCkge1xuICAgICAgICBpZiAodGhpcy5zcGF3bkNvdW50ID49IHRoaXMubnVtYmVyVG9TcGF3bikge1xuICAgICAgICAgICAgdGhpcy5jbGVhclJlcGVhdGVyKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1vbnN0ZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnByZWZhYik7XG4gICAgICAgIHRoaXMuY2FudmFzLm5vZGUuYWRkQ2hpbGQobW9uc3Rlcik7XG4gICAgICAgIG1vbnN0ZXIucG9zaXRpb24gPSB0aGlzLmdldFJhbmRvbVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuc3Bhd25Db3VudCsrO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBzZWxmLnJhbmRvbVJhbmdlID0gY2MucCgzMDAsIDIwMCk7XG4gICAgICAgIHNlbGYuc3Bhd25Db3VudCA9IDA7XG4gICAgICAgIHNlbGYuc2NoZWR1bGUoc2VsZi5hZGRTcGF3biwgc2VsZi5zcGF3bkludGVydmFsKTtcbiAgICB9LFxuXG4gICAgZ2V0UmFuZG9tUG9zaXRpb246IGZ1bmN0aW9uIGdldFJhbmRvbVBvc2l0aW9uKCkge1xuICAgICAgICByZXR1cm4gY2MucChjYy5yYW5kb21NaW51czFUbzEoKSAqIHRoaXMucmFuZG9tUmFuZ2UueCwgY2MucmFuZG9tTWludXMxVG8xKCkgKiB0aGlzLnJhbmRvbVJhbmdlLnkpO1xuICAgIH0sXG5cbiAgICBjbGVhclJlcGVhdGVyOiBmdW5jdGlvbiBjbGVhclJlcGVhdGVyKCkge1xuICAgICAgICB0aGlzLnVuc2NoZWR1bGUodGhpcy5hZGRTcGF3bik7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnODRhNDN5YjlPeEJYNkhNUXhQekhReXonLCAnUHJvZ3Jlc3NCYXInKTtcbi8vIGNhc2VzXFwwMl91aVxcMDRfcHJvZ3Jlc3NiYXJcXFByb2dyZXNzQmFyLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgaG9yaXpvbnRhbEJhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBob3Jpem9udGFsQmFyUmV2ZXJzZToge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICB2ZXJ0aWNhbEJhcjoge1xuICAgICAgICAgICAgdHlwZTogY2MuUHJvZ3Jlc3NCYXIsXG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbFxuICAgICAgICB9LFxuICAgICAgICB2ZXJ0aWNhbEJhclJldmVyc2U6IHtcbiAgICAgICAgICAgIHR5cGU6IGNjLlByb2dyZXNzQmFyLFxuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzc0Jhcih0aGlzLmhvcml6b250YWxCYXIsIGR0KTtcbiAgICAgICAgdGhpcy5fdXBkYXRlUHJvZ3Jlc3NCYXIodGhpcy52ZXJ0aWNhbEJhciwgZHQpO1xuICAgICAgICB0aGlzLl91cGRhdGVQcm9ncmVzc0Jhcih0aGlzLmhvcml6b250YWxCYXJSZXZlcnNlLCBkdCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVByb2dyZXNzQmFyKHRoaXMudmVydGljYWxCYXJSZXZlcnNlLCBkdCk7XG4gICAgfSxcblxuICAgIF91cGRhdGVQcm9ncmVzc0JhcjogZnVuY3Rpb24gX3VwZGF0ZVByb2dyZXNzQmFyKHByb2dyZXNzQmFyLCBkdCkge1xuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBwcm9ncmVzc0Jhci5wcm9ncmVzcztcbiAgICAgICAgaWYgKHByb2dyZXNzIDwgMS4wKSB7XG4gICAgICAgICAgICBwcm9ncmVzcyArPSBkdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwcm9ncmVzc0Jhci5wcm9ncmVzcyA9IHByb2dyZXNzO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzkzNDFmM2ZEZEJNakpMS2g0RCtrSkpLJywgJ1JlZmVyZW5jZVR5cGVQcm9wZXJ0aWVzJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMV9wcm9wZXJ0aWVzXFxSZWZlcmVuY2VUeXBlUHJvcGVydGllcy5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBNeUN1c3RvbUNvbXBvbmVudCA9IHJlcXVpcmUoJ015Q3VzdG9tQ29tcG9uZW50Jyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgbXlOb2RlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIG15U3ByaXRlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcbiAgICAgICAgbXlMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcbiAgICAgICAgbXlDb21wb25lbnQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IE15Q3VzdG9tQ29tcG9uZW50XG4gICAgICAgIH0sXG4gICAgICAgIG15U3ByaXRlRnJhbWU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUZyYW1lXG4gICAgICAgIH0sXG4gICAgICAgIG15QXRsYXM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZUF0bGFzXG4gICAgICAgIH0sXG4gICAgICAgIG15UHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcbiAgICAgICAgbXlBdWRpb0NsaXA6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHVybDogY2MuQXVkaW9DbGlwXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubXlMYWJlbC5zdHJpbmcgPSB0aGlzLm15Q29tcG9uZW50LmdldFBvd2VyKCkudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICc0NzNiOHd4czU1T3NKdm94VmRZQ3pURicsICdTY2VuZUxpc3QnKTtcbi8vIHNjcmlwdHNcXEdsb2JhbFxcU2NlbmVMaXN0LmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBpdGVtUHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVJdGVtOiBmdW5jdGlvbiBjcmVhdGVJdGVtKHgsIHksIG5hbWUsIHVybCkge1xuICAgICAgICB2YXIgaXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYik7XG4gICAgICAgIHZhciBpdGVtQ29tcCA9IGl0ZW0uZ2V0Q29tcG9uZW50KCdMaXN0SXRlbScpO1xuICAgICAgICB2YXIgbGFiZWwgPSBpdGVtQ29tcC5sYWJlbDtcbiAgICAgICAgbGFiZWwuc3RyaW5nID0gbmFtZTtcblxuICAgICAgICBpZiAodXJsKSB7XG4gICAgICAgICAgICBpdGVtQ29tcC51cmwgPSB1cmw7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpdGVtLndpZHRoID0gdztcbiAgICAgICAgaXRlbS54ID0geDtcbiAgICAgICAgaXRlbS55ID0geTtcbiAgICAgICAgdGhpcy5ub2RlLmFkZENoaWxkKGl0ZW0pO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHZhciBzY2VuZXMgPSBjYy5nYW1lLl9zY2VuZUluZm9zO1xuICAgICAgICB2YXIgbGlzdCA9IHt9O1xuICAgICAgICBpZiAoc2NlbmVzKSB7XG4gICAgICAgICAgICB2YXIgaSwgajtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzY2VuZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gc2NlbmVzW2ldLnVybDtcbiAgICAgICAgICAgICAgICB2YXIgZGlybmFtZSA9IGNjLnBhdGguZGlybmFtZSh1cmwpLnJlcGxhY2UoJ2RiOi8vYXNzZXRzL2Nhc2VzLycsICcnKTtcbiAgICAgICAgICAgICAgICB2YXIgc2NlbmVuYW1lID0gY2MucGF0aC5iYXNlbmFtZSh1cmwsICcuZmlyZScpO1xuICAgICAgICAgICAgICAgIGlmIChzY2VuZW5hbWUgPT09ICdUZXN0TGlzdCcpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFkaXJuYW1lKSBkaXJuYW1lID0gJ19yb290JztcbiAgICAgICAgICAgICAgICBpZiAoIWxpc3RbZGlybmFtZV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdFtkaXJuYW1lXSA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaXN0W2Rpcm5hbWVdW3NjZW5lbmFtZV0gPSB1cmw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkaXJzID0gT2JqZWN0LmtleXMobGlzdCk7XG4gICAgICAgICAgICBkaXJzLnNvcnQoKTtcbiAgICAgICAgICAgIHZhciB5ID0gLTUwO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZGlycy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIHZhciBkaXJuYW1lID0gZGlyc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuY3JlYXRlSXRlbSgxMDAsIHksIGRpcm5hbWUpO1xuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLldpZGdldCkubGVmdCA9IDYwO1xuICAgICAgICAgICAgICAgIGl0ZW0uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSkuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHkgLT0gNTA7XG4gICAgICAgICAgICAgICAgdmFyIHNjZW5lbmFtZXMgPSBPYmplY3Qua2V5cyhsaXN0W2Rpcm5hbWVdKTtcbiAgICAgICAgICAgICAgICBzY2VuZW5hbWVzLnNvcnQoKTtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgc2NlbmVuYW1lcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgX25hbWUgPSBzY2VuZW5hbWVzW2pdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdXJsID0gbGlzdFtkaXJuYW1lXVtfbmFtZV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBfaXRlbSA9IHRoaXMuY3JlYXRlSXRlbSgyMDAsIHksIF9uYW1lLCB1cmwpO1xuICAgICAgICAgICAgICAgICAgICBfaXRlbS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KS5sZWZ0ID0gMTIwO1xuICAgICAgICAgICAgICAgICAgICBfaXRlbS5jb2xvciA9IGNjLkNvbG9yLldISVRFO1xuICAgICAgICAgICAgICAgICAgICB5IC09IDUwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBNYXRoLmFicyh5KSArIDMwO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnYWU2ZmNSOGN1RkdSWUhXNTI1VkpEL2snLCAnU2hlZXBBbmltYXRpb24xJyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAzX2FuaW1hdGlvblxcU2hlZXBBbmltYXRpb24xLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzaGVlcEFuaW06IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkFuaW1hdGlvblxuICAgICAgICB9XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIGFuaW0gPSB0aGlzLnNoZWVwQW5pbTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBhbmltLnBsYXkoJ3NoZWVwX2p1bXAnKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnYjYwNjdhMStKNUZXNEczMG5tVkxVL2QnLCAnU2ltcGxlQWN0aW9uJyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAyX2FjdGlvbnNcXFNpbXBsZUFjdGlvbi5qc1xuXG5cInVzZSBzdHJpY3RcIjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIGp1bXBlcjoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuc3F1YXNoQWN0aW9uID0gY2Muc2NhbGVUbygwLjIsIDEsIDAuNik7XG4gICAgICAgIHRoaXMuc3RyZXRjaEFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAxLjIpO1xuICAgICAgICB0aGlzLnNjYWxlQmFja0FjdGlvbiA9IGNjLnNjYWxlVG8oMC4xLCAxLCAxKTtcbiAgICAgICAgdGhpcy5tb3ZlVXBBY3Rpb24gPSBjYy5tb3ZlQnkoMSwgY2MucCgwLCAyMDApKS5lYXNpbmcoY2MuZWFzZUN1YmljQWN0aW9uT3V0KCkpO1xuICAgICAgICB0aGlzLm1vdmVEb3duQWN0aW9uID0gY2MubW92ZUJ5KDEsIGNjLnAoMCwgLTIwMCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKHRoaXMuc3F1YXNoQWN0aW9uLCB0aGlzLnN0cmV0Y2hBY3Rpb24sIHRoaXMubW92ZVVwQWN0aW9uLCB0aGlzLnNjYWxlQmFja0FjdGlvbiwgdGhpcy5tb3ZlRG93bkFjdGlvbiwgdGhpcy5zcXVhc2hBY3Rpb24sIHRoaXMuc2NhbGVCYWNrQWN0aW9uKTtcbiAgICAgICAgLy8gdGhpcyBpcyBhIHRlbXAgYXBpIHdoaWNoIHdpbGwgYmUgY29tYmluZWQgdG8gY2MuTm9kZVxuICAgICAgICB0aGlzLmp1bXBlci5ydW5BY3Rpb24oc2VxKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdjM2Y5NzFpeUNkSWg2eGRhTzQ5WFAwRicsICdTaW1wbGVLZXlib2FyZE1vdmVtZW50Jyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAxX3BsYXllcl9jb250cm9sXFxTaW1wbGVLZXlib2FyZE1vdmVtZW50LmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICBzaGVlcDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgLy8gc2V0IGluaXRpYWwgbW92ZSBkaXJlY3Rpb25cbiAgICAgICAgc2VsZi50dXJuUmlnaHQoKTtcblxuICAgICAgICAvL2FkZCBrZXlib2FyZCBpbnB1dCBsaXN0ZW5lciB0byBjYWxsIHR1cm5MZWZ0IGFuZCB0dXJuUmlnaHRcbiAgICAgICAgY2MuZXZlbnRNYW5hZ2VyLmFkZExpc3RlbmVyKHtcbiAgICAgICAgICAgIGV2ZW50OiBjYy5FdmVudExpc3RlbmVyLktFWUJPQVJELFxuICAgICAgICAgICAgb25LZXlQcmVzc2VkOiBmdW5jdGlvbiBvbktleVByZXNzZWQoa2V5Q29kZSwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGtleUNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkuYTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBjYy5LRVkubGVmdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0dXJuIGxlZnQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYudHVybkxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5kOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIGNjLktFWS5yaWdodDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0dXJuIHJpZ2h0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnR1cm5SaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCBzZWxmLm5vZGUpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLnNoZWVwLnggKz0gdGhpcy5zcGVlZCAqIGR0O1xuICAgIH0sXG5cbiAgICB0dXJuTGVmdDogZnVuY3Rpb24gdHVybkxlZnQoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAtMTAwO1xuICAgICAgICB0aGlzLnNoZWVwLnNjYWxlWCA9IDE7XG4gICAgfSxcblxuICAgIHR1cm5SaWdodDogZnVuY3Rpb24gdHVyblJpZ2h0KCkge1xuICAgICAgICB0aGlzLnNwZWVkID0gMTAwO1xuICAgICAgICB0aGlzLnNoZWVwLnNjYWxlWCA9IC0xO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJjYy5fUkZwdXNoKG1vZHVsZSwgJzkwYWVkODZYdTFEWm9hZXZGZGN0aFkzJywgJ1Nwcml0ZUZvbGxvd1RvdWNoJyk7XG4vLyBjYXNlc1xcMDNfZ2FtZXBsYXlcXDAxX3BsYXllcl9jb250cm9sXFxTcHJpdGVGb2xsb3dUb3VjaC5qc1xuXG4ndXNlIHN0cmljdCc7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgdG91Y2hMb2NhdGlvbkRpc3BsYXk6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG4gICAgICAgIGZvbGxvd2VyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG4gICAgICAgIGZvbGxvd1NwZWVkOiAwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNlbGYubW92ZVRvUG9zID0gY2MucCgwLCAwKTtcbiAgICAgICAgc2VsZi5pc01vdmluZyA9IGZhbHNlO1xuICAgICAgICBjYy5ldmVudE1hbmFnZXIuYWRkTGlzdGVuZXIoe1xuICAgICAgICAgICAgZXZlbnQ6IGNjLkV2ZW50TGlzdGVuZXIuVE9VQ0hfT05FX0JZX09ORSxcbiAgICAgICAgICAgIG9uVG91Y2hCZWdhbjogZnVuY3Rpb24gb25Ub3VjaEJlZ2FuKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciB0b3VjaExvYyA9IHRvdWNoLmdldExvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgc2VsZi5pc01vdmluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5tb3ZlVG9Qb3MgPSBzZWxmLmZvbGxvd2VyLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0b3VjaExvYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7IC8vIGRvbid0IGNhcHR1cmUgZXZlbnRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoTW92ZWQ6IGZ1bmN0aW9uIG9uVG91Y2hNb3ZlZCh0b3VjaCwgZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2hMb2MgPSB0b3VjaC5nZXRMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbGYudG91Y2hMb2NhdGlvbkRpc3BsYXkuc3RyaW5nID0gJ3RvdWNoICgnICsgTWF0aC5mbG9vcih0b3VjaExvYy54KSArICcsICcgKyBNYXRoLmZsb29yKHRvdWNoTG9jLnkpICsgJyknO1xuICAgICAgICAgICAgICAgIHNlbGYubW92ZVRvUG9zID0gc2VsZi5mb2xsb3dlci5wYXJlbnQuY29udmVydFRvTm9kZVNwYWNlQVIodG91Y2hMb2MpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hFbmRlZDogZnVuY3Rpb24gb25Ub3VjaEVuZGVkKHRvdWNoLCBldmVudCkge1xuICAgICAgICAgICAgICAgIHNlbGYuaXNNb3ZpbmcgPSBmYWxzZTsgLy8gd2hlbiB0b3VjaCBlbmRlZCwgc3RvcCBtb3ZpbmdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgc2VsZi5ub2RlKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW92aW5nKSByZXR1cm47XG4gICAgICAgIHZhciBvbGRQb3MgPSB0aGlzLmZvbGxvd2VyLnBvc2l0aW9uO1xuICAgICAgICAvLyBnZXQgbW92ZSBkaXJlY3Rpb25cbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IGNjLnBOb3JtYWxpemUoY2MucFN1Yih0aGlzLm1vdmVUb1Bvcywgb2xkUG9zKSk7XG4gICAgICAgIC8vIG11bHRpcGx5IGRpcmVjdGlvbiB3aXRoIGRpc3RhbmNlIHRvIGdldCBuZXcgcG9zaXRpb25cbiAgICAgICAgdmFyIG5ld1BvcyA9IGNjLnBBZGQob2xkUG9zLCBjYy5wTXVsdChkaXJlY3Rpb24sIHRoaXMuZm9sbG93U3BlZWQgKiBkdCkpO1xuICAgICAgICAvLyBzZXQgbmV3IHBvc2l0aW9uXG4gICAgICAgIHRoaXMuZm9sbG93ZXIuc2V0UG9zaXRpb24obmV3UG9zKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICc5NTAyMVg1S2p4UDM2OU9PTmUzMTZzSCcsICdUb3VjaERyYWdnZXInKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDAzX2V2ZW50c1xcVG91Y2hEcmFnZ2VyLmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgVG91Y2hEcmFnZ2VyID0gY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHByb3BhZ2F0ZToge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gLi4uXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTYwO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgfSwgdGhpcy5ub2RlKTtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdGhpcy5vcGFjaXR5ID0gMjU1O1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gZXZlbnQudG91Y2guZ2V0RGVsdGEoKTtcbiAgICAgICAgICAgIHRoaXMueCArPSBkZWx0YS54O1xuICAgICAgICAgICAgdGhpcy55ICs9IGRlbHRhLnk7XG4gICAgICAgICAgICBpZiAodGhpcy5nZXRDb21wb25lbnQoVG91Y2hEcmFnZ2VyKS5wcm9wYWdhdGUpIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9LCB0aGlzLm5vZGUpO1xuICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm9wYWNpdHkgPSAxNjA7XG4gICAgICAgIH0sIHRoaXMubm9kZSk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnYTE0YmZhRCtnUkpLclRWakt3aXRjNTMnLCAnVG91Y2hFdmVudCcpO1xuLy8gY2FzZXNcXDA1X3NjcmlwdGluZ1xcMDNfZXZlbnRzXFxUb3VjaEV2ZW50LmpzXG5cblwidXNlIHN0cmljdFwiO1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIF9jYWxsYmFjazogbnVsbCxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDEwMDtcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9DQU5DRUwsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMTAwO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiY2MuX1JGcHVzaChtb2R1bGUsICdkOWJmNmJGYit0Rjc3OXN0TEVtanpUVicsICdWYWx1ZVR5cGVQcm9wZXJ0aWVzJyk7XG4vLyBjYXNlc1xcMDVfc2NyaXB0aW5nXFwwMV9wcm9wZXJ0aWVzXFxWYWx1ZVR5cGVQcm9wZXJ0aWVzLmpzXG5cbid1c2Ugc3RyaWN0JztcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBudW1iZXJcbiAgICAgICAgbXlOdW1iZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogMCxcbiAgICAgICAgICAgIHR5cGU6IE51bWJlclxuICAgICAgICB9LFxuICAgICAgICAvLyBzdHJpbmdcbiAgICAgICAgbXlTdHJpbmc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogJ2RlZmF1bHQgdGV4dCcsXG4gICAgICAgICAgICB0eXBlOiBTdHJpbmdcbiAgICAgICAgfSxcbiAgICAgICAgbXlWZWMyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IGNjLlZlYzIuWkVSTyxcbiAgICAgICAgICAgIHR5cGU6IGNjLlZlYzJcbiAgICAgICAgfSxcbiAgICAgICAgbXlDb2xvcjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBjYy5Db2xvci5XSElURSxcbiAgICAgICAgICAgIHR5cGU6IGNjLkNvbG9yXG4gICAgICAgIH0sXG4gICAgICAgIG15T3RoZXJOdW1iZXI6IDAsXG4gICAgICAgIG15T3RoZXJTdHJpbmc6ICdubyB0eXBlIGRlZmluaXRpb24nLFxuICAgICAgICBteU90aGVyVmVjMjogY2MuVmVjMi5PTkUsXG4gICAgICAgIG15T3RoZXJDb2xvcjogY2MuQ29sb3IuQkxBQ0tcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsImNjLl9SRnB1c2gobW9kdWxlLCAnOTMwZGVJbXhvWklrcDZ1Z2pNVTVVTFcnLCAnc2NoZWR1bGVDYWxsYmFja3MnKTtcbi8vIGNhc2VzXFwwNV9zY3JpcHRpbmdcXDA0X3NjaGVkdWxlclxcc2NoZWR1bGVDYWxsYmFja3MuanNcblxuJ3VzZSBzdHJpY3QnO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIHRpbWU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogNVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIF9jYWxsYmFjazogZnVuY3Rpb24gX2NhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLm5vZGUucnVuQWN0aW9uKHRoaXMuc2VxKTtcbiAgICAgICAgaWYgKHRoaXMucmVwZWF0KSB7XG4gICAgICAgICAgICB0aGlzLmNvdW50aW5nID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRpbWUgPSA1O1xuICAgICAgICB0aGlzLmNvdW50ZXIuc3RyaW5nID0gdGhpcy50aW1lLnRvRml4ZWQoMikgKyAnIHMnO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdmFyIHNxdWFzaEFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAwLjYpO1xuICAgICAgICB2YXIgc3RyZXRjaEFjdGlvbiA9IGNjLnNjYWxlVG8oMC4yLCAxLCAxLjIpO1xuICAgICAgICB2YXIgc2NhbGVCYWNrQWN0aW9uID0gY2Muc2NhbGVUbygwLjEsIDEsIDEpO1xuICAgICAgICB2YXIgbW92ZVVwQWN0aW9uID0gY2MubW92ZUJ5KDEsIGNjLnAoMCwgMTAwKSkuZWFzaW5nKGNjLmVhc2VDdWJpY0FjdGlvbk91dCgpKTtcbiAgICAgICAgdmFyIG1vdmVEb3duQWN0aW9uID0gY2MubW92ZUJ5KDEsIGNjLnAoMCwgLTEwMCkpLmVhc2luZyhjYy5lYXNlQ3ViaWNBY3Rpb25JbigpKTtcbiAgICAgICAgdGhpcy5zZXEgPSBjYy5zZXF1ZW5jZShzcXVhc2hBY3Rpb24sIHN0cmV0Y2hBY3Rpb24sIG1vdmVVcEFjdGlvbiwgc2NhbGVCYWNrQWN0aW9uLCBtb3ZlRG93bkFjdGlvbiwgc3F1YXNoQWN0aW9uLCBzY2FsZUJhY2tBY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuY291bnRlciA9IGNjLmZpbmQoJ0NhbnZhcy9jb3VudF9sYWJlbCcpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgICAgIHRoaXMuY291bnRlci5zdHJpbmcgPSB0aGlzLnRpbWUudG9GaXhlZCgyKSArICcgcyc7XG4gICAgICAgIHRoaXMuY291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgaWYgKHRoaXMuY291bnRpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudGltZSAtPSBkdDtcbiAgICAgICAgICAgIHRoaXMuY291bnRlci5zdHJpbmcgPSB0aGlzLnRpbWUudG9GaXhlZCgyKSArICcgcyc7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcENvdW50aW5nOiBmdW5jdGlvbiBzdG9wQ291bnRpbmcoKSB7XG4gICAgICAgIHRoaXMudW5zY2hlZHVsZSh0aGlzLl9jYWxsYmFjayk7XG4gICAgICAgIHRoaXMuY291bnRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb3VudGVyLnN0cmluZyA9ICc1LjAwIHMnO1xuICAgICAgICB0aGlzLnRpbWUgPSA1O1xuICAgIH0sXG5cbiAgICByZXBlYXRTY2hlZHVsZTogZnVuY3Rpb24gcmVwZWF0U2NoZWR1bGUoKSB7XG4gICAgICAgIHRoaXMuc3RvcENvdW50aW5nKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUodGhpcy5fY2FsbGJhY2ssIDUpO1xuICAgICAgICB0aGlzLnJlcGVhdCA9IHRydWU7XG4gICAgICAgIHRoaXMuY291bnRpbmcgPSB0cnVlO1xuICAgIH0sXG5cbiAgICBvbmVTY2hlZHVsZTogZnVuY3Rpb24gb25lU2NoZWR1bGUoKSB7XG4gICAgICAgIHRoaXMuc3RvcENvdW50aW5nKCk7XG4gICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuX2NhbGxiYWNrLCA1KTtcbiAgICAgICAgdGhpcy5yZXBlYXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb3VudGluZyA9IHRydWU7XG4gICAgfSxcblxuICAgIGNhbmNlbFNjaGVkdWxlczogZnVuY3Rpb24gY2FuY2VsU2NoZWR1bGVzKCkge1xuICAgICAgICB0aGlzLnJlcGVhdCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN0b3BDb3VudGluZygpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiXX0=
