/**
 * 水果基类
 * @author
 *
 */
var BaseFruit = (function (_super) {
    __extends(BaseFruit, _super);
    function BaseFruit() {
        _super.call(this);
        this.z = 0; //虚拟z轴
        this.score = 0; //分值
        this.track = 0; //赛道
    }
    var d = __define,c=BaseFruit,p=c.prototype;
    p.recycle = function () {
    };
    return BaseFruit;
}(egret.Bitmap));
egret.registerClass(BaseFruit,'BaseFruit');
