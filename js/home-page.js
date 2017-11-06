window.onload= function(){
	search_click();
	search_change();
	nav_caidan();
	resize();
	// share();
	// pinglun_input_change();
	xiahuaxian_move();
	
 btn_change();
 search_click();

   
}
function change1(){
	var btn=document.getElementById('but');
	btn.style.borderColor='#38aae1';
	btn.style.color='#38aae1';
}
function change2(){
	var btn=document.getElementById('but');
	btn.style.borderColor='';
	btn.style.color='';
}
function btn_change(){
	var btn=document.getElementById('but');
	btn.onfocus=function(){
		this.style.borderColor='#38aae1';
		
	}


}

 function search_change(){
 	var search_input = document.getElementById('search_input');
	search_input.onfocus = function(){
		this.style.borderColor='#38aae1';
//		this.value='111'

	}
	search_input.onblur = function(){
		this.style.borderColor='#5a5a5a';
//		this.value='搜索222';
	}

	var search_img = document.getElementById('search_img');
	var search_input2 = document.getElementById('search_input2');
	var zhuzhan = document.getElementById('zhuzhan');
	var bokefenlei = document.getElementById('bokefenlei');
	// 点击搜索图标时让图标隐藏并让搜索框显示且自动获取焦点
	search_img.onclick = function(){
		search_img.style.display='none';
        search_input2.style.display='block';
        zhuzhan.style.display='none';
        bokefenlei.style.display='none';
        search_input2.focus();
	}

    search_input2.onfocus = function(){
		this.style.borderColor='#38aae1';
//		this.value=''
		document.getElementById('nav_xiahuaxian2').style.display='none';
		document.getElementById('search_btn').style.display='';
	}
	search_input2.onblur = function(){
		this.style.borderColor='#5a5a5a';
//		this.value='搜索';

		search_img.style.display='';
        search_input2.style.display='none';
        zhuzhan.style.display='';
        bokefenlei.style.display='';
        document.getElementById('nav_xiahuaxian2').style.display='none';
        document.getElementById('search_btn').style.display='none';
	}
 }
 function nav_caidan(){
 	var jishu = document.getElementById('jishu');
 	var jishu_caidan = document.getElementById('jishu_caidan');
 	var nav_xiahuaxian = document.getElementById('nav_xiahuaxian');
 	jishu.onmouseover= function(){
 		jishu_caidan.style.display='block';
 		nav_xiahuaxian.style.display='none';
 	}
 	jishu.onmouseleave = function(){
 		jishu_caidan.style.display='none';
 	}
 	jishu_caidan.onmouseover= function(){
 		jishu_caidan.style.display='block';
 	}
 	jishu_caidan.onmouseleave = function(){
 		jishu_caidan.style.display='none';
 	}

 	var bokefenlei = document.getElementById('bokefenlei');
 	var felei_caidan = document.getElementById('fenlei_caidan');
 	bokefenlei.onmouseover= function(){
 		fenlei_caidan.style.display='block';
 		// document.getElementById('nav_xiahuaxian2').style.display='none';
 	}
 	bokefenlei.onmouseleave = function(){
 		fenlei_caidan.style.display='none';
 		// document.getElementById('nav_xiahuaxian2').style.display='block';
 	}
 	fenlei_caidan.onmouseover= function(){
 		fenlei_caidan.style.display='block';
 	}
 	fenlei_caidan.onmouseleave = function(){
 		fenlei_caidan.style.display='none';
 	}
 }
