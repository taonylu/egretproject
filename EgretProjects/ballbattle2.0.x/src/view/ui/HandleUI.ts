/**
*  文 件 名：HandleUI.ts
*  功    能: 圆形控制杆
*  内    容： 游戏中手指点击屏幕后，指示小球移动方向的圆形图标
*  作    者： 羊力大仙
*  生成日期：2015/9/18
*  修改日期：2015/9/18
*  修改日志：
*/
class HandleUI extends egret.DisplayObjectContainer{
    private circleFrame: egret.Bitmap;  //圆形轮廓外框
    private circle: egret.Bitmap;       //圆点
    private radius: number = 0;         //半径
    private centerX: number = 0;        //中心点x
    private centerY: number = 0;        //中心点y
    
    public constructor() {
        super();
        this.circleFrame = new egret.Bitmap(RES.getRes("circleFrame_png"));
        this.addChild(this.circleFrame);
        
        this.circle = new egret.Bitmap(RES.getRes("circle_png"));
        
        this.circle.anchorOffsetX = this.circle.width / 2;
        this.circle.anchorOffsetY = this.circle.height / 2;
        this.addChild(this.circle);
        
        this.anchorOffsetX = this.circleFrame.width / 2;
        this.anchorOffsetY = this.circleFrame.height / 2;
        
        this.radius = (this.circleFrame.width- this.circle.width)/2;
        
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        
        this.reset();
        
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    
    public show(x: number,y: number,doc: egret.DisplayObjectContainer): void { 
        this.x = x;
        this.y = y;
        doc.addChild(this);
    }
	
    public setCirclePos(angle:number): void { 
        this.circle.x = Math.cos(angle) * this.radius + this.centerX;
        this.circle.y = Math.sin(angle) * this.radius + this.centerY;
    }
    
    public hide(): void { 
        this.reset();
        this.parent && this.parent.removeChild(this);
    }
    
    public reset(): void { 
        this.circle.x = this.centerX;
        this.circle.y = this.centerY;
    }
}
