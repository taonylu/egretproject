/**
 * 我的团队
 * @author 
 *
 */
class MyTeam {
    public teamObj = {};      //我的所有团队
    public myTeamName:string; //我的团队名
    
	public constructor() {
    	
	}
	
	private static instance:MyTeam;
	public static getInstance():MyTeam{
    	if(this.instance == null){
        	this.instance = new MyTeam();
    	}
    	return this.instance;
	}
}
