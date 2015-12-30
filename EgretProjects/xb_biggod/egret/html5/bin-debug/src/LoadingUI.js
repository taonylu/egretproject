/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.list = [];
        this.map = {};
        this.index = 0;
        this.createView();
        LoadingUI.ist = this;
    }
    var __egretProto__ = LoadingUI.prototype;
    __egretProto__.createView = function () {
        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.textColor = 0xffffff;
        this.textField.y = 300;
        this.textField.width = 480;
        this.textField.height = 100;
        this.textField.textAlign = "center";
    };
    __egretProto__.setProgress = function (current, total) {
        this.textField.text = "Loading..." + current + "/" + total;
    };
    /**
     * 添加预加载资源
     * @param url
     */
    __egretProto__.addPreLoading = function (url) {
        var end = url.split(".")[url.split(".").length - 1];
        var type;
        if (end == "jpg" || end == "png" || end == "JPG" || end == "PNG")
            type = 1;
        else if (end == "swf" || end == "SWF")
            type = 2;
        else
            type = 3;
        this.list.push({ "url": url, "type": type, "data": null });
        this.map[url] = this.list[this.list.length - 1];
    };
    /**
     * 开始加载
     */
    __egretProto__.startLoad = function () {
        this.index = 0;
        this.loadNext();
    };
    __egretProto__.loadNext = function () {
        this.setProgress(this.index, this.list.length);
        this.loader = new egret.URLLoader();
        this.loader.addEventListener(egret.Event.COMPLETE, this.loadResourceComplete, this);
        if (this.list[this.index].type == 1) {
            this.loader.dataFormat = egret.URLLoaderDataFormat.TEXTURE;
        }
        else if (this.list[this.index].type == 2) {
            this.loader.data = {};
            var l = new flash.Loader();
            l.contentLoaderInfo.addEventListener(egret.Event.COMPLETE, this.loadResourceComplete, this);
            l.load(new egret.URLRequest(this.list[this.index].url), null);
            return;
        }
        else {
            this.loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        this.loader.load(new egret.URLRequest(this.list[this.index].url));
    };
    __egretProto__.loadResourceComplete = function (e) {
        if (this.list[this.index].type == 1) {
            var txt = this.loader.data;
            var bmd = new flash.BitmapData(txt._bitmapWidth, txt._bitmapHeight, false, 0, txt);
            this.list[this.index].data = bmd;
        }
        else {
            this.list[this.index].data = this.loader.data;
        }
        this.index++;
        this.setProgress(this.index, this.list.length);
        if (this.index == this.list.length) {
            if (this.parent)
                this.parent.removeChild(this);
            this.dispatchEvent(new egret.Event(egret.Event.COMPLETE));
        }
        else {
            this.loadNext();
        }
    };
    __egretProto__.getEmbedBitmapData = function (url) {
        var item = this.map[url];
        if (this.map[url].type == 1)
            return item.data.clone();
        return item.data;
    };
    LoadingUI.getEmbedBitmapData = function (url) {
        return LoadingUI.ist.getEmbedBitmapData(url);
    };
    return LoadingUI;
})(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
