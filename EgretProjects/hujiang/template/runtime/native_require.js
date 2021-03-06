
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/common/BaseScene.js",
	"bin-debug/com/common/CMovieClip.js",
	"bin-debug/com/common/LayerManager.js",
	"bin-debug/com/common/LoadManager.js",
	"bin-debug/com/common/ObjectPool.js",
	"bin-debug/com/constant/GameConst.js",
	"bin-debug/com/GameManager.js",
	"bin-debug/com/view/game/BasePill.js",
	"bin-debug/com/view/game/Pill.js",
	"bin-debug/com/view/game/Pill10.js",
	"bin-debug/com/view/game/Pill5.js",
	"bin-debug/com/view/game/Player.js",
	"bin-debug/com/view/game/PoisonPill.js",
	"bin-debug/com/view/loading/EatMC.js",
	"bin-debug/com/view/loading/LoadingUI.js",
	"bin-debug/com/view/loading/PillMC.js",
	"bin-debug/com/view/scene/GameScene.js",
	"bin-debug/com/view/scene/HomeScene.js",
	"bin-debug/com/view/scene/IntroduceScene.js",
	"bin-debug/com/view/scene/LoseScene.js",
	"bin-debug/com/view/scene/PreloadScene.js",
	"bin-debug/com/view/scene/RoleScene.js",
	"bin-debug/com/view/scene/WinScene.js",
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
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1140,
		showPaintRect: false,
		showFPS: true,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
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