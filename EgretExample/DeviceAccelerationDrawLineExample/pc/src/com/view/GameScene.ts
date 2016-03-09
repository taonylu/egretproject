/**
 * 游戏场景
 * @author 
 *
 */
class GameScene extends BaseScene{
    private msgLabel:eui.Label;
    
    private centerX:number;  //中心点
    private centerY:number;
    
    private centerDeviceX:number;
    private centerDeviceY:number;
    private centerDeviceZ:number;
    
    private lastX:number; //上一次点位置
    private lastY:number;
    
    private stageWidth:number;
    private stageHeight:number;
    private halfStageWidth:number;
    private halfStageHeight:number;
    
    private canvas:egret.Sprite = new egret.Sprite();
    
	public constructor() {
        super("GameSceneSkin");
	}
	
    public componentCreated(): void {
        super.componentCreated();
        
        this.stageWidth = GameConst.stage.stageWidth;
        this.stageHeight = GameConst.stage.stageHeight;
        
        this.halfStageWidth = this.stageWidth/2;
        this.halfStageHeight = this.stageHeight/2;
        
        this.centerX = this.halfStageWidth;
        this.centerY = this.halfStageHeight;
    }

    public onEnable(): void {
        this.createCanvas();
  
    }

    public onRemove(): void {
        
    }
    
    private createCanvas(){
        this.canvas.width = GameConst.stage.stageWidth;
        this.canvas.height = GameConst.stage.stageHeight;
        this.canvas.graphics.lineStyle(5,0xff0000);
        this.canvas.graphics.moveTo(this.centerX,this.centerY);
        this.addChild(this.canvas);
    }
    
    public revLockOn(data){
        var deviceX: number = data.deviceX;
        var deviceY: number = data.deviceY;
        var deviceZ: number = data.deviceZ;
        egret.log("rev lockOn:", deviceX,deviceY,deviceZ);
        this.centerDeviceX = deviceX;
        this.centerDeviceY = deviceY;
        this.centerDeviceZ = deviceZ;
    }
    
    private angleLimit:number = 45;
    public revDrawLine(data){
        var curDeviceX:number = data.deviceX;  //本次点位置
        var curDeviceY:number = data.deviceY;
        var curDeviceZ:number = data.deviceZ;

        //判断z轴和x轴角度改变值，用改变值*舞台高宽 = 改变的线段长度，在上一次的绘制点开始绘制
        //或者，判断z轴和x轴离中心点的距离，根据距离moveTo绘制直线
        
        //z轴角度，北方向为0，往左0-360增加，往右360-0减少
        var offerZ:number = curDeviceZ - this.centerDeviceZ; //角度差值 = 当前z角度 - 中心z角度
        var angleZ: number; //假设中点角度为0，换算后，当前点离中心点的角度
        
        //往左
        if(offerZ < 0 && offerZ <= -180){
            angleZ =  -360-offerZ;
        } else if(offerZ > 0 && offerZ <= 180){
            angleZ = -offerZ;
        }
        //往右
        else if(offerZ < 0 && offerZ > -180){
            angleZ = -offerZ;
        } else if(offerZ > 0 && offerZ > 180){
            angleZ = 360-offerZ;
        }
        
        var nextX:number = this.centerX + angleZ*this.halfStageWidth/45;
        if(nextX > this.stageWidth){
            nextX = this.stageWidth;
        }else if(nextX < 0){
            nextX = 0;
        }
        nextX = parseFloat(nextX.toFixed(2));
        
        //x轴角度，上至下 90 ~ -90度，由改变后x轴角度-中心x角度，得出当前x与中心x的距离
        var nextY:number = this.centerY - (curDeviceX - this.centerDeviceX)*this.halfStageHeight/45;
        if(nextY > this.stageHeight){
            nextY = this.stageHeight;
        }else if(nextY < 0){
            nextY = 0;
        }
        nextY = parseFloat(nextY.toFixed(2));
        
        this.setMsgLabel("绘制点坐标:" + nextX + "," + nextY);
        this.canvas.graphics.lineTo(nextX,nextY);
    }
    
    private row:number = 0;
    public setMsgLabel(msg:string){
        this.row++;
        if(this.row > 10){
            this.row = 0;
            this.msgLabel.text = "";
        }
        this.msgLabel.text += "\n" + msg;
    }
    
}









