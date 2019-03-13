<template>
  <div class="head">
    <div class="top">
      <h3><i v-if="kehuno">当前接待：{{kehuno}}</i></h3>
      <h4>
        <img :src="usert" alt="">
        <i>{{username}}</i>
      </h4>
    </div>
    <div class="foot">
      <b @click="fanhui()">
        <img :src="houtui" alt="">
      </b>
      <i>
        <img :src="logo" alt="">
      </i>
      <em>
        <img @click="sxshow=true" :src="shaixuan" alt="">
        <img @click="cdshow=true" :src="caidan" alt="">
      </em>
    </div>

    <div class="sxshow" v-if="sxshow">
      <div class="sxmain">

        <div class="cpmc">
          <input type="text" placeholder="产品名称 / 府邸编码" v-model="sxname">
        </div>

        <div class="cd">
          <h3>长度区间</h3>
          <div class="btm">
            <p>
              <input type="text" v-model="sxzuixiaomm">
              <span>mm</span>
            </p>
            <i></i>
            <p>
              <input type="text" v-model="sxzuidamm">
              <span>mm</span>
            </p>
          </div>
        </div>

        <div class="jg">
          <h3>库存价格区间</h3>
          <div class="btm">
            <p>
              <input type="text" v-model="sxzuixiaoyuan">
              <span>元</span>
            </p>
            <i></i>
            <p>
              <input type="text" v-model="sxzuidayuan">
              <span>元</span>
            </p>
          </div>
        </div>

        <div class="gn">
          <h3>功能</h3>
          <ul>
            <li :class="{'act':gnact==1}" @click="gnact==1?gnact='':gnact=1">客厅</li>
            <li :class="{'act':gnact1==2}" @click="gnact1==2?gnact1='':gnact1=2">餐厅</li>
            <li :class="{'act':gnact2==3}" @click="gnact2==3?gnact2='':gnact2=3">卧室</li>
            <li :class="{'act':gnact3==4}" @click="gnact3==4?gnact3='':gnact3=4">其他</li>
          </ul>
        </div>

        <div class="bq">
          <h3>标签</h3>
          <ul>
            <li :class="{'act':bqact==1}" @click="bqact==1?bqact='':bqact=1">最热</li>
            <li :class="{'act':bqact1==2}" @click="bqact1==2?bqact1='':bqact1=2">最惠</li>
            <li :class="{'act':bqact2==3}" @click="bqact2==3?bqact2='':bqact2=3">最新</li>
          </ul>
        </div>

        <!-- <div class="fl">
          <h3>分类</h3>
          <el-select size="small" filterable style="width:309px;height:30px;margin-bottom:10px;" v-model="fld" placeholder="请选择大类">
            <el-option
              v-for="item in ldalei"
              :key="item.bigRangeId"
              :label="item.bigRange"
              :value="item.bigRangeId">
            </el-option>
          </el-select>
          <el-select @click.native="xiaolei()" size="small" filterable style="width:309px;height:30px;" v-model="flx" placeholder="请选择小类">
            <el-option
              v-for="item in lxiaolei"
              :key="item.smallRangeId"
              :label="item.samllRange"
              :value="item.smallRangeId">
            </el-option>
          </el-select>
        </div> -->
        <div class="fl">
          <h3>分类</h3>
          <div class="dal">
            <input type="text" v-model="dalval" placeholder="请选择大类" @input="sdal()" @focus="dalfocus()" @blur="dalblur()">
            <ul v-if="dalshow">
              <li v-for="(it,i) in ldalei" :key="i" @click="fld=it.bigRangeId;dalval=it.bigRange">{{it.bigRange}}</li>
            </ul>
          </div>
          <div class="xiaol">
            <input type="text" v-model="xiaolval" placeholder="请选择小类" @input="sxiaol()" @focus="xiaolfocus()" @blur="xiaolblur()">
            <ul v-if="xiaolshow">
              <li v-for="(it,i) in lxiaolei" :key="i" @click="flx=it.smallRangeId;xiaolval=it.samllRange">{{it.samllRange}}</li>
            </ul>
          </div>
        </div>

        <!-- <div class="pp">
          <h3>品牌</h3>
          <el-select size="small" filterable style="width:309px;height:30px;margin-bottom:10px;" v-model="pppp" placeholder="请选择品牌">
            <el-option
              v-for="item in lpinpai"
              :key="item.brandId"
              :label="item.brand"
              :value="item.brandId">
            </el-option>
          </el-select>
          <el-select @click.native="xilie()" size="small" filterable style="width:309px;height:30px;" v-model="ppxl" placeholder="请选择系列">
            <el-option
              v-for="item in lxilie"
              :key="item.seriesId"
              :label="item.series"
              :value="item.seriesId">
            </el-option>
          </el-select>
        </div> -->
        <div class="pp">
          <h3>品牌</h3>
          <div class="dal">
            <input type="text" v-model="ppval" placeholder="请选择品牌" @input="spp()" @focus="ppfocus()" @blur="ppblur()">
            <ul v-if="ppshow">
              <li v-for="(it,i) in lpinpai" :key="i" @click="pppp=it.brandId;ppval=it.brand">{{it.brand}}</li>
            </ul>
          </div>
          <div class="xiaol">
            <input type="text" v-model="lxval" placeholder="请选择系列" @input="slx()" @focus="lxfocus()" @blur="lxblur()">
            <ul v-if="lxshow">
              <li v-for="(it,i) in lxilie" :key="i" @click="ppxl=it.seriesId;lxval=it.series">{{it.series}}</li>
            </ul>
          </div>
        </div>

        <div class="heb">
          <div class="kc">
            <h3>库存状态</h3>
            <ul>
              <li :class="{'act':kcact==2}" @click="kcact==2?kcact='':kcact=2">现货</li>
              <li :class="{'act':kcact1==1}" @click="kcact1==1?kcact1='':kcact1=1">在途</li>
            </ul>
          </div>

          <div class="gc">
            <h3>国产进口</h3>
            <ul>
              <li :class="{'act':gcact==2}" @click="gcact==2?gcact='':gcact=2">进口</li>
              <li :class="{'act':gcact1==1}" @click="gcact1==1?gcact1='':gcact1=1">国产</li>
            </ul>
          </div>
        </div>
        

        <div class="cp">
          <h3>产品状态</h3>
          <ul>
            <li :class="{'act':cpact=='0'}" @click="cpact=='0'?cpact='':cpact='0'">正常</li>
            <li :class="{'act':cpact1=='1'}" @click="cpact1=='1'?cpact1='':cpact1='1'">停产</li>
          </ul>
        </div>

        <div class="btn">
          <i @click="czbtn()">重置</i>
          <em @click="sxbtn()">确定</em>
        </div>

        <!-- <div class="fucha" @click="sxshow=false">
          <img :src="youjt" alt="">
        </div> -->

      </div>
    </div>

    <div class="caidanshow" v-if="cdshow">
        <img @click="cdshow=false" :src="cha" alt="">
        <ul>
            <li :class="{'actv':actv==1}" @click="tort(1)">产品首页</li>
            <li :class="{'actv':actv==2}" @click="tort(2)">产品收藏</li>
            <li :class="{'actv':actv==3}" @click="tort(3)">客户登记</li>
            <li :class="{'actv':actv==4}" @click="tort(4)">库存占用</li>
            <li :class="{'actv':actv==5}" @click="tort(5)">我的最爱</li>
            <li :class="{'actv':actv==6}" @click="tort(6)">报价单</li>
        </ul>
        <i @click="xiugaiVisible=true">修改密码</i>
        <em @click="tuichuVisible=true">退出登录</em>
    </div>

    <div class="bj" v-if="sxshow || cdshow" @click="sxshow=false;cdshow=false"></div>

    <el-dialog
    :visible.sync="xiugaiVisible"
    :show-close="chashow"
    width="480px"
    >
      <div class="xiugaishow">
        <h3>修改密码</h3>
        <p>
            <span>原 密 码：</span>
            <input type="password" placeholder="请输入原密码" v-model="yuanpass">
        </p>
        <p>
            <span>新 密 码：</span>
            <input type="password" placeholder="请输入新密码" v-model="xinpass">
        </p>
        <p>
            <span>确认密码：</span>
            <input type="password" placeholder="请再次输入新密码" v-model="quepass">
        </p>
        <div class="btn">
            <i @click="xiugaiVisible=false">取消</i>
            <em @click="passbtn()">确定</em>
        </div>
      </div>
    </el-dialog>

    <el-dialog
    :visible.sync="tuichuVisible"
    :show-close="chashow"
    width="480px"
    >
      <div class="tuichushow">
        <h3>您是否确定退出系统?</h3>
        <div class="btn">
            <i @click="tuichuVisible=false">取消</i>
            <em @click="btn()">确定</em>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import logo from 'Imgs/logo.png'
