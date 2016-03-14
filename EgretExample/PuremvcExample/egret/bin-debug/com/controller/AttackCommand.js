/**
 *
 * @author
 *
 */
var AttackCommand = (function (_super) {
    __extends(AttackCommand, _super);
    function AttackCommand() {
        _super.apply(this, arguments);
    }
    var d = __define,c=AttackCommand,p=c.prototype;
    p.execute = function (notification) {
        console.log("execute AttackCommand");
    };
    return AttackCommand;
})(puremvc.SimpleCommand);
egret.registerClass(AttackCommand,'AttackCommand');
