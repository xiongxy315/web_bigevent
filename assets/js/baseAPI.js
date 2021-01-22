//每次调用ajax请求时，会先调用这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options); //可以拿到我点击的任意按钮请求的所有信息
    //拼接上根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //注意这个文件的引入要在jq之后我们的js之前

    //2.统一为有权限的接口设置headers请求头
    //判断url里是否携带了/my/，有的都是需要设置请求头的（接口有写
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //3.禁止用户非法进入(只在index请求页面的时候符合)
    // options.complete = function (res) { //不管成功失败都会执行
    //     // console.log(res);
    //     if (res.responseJSON.status == 1 || res.responseJSON.message == '身份认证失败！') {
    //         localStorage.removeItem('token'); //强制清空token
    //         location.href = '/login.html'; //强制跳转到登录页面
    //     }

    // }

})