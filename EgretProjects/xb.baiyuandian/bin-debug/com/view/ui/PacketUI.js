/**
 * 红包基类
 * @author
 *
 */
var PacketUI = (function (_super) {
    __extends(PacketUI, _super);
    function PacketUI() {
        _super.call(this);
        this.texureList = new Array();
        this.scoreList = new Array();
        this.touchEnabled = true;
        this.packetBg = new egret.Bitmap();
        this.packetValue = new egret.Bitmap();
        this.addChild(this.packetBg);
        this.addChild(this.packetValue);
        this.bgTexture = RES.getRes("packetbg");
        this.packet0 = RES.getRes("packet_write");
        this.packet10 = RES.getRes("packet10");
        this.packet20 = RES.getRes("packet20");
        this.packet30 = RES.getRes("packet30_png");
        this.packet50 = RES.getRes("packet50");
        this.packet80 = RES.getRes("packet80_png");
        this.packet100 = RES.getRes("packet100");
        this.texureList.push(this.packet10, this.packet20, this.packet30, this.packet50, this.packet80, this.packet100);
        this.scoreList.push(0, 10, 20, 30, 50, 80, 100);
    }
    var d = __define,c=PacketUI,p=c.prototype;
    //随机红包皮肤
    p.randomSkin = function (start, end) {
        var rand = NumberTool.getRandomInt(start, end);
        if (rand == 0) {
            this.packetBg.texture = this.packet0;
            this.packetValue.texture = null;
        }
        else {
            this.packetBg.texture = this.bgTexture;
            this.packetValue.texture = this.texureList[rand - 1];
        }
        this.score = this.scoreList[rand];
        this.packetBg.width = 175;
        this.packetBg.height = 272;
        this.anchorOffsetX = this.packetBg.width / 2;
        this.anchorOffsetY = this.packetBg.height / 2;
        this.packetValue.y = 20;
        this.packetValue.x = (this.width - this.packetValue.width) / 2 + 10;
    };
    //发射
    p.shoot = function () {
        //随机方向
        this.rotation = NumberTool.getRandomInt(-30, 30);
        //随机飞行时间
        var flyTime = 1500 + Math.random() * 500; //200-700
        //飞行目的地
        var dist = 1500; //最远飞行距离
        var hudu = this.rotation * Math.PI / 180;
        var targetX = GameConst.stage.stageWidth / 2 + dist * Math.sin(hudu);
        var targetY = GameConst.stage.stageHeight - dist * Math.cos(hudu);
        egret.Tween.get(this).to({ x: targetX, y: targetY }, flyTime);
    };
    //回收
    p.recycle = function () {
        this.rotation = 0;
        this.parent && this.parent.removeChild(this);
        egret.Tween.removeTweens(this);
        ObjectPool.getPool(PacketUI.NAME).returnObject(this);
    };
    PacketUI.NAME = "PacketUI";
    return PacketUI;
})(egret.DisplayObjectContainer);
egret.registerClass(PacketUI,'PacketUI');
