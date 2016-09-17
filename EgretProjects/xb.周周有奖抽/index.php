<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>Egret</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #888888;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>

    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
	<script egret="lib" src="libs/modules/egret/egret.min.js"></script>
	<script egret="lib" src="libs/modules/egret/egret.web.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.min.js"></script>
	<script egret="lib" src="libs/modules/game/game.web.min.js"></script>
	<script egret="lib" src="libs/modules/eui/eui.min.js"></script>
	<script egret="lib" src="libs/modules/res/res.min.js"></script>
	<script egret="lib" src="libs/modules/tween/tween.min.js"></script>
	<!--modules_files_end-->

    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
    <!--other_libs_files_end-->

    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
    <!--game_files_start-->
	<script src="main.min.js"></script>
	<!--game_files_end-->
</head>
<body>
<style>
		#ewm{
		width: 95px;
		position: absolute;
		right:0px;
		left:0px;
		margin:0px auto;
		}
		#ewm img{
		width:100%;
		}
	#ewm img{
	width:100%;
	}
	#share_ewm{
	width: 130px;
	position: absolute;
	right:0px;
	left:0px;
	margin:0px auto;
	}
	#share_ewm img{
	  width:100%;
	}
	#share{
	  width:100%;
	height:100%;
	position: absolute;
	top:0px;
	left:0px
	z-index:99;
	background:rgba(0,0,0,0.6);
	display:none
	}
	#share img{
	 width: 250px;
	position: absolute;
	right: 20px;
	top: 20px;
	}
	#texts{
	width: 200px;
	top: 200px;
	margin: 0px auto;
	position: absolute;
	right: 0px;
	left: -6px;
	/* background: #fff; */
	font-size: 20px;
	-webkit-transform: rotate(-6.5deg);
	display:none;
	font-family:"微软雅黑"
	}
	</style>
    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-scale-mode="fixedWidth"
         data-frame-rate="30"
         data-content-width="640"
         data-content-height="1040"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
    </div>
    <div id="ewm">
    	
    </div>
	<div id="share_ewm">
    	
    </div>
    <div id="share">
    	<img src="resource/assets/share_title.png">
    	</img>
    </div>
    <p id="texts">
    	151564548448848
    </p>
    <script>
    	 var tokenStr = '<?=$generic['tokenStr']?>';
         var _csrf = '<?=$generic['_csrf']?>';
         var apiUrl = '<?=$generic['apiUrl']?>';
         var signStr = '<?=$generic['signStr']?>';
         var timeStr= '<?=$generic['timeStr']?>';
        egret.runEgret();
    </script>
    <div style="display: none;">
    	<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1258990916'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s11.cnzz.com/z_stat.php%3Fid%3D1258990916' type='text/javascript'%3E%3C/script%3E"));</script>
    </div>
     <script>
//声明_czc对象:
var _czc = _czc || [];
//绑定siteid，请用您的siteid替换下方"XXXXXXXX"部分
_czc.push(["_setAccount", "1258990916"]);
//抽奖去的按钮事件
function chouclick(){ 
 _czc.push(['_trackEvent', '点击按钮', '抽奖去', '抽奖去','1',''])
}
//滑动抽奖请求事件
function removeclick(){
  _czc.push(['_trackEvent', '点击按钮', '滑动瓶子抽奖', '瓶子','1',''])
}

function chanyuclick(){
}

//点击页面的按钮分享事件
function shareclick(){
 _czc.push(['_trackEvent', '点击按钮', '分享提示按钮', '按钮','1',''])

}
function mp3fun(){
	var mp3=document.getElementById('bg_mp3');
	    mp3.play()
}
</script>
  <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
  <script type="text/javascript">
    	wx.config({
		// debug: true,
		 appId: '<?=$generic['appId']?>',
		 timestamp:<?=$generic['timestamp']?>,
		 nonceStr: '<?=$generic['nonceStr']?>',
		 signature: '<?=$generic['signature']?>',
		jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
		 });
    </script>

<script>
	var xbtitle="乐堡啤酒周周有奖抽";  //分享标题； 
	var xbdesc ="【周末福利】进来抽吃喝玩乐福利，每周五限时派送！小伙伴快抢！"; //分享描述；
	var xbimgUrl="http://"+document.domain +"/tuborg-week-lottery/icon.png";//分享logoo
	var xblink="http://"+document.domain +"/tuborg-week-lottery/share"; //分享链

  wx.ready(function () {
    // 在这里调用 API
    wx.onMenuShareTimeline({   //朋友圈
     title: xbdesc, // 分享标题
   	 desc:xbdesc , // 分享描述
      link: xblink, // 分享链接
    imgUrl: xbimgUrl, // 分享图标
	//type: '', // 分享类型,music、video或link,不填默认为link
    //dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
    success: function () { 
        _czc.push(['_trackEvent', '分享朋友圈', '分享朋友圈次数', '','1',''])
    },
    cancel: function () { }
});
  
wx.onMenuShareAppMessage({  //分享好友
    title: xbtitle, // 分享标题
    desc:xbdesc , // 分享描述
    link: xblink, // 分享链接
    imgUrl:xbimgUrl, // 分享图标
    type: '', // 分享类型,music、video或link,不填默认为link
    dataUrl: '', // 如果type是music或video,则要提供数据链接,默认为空
    success: function () {
       _czc.push(['_trackEvent', '分享好友', '分享好友次数', '','1',''])
    },
    cancel: function () {}
});
  });
</script>
</body>
</html>
