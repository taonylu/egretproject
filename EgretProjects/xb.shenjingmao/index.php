﻿<?php
require_once "/www/web/www_yx_com/public_html/core/jssdk.php";
$jssdk = new JSSDK();
$signPackage = $jssdk->GetSignPackage();

//获取链接参数
$gameID = $_GET['gameID'];

$con = mysql_connect("localhost", "root", "xinbu168!");

$db = mysql_select_db("xinbuutf8");

mysql_query("set names utf8", $con);

//没进入做一次游戏，给相应的游戏点击数加1
$sqlgame = "UPDATE hzl_gameInfo SET count = count + 1  WHERE gameID = '" . $gameID . "'";
mysql_query($sqlgame, $con);

?>
<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta charset="utf-8">
    <title>感觉萌萌哒~围住神经猫</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no,target-densitydpi=device-dpi">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="full-screen" content="true">
    <meta name="screen-orientation" content="portrait">
    <meta name="x5-fullscreen" content="true">
    <meta name="360-fullscreen" content="true">
    <base href=".">
     <script type="text/javascript">

			if (!(navigator.userAgent.match(/(iPhone|iPod|Android|ios|iOS|iPad|Backerry|WebOS|Symbian|Windows Phone|Phone)/i))) {

				location.replace("http://www.gdiy.me/about.html");

			} 

		</script>
    <style>
body {
	text-align: center;
	background: #000000;
	padding: 0;
	border: 0;
	margin: 0;
	height: 100%;
}
html {
	-ms-touch-action: none; /* Direct all pointer events to JavaScript code. */
}
.sbgshow {
	display: block;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	color: #fff;
	font-size: 30px;
	line-height: 1.7em;
	background: rgba(0,0,0,0.85);
}
.sbgshow .arron {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 100px;
	height: 100px;
	background: url(./static/images/arron.png) no-repeat;
	background-size: 100px 100px;
}
.sbgshow p {
	padding-top: 78px;
}
.sbg {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	text-align: center;
	color: #fff;
	font-size: 26px;
	line-height: 1.7em;
	background: rgba(0,0,0,0.85);
}
.sbg .arron {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 100px;
	height: 100px;
	background: url(./static/images/arron.png) no-repeat;
	background-size: 100px 100px;
}
.sbg p {
	padding-top: 78px;
}
.aliForPc {
	display: none;
	position: fixed;
	top: 5px;
	right: 5px;
	width: 200px;
	height: 230px;
	overflow: hidden;
	z-index: 99999;
}
</style>
    </head>
    <body>
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2207c39aecfe7b9b0f144ab7f8316fad' type='text/javascript'%3E%3C/script%3E"));
</script>
<div style="display:inline-block;width:100%; height:100%;margin: 0 auto; background: black; position:relative;" id="gameDiv">
      <canvas id="gameCanvas" width="480" height="800" style="background-color: #000000"></canvas>
    </div>
<!--<div class="aliForPc"><img src="static/images/forpc.png" /></div>
--><div id="sbg" class="sbg">
      <div class="arron"></div>
      <p id="msg">请点击右上角<br>
    点击【分享到朋友圈】<br>
    测测好友的神经指数吧！</p>
    </div>
<script>var document_class = "GameApp";</script><!--这部分内容在编译时会被替换，要修改文档类，请到工程目录下的egretProperties.json内编辑。--> 
<script language="javascript" type="text/javascript" src="static/js/resource_loader.js?ver=255"></script> 
<script src="static/js/egret_loader.js"></script> 
<script src="static/js/game-min-0722.js?223"></script> 
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>
  wx.config({
  	//debug: true,
    appId: '<?php echo $signPackage["appId"];?>',
    timestamp: <?php echo $signPackage["timestamp"];?>,
    nonceStr: '<?php echo $signPackage["nonceStr"];?>',
    signature: '<?php echo $signPackage["signature"];?>',
    jsApiList: [ 'onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo']
  });
  wx.ready(function () {
    // 在这里调用 API
    wx.onMenuShareTimeline({
    title: '围住神经猫', // 分享标题
    desc: '在9×9范围内的格子中，使用色块围住白色神经猫。', // 分享描述
    link: 'http://www.gdiy.me/hall/games/shenjingmao/index.php?gameID=sjm', // 分享链接
    imgUrl: 'http://www.gdiy.me/hall/games/shenjingmao/icon.png', // 分享图标
    success: function () { 
        // 用户确认分享后执行的回调函数
       // alert("分享成功");
	   window.location="http://www.gdiy.me/hall/index1.php"
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
        //alert("分享取消");
		window.location="http://www.gdiy.me/hall/games/shenjingmao/index.php?gameID=sjm"
    }
});
wx.onMenuShareAppMessage({
    title: '围住神经猫', // 分享标题
    desc: '在9×9范围内的格子中，使用色块围住白色神经猫。', // 分享描述
    link: 'http://www.gdiy.me/hall/games/shenjingmao/index.php?gameID=sjm', // 分享链接
    imgUrl: 'http://www.gdiy.me/hall/games/shenjingmao/icon.png', // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () { 
        // 用户确认分享后执行的回调函数
       // alert("分享成功");
	    window.location="http://www.gdiy.me/hall/index1.php"
    },
    cancel: function () { 
        // 用户取消分享后执行的回调函数
         //alert("分享取消");
		 window.location="http://www.gdiy.me/hall/games/shenjingmao/index.php?gameID=sjm"
    }
});
  });
</script>
<script type="text/javascript" src="http://tajs.qq.com/stats?sId=39768531" charset="UTF-8"></script>
<script>
	var mebtnopenurl = 'http://www.gdiy.me/hall/index1.php';
		window.shareData = {
		        "imgUrl": "http://www.gdiy.me/hall/games/shenjingmao/icon.png",
		        "timeLineLink": "http://www.gdiy.me/hall/games/shenjingmao/indxe.html ",
		        "tTitle": "围住神经猫-根本停不下来，玩过之后我整个人都精神了！",
		        "tContent": "在9×9范围内的格子中，使用色块围住白色神经猫。"
		};
		
    function showme(){
        window.location.href="http://mp.weixin.qq.com/s?__biz=MjM5NjM2NTc1OQ==&mid=200916958&idx=1&sn=2d21445fa345f59c46335296dee5431f#rd";<!--此处可改为你自己的一键关注链接-->
    }
    function dp_share(n , m){
        if(m == 0){
            document.title = window.shareData.tContent = "围住神经猫-根本停不下来，玩过之后我整个人都精神了！"
        }
        if(m == 1){
            document.title = window.shareData.tContent = "我用了"+n+"步围住神经猫，击败"+(100-n)+"%的人，你能超过我吗？"
        }
        if(m == 2){
            document.title = window.shareData.tContent = "我没有围住它，谁能帮个忙？"
        }
        document.getElementById("sbg").className="sbgshow";
        window.setTimeout(hiddenMe, 5000);
    }

    function hiddenMe(){
        document.getElementById("sbg").className="sbg";
    }
	
    egret_h5.startGame();
	$j(document).ready(function(){
		if(/Android|Windows Phone|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
			//
		}else{
			$j(".aliForPc").show();
		}
	});
</script>
</body>
    <div style="display:none;"></div>
</html>