import usert from 'Imgs/usert.png'
import shaixuan from 'Imgs/shaixuan.png'
import caidan from 'Imgs/caidan.png'
import cha from 'Imgs/cha.png'
import youjt from 'Imgs/youjt.png'
import houtui from 'Imgs/houtui.png'

export default {
  data () {
    return {
      shaixuan,
      logo,
      usert,
      caidan,
      cha,
      youjt,
      houtui,
      cdshow:false,
      // actv:1,

      kehuno:'',
      username:'',

      sxshow:false,    //删选
      sxname:'',
      sxzuixiaomm:'',
      sxzuidamm:'',
      sxzuixiaoyuan:'',
      sxzuidayuan:'',
      fld:'',
      dalval:'',
      flx:'',
      xiaolval:'',
      pppp:'',
      ppval:'',
      ppxl:'',
      lxval:'',
      ldalei:[],
      dalshow:false,
      lxiaolei:[],
      xiaolshow:false,
      lpinpai:[],
      ppshow:false,
      lxilie:[],
      lxshow:false,
      gnact:'',  //
      gnact1:'',
      gnact2:'',
      gnact3:'',
      bqact:'',  //
      bqact1:'',
      bqact2:'',
      kcact:'',  //
      kcact1:'',
      gcact:'',  //
      gcact1:'',
      cpact:'',  //
      cpact1:'',
      yema:1,
      tiaonum:20,

      xiugaiVisible:false,
      chashow:false,
      yuanpass:'',
      xinpass:'',
      quepass:'',

      tuichuVisible:false
    }
  },
  props: {
    actv: {
      default: 1,
      required: false,
      type: Number
    }
  },
  mounted(){
    let name= JSON.parse(localStorage.getItem('user')).name
    this.username = name?name:'';
    this.getkehuno()

  },
  methods: {
    fanhui(){
      this.$router.back()
    },
    sdal(){
      console.log(this.dalval)
      this.$post(this.$api.bigRange,{bigRange:this.dalval}).then(res=>{  //大类
        this.ldalei=res.data
      })
    },
    dalfocus(){
      this.$post(this.$api.bigRange,{bigRange:this.dalval}).then(res=>{  //大类
        this.ldalei=res.data
      })
      this.dalshow=true
    },
    dalblur(){
      setTimeout( () => {
        this.dalshow=false
      }, 100)
    },
    sxiaol(){
      this.$post(this.$api.smallRange,{Id:this.fld,smallRange:this.xiaolval}).then(res=>{  //小类
        this.lxiaolei=res.data
      })
    },
    xiaolfocus(){
      this.$post(this.$api.smallRange,{Id:this.fld,smallRange:this.xiaolval}).then(res=>{  //小类
        this.lxiaolei=res.data
      })
      this.xiaolshow=true
    },
    xiaolblur(){
      setTimeout( () => {
        this.xiaolshow=false
      }, 100)
    },
    spp(){
      this.$post(this.$api.productbrand,{brandName:this.ppval}).then(res=>{  //品牌
        this.lpinpai=res.data
      })
    },
    ppfocus(){
      this.$post(this.$api.productbrand,{brandName:this.ppval}).then(res=>{  //品牌
        this.lpinpai=res.data
      })
      this.ppshow=true
    },
    ppblur(){
      setTimeout( () => {
        this.ppshow=false
      }, 100)
    },
    slx(){
      this.$post(this.$api.series,{Id:this.pppp,seriesName:this.lxval}).then(res=>{  //系列
        this.lxilie=res.data
      })
    },
    lxfocus(){
      this.$post(this.$api.series,{Id:this.pppp,seriesName:this.lxval}).then(res=>{  //系列
        this.lxilie=res.data
      })
      this.lxshow=true
    },
    lxblur(){
      setTimeout( () => {
        this.lxshow=false
      }, 100)
    },

    xiaolei(){
      // this.$post(this.$api.smallRange,{Id:this.fld}).then(res=>{  //小类
      //   this.lxiaolei=res.data
      // })
    },
    xilie(){
      // this.$post(this.$api.series,{Id:this.pppp}).then(res=>{  //系列
      //   this.lxilie=res.data
      // })
    },
    sxbtn(){
      let gnactarr=[]
      let gnactstr=''
      if(this.gnact){
        gnactarr.push(this.gnact)
      }
      if(this.gnact1){
        gnactarr.push(this.gnact1)
      }
      if(this.gnact2){
        gnactarr.push(this.gnact2)
      }
      if(this.gnact3){
        gnactarr.push(this.gnact3)
      }
      if(gnactarr.length>0){
        gnactstr=gnactarr.join(',')
      }

      let kcactarr=[]
      let kcactstr=''
      if(this.kcact){
        kcactarr.push(this.kcact)
      }
      if(this.kcact1){
        kcactarr.push(this.kcact1)
      }
      if(kcactarr.length>0){
        kcactstr=kcactarr.join(',')
      }

      let cpactarr=[]
      let cpactstr=''
      if(this.cpact){
        cpactarr.push(this.cpact)
      }
      if(this.cpact1){
        cpactarr.push(this.cpact1)
      }
      if(cpactarr.length>0){
        cpactstr=cpactarr.join(',')
      }

      let gcactarr=[]
      let gcactstr=''
      if(this.gcact){
        gcactarr.push(this.gcact)
      }
      if(this.gcact1){
        gcactarr.push(this.gcact1)
      }
      if(gcactarr.length>0){
        gcactstr=gcactarr.join(',')
      }

      let data={
        name:this.sxname,
        minLength:this.sxzuixiaomm,
        maxLength:this.sxzuidamm,
        minPrice:this.sxzuixiaoyuan,
        maxPrice:this.sxzuidayuan,
        function:gnactstr,
        hottest:this.bqact==1?1:'',
        favoured:this.bqact1==2?1:'',
        newest:this.bqact2==3?1:'',
        bigClass:this.fld,
        smallClass:this.flx,
        brand:this.pppp,
        series:this.ppxl,
        stock:kcactstr,
        producting:cpactstr,
        crandle:gcactstr
      }
      // this.$store.state.shanxuanobj=data
      sessionStorage.setItem('shanxuanobj', JSON.stringify(data));
      // console.log(this.$store.state.shanxuanobj)
      this.sxshow=false
      this.$router.push('/goods')
      location.reload()
    },
    czbtn(){
      this.sxname=''
      this.sxzuixiaomm=''
      this.sxzuidamm=''
      this.sxzuixiaoyuan=''
      this.sxzuidayuan=''
      this.gnact=''
      this.gnact1=''
      this.gnact2=''
      this.gnact3=''
      this.bqact=''
      this.bqact1=''
      this.bqact2=''
      this.fld=''
      this.flx=''
      this.pppp=''
      this.ppxl=''
      this.kcact=''
      this.kcact1=''
      this.cpact=''
      this.cpact1=''
      this.gcact=''
      this.gcact1=''
    },
    getkehuno(){
      let kehuxx = JSON.parse(localStorage.getItem('kehu'));
      let kehu = kehuxx ? kehuxx : '';
      if(kehu.name){
        return this.kehuno=kehu.name
      }else if(kehu.mobile){
        return this.kehuno=kehu.mobile
      }else if(kehu.wechat){
        return this.kehuno=kehu.wechat
      }else if(kehu.no){
        return this.kehuno=kehu.no
      }
    },
    tort(num){
      // this.actv=num
      this.cdshow=false
      if(num==1){
        this.$router.push('/')
      }else if(num==2){
        this.$router.push('/schang')
      }else if(num==3){
        this.$router.push('/jiedai')
      }else if(num==4){
        this.$router.push('/kucun')
      }else if(num==5){
        this.$router.push('/xihuan')
      }else if(num==6){
        this.$router.push('/baojia')
      }
    },
    passbtn(){
      let usid= JSON.parse(localStorage.getItem('user')).id
      this.$post(this.$api.modifyPsw,{
          id:usid,
          oldPassword:this.yuanpass,
          newPassword:this.xinpass,
          nextPassword:this.quepass
      }).then(res=>{
        this.xiugaiVisible=false
        this.$message({
          message: res.msg,
          type: '',
          duration:1500,
          center: true
        });
      })
    },
    btn(){
      this.tuichuVisible=false
      localStorage.removeItem('user')
      localStorage.removeItem('kehu')
      this.$router.push('/login')
      // this.$message({
      //   message: '修改密码成功',
      //   type: '',
      //   duration:1500,
      //   center: true
      // });
    },
    aaa(){
      console.log(this.fld)
      console.log(this.flx)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.head{
  width: 1024px;
  margin: 0 auto;
  position: relative;
  .top{
    padding: 0 35px;
    height: 35px;
    background: #393835;
    display: flex;
    justify-content: space-between;
    h3,h4{
      font-size: 16px;
      color: #fff;
      font-weight: 400;
      line-height: 35px;
    }
    h4{
      display: flex;
      img{
        width: 17px;
        height: 17px;
        margin: 9px 5px 0 0;
      }
    }
  }
  .foot{
    padding: 0 30px;
    height: 65px;
    background: #000000;
    position: relative;
    // display: flex;
    // justify-content: space-between;
    // img{
    //   margin-top: 13px;
    // }
    i{
      display: block;
      width: 118px;
      height: 40px;
      margin: 0 auto;
      padding-top: 13px;
      img{
        width: 118px;
        height: 40px;
      }
    }
    b{
      position: absolute;
      left: 30px;
      top: 13px;
      img{
        width: 40px;
        height: 40px;
      }
    }
    em{
      display: flex;
      position: absolute;
      right: 30px;
      top: 13px;
      img{
        width: 40px;
        height: 40px;
        margin-left: 30px;
      }
    }
  }
  .sxshow{
    position: absolute;
    z-index: 14;
    right: 0;
    top: 0;
    width: 573px;
    height: 768px;
    background: #fff;
    .sxmain{
      padding: 20px 0 0 48px;
      h3{
        font-size: 12px;
        font-weight: 400;
        color: #666;
        height: 17px;
        line-height: 17px;
        margin: 15px 0 5px;
      }
      input{
        border: 0;
        outline: none;
      }
      li{
        background: #F4F4F4;
        color: #333;
      }
      .act{
        background: #717171;
        color: #fff;
      }
      .cpmc{
        width: 510px;
        height: 30px;
        input{
          width: 510px;
          height: 30px;
          border: 0;
          outline: none;
          background: #F4F4F4;
          text-indent: 30px;
          line-height: 30px;
        }
        input::-webkit-input-placeholder {
            color: #C0C0C6;
        }
      }
      .cd{
        .btm{
          display: flex;
          p{
            width: 235px;
            height: 30px;
            background: #F4F4F4;
            display: flex;
            input{
              background: #F4F4F4;
              text-indent: 10px;
            }
            span{
              line-height: 27px;
              font-size: 14px;
              color: #333;
            }
          }
          i{
            height: 15px;
            width: 26px;
            border-bottom: 1px solid #CACACA;
            margin: 0 7px;
          }
        }
      }
      .jg{
        .btm{
          display: flex;
          p{
            width: 235px;
            height: 30px;
            background: #F4F4F4;
            display: flex;
            input{
              background: #F4F4F4;
              text-indent: 10px;
              width: 195px;
            }
            span{
              line-height: 27px;
              font-size: 14px;
              color: #333;
            }
          }
          i{
            height: 15px;
            width: 26px;
            border-bottom: 1px solid #CACACA;
            margin: 0 7px;
          }
        }
      }
      .gn{
        ul{
          display: flex;
          li{
            width: 115px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            // background: #F4F4F4;
            font-size: 14px;
            margin-right: 17px;
          }
        }
      }
      .bq{
        ul{
          display: flex;
          li{
            width: 160px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            // background: #F4F4F4;
            font-size: 14px;
            // color: #333;
            margin-right: 15px;
          }
        }
      }
      .fl,.pp{
        .dal,.xiaol{
          position: relative;
          ul{
              position: absolute;
              z-index: 6;
              top: 33px;
              left: 0;
          }
        }
        .dal{
          margin-bottom: 10px;
        }
        input{
          width: 310px;
          height: 28px;
          line-height: 28px;
          border: 1px solid #979797;
          border-radius: 3px;
          text-indent: 10px;
        }
        ul{
          width: 310px;
          max-height: 200px;
          overflow-y: auto;
          border: 1px solid #979797;
          border-radius: 3px;
          li{
            background: #fff;
            height: 30px;
            line-height: 30px;
          }
        }
      }
      .heb{
        display: flex;
        justify-content: space-between;
      }
      .kc,.gc,.cp{
        ul{
          display: flex;
          li{
            width: 110px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            // background: #F4F4F4;
            font-size: 14px;
            // color: #333;
            margin-right: 10px;
          }
        }
      }
      .btn{
        display: flex;
        margin-top: 35px;
        i,em{
          width: 180px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          font-size: 18px;
          color: #fff;
          border-radius: 4px;
        }
        i{
          margin: 0 15px 0 68px;
          background: #717171;
        }
        em{
          background: #37383A;
        }
      }
      .fucha{
        width: 55px;
        height: 55px;
        background: #fff;
        border-radius: 50%;
        position: absolute;
        top: 356px;
        left: -28px;
        border: 1px solid #F4F4F4;
        img{
          width: 17px;
          height: 27px;
          margin: 14px 0 0 20px;
        }
      }
    }
    // .bj{
    //   background: #000000;
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    // }
  }
  .caidanshow{
    position: absolute;
    z-index: 13;
    right: 0;
    top: 0;
    width: 299px;
    height: 768px;
    background: #fff;
    img{
        width: 17px;
        height: 17px;
        position: absolute;
        top: 20px;
        right: 20px;
    }
    ul{
        margin-top: 70px;
        margin-bottom: 128px;
        li{
            height: 70px;
            width: 100%;
            line-height: 70px;
            text-align: center;
            font-size: 18px;
            color: #333;
        }
        .actv{
            background: #37383A;
            color: #fff;
        }
    }
    i,em{
        display: block;
        width: 240px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #EFEFEF;
        color: #333;
        margin: 0 auto;
    }
    i{
        margin-bottom: 20px;
    }
  }
  .bj{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 12;
    background: #000000;
    opacity: 0.3;
  }
  .xiugaishow{
    margin: 0 53px;
    h3{
      font-size: 21px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #333;
      padding-top: 60px;
    }
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
  .tuichushow{
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
