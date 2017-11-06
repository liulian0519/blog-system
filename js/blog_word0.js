window.onload= function(){
  search_click();
  
	search_change(); // 搜索框失去焦点获得焦点以及随着窗口变化样式变化的控制
	nav_caidan();    // 导航栏中超链接以及菜单栏样式的控制
	resize();        //窗口宽度变化的响应式控制
 
	xiahuaxian_move();   //超链接下方下划线的变化
	textarea_zishuxianzhi(); //评论表单评论框字数的限制
	
	var id = getid();
	input_ar_id(id);//在文本框中保存文章id
   search_click(); //点击搜索按钮的事件处理


  var a_id = getid();
 
  read_article(a_id);//刷新页面加载封面标题信息
  add_pinglun(a_id);         //添加评论信息
  

}
// search_click();
  

  
// 去掉字符串首尾空格
String.prototype.trim = function()
{
   
   return this.replace(/(^\s*)|(\s*$)/g, "");
}
$(document).ready(function(){
  $('#search_input').keydown(function(){

    if(event.keyCode==13){

          //如果搜索框内容为空，直接return
            if($('#search_input').val().trim()==''){
              return;
            }

      $.ajax({
        type:'post',
        url:'http://139.199.106.88:8080/blog_war/SearchServlet',
        dataType:'json', //返回的数据类型

        data:{search:$('#search_input').val()},
        success:function(e){
          var b =e.length;
//          alert(b);
          
          if(e.length>1){
            console.log(e);
              window.open("search.html?"+$('#search_input').val(),'_self')
          }else{
            window.open("search_null.html?"+$('#search_input').val(),'_self')
          }
        },
        error:function(e){
          // alert("失败");
          console.log(e);
        }
      });
    }

  
  });
  $('#search_input2').keydown(function(){
    if(event.keyCode==13){

       //如果搜索框内容为空，直接return
            if($('#search_input2').val().trim()==''){
              return;
            }

      $.ajax({
        type:'post',
        url:'http://139.199.106.88:8080/blog_war/SearchServlet',
        dataType:'json', //返回的数据类型

        data:{search:$('#search_input2').val()},
        success:function(e){
//          var b =e.length;
//          alert(b);
          if(e.length>1){
              window.open("search.html?"+$('#search_input2').val(),'_self')
          }else{
            window.open("search_null.html?"+$('#search_input2').val(),'_self')
          }
        },
        error:function(e){
          console.log(e);
          // alert("失败");
        }
      });
    }
      
  });
});


 //点击搜索之后的事件处理
function search_click(){//000
     document.getElementById('search_btn').onmousedown=function(){
//    alert("bjjb");
var c = $('#search_input').val()
var d =$('#search_input2').val()
//alert(c);
if(c!=''&&d==''){
    $.ajax({
        type:'post',
        url:'http://139.199.106.88:8080/blog_war/SearchServlet',
        dataType:'json', //返回的数据类型

        data:{search:c},
        
        success:function(e){
          console.log(c)
//          var b =e.length;
//          alert(b);
          if(e.length>1){
              window.open("search.html?"+c,'_self')
          }else{
            window.open("search_null.html?"+c,'_self')
          }
        },
        error:function(e){
          console.log(e);
          alert("失败");
        }
      });
    
    

}
if(c==''&&d!=''){
  $.ajax({
        type:'post',
        url:'http://139.199.106.88:8080/blog_war/SearchServlet',
        dataType:'json', //返回的数据类型

        data:{search:d},
        
        success:function(e){
          console.log(d)
//          var b =e.length;
//          alert(b);
          if(e.length>1){
              window.open("search.html?"+d,'_self')
          }else{
            window.open("search_null.html?"+d,'_self')
          }
        },
        error:function(e){
          console.log(e);
          // alert("失败");
        }
      });
}
       }
   }


