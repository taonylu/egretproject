/**
 *
 * @author
 *
 */
var TextExample = (function (_super) {
    __extends(TextExample, _super);
    function TextExample() {
        _super.call(this);
    }
    var d = __define,c=TextExample;p=c.prototype;
    //-------------------测试目的---------------------
    //1. 文本大小、高宽、、颜色、字体、对齐、文本加粗、斜体、描边等基本设置
    //2. 多文本样式混合  没啥用...
    //3. HTML设置文本  也没啥用...
    //4. 文字链接
    //5. 聊天框滚动
    //6. 位图字体
    p.test = function () {
        GameConst.main.addChild(this);
        //1 基本设置
        var text = new eui.Label();
        text.size = 30;
        text.width = 100;
        text.height = 50;
        text.textColor = 0xff0000;
        text.fontFamily = "微软雅黑, Arial";
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.border = true;
        text.x = 0;
        text.y = 0;
        text.text = "test";
        text.bold = true;
        text.italic = true;
        text.stroke = 2;
        text.strokeColor = 0xff00ff;
        this.addChild(text);
        //2 样式，运行不了
        var text2 = new eui.Label();
        text2.width = 100;
        text2.height = 50;
        text2.x = 100;
        text2.y = 0;
        text.textFlow = new Array({ text: "Egret", style: { "textColor": 0xFF0000, "size": 30 } });
        this.addChild(text2);
        //3 HTML字体，没啥用...直接使用字体也可以
        var text3 = new egret.TextField;
        text3.width = 200;
        text3.height = 200;
        text3.textFlow = (new egret.HtmlTextParser).parser('没有任何格式初始文本，' + '<font color="#0000ff" size="30" fontFamily="Verdana">Verdana blue large</font>' + '<font color="#ff7f50" size="10">珊瑚色<b>局部加粗</b>小字体</font>' + '<i>斜体</i>');
        text3.x = 100;
        text3.y = 50;
        this.addChild(text3);
        //4 链接字体   在浏览器中可以点击，刷新一次后就不能点击弹出网页了...
        var text4 = new egret.TextField();
        text4.textFlow = new Array({ text: "这段文字有链接", style: { "href": "http://www.baidu.com" } }, { text: "\n这段文字没链接", style: {} });
        text4.width = 200;
        text4.height = 100;
        text4.x = 200;
        text4.y = 250;
        text4.touchEnabled = true;
        ;
        text4.addEventListener(egret.TextEvent.LINK, function () {
            console.log("点击文本");
        }, this);
        this.addChild(text4);
        //5 聊天框滚动
        var text5 = new eui.Label();
        text5.width = 200;
        text5.height = 200;
        text5.x = 0;
        text5.y = 300;
        text5.border = true;
        this.addChild(text5);
        text5.text = "1111111111111122222222222222222233333333333333333333344444444444444455555555555555555666666666666666666677777777777777777";
        console.log(text5.maxScrollV); //文本当前总行数
        text5.scrollV = 10; //将行数10，设置为第1行
        //每天聊天输入行的文字，则将scrollV增加...
        //6 位图字体  使用工具生成fnt和png
        var bmText = new egret.BitmapText();
        bmText.font = RES.getRes("111_fnt"); //获取的是BitmapFont，不需要获取png了.
        bmText.text = "Hello";
        bmText.x = 0;
        bmText.y = 400;
        this.addChild(bmText);
    };
    return TextExample;
})(egret.DisplayObjectContainer);
egret.registerClass(TextExample,"TextExample");
