<?php
require_once "../jssdk.php";
$jssdk = new JSSDK('wx3e1ac9134b043c3d','5965ef92595fcf660e670786aa217691');
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>百元店beta1.0</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #ffd6b8;
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

    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-scale-mode="fixedWidth"
         data-frame-rate="60"
         data-content-width="640"
         data-content-height="1140"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
    </div>
    
	
    <script>
        egret.runEgret();
    </script>
	<!-- 微信start -->
		<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
		<script>
		  wx.config({
			// debug: true,
			 appId: '<?php echo $signPackage["appId"];?>',
			 timestamp: <?php echo $signPackage["timestamp"];?>,
			 nonceStr: '<?php echo $signPackage["nonceStr"];?>',
			 signature: '<?php echo $signPackage["signature"];?>',
			jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
		  });
		  wx.ready(function() {
				wx.onMenuShareAppMessage({
					title: '新年第一发，蛋蛋历险记！', // 分享标题
					desc: '玩个痛快', // 分享描述
					link: "http://www.cisigo.com/Show/Newspaper/index.php", // 分享链接
					imgUrl: 'http://www.cisigo.com/Show/Newspaper/resource/assets/icon.jpg', // 分享图标
					success: function() {
				
					}
				});
				wx.onMenuShareTimeline({
					title: '新年第一发，蛋蛋历险记！', // 分享标题
					link: 'http://www.cisigo.com/Show/Newspaper/index.php', // 分享链接
					imgUrl: 'http://www.cisigo.com/Show/Newspaper/resource/assets/icon.jpg', // 分享图标
					success: function() {
					}
				});
		  });
		</script>
		<!-- 微信end -->

		<!-- 统计-->
		<div style="display:none">
		<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1257109391'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1257109391' type='text/javascript'%3E%3C/script%3E"));</script>
		</div>
		<!-- 统计end -->
</body>
</html>