//文章分享
function share(){
  var path = location.pathname;
  var title = document.getElementById('bowenbiaoti').innerHTML;
  
  var str1 = 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+path;
  var str2 = 'http://service.weibo.com/share/share.php?url='+path+'&title='+title;;
  document.getElementById('qqshare').href=str1;
  document.getElementById('wbshare').href=str2;

  //微信分享
  document.getElementById('wxshare').onclick = function(){
      var cc = document.getElementsByClassName('jiathis_txt jtico jtico_weixin')[0];
        cc.click();  
   }
}
//点击回复表单的按钮后添加回复信息
function add_huifu(a_id,p_id){
   
     document.getElementById('huifu_btn').onclick = function(){

       //如果评论区为空或只有空格，则直接return
     if($('#huifu_textarea').val().trim()==''){
            return ;
     }

       if(document.getElementById('huifu_btn').flag==1){

        
       // alert(a_id+' '+p_id);
       $.ajax({
      type:'get',
      url:'http://139.199.106.88:8080/blog_war/AddRpServlet',
      dataType:'text', //返回的数据类型  
            data:$.param({
                     messId:a_id,
                     commId:p_id,
                     name:$('#form_huifu_input1').val().trim(),
                     mail:$('#form_huifu_input2').val().trim(),
                     word:$('#huifu_textarea').val().trim(),
                     sendMail:$('input[name="sendMail"]:checked').val()
               }),
      success:function(response,status,xhr){
                console.log('----添加回复信息成功');
          console.log(response);
                
       
      },
      error:function(xhr,errorText,errorType){
        console.log('----添加回复信息失败');
        console.log(xhr);
      },
       async: false 
    });
     
     //添加回复信息后刷新评论信息和回复信息
       read_pinglun(a_id);
       read_huifu(a_id);   
   }

   }      
  
  
}



//刷新页面时加载头图信息
function read_article(a_id){
  //加载头图标题等信息
  
      $.ajax({
      type:'get',
      url:'http://139.199.106.88:8080/blog_war/MessDetailedServlet',
      dataType:'json', //返回的数据类型
        data:{
               id:a_id
        },
      success:function(response,status,xhr){
            read_zhengwen(a_id);//加载正文信息
            console.log('----加载文章标题头图信息成功');
            console.log(response);
           
         // read_pinglun(a);   //加载评论信息
       //把json字符串转换成对象
       // var obj = JSON.parse(response);
       var obj = response;
       console.log('----打印出json对象');
       console.log(obj);
        
      try{
                 // var obj = response;;width:100%;height:100%;
                 //页面渲染
                 document.getElementById('toutubiaoti').innerHTML='<div id="toutubiaoti_box" style=""><div id="bowenbiaoti">'+obj.title+'</div><div id="zuozheshijian" style=""><div id="bowen_zuozhe" style="display: inline;">'+obj.name+'</div><div id="bowen_shijian" style="display: inline;">'+obj.time+'</div></div><div id="shoucangdianzan"><img   src="images/view.png"><span id="view_count">'+obj.hits+'</span><img id="img_like" src="images/like.png"  onclick="ajax_like()" style="margin-left: 24px;"><span id="like_count" >'+obj.like+'</span></div></div>';
                 
                 document.getElementById('toutubiaoti').style.backgroundImage='url('+obj.url+')';
                
                 document.getElementById('img_like').flag='1';

                 share();

              }catch(e){
                 console.log(e);
              }



      },
      error:function(xhr,errorText,errorType){
         console.log('----加载文章信息失败');
        
        console.log(xhr);
      },
      async: true 
    });
   
  
   
   
   }
//页面刷新加载正文信息
function read_zhengwen(a_id){

  
 $.ajax({
      type:'get',
      url:'http://139.199.106.88:8080/blog_war/WordServlet',
      dataType:'html', //返回的数据类型
        data:{
               id:a_id
        },
      success:function(response,status,xhr){
         read_pinglun(a_id);//加载评论信息
            console.log('----加载正文信息成功');
            console.log(response);
           // alert('加载正文');

          document.getElementById('zhengwen').innerHTML=response;

      },
      error:function(xhr,errorText,errorType){
         console.log('----加载正文信息失败');
          // alert('加载正文失败');
         console.log(xhr);
      },
      async: true 
    });
 
  
}
//页面刷新加载评论信息
function read_pinglun(a_id){
         setTimeout(function(){
  $.ajax({
      type:'get',
      url:'http://139.199.106.88:8080/blog_war/ReadAllCommServlet',
      dataType:'text', //返回的数据类型
        data:$.param({id:a_id}),
      success:function(response,status,xhr){

           console.log('----加载评论信息成功');
           // alert('加载评论');
          //评论信息加载成功后加载回复信息
          read_huifu(a_id);
 
          var obj = JSON.parse(response);
          console.log(response);

             
               
                //添加留言板节点
          var node_liuyanbox = document.getElementById('liuyanban_box');
                node_liuyanbox.innerHTML='';//刷新评论信息之前把评论区清空


             for(var i = 0;i<obj.length;i++){
                if(obj[i].name==''){
                     obj[i].name='匿名用户';
                }
                //获取到评论信息的id值
                var p_id = obj[i].id;
                 //格式化评论日期
                var time = settime(obj[i].time,obj[i].rtime);
                //把文章id和评论id做为参数传给addnode函数
              addnode_liuyanban(node_liuyanbox,obj[i].name,obj[i].word,time,a_id,p_id);
            

             }
      },
      error:function(xhr,errorText,errorType){
        console.log('----加载评论信息失败');
        console.log(xhr);
         // alert('加载评论失败');
      },
      async: true 
    });
             
  },400);
     
 }

