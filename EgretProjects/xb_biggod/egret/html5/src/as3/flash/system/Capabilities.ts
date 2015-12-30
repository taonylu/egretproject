/**
 * Created by huitao on 2015/5/13.
 */

module flash {

    export class Capabilities {
        //private _avHardwareDisable : boolean;
        public static get avHardwareDisable():boolean {
            return false;
        }

        //private _hasAccessibility : boolean;
        public static get hasAccessibility():boolean {
            return false;
        }

        //private _hasAudio : boolean;
        public static get hasAudio():boolean {
            return false;
        }

        //private _hasAudioEncoder : boolean;
        public static get hasAudioEncoder():boolean {
            return false;
        }

        private _hasEmbeddedVideo:boolean;
        public static get hasEmbeddedVideo():boolean {
            return false;
        }

        //private _hasIME : boolean;
        public static get hasIME():boolean {
            return false;
        }

        //private _hasMP3 : boolean;
        public static get hasMP3():boolean {
            return false;
        }

        //private _hasPrinting : boolean;
        public static get hasPrinting():boolean {
            return false;
        }

        //private _hasScreenBroadcast : boolean;
        public static get hasScreenBroadcast():boolean {
            return false;
        }

        //private _hasScreenPlayback : boolean;
        public static get hasScreenPlayback():boolean {
            return false;
        }

        //private _hasStreamingAudio : boolean;
        public static get hasStreamingAudio():boolean {
            return false;
        }

        //private _hasStreamingVideo : boolean;
        public static get hasStreamingVideo():boolean {
            return false;
        }

        //private _hasTLS : boolean;
        public static get hasTLS():boolean {
            return false;
        }

        //private _hasVideoEncoder : boolean;
        public static get hasVideoEncoder():boolean {
            return false;
        }

        //private _isDebugger : boolean;
        public static get isDebugger():boolean {
            return false;
        }

        //private _language : string;
        public static get language():string {
            return "";
        }

        //private _localFileReadDisable : boolean;
        public static get localFileReadDisable():boolean {
            return false;
        }

        //private _manufacturer : string;
        public static get manufacturer():string {
            return "";
        }

        //private _os : string;
        public static get os():string {
            return "";
        }

        //private _pixelAspectRatio : number;
        public static get pixelAspectRatio():number {
            return 1;
        }

        //private _playerType : string = "Desktop";
        public static get playerType():string {
            return "Desktop";
        }

        //private _screenColor : string;
        public static get screenColor():string {
            return "";
        }

        //private _screenDPI : number;
        public static get screenDPI():number {
            return 0;
        }

        //private _screenResolutionX : number;
        public static get screenResolutionX():number {
            return 0;
        }

        //private _screenResolutionY : number;
        public static get screenResolutionY():number {
            return 1;
        }

        //private _serverString : string;
        public static get serverString():string {
            return "";
        }

        //private _version : string
        public static get version():string {
            return "";
        }

        constructor() {

        }
    }


}
