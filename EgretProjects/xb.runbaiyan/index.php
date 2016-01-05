<?php
require_once "../jssdk.php";
$jssdk = new JSSDK('wx3e1ac9134b043c3d','5965ef92595fcf660e670786aa217691');
$signPackage = $jssdk->GetSignPackage();
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>忍不住咬你脸颊的肌密</title>
    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="apple-mobile-web-app-capable" content="yes"/>
    <meta name="full-screen" content="true"/>
    <meta name="screen-orientation" content="portrait"/>
    <meta name="x5-fullscreen" content="true"/>
    <meta name="360-fullscreen" content="true"/>
    <style>
        html, body {
            -ms-touch-action: none;
            background: #2784ff;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
    </style>

	<script src="jquery-1.5.2.min.js"></script>

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
	<script src="main.min.js?ver=6.994"></script>
	<!--game_files_end-->
</head>
<body>

    <div id="gameDiv" style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-scale-mode="fixedWidth"
         data-frame-rate="60"
         data-content-width="640"
         data-content-height="1150"
         data-show-paint-rect="false"
         data-multi-fingered="2"
         data-show-fps="false" data-show-log="false"
         data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
    </div>
    <script>
        egret.runEgret();
		

		var code = Request("code");
		//alert("获取code:" + code);

		var userData;
		var pass;
		
		getUserData();

		function getUserData(){
			//alert("获取用户数据:" + code);
			$.ajax({
                type : "GET",
				url:"http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/getUserinfo/code/" + code + "/",
                dataType : 'json',
                success : function(revData){
					userData = revData;
					if(userData.code != 200){
						alert("请求错误：" + code);
					}	
					pass = userData.pass;
                },
                error:function(){
					//alert("获取用户数据错误");
					window.location.href="http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/getwxCode";
                }
            });
		}

		1. 进入  http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/getwxCode
		2。请求  
		
		function sendGetPrize(){
			var nullData;
			if(userData == null || userData.openid == null || userData.pass == null){
				window['gameScene'].reciveLuckResult(nullData);
				alert("请求错误,用户数据为null");
				return;
			}

			$.ajax({
                type : "post",
				url:"http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/xbLottery",
                dataType : 'json',
				data:{"openid": userData.openid, "pass":pass},
                success : function(revData){
					//alert("抽奖结果:" + revData.prizeid + "," + revData.msg);
					pass = revData.pass;
					window['gameScene'].reciveLuckResult(revData);
                },
                error:function(e){
					window['gameScene'].reciveLuckResult(nullData);
					alert("抽奖请求错误");
                }
            });
		}
		
		function getPrizeList(){
			$.ajax({
                type : "post",
				url:"http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/prizelist",
                dataType : 'json',
				data:{"openid": userData.openid, "pass":pass},
                success : function(revData){
					//alert("外部获奖列表nickname:" + revData[0].nickname + "," + revData[0].prizemsg);
					window['gameScene'].recivePrizeListResult(revData);
                },
                error:function(e){
					alert("抽奖请求错误");
					window['gameScene'].recivePrizeListResult(null);
                }
            });
		}

		

		function Request(argname) //获取get的值
		{ 
			var url = document.location.href; 
			var arrStr = url.substring(url.indexOf("?")+1).split("&"); 
			//return arrStr; 
			for(var i =0;i<arrStr.length;i++) 
			{ 
			var loc = arrStr[i].indexOf(argname+"="); 
			if(loc!=-1) 
			{ 
			return arrStr[i].replace(argname+"=","").replace("?",""); 
			break; 
			} 
			} 
			return ""; 
		}

		function copyToClipboard(txt) { 
			if(window.clipboardData) { 
			   window.clipboardData.clearData(); 
			   window.clipboardData.setData("Text", txt); 
			   alert("复制到剪贴板成功");
			} else if(navigator.userAgent.indexOf("Opera") != -1) { 
				window.location = txt; 
				alert("复制到剪贴板成功");
			} else if (window.netscape) { 
				try { 
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
				} catch (e) { 
					alert("您的浏览器安全限制您进行剪贴板操作"); 
				}
			} 
		}

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
			title: '润百颜－围住小公举', // 分享标题
			desc: '你围我，如果你围住我，我就让你嘿嘿嘿！（围住我，100％中大奖！）', // 分享描述
			link: "http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/index", // 分享链接
			imgUrl: 'http://weiphp.ekche.com/Show/Runbai/share.jpg', // 分享图标
			success: function() {
		
			}
		});
		wx.onMenuShareTimeline({
			title: '润百颜－围住小公举', // 分享标题
			link: 'http://www.cisigo.com/index.php?s=/addon/Runbai/Runbai/index', // 分享链接
			imgUrl: 'http://weiphp.ekche.com/Show/Runbai/share.jpg', // 分享图标
			success: function() {
			}
		});
  });
</script>
<!-- 微信end -->

<!-- 统计-->
<div style="display:none">
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1257026528'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s4.cnzz.com/z_stat.php%3Fid%3D1257026528' type='text/javascript'%3E%3C/script%3E"));</script>
</div>
<!-- 统计end -->

<audio id="bgm" src="resource/assets/sound/bgm.mp3" autoplay="autoplay" loop="loop"></audio>


</body>
</html>
