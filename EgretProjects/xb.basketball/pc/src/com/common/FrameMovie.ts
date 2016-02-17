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
    	this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	
	private onEnterFrame(){
    	this.curFrame++;
    	if(this.curFrame > this.totalFrame){
        	this.curFrame = 1;
        	this.stop();
    	}
    	 this.texture = this.textureList[this.curFrame-1];
	}
	
	public stop(){
        this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}
}
