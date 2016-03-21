/**
 *
 * @author
 *
 */
var People = (function () {
    function People() {
    }
    var d = __define,c=People,p=c.prototype;
    p.getName = function () {
        return this.name;
    };
    return People;
})();
egret.registerClass(People,'People',["TestInterface"]);