// 刷新页面时加载回复信息
function read_huifu(a){

  $.ajax({
      type:'get',
      url:'http://139.199.106.88:8080/blog_war/ReadAllRpServlet',
      dataType:'json', //返回的数据类型
      data:{messId:a},
      success:function(response,status,xhr){
                console.log('----加载回复信息成功');
                console.log(response);
          // alert('加载回复');
          
              //把页面上所有的huifu_box的dom对象存在数组arr中
              var arr = document.getElementsByClassName('huifu_box');
                 
             //遍历整个dom对象数组
       for(var i=0;i<arr.length;i++){
           console.log('---评论id---'+arr[i].id);
                     // 对于每个dom对象再遍历所有回复信息
                  for(var j=0;j<response.length;j++){
                         
                      // 找住每个评论id对应的所有回复信息,渲染对应评论下的所有回复
                      if(response[j].commId==arr[i].id){
                         console.log('回复信息:'+response[j].name+' '+response[j].word+' '+response[j].time);
                        //调用添加回复信息的函数，并传递相关参数
                        //格式化评论日期
                        var time = settime(response[j].time,response[j].rtime);
                         addnode_huifuban(arr[i],response[j].name,response[j].word,time,a,arr[i].id);


                      }


                     }
       }



      },
      error:function(xhr,errorText,errorType){
        console.log('----加载回复信息失败');
         // alert('加载回复失败');
        console.log(xhr);
      },
      async: true 
    });
     
}

 //格式化时间戳
function settime(time,rtime){
       //创建一个日期对象
       var obj_timenow = new Date();
       //现在的时间戳
       var now = obj_timenow.valueOf();

      //时间差并保留为整数
      var number_fenzhong = Math.ceil((now - time)/60000);
      var hour = Math.floor(number_fenzhong/60);
      var day = Math.floor(hour/24);

      //一分钟前发表00000
      if(number_fenzhong==1){
             // alert(rtime+' '+obj_timenow+' 刚刚发表');
             return '刚刚发表';
      }

      //一小时内发表显示分钟00000
      else if(number_fenzhong>1&&number_fenzhong<60){
             // alert(rtime+' '+obj_timenow+' '+number_fenzhong+'分钟前');
             return number_fenzhong+'分钟前';
      }

       //23小时内发表显示小时,大于等于60分钟，小于等于23小时00000
      else if(number_fenzhong>=60&&number_fenzhong<1440){
          
           // alert(rtime+' '+obj_timenow+' '+hour+'小时前');
           return hour+'小时前';
      }

       //24小时到48小时显示一天前
      else if(number_fenzhong>=1440&&number_fenzhong<2880){
          
           // alert(rtime+' '+obj_timenow+' 一天前');
           return '一天前';
      }
      //48小时到72小时显示两天前
      else if(number_fenzhong>=2880&&number_fenzhong<4320){
          
           // alert(rtime+' '+obj_timenow+' 两天前');
           return '两天前';
      }
       //大于72小时发表显示日期00000
      else if(number_fenzhong>=4320){
            // alert(rtime+' '+obj_timenow+' 大于三天发表');
       var obj_timebefore = new Date(time);
       var year_before = obj_timebefore.getFullYear(); //年
       var month_before = obj_timebefore.getMonth() + 1;         //月   
       var day_before = obj_timebefore.getDate();                //日
       var ymd = year_before+'-'+month_before+'-'+day_before;
       // alert(rtime+'***'+ymd);
          return ymd;
      }
}
 //添加留言板(评论)节点函数
 function addnode_liuyanban(node_liuyanbox,name,word,time,a_id,p_id){
       
       var str = '<div class="liuyanban" style="border:1px solid #5a5a5a;margin-top: 50px;"><div style="font-weight: bold;">'+name+'</div><p  style ="text-indent:1em" >'+word+'</p><span style="font-size: 14px">'+time+'</span><span style="font-size: 14px;margin-left: 30px" onclick="show_form_huifu(event,'+a_id+','+p_id+')">回复</span><div id="'+p_id+'" class="huifu_box" style="margin-left: 30px;"></div>';


            node_liuyanbox.insertAdjacentHTML('afterBegin',str);
       
       //把每个评论的id做为参数传给函数show_form_huifu，因为每个评论都有一个这样的事件处理程序，可以直接传参
       //同时把评论的id保存在huifu_boxdom对象的id属性中，方便渲染回复信息时使用   
        
  
   }
