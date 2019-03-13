<template>
    <div class="detail">
        <div class="head">
            <div class="top">
                <div class="lf" @click="tolunbo()">
                    <img :src="gooddata.pic" alt="">
                    <ul>
                        <li v-if="gooddata.hottest==1"><img :src="remai" alt=""></li>
                        <li v-if="gooddata.favoured==1"><img :src="tejia" alt=""></li>
                        <li v-if="gooddata.newest==1"><img :src="xinpin" alt=""></li>
                    </ul>
                </div>
                <div class="cet">
                    <h3>{{gooddata.productName}}</h3>
                    <ul>
                        <li v-if="gooddata.offPrice">惊爆价：<span style="color:red">{{gooddata.offPrice}}</span></li>
                        <li>福邸编码：{{gooddata.fordNo}}</li>
                        <!-- <li>工厂编码：{{gooddata.factoryNo}}</li> -->
                        
                        <li>品牌：{{gooddata.brandName}}</li>
                        <li>系列：{{gooddata.series}}</li>
                        <li>小类：{{gooddata.smallClass}}</li>
                        <li>重量：{{gooddata.weight}}</li>
                        <li>尺寸：{{gooddata.length}}×{{gooddata.width}}×{{gooddata.height}} mm</li>
                        <li>产地：{{gooddata.origin}}</li>
                        <li>国产进口：{{gooddata.cradle==1?'国产':'进口'}}</li>
                        <li>订货周期：{{gooddata.orderingCycle}}</li>
                    </ul>
                </div>
                <div class="rt">
                    <i @click="zuiai()">
                        <img :src="like" alt="">
                        <span>我的最爱</span>
                    </i>
                    <em @click="shouc()">
                        <img :src="xin" alt="">
                        <span>接待收藏</span>
                    </em>
                    <b>
                        <img :src="tingc" alt="" v-if="gooddata.is_stop==1">
                    </b>
                </div>
            </div>
            <p>{{gooddata.productDescribe}}</p>
        </div>
        <div class="tuijie">
            <h3>
                <i></i>
                <span>同系产品</span>
                <i></i>
            </h3>
            <div class="main">
                <div class="lf" @click="xzuo()">
                    <img :src="left" alt="">
                </div>
                <div class="cet">
                    <div class="lst" v-for="(it,i) in tjlist" :key="i" @click="todtl(it.productId)">
                        <div class="top">
                            <img :src="it.pic" alt="">
                            <i>
                                <img :src="it.logo" alt="">
                            </i>
                        </div>
                        <div class="btm">
                            <h5>{{it.waresName}}</h5>
                            <h4>{{it.brand_name}}</h4>
                        </div>
                    </div>
                </div>
                <div class="rt" @click="xyou()">
                    <img :src="right" alt="">
                </div>
            </div>
        </div>
        <div class="kucuntit">
            <h3>
                <i></i>
                <span>库存分布</span>
                <i></i>
            </h3>
        </div>
        <div class="kucun">
            <div class="lf">
                <ul class="tit">
                    <li class="wit1">仓库名称</li>
                    <li class="wit1">工厂编码</li>
                    <li class="wit1">存货名称</li>
                    <li class="wit1">规格</li>
                    <li class="wit1">面料</li>
                    <li class="wit1">材质</li>
                    <li class="wit1">备注</li>
                    <li class="wit2">价格</li>
                    <li class="wit2">实物数量</li>
                    <li class="wit2">占用量</li>
                    <li class="wit2">在途数量</li>
                    <li class="wit2">可用数量</li>
                </ul>
                <ul class="main" v-for="(it,i) in kcdata" :key="i">
                    <li class="wit1">{{it.cWhName}}</li>
                    <li class="wit1">{{it.factoryNo}}</li>
                    <li class="wit1">{{it.name}}</li>
                    <li class="wit1">{{it.cInvStd}}</li>
                    <li class="wit1">{{it.cFree1}}</li>
                    <li class="wit1">{{it.cFree2}}</li>
                    <li class="wit1">{{it.cFree6}}</li>
                    <li class="wit2">{{it.cFree7}}</li>
                    <li class="wit2">{{it.iQuantity}}</li>
                    <li class="wit2">
                        <i @click="zydtl(it)">{{it.footprint}}</i>
                    </li>
                    <li class="wit2">{{it.Qty}}</li>
                    <li class="wit2">{{it.usefulNum}}</li>
                </ul>
            </div>
            <div class="rt">
                <i></i>
                <em v-for="(it,i) in kcdata" :key="i">
                    <b @click="jishu(it)">占用</b>
                </em>
            </div>
        </div>

        <el-dialog
        :visible.sync="zyVisible"
        :show-close="chashow"
        width="521px"
        >
            <div class="zyshow">
                <ul class="tit">
                    <li>占用人</li>
                    <li>占用数量</li>
                    <li>剩余时间</li>
                </ul>
                <ul class="main" v-for="(it,i) in zydtil" :key="i">
                    <li>{{it.name}}</li>
                    <li>{{it.stockNum}}</li>
                    <li>{{it.restTime}}</li>
                </ul>
                <div class="btn">
                    <i @click="zyVisible=false">确定</i>
                </div>
            </div>
        </el-dialog>

        <el-dialog
        :visible.sync="jsVisible"
        :show-close="chashow"
        width="480px"
        >
            <div class="jsshow">
                <h3>选择数量</h3>
                <el-input-number v-model="num1" :min="0" :max="maxNUm"></el-input-number>
                <div class="btn">
                    <i @click="zybtn()">完成</i>
                </div>
            </div>
        </el-dialog>

        <el-dialog
        :visible.sync="tuVisible"
        :show-close="chashow"
        width="800px"
        >
            <div class="tushow" style="height:600px;">
                <!-- <el-carousel trigger="click" indicator-position="none" height="500px">
                    <el-carousel-item v-for="item in 4" :key="item">
                        <img :src="banner" alt="">
                    </el-carousel-item>
                </el-carousel> -->
                <div class="lunbo">
                    <mt-swipe :auto="0" :default-index="lbnum" @change="handleChange" :show-indicators="false">
                        <mt-swipe-item><img :src="banner" alt=""></mt-swipe-item>
                        <mt-swipe-item><img :src="left" alt=""></mt-swipe-item>
                        <mt-swipe-item><img :src="goods" alt=""></mt-swipe-item>
                        <mt-swipe-item><img :src="right" alt=""></mt-swipe-item>
                    </mt-swipe>
                </div>
                <ul>
                    <li :class="{'act':0==lbnum}" @click="lbnum=0">
                        <img :src="banner" alt="">
                    </li>
                    <li :class="{'act':1==lbnum}" @click="lbnum=1">
                        <img :src="left" alt="">
                    </li>
                    <li :class="{'act':2==lbnum}" @click="lbnum=2">
                        <img :src="goods" alt="">
                    </li>
                    <li :class="{'act':3==lbnum}" @click="lbnum=3">
                        <img :src="right" alt="">
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import banner from 'Imgs/banner.png'
import logo from 'Imgs/logo.png'
import goods from 'Imgs/goods.png'
import like from 'Imgs/like.png'
import xin from 'Imgs/xin.png'
import tingc from 'Imgs/tingc.png'
import left from 'Imgs/left.png'
import right from 'Imgs/right.png'
import remai from 'Imgs/remai.png'
import tejia from 'Imgs/tejia.png'
import xinpin from 'Imgs/xinpin.png'

