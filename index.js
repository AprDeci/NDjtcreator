const app = {
    data() {
        return {
            jwbh: '92970',
            starttime: '2023-09-21 06:34',
            name: '吴亦凡',
            youclass: '2021级软件ry0班',
            shcoolid: '2110111111',
            phonenumber: '13673054011',
            starttime2: '2023-09-21 06:34',
            endtime: '2023-09-22 18:00',
            type: '病假',
            reason: '发烧',
            QQ: '1263868407'
        }
    },
    computed: {
        timelong: function () {
            let staytimeGap = new Date(this.endtime).getTime() - new Date(this.starttime).getTime();
            let stayHour = Math.floor(staytimeGap / (3600 * 1000));  // 小时
            let year = Math.floor(stayHour / 24)
            hour = stayHour % 24
            let leave1 = staytimeGap % (3600 * 1000);
            let stayMin = Math.floor(leave1 / (60 * 1000));  // 分钟
            return year + '天' + hour + "小时" + stayMin + '分钟';
        },
        touxiang: function () {
            return 'http://q1.qlogo.cn/g?b=qq&nk=' + this.QQ + '&s=100'
        }
    },
    methods: {
        getCard() {
            html2canvas($("#app"), {
                allowTaint: true,
                useCORS: true,
                canvas: canvas,
                onrendered: function (canvas) {
                    dataURL = canvas.toDataURL("image/png");
                    var img = new Image();
                    img.src = dataURL;
                    img.className = 'cardImg';
                    img.onload = function () {
                        $(".card").append(img);
                    }
                },
                width: c_width,
                height: c_height
            })
        },
        getPic() {
            var c_width = $('#app').outerWidth();//如果box设置了padding，需要获取outerWidth和outerHeight来赋给canvas；
            var c_height = $('#app').outerHeight();

            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");

            //以下代码是获取根据屏幕分辨率，来设置canvas的宽高以获得高清图片
            // 屏幕的设备像素比
            var devicePixelRatio = window.devicePixelRatio || 2;

            // 浏览器在渲染canvas之前存储画布信息的像素比
            var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;

            // canvas的实际渲染倍率
            var ratio = devicePixelRatio / backingStoreRatio;

            canvas.width = c_width * ratio;
            canvas.height = c_height * ratio;
            canvas.style.width = c_width + "px";
            canvas.style.height = c_height + "px";

            var transTop = $(document).scrollTop() - $('.card_box').offset().top;//获取div垂直方向的位置

            context.scale(ratio, ratio);
            context.translate((c_width - $(window).width()) / 2, transTop) //canvas的位置要保证与div位置相同。

            //高清图设置完成

            //解决跨域，将跨域图片路径转为base64格式
            var img = new Image();
            var canvas2 = document.createElement('canvas');
            var ctx = canvas2.getContext('2d');
            img.crossOrigin = 'Anonymous';
            img.src = $('#touxiang').attr('src');
            img.onload = function () {
                canvas2.height = img.height;
                canvas2.width = img.width;
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas2.toDataURL('image/png');
                $('#touxiang').attr('src', dataURL);
                canvas2 = null;

                //重新给img赋值成功后，执行截图方法
                getCard()

            }
        },
        test(){
            console.log("111111111111")
        }
    }
}
Vue.createApp(app).use(ElementPlus).mount('#app')