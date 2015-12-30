module egret {
	export class Config{

		public static poolMaxItemNumber:number = 10;//缓存池最大同一对象数量
		/// 导出资源前缀
		public static RESImage:number = 0;//image
		public static RESShape:number = 1;//shape
		public static RESSprite:number = 2;//sprite
		public static RESText:number = 3;//text
		public static RESFont:number = 4;//font
		public static RESStage:number = 5;//stage只作为标识
		public static RESButton:number = 6;//button
		public static RESSound:number = 7;//sound
		// config names
		public static ConfigStage:string = "stage";
		/**
		 * 输出的文件名
		 * @param characterId
		 * @param resType
		 * @param extendInfo 扩展字段，支持多个扩展信息，以-分隔
		 * @return filename_resType_CharacterID-part1-xxx2
		 *
		 */
		public static GetResName(characterId:number, resType, extendInfo:any = null):string{
			var resname:string = "";
			resname = resType + "_" + characterId;
			resname += Config.GetExtendString(extendInfo);
			return resname;
		}
		public static GetExtendString(extendInfo:any = null):string{
			var extendstr:string = "";
			if(extendInfo != null){
				if(extendInfo instanceof Array)
				{
					var extendInfoArr:any[] = <any[]> extendInfo;
					var length:number = extendInfoArr.length;
					for(var i:number = 0;i < length;i++){
						var str:string = extendInfoArr[i];
						extendstr = extendstr + ("-" + str);
					}
				}
				else// if(extendInfo is String || extendInfo is int){
					extendstr = extendstr + ("-" + extendInfo);
			}
			return extendstr;
		}
	}
}