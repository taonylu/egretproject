/**
 * 蓝月亮SDK
 * 后台记录玩家行为
 * @author chenkai
 * @date 2017/1/5
 * 
 * Example:
 * App.BluemoonSDK.tracking(App.BluemoonSDK.SHARE_GAME);
 */
class BluemoonSDK extends SingleClass{
    /**进入游戏*/
    public static ENTER_GAME: string = "enter_game";
    /**分享游戏*/
	public static SHARE_GAME:string = "share_game";
    /**开始游戏*/
    public static START_GAME: string = "start_game";
    /**进入商城*/
    public static ENTER_SHOP: string = "enter_shop";

	/**
	 * 记录数据
	 * @title 标题
	 */ 
    public tracking(title:string){
        if(window["tracking"]){
            console.log("bluemoon tracking:",title);
            window["tracking"].event(title,this.getDate());
        }
    }
	
	/**获取日期*/
	private getDate(): string {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        //日
        var ri = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
    
        var month_s: string,ri_s: string,hour_s: string,min_s: string;
    
        month_s = ((month >= 1 && month <= 9) ? "0" : "") + month;
    
        ri_s = ((ri >= 0 && ri <= 9) ? "0" : "") + ri;
    
        hour_s = ((hour >= 0 && hour <= 9) ? "0" : "") + hour;
    
        min_s = ((min >= 0 && min <= 9) ? "0" : "") + min;
    
        var currentdate = date.getFullYear() + seperator1 + month_s + seperator1 + ri_s
            + " " + hour_s + seperator2 + min_s
            + seperator2 + date.getSeconds();
    
        return currentdate;
    }
}


