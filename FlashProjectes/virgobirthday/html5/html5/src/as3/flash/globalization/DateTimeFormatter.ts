/**
 * Created by huitao on 2015/9/2.
 */
module flash
{
    export class DateTimeFormatter
    {

        /** [只读] 此 DateTimeFormatter 对象使用的实际区域设置 ID 的名称。*/
        private _actualLocaleIDName : string;
        public get actualLocaleIDName():string
        {
            return this._actualLocaleIDName;
        }

        /**[只读] 此 DateTimeFormatter 对象执行的前一操作的状态。*/
        private _lastOperationStatus : string;
        public get lastOperationStatus():string
        {
            return this._lastOperationStatus;
        }

        /**[只读] 传递到此 DateTimeFormatter 对象的构造函数的请求区域设置 ID 的名称。*/
        private _requestedLocaleIDName : string;
        public get requestedLocaleIDName():string
        {
            return this._requestedLocaleIDName;
        }


        private _dataStyle :string = "long";
        private _timeStyle:string = "long";

        private _pattern:string= "yyyy/M/d";

        private _date:flash.As3Date;

        public masks = {
            "default":      "MM dd yyyy HH:MM:ss",
            shortDate:      "M/d/yy",
            mediumDate:     "MMM d, yyyy",
            longDate:       "MMMM d, yyyy",
            fullDate:       "dddd, MMMM d, yyyy",
            shortTime:      "h:MM TT",
            mediumTime:     "h:MM:ss TT",
            longTime:       "h:MM:ss TT Z",
            isoDate:        "yyyy-mm-dd",
            isoTime:        "HH:MM:ss",
            isoDateTime:    "yyyy-MM-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-MM-dd'T'HH:MM:ss'Z'"
        };

        constructor(requestedLocaleIDName:string, dateStyle:string = "long", timeStyle:string = "long")
        {
            this._requestedLocaleIDName = requestedLocaleIDName;
            this._dataStyle = dateStyle;
            this._timeStyle = timeStyle;

            if(DateTimeStyle.SHORT == dateStyle)
            {
                this._pattern = "yyyy/M/d";
            }
            else if(DateTimeStyle.LONG == dateStyle && timeStyle == DateTimeStyle.LONG)
            {
                this._pattern = "yyyy'年'M'\u6708'd'日', EEEE HH:mm:ss";
            }
        }

