<template>
    <div class="kucun" v-loading="loadingyuan" element-loading-text="拼命加载中">
        <p style="height:10px;background:#F4F4F4;"></p>
        <div class="main" v-if="data.length>0"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
            <div class="lf">
                <ul class="tit">
                    <li></li>
                    <li>产品图片</li>
                </ul>
                <ul class="lst" v-for="(it,i) in data" :key="i">
                    <li>
                        <input type="checkbox" name="" :value="i" v-model="lstVal" />
                    </li>
                    <li @click="todetail(it.waresId)">
                        <img :src="it.pic" alt="">
                    </li>
                </ul>
            </div>
            <div class="rt">
                <ul class="tit">
                    <li>剩余时间</li>
                    <li>仓库名称</li>
                    <li>工厂编码</li>
                    <li>面料</li>
                    <li>材质</li>
                    <li>备注1</li>
                    <li>发起时间</li>
                    <li style="width:125px;">占有量</li>
                    <li>规格</li>
                    <li>状态</li>
                </ul>
                <ul class="lst" v-for="(it,i) in data" :key="i">
                    <li>{{it.restTime}}</li>
                    <li>{{it.warehouseName}}</li>
                    <li>{{it.factoryNo}}</li>
                    <li>{{it.fabric}}</li>
                    <li>{{it.material}}</li>
                    <li>备注一</li>
                    <li>{{it.createTime}}</li>
                    <li style="width:125px;">{{it.footprint}}</li>
                    <li>{{it.specification}}</li>
                    <li>{{it.status}}</li>
                </ul>
            </div>
        </div>
        <div class="nodt" v-else>
            <img :src="nodata" alt="">
        </div>

        <el-dialog
        :visible.sync="ssVisible"
        :show-close="chashow"
        width="570px"
        >
            <div class="ssshow">
                <p>
                    <span>日期：</span>
                    <el-date-picker
                    v-model="shijian"
                    type="daterange"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </p>
                <p>
                    <span>状态：</span>
                    <b>
                        <i :class="{'ssact':ssact=='0'}" @click="ssact=='0'?ssact='':ssact='0'">有效</i>
                        <em :class="{'ssact':ssact=='1'}" @click="ssact=='1'?ssact='':ssact='1'">无效</em>
                    </b>
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
            <h3>您是否确定取消占用?</h3>
            <div class="btn">
                <i @click="shanchuVisible=false">取消</i>
                <em @click="btn()">确定</em>
            </div>
        </div>
        </el-dialog>

        <el-dialog
        :visible.sync="xuqiVisible"
        :show-close="chashow"
        width="480px"
        >
        <div class="shanchushow">
            <h3>您是否确定续期?</h3>
            <div class="btn">
                <i @click="xuqiVisible=false">取消</i>
                <em @click="btn1()">确定</em>
            </div>
        </div>
        </el-dialog>

        <ul class="posi">
            <li @click="ssVisible=true"><img :src="sousuo" alt=""></li>
            <li @click="xuqibtn()"><img :src="xuqi" alt=""></li>
            <li @click="qxbtn()"><img :src="qxzy" alt=""></li>
        </ul>
    </div>
</template>

<script>
import goods from 'Imgs/goods.png'
import sousuo from 'Imgs/sousuo.png'
import xuqi from 'Imgs/xuqi.png'
import qxzy from 'Imgs/qxzy.png'
import nodata from 'Imgs/nodata.png'

export default {
    data () {
        return {
            goods,
            sousuo,
            xuqi,
            qxzy,
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
            ssact:'',

            shanchuVisible:false,
            xuqiVisible:false
        }
    },
    mounted() {
        this.torute()
        this.ssbtn()
    },
    methods:{
        todetail(idnum){
            this.$router.push({ name: 'Detail', params: { id: idnum } })
        },
        torute(){
            this.$emit("torute",4)
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
            this.$post(this.$api.showStock,{
                createdBy:usno,
                StartDate:kstim,
                EndDate:jstim,
                working:this.ssact,
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
        xuqibtn(){
            if(this.lstVal.length>0){
                this.xuqiVisible=true
                
            }else{
                this.$message({
                    message: '请选择需要续期的产品',
                    type: '',
                    duration:1500,
                    center: true
                });
            }
        },
        btn1(){
            let idarr=[]
            for(let i=0;i<this.lstVal.length;i++){
                idarr.push(this.data[this.lstVal[i]].id)
            }
            let idstr=idarr.join(',')
            this.$post(this.$api.applyRollover,{
                Id:idstr
            }).then(res=>{
                this.$message({
                    message: res.msg,
                    type: '',
                    duration:1500,
                    center: true
                });
                this.lstVal=[]
                this.xuqiVisible=false
            })
        },
        qxbtn(){
            if(this.lstVal.length>0){
                this.shanchuVisible=true
                
            }else{
                this.$message({
                    message: '请选择需要取消占用的产品',
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
            this.$post(this.$api.cancelStock,{
                Id:idstr
            }).then(res=>{
                this.$message({
                    message: res.msg,
                    type: '',
                    duration:1500,
                    center: true
                });
                for(let i=0;i<this.lstVal.length;i++){
                    this.data[this.lstVal[i]].status='失效'
                }
                this.lstVal=[]
                this.shanchuVisible=false
            })
        },
        aaa(){
            console.log(this.shijian)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.kucun{
    .main{
        position: relative;
        .lf{
            position: absolute;
            top: 0;
            left: 0;
            ul{
                display: flex;
                li{
                    width: 100px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    font-size: 14px;
                    color: #333;
                    background: #CACACA;
                    border-right: 1px solid #979797;
                    border-bottom: 1px solid #979797;
                }
                li:nth-of-type(1){
                    width: 70px;
                }
            }
            .tit{
                border-top: 1px solid #979797;
                border-left: 1px solid #979797;
            }
            .lst{
                border-left: 1px solid #979797;
                li{
                    background: #fff;
                    height: 100px;
                    line-height: 100px;
                }
                li:nth-of-type(1){
                    input[type='checkbox']{
                        width: 20px;
                        height: 20px;
                        background-color: #fff;
                        -webkit-appearance:none;
                        border: 1px solid #c9c9c9;
                        outline: none;
                        margin: 40px 0 0 15px;
                    }
                    input[type=checkbox]:checked{
                        background: url("../assets/img/dgou.png")no-repeat center;
                        background-size:20px 20px;
                    }
                }
                li:nth-of-type(2){
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .rt{
            width: 1024px;
            overflow-y: auto;
            ul{
                display: flex;
                margin-left: 171px;
                width: 1710px;
                li{
                    width: 175px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    font-size: 14px;
                    color: #333;
                    background: #CACACA;
                    border-right: 1px solid #979797;
                    border-bottom: 1px solid #979797;
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
</style>

