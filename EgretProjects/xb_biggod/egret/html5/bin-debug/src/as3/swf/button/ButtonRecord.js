/**
 * Created by chenpeng on 2015/6/9.
 */
var egret;
(function (egret) {
    var ButtonRecord = (function () {
        function ButtonRecord() {
            this.sx = 1; //x����
            this.sy = 1; //y����
            this.r = 0; //��ת�Ƕ�
            this.tx = 0;
            this.ty = 0;
        }
        var __egretProto__ = ButtonRecord.prototype;
        __egretProto__.fromSlimData = function (sd) {
            if (sd instanceof Array) {
                this.characterId = sd[0];
                this.tx = sd[1];
                this.ty = sd[2];
                this.r = sd[3];
                this.sx = sd[4];
                this.sy = sd[5];
                this.color = new egret.EColorTransform(sd[6]);
            }
        };
        return ButtonRecord;
    })();
    egret.ButtonRecord = ButtonRecord;
    ButtonRecord.prototype.__class__ = "egret.ButtonRecord";
})(egret || (egret = {}));
