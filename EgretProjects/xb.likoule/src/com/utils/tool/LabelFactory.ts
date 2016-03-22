/**
 * 文本工厂
 * @author 
 *
 */
class LabelFactory {
	public static getLabel():eui.Label{
    	 var label:eui.Label = new eui.Label();
    	 label.verticalAlign = egret.VerticalAlign.MIDDLE;
    	 label.textAlign = egret.HorizontalAlign.CENTER;
    	 label.size = 25;
    	 label.fontFamily = "微软雅黑";
    	 label.textColor = 0x000000;
    	 return label;
	}
}
