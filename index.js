
const app = {
    data() {
        return {
            jwbh: '92970',
            starttime: '2023-09-26 18:34',
            name: '孟夏',
            youclass: '2021级软件rj3班',
            shcoolid: '211012208',
            phonenumber: '13673054019',
            endtime: '2023-09-22 18:00',
            type: '病假',
            reason: '发烧',
            QQ: '1263868407'
        }
    },
    mounted() {
        this.endtime=this.timeend
        this.starttime=this.timestart
    },
    computed: {
        timeend: function () {
            let time  = new Date();
            return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate()+' '+'20:00';
        },
        timestart:function () {
            let time  = new Date();
            return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate()-1)+' '+time.getHours()+':'+(time.getMinutes()<10?'0':'') + time.getMinutes();
          },
        timelong: function () {
            let staytimeGap = new Date(this.endtime).getTime() - new Date(this.starttime).getTime();
            let stayHour = Math.floor(staytimeGap / (3600 * 1000));  // 小时
            let year = Math.floor(stayHour / 24)
            hour = stayHour % 24
            let leave1 = staytimeGap % (3600 * 1000);
            let stayMin = Math.floor(leave1 / (60 * 1000));  // 分钟
            return year + '天' + hour + "小时" + stayMin + '分钟';
        },
         starttime2: function () {
            let time  = new Date();
            return time.getFullYear()+'-'+(time.getMonth()+1)+'-'+(time.getDate()-1)+' '+(time.getHours()+1)+':00';
        }, 
        touxiang: function () {
            return 'http://q1.qlogo.cn/g?b=qq&nk=' + this.QQ + '&s=100'
        }
    },
    methods: {

// 第一个参数是图片的URL地址，第二个是转换成base64地址后要赋值给的img标签
getBase64Image (url) {
    var image = new Image()
    image.src = url + '?v=' + Math.random() // 处理缓存
    image.crossOrigin = '*' // 支持跨域图片
    image.onload = () => {
        var base64 = drawBase64Image(image)
        return base64
    }
},
drawBase64Image (img) {
    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
    var dataURL = canvas.toDataURL('image/png')
    return dataURL
},
        getCard() {
            var getBase64Image=function(url) {
                var image = new Image()
                image.src = url + '&v=' + Math.random() // 处理缓存
                image.crossOrigin = '*' // 支持跨域图片
                image.onload = function () {
                    $(".invit_info_qrcode").attr("src",drawBase64Image(image))
                    convertDivToImage("my_div")
                }
            }
            
            var getPixelRatio = function(context) {     // 获取设备的PixelRatio
                var backingStore = context.backingStorePixelRatio ||
                    context.webkitBackingStorePixelRatio ||
                    context.mozBackingStorePixelRatio ||
                    context.msBackingStorePixelRatio ||
                    context.oBackingStorePixelRatio ||
                    context.backingStorePixelRatio || 1;
                return (window.devicePixelRatio || 1) / backingStore;
            };
            var shareContent = document.getElementById("backcontainer"); 
            var width = shareContent.offsetWidth; 
            var height = shareContent.offsetHeight; 
            var qq = document.getElementById("touxiang")
            qq.onload=()=>{
                setTimeout(500)
            }
            var canvas = document.createElement("canvas"); 
            var context = canvas.getContext('2d'); 
            var scale = getPixelRatio(context);    //将canvas的容器扩大PixelRatio倍，再将画布缩放，将图像放大PixelRatio倍。
            canvas.width = width * scale*scale; 
            canvas.height = height * scale*scale;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            context.scale(scale, scale);
     
            var opts = {
                /* scale: scale,  */
                canvas: canvas,
                useCORS: true,
                width: width, 
                height: height,
                dpi: window.devicePixelRatio
            };
            setTimeout(100)
            html2canvas(shareContent, opts).then(function (canvas) {
                context.mozImageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                context.msImageSmoothingEnabled = false;
                context.imageSmoothingEnabled = false;
                var dataUrl = canvas.toDataURL('image/png', 1.0)
                let eleLink = document.createElement('a')
                eleLink.download = 'jt.png'
                eleLink.href = dataUrl
                eleLink.click()
                eleLink.remove()
              });
          }

    }
}
Vue.createApp(app).use(ElementPlus).mount('#app')
