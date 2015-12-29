
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/socket/socket.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/ui/ui.js",
	"libs/modules/tool/tool.js",
	"libs/modules/websocket/websocket.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/com/common/JsonManager.js",
	"bin-debug/com/common/MapManager.js",
	"bin-debug/com/constant/GameConst.js",
	"bin-debug/com/constant/NetConst.js",
	"bin-debug/com/GameManager.js",
	"bin-debug/com/view/GameScene.js",
	"bin-debug/com/view/HomeScene.js",
	"bin-debug/com/view/LevelScene.js",
	"bin-debug/com/view/LoadScene.js",
	"bin-debug/com/view/ui/BlockUI.js",
	"bin-debug/com/view/ui/BoomUI.js",
	"bin-debug/com/view/ui/GameWinUI.js",
	"bin-debug/com/view/ui/LevelBtnUI.js",
	"bin-debug/com/view/ui/RankUI.js",
	"bin-debug/com/view/ui/SelectUI.js",
	"bin-debug/com/view/ui/TitleUI.js",
	"bin-debug/Main.js",
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
		frameRate: 30,
		scaleMode: "fixedHeight",
		contentWidth: 563,
		contentHeight: 823,
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