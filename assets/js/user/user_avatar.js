var layer = layui.layer;
var $image = $('#image'); // 获取裁剪区域的 DOM 元素,图片
// 配置选项，cropper插件的
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

$(function () {
    // 创建裁剪区域
    $image.cropper(options);

    //上传按钮添加点击事件
    $('#btnChooseImage').on('click', clickFile);
    //文件选择框发生改变
    $('#file').on('change', changeImg);
    //给确定按钮添加点击事件
    $('#btnUpload').on('click', yesbtn);

    //把图片地址更改为现在的头像
    let imgurl = localStorage.getItem('imgurl');
    $image.cropper('destroy').attr('src', imgurl).cropper(options)

});

//2.点击弹出文件选择框
function clickFile() {
    $('#file').click(); //触发文件选择框的点击事件，相当于我点击按钮的时候去触发了file文件上传自带的click事件
}
//3.更换裁剪区域的图片
function changeImg(e) {
    //获取用户选择的文件
    let filelist = e.target.files;

    if (filelist.length === 0) { //未选择照片的时候
        return layer.msg('请选择照片！');
    }
    //拿到用户选择的文件
    let file = e.target.files[0];

    //将文件转换为路径
    let imgURL = URL.createObjectURL(file);

    // //重新初始化裁剪区域:销毁旧的裁剪区域---重新设置图片路径---重新初始化裁剪区域
    $image.cropper('destroy').attr('src', imgURL).cropper(options);
    return imgURL;

}

//4.点击确认按钮后将裁剪后的头像上传到服务器
function yesbtn() {
    //拿到用户裁剪之后的头像
    let dataURL = $image
        .cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //调用接口，把头像上传到服务器
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('更换头像失败！')
            }
            layer.msg('更换头像成功！')
            window.parent.getUserInfo(); //渲染，获取用户的基本信息




        }
    })
}