//每次调用ajax请求时，会先调用这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options); //可以拿到我点击的任意按钮请求的所有信息
    //拼接上根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    //注意这个文件的引入要在jq之后我们的js之前
})