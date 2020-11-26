$(function () {
    getUserinfo()
    $("#logout").on("click", function () {
        layer.confirm('确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something

            layer.close(index);
            localStorage.setItem("token")||""
            location.href="/login.html"
            layer.close(index)
        });
    })
})

function getUserinfo() {
    $.ajax({
        url: "/my/userinfo",
        headers: {
            Authorization: localStorage.token
        },
        success: function (res) {
            console.log(res);
        }
    })
}

function renderAvatar() {
    var name = user.nickname || user.username
    $("#welcome").html("欢迎&nbsp&nbsp", name)
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    }
}
parsm