/**
 * 弹幕UI
 * @author 
 *
 */
class BarrageUI extends egret.DisplayObjectContainer{
    private textList:Array<egret.TextField> = new Array<egret.TextField>();  //弹幕文本数组
    private textMax:number = 20;  //弹幕最大数量
    private colorList = [0xFF0000,0xF614C8,0x8B14BE,0x0000FF,0xAD2F1B];  //弹幕颜色
    private msgPool:Array<string> = new Array<string>();  //弹幕过多，则暂时存储在弹幕池
    
	public constructor() {
	    super();
        this.width = GameConst.stage.stageWidth;
        this.height = GameConst.stage.stageHeight;
        this.touchChildren = false;
        this.touchEnabled = false;
        
        for(var i:number=0;i<this.textMax;i++){  
            var text:egret.TextField = new egret.TextField();
            text.size = 100;
            text.fontFamily = "微软雅黑, 黑体";
            this.textList.push(text);
        }
	}
	
	//显示一条弹幕
	public showOneMsg(msg:string):void{
    	var textField:egret.TextField =  this.textList.pop();
    	if(textField != null){
          textField.textColor = this.colorList[NumberTool.getRandomInt(0,this.colorList.length - 1)];
          textField.text = msg;
    	    textField.x = GameConst.stage.stageWidth + textField.width;   //x从右方1000处开始运动
    	    textField.y = 200 +  Math.random()*(GameConst.stage.stageHeight - 400);  //y范围
    	    this.addChild(textField);
    	    var self:BarrageUI = this;
    	    egret.Tween.get(textField).to({x:-textField.width},10000).call(function(){
    	        self.textList.push(textField);
    	        //查看弹幕池中是否有弹幕
    	        if(self.msgPool.length > 0){
                    self.showOneMsg(self.msgPool.shift()); 
    	        }
    	    }); 
    	}else{  //弹幕过多
            this.msgPool.push(msg);
    	}
	}
}
