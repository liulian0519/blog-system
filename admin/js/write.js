window.onload=function(){
 if(getCookie('flag')!='true'){
             document.write('404');
           }

    CKEDITOR.replace('word');
    setTimeout("textarea_height_change()",1000);
  
    control_img_btn();
ar_type_menu_change();
 form_change();
img_send();
checkform();

}

function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg))
return unescape(arr[2]);
else
return null;
}
//提交表单之前进行检查
function checkform(){
     document.getElementById('btn_sub').onclick = function(){
         var arr = $('#form').serializeArray();
         console.log(arr);

         if (arr[0].value==''||arr[1].value==''||arr[2].value==''||arr[3].value==''||arr[4].value==''||arr[5].value=='') {
          alert('信息不完整');
          return false;
         }
         else{
          // alert('1');
         }
         
          
     }
}
//上传头图的数据请求
function img_send(){
	document.getElementById('btn_img').onclick = function(){
	 	var path = document.getElementById('tupian').value;
	 	//如果没有选择文件，直接return
	 	if(path==''){
	 		return;
	 	}
	 	//若文件是图片 上传文件
	 	if (isimg(path)==1) {
	 		  var formData = new FormData($( "#form" )[0]); 
        console.log(formData);
       $.ajax({
	 		  type:'post',
	 		  url:'http://139.199.106.88:8080/blog_war/HeadPicServlet',
	 		  dataType:'json', //返回的数据类型
	 	      data:formData,
	 	      async: false,  
              cache: false,  
              contentType: false,  
              processData: false,
        beforeSend : function(){
      //添加正在加载效果
     document.getElementById('btn_img_after').innerHTML = '&nbsp;<img style="width:100px;height:10px;" src="images/loading2.gif">';
     
        },      
	 		  success:function(response,status,xhr){
	 			   console.log("---头图上传成功---");
	 			   console.log(response);
          document.getElementById('btn_img_after').innerHTML = '上传成功:'+response.url;
          //把远程地址传给文本框，随着表单提交给后台
          document.getElementById('picurl').value= response.url;
	 		   },
	 		  error:function(xhr,errorText,errorType){
	 		  	   console.log("---头图上传失败---");
	 			     console.log(xhr);
	 			   
	 		}
	 	});

  
	  
	 	}
      else if(isimg(path)==0){
      	document.getElementById('btn_img_after').innerHTML = '上传失败:文件格式不正确';
        //把图片文本框的值清除
          document.getElementById('picurl').value='';
      }
   }

}

//文章类型菜单样式
function ar_type_menu_change(){
	var menu = document.getElementById('ar_type_menu');
	document.getElementById('article_type_head').onclick = function(){
		
		if(menu.style.display=='none'){
             menu.style.display='';
		}
		else if(menu.style.display==''){
			 menu.style.display='none';
		}
	}

	var array = document.getElementsByClassName('article_type_span');
	for(let i = 0;i<array.length;i++){
		array[i].onclick = function(){
			document.getElementById('article_type_head').childNodes[0].nodeValue = this.innerHTML;
            //每次选择文章类型给type文本框重新赋值
            document.getElementById('input_type').value = this.innerHTML;
			menu.style.display='none';
		}
	}

}

function textarea_height_change(){
	document.getElementById('cke_1_contents').style.height='300px';
}
//正则表达式验证邮箱
function MY_mail_test(str)
           {
             
             //对电子邮件的验证
             var box = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
             if(box.test(str))
             {
                  
                 return true;
            }
            else{
            	 return false;
            }
         }
//上传图片按钮样式控制
function control_img_btn(){
	var file = document.getElementById('tupian').files[0]
	document.getElementById('fileBtn').onclick = function(){
		document.getElementById('tupian').click();
	
	}
	//显示文件其路径
	document.getElementById('tupian').onchange = function(){
		 var path =	document.getElementById('tupian').value;
         document.getElementById('fileBtn').innerHTML = path;
		
	   
	    }

	}
	
       
    

//验证图片格式的正则表达式
function isimg(path){
   if(path==''){
   	   return 0;
   }

   var box1 = /^.*\.gif$/g; 
   var box2 = /^.*\.jpg$/g; 
   var box3 = /^.*\.png$/g; 
   var box4 = /^.*\.jpeg$/g; 
   var box5 = /^.*\.bmp$/g; 
   if(box1.test(path)||box2.test(path)||box3.test(path)||box4.test(path)||box5.test(path)){
   	return 1;
   }
   else{
   	return 0;
   }
   
}
//表单验证
function form_change(){
   var name = document.getElementById('input_name');
   var mail = document.getElementById('input_mail');
   var title = document.getElementById('input_title');
   var type = document.getElementById('input_type');
   name.onblur= function(){
     if (name.value.trim()=='') {
     	 document.getElementById('name_after').innerHTML=' 昵称不能为空';
     }
     else{
          
     document.getElementById('name_after').innerHTML='';
          }
     }
   mail.onblur= function(){
    if(mail.value.trim()=='') {
     	 document.getElementById('mail_after').innerHTML=' 邮箱不能为空';
     }
     else{
     	if(MY_mail_test(mail.value)){
     		document.getElementById('mail_after').innerHTML='';
     	}
         else{
          this.value = '';
         	document.getElementById('mail_after').innerHTML=' 邮箱格式不正确';
         } 
     
          }
     
   }
   title.onblur= function(){
    if(title.value.trim()=='') {
     	 document.getElementById('title_after').innerHTML=' 标题不能为空';
     }
     else{
          
     document.getElementById('title_after').innerHTML='';
          }
     
   }
}