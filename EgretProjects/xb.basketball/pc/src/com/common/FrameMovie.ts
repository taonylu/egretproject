/**
 * 逐帧动画
 * 使用一张整图序列图，使用代码裁剪后拼成成动画
 * @author 
 *
 */
class FrameMovie extends egret.Bitmap{
    protected textureList:Array<egret.Texture> = new Array<egret.Texture>();  //纹理数组
    public curFrame: number = 1;  //当前帧，从1开始
    public totalFrame:number;     //总帧数
    private timer:egret.Timer;    //计时器
    public delay:number = 1000/20;//计时延迟
    
	public constructor(srcBm:egret.Bitmap, row, col, cellWidth, cellHeight) {
    	  super();
    	  for(var i:number=0;i<row;i++){
           for(var j:number=0;j<col;j++){
            	  var rect: egret.Rectangle = new egret.Rectangle(j*cellHeight, i*cellWidth,cellWidth, cellHeight);
              var texture: egret.RenderTexture = new egret.RenderTexture();
              texture.drawToTexture(srcBm,rect,1);
              this.textureList.push(texture);
           }
    	  }
    	  this.curFrame = 1;
        this.totalFrame = row * col;
    	  this.texture = this.textureList[this.curFrame-1];
    	  
	}
	
	public play(){
    	this.curFrame = 1;
    	this.texture = this.textureList[this.curFrame-1];
    	this.startTimer();
	}
	
	public stop(){
    	this.stopTimer();
	}
	
    private onTimerHandler(){
    	this.curFrame++;
    	if(this.curFrame > this.totalFrame){
        	this.curFrame = 1;
        	this.stopTimer();
    	}
    	 this.texture = this.textureList[this.curFrame-1];
	}
	
	public startTimer(){
    	if(this.timer == null){
        	this.timer = new egret.Timer(this.delay);
    	}
    	this.timer.delay = this.delay;
    	this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
    	this.timer.reset();
    	this.timer.start();
	}
	
	public stopTimer(){
        if(this.timer){
            this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
            this.timer.stop();
        }
	}
}
