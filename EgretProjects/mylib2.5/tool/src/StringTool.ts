/**
*  文 件 名：StringTool.ts
*  功    能： 字符串工具类
*  内    容： 
*  作    者： 羊力大仙
*  生成日期：2015/9/15
*  修改日期：2015/9/15
*  修改日志：
*/
class StringTool {
    /**
    * 中英文混合字符串转换成包含unicode码的字符串
    * "abc一二三123" -> "abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123"
    */
    public static mixToUnicode(str:string){
        var i = 0;
        var l = str.length;
        var result = "";             //转换后的结果
        var unicodePrefix = "\\u";   //unicode前缀 (example:\1234||\u1234)
        var unicode16;               //转换成16进制后的unicode
        var charCode;
        for (; i < l; i++) {
            //转为16进制的unicode
            charCode = str.charCodeAt(i);
            if(charCode > 255) {
                unicode16 = charCode.toString(16);
                 result += unicodePrefix + unicode16;
            } else { 
                result += str.charAt(i);
            }
        }
        return result;
    }
    
    /**
     *中英文混合unicode转换成含中文的字符串
     * abc\u4e00\u4e8c\u4e09123\u554a\u554a\u554a123 ->abc一二三123
     */ 
    public static mixUnicodeToCh(str:string): string { 
        return <string>eval("'" + str + "'");
    }
        
    /**
    * 中英文混合unicode转成字符串
    * "a,b,c,\u4e00,\u4e8c,\u4e09,1,2,3" -> "abc一二三123"
    */
//    public static unicodeToMix(str:string): string { 
//        var arr: Array<any> = str.split(",");
//        var len: number = arr.length;
//        var str: string = "";
//        for(var i: number=0;i < len;i++) { 
//            if( arr[i].charAt(0) == "\\") {
//                str += <string>eval(arr[i]);
//            } else { 
//                str += arr[i];
//            }
//        }
//        return str;
//    }
            
    /**
    * 十进制unicode转中文
    * 19968->一
    */ 
//    public static unicode10ToCh(num:number): void { 
//        return  eval("'\\u" + num.toString(16) + "'");
//    }
}
