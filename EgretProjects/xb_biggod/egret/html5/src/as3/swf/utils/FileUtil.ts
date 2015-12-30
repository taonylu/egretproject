module egret {

	export class FileUtil{
		/**
		 * 返回指定文件的父级文件夹路径,返回字符串的结尾已包含分隔符。
		 */		
		public static getDirectory(path:string):string{
			path = FileUtil.escapeUrl(path);
			var endIndex:number = path.lastIndexOf("/");
			if(endIndex==-1){
				return "";
			}
			return path.substr(0,endIndex+1);
		}
		/**
		 * 获得路径的扩展名
		 */		
		public static getExtension(path:string):string{
			path = FileUtil.escapeUrl(path);
			var index:number = path.lastIndexOf(".");
			if(index==-1)
				return "";
			var i:number = path.lastIndexOf("/");
			if(i>index)
				return "";
			return path.substring(index+1);
		}
		/**
		 * 转换url中的反斜杠为斜杠
		 */
		public static escapeUrl(url:string):string{
			return <boolean><any> (!url)?"":url.split("\\").join("/");
		}
	}
}