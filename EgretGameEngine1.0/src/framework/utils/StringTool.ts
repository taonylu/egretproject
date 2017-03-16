/**
 * 字符串工具
 * @author chenkai
 * @date 2016/12/18
 */
class StringTool extends SingleClass{
	/**
     * 由A-Z,0-9随机组成一个指定长度验证码
     * @param n 验证码位数
     */ 
    public  getVerificationCode(n:number):string{
        var str:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var len:number = str.length;
        var code:string = "";
        for(var i:number=0;i<n;i++){
            code += str.charAt(App.NumberTool.getRandInt(0,len));
        }
        return code;
    }

    /**
     * 用"..."代替超出指定长度的字符串
     * @param str 源字符串
     * @param len 字符串可显示的长度
     * @returns 
     */
    public cutString(str:string, len:number):string{
        if(str.length > len){
            str = str.substr(0,len);
            str += "...";
        }
        return str;
    }

    /**
     * 检查字符串是否为空
     * @param str 源字符串
     * @return 是否为空
     */
    public checkEmpty(str:string):boolean{
        if(str.length == 0){
            return true;
        }
        return false;
    }

    /**
     * 检查电话号码是否符合
     * @param phoneNum 电话号码字符串
     * @returns 是否符合
     */
    public checkMobile(phoneNum:string):boolean{
        var regBox = {
            regEmail : /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,//邮箱
            regName : /^[a-z0-9_-]{3,16}$/,//用户名
            regMobile : /^0?1[3|4|5|8][0-9]\d{8}$/,//手机
            regTel : /^0[\d]{2,3}-[\d]{7,8}$/ //座机
        };
        
        return regBox.regMobile.test(phoneNum);
    }
}
