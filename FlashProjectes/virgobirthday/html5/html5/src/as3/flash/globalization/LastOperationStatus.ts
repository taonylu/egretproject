/**
 * Created by huitao on 2015/9/2.
 */
module flash
{
    export class LastOperationStatus
    {

        /**[��̬] ��ʾ�����Ļ��������������ɽ����*/
        static BUFFER_OVERFLOW_ERROR : string = "bufferOverflowError"
            

        /** [��̬] ��ʾ���صĴ������δ֪��*/
        static ERROR_CODE_UNKNOWN : string = "errorCodeUnknown"
           
        /** [��̬] ��ʾ���ݸ������Ĳ����ǷǷ��ġ�*/
        static ILLEGAL_ARGUMENT_ERROR : string = "illegalArgumentError"
           

        /** [��̬] ��ʾ������������Χ����Ϊ�¡��ջ�ʱ��ָ���Ĳ�����Ч��*/
        static INDEX_OUT_OF_BOUNDS_ERROR : string = "indexOutOfBoundsError"

        /**[��̬] ��ʾ����������ֵ������Ԥ�ڵķ�Χ��*/
        static INVALID_ATTR_VALUE : string = "invalidAttrValue"
            
        /** [��̬] ��ʾ�ҵ���Ч�� Unicode ֵ��*/
        static INVALID_CHAR_FOUND : string = "invalidCharFound"
           
        /**[��̬] ��ʾ�ڴ������ʧ�ܡ�*/
        static MEMORY_ALLOCATION_ERROR : string = "memoryAllocationError"
            

        /** [��̬] ��ʾ��һ�����ɹ���δ�����κδ���*/
       static NO_ERROR : string = "noError"
           

        /** [��̬] ��ʾ����������ֵ����ָ�����������͡�*/
        static NUMBER_OVERFLOW_ERROR : string = "numberOverflowError"
           

        /**[��̬] ��ʾ��������ʧ�ܡ�*/
        static PARSE_ERROR : string = "parseError"
            
        
        /** [��̬] ��ʾ�������֡����ڻ�ʱ���ʽ���õ�ģʽ��Ч��*/
        static PATTERN_SYNTAX_ERROR : string = "patternSyntaxError"
           


        /**[��̬] ��ʾ����ƽ̨ API ִ��ĳ����ʧ�ܡ�*/
        static PLATFORM_API_FAILED : string = "platformAPIFailed"
            

        /**[��̬] ��ʾ�ҵ��ضϵ� Unicode �ַ�ֵ��*/
        static TRUNCATED_CHAR_FOUND : string = "truncatedCharFound"
            

        /**[��̬] ��ʾ���������� ID �ַ����м�⵽����ı�ǡ�*/
        static UNEXPECTED_TOKEN : string = "unexpectedToken"
            

        
        /**[��̬] ��ʾ��֧������Ĳ�����ѡ�*/
        static UNSUPPORTED_ERROR : string = "unsupportedError"
            
        /**[��̬] ��ʾ����������ڼ�ʹ���˲���ϵͳĬ��ֵ��*/
        static USING_DEFAULT_WARNING : string = "usingDefaultWarning"
            
        /** [��̬] ��ʾ����������ڼ������˻���ֵ��*/
        static USING_FALLBACK_WARNING : string = "usingFallbackWarning"

        constructor()
        {

        }


    }
}