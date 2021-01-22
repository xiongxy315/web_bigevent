$(function () {
    var form = layui.form;
    //layui验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function (value) {
            // console.log(value);
            if (value === $('[name=oldPwd]').val()) {
                return '新旧密码不能相同！'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致！'
            }
        }
    });
    //1.发起重置密码的请求
    $('.layui-form').on('submit', resetpwd)

})

//发起重置密码请求的函数
let num = 3; //计数器
function resetpwd(e) {
    e.preventDefault(); //阻止表单默认事件
    $.ajax({
        type: 'POST',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);

            //三次原密码输入错误直接强制跳转到登录
            if (res.status == 1 || res.message == '身份认证失败！') {
                num--;
                layui.layer.msg(`${ res.message }还剩${num}次机会`);
                if (num == 0) {
                    localStorage.removeItem('token'); //强制清空token
                    window.parent.location.href = '../login.html'; //强制跳转到登录页面
                    num = null;
                }
                return false;
            }

            //其它错误
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }

            layui.layer.msg('更新密码成功！')
            //重置表单
            $('.layui-form')[0].reset();
        }
    })
}

