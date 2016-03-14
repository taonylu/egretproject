/**
 *
 * @author 
 *
 */
class GameManager extends puremvc.Facade implements puremvc.IFacade{
	public constructor() {
    	super();
	}
	
    public static getInstance(): GameManager {
        if(this.instance == null) {
            this.instance = new GameManager();
        }
        return <GameManager>(this.instance);
    }

    public startup(): void {
        console.log("game startup");
        this.registerCommand(GameConst.START_UP,StartupCommand);
        this.sendNotification(GameConst.START_UP);
        this.removeCommand(GameConst.START_UP);
    }
}
