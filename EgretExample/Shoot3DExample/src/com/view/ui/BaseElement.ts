/**
 * 基类元素
 * @author 
 *
 */
class BaseElement extends eui.Component{
    public z:number = 0;
    public fl:number = 250;
    public xpos:number = 0;   //x，y轴未加入z判断时坐标
    public ypos:number = 0;
    
	public constructor() {
    	super();
	}
	
	private scale:number;
	public update(){
    	this.scale = this.fl/(this.fl+this.z);
    	this.scaleX = this.scale;
    	this.scaleY = this.scale;
    	this.x = this.scale*this.xpos;
    	this.y = this.scale*this.ypos;
	}
}
