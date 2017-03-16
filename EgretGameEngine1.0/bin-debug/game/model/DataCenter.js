var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 数据中心
 * @author chenkai
 * @since 2016/12/18
 */
var DataCenter = (function (_super) {
    __extends(DataCenter, _super);
    function DataCenter() {
        return _super.call(this) || this;
    }
    return DataCenter;
}(SingleClass));
__reflect(DataCenter.prototype, "DataCenter");
//# sourceMappingURL=DataCenter.js.map