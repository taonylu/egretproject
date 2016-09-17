<!DOCTYPE HTML>
<html>
<head>
    <meta charset="utf-8">
    <title>百元店</title>
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
	
	<script src="http://cdn.slb.ekche.com/js/jweixin-1.0.0.js"> </script>

    <!--这个标签为通过egret提供的第三方库的方式生成的 javascript 文件。删除 modules_files 标签后，库文件加载列表将不会变化，请谨慎操作！-->
    <!--modules_files_start-->
    <script egret="lib" src="/byd/libs/modules/egret/egret.min.js"></script>
    <script egret="lib" src="/byd/libs/modules/egret/egret.web.min.js"></script>
    <script egret="lib" src="/byd/libs/modules/eui/eui.min.js"></script>
    <script egret="lib" src="/byd/libs/modules/res/res.min.js"></script>
    <script egret="lib" src="/byd/libs/modules/tween/tween.min.js"></script>
    <!--modules_files_end-->

    <!--这个标签为不通过egret提供的第三方库的方式使用的 javascript 文件，请将这些文件放在libs下，但不要放在modules下面。-->
    <!--other_libs_files_start-->
    <!--other_libs_files_end-->

    <!--这个标签会被替换为项目中所有的 javascript 文件。删除 game_files 标签后，项目文件加载列表将不会变化，请谨慎操作！-->
    <!--game_files_start-->
    <script src="/byd/main.min.js?ver=2.29"></script>
    <!--game_files_end-->
</head>
<body>

<div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
     data-entry-class="Main"
     data-orientation="portrait"
     data-scale-mode="fixedWidth"
     data-frame-rate="30"
     data-content-width="640"
     data-content-height="1140"
     data-show-paint-rect="false"
     data-multi-fingered="2"
     data-show-fps="false" data-show-log="false"
     data-log-filter="" data-show-fps-style="x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9">
</div>


<audio id="bgm" src="http://cdn.xb.ekche.com/byd/resource/assets/sound/bgm.mp3" autoplay="autoplay" loop="loop"></audio>
<!--
<audio id="get" src="/byd/resource/assets/sound/get.mp3" preload="auto"></audio>
-->

<script>
	
    var bgm = document.getElementById("bgm");
   

    window["soundPause"] = 1;

    function playBGM(){
		if(bgm.paused){
			window["soundPause"] = 1;
			bgm.play();
		}else{
			window["soundPause"] = 0;
			bgm.pause();
		} 
    }

	/*
    var get = document.getElementById("get");
    function playGet(){
        get.play();
    }*/

    egret.runEgret();


    window["url"] = "/byd/score";
    window["_csrf"] = "<?=Yii::$app->request->csrfToken?>";
    window["sign"] = "";
	window['shareText'] = "财运好不好，就看红包开多少！";

    var title='财运好不好，就看红包开多少！',
        desc= window['shareText'],
        link='<?=$js_sign['url']?>',
        imgUrl='http://cdn.xb.ekche.com/byd/resource/assets/icon.jpg';

    //分享成功后操作
    function shareSuccess(res){

    }

    wx.config({
        /*debug: true,*/
        appId: '<?= $js_sign['appId']; ?>',
        timestamp: <?= $js_sign['timestamp']; ?>,
        nonceStr: '<?= $js_sign['nonceStr']; ?>',
        signature: '<?= $js_sign['signature']; ?>',
        jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'hideMenuItems',
            'showMenuItems'
        ]
    });
	
	

	 wx.ready(wxshare);

	 function wxshare() {
			wx.hideMenuItems({ menuList: [

			]});

			//分享给朋友
			wx.onMenuShareAppMessage({
				title: title,
				desc:  window['shareText'],
				link: link,
				imgUrl: imgUrl,
				success: shareSuccess
			});

			//分享到朋友圈
			wx.onMenuShareTimeline({
				title: window['shareText'],
				desc:  window['shareText'],
				link: link,
				imgUrl: imgUrl,
				success: shareSuccess
			});

			//分享到QQ
			wx.onMenuShareQQ({
				title: title,
				desc:  window['shareText'],
				link: link,
				imgUrl: imgUrl,
				success: shareSuccess
			});
		}
	


	 
   

</script>


<div style="display:none">
<script type="text/javascript">var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cspan id='cnzz_stat_icon_1257414328'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s95.cnzz.com/z_stat.php%3Fid%3D1257414328' type='text/javascript'%3E%3C/script%3E"));</script>
</div>


</body>
</html>









