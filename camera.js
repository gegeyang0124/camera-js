/**
 * 拍照对象
 * **/
var Camera = {
    /**
     * 拍照
     * @param videoId string;//video标签ID
     * @param canvasId string;//canvas标签ID
     * @param callSuccess function;//摄像头打开成功 回调函数
     * @param callError function;//摄像头打开失败 回调函数
     * **/
    takePicture:function(videoId,canvasId,callSuccess,callError){
        return Camera.takeImage(
            document.getElementById(videoId),
            document.getElementById(canvasId),
            callSuccess,
            callError
        );
    },
    /**
     * 静默拍照，返回画布图的toDataURL("image/jpg");
     * @param callSuccess function;//摄像头打开成功 回调函数
     * @param callError function;//摄像头打开失败 回调函数
     * **/
    takePictureSilent:function(callSuccess,callError){
        return Camera.takeImage(
            document.createElement("VIDEO"),
            document.createElement("canvas"),
            callSuccess,
            callError
        );
    },
    /**
     * 拍照，返回画布图的toDataURL("image/jpg");
     * @param aVideo Object;//video对象
     * @param aCanvas Object;//canvas对象
     * @param callSuccess function;//摄像头打开成功 回调函数
     * @param callError function;//摄像头打开失败 回调函数
     * **/
    takeImage:function(aVideo,aCanvas,callSuccess,callError){
        //alert("zx");
        //var aVideo=document.getElementById('video');
        // var aVideo = document.createElement("VIDEO");
        //var aCanvas = document.getElementById('canvas');
        // var aCanvas = document.createElement("canvas");

        var ctx = aCanvas.getContext('2d');
        var imgData;

        //多种API，看设备支持那种，就赋值那种！！
        navigator.getUserMedia  = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;
        navigator.getUserMedia({video:true}, gotStream, noStream);//gotStream成功时回调，noStream失败时回调！

        // alert("zx");

        function gotStream(stream) {//alert("zx2");
            aVideo.src = URL.createObjectURL(stream);
            aVideo.onerror = function () {
                stream.stop();
            };

            stream.onended = noStream;
            aVideo.onloadedmetadata = function () {
                callSuccess&&callSuccess();
                // alert("zx3");
                //alert('摄像头成功打开！');
            };

        }

        function noStream(err) {
            callError&&callError(err);
            //isOpenCamera = false;
            // alert("请打开摄像头权限！");
        }

        /*setInterval(function () {//alert("zx4");
          ctx.drawImage(aVideo, 0, 0, 50, 50);}, 5000);//alert("zx5");*/
        ctx.drawImage(aVideo, 0, 0, 50, 50);
        imgData = ctx.toDataURL("image/jpg");

        return imgData;
    }
}