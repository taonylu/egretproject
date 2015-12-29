
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/gui/gui.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"libs/modules/ui_gui/ui_gui.js",
	"libs/modules/tool/tool.js",
	"libs/modules/puremvc/puremvc.js",
	"libs/modules/websocket/websocket.js",
	"bin-debug/ApplicationFacade.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/common/MCFactory.js",
	"bin-debug/common/NameFactory.js",
	"bin-debug/common/PlayerManager.js",
	"bin-debug/common/UserManager.js",
	"bin-debug/constant/CommandConst.js",
	"bin-debug/constant/GameConst.js",
	"bin-debug/constant/NetConst.js",
	"bin-debug/controller/StartupCommand.js",
	"bin-debug/Main.js",
	"bin-debug/model/RevCreateRect.js",
	"bin-debug/model/RevEatPaoPao.js",
	"bin-debug/model/RevEatPlayer.js",
	"bin-debug/model/RevEatRect.js",
	"bin-debug/model/RevFenLie.js",
	"bin-debug/model/RevJoinPlayer.js",
	"bin-debug/model/RevMovePlaye.js",
	"bin-debug/model/RevPlayerLeave.js",
	"bin-debug/model/RevStartGame.js",
	"bin-debug/model/RevTuPaoPao.js",
	"bin-debug/model/SendEatPaoPao.js",
	"bin-debug/model/SendEatPlayer.js",
	"bin-debug/model/SendEatRect.js",
	"bin-debug/model/SendFenLie.js",
	"bin-debug/model/SendMovePlayer.js",
	"bin-debug/model/SendStartGame.js",
	"bin-debug/model/SendTuPaoPao.js",
	"bin-debug/skins/scene/GameSceneSkin.g.js",
	"bin-debug/skins/scene/HomeSceneSkin.g.js",
	"bin-debug/skins/scene/LoadSceneSkin.g.js",
	"bin-debug/skins/ui/BeEatenUISkin.g.js",
	"bin-debug/skins/ui/FenLieSkin.g.js",
	"bin-debug/skins/ui/PopupBoxUISkin.g.js",
	"bin-debug/skins/ui/RandomNameSkin.g.js",
	"bin-debug/skins/ui/StartBtnSkin.g.js",
	"bin-debug/skins/ui/TuPaoPaoSkin.g.js",
	"bin-debug/view/gameElement/BaseSpore.js",
	"bin-debug/view/gameElement/AISpore.js",
	"bin-debug/view/gameElement/PaoPao.js",
	"bin-debug/view/gameElement/Rect.js",
	"bin-debug/view/GameMediator.js",
	"bin-debug/view/HomeMediator.js",
	"bin-debug/view/LoadingMediator.js",
	"bin-debug/view/scene/GameScene.js",
	"bin-debug/view/scene/HomeScene.js",
	"bin-debug/view/scene/LoadingScene.js",
	"bin-debug/view/ui/BeEatenUI.js",
	"bin-debug/view/ui/GameSprite.js",
	"bin-debug/view/ui/HandleUI.js",
	"bin-debug/view/ui/LoadingUI.js",
	"bin-debug/view/ui/NarrowButton.js",
	"bin-debug/view/ui/PopupBoxUI.js",
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
		contentWidth: 850,
		contentHeight: 480,
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