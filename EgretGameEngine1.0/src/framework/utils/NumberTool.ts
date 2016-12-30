/**
 * 数字工具类
 * @author chenkai
 * @date 2016/12/18
 */
class NumberTool extends SingleClass{
	/**
     * 获取范围内随机整数 [start,end]
     * @start 起始整数 
     * @end 终止整数
     */
    public getRandInt(start: number,end: number) {
        return start + Math.round(Math.random() * (end - start));
    }
}
