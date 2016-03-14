/**
 *
 * @author
 *
 */
var MutileCommand = (function (_super) {
    __extends(MutileCommand, _super);
    function MutileCommand() {
        _super.call(this);
    }
    var d = __define,c=MutileCommand,p=c.prototype;
    //执行execute则不执行initializeMacroCommand
    //    public execute(notification: puremvc.INotification): void{
    //        console.log("execute mutilecommand");
    //    }
    p.initializeMacroCommand = function () {
        console.log("init mutilecommand");
        //以下两个命令按先进先出顺序执行; 
        this.addSubCommand(AttackCommand);
        //this.addSubCommand(ViewPrepCommand);
    };
    return MutileCommand;
})(puremvc.MacroCommand);
egret.registerClass(MutileCommand,'MutileCommand',["puremvc.ICommand","puremvc.INotifier"]);
