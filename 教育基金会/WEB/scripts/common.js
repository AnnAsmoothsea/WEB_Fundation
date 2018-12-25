function json_get_vote_data(game_id){
	$.ajax({
 		type: "GET",
 		url: "/ajax_get/get_vote_data.php",
 		dataType: "json" ,
 		data:   "game_id="+game_id+"&"+Math.random(),
 		success: set_vote_view
	});
}

function set_vote(game_id,type){
	$.ajax({
 		type: "GET",
 		url: "/ajax_get/set_vote_data.php",
 		dataType: "json" ,
 		data:   "game_id="+game_id+"&type="+type+"&"+Math.random(),
 		success: set_vote_submit
	});
}

function set_vote_submit(data_arr){
	if(1==data_arr['is_error']){
		alert('对不起，不能重复提交');
		return;
	}
	if(2==data_arr['is_error']){
		alert('必须登录');
		return;
	}
	set_vote_view(data_arr);	
	if(0==data_arr['is_error']){
		alert('投票成功');
		return;
	}
}

function set_vote_view(data_arr){
	//取得投票的总数及投票比例
	var total_num = parseInt(data_arr['good_num'])+parseInt(data_arr['normal_num'])+parseInt(data_arr['bad_num']);
	var per_good,per_normal,per_bad;
	if(data_arr['good_num']>0 ){
		per_good= parseInt(Math.round(data_arr['good_num']*100)/total_num*100)/100;
	} else {
		per_good = 0;
	}
	if(data_arr['normal_num']>0 ){
		per_normal= parseInt(Math.round(data_arr['normal_num']*100)/total_num*100)/100;
	} else {
		per_normal = 0;
	}
	if(data_arr['bad_num']>0 ){
		per_bad= parseInt(Math.round(data_arr['bad_num']*100)/total_num*100)/100;
	} else {
		per_bad = 0;
	}
	
	$('#vote_good > .Al_41').html('<b>'+data_arr['good_num']+'</b><br />('+per_good+'%)');
	$('#vote_normal > .Al_41').html('<b>'+data_arr['normal_num']+'</b><br />('+per_normal+'%)');
	$('#vote_bad > .Al_41').html('<b>'+data_arr['bad_num']+'</b><br />('+per_bad+'%)');
	
	$('#vote_good .Al_43').css({ height: (100-per_good)+'%'}); 
	$('#vote_normal .Al_43').css({ height: (100-per_normal)+'%'}); 
	$('#vote_bad .Al_43').css({ height: (100-per_bad)+'%'}); 

	$('.Al_1 > .Al_5 > b').html(total_num);
	
	//另外一个区块的显示
	var max_num = sort_number(per_good,per_normal,per_bad);
	var type;
	var type_str;
	if(per_good==max_num){
		type=1;type_str="好玩";
	}
	if(per_normal==max_num){
		type=2;type_str="一般";
	}
	if(per_bad==max_num){
		type=3;type_str="不好玩";
	}	
	
	//$('.Ar_12 > .Ar_122').html('<img src="http://youxi.zol.com.cn/images/vote'+type+'.gif" /><br />'+type_str);
	$('.Ar_12 > .Ar_122').html('<img src="http://youxi.zol.com.cn/images/vote1.gif" /><br />'+type_str);
	$('.Ar_12 > .Ar_123').html('在<b>'+total_num+'</b>个玩家<br />中，有<b>'+max_num+'%</b>的玩家认为这是一个<b>'+type_str+'</b>的游戏。');
	$('.E_11 > .Ar_122').html('<img src="http://youxi.zol.com.cn/images/vote1.gif" /><br />'+type_str);
	$('.E_14').html('在 <b>'+total_num+'</b> 个玩家中，有 <b class="hong12">'+max_num+'</b> 的玩家认为这是一个 <b>'+type_str+'</b> 的游戏。');
}

function sort_number(a,b,c){
	var sortArray = new Array();
	sortArray[0] = a;
	sortArray[1] = b;
	sortArray[2] = c;
	var tArray = sortArray.sort(function(a,b){return a-b;});
	return tArray[2];
}

//cookie functions
function readCookie(name){
  var cookieValue = '';
  var search = name + '=';
  if(document.cookie.length > 0)
  { 
    offset = document.cookie.indexOf(search);
    if (offset != -1)
    { 
      offset += search.length;
      end = document.cookie.indexOf(';', offset);
      if (end == -1) end = document.cookie.length;
      cookieValue = unescape(document.cookie.substring(offset, end))
    }
  }
  return cookieValue;
}

function writeCookie(name, value, hours){
  var expire = '';
  if(hours != null){
    expire = new Date((new Date()).getTime() + hours * 3600000);
    expire = '; expires=' + expire.toGMTString();
  }
  document.cookie = name + '=' + escape(value) + expire;
}

function showlayer(layer_name){
	var hidden_layer = document.getElementById(layer_name);
	hidden_layer.style.display = hidden_layer.style.display==''?'none':'';
}

