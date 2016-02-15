﻿module tiled{
	export class TMXTilemap extends egret.Sprite {
		private _name: string;
		private _data: any;
		private _cols: number;
		private _rows: number;
		private _tilewidth: number;
		private _tileheight: number;
		private _version: number;
		private _orientation: string;
		private _renderorder: string;
		private _z: number;
		private _nextobjectid: number;
		private _hexsidelength: number;
		private _staggeraxis: string;
		private _staggerindex: string;
		private _backgroundcolor: string;

		private _initialized: boolean;

		private _properties: Array<tiled.TMXProperty>;
		private _layers: Array<any>;
		private _objectGroups: Array<tiled.TMXObjectGroup>;
		private _tilesets: tiled.TMXTilesetGroup;
		private _tmxRenderer: tiled.TMXRenderer = null;
		private _showHideBackground:boolean;

		private _baseURL: string;
		private _renderWidth: number;
		private _renderHeight: number;
		constructor(renderwidth: number, renderheight: number, data: any, url: string) {
			super();
			this._data           = data;
			this._renderWidth    = renderwidth;
			this._renderHeight   = renderheight;
			this._cols           = +data.attributes.width;
			this._rows           = +data.attributes.height;
			this._tilewidth      = +data.attributes.tilewidth;
			this._tileheight     = +data.attributes.tileheight;
			this._nextobjectid   = +data.attributes.nextobjectid;
			this._version        = +data.attributes.version;
			this._orientation    = data.attributes.orientation;
			this._renderorder    = data.attributes.renderorder;
			this._baseURL        = url;
			this._baseURL        = decodeURIComponent(this._baseURL);
			var lastIndex: number = this._baseURL.lastIndexOf("/");
			this._baseURL        = this._baseURL.slice(0, lastIndex + 1);
			if (this._orientation === tiled.TMXConstants.ORIENTATION_ISOMETRIC) {
				this.width       = (this._cols + this._rows) * (this._tilewidth / 2);
				this.height      = (this._cols + this._rows) * (this._tileheight / 2);
			} else {
				this.width       = this._cols * this._tilewidth;
				this.height      = this._rows * this._tileheight;
			}

			this._hexsidelength  = +data.attributes.hexsidelength;
			this._staggeraxis    = data.attributes.staggeraxis || undefined;
			this._staggerindex   = data.attributes.staggerindex || undefined;

			this._backgroundcolor = data.attributes.backgroundcolor;

			this._z = 0;
			this._layers = [];
			this._objectGroups = [];
			//初始化默认的渲染
			if (this._tmxRenderer === null || !this._tmxRenderer.canRender(this)) {
				this._tmxRenderer = this.getNewDefaultRenderer(this);
			}

			this._initialized = false;
		}

		get nextobjectid() {
			return this._nextobjectid;
		}

		get tilewidth() {
			return this._tilewidth;
		}

		get tileheight() {
			return this._tileheight;
		}

		get baseURL() {
			return this._baseURL;
		}

		get renderwidth() {
			return this._renderWidth;
		}

		get renderheight() {
			return this._renderHeight;
		}

		//解析属性
		parseProperties(data: any): Array<tiled.TMXProperty> {
			var properties: Array<tiled.TMXProperty>;
			var children: Array<any>                = data.children;
			if (children) {
				properties                          = [];
				for (var i: number = 0; i < children.length; i++) {
					var child: any                  = children[i];
					var tmxProperty: tiled.TMXProperty    = new tiled.TMXProperty();
					tmxProperty.name                = child.attributes.name;
					tmxProperty.value               = child.attributes.value;
					properties[i]                   = tmxProperty;
				}
			}
			return properties;
		}

		//渲染
		render(): void {
			//add all layers instances
			var layers: Array<any>              = this.getLayers(); 
			for (var i: number = 0; i < layers.length; i++) {
			   this.addChild(layers[i]);
			}
			//add all Object instances
			var objects: Array<tiled.TMXObjectGroup>  = this.getObjects();
			for (var i: number = 0; i < objects.length; i++) {
				this.addChild(objects[i]);
			}
			this.addEventListener(egret.Event.ENTER_FRAME, this.onStartRendering, this);
		}

		//获取所有的图层
		getLayers(): Array<any> {
			this.readMapObjects(this._data);
			return this._layers;
		}

		getObjects(): Array<tiled.TMXObjectGroup> {
			this.readMapObjects(this._data);
			return this._objectGroups;
		}
		
		showHideBackground(isShow:boolean){
			this._showHideBackground=isShow;
			for(var i:number=0;i<this._layers.length;i++)
			{
				var layer:any=this._layers[i];
				if(layer instanceof tiled.TMXColorLayer)
				{
					layer.visible=isShow;
					return;
				}
			}
		}
		
		destory(): void {
			this._tilesets = undefined;
			this._layers = [];
			this._objectGroups = [];
			this._initialized = false;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onStartRendering, this);
			tiled.TexturePool.removeAllTextures();
			tiled.TMXTileset.removeAllTextures();
		}
		
		//读取地图上的对象
		private readMapObjects(data: any): void {
			if (this._initialized === true)
				return;

			//自动排序
			var zOrder: number      = this._z;
			var self: tiled.TMXTilemap    = this;
			if (!this._tilesets)
				this._tilesets       = new tiled.TMXTilesetGroup(this);

			if (this._backgroundcolor&&this._showHideBackground) 
				this._layers.push(new tiled.TMXColorLayer(this,this._backgroundcolor, zOrder++));
			
			var children: Array<any> = this._data.children;
			if (children) {
				for (var i: number = 0; i < children.length; i++) {
					var child: any = children[i];
					switch (child.localName) {
						case tiled.TMXConstants.TILE_SET:
							this._tilesets.add(new tiled.TMXTileset(this, child));
							break;

						case tiled.TMXConstants.LAYER:
							this._layers.push(this.parseLayer(child, zOrder++));
							break;

						case tiled.TMXConstants.OBJECT_GROUP:
							this._objectGroups.push(this.parseObjectGroup(child, zOrder++));
							break;

						case tiled.TMXConstants.PROPERTIES:
							this._properties = this.parseProperties(child);
							break;

						case tiled.TMXConstants.IMAGE_LAYER:
							this._layers.push(this.parseImageLayer(child, zOrder++));
							break;
					}
				}
			}

			var loadCount: number = 0;
			for (var i: number = 0; i < this._tilesets.length; i++) {
				var tileset: tiled.TMXTileset = this._tilesets.getTilesetByIndex(i);
				if (tileset.image) {
					var onImageLoad: Function = function (event:tiled.TMXImageLoadEvent): void {
						var target:TMXImage=event.currentTarget;
						target.removeEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE,onImageLoad,this);
						loadCount++;
						if (loadCount == this._tilesets.imagelength) {
							self.dispatchEvent(new tiled.TMXImageLoadEvent(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE));
						}
					}
					tileset.image.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, this);
				}
			}

			this._initialized = true;
		}
		
		private onStartRendering(event:egret.Event): void {
			var layers: Array<any> = this.getLayers();
			for (var i: number = 0; i < layers.length; i++) {
				var layer: any = layers[i];
				if (layer instanceof tiled.TMXLayer) 
					layer.render();
			}

			var objects: Array<tiled.TMXObjectGroup> = this.getObjects();
			for (var i: number = 0; i < objects.length; i++) {
				var object: tiled.TMXObjectGroup = objects[i];
			}
		}
		
		//建立一个兼容的渲染对象
		private getNewDefaultRenderer(obj: tiled.TMXTilemap): tiled.TMXRenderer {
			switch (obj._orientation) {
				case "orthogonal":
					return new tiled.TMXOrthogonalRenderer(obj._cols, obj._rows, obj._tilewidth, obj._tileheight);
					break;

				case "isometric":
					return new tiled.TMXIsometricRenderer(obj._cols, obj._rows, obj._tilewidth, obj._tileheight);
					break;

				case "hexagonal":
					return new tiled.TMXHexagonalRenderer(obj._cols, obj._rows, obj._tilewidth, obj._tileheight, obj._hexsidelength, obj._staggeraxis, obj._staggerindex);
					break;

				default:
					throw new Error(obj._orientation + " type TMX Tile Map not supported!");
			}
		}

		//读取图层数据
		private parseLayer(data:any, z: number): tiled.TMXLayer {
			var layer: tiled.TMXLayer = new tiled.TMXLayer(this, this._tilewidth, this._tileheight, this._orientation, this._tilesets, z, data);
			//渲染图层
			if (this._tmxRenderer.canRender(layer))
				layer.setRenderer(this.getNewDefaultRenderer(this));
			else
				layer.setRenderer(this._tmxRenderer);
			var self: tiled.TMXTilemap = this;
			var onAllImageLoad: Function = function (event:tiled.TMXImageLoadEvent): void {
				self.removeEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, this);
				this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
			}
			this.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, layer);
			return layer;
		}

		//解析对象组数据
		private parseObjectGroup(data: any, z: number): tiled.TMXObjectGroup {
			var objectGroup: tiled.TMXObjectGroup = new tiled.TMXObjectGroup(data, this._orientation, this._tilesets, z);
			var self: tiled.TMXTilemap = this;
			var onAllImageLoad: Function = function (event: tiled.TMXImageLoadEvent): void {
				self.removeEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, this);
				this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
			}
			this.addEventListener(tiled.TMXImageLoadEvent.ALL_IMAGE_COMPLETE, onAllImageLoad, objectGroup);
			return objectGroup;
		}

		//解析Tileset
		private parseTileset(data: any): tiled.TMXTileset {
			return new tiled.TMXTileset(data, this);
		}

		//解析imagelayer(此类型的图层不参与渲染方向更新)
		private parseImageLayer(data: any, z: number): tiled.TMXImageLayer {
			var self: tiled.TMXTilemap = this;
			var imageLayer: tiled.TMXImageLayer = new tiled.TMXImageLayer(this, data, z);
			var onImageLoad: Function = function (event: tiled.TMXImageLoadEvent): void {
				this.draw(new egret.Rectangle(0, 0, self._renderWidth, self._renderHeight));
			}
			imageLayer.addEventListener(tiled.TMXImageLoadEvent.IMAGE_COMPLETE, onImageLoad, imageLayer);
			return imageLayer;
		}
	} 
}
