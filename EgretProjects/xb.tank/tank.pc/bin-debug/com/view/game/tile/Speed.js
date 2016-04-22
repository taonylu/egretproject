/**
 * 加速地带
 * @author
 *
 */
var Speed = (function (_super) {
    __extends(Speed, _super);
    function Speed() {
        _super.call(this);
        this.canHit = false;
        this.canWalk = true;
    }
    var d = __define,c=Speed,p=c.prototype;
    Speed.NAME = "Speed";
    return Speed;
}(BaseTile));
egret.registerClass(Speed,'Speed');
