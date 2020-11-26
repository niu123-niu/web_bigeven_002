$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1-6之间"
            }
        }
    })
    getUserinfo()

    function getUserinfo() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.msg("获取用户信息失败")
                }
                // console.log("失败");
                // 成功后渲染
                form.val("formUserinfo", res.data)
            }
        })
    }
})
$("#btnReset").on("click", function (e) {
    e.preventDefault()
    getUserinfo()
})
$("layui-form").on("submit",function(e){
    e.preventDefault()
    $.ajax({
        method:"POST",
        url:"/my/userinfo",
        success:function(res){
            if(res.status!==0){
                return layui.msg("用户信息请求失败")
            }
            layui.msg("请求成功")
            window.parent.getUserinfo()

        }
    })
})