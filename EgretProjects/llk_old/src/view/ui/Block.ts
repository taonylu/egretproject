/**
*  文 件 名：Block.ts
*  功    能：方块
*  内    容： 
*  作    者：羊力大仙
*  生成日期：2015/9/11
*  修改日期：2015/9/11
*  修改日志：
*/
class Block extends egret.Sprite{
    public static NAME: string = "Block";
    private bg: egret.Bitmap;         //蓝色背景
    private flash: egret.Bitmap;      //闪烁背景
    private selectBg: egret.Bitmap;   //橘色背景
    private face: egret.Bitmap;       //图标
    public row: number;               //行
    public col: number;               //列
    public type: number;              //类型
    public index: number;             //在数组中坐标
    public static cellWidth: number;  //实际高宽
    private timer: egret.Timer;       //计时器
    
	public constructor() {
        super();
        
        var self: Block = this;
        
        self.touchEnabled = true;
        
        self.bg = new egret.Bitmap(RES.getRes("facebg1_png"));
        self.flash = new egret.Bitmap(RES.getRes("faceflash_png"));
        self.selectBg = new egret.Bitmap(RES.getRes("facebg2_png"));
        self.face = new egret.Bitmap();
        
        self.addChild(self.bg);
        self.addChild(self.selectBg);
        self.addChild(self.flash);
        self.addChild(self.face);
        
        self.flash.visible = false;
        self.selectBg.visible = false;
        
        this.scaleX = 2;
        this.scaleY = 2;
        
        Block.cellWidth = this.width * this.scaleX;
	}
	
	//重置
    public reset(): void { 
        this.stopFlash();
        this.flash.visible = false;
        this.selectBg.visible = false;
        this.bg.visible = true; 
    }
	
	//设置皮肤 index=1~45
    public setSkin(index:number): void { 
//        if(this.face.texture) { 
//            this.face.texture.dispose();
//        }
        this.face.texture = RES.getRes("face" + index + "_png");
        this.setCenter(this.face);
    }
    
    //设置ui在本容器居中
    public setCenter(ui:egret.Bitmap): void { 
        ui.x = (this.width - ui.width) / 2;
        ui.y = (this.height - ui.height) / 2;
    }
    
    //设置选中状态
    public setSelect(bSelect:boolean): void { 
        if(bSelect) {
            this.selectBg.visible = true;
            this.bg.visible = false;
        } else { 
            this.selectBg.visible = false;
            this.bg.visible = true;
        }
    }
    
    public startFlash(): void { 
        if(this.timer == null) { 
            this.timer = new egret.Timer(500);
        }
        this.timer.reset();
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerHandler, this);
        this.timer.start();
        this.flash.visible = true;
    }
    
    private onTimerHandler(e: egret.TimerEvent): void { 
        this.flash.visible = !this.flash.visible;
    }
    
    private stopFlash(): void { 
        if(this.timer) { 
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler, this);
            this.timer.stop();
        }
        this.flash.visible = false;
    }
    
    
    public hide(): void { 
        if(this.parent) { 
            this.parent.removeChild(this);
            this.reset();
            ObjectPool.getPool(Block.NAME).returnObject(this);
        }
        
    }
    
    

}
