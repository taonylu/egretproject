/**
 * Created by mengj_000 on 2015/4/27.
 */


module flash
{
	export class Bitmap extends egret.Bitmap
	{
	    private $bitmapData:BitmapData;
	    private $pixelSnapping:string;
	    private $smoothing:boolean;

	    public constructor(bitmapData?:BitmapData,pixelSnapping?:string,smoothing?:boolean,preLoadingURL?:string)
	    {
	        super();
	        if(bitmapData) this.bitmapData = bitmapData;
	        this.$pixelSnapping = pixelSnapping==undefined?"auto":pixelSnapping;
	        this.$smoothing = smoothing==undefined?false:smoothing;
	        if(preLoadingURL != undefined)
	        {
	            this.bitmapData = LoadingUI.getEmbedBitmapData(preLoadingURL);
	        }
	    }

	    public get pixelSnapping():string
	    {
	        return this.$pixelSnapping;
	    }

	    public set pixelSnapping(val:string)
	    {
	        this.$pixelSnapping = val;
	    }

	    public get smoothing():boolean
	    {
	        return this.$smoothing;
	    }

	    public set smoothing(val:boolean)
	    {
	        this.$smoothing = val;
	    }

	    /**
	     * 设置位图数据
	     * @param val
	     */
	    public set bitmapData(bitmapData:BitmapData)
	    {
	        this.texture = bitmapData;
	    }

	    public get bitmapData():BitmapData
	    {
	        return <BitmapData> this.texture;
	    }

	    /// 与flash保持一致性：width与scaleX联动，height与scaleY联动
	    // measuredWidth在Bitmap中不会改变
	    // scaleX由width计算得到。宽度与scaleX的关系：scaleX = width / measuredWidth;
	    public get scaleX():number{
	        return this.width / this.measuredWidth;
	    }
	    public set scaleX(value:number){
	        this.width = value * this.measuredWidth;
	    }
	    // scaleY由height计算得到。高度与scaleY的关系：scaleY = height / measuredHeight;
	    public get scaleY():number{
	        return this.height / this.measuredHeight;
	    }
	    public set scaleY(value:number){
	        this.height = value * this.measuredHeight;
	    }
	    // width使用父类的
	    public get width(){
	        return this._getWidth();
	    }
	    public set width(value:number){
	        this._setWidth(value);
	    }
	    public get height():number{
	        return this._getHeight();
	    }
	    public set height(value:number){
	        this._setHeight(value);
	    }

	}

}