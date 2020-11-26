// // 开发环境服务地址
 var baseURL="http://ajax.frontend.itheima.net"
// // 测试环境服务地址
// // var basurl="http://ajax.frontend.itheima.net"
// // 生产环境服务地址
 var baseurl="http://ajax.frontend.itheima.net"
 $.ajaxPrefilter(function(params){
   params.url=baseURL+params.url
 })
 if(params.url.typeof!==-1){
  params.headers={
    Authorization:localStorage.token
  }
 }
 params.complete=function(res){
   console.log(res.responseJSON);
   var obj=res.responseJSON
   if(obj.status==1&&obj.message=="身份认证失败!"){
     localStorage.setItem("token")
     location.href="/login.html"
   }

 }