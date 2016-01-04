/**
 *
 * @author 
 *
 */
class GameScene extends BaseScene{
    public scene1Group:eui.Group;  //游戏容器, 火车
    public scene2Group:eui.Group;  //指纹
    public scene3Group:eui.Group;  //火山
    public scene4Group:eui.Group;  //星球
    
    private stageHeight:number = 1150; //屏幕高度
    private scene4Height:number = 1500; //第4场景高度
    
    public train:eui.Image;      //火车
    public trainX:number = 49;
    public trainY:number = 341;
    
    private zhanpai:eui.Image;   //站牌
    private zhanpai2:eui.Image;
    
    private ostip0:eui.Image;  //os提示
    private ostip1:eui.Image;
    private ostip2:eui.Image;
    
    private os360:eui.Image;  //360os牌子
    private os3602:eui.Image;
    
    private pai0_1: eui.Image;  //站牌亮
    private pai1_1:eui.Image;
    private pai2_1:eui.Image;
    
    private G4tip:eui.Image;   //4G全网通提示
    
    private fingerUI:FingerUI;  //指纹识别
    
    private suger0:eui.Image;  //糖果旋转
    private suger1:eui.Image;
    private suger2:eui.Image;
    private suger3:eui.Image;
    
    private weixin0:WeiXinUI;  //微信动画
    private weixin1:WeiXinUI;
    private weinxintext:eui.Image;
    
    private note3:eui.Image;  //note3高配
    
    private man_hand:eui.Image;    //男人和星球动画
    private woman_hand:eui.Image;
    private mantip:eui.Image;
    private womantip:eui.Image;
    private dianxinball:eui.Image;
    private liantongball:eui.Image;
    private whatball:eui.Image;
    private dianxinstar:eui.Image;
    private whatstar:eui.Image;
    
    private btn_up:eui.Image;     //开始预订按钮
    private btn_down:eui.Image;
    
    public ball:eui.Image;       //球
    public ball0:eui.Image;      //火车初始点
    public ball1:eui.Image;
    public ball2:eui.Image;
    public ball3:eui.Image;
    public ball4:eui.Image; 
    public ball5: eui.Image;    //掉落到火山 
    public ball6: eui.Image; 
    public ball7: eui.Image; 
    public ball8: eui.Image;   //掉落到男人
    public ball9: eui.Image; 
    public ball10: eui.Image; 
    public ball11: eui.Image; 
    public ball12: eui.Image; 
    public ball13: eui.Image; 
    public ball14: eui.Image; 
    public ball15: eui.Image; 
    public ball16: eui.Image; 
    public ball17: eui.Image; 
    public ball18: eui.Image; 
    public ball19: eui.Image; 
    public ball20: eui.Image; 
    public ball21: eui.Image; 
    
	public constructor() {
    	super("GameSceneSkin");
	}

    public componentCreated(): void {
        super.componentCreated();
    }

    public onEnable(): void {
        window['playBGM']();
        this.initView();
        this.startAnim();
    }

    public onRemove(): void {
        
    }
    
    private initView():void{
        //移除引导球
        var tempBall:eui.Image;
        for(var i:number = 0; i<=21; i++){
            tempBall = this["ball" + i];
            tempBall && tempBall.parent && tempBall.parent.removeChild(tempBall);
        }
        this.ball.visible = false;
        //os提示
        this.ostip0.alpha = 0;
        this.ostip1.alpha = 0;
        this.ostip2.alpha = 0;
        this.ostip0.scaleX = 0;
        this.ostip0.scaleY = 0;
        this.ostip1.scaleX = 0;
        this.ostip1.scaleY = 0;
        this.ostip2.scaleX = 0;
        this.ostip2.scaleY = 0;
        //os360牌子
        this.os3602.visible = false;
        //微信提示
        this.weinxintext.alpha = 0;
        //大叔女孩提示
        this.mantip.alpha = 0;
        this.womantip.alpha = 0;
        //全网通提示
        this.G4tip.alpha = 0;
        //星星
        this.dianxinstar.alpha = 0;
        this.whatstar.alpha = 0;

        //开始预订按钮
        this.btn_up.visible = false;
        //note3
        this.note3.alpha = 0;
        this.note3.scaleX = 0;
        this.note3.scaleY = 0;
        //游戏容器
        this.scene1Group.touchEnabled = false;
        this.scene1Group.touchChildren = false;
        this.scene2Group.touchEnabled = false;
        this.scene2Group.touchChildren = false;
        this.scene3Group.touchEnabled = false;
        this.scene3Group.touchChildren = false;
        this.scene4Group.touchEnabled = false;
        this.scene4Group.touchChildren = false;
        this.scene1Group.y = 0;
        this.scene2Group.y = this.stageHeight;
        this.removeChild(this.scene3Group);
        this.removeChild(this.scene4Group);
        
    }
    
    
    public startAnim():void{
        egret.Tween.get(this).wait(1000).call(this.movetrain, this);
    }
    
