/**
*  文 件 名：GameScene.ts
*  功    能：主页场景
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/9/17
*  修改日期：2015/9/17
*  修改日志：
*/
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        _super.call(this);
        this.rankLabelNum = 5; //排行榜列表
        this.rankLabelList = new Array(); //排行榜数组
        this.skinName = skins.scene.GameSceneSkin;
        this.gameSprite = new GameSprite();
    }
    var __egretProto__ = GameScene.prototype;
    __egretProto__.childrenCreated = function () {
        this.initView();
        this.onEnable();
    };
    __egretProto__.onEnable = function () {
        this.gameSprite.startGame();
        this.configListeners();
    };
    __egretProto__.onRemove = function () {
        this.deConfigListeners();
    };
    __egretProto__.configListeners = function () {
        this.fenlieBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFenLieBtnClick, this);
        this.tupaopaoBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuPaoPaoBtnClick, this);
    };
    __egretProto__.deConfigListeners = function () {
        this.fenlieBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFenLieBtnClick, this);
        this.tupaopaoBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuPaoPaoBtnClick, this);
    };
    __egretProto__.onFenLieBtnClick = function () {
        this.gameSprite.sendFenLie();
    };
    __egretProto__.onTuPaoPaoBtnClick = function () {
        this.gameSprite.sendTuPaoPao();
    };
    //初始化视图
    __egretProto__.initView = function () {
        //添加游戏容器
        var uiAsset = new egret.gui.UIAsset(this.gameSprite);
        uiAsset.touchEnabled = false;
        uiAsset.touchChildren = false;
        this.contentGroup.addElement(uiAsset);
        this.gameSprite.gameScene = this;
        this.topSprite = new egret.DisplayObjectContainer();
        this.topSprite.touchEnabled = false;
        this.topSprite.touchChildren = false;
        var topUIAsset = new egret.gui.UIAsset(this.topSprite);
        topUIAsset.touchChildren = false;
        topUIAsset.touchEnabled = false;
        this.contentGroup.addElement(topUIAsset);
        this.gameSprite.topSprite = this.topSprite;
        for (var i = 0; i < this.rankLabelNum; i++) {
            this.rankLabelList.push(this["rank" + i + "Label"]);
        }
        this.fenlieBtn.setMode(NarrowButton.MODE_BIG);
        this.tupaopaoBtn.setMode(NarrowButton.MODE_BIG);
    };
    //设置排行榜
    __egretProto__.setRankLabel = function () {
        var playerM = PlayerManager.getInstance();
        var weightList = playerM.weightList;
        var tempArr = new Array();
        for (var i in weightList) {
            var player = playerM.getOneSporeByUserID(i);
            if (player != null) {
                var userName = player.userName;
                tempArr.push([userName, weightList[i]]);
            }
        }
        //排序
        var len = tempArr.length;
        for (i = 0; i < len; i++) {
            for (var j = i + 1; j < len; j++) {
                if (tempArr[i][1] < tempArr[j][1]) {
                    var temp = tempArr[i];
                    tempArr[i] = tempArr[j];
                    tempArr[j] = temp;
                }
            }
        }
        for (i = 0; i < this.rankLabelNum; i++) {
            if (tempArr[i] != null) {
                this.rankLabelList[i].text = tempArr[i][0];
            }
            else {
                this.rankLabelList[i].text = "";
            }
        }
    };
    //设置重量文本
    __egretProto__.setWeightLabel = function (weight) {
        this.weightLabel.text = "体重：" + weight + "毫克";
    };
    //设置顶部文本
    __egretProto__.setTopLabel = function (msg) {
        this.topLabel.text = msg;
    };
    return GameScene;
})(BaseScene);
GameScene.prototype.__class__ = "GameScene";
