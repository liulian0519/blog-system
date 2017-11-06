window.onload = function(){
    //如果cookie不存在说明用户没有登陆，禁止访问此页面
      if(getCookie('flag')!='true'){
                   document.write('404...');
            }

   readall();
}

function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}

//获取所有博客并渲染出来
function readall(){
     $.ajax({
	 		type:'get',
	 		url:'http://139.199.106.88:8080/blog_war/ReadAllMessServlet ',
	 		dataType:'json', //返回的数据类型	
	 		success:function(response,status,xhr){
                console.log('----获取所有博客信息成功');
	 		    console.log(response);

               //渲染所有博客
	 		    for (var i = 0; i < response.length; i++) {
	 		    	if(response[i].title==undefined||response[i].title==''){
	 		    		response[i].title=null;
	 		    	}
	 		    	addnode(i+1,response[i].id,response[i].title,response[i].name,response[i].time);
	 		    }
	 		  
	 		},
	 		error:function(xhr,errorText,errorType){
	 			console.log('----获取所有博客信息失败');
	 			console.log(xhr);
	 		},
	 		async: false 
	 	});
}
//添加博客节点
function addnode(i,id,title,name,time){
	var str = `<div class="box_tr">
   	      <span style="width:100px;">${i}</span>
   	      <span style="width:100px;">${id}</span>
   	      <span style="width:250px;">${title}</span>
   	      <span style="width:250px;">${name}</span>
   	      <span style="width:250px;">${time}</span>
   	      <a onclick="del(${id})" >删除</a>
   	   </div>`;
	document.getElementById('box').insertAdjacentHTML('beforeend', str);
}
//根据文章id删除博客
function del(id){
	 
	 $.ajax({
	 		type:'get',
	 		url:'http://139.199.106.88:8080/blog_war/DeleteMessServlet',
	 		dataType:'text', //返回的数据类型	
	 		data:{id:id},
	 		success:function(response,status,xhr){
                console.log('----删除博客成功');
	 		    console.log(response);
	 		    alert('id为'+id+'的博客被成功删除');
	 		    location.reload();
	 		},
	 		error:function(xhr,errorText,errorType){
	 			console.log('----删除博客失败');
	 			console.log(xhr);
	 			// alert('删除博客失败');
	 		},
	 		async: false 
	 	});
	
}