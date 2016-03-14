/**
 *
 * @author 
 *
 */
class MutileCommand extends puremvc.MacroCommand implements puremvc.ICommand{
	public constructor() {
        super();
	}
	
	//执行execute则不执行initializeMacroCommand
//    public execute(notification: puremvc.INotification): void{
//        console.log("execute mutilecommand");
//    }
	
    public initializeMacroCommand(): void { 
        console.log("init mutilecommand");
        //以下两个命令按先进先出顺序执行; 
        this.addSubCommand(AttackCommand);
        //this.addSubCommand(ViewPrepCommand);
 
    }
	
}
