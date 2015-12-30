/**
 *
 * @author 
 *
 */
class GameScene extends egret.Sprite{
    
    //---------------------测试------------------
    // 1. 加载xml文件
    // 2. 解析xml文件
    // 3.如何获取节点、属性
    
	public constructor() {
        super();
        
        //加载配置文件中没有的资源
        RES.getResByUrl('resource/config/test.xml',this.configComplete,this,RES.ResourceItem.TYPE_XML);
	}
	
    private configComplete(e:any): void {
        console.log("加载xml完毕");
        console.log(e);
        var xml: egret.XML = <egret.XML>e;
        
        //获取根节点名
        console.log(xml.name);
        
        //获取节点
        var node0: egret.XML = <any>xml.children[0];
        
        //获取节点属性
        console.log(node0.attributes.comment);
        
        //获取节点内容
        console.log((<egret.XMLText>node0.children[0]).text);
    }
}
