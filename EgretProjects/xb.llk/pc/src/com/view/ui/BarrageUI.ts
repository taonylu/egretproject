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
        this.width = GameConst.stage.width;
        this.height = GameConst.stage.height;
        this.touchChildren = false;
        this.touchEnabled = false;
        
        for(var i:number=0;i<this.textMax;i++){  
            var text:egret.TextField = new egret.TextField();
            text.width = 800;   //宽度800
            this.textList.push(text);
        }
	}
	
	//显示一条弹幕
	public showOne(msg:string):void{
    	var textField:egret.TextField =  this.textList.pop();
    	if(textField != null){
        	    textField.text = msg;
        	    textField.x = GameConst.stage.stageWidth + 1000;   //x从右方1000处开始运动
        	    textField.y = 200 +  Math.random()*GameConst.stage.stageHeight - 400;  //y范围
        	    this.addChild(textField);
        	    var self:BarrageUI = this;
        	    egret.Tween.get(textField).to({x:-1000},10000).call(function(){
            	        self.textList.push(textField);
            	    });  //运动到-1000处
    	}
	}
}
