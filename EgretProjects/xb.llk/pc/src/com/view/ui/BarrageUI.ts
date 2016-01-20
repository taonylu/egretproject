/**
 * 弹幕UI
 * @author 
 *
 */
class BarrageUI extends egret.DisplayObjectContainer{
    private textList:Array<egret.TextField> = new Array<egret.TextField>();  //弹幕文本数组
    private textMax:number = 20;  //弹幕最大数量
    
	public constructor() {
	    super();
        this.width = GameConst.stage.stageWidth;
        this.height = GameConst.stage.stageHeight;
        this.touchChildren = false;
        this.touchEnabled = false;
        
        for(var i:number=0;i<this.textMax;i++){  
            var text:egret.TextField = new egret.TextField();
            text.size = 100;
            text.textColor = 0xFF0000;
            this.textList.push(text);
        }
	}
	
	//显示一条弹幕
	public showOneMsg(data):void{
    	var textField:egret.TextField =  this.textList.pop();
    	if(textField != null){
    	    textField.text = data.msg;
    	    textField.x = GameConst.stage.stageWidth + textField.width;   //x从右方1000处开始运动
    	    textField.y = 200 +  Math.random()*(GameConst.stage.stageHeight - 400);  //y范围
    	    this.addChild(textField);
    	    var self:BarrageUI = this;
    	    egret.Tween.get(textField).to({x:-textField.width},10000).call(function(){
    	        self.textList.push(textField);
    	    }); 
    	}
	}
}
