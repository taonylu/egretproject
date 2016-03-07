/**
*  文 件 名： StringTool.ts
*  功    能： 字符串工具类
*  内    容： 
*  作    者： Rikimaru
*  生成日期：2015/9/15
*  修改日期：2015/9/15
*  修改日志：
*/
class StringTool {
    /**
     * 获取时间字符串
     * @param time 时间数字
     * @return 补0后的时间字符串
     * 
     * 范例：
     * getTimeString(7)  //返回"07"
     * getTimeString(11) //返回"11"
     */
    public static getTimeString(time: number): string {
        var str: string = "";
        if(time < 10) {
            str = "0" + time;
        } else {
            str = time.toString();
        }
        return str;
    }

    
    /**
    * 中英文混合字符串转换成包含unicode码的字符串
    * "abc一二三123" -> "abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123"
    */
//    public static mixToUnicode(str:string){
//        var i = 0;
//        var l = str.length;
//        var result = "";             //转换后的结果
//        var unicodePrefix = "\\u";   //unicode前缀 (example:\1234||\u1234)
//        var unicode16;               //转换成16进制后的unicode
//        var charCode;
//        for (; i < l; i++) {
//            //转为16进制的unicode
//            charCode = str.charCodeAt(i);
//            if(charCode > 255) {
//                unicode16 = charCode.toString(16);
//                 result += unicodePrefix + unicode16;
//            } else { 
//                result += str.charAt(i);
//            }
//        }
//        return result;
//    }
    
    /**
     *中英文混合unicode转换成含中文的字符串
     * abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123 ->abc一二三123
     */ 
//    public static mixUnicodeToCh(str:string): string { 
//        return <string>eval("'" + str + "'");
//    }
}
