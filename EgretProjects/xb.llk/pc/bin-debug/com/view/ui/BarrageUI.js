/**
 * 弹幕UI
 * @author
 *
 */
var BarrageUI = (function (_super) {
    __extends(BarrageUI, _super);
    function BarrageUI() {
        _super.call(this);
        this.textList = new Array(); //弹幕文本数组
        this.textMax = 20; //弹幕最大数量
        this.width = GameConst.stage.width;
        this.height = GameConst.stage.height;
        this.touchChildren = false;
        this.touchEnabled = false;
        for (var i = 0; i < this.textMax; i++) {
            var text = new egret.TextField();
            text.size = 100;
            text.textColor = 0xFF0000;
            this.textList.push(text);
        }
    }
    var d = __define,c=BarrageUI,p=c.prototype;
    //显示一条弹幕
    p.showOneMsg = function (data) {
        var textField = this.textList.pop();
        if (textField != null) {
            textField.text = data.msg;
            textField.x = GameConst.stage.stageWidth + textField.width; //x从右方1000处开始运动
            textField.y = 200 + Math.random() * (GameConst.stage.stageHeight - 400); //y范围
            this.addChild(textField);
            var self = this;
            egret.Tween.get(textField).to({ x: -textField.width }, 10000).call(function () {
                self.textList.push(textField);
            });
        }
    };
    return BarrageUI;
})(egret.DisplayObjectContainer);
egret.registerClass(BarrageUI,'BarrageUI');
