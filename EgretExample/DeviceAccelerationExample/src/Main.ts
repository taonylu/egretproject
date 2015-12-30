class Main extends egret.Sprite {
    
    //---------------测试目的-------------------
    //1. 重力感应x,y,z轴值变化
    //2. 摇一摇功能
    
    private label: egret.TextField;
    private shakeLabel: egret.TextField;
    public constructor() {
        super();
        this.label = new egret.TextField();
        this.label.y = 150;
        this.label.x = 50;
        this.addChild(this.label);
        
        this.shakeLabel = new egret.TextField();
        this.shakeLabel.y = 350;
        this.shakeLabel.x = 50;
        this.addChild(this.shakeLabel);

        var orientation = new egret.DeviceOrientation();
        orientation.addEventListener(egret.Event.CHANGE,this.onOrientation,this);
        orientation.start();
    }

    private xPos: number = 0;
    private yPos: number = 0;
    private zPos: number = 0;
    private last_x: number = 0;
    private last_y: number = 0;
    private last_z: number = 0;
    private last_update: number = 0;
    private SHAKE_THRESHOLD:number = 0.25;  //摇动变化值/时间差  25/100大概值
    private shakeCount: number = 0;  //摇动次数
    private onOrientation(e: egret.OrientationEvent) {
        this.label.text =
        "z轴角速度:" + e.alpha    //0~360   手机正前方为180度，向右减少，向左增加
        + "\nx轴角速度:" + e.beta  //-90-90 手机平放0度，手机头朝上增加，手机头朝下减少
        + "\ny轴角速度:" + e.gamma; //-90~270 手机平放0度，向右倾斜增加，向左倾斜减少
        
        var curTime = egret.getTimer();
        
        if((curTime - this.last_update) > 100) {
            var diffTime = curTime - this.last_update;
            this.last_update = curTime;
            this.xPos = e.beta;
            this.yPos = e.gamma;
            this.zPos = e.alpha ;
            var speed = Math.abs(this.xPos + this.yPos + this.zPos - this.last_x - this.last_y - this.last_z) / diffTime;
            
            if(speed > this.SHAKE_THRESHOLD) {
                this.shakeCount++;
                if(this.shakeCount > 3) { 
                    this.shakeCount = 0;
                    this.label.text = "shake";
                }
                
            }
            
            this.shakeLabel.text = "摇动变化值：" +
            Math.abs(this.xPos + this.yPos + this.zPos - this.last_x - this.last_y - this.last_z) +
            "\n时间差:" + diffTime + 
                "\n摇动次数" + this.shakeCount;
            
            this.last_x = this.xPos;
            this.last_y = this.yPos;
            this.last_z = this.zPos;
        }
    }
}