        /**需要优化的实现*/
        public format(dateTime:flash.As3Date):string
        {
            this._date = dateTime;

            //switch (this._pattern)
            //{
            //    case "yyyy/M/d":
            //        return this._date.getFullYear() + "/"+ (this._date.getMonth()+1)+"/"+this._date.getDate();
            //    case "MM dd yyyy HH:MM:ss":
            //        return (this._date.getMonth()<10? ("0"+(this._date.getMonth()+1)) : (this._date.getMonth()+1))+" "+(this._date.getDate()<10?("0"+this._date.getDate()):this._date.getDate())+" "+this._date.getFullYear() +" " + this._date.getHours()+":" + this._date.getMinutes()+":"+this._date.getSeconds();
            //    case "HH:MM:ss":
            //        return this._date.getHours()+":"+ this._date.getMinutes()+":"+this._date.getSeconds();
            //    case "yyyy'年'M'\u6708'd'日', EEEE HH:mm:ss":
            //        return this._date.getFullYear()+"年"+ (this._date.getMonth()<10? ("0"+(this._date.getMonth()+1)) : (this._date.getMonth()+1))+"\u6708"+(this._date.getDate()<10?("0"+this._date.getDate()):this._date.getDate())+"日" +" "+this.getWeekdayNames()[this._date.getDay()] + " "+this._date.getHours()+":"+ this._date.getMinutes()+":"+this._date.getSeconds();
            //
            //}
            var r:RegExp = new RegExp("'[^\"]*'|'[^']*'|\\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\\1?|[lLZ])\\b","g");
            var self = this;
            return this._pattern["replace"](r, function ($1) {

                switch ($1) {
                    case 'd':
                        return self._date.getDate();
                    case 'dd':
                        return self.zeroize(self._date.getDate());
                    case 'ddd':
                        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][this._date.getDay()];
                    case 'dddd':
                        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this._date.getDay()];
                    case 'M':
                        return self._date.getMonth() + 1;
                    case 'MM':
                        return self.zeroize(this._date.getMonth() + 1);
                    case 'MMM':
                        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this._date.getMonth()];
                    case 'MMMM':
                        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this._date.getMonth()];
                    case 'yy':
                        return String(self._date.getFullYear()).substr(2);
                    case 'yyyy':
                        return self._date.getFullYear();
                    case 'h':
                        return self._date.getHours() % 12 || 12;
                    case 'hh':
                        return self.zeroize(self._date.getHours() % 12 || 12);
                    case 'H':
                        return self._date.getHours();
                    case 'HH':
                        return self.zeroize(self._date.getHours());
                    case 'm':
                        return self._date.getMinutes();
                    case 'mm':
                        return self.zeroize(self._date.getMinutes());
                    case 's':
                        return self._date.getSeconds();
                    case 'ss':
                        return self.zeroize(self._date.getSeconds());
                    case 'l':
                        return self.zeroize(self._date.getMilliseconds(), 3);
                    case 'L':
                        var m = this._date.getMilliseconds();
                        if (m > 99) m = Math.round(m / 10);
                        return this.zeroize(m);
                    case 'tt':
                        return self._date.getHours() < 12 ? 'am' : 'pm';
                    case 'TT':
                        return self._date.getHours() < 12 ? 'AM' : 'PM';
                    case 'Z':
                        return self._date.toUTCString().match(/[A-Z]+$/);
                    // Return quoted strings with the surrounding quotes removed
                    default:
                        return $1.substr(1, $1.length - 2);
                }

            });
            return this._date.toDateString();
        }

        public formatUTC(dateTime:flash.As3Date):string
        {
            this._date = dateTime;
            //switch (this._pattern)
            //{
            //    case "yyyy/M/d":
            //        return this._date.getUTCFullYear() + "/"+ this._date.getUTCMonth()+"/"+this._date.getUTCDate();
            //    case "MM dd yyyy HH:MM:ss":
            //        return (this._date.getUTCMonth()<10?("0"+this._date.getUTCMonth()) : this._date.getMonth())+" "+(this._date.getUTCDate()<10?("0"+this._date.getUTCDate()):this._date.getUTCDate())+" "+this._date.getUTCFullYear() +" " + this._date.getUTCHours()+":" +this._date.getUTCMinutes()+":"+this._date.getUTCSeconds();
            //    case "HH:MM:ss":
            //        return this._date.getUTCHours()+":"+this._date.getUTCMinutes()+":"+this._date.getUTCSeconds();
            //
            //}

            var r:RegExp = new RegExp("'[^\"]*'|'[^']*'|\\b(?:d{1,4}|M{1,4}|yy(?:yy)?|([hHmstT])\\1?|[lLZ])\\b","g");
            var self = this;

            return this._pattern["replace"](r, function ($1) {

                switch ($1) {
                    case 'd':
                        return self._date.getDate();
                    case 'dd':
                        return self.zeroize(self._date.getDate());
                    case 'ddd':
                        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'][this._date.getDay()];
                    case 'dddd':
                        return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this._date.getDay()];
                    case 'M':
                        return self._date.getMonth() + 1;
                    case 'MM':
                        return self.zeroize(this._date.getMonth() + 1);
                    case 'MMM':
                        return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][this._date.getMonth()];
                    case 'MMMM':
                        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][this._date.getMonth()];
                    case 'yy':
                        return String(self._date.getFullYear()).substr(2);
                    case 'yyyy':
                        return self._date.getFullYear();
                    case 'h':
                        return self._date.getHours() % 12 || 12;
                    case 'hh':
                        return self.zeroize(self._date.getHours() % 12 || 12);
                    case 'H':
                        return self._date.getHours();
                    case 'HH':
                        return self.zeroize(self._date.getHours());
                    case 'm':
                        return self._date.getMinutes();
                    case 'mm':
                        return self.zeroize(self._date.getMinutes());
                    case 's':
                        return self._date.getSeconds();
                    case 'ss':
                        return self.zeroize(self._date.getSeconds());
                    case 'l':
                        return self.zeroize(self._date.getMilliseconds(), 3);
                    case 'L':
                        var m = this._date.getMilliseconds();
                        if (m > 99) m = Math.round(m / 10);
                        return this.zeroize(m);
                    case 'tt':
                        return self._date.getHours() < 12 ? 'am' : 'pm';
                    case 'TT':
                        return self._date.getHours() < 12 ? 'AM' : 'PM';
                    case 'Z':
                        return self._date.toUTCString().match(/[A-Z]+$/);
                    // Return quoted strings with the surrounding quotes removed
                    default:
                        return $1.substr(1, $1.length - 2);
                }

            });

            return this._date.toUTCString();
        }

        private zeroize (value:number, length?:number):string {

            if (!length) length = 2;

            var v:string = flash.String(value);

            for (var i = 0, zeros = ''; i < (length - v["length"]); i++) {

                zeros += '0';

            }

            return zeros + value;

        }

        public getAvailableLocaleIDNames():flash.Vector
        {
            var names:Array<string> = ["af-ZA","am-ET","ar-AE","ar-BH","ar-DZ","ar-EG","ar-IQ","ar-JO","ar-KW","ar-LB","ar-LY","ar-MA","ar-OM","ar-QA","ar-SA","ar-SY","ar-TN","ar-YE","arn-CL","as-IN","az-Cyrl-AZ","az-Latn-AZ","ba-RU","be-BY","bg-BG","bn-BD","bn-IN","bo-CN","br-FR","bs-Cyrl-BA","bs-Latn-BA","ca-ES","ca-ES-VALENCIA","chr","chr-Cher","chr-Cher-US","co-FR","cs-CZ","cy-GB","da-DK","de-AT","de-CH","de-DE","de-DE@collation=phonebook","de-LI","de-LU","dsb-DE","dv-MV","el-GR","en-029","en-AU","en-BZ","en-CA","en-GB","en-HK","en-IE","en-IN","en-JM","en-MY","en-NZ","en-PH","en-SG","en-TT","en-US","en-ZA","en-ZW","es-419","es-AR","es-BO","es-CL","es-CO","es-CR","es-DO","es-EC","es-ES","es-ES@collation=traditional","es-GT","es-HN","es-MX","es-NI","es-PA","es-PE","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et-EE","eu-ES","fa-IR","ff","ff-Latn","ff-Latn-SN","fi-FI","fil-PH","fo-FO","fr-BE","fr-CA","fr-CD","fr-CH","fr-CI","fr-CM","fr-FR","fr-HT","fr-LU","fr-MA","fr-MC","fr-ML","fr-RE","fr-SN","fy-NL","ga-IE","gd-GB","gl-ES","gn-PY","gsw-FR","gu-IN","ha-Latn-NG","haw-US","he-IL","hi-IN","hr-BA","hr-HR","hsb-DE","hu-HU","hu-HU@collation=technical","hy-AM","id-ID","ig-NG","ii-CN","is-IS","it-CH","it-IT","iu-Cans-CA","iu-Latn-CA","ja-JP","ja-JP@collation=stroke","jv-Latn-ID","ka-GE","ka-GE@collation=modern","kk-KZ","kl-GL","km-KH","kn-IN","ko-KR","kok-IN","ku-Arab-IQ","ky-KG","lb-LU","lo-LA","lt-LT","lv-LV","mg-MG","mi-NZ","mk-MK","ml-IN","mn-MN","mn-Mong-CN","mn-Mong-MN","moh-CA","mr-IN","ms-BN","ms-MY","mt-MT","my-MM","nb-NO","ne-IN","ne-NP","nl-BE","nl-NL","nn-NO","no","nqo","nqo-GN","nso-ZA","oc-FR","om-ET","or-IN","pa-Arab-PK","pa-IN","pl-PL","prs-AF","ps-AF","pt-AO","pt-BR","pt-PT","qut-GT","quz-BO","quz-EC","quz-PE","rm-CH","ro-MD","ro-RO","ru-RU","rw-RW","sa-IN","sah-RU","sd","sd-Arab-PK","se-FI","se-NO","se-SE","si-LK","sk-SK","sl-SI","sma-NO","sma-SE","smj-NO","smj-SE","smn-FI","sms-FI","sn-Latn-ZW","so-SO","sq-AL","sr-Cyrl-BA","sr-Cyrl-CS","sr-Cyrl-ME","sr-Cyrl-RS","sr-Latn-BA","sr-Latn-CS","sr-Latn-ME","sr-Latn-RS","st-ZA","sv-FI","sv-SE","sw","sw-KE","syr-SY","ta-IN","ta-LK","te-IN","tg-Cyrl-TJ","th-TH","ti-ER","ti-ET","tk-TM","tn-BW","tn-ZA","tr-TR","ts-ZA","tt-RU","tzm-Latn-DZ","tzm-Tfng","tzm-Tfng-MA","ug-CN","uk-UA","ur-IN","ur-PK","uz-Cyrl-UZ","uz-Latn-UZ","vi-VN","wo-SN","x-iv_mathan","xh-ZA","yo-NG","zgh","zgh-Tfng","zgh-Tfng-MA","zh-CN","zh-CN@collation=stroke","zh-HK","zh-HK@collation=stroke","zh-MO","zh-MO@collation=stroke","zh-MO@collation=stroke","zh-SG","zh-SG@collation=stroke","zh-TW","zh-TW@collation=pinyin","zh-TW@collation=stroke","zu-ZA"];
            var local:flash.Vector = new flash.Vector();
            for(var i:number = 0 ;i < names.length;i ++)
            {
                local[i] = names[i];
            }
            return local;
        }


        public getDateStyle():string
        {
            return this._dataStyle;
        }

        public getDateTimePattern():string
        {
            return  this._pattern;
        }

        public getFirstWeekday():number
        {
            return 0;
        }

        public getMonthNames(nameStyle:string = "full", context:string = "standalone"):flash.Vector
        {
            var months:Array<string> = nameStyle == "full" ? ["\u4e00\u6708","\u4e8c\u6708","\u4e09\u6708","\u56db\u6708","\u4e94\u6708","\u516d\u6708","\u4e03\u6708","\u516b\u6708","\u4e5d\u6708","\u5341\u6708","\u5341\u4e00\u6708","\u5341\u4e8c\u6708"] : ["1\u6708","2\u6708","3\u6708","4\u6708","5\u6708","6\u6708","7\u6708","8\u6708","9\u6708","10\u6708","11\u6708","12\u6708"];
            var month:flash.Vector = new flash.Vector();
            for(var i:number = 0 ;i < months.length;i ++)
            {
                month[i] = months[i];
            }
            return month;
        }

        public getTimeStyle():string
        {
            return this._timeStyle;
        }
        public getWeekdayNames(nameStyle:string = "full", context:string = "standalone"):flash.Vector
        {
            var dates:flash.Vector = new flash.Vector();
            if(nameStyle == flash.DateTimeNameStyle.FULL)
            {
                dates[0] = "\u661f\u671f\u65e5";
                dates[1] = "\u661f\u671f\u4e00";
                dates[2] = "\u661f\u671f\u4e8c";
                dates[3] = "\u661f\u671f\u4e09";
                dates[4] = "\u661f\u671f\u56db";
                dates[5] = "\u661f\u671f\u4e94";
                dates[6] = "\u661f\u671f\u516d";
            }
            else if(nameStyle == flash.DateTimeNameStyle.LONG_ABBREVIATION)
            {
                dates[0] = "\u5468\u65e5";
                dates[1] = "\u5468\u4e00";
                dates[2] = "\u5468\u4e8c";
                dates[3] = "\u5468\u4e09";
                dates[4] = "\u5468\u56db";
                dates[5] = "\u5468\u4e94";
                dates[6] = "\u5468\u516d";
            }

            return dates;
        }

        public setDateTimePattern(pattern:string):void
        {
            this._pattern = pattern;
        }


        public setDateTimeStyles(dateStyle:string, timeStyle:string):void
        {
            this._dataStyle = dateStyle;
            this._timeStyle = timeStyle;
        }



    }
}