    //火车开出
    private movetrain():void{
        egret.Tween.get(this.train).to({ x: this.trainX,y: this.trainY },2000).call(this.ballFall,this);
        
        //站牌动画
        var self:GameScene = this;
        egret.Tween.get(this).wait(500).call(function(){
                self.zhanpai.visible = false;
                self.zhanpai2.visible = true;
            },this).wait(500).call(function(){
                self.zhanpai.visible = true;
                self.zhanpai2.visible = false;
            },this).wait(500).call(function() {
                self.zhanpai.visible = false;
                self.zhanpai2.visible = true;
            },this).wait(500).call(function() {
                self.zhanpai.visible = true;
                self.zhanpai2.visible = false;
            },this)
    }
    
    //球滑落
    private ballFall():void{
        //球滑落
        this.ball.visible = true;
        this.ball.x = this.ball0.x;
        this.ball.y = this.ball0.y;
        egret.Tween.get(this.ball).to({ x: this.ball1.x,y: this.ball1.y },1500).   //横
        to({x:this.ball2.x, y:this.ball2.y},700).    //竖
        to({x:this.ball3.x , y:this.ball3.y},1500). //横
        to({x:this.ball4.x, y:this.ball4.y},700).call(this.unlock, this);    //竖
        
        //360os提示闪烁
        var self:GameScene = this;
        egret.Tween.get(this.os3602).wait(1800).call(function(){
            self.os3602.visible = true;
        }).wait(300).call(function() {
            self.os3602.visible = false;
            }).wait(300).call(function() {
                self.os3602.visible = true;
            }).wait(300).call(function() {
                self.os3602.visible = false;
            }).wait(300).call(function() {
                self.os3602.visible = true;
            }).wait(300).call(function() {
                self.os3602.visible = false;
            }).wait(300).call(function() {
                self.os3602.visible = true;
            }).wait(300).call(function() {
                self.os3602.visible = false;
            }).wait(300).call(function() {
                self.os3602.visible = true;
            }).wait(300).call(function() {
                self.os3602.visible = false;
            })
        
        //os提示和牌亮
        egret.Tween.get(this.ostip0).wait(1500).call(function(){
            self.pai0_1.parent.removeChild(self.pai0_1);
            },this).to({alpha:1, scaleX:1, scaleY:1, x:this.ostip0.x - 20}, 400);
        egret.Tween.get(this.ostip1).wait(2700).call(function() {
            self.pai1_1.parent.removeChild(self.pai1_1);
        },this).to({ alpha: 1,scaleX: 1,scaleY: 1,x: this.ostip1.x - 20 },400);
        egret.Tween.get(this.ostip2).wait(4200).call(function() {
            self.pai2_1.parent.removeChild(self.pai2_1);
        },this).to({ alpha: 1,scaleX: 1,scaleY: 1,x: this.ostip2.x - 20 },400);

        
        //屏幕移动
        egret.Tween.get(this.scene1Group).to({ y: this.scene1Group.y - this.ball1.y + this.ball.y },1500).  //横
            to({ y: this.scene1Group.y - this.ball2.y + this.ball.y},700).   //竖
            wait(1500).       //横
            to({ y: this.scene1Group.y - this.ball4.y + this.ball.y + 100 },1000);  //竖  +100为了显示3个os提示
            
        egret.Tween.get(this.scene2Group).to({ y: this.scene2Group.y - this.ball1.y + this.ball.y },1500).  //横
            to({ y: this.scene2Group.y - this.ball2.y + this.ball.y },700).   //竖
            wait(1500).       //横
            to({ y: this.scene2Group.y - this.ball4.y + this.ball.y + 100},1000);  //竖
    }
    
    //解锁
    private  unlock():void{
        //隐藏球
        this.ball.visible = false;
        
        this.fingerUI.lightScan();
        this.fingerUI.addEventListener("fingerComplete",this.ballFallToHill, this);
    }

    
    //球下落到火山
    private ballFallToHill():void{
        //显示球
        this.scene2Group.addChild(this.ball);
        this.ball.x = this.ball5.x;
        this.ball.y = this.ball5.y;
        this.ball.visible = true;
        //球下落
        egret.Tween.get(this.ball).to({x:this.ball6.x, y:this.ball6.y},500).
        to({x:this.ball7.x, y:this.ball7.y},1000).
        call(this.weixin,this);
        
        //显示图层
        this.addChild(this.scene3Group);
        this.addChild(this.scene2Group);
        this.addChild(this.scene1Group);
        this.scene3Group.y = this.scene2Group.y + this.stageHeight;
        
        //屏幕移动
        egret.Tween.get(this.scene1Group).to({ y: this.scene1Group.y - this.ball7.y + this.ball.y - 100},1500);  //上面+了100，这里减回来 
        egret.Tween.get(this.scene2Group).to({ y: this.scene2Group.y - this.ball7.y + this.ball.y  - 100},1500);
        egret.Tween.get(this.scene3Group).to({ y: this.scene3Group.y - this.ball7.y + this.ball.y  - 100},1500);
    }
    
