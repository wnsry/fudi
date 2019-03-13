<template>
    <div class="baojia">
        <p style="height:10px;background:#F4F4F4;"></p>
        <div class="main" v-if="data.length>0"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
            <ul class="tit">
                <li>申请编号</li>
                <li>申请时间</li>
                <li>申请人</li>
                <li>状态</li>
                <li>处理人</li>
                <li>备注</li>
                <li>报价申请单</li>
                <li>报价单</li>
            </ul>
            <ul class="lst" v-for="(it,i) in data" :key="i">
                <li>{{it.applyAccount}}</li>
                <li>{{it.applyTime}}</li>
                <li>{{it.apply}}</li>
                <li>{{it.status}}</li>
                <li>{{it.handler}}</li>
                <li>{{it.remark}}</li>
                <li v-if="it.requestNote"><img @click="loadbtn(it.requestNote)" :src="excel" alt=""></li>
                <li v-else></li>
                <li v-if="it.quoteNote"><img @click="loadbtn(it.quoteNote)" :src="excel" alt=""></li>
                <li v-else></li>
            </ul>
        </div>
        <div class="nodt" v-else>
            <img :src="nodata" alt="">
        </div>

        <el-dialog
        :visible.sync="sqVisible"
        :show-close="chashow"
        width="550px"
        >
            <div class="sqshow">
                <p>
                    <input type="text" v-model="exclename" placeholder="选择上传文件" readonly="readonly">
                    <b>目录
                        <input
                        id="fileSelect"
                        name="fileSelect"
                        @change="update"
                        ref="inputer"
                        type="file">
                    </b>
                </p>
                <p>
                    <span>备注：</span>
                    <input type="text" placeholder="" v-model="beizhu">
                </p>
                <div class="btn">
                    <i @click="quxiaoup()">取消</i>
                    <em @click="upbtn()">提交</em>
                </div>
            </div>
        </el-dialog>

        <div class="posi">
            <i @click="sqVisible=true">申请报价单</i>
        </div>
    </div>
</template>

<script>
import excel from 'Imgs/excel.png'
import nodata from 'Imgs/nodata.png'

export default {
    data () {
        return {
            excel,
            nodata,
            loading:false,

            data:[],

            sqVisible:false,
            chashow:false,
            exclename:'',
            exclepath:'',
            beizhu:'',
            yema:1,
            tiaonum:20
        }
    },
    mounted() {
        this.torute()
        this.ssbtn()
    },
    methods:{
        torute(){
            this.$emit("torute",6)
        },
        loadMore(){
            this.yema++
            this.loading = true
            this.ssbtn()
        },
        ssbtn(){
            let usno= JSON.parse(localStorage.getItem('user')).no
            this.$post(this.$api.showQuotation,{
                creator:usno,
                offset:this.tiaonum,
                pageNum:this.yema
            }).then(res=>{  //报价列表
                this.data=this.data.concat(res.data.list)
                if(res.data.list.length<this.tiaonum){
                    this.loading = true;
                }else{
                    this.loading = false;
                }
            })
        },
        update(){
            const file = this.$refs.inputer.files[0]
            const data = new FormData()
            data.append('file', file)
            this.$postobj(this.$api.upload,data).then(res=>{
                this.exclename=res.data.fileName
                this.exclepath=res.data.filePath
            })
        },
        upbtn(){
            let usno= JSON.parse(localStorage.getItem('user')).no
            if(this.exclename && this.beizhu){
                this.$post(this.$api.applyQuotation,{
                    creator:usno,
                    remark:this.beizhu,
                    fileName:this.exclename,
                    filePath:this.exclepath
                }).then(res=>{
                    this.sqVisible=false
                    this.data=[]
                    this.yema=1
                    this.beizhu=''
                    this.exclename=''
                    this.exclepath=''
                    this.ssbtn()
                    this.$message({
                        message: res.msg,
                        type: '',
                        duration:1500,
                        center: true
                    });
                })
            }
        },
        quxiaoup(){
            this.sqVisible=false
            this.beizhu=''
            this.exclename=''
            this.exclepath=''
        },
        loadbtn(urls){
            window.location.href = urls
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.baojia{
    .main{
        padding-bottom: 70px;
        ul{
            display: flex;
            border-bottom: 1px solid #979797;
            li{
                height: 40px;
                text-align: center;
                line-height: 40px;
                font-size: 14px;
                color: #333;
                overflow: hidden;
                margin-left: 10px;
            }
            li:nth-of-type(1){
                width: 190px;
                margin-left: 20px;
            }
            li:nth-of-type(2){
                width: 170px;
            }
            li:nth-of-type(3){
                width: 78px;
            }
            li:nth-of-type(4){
                width: 64px;
            }
            li:nth-of-type(5){
                width: 64px;
            }
            li:nth-of-type(6){
                width: 198px;
            }
            li:nth-of-type(7){
                width: 90px;
                img{
                    width: 30px;
                    height: 30px;
                    margin: 5px auto;
                }
            }
            li:nth-of-type(8){
                width: 62px;
                img{
                    width: 30px;
                    height: 30px;
                    margin: 5px auto;
                }
            }
        }
    }
    .nodt{
        img{
            height: 120px;
            width: 100px;
            margin: 251px 0 0 462px;
        }
    }
    .sqshow{
        padding-top: 40px;
        p{
            height: 45px;
            line-height: 45px;
            border-bottom: 1px solid #DFDFDF;
            margin: 0 50px;
            padding: 30px 0 5px;
            span{
                font-size: 18px;
                color: #333;
            }
            b{
                padding: 5px 18px;
                background: #37383A;
                border-radius: 4px;
                color: #fff;
                position: relative;
                overflow: hidden;
                #fileSelect{
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
            input{
                display: inline-block;
                height: 40px;
                width: 330px;
                border: 0;
                font-size: 18px;
                outline: none;
            }
            input::-webkit-input-placeholder {
                color: #D8D8D8;
            }
        }
        .btn{
            padding: 35px 0;
            display: flex;
            justify-content: center;
            i,em{
                height: 50px;
                width: 180px;
                background: #37383A;
                line-height: 50px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
            }
            i{
                margin-right: 30px;
                background: #717171;
            }
        }
    }
    .posi{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 70px;
        background: #fff;
        border-top: 1px solid #979797;
        i{
            height: 50px;
            width: 180px;
            line-height: 50px;
            text-align: center;
            border-radius: 4px;
            background: #37383A;
            color: #fff;
            display: block;
            margin: 10px auto;
        }
    }
}
</style>
<style>
.el-dialog__header,.el-dialog__body{
    padding: 0;
}
.el-input-number{
    margin-left: 150px;
}
</style>

