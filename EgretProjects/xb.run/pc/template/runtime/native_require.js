
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
	"bin-debug/com/constant/GameConst.js",
	"bin-debug/com/GameManager.js",
	"bin-debug/com/net/ClientSocket.js",
	"bin-debug/com/utils/manager/LayerManager.js",
	"bin-debug/com/utils/manager/LoadManager.js",
	"bin-debug/com/utils/manager/SoundManager.js",
	"bin-debug/com/utils/manager/UserManager.js",
	"bin-debug/com/utils/manager/UserVO.js",
	"bin-debug/com/utils/scene/BaseScene.js",
	"bin-debug/com/utils/scene/BaseUI.js",
	"bin-debug/com/utils/tool/ArrayTool.js",
	"bin-debug/com/utils/tool/HttpUtil.js",
	"bin-debug/com/utils/tool/NumberTool.js",
	"bin-debug/com/utils/tool/ObjectPool.js",
	"bin-debug/com/utils/tool/QRCodeLoader.js",
	"bin-debug/com/utils/tool/ShakeTool.js",
	"bin-debug/com/utils/tool/StringTool.js",
	"bin-debug/com/utils/ui/SimpleMC.js",
	"bin-debug/com/view/game/GameScene.js",
	"bin-debug/com/view/game/item/BaseItem.js",
	"bin-debug/com/view/game/item/Banana.js",
	"bin-debug/com/view/game/item/Carrot.js",
	"bin-debug/com/view/game/item/HighWood.js",
	"bin-debug/com/view/game/item/LowWood.js",
	"bin-debug/com/view/game/item/Mice.js",
	"bin-debug/com/view/game/item/Stone.js",
	"bin-debug/com/view/game/item/Water.js",
	"bin-debug/com/view/game/ui/GameHead.js",
	"bin-debug/com/view/game/ui/Grass.js",
	"bin-debug/com/view/game/ui/HeadUI.js",
	"bin-debug/com/view/game/ui/Player.js",
	"bin-debug/com/view/game/ui/ScoreUI.js",
	"bin-debug/com/view/game/ui/TrackData.js",
	"bin-debug/com/view/home/HomeScene.js",
	"bin-debug/com/view/lock/LockScene.js",
	"bin-debug/com/view/preload/PreloadScene.js",
	"bin-debug/com/view/result/ResultScene.js",
	"bin-debug/com/view/result/ui/RankHead.js",
	"bin-debug/com/view/result/ui/ScoreHead.js",
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
		scaleMode: "showAll",
		contentWidth: 1920,
		contentHeight: 1080,
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