$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd:function(value){
            if(value===$("[name=oldPwd]").val()){
                return "原密码和旧密码不能相同"
            }
        },
        rePwd:function(value){
            if(value!==$("[name=oldPwd]").val()){
                return "两次输入密码不一致"
            }
        }
    });  
})
$(".layui-form").on("submit",function(e){
    e.preventDefault()
    $.ajax({
        method:"POST",
        url:"/my/userinfo",
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layui.msg(res.message)
            }
            layui.msg("修改密码成功")
            $(".lay-form")[0].reset()
        }
    })
})