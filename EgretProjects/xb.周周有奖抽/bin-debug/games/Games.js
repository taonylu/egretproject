/**
 *
 * @author
 * 作 者：清雨蓝
 *制作日期：2016年
 */
var place = {
    "chongqing_png": "重庆",
    "hunan_png": "湖南",
    "anhui_png": "安徽",
    "jiangsu_png": "江苏",
    "sichuang_png": "四川",
    "yunnan_png": " 云南",
    "ningxia_png": "宁夏",
    "neimenggu_png": "内蒙古",
    "xinjiang_png": "新疆",
    "changde_png": "常德",
    "hefei_png": "合肥",
    "changzhou_png": "常州",
    "yancheng_png": "盐城",
    "chendu_png": "成都",
    "deyang_png": "德阳",
    "neijiang_png": "内江",
    "nanchong_png": "南充",
    "yibin_png": "宜宾",
    "xichang_png": "西昌",
    "panzhihua_png": "攀枝花",
    "kunming_png": "昆明",
    "yuxi_png": "玉溪",
    "honghe_png": "红河",
    "simao_png": "思茅",
    "lincang_png": "临沧",
    "xishuangbanna_png": "西双版纳",
    "baoshan_png": "宝山",
    "ruili_png": "瑞丽",
    "shizuishan_png": "石嘴山",
    "yinchuang_png": "银川",
    "wuzhong_png": "吴忠",
    "guyuan_png": "固原",
    "qingyang_png": "庆阳",
    "zhongwei_png": "中卫",
    "wulvmuqi_png": "乌鲁木齐",
    "kuerle_png": "库尔勒",
    "kuitun_png": "奎屯",
    "akesu_png": "阿克苏",
    "changji_png": "昌吉",
    "hami_png": "哈密",
    "wuhai_png": "乌海"
};
var Games = (function (_super) {
    __extends(Games, _super);
    function Games() {
        _super.call(this);
        this.provinces = [];
        this.citys = [];
        this.arr = [];
        this.Cq_arr = [];
        this.Hn_arr = [];
        this.Ah_arr = [];
        this.Js_arr = [];
        this.Sc_arr = [];
        this.Yn_arr = [];
        this.Nx_arr = [];
        this.Nm_arr = [];
        this.Xj_arr = [];
        this.isShow = false;
        this.cityShow = false;
        this.province_text = new eui.Label();
        this.city_text = new eui.Label();
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
        this.last_x = 0;
        this.last_y = 0;
        this.last_z = 0;
        this.last_update = 0;
        this.SHAKE_THRESHOLD = 0.25; //摇动变化值/时间差  25/100大概值
        this.shakeCount = 0; //摇动次数
        this.skinName = "resource/games/games.exml";
        this.percentWidth = 100;
        this.percentHeight = 100;
    }
    var d = __define,c=Games,p=c.prototype;
    p.childrenCreated = function () {
        this.huanghu = RES.getRes("huanghu_mp3");
        this.beng = RES.getRes("beng_mp3");
        this.init();
        this.provicefun(); //省份list数组
        this.shakeSound = RES.getRes("shake_mp3");
    };
    p.init = function () {
        this.province = new eui.Image();
        this.province.source = "list0_png";
        this.province.x = 36;
        //this.province.y=320
        this.province.y = 550;
        this.addChildAt(this.province, 99);
        this.province_icon = new eui.Image();
        this.province_icon.source = "shengfen_png";
        this.province_icon.x = 158;
        //this.province_icon.y = 345;
        this.province_icon.y = 575;
        this.province_icon.touchEnabled = false;
        this.addChildAt(this.province_icon, 100);
        this.city = new eui.Image();
        this.city.source = "list1_png";
        this.city.x = 330;
        // this.city.y = 285;
        this.city.y = 510;
        this.addChildAt(this.city, 99);
        this.city_icon = new eui.Image();
        this.city_icon.source = "chengshi_png";
        this.city_icon.x = 411;
        //this.city_icon.y = 320;
        this.city_icon.y = 545;
        this.city_icon.touchEnabled = false;
        this.addChildAt(this.city_icon, 100);
        this.gobtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gobtnfun, this);
        this.province.addEventListener(egret.TouchEvent.TOUCH_TAP, this.provincefun, this);
    };
    p.provincefun = function () {
        if (!this.isShow) {
            //egret.Tween.get(this.sheng_s).to({ y: 400}, 300);
            egret.Tween.get(this.sheng_s).to({ y: 630 }, 300);
            this.isShow = true;
            this.city.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.cityfun, this);
            if (this.cityShow == true)
                //egret.Tween.get(this.cityScroller).to({ y:-130 },300);
                egret.Tween.get(this.cityScroller).to({ y: -130 }, 300);
            this.city_icon.source = "chengshi_png";
            this.cityShow = false;
        }
        else {
            egret.Tween.get(this.sheng_s).to({ y: -130 }, 300);
            this.isShow = false;
        }
    };
    p.provicefun = function () {
        this.arr = ["chongqing_png", "hunan_png", "anhui_png", "jiangsu_png", "sichuang_png", "yunnan_png", "ningxia_png", "neimenggu_png", "xinjiang_png"];
        this.Cq_arr = ["chongqing_png"];
        this.Hn_arr = ["changde_png"];
        this.Ah_arr = ["hefei_png"];
        this.Js_arr = ["changzhou_png", "yancheng_png"];
        this.Sc_arr = ["chendu_png", "deyang_png", "neijiang_png", "nanchong_png", "yibin_png", "xichang_png", "panzhihua_png"];
        this.Yn_arr = ["kunming_png", "yuxi_png", "honghe_png", "simao_png", "lincang_png", "xishuangbanna_png", "baoshan_png", "ruili_png"];
        this.Nx_arr = ["shizuishan_png", "yinchuang_png", "wuzhong_png", "guyuan_png", "qingyang_png", "zhongwei_png"];
        this.Nm_arr = ["wuhai_png"];
        this.Xj_arr = ["wulvmuqi_png", "kuerle_png", "kuitun_png", "akesu_png", "changji_png", "hami_png"];
        this.provinces = [];
        for (var i = 0; i < 9; i++) {
            this.provinces.push({ label: this.arr[i] });
        }
        var exml = "\n        <e:Skin xmlns:e=\"http://ns.egret.com/eui\"> \n            <e:Image source=\"{data.label}\" y=\"20\" x=\"120\" horizontalCenter=\"0\"></e:Image> \n        </e:Skin>";
        var list = new eui.List();
        list.width = 160;
        list.height = 56;
        list.dataProvider = new eui.ArrayCollection(this.provinces);
        list.itemRendererSkinName = exml;
        this.list_s = list;
        var scroller = new eui.Scroller();
        scroller.height = 400;
        scroller.x = 30;
        scroller.y = -130;
        //  scroller.top=20;
        this.sheng_s = scroller;
        this.addChildAt(this.sheng_s, 5);
        var listbg = new eui.Image();
        listbg.source = "tiao_bg_png";
        listbg.width = 280;
        listbg.y = -30;
        listbg.x = 30;
        listbg.height = 450;
        scroller.viewport = list;
        scroller.addChildAt(listbg, 0);
        var spMask = new egret.Shape();
        spMask.graphics.beginFill(0xFFFFFF);
        //spMask.graphics.drawRect(0,400,294,520);
        spMask.graphics.drawRect(0, 625, 294, 520);
        spMask.graphics.endFill();
        spMask.touchEnabled = false;
        this.addChild(spMask);
        this.sheng_s.mask = spMask;
        list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this);
    };
    p.onChange = function (e) {
        // console.log(this.list_s.selectedItem,this.list_s.selectedIndex);
        this.province_icon.source = this.arr[this.list_s.selectedIndex];
        this.province_text.text = place[this.arr[this.list_s.selectedIndex]];
        this.city.addEventListener(egret.TouchEvent.TOUCH_TAP, this.cityfun, this);
        this.cityScrollefun(this.list_s.selectedIndex);
        egret.Tween.get(this.sheng_s).to({ y: 0 }, 300);
        this.isShow = false;
        this.index = this.list_s.selectedIndex;
    };
    p.cityfun = function () {
        if (!this.cityShow) {
            //egret.Tween.get(this.cityScroller).to({ y: 396 },300);
            egret.Tween.get(this.cityScroller).to({ y: 610 }, 300);
            this.cityShow = true;
        }
        else {
            egret.Tween.get(this.cityScroller).to({ y: -130 }, 300);
            this.cityShow = false;
        }
    };
    p.cityScrollefun = function (N) {
        this.citys = [];
        var scroller = new eui.Scroller();
        scroller.height = 400;
        scroller.x = 300;
        scroller.y = -130;
        //  scroller.top=20;
        this.cityScroller = scroller;
        this.addChildAt(this.cityScroller, 5);
        switch (N) {
            case 0:
                for (var i = 0; i < this.Cq_arr.length; i++) {
                    this.citys.push({ label: this.Cq_arr[i] });
                }
                ;
                break;
            case 1:
                for (var i = 0; i < this.Hn_arr.length; i++) {
                    this.citys.push({ label: this.Hn_arr[i] });
                }
                ;
                break;
            case 2:
                for (var i = 0; i < this.Ah_arr.length; i++) {
                    this.citys.push({ label: this.Ah_arr[i] });
                }
                break;
            case 3:
                for (var i = 0; i < this.Js_arr.length; i++) {
                    this.citys.push({ label: this.Js_arr[i] });
                }
                break;
            case 4:
                for (var i = 0; i < this.Sc_arr.length; i++) {
                    this.citys.push({ label: this.Sc_arr[i] });
                }
                break;
            case 5:
                for (var i = 0; i < this.Yn_arr.length; i++) {
                    this.citys.push({ label: this.Yn_arr[i] });
                }
                break;
            case 6:
                for (var i = 0; i < this.Nx_arr.length; i++) {
                    this.citys.push({ label: this.Nx_arr[i] });
                }
                break;
            case 7:
                for (var i = 0; i < this.Nm_arr.length; i++) {
                    this.citys.push({ label: this.Nm_arr[i] });
                }
                break;
            case 8:
                for (var i = 0; i < this.Xj_arr.length; i++) {
                    this.citys.push({ label: this.Xj_arr[i] });
                }
                break;
        }
        var exml = "\n        <e:Skin xmlns:e=\"http://ns.egret.com/eui\"> \n            <e:Image source=\"{data.label}\" y=\"20\" x=\"120\" horizontalCenter=\"0\"></e:Image> \n        </e:Skin>";
        var lists = new eui.List();
        lists.width = 160;
        lists.height = 56;
        lists.dataProvider = new eui.ArrayCollection(this.citys);
        lists.itemRendererSkinName = exml;
        this.cityList = lists;
        var listbg = new eui.Image();
        listbg.source = "tiao_bg_png";
        listbg.width = 260;
        listbg.y = -30;
        listbg.x = 30;
        listbg.height = 450;
        scroller.viewport = lists;
        scroller.addChildAt(listbg, 0);
        var spMask = new egret.Shape();
        spMask.graphics.beginFill(0xFFFFFF);
        //spMask.graphics.drawRect(330,340,294,490);
        spMask.graphics.drawRect(330, 560, 294, 490);
        spMask.graphics.endFill();
        spMask.touchEnabled = false;
        this.addChild(spMask);
        this.cityScroller.mask = spMask;
        lists.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChangeS, this);
    };
    p.onChangeS = function () {
        //  console.log(this.cityList.selectedItem,this.cityList.selectedIndex);
        //egret.Tween.get(this.cityScroller).to({ y: -130 },300);
        egret.Tween.get(this.cityScroller).to({ y: -130 }, 300);
        switch (this.index) {
            case 0:
                this.city_icon.source = this.Cq_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Cq_arr[this.cityList.selectedIndex]];
                break;
            case 1:
                this.city_icon.source = this.Hn_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Hn_arr[this.cityList.selectedIndex]];
                break;
            case 2:
                this.city_icon.source = this.Ah_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Ah_arr[this.cityList.selectedIndex]];
                break;
            case 3:
                this.city_icon.source = this.Js_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Js_arr[this.cityList.selectedIndex]];
                break;
            case 4:
                this.city_icon.source = this.Sc_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Sc_arr[this.cityList.selectedIndex]];
                break;
            case 5:
                this.city_icon.source = this.Yn_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Yn_arr[this.cityList.selectedIndex]];
                break;
            case 6:
                this.city_icon.source = this.Nx_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Nx_arr[this.cityList.selectedIndex]];
                break;
            case 7:
                this.city_icon.source = this.Nm_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Nm_arr[this.cityList.selectedIndex]];
                break;
            case 8:
                this.city_icon.source = this.Xj_arr[this.cityList.selectedIndex];
                this.city_text.text = place[this.Xj_arr[this.cityList.selectedIndex]];
                break;
        }
    };
    p.gongxifun = function (text) {
        this.games_group.visible = false;
        this.gongxi_group.visible = true;
        // this.huanghu.play(0,1)
        this.goshare.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sharefun, this);
        var div = document.getElementById("ewm");
        var img = document.createElement("img");
        img.src = "resource/assets/code.jpg"; // '/tuborg-week-lottery/qrcode' + '?url=' + img_href;//img_href; 
        img.style.width = 100 + "%";
        //div.style.top = 52 + "%";
        //div.style.top = "270px";
        div.appendChild(img);
        document.getElementById("texts").style.display = "block";
        document.getElementById("texts").innerHTML = text;
    };
    p.overfun = function () {
        if (Math.random() > 0.5) {
            this.over_group.visible = true;
        }
        else {
            this.over_group1.visible = true;
        }
        //this.over_group.visible=true;
        this.games_group.visible = false;
        this.sharebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sharefun, this);
        this.sharebtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sharefun, this);
    };
    p.sharefun = function () {
        window["shareclick"]();
        document.getElementById("share").style.display = "block";
        // this.share_group.visible=true;
        var self = this;
        document.getElementById("share").onclick = function () {
            self.closeshare();
        };
        //this.share_group.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeshare,this)
    };
    p.closeshare = function () {
        document.getElementById("share").style.display = "none";
        //this.share_group.visible=false;
    };
    p.gamefun = function () {
        //        this.left_btn.addEventListener(egret.TouchEvent.TOUCH_END,this.leftbtnfun,this);
        //        this.min_btn.addEventListener(egret.TouchEvent.TOUCH_END,this.minbtnfun,this);
        //        this.right_btn.addEventListener(egret.TouchEvent.TOUCH_END,this.rightbtnfun,this);
    };
    p.leftbtnfun = function () {
        egret.Tween.get(this.l_cap).to({ y: -1000 }, 100);
        this.beng.play(0, 1);
        this.clickfun();
    };
    p.minbtnfun = function () {
        egret.Tween.get(this.m_cap).to({ y: -1000 }, 100);
        this.beng.play(0, 1);
        this.clickfun();
    };
    p.rightbtnfun = function () {
        egret.Tween.get(this.r_cap).to({ y: -1000 }, 100);
        this.beng.play(0, 1);
        this.clickfun();
    };
    p.clickfun = function () {
        window["removeclick"]();
        //       this.left_btn.removeEventListener(egret.TouchEvent.TOUCH_END,this.leftbtnfun,this);
        //       this.min_btn.removeEventListener(egret.TouchEvent.TOUCH_END,this.minbtnfun,this);
        //       this.right_btn.removeEventListener(egret.TouchEvent.TOUCH_END,this.rightbtnfun,this);
        //        console.log(this.province_text.text);
        //        console.log(this.city_text.text)
        // var url: string = "game_config.json";
        var url = window["apiUrl"] + '/lottery';
        //alert(window["apiUrl"])
        var loader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
        var request = new egret.URLRequest(url);
        request.method = egret.URLRequestMethod.POST;
        var netvar = "?_csrf=" + window["_csrf"] + "&timeStr=" + window["timeStr"] + "&tokenStr=" + window["tokenStr"] + "&signStr=" + window["signStr"] + "&province=" + this.province_text.text + "&city=" + this.city_text.text;
        request.data = new egret.URLVariables(netvar);
        loader.load(request);
        //test
        this.onPostComplete(null);
    };
    p.onPostComplete = function (event) {
        // this.overfun();
        //this.gongxifun()
        //test
        //var datas = JSON.parse(event.target.data);
        //test
        var datas = { code: 200, pcode: 200, data: { isWin: 1, prize: "123123123ABCDERF" }, status: true, msg: "测试错误" };
        console.log("抽奖结果：", datas);
        if (datas.pcode == 200) {
            window["chanyuclick"]();
        }
        if (datas.status == true) {
            if (datas.code == 200) {
                if (datas.data.isWin == 1) {
                    this.gongxifun(datas.data.prize);
                    this.huanghu.play(0, 1);
                }
                else {
                    this.overfun();
                }
            }
        }
        else {
            if (datas.code == 404) {
                alert(datas.msg);
            }
            if (datas.code == 403 || datas.code == 500) {
                alert(datas.msg);
            }
        }
    };
    p.gobtnfun = function () {
        var _this = this;
        if (this.province_icon.source == "shengfen_png") {
            alert("请选择省份");
            return;
        }
        if (this.city_icon.source == "chengshi_png") {
            alert("请选择城市");
            return;
        }
        window["chouclick"]();
        this.sheng_s.visible = false;
        this.province.visible = false;
        this.city.visible = false;
        this.city_icon.visible = false;
        this.province_icon.visible = false;
        this.begin_group.visible = false;
        this.games_group.visible = true;
        this.startShake();
        this.shakePanel.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.shakePanel.parent && _this.shakePanel.parent.removeChild(_this.shakePanel);
            //test
            _this.clickfun();
        }, this);
        //        var self=this
        //        egret.Tween.get(self.header,{loop:true}).to({y:349},500).wait(500)
        //        setTimeout(function(){
        //            egret.Tween.removeTweens(self.header);
        //            self.zhishi.visible=false;
        //            self.gamefun();
        //            },2000)
    };
    p.startShake = function () {
        egret.log("start shake beta1.0");
        this.orientation = new egret.DeviceOrientation();
        this.orientation.addEventListener(egret.Event.CHANGE, this.onOrientation, this);
        this.orientation.start();
        //test
        //this.stopShake();
    };
    p.stopShake = function () {
        var _this = this;
        if (this.orientation) {
            this.orientation.removeEventListener(egret.Event.CHANGE, this.onOrientation, this);
            this.orientation.stop();
        }
        egret.Tween.get(this.beer).wait(1000).call(function () {
            egret.Tween.removeTweens(_this.beer);
        });
    };
    p.onOrientation = function (e) {
        var curTime = egret.getTimer();
        if ((curTime - this.last_update) > 100) {
            var diffTime = curTime - this.last_update;
            this.last_update = curTime;
            this.xPos = e.beta;
            this.yPos = e.gamma;
            this.zPos = e.alpha;
            var speed = Math.abs(this.xPos + this.yPos + this.zPos - this.last_x - this.last_y - this.last_z) / diffTime;
            //啤酒动画
            if (speed > this.SHAKE_THRESHOLD) {
                this.shakeCount++;
                egret.log("摇动次数:", this.shakeCount);
                if (this.shakeCount == 1) {
                    egret.Tween.get(this.beer, { loop: true }).to({ rotation: 5 }, 100).to({ rotation: -5 }, 100);
                    this.shakeChannel = this.shakeSound.play();
                }
                else if (this.shakeCount == 2) {
                    this.shakePanel.parent && this.shakePanel.parent.removeChild(this.shakePanel);
                }
                else if (this.shakeCount > 4) {
                    this.shakeCount = 0;
                    this.stopShake();
                    this.clickfun();
                    this.shakeChannel && this.shakeChannel.stop();
                    return;
                }
            }
            this.last_x = this.xPos;
            this.last_y = this.yPos;
            this.last_z = this.zPos;
        }
    };
    return Games;
}(eui.Component));
egret.registerClass(Games,'Games');
