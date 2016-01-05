/**
 * 切换Image
 * 舞台上有多个Image，将Image保存到数组，然后播放
 * @author 
 *
 */
class ImageMC {
    private imgeList:Array<eui.Image> = []; //Image数组
    public curFrame:number = 0;            //当前帧，帧从0开始
    public totalFrame:number = 0;          //总帧数，等于图片总数
    public curImg:eui.Image;               //当前图片
    
	public constructor() {
    	
	}
	
	public addImage(img:eui.Image):void{
    	this.imgeList.push(img);
    	this.totalFrame++;
    	
    	if(this.totalFrame == 1){   //保存第一帧图片
        this.curImg = img;
      } else {                  //非第一帧的图片，都隐藏
        img.visible = false;
    	}
	}
	
	public nextFrame():void{
    	 this.curFrame++;
    	 if(this.curFrame >= this.totalFrame){ //播放到头，则重新播放
        	 this.curFrame = 0;
    	 }
    	 this.curImg.visible = false;   //显示下一张图片
    	 this.curImg = this.imgeList[this.curFrame];
    	 this.curImg.visible = true;
	}
	
	
	
	
}









