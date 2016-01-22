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