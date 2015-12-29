//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.isThemeLoadEnd = false;
        this.isPreloadEnd = false;
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    //配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        //this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        LoadManager.getInstance().loadGroup("preload", this, this.onPreloadComplete);
    };
    //主题文件加载完成,开始预加载
    p.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.loadGameResource();
    };
    //preload资源组加载完成
    p.onPreloadComplete = function (event) {
        this.isPreloadEnd = true;
        this.loadGameResource();
    };
    //加载game资源组
    p.loadGameResource = function () {
        if (this.isThemeLoadEnd && this.isPreloadEnd) {
            this.preloadScene = new PreloadScene();
            this.addChild(this.preloadScene);
            //LoadManager.getInstance().loadGroup("game",this,this.onGameResourceComplete,this.onGameResourceProgress,this.onGameResourceError);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onGameResourceComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onGameResourceError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onGameResourceProgress, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup("game");
        }
    };
    p.onGameResourceError = function (e) {
        alert("error:" + e.itemsLoaded + "," + e.resItem);
    };
    p.onItemLoadError = function (e) {
        alert("item error:" + e.itemsLoaded);
    };
    //game资源组加载进度
    p.onGameResourceProgress = function (event) {
        this.preloadScene.setProcessLabel(Math.round((event.itemsLoaded / event.itemsTotal) * 100));
    };
    //game资源组加载完成
    p.onGameResourceComplete = function (event) {
        this.removeChild(this.preloadScene);
        GameManager.getInstance().startup(this);
    };
    return Main;
})(eui.UILayer);
egret.registerClass(Main,'Main');