    //微信
    private weixin():void{
        //隐藏球
        this.ball.visible = false;
        //隐藏图层
        this.removeChild(this.scene1Group);
        //糖果旋转
        egret.Tween.get(this.suger0,{ loop: true }).to({ rotation: 360 },3000);
        egret.Tween.get(this.suger1,{ loop: true }).to({ rotation: 360 },3000);
        egret.Tween.get(this.suger2,{ loop: true }).to({ rotation: 360 },3000);
        egret.Tween.get(this.suger3,{ loop: true }).to({ rotation: 360 },3000);
        
        //微信动画
        this.weixin0.play();
        var self:GameScene = this;
        egret.Tween.get(this).wait(500).call(function(){
            self.weixin1.play();
            },this);
        //微信提示，移动场景到下方一点，再下落小球，否则看不见小球动画
        var self:GameScene = this;
        egret.Tween.get(this.weinxintext).wait(1000).to({ x: this.weinxintext.x + 20,alpha: 1 },1000).wait(500).call(this.ballFallToMan, this);    
    }
    
    
    //小球弹向男人
    private ballFallToMan(){
        
        
        //等场景下滑一点再显示小球
        this.scene3Group.addChild(this.ball);
        this.ball.x = this.ball8.x;
        this.ball.y = this.ball8.y;

         var self:GameScene = this;
         egret.Tween.get(this).wait(700).call(function(){
             self.ball.visible = true;
             },this);
          
          //显示图层
          this.scene4Group.y = this.scene3Group.y + this.stageHeight;
          this.addChild(this.scene3Group);
          this.addChild(this.scene4Group);
          this.addChild(this.scene2Group);
          
          //小球移动
          egret.Tween.get(this.ball).wait(700).to({x:this.ball9.x, y:this.ball9.y},1000).    //掉到男手上
              to({ x: this.ball10.x,y: this.ball10.y },500,egret.Ease.quadOut).   //弹起
              to({x:this.ball11.x, y:this.ball11.y}, 1000).  //掉到女手上
              to({ x: this.ball12.x,y: this.ball12.y },500,egret.Ease.quadOut).   //弹起
              call(this.ballFallToLast,this);  //屏幕开始移动
          
          
          
          //男手动 这里接.to手臂回来原位有bug
          egret.Tween.get(this.man_hand).wait(1700).to({rotation:this.man_hand.rotation - 10},300);
          egret.Tween.get(this.man_hand).wait(2200).to({ rotation: 0 },600);
              
         //男提示
          egret.Tween.get(this.mantip).wait(1700).to({x:this.mantip.x+20, alpha:1},1000);
          
          //女手动
          egret.Tween.get(this.woman_hand).wait(3200).to({ rotation: this.woman_hand.rotation + 10 },300);
          egret.Tween.get(this.woman_hand).wait(3700).to({ rotation: 0 },600);
          
        //女提示
          egret.Tween.get(this.womantip).wait(3200).to({ x: this.womantip.x - 20,alpha: 1 },1000);
          
          //屏幕移动
          var dist:number = this.scene3Group.y -this.ball9.y - 200;  //ball9的位置以上200
          egret.Tween.get(this.scene2Group).to({ y: dist - this.stageHeight  },2800); 
          egret.Tween.get(this.scene3Group).to({ y: dist },2800);
          egret.Tween.get(this.scene4Group).to({ y: dist + this.stageHeight },2800);
          
    }
    