// 窗口事件监听
 function resize(){
 	var search_input2 = document.getElementById('search_input2');

   if(window.outerWidth<1296){//00000000
   	document.getElementById('search_btn').style.display='none';//00
   	document.getElementById('search_btn').style.right='30px';//00
   	document.getElementById('search_btn').style.top='35px';//00
   } else if(window.outerWidth>1296){
   	document.getElementById('search_btn').style.display='';//0000000000000
    document.getElementById('search_btn').style.right='110px';//0000000000000
    document.getElementById('search_btn').style.top='30px';//00
   }
    
 	window.onresize= function(){
 	    xiahuaxian_move();
 		if(window.outerWidth<1296){
 		 
        document.getElementById('search_btn').style.display='none';//0000000000000
        document.getElementById('search_btn').style.right='30px';//0000000000000
        document.getElementById('search_btn').style.top='35px';//00
 }
      else if(window.outerWidth>1296){
         document.getElementById('search_input2').style.display='none';

        
    document.getElementById('search_btn').style.display='';//0000000000000
    document.getElementById('search_btn').style.right='110px';//0000000000000
    document.getElementById('search_btn').style.top='30px';//00
 }
 	}
	
 	}

 // 超链下方的下滑线动态样式控制
 function xiahuaxian_move(){
 	if(window.outerWidth<1296){
 		document.getElementById('zhuzhan').onmouseover = function(){
 		
 		 document.getElementById('nav_xiahuaxian2').style.display='block';
 	 }
 	    document.getElementById('zhuzhan').onmouseleave = function(){
 		
 		document.getElementById('nav_xiahuaxian2').style.display='none';
 	 }
 	}
 	if(window.outerWidth>1296){
 		var nav_xiahuaxian = document.getElementById('nav_xiahuaxian');
 	var zhuzhan = document.getElementById('zhuzhan');
 	var jishu = document.getElementById('jishu');
 	var chanpinsheji = document.getElementById('chanpinsheji');
 	var chanpinyunying = document.getElementById('chanpinyunying');
 	var tuanduixiangguan = document.getElementById('tuanduixiangguan');

 	zhuzhan.onmouseover = function(){
 		nav_xiahuaxian.style.right='884px';
 		nav_xiahuaxian.style.width='32px';
 		nav_xiahuaxian.style.display='block';
 		// document.getElementById('nav_xiahuaxian2').style.display='block';
 	}
 	zhuzhan.onmouseleave = function(){
 		
 		nav_xiahuaxian.style.display='none';
 	}
 	// jishu.onmouseover = function(){
 	// 	nav_xiahuaxian.style.right='788px';
 	// 	nav_xiahuaxian.style.width='32px';
 	// }
 	chanpinsheji.onmouseover = function(){
 		nav_xiahuaxian.style.right='660px';
 		nav_xiahuaxian.style.width='64px';
 		nav_xiahuaxian.style.display='block';
 	}
 	chanpinsheji.onmouseleave = function(){
 		
 		nav_xiahuaxian.style.display='none';
 	}
 	chanpinyunying.onmouseover = function(){
 		nav_xiahuaxian.style.right='534px';
 		nav_xiahuaxian.style.width='64px';
 		nav_xiahuaxian.style.display='block';
 	}
 	chanpinyunying.onmouseleave = function(){
 		
 		nav_xiahuaxian.style.display='none';
 	}
 	tuanduixiangguan.onmouseover = function(){
 		nav_xiahuaxian.style.right='405px';
 		nav_xiahuaxian.style.width='64px';
 		nav_xiahuaxian.style.display='block';
 	}
 	tuanduixiangguan.onmouseleave = function(){
 		
 		nav_xiahuaxian.style.display='none';
 	}
 	}
 	
 }
		//加载更多的实现   一次加载16个  当最后数据少于16时 取消加载更多按钮
$(function(){
	var count=0;
	var pagestart=0;
	var pagesize=16;
	getdata(pagestart,pagesize);  //主要实现函数
				
	$(document).on('click','.btn',function(){
		count++;
		pagestart=count*12;
		getdata(pagestart,pagesize);
	});
});
			
function getdata(offset,size){
	$.ajax({
		type:"post",
		url:"http://139.199.106.88:8080/blog_war/ReadAllMessServlet",
		datatype:"json",
		success:function(e){
			var b= e.length;
			console.log(e);
			/*当所剩数据不足一次加载所需数据时。。。*/
			if(b-offset<size){
				size=b-offset;
			}
			var a = new Array();
			for(var i=0;i<(offset+size);i++){
		
				a [i]= e[i];
							
			}
			/*填充页面*/
			var c={result:a}
			//				console.log(c);
			var html = template('arttep', c);
			$("#tet").html(html);
	
			/*当没有数据可加载时，隐藏按钮*/
				
			if((offset+size)>=b){
				$(".btn").hide();
			}else{
				$(".btn").show();
			}
		},
		error:function(e){
			// alert("失败！");
			console.log('加载失败');
			console.log(e);
		}
	});
};
			
