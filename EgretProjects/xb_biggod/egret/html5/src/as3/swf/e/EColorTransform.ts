
module egret {

	export class EColorTransform{
		/// 颜色变换 在egret下dragonBones.ColorTransform支持的属性如下
		//redOffset: number		红色值偏移，计算时用加法
		public ro:number = 0;
		//greenOffset: number		绿色值偏移，计算时用加法
		public go:number = 0;
		//blueOffset: number		蓝色值偏移，计算时用加法
		public bo:number = 0;
		//alphaOffset: number		透明度偏移，计算时用加法
		public ao:number = 0;
		//redMultiplier: number		红色值增幅，计算时用乘法
		public rm:number = 0;
		//greenMultiplier: number		绿色值增幅，计算时用乘法
		public gm:number = 0;
		//blueMultiplier: number		蓝色值增幅，计算时用乘法
		public bm:number = 0;
		//alphaMultiplier: number	透明度增幅，计算时用乘法
		public am:number = 1;

		public constructor(color:any = null){
			this.createFromObject(color);
		}
		public createFromObject(obj:any):void {
			if (null == obj) {
				return;
			}
			if (obj instanceof Array) {
				this.fromSlimData(obj);
			}else if(obj=="" || !obj){

			}else{
				this.CopyFromColor(obj);
			}
		}
		public fromSlimData(sd:any){
			if(sd instanceof Array){
				this.rm = <number>sd[0];
				this.gm = <number>sd[1];
				this.bm = <number>sd[2];
				this.am = <number>sd[3];
				this.ro = <number>sd[4];
				this.go = <number>sd[5];
				this.bo = <number>sd[6];
				this.ao = <number>sd[7];
			}
		}
		public CopyFromColor(color:any = null):void{
			if(null != color){
				this.ro = color.blueMultiplier;
				this.go = color.greenOffset;
				this.bo = color.blueOffset;
				this.ao = color.alphaOffset;
				this.rm = color.redMultiplier;
				this.gm = color.greenMultiplier;
				this.bm = color.blueMultiplier;
				this.am = color.alphaMultiplier;
			}
		}
	}
}