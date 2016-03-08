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
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        super.createChildren();
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }
    private isThemeLoadEnd: boolean = false;
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the 
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }
    private isResourceLoadEnd: boolean = false;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    }
    private createScene(){
        if(this.isThemeLoadEnd && this.isResourceLoadEnd){
            this.startCreateScene();
        }
    }
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected startCreateScene(): void {
        //创建N个小球运动，来造成帧频降低卡顿的现象，在卡顿的情况下进行运动测试
        for (var i:number=0;i<2000;i++){
            var sp:egret.Sprite = this.getBall(100,0xff0000);
            sp.x = Math.random()*this.stage.stageWidth;
            sp.y = Math.random()*this.stage.stageHeight - 400;
            this.addChild(sp);
            egret.Tween.get(sp,{loop:true}).to({x:Math.random()*480,y:Math.random()*800-400},2000);
        }
        
        
        //测试目的：
        //1 测试在卡顿情况下基于帧率和时间的运动不一致问题
        //2 基于帧率运动，会随着帧率降低运动调用次数减少，而造成运动不一致问题
        //3 基于时间运动，帧率卡顿变化下，运动调用次数一致，不会造成运动不一致问题
        //4 推荐在追求不同帧率不一致时要求运动一致，使用基于时间片更新的方法
        this.tick();           //基于startTick
        this.enterFrame();     //基于事件enter_frame
        this.timerTest();      //基于计时器Timer
        this.getTimerTest();   //基于运行时间getTimer
        this.fixedUpdateTest();//基于时间片的更新
    }
    
    //以60FPS回调
    private tick(){
        var tickBall:egret.Sprite = this.getBall(10,0x00ff00);
        tickBall.x = 0;
        tickBall.y = 600;
        var tick = (delta: number): boolean => {
            tickBall.x += this.ballSpeed;
            return true;
        };
        egret.startTick(tick,this);
    }
    
    //enter_frame
    private enterBall:egret.Sprite = this.getBall(10,0x0000ff);
    private enterFrame(){
        this.enterBall.x = 0;
        this.enterBall.y = 620;
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    private onEnterFrame(){
        this.enterBall.x += this.ballSpeed;
    }
    
    //timer
    private timerBall:egret.Sprite = this.getBall(10,0x991100);
    private timerTest(){
        var t:egret.Timer = new egret.Timer(1000/60);
        t.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        t.start();
        this.timerBall.x = 0;
        this.timerBall.y = 640;
    }
    private onTimerHandler(){
        this.timerBall.x += this.ballSpeed;
    }
    
    //getTimer
    private temp = 0;
    private getTimerBall:egret.Sprite = this.getBall(10,0x223467);
    private getTimerTest(){
        this.getTimerBall.x = 0;
        this.getTimerBall.y = 660;
        this.temp = egret.getTimer();
        this.addEventListener(egret.Event.ENTER_FRAME,this.onGetTimer,this);
    }
    private onGetTimer(){
        var dist:number = (egret.getTimer() - this.temp);
        this.getTimerBall.x += dist/(1000/ this.stage.frameRate)*this.ballSpeed;
        this.temp = egret.getTimer();
    }
    
    //时间片更新
    private $previous: number; //以前时间
    private $curTime: number;  //当前时间
    private $passTime: number; //已过去时间
    private $accTime: number;  //累计时间
    private $dt: number;       //每帧耗时
    private fixedBall:egret.Sprite = this.getBall(10,0x119911);
    private fixedUpdateTest(){
        this.fixedBall.x = 0;
        this.fixedBall.y = 680;
        this.$previous = egret.getTimer();
        this.$accTime = 0;
        this.$dt = 1000 / this.stage.frameRate;
        this.addEventListener(egret.Event.ENTER_FRAME,this.onUpdateHandler,this);
    }
    private onUpdateHandler() {
        this.$curTime = egret.getTimer();
        this.$passTime = this.$curTime - this.$previous;
        this.$previous = this.$curTime;
        this.$accTime += this.$passTime;   //累计时间
        while(this.$accTime >= this.$dt) {
            this.fixedUpdate();
            this.$accTime -= this.$dt;
        }
    }
    private fixedUpdate(){
        this.fixedBall.x += this.ballSpeed;
    }
    
    
    //小球
    private ballSpeed:number = 2;
    private getBall(radius,color):egret.Sprite{
        var sp: egret.Sprite = new egret.Sprite();
        sp.graphics.beginFill(color);
        sp.graphics.drawCircle(0,0,radius);
        sp.graphics.endFill();
        this.addChild(sp);
        return sp;
    }
}





















