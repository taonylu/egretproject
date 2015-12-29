declare module tiled {
    class TMXAnimation {
        private _animations;
        private _tiledId;
        private _data;
        private _currentFrame;
        private _x;
        private _y;
        oldTime: number;
        oldBitmap: egret.Bitmap;
        constructor($data: any, x: number, y: number, tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset);
        x: number;
        y: number;
        render(): void;
        currentAnimationFrame: TMXAnimationFrame;
        animations: TMXAnimationFrame[];
        data: any;
    }
}
declare module tiled {
    class TMXAnimationFrame {
        private _tiledid;
        private _duration;
        private _tile;
        constructor(data: any, x: number, y: number, tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset);
        tile: TMXTile;
        tiledId: number;
        duration: number;
    }
}
declare module tiled {
    class TMXConstants {
        static TMX_FLIP_H: number;
        static TMX_FLIP_V: number;
        static TMX_FLIP_AD: number;
        static TMX_CLEAR_BIT_MASK: number;
        static LAYER: string;
        static OBJECT_GROUP: string;
        static PROPERTIES: string;
        static DATA: string;
        static OBJECT: string;
        static IMAGE: string;
        static IMAGE_LAYER: string;
        static TILE_SET: string;
        static TILE: string;
        static TILE_OFFSET: string;
        static ANIMATION: string;
        static DEFAULT_COLOR: number;
        static DRAWORDER_INDEX: string;
        static POLYGON: string;
        static POLYLINE: string;
        static ELLIPSE: string;
        static TILE_OBJECT_GROUP: string;
        static ORIENTATION_ORTHOGONAL: string;
        static ORIENTATION_ISOMETRIC: string;
        static ORIENTATION_STAGGERED: string;
        static ORIENTATION_HEXAGONAL: string;
    }
}
declare module tiled {
    class TMXImageLoadEvent extends egret.Event {
        static IMAGE_COMPLETE: string;
        static ALL_IMAGE_COMPLETE: string;
        texture: egret.Texture;
        constructor(type: string, data?: any, bubbles?: boolean, cancelable?: boolean);
    }
}
declare module tiled {
    class TMXColorLayer extends egret.Sprite {
        private _color;
        private _z;
        private _tilemap;
        constructor(tilemap: tiled.TMXTilemap, color: string, z: number);
    }
}
declare module tiled {
    class TexturePool {
        static texturePools: Object;
        constructor();
        static addTexture($url: string, $texture: egret.Texture): void;
        static removeTexture($url: string): void;
        static getTexture($url: string): egret.Texture;
        static removeAllTextures(): void;
    }
}
declare module tiled {
    class TMXImageLayer extends egret.Sprite {
        private _name;
        private _imagewidth;
        private _imageheight;
        private _opacity;
        private _source;
        private _transColor;
        private _tilemap;
        private _properties;
        private _bitmap;
        private _z;
        private _sourcebitmap;
        constructor(tilemap: tiled.TMXTilemap, data: any, z: number);
        tilemap: TMXTilemap;
        bitmap: egret.Bitmap;
        z: number;
        name: string;
        alpha: number;
        transColor: string;
        private loadImage($url);
        draw(rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXTile extends egret.Sprite {
        private _col;
        private _row;
        private _flippedX;
        private _flippedY;
        private _flippedAD;
        private _flipped;
        private _gid;
        private _tileData;
        private _tileset;
        private _tilemap;
        private _image;
        private _animation;
        private _properties;
        private _objectGroups;
        bitmap: egret.Bitmap;
        constructor(x: number, y: number, gid: number, tilemap: tiled.TMXTilemap, tileset: tiled.TMXTileset);
        gid: number;
        col: number;
        row: number;
        tileset: TMXTileset;
        image: TMXImage;
        tilemap: TMXTilemap;
        flippedX: boolean;
        flippedY: boolean;
        flippedAD: boolean;
        flipped: boolean;
        animation: TMXAnimation;
    }
}
declare module tiled {
    class BitmapLoader {
        constructor();
        static load($url: string, $onComplete: Function, $onCompleteParams?: Array<any>): void;
        private static startload($url, $data);
        private static onRESComplete(textureData);
    }
}
declare module tiled {
    class TMXImage extends egret.EventDispatcher {
        private _source;
        private _width;
        private _height;
        private _trans;
        private _texture;
        bitmap: egret.Bitmap;
        constructor(imgData: any, baseURL: string);
        texture: egret.Texture;
        source: string;
        width: number;
        height: number;
        private loadImage($url);
    }
}
declare module tiled {
    class TMXProperty {
        gid: number;
        name: string;
        value: string;
    }
}
declare module tiled {
    class TMXRenderer {
        private _cols;
        private _rows;
        private _tilewidth;
        private _tileheight;
        protected animationTiles: Array<any>;
        protected offsetsStaggerX: Array<any>;
        protected offsetsStaggerY: Array<any>;
        constructor(cols: number, rows: number, tilewidth: number, tileheight: number);
        cols: number;
        rows: number;
        tilewidth: number;
        tileheight: number;
        canRender(layer: any): boolean;
        drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void;
        drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: tiled.TMXTile): void;
        render(renderContainer: egret.Sprite): void;
    }
}
declare module tiled {
    class TMXOrthogonalRenderer extends tiled.TMXRenderer {
        constructor(cols: number, rows: number, tilewidth: number, tileheight: number);
        canRender(layer: any): boolean;
        pixelToTileCoords(x: number, y: number): egret.Point;
        pixelToTileX(x: number): number;
        pixelToTileY(y: number): number;
        tileToPixelCoords(tileX: number, tileY: number): egret.Point;
        drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: tiled.TMXTile): void;
        drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXIsometricRenderer extends tiled.TMXRenderer {
        private _hTilewidth;
        private _hTileheight;
        private _originX;
        constructor(cols: number, rows: number, tilewidth: number, tileheight: number);
        canRender(layer: any): boolean;
        pixelToTileCoords(x: number, y: number): egret.Point;
        pixelToTileX(x: number, y: number): number;
        pixelToTileY(y: number, x: number): number;
        tileToPixelCoords(x: number, y: number): egret.Point;
        drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: tiled.TMXTile): void;
        drawTileLayer(layer: TMXLayer, rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXHexagonalRenderer extends TMXRenderer {
        private _hexsidelength;
        private _staggeraxis;
        private _staggerindex;
        private _sidelengthx;
        private _sidelengthy;
        private _sideoffsetx;
        private _sideoffsety;
        private _columnwidth;
        private _rowheight;
        private _centers;
        constructor(cols: number, rows: number, tilewidth: number, tileheight: number, hexsidelength: number, staggeraxis: string, staggerindex: string);
        canRender(layer: any): boolean;
        pixelToTileCoords(x: number, y: number): egret.Point;
        pixelToTileX(x: number, y: number): number;
        pixelToTileY(y: number, x: number): number;
        tileToPixelCoords(q: number, r: number): egret.Point;
        drawTile(renderer: egret.Sprite, x: number, y: number, tmxTile: tiled.TMXTile): void;
        drawTileLayer(layer: tiled.TMXLayer, rect: egret.Rectangle): void;
    }
}
declare module tiled {
    class TMXTilemap extends egret.Sprite {
        private _name;
        private _data;
        private _cols;
        private _rows;
        private _tilewidth;
        private _tileheight;
        private _version;
        private _orientation;
        private _renderorder;
        private _z;
        private _nextobjectid;
        private _hexsidelength;
        private _staggeraxis;
        private _staggerindex;
        private _backgroundcolor;
        private _initialized;
        private _properties;
        private _layers;
        private _objectGroups;
        private _tilesets;
        private _tmxRenderer;
        private _showHideBackground;
        private _baseURL;
        private _renderWidth;
        private _renderHeight;
        constructor(renderwidth: number, renderheight: number, data: any, url: string);
        nextobjectid: number;
        tilewidth: number;
        tileheight: number;
        baseURL: string;
        renderwidth: number;
        renderheight: number;
        parseProperties(data: any): Array<tiled.TMXProperty>;
        render(): void;
        getLayers(): Array<any>;
        getObjects(): Array<tiled.TMXObjectGroup>;
        showHideBackground(isShow: boolean): void;
        destory(): void;
        private readMapObjects(data);
        private onStartRendering(event);
        private getNewDefaultRenderer(obj);
        private parseLayer(data, z);
        private parseObjectGroup(data, z);
        private parseTileset(data);
        private parseImageLayer(data, z);
    }
}
declare module tiled {
    class Ellipse extends egret.Sprite {
        private _x;
        private _y;
        constructor(x: number, y: number, w: number, h: number);
        draw($color: number): void;
    }
}
declare module tiled {
    class Polygon extends egret.Sprite {
        private _x;
        private _y;
        private _points;
        constructor(x: number, y: number, points: Array<any>);
        draw($color: number): void;
    }
}
declare module tiled {
    class PolyLine extends egret.Sprite {
        private _x;
        private _y;
        private _points;
        constructor(x: number, y: number, points: Array<any>);
        draw($color: number): void;
    }
}
declare module tiled {
    class TMXObject extends egret.Sprite {
        private _points;
        private _ellipse;
        private _name;
        private _id;
        private _gid;
        private _z;
        private _type;
        private _orientation;
        private _shapes;
        private _isEllipse;
        private _isPolygon;
        private _isPolyLine;
        private _isImage;
        private _tile;
        private _color;
        private _flippedX;
        private _flippedY;
        private _flippedAD;
        private _flipped;
        private _properties;
        constructor(tmxObj: any, orientation: any, tilesets: tiled.TMXTilesetGroup, z: number, color: number);
        id: number;
        gid: number;
        name: string;
        type: string;
        z: number;
        isEllipse: boolean;
        isPolygon: boolean;
        isPolyLine: boolean;
        isImage: boolean;
        getObjectPropertyByName(name: string): string;
        private parsePolygonOrPolyline($points);
        private parseEllipse($data);
        private parseTMXShapes();
        private setTile(tilesets);
    }
}
declare module tiled {
    class TMXTilesetGroup {
        private _tilesets;
        private _tilemap;
        private _length;
        private _imagelength;
        constructor($tilemap: tiled.TMXTilemap);
        length: number;
        imagelength: number;
        tilemap: tiled.TMXTilemap;
        add(tileset: tiled.TMXTileset): void;
        getTilesetByIndex(index: number): tiled.TMXTileset;
        getTilesetByGid(gid: number): tiled.TMXTileset;
    }
}
declare module tiled {
    class TMXTileset {
        private _lastgid;
        private _firstgid;
        private _name;
        private _tilewidth;
        private _tileheight;
        private _spacing;
        private _margin;
        private _tileoffset;
        private _hTileCount;
        private _vTileCount;
        private _tilemap;
        private _tileDatas;
        private _properties;
        private _image;
        private _imagesource;
        private _transformMatrix;
        private static _cacheRenderTextures;
        constructor(tilemap: tiled.TMXTilemap, tilesetData: any);
        name: string;
        firstgid: number;
        lastgid: number;
        tilewidth: number;
        tileheight: number;
        spacing: number;
        margin: number;
        tileoffset: egret.Point;
        horizontalTileCount: number;
        verticalTileCount: number;
        tilemap: TMXTilemap;
        properties: any[];
        image: TMXImage;
        getSpecialTileDataByTileId(gid: number): any;
        getFileExtension: (path: string) => string;
        getTileProperties(tileId: number): any;
        contains(gid: any): boolean;
        drawTile(renderer: egret.Sprite, dx: number, dy: number, tmxTile: tiled.TMXTile): void;
        static removeAllTextures(): void;
    }
}
declare module tiled {
    class TMXLayer extends egret.Sprite {
        private _tilewidth;
        private _tileheight;
        private _orientation;
        private _tilesets;
        private _name;
        private _cols;
        private _rows;
        private _hexsidelength;
        private _staggeraxis;
        private _staggerindex;
        private _opacity;
        private renderer;
        private _tilemap;
        private _properties;
        private _staticContainer;
        private _animationContainer;
        layerData: Array<Array<tiled.TMXTile>>;
        tileset: tiled.TMXTileset;
        maxTileSize: any;
        name: string;
        staticContainer: egret.Sprite;
        animationContainer: egret.Sprite;
        tilewidth: number;
        tileheight: number;
        orientation: string;
        cols: number;
        rows: number;
        hexsidelength: number;
        staggeraxis: string;
        staggerindex: any;
        opacity: number;
        properties: TMXProperty[];
        constructor(tilemap: tiled.TMXTilemap, tilewidth: number, tileheight: number, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number, data: any);
        tilemap: TMXTilemap;
        setRenderer(renderer: tiled.TMXRenderer): void;
        getTileId(x: number, y: number): number;
        getTile(x: number, y: number): tiled.TMXTile;
        setTile(x: number, y: number, tileId: number): tiled.TMXTile;
        clearTile(x: number, y: number): void;
        draw(rect: egret.Rectangle): void;
        render(): void;
        private initArray(cols, rows);
        private setLayerData(data);
    }
}
declare module tiled {
    class TMXObjectGroup extends egret.Sprite {
        private _name;
        private _z;
        private _objects;
        private _objectHash;
        private _opacity;
        private _draworder;
        private _color;
        private _orientaion;
        private _childrens;
        private _tilesets;
        type: string;
        constructor(tmxObjGroupData: any, orientation: string, tilesets: tiled.TMXTilesetGroup, z: number);
        name: string;
        draw(): void;
        render(): void;
        destory(): void;
        getObjectById(id: number): tiled.TMXObject;
        removeObjectById(id: number): void;
        showObjectById(id: number): void;
        hideObjectById(id: number): void;
        getObjectCount(): number;
        getObjectByIndex(index: number): tiled.TMXObject;
        removeObjectByIndex(index: number): void;
    }
}
declare module tiled {
    class Base64 {
        private static _keyStr;
        static nativeBase64: boolean;
        static decode(input: string): string;
        static encode(input: string): string;
        static decodeBase64AsArray(input: string, bytes: number): Uint32Array;
        static decompress(data: string, decoded: any, compression: string): any;
        static decodeCSV(input: string): Array<number>;
    }
}
declare module tiled {
    class TMXUtils {
        static create($renderwidth: number, $renderheight: number, $url: string, $parentContainer: egret.Sprite, $onComplete?: Function): void;
        static decode(data: any, encoding: any, compression: string): Array<number>;
        static color16ToUnit($color: string): number;
    }
}
