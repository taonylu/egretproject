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

    private path:string = "";  //路由路径
    
    protected createChildren(): void {
        super.createChildren();
        
        this.path = window["addon_public_path"];
        
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        var path: string = window["addon_public_path"];
        RES.loadConfig(this.path + "resource/default.res.json?ver=1.1", this.path + "resource/");
        
    }
    
    //配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme(this.path + "resource/default.thm.json?ver=1.1", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }

    //主题文件加载完成,开始预加载
    private onThemeLoadComplete(): void {
        LoadManager.getInstance().loadGroup("preload",this, this.onPreloadComplete);
    }

    
    private preloadScene:PreloadScene;
    
    //preload资源组加载完成
    private onPreloadComplete(event:RES.ResourceEvent):void {
        this.preloadScene = new PreloadScene();
        this.addChild(this.preloadScene);
        LoadManager.getInstance().loadGroup("game",this,this.onGameComplete,this.onGameProgress);
    }
    
    //game资源组加载进度
    private onGameProgress(event: RES.ResourceEvent): void {
        this.preloadScene.setProgress(Math.round(event.itemsLoaded/event.itemsTotal*100));
    }
    
    //game资源组加载进度
    private onGameComplete(event: RES.ResourceEvent): void {
        //销毁预加载界面
        this.preloadScene.stopAnim();
        this.removeChild(this.preloadScene);
        this.preloadScene = null;
        //启动游戏
        GameManager.getInstance().startup(this);
    }

}










