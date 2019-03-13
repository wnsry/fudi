<template>
    <div class="jiedai" v-loading="loadingyuan" element-loading-text="拼命加载中">
        <p style="height:10px;background:#F4F4F4;"></p>
        <div class="main" v-if="data.length>0" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
        <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :autoFill="isAutoFill"> -->
            <div class="lst" v-for="(it,i) in data" :key="i">
                <div class="gou">
                    <input type="checkbox" name="" :value="i" v-model="lstVal" />
                </div>
                <div class="rt">
                    <div class="tu">
                        <img :src="it.picAddress" alt="" @click="todtl(it.waresId)">
                    </div>
                    <ul>
                        <li>
                            <i>客户编号</i>
                            <em>{{it.visitNo}}</em>
                        </li>
                        <li>
                            <i>客户姓名</i>
                            <em>{{it.visitName}}</em>
                        </li>
                        <li>
                            <i>手机号码</i>
                            <em>{{it.mobile}}</em>
                        </li>
                        <li>
                            <i>产品名称</i>
                            <em>{{it.waresName}}</em>
                        </li>
                        <li>
                            <i>收藏时间</i>
                            <em>{{it.createdTime}}</em>
                        </li>
                    </ul>
                </div>
            </div>
        <!-- </mt-loadmore> -->
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
                    <span>收藏时间：</span>
                    <el-date-picker
                    v-model="shijian"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </p>
                <p>
                    <span>接待编号：</span>
                    <input type="text" placeholder="请输入接待编号" v-model="bianhao">
                </p>
                <p>
                    <span>客户姓名：</span>
                    <input type="text" placeholder="请输入客户姓名" v-model="name">
                </p>
                <p>
                    <span>手机号码：</span>
                    <input type="text" placeholder="请输入手机号码" v-model="pho">
                </p>
                <p>
                    <span>产品名称：</span>
                    <input type="text" placeholder="请输入产品名称" v-model="goodname">
                </p>
                <div class="btn">
                    <i @click="ssdata()">搜索</i>
                </div>
            </div>
        </el-dialog>

        <el-dialog
        :visible.sync="shanchuVisible"
        :show-close="chashow"
        width="480px"
        >
        <div class="shanchushow">
            <h3>您是否确定删除此收藏?</h3>
            <div class="btn">
                <i @click="shanchuVisible=false">取消</i>
                <em @click="btn()">确定</em>
            </div>
        </div>
        </el-dialog>

        <ul class="posi">
            <li @click="ssVisible=true"><img :src="sousuo" alt=""></li>
            <li @click="quxiao()"><img :src="shanchu" alt=""></li>
            <li @click="aaa"><img :src="xiazhai" alt=""></li>
        </ul>
    </div>
</template>

<script>
import goods from 'Imgs/goods.png'
import sousuo from 'Imgs/sousuo.png'
import shanchu from 'Imgs/shanchu.png'
import xiazhai from 'Imgs/xiazhai.png'
import nodata from 'Imgs/nodata.png'

export default {
    data () {
        return {
            goods,
            sousuo,
            shanchu,
            xiazhai,
            nodata,
            // allLoaded:false,
            // isAutoFill: false,
            loading:false,
            loadingyuan:true,

            lstVal:[],
            data:[],
            bianhao:'',
            pho:'',
            name:'',
            goodname:'',
            yema:1,
            tiaonum:20,

            ssVisible:false,
            chashow:false,
            shijian:'',

            shanchuVisible:false
        }
    },
    mounted() {
        this.torute()
        this.ssbtn()
    },
    methods:{
        torute(){
            this.$emit("torute",2)
        },
        // loadBottom() {
        //     this.yema++
        //     this.ssbtn()
        //     // this.allLoaded = true;// 若数据已全部获取完毕
        //     this.$refs.loadmore.onBottomLoaded();
        // },
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
            this.$post(this.$api.productCollectionSearch,{
                startDate:kstim,
                endDate:jstim,
                visitNo:this.bianhao,
                visitName:this.name,
                mobile:this.pho,
                productName:this.goodname,
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
        quxiao(){
            if(this.lstVal.length>0){
                this.shanchuVisible=true
                // let idstr=this.lstVal.join(',')
                
                
            }else{
                this.$message({
                    message: '请选择删除的产品',
                    type: '',
                    duration:1500,
                    center: true
                });
            } 
        },
        btn(){
            let idarr=[]
            for(let i=0;i<this.lstVal.length;i++){
                idarr.push(this.data[this.lstVal[i]].id)
            }
            let idstr=idarr.join(',')
            console.log(idstr)
            this.$post(this.$api.productCollectionDel,{
                Id:idstr
            }).then(res=>{
                for(let i=0;i<this.lstVal.length;i++){
                    if(i==0){
                        this.data.splice(this.lstVal[i],1)
                    }else{
                        this.data.splice(--this.lstVal[i],1)
                    }
                }
                this.lstVal=[]
                console.log(this.data)
                this.$message({
                    message: res.msg,
                    type: '',
                    duration:1500,
                    center: true
                });
                this.shanchuVisible=false
            })
        },
        aaa(){
            console.log(this.lstVal)
        },
        todtl(idnum){
            this.$router.push({ name: 'Detail', params: { id: idnum } })
            location.reload()
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.jiedai{
        // overflow:scroll;
    .main{
        .lst{
            display: flex;
            height: 140px;
            border-bottom: 1px solid #979797;
            .gou{
                width: 70px;
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
                        width: 240px;
                        margin-right: 30px;
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
    .shanchushow{
    margin: 0 53px;
    h3{
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #333;
      padding-top: 48px;
      font-weight: 400;
    }
    .btn{
      margin: 40px auto;
      padding-bottom: 48px;
      display: flex;
      i,em{
          width: 180px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          border-radius: 4px;
      }
      i{
          background: #717171;
          margin-right: 15px;
      }
      em{
          background: #37383A;
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

