    var form = layui.form
    $(function () {

        form.verify({
            nickname: function (value) {
                if (value.length > 6) {
                    return '昵称长度必须在 1 ~ 6 个字符之间！'
                }
            }
        })
        initUserInfo(); //获取信息
        $('#btnReset').on('click', rest); //重置表单数据
        $('.layui-form').on('submit', replace); //监听表单，更新用户信息
    })

    //1.获取用户的基本信息
    function initUserInfo() {
        $.get('/my/userinfo', function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            //1.用form.val()快速为表单赋值(是layui里面的)
            form.val('formUserInfo', res.data)
        })

    }
    //2.重置效果
    function rest(e) {
        // console.log(e);
        //阻止表单默认行为
        e.preventDefault();
        //再次获取用户的基本信息
        initUserInfo();


    }
    //3.发起请求更新用户信息
    function replace(e) {
        e.preventDefault(); //阻止表单默认提交事件 
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg('更新用户信息成功');
                //更新完毕重新调用父页面的方法，渲染用户头像和用户信息
                window.parent.getUserInfo()
            }
        })
    }