<template>
  <div class="shouye">
    <div class="main">
        <!-- <div class="banner">
            <img :src="banner" alt="">
        </div> -->
        <div class="bland">
            <div class="blandlist">
                <i v-for="(it,i) in logos" :key="i">
                    <img :src="it.logoUrl" alt="" style="background:#fff" @click="toChoose(it.id)">
                </i>
            </div>
            <img @click="zlogos()" class="more" v-if="lnum==1" :src="more" alt="">
            <img @click="zlogos()" class="more" v-else :src="more3" style="width:60px;" alt="">
        </div>
        <div class="goods">
            <ul>
                <li :class="{'act':act==1}" @click="act=1">最热</li>
                <li :class="{'act':act==2}" @click="act=2">最惠</li>
                <li :class="{'act':act==3}" @click="act=3">最新</li>
                <li :class="{'act':act==4}" @click="act=4">最爱</li>
            </ul>
            <div class="goodsmain" v-if="act==1">
                <div class="goodslist" v-for="(it,i) in zrlist" :key="i" @click="todetail(it.productId)">
                    <div class="top">
                        <img :src="it.picture" alt="">
                        <i>
                            <img :src="it.logo" alt="">
                        </i>
                    </div>
                    <div class="btm">
                        <h3>{{it.name}}</h3>
                        <h4>{{it.brand_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="goodsmain" v-if="act==2">
                <div class="goodslist" v-for="(it,i) in zhlist" :key="i" @click="todetail(it.productId)">
                    <div class="top">
                        <img :src="it.picture" alt="">
                        <i>
                            <img :src="it.logo" alt="">
                        </i>
                    </div>
                    <div class="btm">
                        <h3>{{it.name}}</h3>
                        <h4>{{it.brand_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="goodsmain" v-if="act==3">
                <div class="goodslist" v-for="(it,i) in zxlist" :key="i" @click="todetail(it.productId)">
                    <div class="top">
                        <img :src="it.picture" alt="">
                        <i>
                            <img :src="it.logo" alt="">
                        </i>
                    </div>
                    <div class="btm">
                        <h3>{{it.name}}</h3>
                        <h4>{{it.brand_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="goodsmain" v-if="act==4">
                <div class="goodslist" v-for="(it,i) in zalist" :key="i" @click="todetail(it.productId)">
                    <div class="top">
                        <img :src="it.picture" alt="">
                        <i>
                            <img :src="it.logo" alt="">
                        </i>
                    </div>
                    <div class="btm">
                        <h3>{{it.name}}</h3>
                        <h4>{{it.brand_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="btn">
                <span @click="toChooselabel()">查看全部</span>
            </div>
        </div>
    </div>
    <img class="dengji" @click="khdj()" :src="dengji" alt="">

    <el-dialog
    :visible.sync="dengjiVisible"
    :show-close="chashow"
    width="480px"
    >
        <div class="dengjishow">
            <p>
                <span>接待编号：</span>
                <input type="text" placeholder="" v-model="djbianhao" readonly="readonly">
            </p>
            <p>
                <span>客户名称：</span>
                <input type="text" placeholder="请输入客户名称" v-model="djname">
            </p>
            <p>
                <span>手机号码：</span>
                <input type="text" placeholder="请输入手机号码" v-model="djpho" maxlength="11">
            </p>
            <p>
                <span>微 信 号：</span>
                <input type="text" placeholder="请输入微信号" v-model="djwx">
            </p>
            <div class="btn">
                <i @click="dengjiVisible=false">取消</i>
                <em @click="djbtn()">登记</em>
            </div>
        </div>
    </el-dialog>
  </div>
</template>

<script>
import banner from 'Imgs/banner.png'
import bland from 'Imgs/bland.png'
import more from 'Imgs/more.png'
import more3 from 'Imgs/more3.png'
import goods from 'Imgs/goods.png'
import caidan from 'Imgs/caidan.png'
import dengji from 'Imgs/dengji.png'
import cha from 'Imgs/cha.png'

export default {
  data () {
    return {
        banner,
        bland,
        more,
        more3,
        goods,
        caidan,
        dengji,
        cha,
        act:1,
        timer: null,
        
        logos:[],
        lnum:1,
        zrlist:[],
        zhlist:[],
        zxlist:[],
        zalist:[],

        dengjiVisible:false,
        chashow:false,
        djbianhao:'',
        djname:'',
        djpho:'',
        djwx:''
    }
  },
  mounted(){
      this.torute()
      let no= JSON.parse(localStorage.getItem('user')).no
    this.$post(this.$api.brand,{ //logo
        offset:20,
        pageNum:1
    }).then(res=>{
        this.logos=res.data.list
    })
    this.$post(this.$api.hottest,{ //zuire
        offset:10,
        pageNum:1
    }).then(res=>{
        this.zrlist=res.data.list
    })
    this.$post(this.$api.favoured,{ //zuihui
        offset:10,
        pageNum:1
    }).then(res=>{
        this.zhlist=res.data.list
    })
    this.$post(this.$api.newest,{ //zuixin
        offset:10,
        pageNum:1
    }).then(res=>{
        this.zxlist=res.data.list
    })
    this.$post(this.$api.collection,{ //zuiai
        offset:10,
        creatorId:no,
        pageNum:1
    }).then(res=>{
        this.zalist=res.data.list
    })
  },
  methods:{
    torute(){
        this.$emit("torute",1)
    },
    zlogos(){
        this.lnum=this.lnum==2?1:2
        let tiao=20
        if(this.lnum!=1){
            tiao=9999
        }
        this.$post(this.$api.brand,{
        offset:tiao,
        pageNum:1
        }).then(res=>{
            this.logos=res.data.list
        })
    },
    khdj(){
        let usno= JSON.parse(localStorage.getItem('user')).no
        this.$post(this.$api.setNo,{no:usno}).then(res=>{
            this.djbianhao=res.data.No
        })
        this.dengjiVisible=true
    },
    djbtn(){
        this.timer=null
        let data={
            no:this.djbianhao,
            name:this.djname,
            mobile:this.djpho,
            wechat:this.djwx,
            creator:JSON.parse(localStorage.getItem('user')).no
        }
        this.$post(this.$api.addVisitRecord,data).then(res=>{
            this.dengjiVisible=false
            localStorage.setItem('kehu', JSON.stringify(data));
            this.$message({
                message: res.msg,
                type: '',
                duration:1500,
                center: true
            });
            this.timer = setTimeout( () => {
                location.reload()
            }, 1500)
        })
        
    },
    todetail(idnum){
        this.$router.push({ name: 'Detail', params: { id: idnum } })
    },
    toChoose(id){
      let data={
        brand:id
      }
      // this.$store.state.shanxuanobj=data
      sessionStorage.setItem('shanxuanobj', JSON.stringify(data));
      // console.log(this.$store.state.shanxuanobj)
      this.sxshow=false
      this.$router.push('/goods')
      location.reload()
    },
    toChooselabel(){
      let data={
        
      }
      if(this.act==1){
          data.hottest = 1
      }
      if(this.act==2){
          data.favoured = 1
      }
      if(this.act==3){
          data.newest = 1
      }
      if(this.act==4){
          data.collection = 1
      }
      // this.$store.state.shanxuanobj=data
      sessionStorage.setItem('shanxuanobj', JSON.stringify(data));
      // console.log(this.$store.state.shanxuanobj)
      this.sxshow=false
      this.$router.push('/goods')
      location.reload()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.shouye{
  width: 1024px;
  margin: 0 auto;
  position: relative;
  .main{
    .banner{
        height: 300px;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .bland{
        background: #282828;
        padding-bottom: 20px;
        .blandlist{
            display: flex;
            flex-wrap: wrap;
            margin-left: 12px;
            padding-top: 27px;
            img{
                width: 80px;
                height: 80px;
                margin-left: 18px;
                margin-bottom: 20px;
            }
        }
        .more{
            width: 43px;
            height: 31px;
            margin: 0 auto;
            cursor: pointer;
        }
    }
    .goods{
        background: rgba(241,241,243,1);
        ul{
            display: flex;
            margin-left: 354px;
            padding: 40px 0 22px;
            li{
                margin-right: 58px;
                color: #000;
                font-size: 16px;
                cursor: pointer;
            }
            .act{
                border-bottom: 1px solid #000;
            }
        }
        .goodsmain{
            display: flex;
            flex-wrap: wrap;
            margin-left: 33px;
            .goodslist{
                width: 192px;
                height: 278px;
                overflow: hidden;
                .top{
                    width: 192px;
                    height: 192px;
                    position: relative;
                    img{
                        width: 192px;
                        height: 192px;
                    }
                    i{
                        position: absolute;
                        width: 41px;
                        height: 41px;
                        left: 76px;
                        bottom: -20px;
                        border-radius: 50px;
                        overflow: hidden;
                        background: #fff;
                        box-shadow: 1px 1px 9px #888888;
                        img{
                            width: 41px;
                            height: 41px;
                        }
                    }
                }
                .btm{
                    h3{
                        margin-top: 26px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #333;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                    }
                    h4{
                        font-size: 14px;
                        font-weight: 400;
                        color: #666;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                    }
                }
            }
        }
        .btn{
            padding: 5px 0 20px;
            span{
                display: block;
                width: 112px;
                height: 40px;
                line-height: 40px; 
                background: #282828;
                color: #fff;
                margin: 0 auto;
                text-align: center;
                cursor: pointer;
            }
        }
    }
  }
  .dengji{
    width: 78px;
    height: 78px;
    position: fixed;
    right: 30px;
    bottom: 30px;
  }
  .dengjishow{
    margin: 0 53px;
    p{
        height: 82px;
        display: flex;
        border-bottom: 1px solid #DFDFDF;
        span{
            width: 100px;
            height: 25px;
            line-height: 25px;
            margin-top: 47px;
            font-size: 18px;
            color: #333;
        }
        input{
            border: 0;
            outline: none;
            height: 25px;
            line-height: 25px;
            margin-top: 47px;
            font-size: 18px;
            color: #333;
        }
        input::-webkit-input-placeholder {
            color: #D8D8D8;
        }
    }
    .btn{
        margin: 48px auto;
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
</style>

