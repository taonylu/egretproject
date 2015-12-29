/**
 * Created by huitao on 2015/6/23.
 */
module flash
{
    export class Keyboard
    {
        static STRING_CLEARLINE    :string = "";
        static STRING_CLEARDISPLAY :string = "";
        static STRING_INSERTLINE   :string = "";
        static STRING_DELETELINE   :string = "";
        static STRING_INSERTCHAR   :string = "";
        static STRING_DELETECHAR   :string = "";
        static STRING_PREV         :string = "";
        static STRING_NEXT         :string = "";
        static STRING_SELECT       :string = "";
        static STRING_EXECUTE      :string = "";
        static STRING_UNDO         :string = "";
        static STRING_REDO         :string = "";
        static STRING_FIND         :string = "";
        static STRING_HELP         :string = "";
        static STRING_MODESWITCH   :string = "";
        static CharCodeStrings     :Array<any>
        static NUMBER_0            :number = 48;
        static NUMBER_1            :number = 49;
        static NUMBER_2            :number = 50;
        static NUMBER_3            :number = 51;
        static NUMBER_4            :number = 52;
        static NUMBER_5            :number = 53;
        static NUMBER_6            :number = 54;
        static NUMBER_7            :number = 55;
        static NUMBER_8            :number = 56;
        static NUMBER_9            :number =57;
        static RED                 :number = 0x01000000;
        static SEMICOLON           :number
        static GREEN               :number = 0x01000001;
        static EQUAL               :number = 187;
        static BLUE                :number = 0x01000003;
        static COMMA               :number = 188;
        static MINUS               :number = 189;
        static PERIOD              :number = 190;
        static SLASH               :number = 191;
        static BACKQUOTE           :number = 192;
        static LEFTBRACKET         :number = 219;
        static BACKSLASH           :number = 220;
        static RIGHTBRACKET        :number = 221;
        static QUOTE               :number = 222;
        static ALTERNATE           :number = 18;
        static BACKSPACE           :number = 8;
        static CAPS_LOCK           :number = 20;
        static KEYNAME_DOWNARROW   :string = "Down";
        static KEYNAME_LEFTARROW   :string = "Left";
        static KEYNAME_UPARROW     :string = "Up"
        static KEYNAME_RIGHTARROW  :string = "Right"
        static COMMAND             :number = 15;
        static KEYNAME_F1          :string = "F1";
        static CONTROL             :number = 17;
        static KEYNAME_F2          :string  = "F2"
        static DELETE              :number = 46;
        static KEYNAME_F3          :string  = "F3";
        static DOWN                :number = 40;
        static KEYNAME_F4          :string = "F4";
        static END                 :number = 35;
        static KEYNAME_F5          :string = "F5";
        static ENTER               :number = 13;
        static KEYNAME_F6          :string = "F6";
        static ESCAPE              :number = 27;
        static KEYNAME_F7          :string = "F7";
        static F1                  :number = 112;
        static KEYNAME_F8          :string = "F8";
        static F2                  :number = 113;
        static KEYNAME_F9          :string = "F9";
        static F3                  :number = 114;
        static KEYNAME_F10         :string = "F10";
        static F4                  :number = 115;
        static KEYNAME_F11         :string = "F11";
        static F5                  :number = 116;
        static KEYNAME_F12         :string = "F12"
        static F6                  :number = 117;
        static KEYNAME_F13         :string = "F13";
        static F7                  :number = 118;
        static KEYNAME_F14         :string = "F14";
        static F8                  :number = 119;
        static KEYNAME_F15         :string = "F15";
        static F9                  :number = 120;
        static KEYNAME_F16         :string = "F16";
        static F10                 :number = 121;
        static KEYNAME_F17         :string = "F17";
        static F11                 :number = 122;
        static KEYNAME_F18         :string = "F18";
        static F12                 :number = 123;
        static KEYNAME_F19         :string = "F19";
        static F13                 :number = 124;
        static KEYNAME_F20         :string = "F20";
        static F14                 :number = 125;
        static KEYNAME_F21         :string = "F21";
        static F15                 :number = 126;
        static KEYNAME_F22         :string = "F22";
        static HOME                :number = 36;
        static KEYNAME_F23         :string = "F23";
        static INSERT              :number = 45;
        static KEYNAME_F24         :string = "F24";
        static LEFT                :number = 37;
        static KEYNAME_F25         :string = "F25";
        static NUMPAD              :number = 21;
        static KEYNAME_F26         :string = "F26";
        static NUMPAD_0            :number = 96;
        static KEYNAME_F27         :string = "F27";
        static NUMPAD_1            :number = 97;
        static KEYNAME_F28         :string = "F28";
        static NUMPAD_2            :number = 98;
        static KEYNAME_F29         :string = "F29";
        static NUMPAD_3            :number = 99;
        static NUMPAD_4            :number = 100;
        static KEYNAME_F31         :string = "F31";
        static NUMPAD_5            :number = 101;
        static KEYNAME_F32         :string = "F32";
        static KEYNAME_F30         :string = "F30";
        static KEYNAME_F33         :string = "F33";
        static NUMPAD_7            :number = 102;
        static KEYNAME_F34         :string = "F34";
        static NUMPAD_8            :number = 103;
        static NUMPAD_6            :number = 104;
        static NUMPAD_9            :number = 105;
        static KEYNAME_INSERT      :string = "Insert"
        static NUMPAD_ADD          :number = 107;
        static KEYNAME_DELETE      :string = "Delete"
        static KEYNAME_F35         :string = "F35";
        static KEYNAME_HOME        :string = "Home";
        static NUMPAD_DIVIDE       :number = 111;
        static NUMPAD_SUBTRACT     :number = 109;
        static NUMPAD_ENTER        :number = 109;
        static KEYNAME_END         :string = "End";
        static NUMPAD_MULTIPLY     :number = 106;
        static KEYNAME_PAGEUP      :string = "PgUp";
        static KEYNAME_BEGIN       :string = "Begin";
        static KEYNAME_PAGEDOWN    :string = "PgDn";
        static PAGE_DOWN           :number = 34;
        static KEYNAME_PRINTSCREEN :string = "PrntScrn";
        static PAGE_UP             :number = 33;
        static KEYNAME_SCROLLLOCK  :string = "ScrlLck";
        static RIGHT               :number =39;
        static KEYNAME_PAUSE       :string = "Pause";
        static SHIFT               :number = 16;
        static KEYNAME_SYSREQ      :string = "SysReq";
        static SPACE               :number = 32;
        static KEYNAME_BREAK       :string = "Break";
        static TAB                 :number = 9;
        static KEYNAME_RESET       :string = "Reset";
        static UP                  :number = 38;
        static KEYNAME_STOP        :string = "Stop";
        static YELLOW              :number = 0x01000002;
        static KEYNAME_MENU        :string = "Menu"
        static CHANNEL_UP          :number = 0x01000004;
        static KEYNAME_USER        :string = "User";
        static CHANNEL_DOWN        :number = 0x01000005;
        static KEYNAME_SYSTEM      :string = "Sys";
        static RECORD              :number = 0x01000006;
        static KEYNAME_PRINT       :string = "Print";
        static PLAY                :number = 0x01000007;
        static KEYNAME_CLEARLINE   :string = "ClrLn";
        static PAUSE               :number = 0x01000008;
        static KEYNAME_CLEARDISPLAY:string = "ClrDsp";
        static STOP                :string = "Stop";
        static KEYNAME_INSERTLINE  :string = "InsLn";
        static FAST_FORWARD        :number = 0x0100000A;
        static KEYNAME_DELETELINE  :string = "DelLn";
        static REWIND              :number = 0x0100000B;
        static KEYNAME_INSERTCHAR  :string = "InsChr";
        static SKIP_FORWARD        :number = 0x0100000C;
        static KEYNAME_DELETECHAR  :string = "DelChr";
        static SKIP_BACKWARD       :number = 0x0100000D;
        static KEYNAME_PREV        :string = "Prev";
        static NEXT                :string = "Next";
        static KEYNAME_NEXT        :string = "Next";
        static PREVIOUS            :number = 0x0100000F;
        static KEYNAME_SELECT      :string = "Select";
        static LIVE                :number = 0x01000010;
        static KEYNAME_EXECUTE     :string = "Exec";
        static LAST                :number = 0x01000011;
        static KEYNAME_UNDO        :string = "Undo";
        static MENU                :number = 0x01000012;
        static KEYNAME_REDO        :string = "Redo";
        static INFO                :number = 0x01000013;
        static KEYNAME_FIND        :string = "Find";
        static GUIDE               :number = 0x01000014;
        static KEYNAME_HELP        :string = "Help";
        static EXIT                :number = 0x01000015;
        static KEYNAME_MODESWITCH  :string = "ModeSw";
        static AUDIO               :number = 0x01000017;
        static STRING_UPARROW      :string = "";
        static SUBTITLE            :number = 0x01000018;
        static STRING_DOWNARROW    :string = "";
        static DVR                 :number = 0x01000019;
        static STRING_LEFTARROW    :string = "";
        static VOD                 :number = 0x0100001A;
        static STRING_RIGHTARROW   :string = "";
        static INPUT               :number = 0x0100001B;
        static STRING_F1           :string = "";
        static SETUP               :number = 0x0100001C;
        static STRING_F2           :string = "";
        static HELP                :number = 0x0100001D;
        static STRING_F3           :string = "";
        static MASTER_SHELL        :number = 0x0100001E;
        static STRING_F4           :string = "";
        static SEARCH              :number = 0x0100001F;
        static STRING_F5           :string = "";
        static STRING_F6           :string = "";
        static NUMPAD_DECIMAL      :number = 110;
        static STRING_F8           :string = "";
        static STRING_F9           :string = "";
        static STRING_F7           :string = "";
        static STRING_F10          :string = "";
        static STRING_F11          :string = "";
        static STRING_F13          :string = "";
        static STRING_F14          :string = "";
        static STRING_F12          : string = "";
        static STRING_F15          :string = "";
        static B                   :number = 66;
        static STRING_F16          :string = "";
        static C                   :number = 67;
        static A                   :number = 65;
        static D                   :number = 68;
        static STRING_F18          :string = "";
        static E                   :number = 69;
        static STRING_F19          :string = "";
        static STRING_F17          :string = "";
        static STRING_F20          :string = "";
        static G                   :number = 71;
        static STRING_F21          :string = "";
        static H                   :number = 72;
        static F                   :number = 70;
        static I                   :number = 73;
        static STRING_F23          :string = "";
        static J                   :number = 74;
        static STRING_F24          :string = "";
        static STRING_F22          :string = "";
        static STRING_F25          :string = "";
        static L                   :number = 76;
        static STRING_F26          :string = "";
        static M                   :number = 77;
        static K                   :number = 75;
        static N                   :number = 78;
        static STRING_F28          :string = "";
        static O                   :number = 79;
        static STRING_F29          :string = "";
        static STRING_F27          :string = "";
        static STRING_F30          :string = "";
        static Q                   :number = 81;
        static STRING_F31          :string = "";
        static R                   :number = 82;
        static P                   :number = 80;
        static S                   :number = 83;
        static STRING_F33          :string = "";
        static T                   :number = 84;
        static STRING_F34          :string = "";
        static STRING_F32          :string = "";
        static STRING_F35          :string = "";
        static V                   :number = 86;
        static STRING_INSERT       :string = "";
        static W                   :number = 87;
        static U                   :number = 85;
        static X                   :number = 88;
        static STRING_HOME         :string = "";
        static Y                   :number = 89;
        static STRING_BEGIN        :string = "";
        static STRING_DELETE       :string = "";
        static STRING_END          :string = "";
        static STRING_PAGEUP       :string = "";
        static BACK                :number = 0x01000016;
        static Z                   :number = 90;
        static STRING_PRINTSCREEN  :string = "";
        static STRING_SCROLLLOCK   :string = "";
        static STRING_PAGEDOWN     :string = "";
        static STRING_PAUSE        :string = "";
        static STRING_SYSREQ       :string = "";
        static STRING_BREAK        :string = "";
        static STRING_RESET        :string = "";
        static STRING_STOP         :string = "";
        static STRING_MENU         :string = "";
        static STRING_USER         :string = "";
        static STRING_SYSTEM       :string = "";
        static STRING_PRINT        :string = "";

    }
}
