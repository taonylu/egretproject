var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 字符串工具
 * @author chenkai
 * @date 2016/12/18
 */
var StringTool = (function (_super) {
    __extends(StringTool, _super);
    function StringTool() {
        return _super.apply(this, arguments) || this;
    }
    /**
     * 由A-Z,0-9随机组成一个指定长度验证码
     * @param n 验证码位数
     */
    StringTool.prototype.getVerificationCode = function (n) {
        var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len = str.length;
        var code = "";
        for (var i = 0; i < n; i++) {
            code += str.charAt(App.NumberTool.getRandInt(0, len));
        }
        return code;
    };
    /**
     * 用"..."代替超出指定长度的字符串
     * @param str 源字符串
     * @param len 字符串可显示的长度
     * @returns
     */
    StringTool.prototype.cutString = function (str, len) {
        if (str.length > len) {
            str = str.substr(0, len);
            str += "...";
        }
        return str;
    };
    /**
     * 检查字符串是否为空
     * @param str 源字符串
     * @return 是否为空
     */
    StringTool.prototype.checkEmpty = function (str) {
        if (str.length == 0) {
            return true;
        }
        return false;
    };
    /**
     * 检查电话号码是否符合
     * @param phoneNum 电话号码字符串
     * @returns 是否符合
     */
    StringTool.prototype.checkMobile = function (phoneNum) {
        var regBox = {
            regEmail: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
            regName: /^[a-z0-9_-]{3,16}$/,
            regMobile: /^0?1[3|4|5|8][0-9]\d{8}$/,
            regTel: /^0[\d]{2,3}-[\d]{7,8}$/ //座机
        };
        return regBox.regMobile.test(phoneNum);
    };
    return StringTool;
}(SingleClass));
__reflect(StringTool.prototype, "StringTool");
//# sourceMappingURL=StringTool.js.map