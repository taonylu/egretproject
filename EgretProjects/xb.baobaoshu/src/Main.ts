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

class Main extends eui.UILayer {

    protected createChildren(): void {
        super.createChildren();

        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
   
    //配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        //this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.OFF;
        
        LoadManager.getInstance().loadGroup("preload",this,this.onPreloadComplete);
    }
    private isThemeLoadEnd: boolean = false;
    
    //主题文件加载完成,开始预加载
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.loadGameResource();
    }
    
    private isPreloadEnd: boolean = false;
    
    //preload资源组加载完成
    private onPreloadComplete(event:RES.ResourceEvent):void {
        this.isPreloadEnd = true;
        this.loadGameResource();
    }
    
    private preloadScene: PreloadScene;
    
    //加载game资源组
    private loadGameResource(){
        if(this.isThemeLoadEnd && this.isPreloadEnd){
            this.preloadScene = new PreloadScene();
            this.addChild(this.preloadScene);
            //LoadManager.getInstance().loadGroup("game",this,this.onGameResourceComplete,this.onGameResourceProgress,this.onGameResourceError);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onGameResourceComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onGameResourceError,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onGameResourceProgress,this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,this.onItemLoadError,this);
            RES.loadGroup("game");
        }
    }
    
    private onGameResourceError(e: RES.ResourceEvent) {
        alert("error:" + e.itemsLoaded + "," + e.resItem);
    }
    
    private onItemLoadError(e: RES.ResourceEvent): void {
        alert("item error:" + e.itemsLoaded);
    }
    
    //game资源组加载进度
    private onGameResourceProgress(event: RES.ResourceEvent): void {
        
        this.preloadScene.setProcessLabel(Math.round((event.itemsLoaded / event.itemsTotal) * 100));
    }

    //game资源组加载完成
    private onGameResourceComplete(event: RES.ResourceEvent): void {
        this.removeChild(this.preloadScene);
        GameManager.getInstance().startup(this);
    }

}