function get_cookie(varname){
	var tmp_ary = new Array();
	if (varname){
	a = document.cookie.indexOf(varname+"=");
		if (a != -1){
		b = document.cookie.substring((a+varname.length+1),document.cookie.length);
		c = b.split(";");
		d = c[0];
		return d;
		}else{
		return "";
		}
	}
}

//创建对象
function create_obj(){
    var http_request = false;

    //开始初始化XMLHttpRequest对象
    if(window.XMLHttpRequest) { //Mozilla 浏览器
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {//设置MiME类别
            http_request.overrideMimeType("text/xml");
        }
    }
    else if (window.ActiveXObject) { // IE浏览器
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) { // 异常，创建对象实例失败
        return false;
    }

    return http_request;
}

function send_request_vote(http_request,url,postStr,refrh) {
    // 确定发送请求的方式和URL以及是否同步执行下段代码
	var d = new Date();
	url += '&ord='+d.getTime();
	try{
		http_request.onreadystatechange = function(){
			//alert(http_request.readyState);
			if (http_request.readyState == 4) {									
				if (http_request.status == 200) {	
					document.getElementById('start').style.display='none';				
					document.getElementById("after_vote").innerHTML = http_request.responseText;
					/*var pl=http_request.responseText.substring(0,2);
					if(pl=='no'){
						alert('请你1小时之后在进行下一次投票');	
					}else{
						alert('投票成功，感谢参与!');	
					}*/
					document.getElementById('after_vote').style.display='block';	
					
					
					//alert(http_request.responseText);					
					if (refrh == 1)
					   window.location.reload();
				  }else {
					alert("There was a problem with the request.");
				}
			}
		}
	    http_request.open("POST", url, true);
	    http_request.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	    http_request.send(postStr);
	} catch(e){}	
}


function vote_diffrent(id,type){
	/*userid=get_cookie("zol_userid");
	if(userid==''){
		alert("想点评是需要登陆的哟!")
		return;	
	}*/
	var postStr = 'id='+id+'&type='+type;
	vote_http_obj = create_obj(); 
	send_request_vote(vote_http_obj,"/ajax_get/dianping.php?",postStr);  	
	alert("投票成功，感谢参与!");
}

function vote_diffrent1(id,type){
	var postStr = 'id='+id+'&type='+type;
	vote_http_obj = create_obj(); 
	send_request_vote(vote_http_obj,"/ajax_get/detail_dianping.php?",postStr);  	
	alert("投票成功，感谢参与!");
}

function upload(){
	  window.open ('http://v1.zol.com.cn/upload/upload_mv.php') ;
}

function upload_bizhi(){
	  window.open ('http://img9.zol.com.cn/desk_pic/upload.php') ;
}

function addFavorite(game_url,id)
{ 
	 var postStr = '/'+game_url+'/index'+id+'.html';
	 alert(postStr)
   if (document.all) 
   { 
      window.external.addFavorite('postStr','zol游戏库'); 
   } 
   else if (window.sidebar) 
   { 
      window.sidebar.addPanel('zol游戏库', 'http://youxi.zol.com.cn/', ""); 
   } 
   return false;
}

	//改变简介的显示长度
function changDigestShow(id) {
    document.getElementById(id).style.display = (document.getElementById(id).style.display == 'none')?'':'none';
    document.getElementById(id+'_c').style.display = (document.getElementById(id).style.display == 'none')?'':'none';
}

function copyToClipBoard(){
        var clipBoardContent="";
        clipBoardContent+=document.title;
        clipBoardContent+="\n";
        clipBoardContent+=this.location.href;
        if (window.clipboardData){
        	window.clipboardData.setData("Text",clipBoardContent);
        }else{
        	var flashcopier = 'flashcopier';
			if(!document.getElementById(flashcopier)) {
			var divholder = document.createElement('div');
			divholder.id = flashcopier;
			document.body.appendChild(divholder);
			}
			document.getElementById(flashcopier).innerHTML = '';
			var divinfo = '<embed src="http://v.xgo.com.cn/_clipboard.swf" FlashVars="clipboard='+clipBoardContent+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
			document.getElementById(flashcopier).innerHTML = divinfo;
       }    
       alert("复制成功，请粘贴到你的QQ/MSN上推荐给你的好友");
}

	function runstar(ab,time,flag){
		if (1 == flag){runx=setInterval("run("+ab+")",10)}
		else{runx=setInterval("run2("+ab+")",10)}
	
	}
	function runover(){
	clearInterval(runx)
	}
	function run(ab){
		scrollx=frm_frdlist.document.body.scrollLeft
		scrolly=frm_frdlist.document.body.scrollTop
		scrollx=scrollx+ab
		frm_frdlist.window.scroll(scrollx,scrolly)
	}
	function run2(ab){
		scrollx=frm_piclist.document.body.scrollLeft
		scrolly=frm_piclist.document.body.scrollTop
		scrollx=scrollx+ab
		frm_piclist.window.scroll(scrollx,scrolly)
	}