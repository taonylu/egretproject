/**
*  文 件 名：NameFactory.ts
*  功    能：名字工厂
*  内    容：
*  作    者： 羊力大仙
*  生成日期：2015/10/14
*  修改日期：2015/10/14
*  修改日志：
*/
var NameFactory = (function () {
    function NameFactory() {
        this.firstNameList = ["大", "小", "很大的", "白色的", "美", "TT", "BB", "AA"];
        this.lastNameList = ["西瓜", "兔", "蛇", "牛", "羊", "怪"];
    }
    var d = __define,c=NameFactory;p=c.prototype;
    p.getOne = function () {
        var firstName = this.firstNameList[NumberTool.getRandomInt(0, this.firstNameList.length - 1)];
        var lastName = this.lastNameList[NumberTool.getRandomInt(0, this.lastNameList.length - 1)];
        return firstName + lastName;
    };
    NameFactory.getInstance = function () {
        if (this.instance == null) {
            this.instance = new NameFactory();
        }
        return this.instance;
    };
    return NameFactory;
})();
egret.registerClass(NameFactory,"NameFactory");
