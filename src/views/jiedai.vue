<template>
    <div class="schang" v-loading="loadingyuan" element-loading-text="拼命加载中">
        <p style="height:10px;background:#F4F4F4;"></p>
        <div class="main" v-if="data.length>0"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
            <div class="lst" v-for="(it,i) in data" :key="i">
                <div class="gou">
                    <input type="checkbox" name="" :value="i" v-model="lstVal" />
                </div>
                <div class="rt">
                    <ul>
                        <li>
                            <i>接待编号</i>
                            <em>{{it.no}}</em>
                        </li>
                        <li>
                            <i>客户名称</i>
                            <em>{{it.name}}</em>
                        </li>
                        <li>
                            <i>手机号码</i>
                            <em>{{it.mobile}}</em>
                        </li>
                        <li>
                            <i>微信号</i>
                            <em>{{it.wechat}}</em>
                        </li>
                        <li>
                            <i>登记时间</i>
                            <em>{{it.createdTime}}</em>
                        </li>
                        <li style="width:900px;">
                            <i>备注</i>
                            <em>{{it.remark}}</em>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="nodt" v-else>
            <img :src="nodata" alt="">
        </div>

        <el-dialog
        :visible.sync="ssVisible"
        :show-close="chashow"
        width="590px"
        >
            <div class="ssshow">
                <p>
                    <span>登记时间：</span>
                    <el-date-picker
                    v-model="shijian"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </p>
                <p>
                    <span>客户名称：</span>
                    <input type="text" placeholder="请输入客户名称" v-model="name">
                </p>
                <p>
                    <span>手机号码：</span>
                    <input type="text" placeholder="请输入手机号码" v-model="pho">
                </p>
                <p>
                    <span>微信号码：</span>
                    <input type="text" placeholder="请输入微信号" v-model="wx">
                </p>
                <p>
                    <span>&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;：</span>
                    <input type="text" placeholder="请输入备注" v-model="bz">
                </p>
                <div class="btn">
                    <i @click="ssdata()">搜索</i>
                </div>
            </div>
        </el-dialog>

        <el-dialog
        :visible.sync="bjVisible"
        :show-close="chashow"
        width="550px"
        >
            <div class="bjshow">
                <h3>编辑客户</h3>
                <p>
                    <span>客户名称：</span>
                    <input type="text" placeholder="请输入客户名称" v-model="khname">
                </p>
                <p>
                    <span>手机号码：</span>
                    <input type="text" placeholder="请输入手机号码" v-model="khpho">
                </p>
                <p>
                    <span>微信号码：</span>
                    <input type="text" placeholder="请输入微信号" v-model="khwx">
                </p>
                <p>
                    <span>&nbsp;备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注&nbsp;：</span>
                    <input type="text" placeholder="请输入微信号" v-model="khbz">
                </p>
                <div class="btn">
                    <i @click="bjVisible=false">取消</i>
                    <em @click="bjbtn()">提交</em>
                </div>
            </div>
        </el-dialog>

        <ul class="posi">
            <li @click="ssVisible=true"><img :src="sousuo" alt=""></li>
            <li @click="bianj()"><img :src="bianji" alt=""></li>
            <!-- <li @click="aaa"><img :src="xiazhai" alt=""></li> -->
        </ul>
    </div>
</template>

<script>
import goods from 'Imgs/goods.png'
import sousuo from 'Imgs/sousuo.png'
import bianji from 'Imgs/bianji.png'
import xiazhai from 'Imgs/xiazhai.png'
import nodata from 'Imgs/nodata.png'

