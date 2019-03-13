<template>
    <div class="xihuan" v-loading="loadingyuan" element-loading-text="拼命加载中">
        <p style="height:10px;background:#F4F4F4;"></p>
        <div class="main" v-if="data.length>0"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
            <ul class="tit">
                <li></li>
                <li>产品图片</li>
                <li>产品名称</li>
                <li>收藏时间</li>
            </ul>
            <ul class="lst" v-for="(it,i) in data" :key="i">
                <li>
                    <input type="checkbox" name="" :value="i" v-model="lstVal" />
                </li>
                <li>
                    <img :src="it.picture" alt="" @click="todtl(it.waresId)">
                </li>
                <li>{{it.waresName}}</li>
                <li>{{it.createdTime}}</li>
            </ul>
        </div>
        <div class="nodt" v-else ref="msgDiv">
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
            <li @click="scbtn()"><img :src="shanchu" alt=""></li>
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
            loading:false,
            loadingyuan:true,

            lstVal:[],
            data:[],
            yema:1,
            tiaonum:20,

            ssVisible:false,
            chashow:false,
            shijian:'',
            ssact:1,

            shanchuVisible:false
        }
    },
    mounted() {
        this.torute()
        this.ssbtn()
    },
    methods:{
        torute(){
            this.$emit("torute",5)
        },
        loadMore(){
            this.loading = true
            console.log('111111111111111111')
            this.yema++
            this.ssbtn()
        },
        ssdata(){
            this.data=[]
            this.yema=1
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
            this.$post(this.$api.searchMyCollection,{
                createdBy:usno,
                startDate:kstim,
                endDate:jstim,
                waresName:'',
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
        scbtn(){
            if(this.lstVal.length>0){
                this.shanchuVisible=true
                
            }else{
                this.$message({
                    message: '请选择需要删除的产品',
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
            this.$post(this.$api.delCollection,{
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
            console.log(this.shijian)
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
.xihuan{
    .main{
        ul{
            display: flex;
            border-left: 1px solid #979797;
            li{
                width: 428px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size: 14px;
                color: #333;
                background: #CACACA;
                border-right: 1px solid #979797;
                border-bottom: 1px solid #979797;
                overflow: hidden;
            }
            li:nth-of-type(1){
                width: 70px;
            }
            li:nth-of-type(2){
                width: 100px;
            }
        }
        .tit{
            border-top: 1px solid #979797;
        }
        .lst{
            li{
                background: #fff;
                height: 100px;
                line-height: 100px;
                img{
                    width: 90%;
                    height: 90%;
                    padding:5px;
                }
            }
            input[type='checkbox']{
                width: 20px;
                height: 20px;
                background-color: #fff;
                -webkit-appearance:none;
                border: 1px solid #c9c9c9;
                outline: none;
                margin: 40px 0 0 5px;
            }
            input[type=checkbox]:checked{
                background: url("../assets/img/dgou.png")no-repeat center;
                background-size:20px 20px;
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
                color: #333;
                i{
                    margin: 0 20px 0 75px;
                }
                i,em{
                    padding: 5px 20px;
                    background: #F4F4F4;
                    border-radius: 3px;
                }
                .ssact{
                    background: #CACACA;
                }
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
.el-loading-mask{
    background: #fff;
}
</style>

