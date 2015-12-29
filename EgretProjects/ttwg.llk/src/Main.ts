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

class Main extends egret.Sprite {
    
    private loadText: egret.TextField;
    
    public constructor() {
        super();
        
        this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
    }
    
    //初始化界面
    private onAddToStage(): void {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json","resource/");

        this.loadText = new egret.TextField();
        this.loadText.textAlign = egret.HorizontalAlign.CENTER;
        this.loadText.width = 100;
        this.loadText.x = this.stage.stageWidth / 2 - this.loadText.width/2;
        this.loadText.y = this.stage.stageHeight / 2;
        this.loadText.textColor = 0x000000;
        this.addChild(this.loadText);
        
        GameConst.stage = this.stage;
    }

    //配置文件加载完成,开始预加载preload资源组。
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.loadGroupComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadGroupProgress,this);
        RES.loadGroup("preload");
    }
   
    //preload资源组加载进度
    private loadGroupProgress(event:RES.ResourceEvent):void {
        this.loadText.text = event.itemsLoaded + "/" + event.itemsTotal;
    }
    
    //preload资源组加载完成
    private loadGroupComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadGroupComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.loadGroupProgress,this); 

        this.removeChild(this.loadText);
        
        var gameScene: GameScene = new GameScene();
        gameScene.show();
    }
}






