
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/weixinapi/weixinapi.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/constant/GameConst.js",
	"bin-debug/com/GameManager.js",
	"bin-debug/com/utils/manager/LayerManager.js",
	"bin-debug/com/utils/manager/LoadManager.js",
	"bin-debug/com/utils/manager/MapManager.js",
	"bin-debug/com/utils/scene/BaseScene.js",
	"bin-debug/com/utils/scene/BaseUI.js",
	"bin-debug/com/utils/tool/DateTimer.js",
	"bin-debug/com/utils/tool/HttpUtil.js",
	"bin-debug/com/utils/tool/ObjectPool.js",
	"bin-debug/com/utils/ui/SimpleMC.js",
	"bin-debug/com/utils/weixin/WeiXin.js",
	"bin-debug/com/view/game/BaseItem.js",
	"bin-debug/com/view/game/Bee.js",
	"bin-debug/com/view/game/GameScene.js",
	"bin-debug/com/view/game/Item2.js",
	"bin-debug/com/view/game/Item5.js",
	"bin-debug/com/view/game/Score2.js",
	"bin-debug/com/view/game/Score5.js",
	"bin-debug/com/view/home/GameBg.js",
	"bin-debug/com/view/home/HomeScene.js",
	"bin-debug/com/view/home/PrizePanel.js",
	"bin-debug/com/view/home/RankPanel.js",
	"bin-debug/com/view/home/RulePanel.js",
	"bin-debug/com/view/home/TeamForm.js",
	"bin-debug/com/view/preload/PreloadScene.js",
	"bin-debug/com/view/result/LuckForm.js",
	"bin-debug/com/view/result/PrizeGrid.js",
	"bin-debug/com/view/result/ResultScene.js",
	"bin-debug/com/view/share/SharePanel.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "fixedHeight",
		contentWidth: 800,
		contentHeight: 480,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: true,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};