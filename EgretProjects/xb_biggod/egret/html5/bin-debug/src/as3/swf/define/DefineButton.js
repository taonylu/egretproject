/**
 * Created by chenpeng on 2015/6/2.
 */
var egret;
(function (egret) {
    var DefineButton = (function (_super) {
        __extends(DefineButton, _super);
        function DefineButton(obj) {
            if (obj === void 0) { obj = null; }
            _super.call(this, obj);
            this.createFromObject(obj);
        }
        var __egretProto__ = DefineButton.prototype;
        __egretProto__.createFromObject = function (obj) {
            _super.prototype.createFromObject.call(this, obj);
            if (null == obj) {
                return;
            }
            if (obj instanceof Array) {
                this.up = this.fromSlim(obj[2]); //up
                //this.over = this.fromSlim(obj[3]);
                this.down = this.fromSlim(obj[4]);
                this.hit = this.fromSlim(obj[5]);
            }
        };
        __egretProto__.fromSlim = function (arr) {
            var slimArr = [];
            if (arr instanceof Array) {
                for (var i = 0; i < arr.length; i++) {
                    var br = new egret.ButtonRecord();
                    br.fromSlimData(arr[i]);
                    slimArr.push(br);
                }
            }
            return slimArr;
        };
        return DefineButton;
    })(egret.DefineBase);
    egret.DefineButton = DefineButton;
    DefineButton.prototype.__class__ = "egret.DefineButton";
})(egret || (egret = {}));
