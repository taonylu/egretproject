/**
 *
 * @author 
 *
 */
class HomeMediator extends puremvc.Mediator implements puremvc.IMediator{
    public static NAME: string = "HomeMediator";
    public static SHOW:string = "HomeMediator_SHOW";
	public constructor() {
        super(HomeMediator.NAME);
	}
	
    public listNotificationInterests(): string[] {
        return [HomeMediator.SHOW];
    }

    public handleNotification(notification: puremvc.INotification): void {
        switch(notification.getName()) {
            case HomeMediator.SHOW:
                console.log("homemetiator show");
                this.show(notification.getBody());
                break;
        }
    }
    
    public show(data){
        console.log("执行show函数:",data);
    }
}
