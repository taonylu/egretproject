//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
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
    /**预加载界面*/
    private preloadScene: PreloadScene;
    
    protected createChildren(): void {
        super.createChildren();
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter",assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        
        //版本控制
        App.VersionManager.init();
        
        //加载资源配置
        App.ResUtils.addConfig("resource/default.res.json", "resource/");
        App.ResUtils.loadConfig(this.onConfigComplete, this);
    }
    
    //加载exml主题
    private onConfigComplete(event:RES.ResourceEvent):void {
        let theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
    }
    
    //加载预加载资源
    private onThemeLoadComplete(): void {
        App.ResUtils.loadGroup(AssetConst.Preload,this.onPreloadComplete, this);
    }
    
    private onPreloadComplete(event:RES.ResourceEvent):void {
        //舞台适配模式
        App.StageUtils.init(this.stage);
        App.StageUtils.changeStageMode();
        
        //显示预加载界面
        this.preloadScene = new PreloadScene();
        this.addChild(this.preloadScene);
        
        //加载主页和游戏资源
        var groups = [AssetConst.Home, AssetConst.Game, AssetConst.Result, AssetConst.Sound];
        App.ResUtils.loadGroups("AllRes", groups, this.onResComplete, this.onResProgress, this);
    }
    
    private onResProgress(e:RES.ResourceEvent){
        this.preloadScene.setProgress(Math.round(e.itemsLoaded/e.itemsTotal*100));
    }
    
    private onResComplete(){
        //移除预加载界面
        this.removeChild(this.preloadScene);
        this.preloadScene = null;
        
        //启动游戏
        App.getInstance().startup();
        
        egret.log("舞台宽度:",this.stage.stageWidth);
        egret.log("舞台高度:",this.stage.stageHeight);
        egret.log("当前是否手机运行:",App.DeviceUtils.isMoile);
    }
}