//添加回复板信息节点函数
function addnode_huifuban(node_huifubox,name,word,time,a_id,p_id){
  // alert(name);
     if(name==undefined||name==''){
      name = '匿名用户';
     }
     var str = '<div class="huifuban" style=""><div style="font-weight: bold;">'+name+'</div><p  style ="text-indent:1em" >'+word+'</p><span style="font-size: 14px">'+time+'</span><span style="font-size: 14px;margin-left: 30px" onclick="show_form_huifu(event,'+a_id+','+p_id+')">回复</span></div>'
     // alert(node_huifubox);
     node_huifubox.insertAdjacentHTML('beforeend',str);
}
   //点击评论按钮之后添加评论信息
 function add_pinglun(a){
  document.getElementById('pinglun_btn').onclick=function(){

     //点击之后禁用按钮
     document.getElementById('pinglun_btn').disabled = true;
    //如果评论区为空或只有空格，则直接return
     if($('#pinglun_input3').val().trim()==''){
            return ;
     }

    if(this.flag==1){
      // 发送Ajax请求
      
      
      
    $.ajax({
      type:'post',
      url:'http://139.199.106.88:8080/blog_war/AddCommServlet',
      dataType:'text', //返回的数据类型
        data:$.param({
                     id:a,
                     name:$('#pinglun_input1').val().trim(),
                     mail:$('#pinglun_input2').val().trim(),
                     word:$('#pinglun_input3').val().trim(),
                     flog:$('input[name="flog"]:checked').val()
               }),
      success:function(response,status,xhr){
              console.log('----添加评论信息成功');
              console.log(response);
       
             //访问读取评论接口重新渲染页面,还有回复接口
            
            read_pinglun(getid());
            read_huifu(getid())
      },
      error:function(xhr,errorText,errorType){
        // alert(errorType);
        console.log('----添加评论信息失败');
        console.log(xhr);
        
      },
      complete:function(){
        //请求结束后启用按钮
        document.getElementById('pinglun_btn').disabled = false;
      }
     });
       //添加评论成功后重置表单信息，恢复原有样式
        document.getElementById("form_pinglun").reset();
        document.getElementById('pinglun_btn').style.backgroundColor = '#5a5a5a';
        document.getElementById('pinglun_btn').flag=0;
        document.getElementById('textarea_zishu').innerHTML = '0/1000';
    }
  }

 }
 //刷新点赞信息
 function ajax_like(){
  if(document.getElementById('img_like').flag=='1'){
       var a = getid();
    $.ajax({
      type:'get',
      url:'http://139.199.106.88:8080/blog_war/LikeUpServlet',
      dataType:'text', //返回的数据类型
        data:$.param({id:a}),
      success:function(response,status,xhr){
                console.log('----读取点赞接口请求成功');
         
          console.log(response);

          //刷新关于点赞的数据
                document.getElementById('img_like').src='images/like2.png';
                document.getElementById('img_like').flag='0';
                document.getElementById('like_count').innerHTML= Number(document.getElementById('like_count').innerHTML)+1;
      },
      error:function(xhr,errorText,errorType){
        console.log('----读取评论接口请求失败');
        console.log(xhr);
      }
    });

  }
 }

 //点击评论的回复按钮后弹出添加回复的表单
 function show_form_huifu(event,a_id,p_id){

  

   // 如果span标签里的内容为回复，弹出回复表单
     if(event.currentTarget.innerHTML=='回复'){
            //如果页面上之前不存在回复表单，再弹出回复表单
          if(document.getElementById('form_huifu')==null){
             var str = '<form id="form_huifu"><input id="form_huifu_input1" name="name" type="text" placeholder=" 昵称"></input><input id="form_huifu_input2" name="name" type="text" placeholder=" 邮箱"></input><textarea id="huifu_textarea"  name="word"  style="resize: none;margin-bottom: 10px"></textarea><span style="font-size: 12px;color: #5a5a5a; line-height: 20px;">向我发送评论通知  是</span><input id="radio" type="radio" name="sendMail" value="1" style="margin:0;height:13px;"></input><span style="font-size: 12px;color: #5a5a5a; line-height: 15px;">否</span><input id="radio" type="radio" name="sendMail" checked="checked" value="2" style="margin:0;height:13px;"></input><input id="huifu_btn"  type="button" value="评论"></input><span id="textarea_zishu2" style="">0/1000</span></form>';
            event.currentTarget.insertAdjacentHTML('afterend',str);
            textarea_zishuxianzhi2(); //回复表单评论框字数的限制
           
            //执行添加回复信息的函数，并传参数文章id评论id事件源
            add_huifu(a_id,p_id);
            event.currentTarget.innerHTML='取消';
           }
        }

     //如果span标签里的内容为取消，收回回复表单
      else if(event.currentTarget.innerHTML=='取消'){
           var  form_huifu = document.getElementById('form_huifu');
            event.currentTarget.parentNode.removeChild(form_huifu); 
           event.currentTarget.innerHTML='回复';
          }



  
  
 }