    private ballFallToLast():void{
        //隐藏图层
       // this.removeChild(this.scene1Group);
        this.removeChild(this.scene2Group);
        
        //切换球图层
        this.ball.x = this.ball14.x;  //女孩抛起位置
        this.ball.y = this.ball14.y;
        this.scene4Group.addChild(this.ball);  
        
        //屏幕移动  第4场景有点儿高，得计算屏幕到底的距离
        egret.Tween.get(this.scene3Group).to({ y:  -this.scene4Height },6000); 
        egret.Tween.get(this.scene4Group).to({ y:  this.stageHeight - this.scene4Height  },6000);
        
        //球继续移动
        var self:GameScene = this;
        egret.Tween.get(this.ball). 
            to({ x: this.ball15.x,y: this.ball15.y },1000).  //女孩手中掉落,砸到电信
            to({ x: this.ball16.x,y: this.ball16.y },500).   //弹起
            to({ x: this.ball17.x,y: this.ball17.y },1000).   //砸到联通
            to({ x: this.ball18.x,y: this.ball18.y },500).   //弹起
            to({ x: this.ball19.x,y: this.ball19.y },1000).   //砸到what
            to({ x: this.ball20.x,y: this.ball20.y },500).   //弹起
            to({ x: this.ball21.x,y: this.ball21.y },1000).  //砸到按钮
            to({ y:this.note3.y}, 500).call(function(){   //反弹后显示大神
                self.scene4Group.addChild(self.note3);
                egret.Tween.get(self.note3).to({alpha:1, scaleX:1, scaleY:1}, 1000);
            },this);
 
        //电信球动画
        egret.Tween.get(this.dianxinball).wait(1000).to({ x: this.dianxinball.x + 15,y: this.dianxinball.y + 15 },100).
            to({ x: this.dianxinball.x - 15,y: this.dianxinball.y - 15 },100);
            
        //电信星星动画
        egret.Tween.get(this.dianxinstar).wait(1000).to({ x: this.dianxinstar.x + 30,y: this.dianxinstar.y - 30, alpha:1 },200);
        
        //联通球动画
        egret.Tween.get(this.liantongball).wait(2500).to({ x: this.liantongball.x - 15,y: this.liantongball.y - 15 },100).
            to({ x: this.liantongball.x + 15,y: this.liantongball.y + 15 },100);
        
        //全网通提示
        egret.Tween.get(this.G4tip).wait(2500).to({x:this.G4tip.x + 20, alpha:1},1000);    
            
        //what球动画
        egret.Tween.get(this.whatball).wait(4000).to({ x: this.whatball.x + 15,y: this.whatball.y + 15 },100).
            to({ x: this.whatball.x - 15,y: this.whatball.y - 15 },100);
            
         //what星星动画   
        egret.Tween.get(this.whatstar).wait(4000).to({ x: this.whatstar.x - 20,y: this.whatstar.y + 20,alpha: 1 },200);
         
        //按钮动画
        egret.Tween.get(this).wait(5500).call(function(){
            self.btn_up.visible = false;
            self.btn_down.visible = true;
            },this).wait(100).call(function(){
                self.btn_up.visible = true;
                self.btn_down.visible = false;
                self.addListener();
                });
        
                
        
    }
    
    private addListener():void{
        this.scene1Group.y  = -this.stageHeight *2 - this.scene4Height;
        this.scene2Group.y = -this.stageHeight  - this.scene4Height;
        this.scene3Group.y =   - this.scene4Height;
        this.scene4Group.y = this.stageHeight - this.scene4Height;
        
        
        
        this.addChild(this.scene3Group);
        this.addChild(this.scene4Group);
        this.addChild(this.scene2Group);
        this.addChild(this.scene1Group);
        
        this.scene4Group.touchChildren = true;
        this.scene4Group.touchThrough = true;
        this.btn_up.touchEnabled = true;
        
        this.btn_up.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gotoUrl, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
    }
    
    private beginY:number = 0;
    private onTouchBegin(evt:egret.TouchEvent):void{
        this.beginY = evt.stageY;
    }
    
    private touchDist:number;
    private onTouchMove(evt:egret.TouchEvent):void{
        this.touchDist = evt.stageY - this.beginY;
        
        this.scene1Group.y += this.touchDist;
        this.scene2Group.y += this.touchDist;
        this.scene3Group.y += this.touchDist;
        this.scene4Group.y += this.touchDist;
        this.beginY = evt.stageY;
        
        if(this.scene4Group.y < -350){
            this.scene1Group.y = -this.stageHeight * 2 - this.scene4Height;
            this.scene2Group.y = -this.stageHeight - this.scene4Height;
            this.scene3Group.y = - this.scene4Height;
            this.scene4Group.y = this.stageHeight - this.scene4Height;
        }else if(this.scene1Group.y > 0){
            this.scene1Group.y = 0;
            this.scene2Group.y = this.stageHeight ;
            this.scene3Group.y =  this.stageHeight*2;
            this.scene4Group.y = this.stageHeight *3;
        }
        
    }
    
    //跳转预订页面
    private gotoUrl():void{
        window.location.href = "http://a2315.oadz.com/link/C/2315/22813/YRkKy0HPzJE4EpSh98vlQHsuL28_/p007/0/http://sale.jd.com/m/act/ILmGDoKjJnvOh.html";
    }
    
    
    
}















