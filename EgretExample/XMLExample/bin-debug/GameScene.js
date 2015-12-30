/**
 *
 * @author
 *
 */
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    //---------------------测试------------------
    // 1. 加载xml文件
    // 2. 解析xml文件
    // 3.如何获取节点、属性
    function GameScene() {
        _super.call(this);
        //加载配置文件中没有的资源
        RES.getResByUrl('resource/config/test.xml', this.configComplete, this, RES.ResourceItem.TYPE_XML);
    }
    var d = __define,c=GameScene;p=c.prototype;
    p.configComplete = function (e) {
        console.log("加载xml完毕");
        console.log(e);
        var xml = e;
        //获取根节点名
        console.log(xml.name);
        //获取节点
        var node0 = xml.children[0];
        //获取节点属性
        console.log(node0.attributes.comment);
        //获取节点内容
        console.log(node0.children[0].text);
    };
    return GameScene;
})(egret.Sprite);
egret.registerClass(GameScene,"GameScene");
