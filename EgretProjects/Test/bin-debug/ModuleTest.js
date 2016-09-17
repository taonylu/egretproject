/**
 *
 * @author
 *
 */
var ModuleTest;
(function (ModuleTest) {
    function run() {
        instance.walk();
    }
    ModuleTest.run = run;
    ;
    //export instance.father;  //public属性无法使用
    var Person = (function () {
        function Person() {
            this.nickName = "Peter";
            this.age = 18;
            this.father = "Davi";
        }
        var d = __define,c=Person,p=c.prototype;
        ;
        p.run = function () {
            console.log("run");
        };
        p.jump = function () {
            console.log("jump");
        };
        p.walk = function () {
            console.log("walk");
        };
        return Person;
    }());
    egret.registerClass(Person,'Person');
    var instance = new Person();
})(ModuleTest || (ModuleTest = {}));
