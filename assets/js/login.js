$(function () {
    $("#link_reg").on("click", function () {
      $('.login-box').hide()
      $('.reg-box').show()
    })
    $("#link_login").on("click", function () {
      $('.login-box').show()
      $('.reg-box').hide()
    })
  
    //2自定义验证规则
    var form = layui.form
    form.verify({
      pwd: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
      ],
      repwd: function (value) {
        var pwd = $(".reg-box input[name=password]").val()
        if (value !== pwd) {
          return "两次输入的密码不一致"
        }
      }
    })
  
    //4注册功能
    var layer = layui.layer
    $("#form_reg").on('submit', function (e) {
      e.preventDefault()
  
      $.ajax({
        method: 'POST',
        url: '/api/reguser',
        data: {
          username: $('.reg-box [name=username]').val(),
          password: $('.reg-box [name=password]').val(),
        },
        success: function (res) {
          if (res.status != 0) {
            return layer.msg('res.message', {
              icon: 5
            })
          }
          layer.msg('恭喜您，注册成功，请登录', {
            icon: 6
          })
  
          //跳转登录
          $('#link_login').click()
          //清空注册信息
          $('#form_reg')[0].reset()
        }
      })
  
    })
    //5登录功能
    $('#form_login').on('submit', function (e) {
      e.preventDefault()
      $.ajax({
        method: 'POST',
        url: '/api/login',
        data: $(this).serialize(),
        success: function (res) {
          if (res.status != 0) {
            return layer.msg('res.message')
          }
          layer.msg('恭喜您，登陆成功')
          localStorage.setItem('token',res.token)
          //跳转
          location.href='/index.html'
        }
      })
    })
  })
  