//在文本框中保存文章id
function input_ar_id(a){

  document.getElementById('input_ar_id').value = a;
}

// 去掉字符串首尾空格
String.prototype.trim = function()
{
   
   return this.replace(/(^\s*)|(\s*$)/g, "");
}
// 搜索框失去焦点获得焦点以及随着窗口变化样式变化的控制
 function search_change(){
 	var search_input = document.getElementById('search_input');
	search_input.onfocus = function(){
		this.style.borderColor='#38aae1';
		
	}
	search_input.onblur = function(){
		this.style.borderColor='#5a5a5a';
		
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
	
		document.getElementById('nav_xiahuaxian2').style.display='none';

		document.getElementById('search_btn').style.display='';//0000000000000
	}
	search_input2.onblur = function(){
		this.style.borderColor='#5a5a5a';
		

		search_img.style.display='';
        search_input2.style.display='none';
        zhuzhan.style.display='';
        bokefenlei.style.display='';
        document.getElementById('nav_xiahuaxian2').style.display='none';
        
        document.getElementById('search_btn').style.display='none';//0000000000000
	}
 }
 // 导航栏中超链接以及菜单栏样式的控制
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
// 窗口事件监听  窗口宽度变化的响应式控制
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
 // 控制评论表单评论框中的字数
 function textarea_zishuxianzhi(){
     
      document.getElementById('pinglun_input3').onkeyup = function(){
      if(this.value.length>0&&this.value.length<=1000){
      	document.getElementById('pinglun_btn').style.backgroundColor = '#38aae1';
      	document.getElementById('pinglun_btn').flag=1;
      }
      else if(this.value.length==0||this.value.length>1000){
      	document.getElementById('pinglun_btn').style.backgroundColor = '#5a5a5a';
      	document.getElementById('pinglun_btn').flag=0;
      }
      
      document.getElementById('textarea_zishu').innerHTML = this.value.length+'/1000';
      	
      }
      
 }
// 控制回复表单评论框中的字数
 function textarea_zishuxianzhi2(){
     try{
     	 document.getElementById('huifu_textarea').onkeyup = function(){
      if(this.value.length>0&&this.value.length<=1000){
      	document.getElementById('huifu_btn').style.backgroundColor = '#38aae1';
      	document.getElementById('huifu_btn').flag=1;
      
      }
      else if(this.value.length==0||this.value.length>1000){
      	document.getElementById('huifu_btn').style.backgroundColor = '#5a5a5a';
      	document.getElementById('huifu_btn').flag=0;
     
      }
      
      document.getElementById('textarea_zishu2').innerHTML = this.value.length+'/1000';
      	
      }
     }
   catch(e){
     console.log(e);
   }  
      
 }

 // //点击搜索之后的事件处理
 // function search_click(){//000
 // 	 document.getElementById('search_btn').onmousedown=function(){

 // 	 	alert('0.0');
 // 	 }
 // }

//获取文章id值
function getid(){
	var str = window.location.search.slice(1);
	var id = Number(str);
	return id;
}
