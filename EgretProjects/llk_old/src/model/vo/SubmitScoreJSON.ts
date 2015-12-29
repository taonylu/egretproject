/**
*  文 件 名：SubmitScoreJSON.ts
*  功    能： 提交分数JSON
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/14
*  修改日期：2015/9/14
*  修改日志：
*/
class SubmitScoreJSON{
    
    public json;
    public cmd: number = 1002;
    public name: string;
    public score: number;
	
    public getJSONString():string { 
        this.json = {
            "cmd":this.cmd,
            "name": this.name,
            "score": this.score
        }
        return JSON.stringify(this.json);
    }
            
    public readData(json): void { 
        this.json = json;
        this.cmd = this.json.cmd;
        this.name = this.json.name;
        this.score = this.json.score;
    }
   
}