export default {
    data () {
        return {
            goods,
            sousuo,
            bianji,
            xiazhai,
            nodata,
            loading:false,
            loadingyuan:true,

            lstVal:[],
            data:[],
            name:'',
            pho:'',
            wx:'',
            bz:'',
            yema:1,
            tiaonum:20,

            ssVisible:false,
            chashow:false,
            shijian:'',

            bjVisible:false,
            khname:'',
            khpho:'',
            khwx:'',
            khbz:''
        }
    },
    mounted() {
        this.torute()
        this.ssbtn()
    },
    methods:{
        torute(){
            this.$emit("torute",3)
        },
        loadMore(){
            this.yema++
            this.loading = true
            this.ssbtn()
        },
        ssdata(){
            this.data=[]
            this.yema=1
            // this.loading = false
            this.ssbtn()
        },
        ssbtn(){
            this.ssVisible=false
            let kstim='',jstim=''
            if(this.shijian){
                kstim=this.shijian[0]+' 00:00:00'
                jstim=this.shijian[1]+' 23:00:00'
            }
            let usno= JSON.parse(localStorage.getItem('user')).no
            this.$post(this.$api.cusSearch,{
                startTime:kstim,
                endTime:jstim,
                name:this.name,
                mobile:this.pho,
                wechat:this.wx,
                remark:this.bz,
                createdBy:usno,
                offset:this.tiaonum,
                pageNum:this.yema
            }).then(res=>{
                this.data=this.data.concat(res.data.list)
                if(res.data.list.length<this.tiaonum){
                    this.loading = true;
                }else{
                    this.loading = false;
                }
                this.loadingyuan=false
            })
        },
        bianj(){
            console.log(this.lstVal)
            if(this.lstVal.length>0){
                this.khname=this.data[this.lstVal[0]].name
                this.khpho=this.data[this.lstVal[0]].mobile
                this.khwx=this.data[this.lstVal[0]].wechat
                this.khbz=this.data[this.lstVal[0]].remark
                this.bjVisible=true
            }else{
                this.$message({
                    message: '请选择需要编辑的产品',
                    type: '',
                    duration:1500,
                    center: true
                });
            }
        },
        bjbtn(){
            let noarr=[]
            for(let i=0;i<this.lstVal.length;i++){
                noarr.push(this.data[this.lstVal[i]].no)
            }
            let nostr=noarr.join(',')
            console.log(nostr)
            let usno= JSON.parse(localStorage.getItem('user')).no
            this.$post(this.$api.editCus,{
                cusNo:nostr,
                name:this.khname,
                mobile:this.khpho,
                wechat:this.khwx,
                remark:this.khbz,
                createdBy:usno
            }).then(res=>{
                for(let i=0;i<this.lstVal.length;i++){
                    this.data[this.lstVal[i]].name=this.khname
                    this.data[this.lstVal[i]].mobile=this.khpho
                    this.data[this.lstVal[i]].wechat=this.khwx
                    this.data[this.lstVal[i]].remark=this.khbz
                }
                this.lstVal=[]
                this.bjVisible=false
            })
        },
        aaa(){
            console.log(this.lstVal)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.schang{
    .main{
        .lst{
            display: flex;
            height: 140px;
            border-bottom: 1px solid #979797;
            .gou{
                width: 85px;
                input[type='checkbox']{
                    width: 20px;
                    height: 20px;
                    background-color: #fff;
                    -webkit-appearance:none;
                    border: 1px solid #c9c9c9;
                    outline: none;
                    margin: 60px 0 0 30px;
                }
                input[type=checkbox]:checked{
                    background: url("../assets/img/dgou.png")no-repeat center;
                    background-size:20px 20px;
                }
            }
            .rt{
                display: flex;
                flex: 1;
                margin-top: 20px;
                .tu{
                    width: 100px;
                    height: 100px;
                    border: 1px solid #979797;
                    margin-right: 30px;
                    img{
                        width: 100px;
                        height: 100px;
                    }
                }
                ul{
                    display: flex;
                    flex-wrap: wrap;
                    height: 120px;
                    li{
                        width: 165px;
                        margin-right: 20px;
                        height: 40px;
                        i,em{
                            display: block;
                            height: 20px;
                            line-height: 20px;
                            color: #999;
                            font-size: 14px;
                        }
                        em{
                            color: #000;
                        }
                    }
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
    .ssshow{
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
            input{
                display: inline-block;
                height: 40px;
                width: 300px;
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
            i{
                display: block;
                height: 50px;
                width: 180px;
                background: #37383A;
                line-height: 50px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
                margin: 0 auto;
            }
        }
    }
    .bjshow{
        h3{
            font-size: 21px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #333;
            padding-top: 60px;
        }
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
            input{
                display: inline-block;
                height: 40px;
                width: 300px;
                border: 0;
                font-size: 18px;
                outline: none;
            }
            input::-webkit-input-placeholder {
                color: #D8D8D8;
            }
        }
        .btn{
            display: flex;
            justify-content: center;
            padding: 47px 0;
            i,em{
                height: 50px;
                line-height: 50px;
                width: 180px;
                text-align: center;
                background: #717171;
                border-radius: 4px;
                color: #fff;
            }
            em{
                background: #37383A;
                margin-left: 20px;
            }
        }
    }
    .posi{
        position: fixed;
        right: 0;
        bottom: 0;
        li{
            height: 40px;
            width: 40px;
            margin-bottom: 30px;
            margin-right: 30px;
            img{
                width: 100%;
                height: 100%;
            }
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

