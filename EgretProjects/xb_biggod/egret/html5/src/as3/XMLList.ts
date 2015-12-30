/**
* Created by huitao on 4/28/2015.
*/

module flash
{


    export class XMLList
	{
		public _value:any;

		constructor(_value:any = null)
		{
			this._value = _value;
		}

		/**
		 * 调用每个 XML 对象的 attributes() 方法，并返回每个 XML 对象属性的 XMLList 对象。
		 * @returns {null}
		 */
		public attributes():XMLList
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].attributes)
				{
					list = (<XML> this[p] ).attributes();
					rlt = rlt.concat(list);
				}
			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].dotExpr)
					{
						ret[num] = rlt[i][a];
						num ++;
					}

				}
			}

			return ret;
		}

		/**
		 * 调用每个 XML 对象的 attributes() 方法，并返回每个 XML 对象属性的 XMLList 对象。
		 * @param attributeName
		 * @returns {XMLList}
		 */
		public attribute(attributeName:any):XMLList
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].attribute)
				{
					list = (<XML> this[p] ).attribute(attributeName);
					rlt = rlt.concat(list);
				}

			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].attribute)
					{
						ret[num] = rlt[i][a];
						num ++;
					}
				}
			}

			return ret;
		}

		/**
		 * 调用每个 XML 对象的 child() 方法，并返回包含有序结果的 XMLList 对象。
		 * @param propertyName
		 * @returns {*}
		 */
		public child(propertyName:string):XMLList
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].child)
				list = (<XML> this[p] ).child(propertyName);
				rlt = rlt.concat(list);
			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].dotExpr)
					{
						ret[num] = rlt[i][a];
						num ++;
					}

				}
			}

			return ret;
		}

		public copy():XMLList
		{
			var list:XML ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].copy)
				{
					list = (<XML> this[p]).copy();
					rlt.push(list);
				}
			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].copy)
					{
						ret[num] = rlt[i][a];
						num ++;
					}

				}
			}
			return ret;
		}

		public descendants(_name?:any):XMLList
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].descendants)
				{
					list = (<XML> this[p] ).descendants(_name);
					rlt = rlt.concat(list);
				}

			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].descendants)
					{
						ret[num] = rlt[i][a];
						num ++;
					}

				}
			}

			return ret;
		}


		public dotAt(_name:string ,_value?:any,exp:string = "==",isexp:boolean = true):XMLList
		{
			var arr:Array<any> = new Array<any>();

			var list:XMLList = new XMLList();
			var xml:XML = null;
			var num:number = 0 ;
			var rlt:Array<any> = [];
			for(var p in this)
			{
				xml = this[p];
				if(xml && xml.dotAt)
				{
					rlt = rlt.concat(xml.dotAt(_name,_value,exp,isexp));
				}
			}

			for(var i:number = 0 ;i < rlt.length ;i ++)
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].children)
					{
						list[num] = rlt[i][a];
						num ++;
					}

				}
			}


			return list;
		}

		public contains(_value:any):boolean
		{
			var rets:boolean = false ;

			for( var p in this)
			{
				if(this[p] && this[p].contains)
					rets = (<XML> this[p] ).contains(_value);
				if(rets == true)
					return true;
			}
			return rets;
		}

		/**
		 * 调用每个 XML 对象的 children() 方法，并返回包含结果的 XMLList 对象。
		 * @returns {null}
		 */
		public children():XMLList
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].children)
				{
					list = (<XML> this[p] ).children();
					rlt = rlt.concat(list);
				}
			}

			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].children)
					{
						ret[num] = rlt[i][a];
						num ++;
					}
				}
			}

			return ret;

		}

		/**
		 * 列出所有XML 对象的元素。
		 * @param name
		 * @returns {XMLList}
		 */
		public elements(name:any):XMLList
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].elements)
				{
					list = (<XML> this[p] ).elements(name);
					rlt = rlt.concat(list);
				}
			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].elements)
					{
						ret[num] = rlt[i][a];
						num ++;
					}

				}
			}

			return ret;
		}

		/**
		 * 检查 XMLList 对象是否包含复杂内容。
		 */
		public hasComplexContent():boolean
		{
			var list:XMLList ;
			var rlt:Array<any> = [];
			for( var p in this)
			{
				if(this[p] && this[p].hasComplexContent && <XML> this[p].hasComplexContent() )
				{
					return true;
				}
			}
			return false;
		}

		public hasSimpleContent():boolean
		{
			return !this.hasComplexContent();
		}

		public hasOwnProperty(_value:any):boolean
		{
			var rets:boolean = false ;

			for( var p in this)
			{
				if(this[p] && this[p].hasOwnProperty)
				{
					rets = (<XML> this[p]).hasOwnProperty(_value);
					if(rets == true)
						return true;
				}

			}
			return rets;
		}

		public parent ():any
		{
			var list:XMLList ;
			var rlt:Array<any> = new Array<any>();

			//var num:number = 0;
			//var leng:number = this._value.length;
			//if(leng == 0) return undefined;
			//用于保存相同的个数

			var d:Dictionary = new Dictionary();


			for( var p in this)
			{
				if(this[p] && this[p].dotExpr)
				{
					d.setItem(this[p].parent() ? this[p].parent().$valueObj : this[p].parent(),p);
				}
			}

			if(d.map.length == 0 || d.map.length > 1)
			{
				return undefined;
			}


			return this[0].parent();

		}

		public toXMLString():string
		{
			//对各个进行处理
			var ret:string = "";

			for( var p in this)
			{
				if(this[p] && this[p].dotExpr)
				{
					ret = ret.concat((this[p]).toXMLString());
				}

			}

			return ret;
		}

		public length():number
		{
			var num:number = 0;
			for( var p in this)
			{
				if(this[p] && this[p].toXMLString)
				{
					num ++;
				}
			}
			return num;
		}


		public dot(m?:any):any
		{
			var num:number = 0 ;
			var ret:XMLList = new XMLList();

			var list:XMLList ;
			var rlt:Array<any> = [];
			if(typeof(m) == "number" && this[m])
			{
				ret[0] = this[m];
			}
			else
			{
				for( var p in this)
				{
					if(this[p] && this[p].dot)
					{
						list = (<XML> this[p] ).dot(m);
						rlt = rlt.concat(list);
					}
				}
			}


			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].dot)
					{
						ret[num] = rlt[i][a];
						num ++;
					}
				}
			}

			return ret;
		}

		public dotStar(m?:any):any
		{
			return this.dot();
		}

		public dotExpr(m?:any, v:any = null,exp:string = ""):any
		{
			var list:XMLList = new XMLList();
			var rlt:Array<any> = [];

			for( var p in this)
			{
				if(this[p] && this[p].dotExpr)
				{
					list = (this[p]).dotExpr(m,v,exp);
					rlt = rlt.concat(list);
				}

			}
			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].dotExpr)
					{
						ret[num] = rlt[i][a];
						num ++;
					}
				}
			}

			return ret;
		}

		public dotAtExpr(m?:any,v?:any,exp?:any):any
		{
			return this.dotAt(m,v,exp,true);
		}

		public dotDouble(m?:any):any
		{
			return this.descendants(m);
		}

		public dotDoubleStar(m?:any):any
		{
			return this.descendants();
		}

		public dotAlt(m?:any,v?:any,exp?:any):any
		{
			var list:XMLList = new XMLList();
			var rlt:Array<any> = [];
			var xmlt:XML;

			for( var p in this)
			{
				if(this[p] && this[p].dotAlt)
				{
					xmlt = (this[p]).dotAlt(m,v,exp,false);
					rlt = rlt.concat(xmlt);
				}
			}

			var num:number = 0 ;
			var ret:XMLList = new XMLList();
			for(var i:number = 0 ;i <rlt.length;i ++ )
			{
				for(var a in rlt[i])
				{
					if(rlt[i][a] && rlt[i][a].dotExpr)
					{
						ret[num] = rlt[i][a];
						num ++;
					}
				}
			}
			return ret;
		}

	}
}