export default {
    data () {
        return {
            banner,
            logo,
            goods,
            like,
            xin,
            tingc,
            left,
            right,
            remai,
            tejia,
            xinpin,
            zuopinid:0,

            tjdata:[],
            tjlist: [],
            zuo: 0,
            you: 4,
            gooddata:{},
            kcdata:[],
            wdata:{},
            zydtil:[],

            zyVisible:false,
            chashow:false,

            jsVisible:false,
            num1:1,

            tuVisible:false,
            lbnum:0,
            maxNUm:3
        }
    },
    mounted() {
        this.zuopinid = this.$route.params.id
        // this.tjlist = this.tjdata.slice(this.zuo, this.you)
        this.lbnum=1

        this.getdata()
    },
    watch: {
    　　'$route': function (to, from) {
            this.zuopinid=to.params.id
            this.getdata()
    　　}
    },
    methods:{
        getdata(){
            this.$post(this.$api.productDetail,{productId:this.zuopinid}).then(res=>{
                this.gooddata=res.data
                this.$post(this.$api.sameSeries,{series:this.gooddata.seriesId, id:this.gooddata.id}).then(res=>{
                    this.tjdata=res.data
                    this.tjlist = this.tjdata.slice(this.zuo, this.you)
                })
                this.$post(this.$api.productSpread,{waresCode:this.gooddata.fordNo,productId:this.zuopinid}).then(res=>{
                    this.kcdata=res.data
                })
            })
        },
        tolunbo(){
            this.$router.push({ name: 'Lunbo', params: { id: this.zuopinid } })
        },
        todtl(idnum){
            this.$router.push({ name: 'Detail', params: { id: idnum } })
            location.reload()
        },
        shouc(){
            let usno= JSON.parse(localStorage.getItem('kehu')) ?JSON.parse(localStorage.getItem('kehu')).no : ''
            if(usno){
                this.$post(this.$api.addVisitCollection,{
                    no:usno,
                    waresId:this.zuopinid,
                    waresCode:this.gooddata.fordNo,
                    waresName:this.gooddata.productName
                }).then(res=>{
                    this.$message({
                        message: res.msg,
                        type: '',
                        duration:1500,
                        center: true
                    });
                })
            }else{
                this.$message({
                    message: '请先添加客户登记',
                    type: '',
                    duration:1500,
                    center: true
                });
            }
        },
        zuiai(){
            let usno= JSON.parse(localStorage.getItem('user')).no
            this.$post(this.$api.mycollection,{
                creator:usno,
                waresId:this.zuopinid,
                waresCode:this.gooddata.fordNo,
                waresName:this.gooddata.productName
            }).then(res=>{
                this.$message({
                    message: res.msg,
                    type: '',
                    duration:1500,
                    center: true
                });
            })
        },
        xzuo() {
            if (this.zuo > 0) {
                this.tjlist = this.tjdata.slice(--this.zuo, --this.you)
            }
        },
        xyou() {
            if (this.zuo < (this.tjdata.length - 4)) {
                this.tjlist = this.tjdata.slice(++this.zuo, ++this.you)
            }
        },
        jishu(dt){
            this.wdata=dt
            this.num1=0
            this.jsVisible=true
            this.maxNUm = parseInt(dt.usefulNum)
        },
        zybtn(){
            this.jsVisible=false
            if(this.num1==0){
                this.$message({
                    message: '无可用数量',
                    type: '',
                    duration:1500,
                    center: true
                });
                return ;
            }
           
            let usno= JSON.parse(localStorage.getItem('user')).no
            this.$post(this.$api.startStock,{
                createdBy:usno,
                waresId:this.wdata.waresId,
                warehouseName: this.wdata.cWhName,
                waresName :this.wdata.name,
                factoryNo: this.wdata.factoryNo,
                waresCode:this.gooddata.fordNo,
                footprint:this.num1,
                specification:this.wdata.cInvStd,
                fabric:this.wdata.cFree1,
                material:this.wdata.cFree2,
                price:this.wdata.cFree7,
                remark:this.wdata.cFree6
            }).then(res=>{
                this.$message({
                    message: res.msg,
                    type: '',
                    duration:1500,
                    center: true
                });
                this.wdata.footprint= this.wdata.footprint+ this.num1
            })
        },
        zydtl(it){
            this.zyVisible=true
            let usno= JSON.parse(localStorage.getItem('user')).no
            this.$post(this.$api.stockDetails,{
                createdBy:usno,
                waresId: it.waresId,
                warehouseName: it.cWhName,
                waresName :it.name,
                factoryNo: it.factoryNo,
                waresCode: this.gooddata.fordNo,
                specification:it.cInvStd,
                fabric:it.cFree1,
                material:it.cFree2,
                price:it.cFree7,
                remark:it.cFree6
            }).then(res=>{
                this.zydtil=res.data
            })
        },
        handleChange(i){
            console.log(i)
            this.lbnum=i
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.detail{
    .head{
        padding: 20px 30px;
        border-top: 1px solid #979797;
        .top{
            display: flex;
            .lf{
                width: 310px;
                height: 310px;
                position: relative;
                margin-right: 50px;
                >img{
                    width: 310px;
                    height: 310px;
                }
                ul{
                    position: absolute;
                    right: 5px;
                    bottom: 5px;
                    li{
                        height: 30px;
                        width: 30px;
                        margin-bottom: 10px;
                        img{
                            height: 30px;
                            width: 30px;
                        }
                    }
                }
            }
            .cet{
                h3{
                    height: 30px;
                    line-height: 30px;
                    color: #333;
                    font-size: 21px;
                    margin-bottom: 10px;
                    width: 425px;
                    overflow: hidden;
                }
                ul{
                    li{
                        height: 20px;
                        line-height: 20px;
                        font-size: 14px;
                        color: #999;
                        margin-bottom: 8px;
                    }
                }
            }
            .rt{
                i,em{
                    display: flex;
                    height: 50px;
                    line-height: 50px;
                    width: 180px;
                    background: #717171;
                    color: #fff;
                    border-radius: 4px;
                }
                i{
                    margin-bottom: 23px;
                    img{
                        width: 21px;
                        height: 18px;
                        margin: 16px 5px 0 41px;
                    }
                }
                em{
                    background: #37383A;
                    margin-bottom: 55px;
                    img{
                        width: 19px;
                        height: 18px;
                        margin: 16px 5px 0 43px;
                    }
                }
                b{
                    display: block;
                    width: 132px;
                    height: 132px;
                    margin-left: 24px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        p{
            font-size: 14px;
            color: #666;
            line-height: 20px;
        }
    }
    .tuijie{
        background: #F4F4F4;
        h3{
            height: 65px;
            line-height: 65px;
            display: flex;
            justify-content: center;
            span{
                font-size: 18px;
                color: #000;
                margin: 0 10px;
            }
            i{
                height: 0;
                width: 134px;
                border-bottom: 1px solid #333333;
                margin-top: 33px;
            }
        }
        .main{
            display: flex;
            .lf,.rt{
                height: 32px;
                width: 32px;
                img{
                    height: 32px;
                    width: 32px; 
                }
            }
            .lf{
                margin: 91px 37px 0 30px;
            }
            .rt{
                margin: 91px 0 0 19px;
            }
            .cet{
                width: 845px;
                height: 278px;
                display: flex;
                // justify-content: space-between;
                overflow: hidden;
                flex-wrap: wrap;
                .lst{
                    width: 192px;
                    height: 278px;
                    overflow: hidden;
                    margin-right: 19px;
                    .top{
                        width: 192px;
                        height: 192px;
                        position: relative;
                        >img{
                            width: 100%;
                            height: 100%;
                        }
                        i{
                            position: absolute;
                            height: 39px;
                            width: 39px;
                            border-radius: 50%;
                            overflow: hidden;
                            left: 77px;
                            bottom: -20px;
                            img{
                                height: 39px;
                                width: 39px;
                            }
                        }
                    }
                    .btm{
                        h5{
                            height: 20px;
                            font-size: 14px;
                            color: #333;
                            margin-top: 26px;
                            line-height: 20px;
                            text-align: center;
                        }
                        h4{
                            height: 20px;
                            font-size: 14px;
                            color: #666;
                            line-height: 20px;
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    .kucuntit{
        h3{
            height: 65px;
            line-height: 65px;
            display: flex;
            justify-content: center;
            span{
                font-size: 18px;
                color: #000;
                margin: 0 10px;
            }
            i{
                height: 0;
                width: 134px;
                border-bottom: 1px solid #333333;
                margin-top: 33px;
            }
        }
    }
    .kucun{
        position: relative;
        .lf{
            overflow-y: auto;
            .tit{
                background: #CACACA;
                border-top: 1px solid #979797;
            }
            .main{
                i{
                    padding: 5px;
                    background: #ECECEC;
                }
            }
        }
        .rt{
            position: absolute;
            right: 0;
            top: 0;
            width: 103px;
            background: #fff;
            border-top: 1px solid #979797;
            i{
                display: block;
                height: 50px;
                background: #CACACA;
                border-bottom: 1px solid #979797;
                border-left: 1px solid #979797;
            }
            em{
                display: block;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid #979797;
                border-left: 1px solid #979797;
                color: #fff;
                b{
                    padding: 5px 15px;
                    background: #37383A;
                    border-radius: 4px;
                }
            }
        }
        ul{
            display: flex;
            width: 1850px;
            padding-right: 103px;
            border-left: 1px solid #979797;
            li{
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid #979797;
                border-right: 1px solid #979797;
            }
            .wit1{
                width: 174px;
            }
            .wit2{
                width: 126px;
            }
        }
    }
    .zyshow{
        ul{
            display: flex;
            border-left: 1px solid #979797;
            li{
                width: 174px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                border-bottom: 1px solid #979797;
                border-right: 1px solid #979797;
            }
        }
        .tit{
            background: #CACACA;
            color: #666;
        }
        .main{
            color: #000;
        }
        .btn{
            padding-bottom: 30px;
            i{
                display: block;
                margin:30px 0 0 171px;
                background: #37383A;
                width: 180px;
                height: 50px;
                line-height: 50px;
                text-align: center;
                color: #fff;
                border-radius: 4px;
            }
        }
    }
    .jsshow{
        h3{
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: #333;
            font-size: 21px;
            padding: 54px 0 37px;
        }
        .btn{
            padding: 48px 0 54px;
            i{
                display: block;
                height: 50px;
                line-height: 50px;
                width: 180px;
                font-size: 18px;
                color: #fff;
                margin: 0 auto;
                background: #37383A;
                border-radius: 4px;
                text-align: center;
            }
        }
    }
    .tushow{
        background: #000;
        .lunbo{
            height: 500px;
        }
        img{
            height: 100%;
            margin: 0 auto;
        }
        ul{
            display: flex;
            justify-content: center;
            margin-top: 35px;
            li{
                height: 39px;
                width: 39px;
                overflow: hidden;
                margin: 0 2px;
            }
            .act{
                border: 1px solid red;
                margin: 0 4px;
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

