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
//	 				alert(b);
					
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
//	 				var b =e.length;
//	 				alert(b);
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
// 	 	alert("bjjb");
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
//	 				var b =e.length;
//	 				alert(b);
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
//	 				var b =e.length;
//	 				alert(b);
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
