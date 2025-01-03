
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
        touxiang: function () {
            return 'http://q1.qlogo.cn/g?b=qq&nk=' + this.QQ + '&s=100'
        },
        timeend() {
            let time = new Date();
            return `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} 00:00`;
        },
        timestart() {
            let time = new Date();
            time.setDate(time.getDate() - 1);
            return `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`;
        },
        timelong() {
            let staytimeGap = new Date(this.endtime).getTime() - new Date(this.starttime).getTime();
            let stayHour = Math.floor(staytimeGap / (3600 * 1000));  // 小时
            let days = Math.floor(stayHour / 24);
            let hours = stayHour % 24;
            let leave1 = staytimeGap % (3600 * 1000);
            let stayMin = Math.floor(leave1 / (60 * 1000));  // 分钟
            return `${days}天 ${hours}小时 ${stayMin}分钟`;
        },
        starttime2() {
            let time = new Date();
            time.setDate(time.getDate() - 1);
            time.setHours(time.getHours() + 1);
            time.setMinutes(0);
            return `${time.getFullYear()}-${String(time.getMonth() + 1).padStart(2, '0')}-${String(time.getDate()).padStart(2, '0')} ${String(time.getHours()).padStart(2, '0')}:00`;
        },  
    },
    methods: {
        saveData() {
            let dataCopy = { ...this.$data };
            delete dataCopy.starttime;
            delete dataCopy.endtime;
            delete dataCopy.starttime2;
    
            let dataStr = JSON.stringify(dataCopy);
            let downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute("href", `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`);
            downloadAnchorNode.setAttribute("download", 'data.json');
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
        },
        importData() {
            let input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.onchange = _this => {
                let files = _this.target.files;
                if (files.length === 0) {
                    return;
                }
                let reader = new FileReader();
                reader.onload = e => {
                    let data = JSON.parse(e.target.result);
                    this.jwbh = data.jwbh;
                    this.name = data.name;
                    this.youclass = data.youclass;
                    this.shcoolid = data.shcoolid;
                    this.phonenumber = data.phonenumber;
                    this.type = data.type;
                    this.reason = data.reason;
                    this.QQ = data.QQ;
                };
                reader.readAsText(files[0]);
            };
            input.click();
        }

}
}
Vue.createApp(app).use(ElementPlus).mount('#app')
