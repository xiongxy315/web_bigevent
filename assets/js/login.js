$(function () {
  //1.因为登录和注册页面很相似，改变按钮，弹出对应的框就可以了
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide(); //登录页面隐藏
    $('.reg-box').show(); //注册页面显示
  })
  //点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show(); //登录页面显示
    $('.reg-box').hide(); //注册页面隐藏
  })


  //2.自定义校验规则（从layui中获取form对象
  //导入了layui脚本就有个layui
  var form = layui.form
  //通过form.verify()函数自定义校验规则
  form.verify({
    //自定义了一个叫做pwd的校验规则
    pwd: [
      /^[\S]{6,12}$/,
      '密码必须6到12位，且不能出现空格'
    ],
    username: [
      /^[a-zA-Z0-9_-]{3,16}$/,
      '用户名必须3-16位，不能包括除_-以外的特殊符号'
    ],
    //校验两次密码是否一致的规则
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      //还需要拿到密码框中的内容
      //然后进行一次等于的判断
      //如果判断失败，，则return一个提示消息即可
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }

    }

  });
  // 3.监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    //  阻止默认的提交行为
    e.preventDefault()
    //  发起Ajax的POST请求
    var data = $(this).serialize();
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 4.监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    // 阻止默认提交行为
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html';
      }
    })
  })
})