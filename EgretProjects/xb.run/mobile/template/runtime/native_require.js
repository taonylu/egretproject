
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
	"libs/modules/socket.io/socket.io.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/common/BaseScene.js",
	"bin-debug/com/common/BaseUI.js",
	"bin-debug/com/common/HttpUtil.js",
	"bin-debug/com/common/LayerManager.js",
	"bin-debug/com/common/LoadManager.js",
	"bin-debug/com/common/UserManager.js",
	"bin-debug/com/constant/GameConst.js",
	"bin-debug/com/GameManager.js",
	"bin-debug/com/net/ClientSocket.js",
	"bin-debug/com/view/GameScene.js",
	"bin-debug/com/view/LockScene.js",
	"bin-debug/com/view/PreloadScene.js",
	"bin-debug/com/view/PrizeScene.js",
	"bin-debug/com/view/ResultScene.js",
	"bin-debug/com/view/ui/MessageBox.js",
	"bin-debug/com/view/ui/RankHead.js",
	"bin-debug/com/view/ui/ResultHead.js",
	"bin-debug/com/view/ui/SimpleButton.js",
	"bin-debug/LoadingUI.js",
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
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
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