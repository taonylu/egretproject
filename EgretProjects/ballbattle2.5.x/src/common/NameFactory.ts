/**
*  文 件 名：NameFactory.ts
*  功    能：名字工厂
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/10/14
*  修改日期：2015/10/14
*  修改日志：
*/
class NameFactory {
    
    private firstNameList = ["大","小","很大的","白色的","美","TT","BB","AA"];
    private lastNameList = ["西瓜","兔","蛇","牛","羊","怪"];
    
    public getOne(): string { 
        var firstName: string = this.firstNameList[NumberTool.getRandomInt(0,this.firstNameList.length - 1)];
        var lastName:string = this.lastNameList[NumberTool.getRandomInt(0,this.lastNameList.length - 1)]
        return firstName + lastName;
    }
    
    
    private static instance: NameFactory;
    public static getInstance(): NameFactory { 
        if(this.instance == null) { 
            this.instance = new NameFactory();
        }
        return this.instance;
    }
}
