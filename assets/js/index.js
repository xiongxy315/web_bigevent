$(function () {
    getUserInfo(); //获取用户基本信息
    $('#btnLogout').on('click', esc); //实现退出功能
});
//1.获取用户的基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers: { //请求头，没有就给''
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message);
            };
            //调用renderAvatar渲染用户头像
            renderAvatar(res.data);
        },
  
    })
}
//2.渲染用户头像和名称
function renderAvatar(user) {
    //a.获取用户名
    let name = user.nickname || user.username; //逻辑中断
    // console.log(name);
    // b. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // c. 按需渲染用户的头像
    if (user.user_pic !== null) {
        //  渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        //  渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }

}

//3.实现退出功能
function esc() {
    let layer = layui.layer;
    layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        },
        function (index) {
            //清空loacl
            localStorage.removeItem('token');
            //进入登录页面
            location.href = '/login.html'
            //关闭confirm询问框
            layer.close(index)
        }
    )
}