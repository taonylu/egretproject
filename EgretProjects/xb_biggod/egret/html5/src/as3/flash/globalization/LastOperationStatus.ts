/**
 * Created by huitao on 2015/9/2.
 */
module flash
{
    export class LastOperationStatus
    {

        /**[静态] 表示给定的缓冲区不足以容纳结果。*/
        static BUFFER_OVERFLOW_ERROR : string = "bufferOverflowError"
            

        /** [静态] 表示返回的错误代码未知。*/
        static ERROR_CODE_UNKNOWN : string = "errorCodeUnknown"
           
        /** [静态] 表示传递给方法的参数是非法的。*/
        static ILLEGAL_ARGUMENT_ERROR : string = "illegalArgumentError"
           

        /** [静态] 表示迭代器超出范围或者为月、日或时间指定的参数无效。*/
        static INDEX_OUT_OF_BOUNDS_ERROR : string = "indexOutOfBoundsError"

        /**[静态] 表示给定的属性值超出了预期的范围。*/
        static INVALID_ATTR_VALUE : string = "invalidAttrValue"
            
        /** [静态] 表示找到无效的 Unicode 值。*/
        static INVALID_CHAR_FOUND : string = "invalidCharFound"
           
        /**[静态] 表示内存分配已失败。*/
        static MEMORY_ALLOCATION_ERROR : string = "memoryAllocationError"
            

        /** [静态] 表示上一操作成功，未出现任何错误。*/
       static NO_ERROR : string = "noError"
           

        /** [静态] 表示操作产生的值超出指定的数字类型。*/
        static NUMBER_OVERFLOW_ERROR : string = "numberOverflowError"
           

        /**[静态] 表示解析数字失败。*/
        static PARSE_ERROR : string = "parseError"
            
        
        /** [静态] 表示设置数字、日期或时间格式所用的模式无效。*/
        static PATTERN_SYNTAX_ERROR : string = "patternSyntaxError"
           


        /**[静态] 表示基础平台 API 执行某操作失败。*/
        static PLATFORM_API_FAILED : string = "platformAPIFailed"
            

        /**[静态] 表示找到截断的 Unicode 字符值。*/
        static TRUNCATED_CHAR_FOUND : string = "truncatedCharFound"
            

        /**[静态] 表示在区域设置 ID 字符串中检测到意外的标记。*/
        static UNEXPECTED_TOKEN : string = "unexpectedToken"
            

        
        /**[静态] 表示不支持请求的操作或选项。*/
        static UNSUPPORTED_ERROR : string = "unsupportedError"
            
        /**[静态] 表示在最近操作期间使用了操作系统默认值。*/
        static USING_DEFAULT_WARNING : string = "usingDefaultWarning"
            
        /** [静态] 表示在最近操作期间设置了回退值。*/
        static USING_FALLBACK_WARNING : string = "usingFallbackWarning"

        constructor()
        {

        }


    }
}