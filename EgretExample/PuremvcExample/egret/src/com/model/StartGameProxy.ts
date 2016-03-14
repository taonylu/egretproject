/**
 *
 * @author 
 *
 */
class StartGameProxy extends puremvc.Proxy implements puremvc.IProxy{
    public static NAME: string = "StartGameProxy";
	public constructor() {
    	super(StartGameProxy.NAME);
    	
    	//this.sendNotification("xxx",{body:"abc"});
	}
}
