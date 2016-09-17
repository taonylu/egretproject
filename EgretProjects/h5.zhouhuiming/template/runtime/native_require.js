
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/App.js",
	"bin-debug/com/component/BaseScene.js",
	"bin-debug/com/component/ItemScroll.js",
	"bin-debug/com/utils/GestureMove.js",
	"bin-debug/com/utils/LayerManager.js",
	"bin-debug/com/utils/NumberTool.js",
	"bin-debug/com/utils/SceneManager.js",
	"bin-debug/com/utils/SoundManager.js",
	"bin-debug/com/utils/StageUtil.js",
	"bin-debug/com/view/SceneA.js",
	"bin-debug/com/view/SceneB.js",
	"bin-debug/com/view/SceneC.js",
	"bin-debug/com/view/SceneD.js",
	"bin-debug/com/view/SceneE.js",
	"bin-debug/com/view/SceneF.js",
	"bin-debug/com/view/SceneG.js",
	"bin-debug/com/view/ScrollScene.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	//----auto game_file_list end----
];

var window = this;

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
		frameRate: 30,
		scaleMode: "fixedNarrow",
		contentWidth: 640,
		contentHeight: 1040,
		showPaintRect: false,
		showFPS: false,
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