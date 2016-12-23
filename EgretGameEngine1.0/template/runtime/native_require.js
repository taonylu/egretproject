
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/eui/eui.js",
	"libs/modules/res/res.js",
	"libs/modules/tween/tween.js",
	"libs/modules/socket/socket.js",
	"bin-debug/framework/base/SingleClass.js",
	"bin-debug/App.js",
	"bin-debug/framework/adapter/AssetAdapter.js",
	"bin-debug/framework/adapter/ThemeAdapter.js",
	"bin-debug/framework/display/BasePanel.js",
	"bin-debug/framework/display/BaseScene.js",
	"bin-debug/framework/display/IBaseUI.js",
	"bin-debug/framework/mvc/BaseApp.js",
	"bin-debug/framework/mvc/BaseController.js",
	"bin-debug/framework/net/ClientSocket.js",
	"bin-debug/framework/net/Http.js",
	"bin-debug/framework/utils/ArrayTool.js",
	"bin-debug/framework/utils/DeviceUtils.js",
	"bin-debug/framework/utils/EventManager.js",
	"bin-debug/framework/utils/LayerManager.js",
	"bin-debug/framework/utils/NumberTool.js",
	"bin-debug/framework/utils/ObjectPool.js",
	"bin-debug/framework/utils/PanelManager.js",
	"bin-debug/framework/utils/ResUtils.js",
	"bin-debug/framework/utils/StageUtils.js",
	"bin-debug/framework/utils/StringTool.js",
	"bin-debug/framework/utils/VersionManager.js",
	"bin-debug/game/constant/SocketConst.js",
	"bin-debug/game/model/DataCenter.js",
	"bin-debug/Main.js",
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
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        var result = egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
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
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};