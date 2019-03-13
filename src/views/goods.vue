<template>
    <div class="goods">
        <div class="head">
            <img @click="tab('dd')" v-if="datu" :src="xiand1" alt="">
            <img @click="tab('dd')" v-else :src="xiand2" alt="">
            <img @click="tab('xx')" v-if="xiaotu" :src="xianx1" alt="">
            <img @click="tab('xx')" v-else :src="xianx2" alt="">
        </div>
        <div v-if="data.length>0"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="100">
            <div class="mainone" v-if="datu">
                <div class="tabone" v-for="(it,i) in data" :key="i" @click="todetail(it.id)">
                    <div class="top">
                        <img :src="it.picture" alt="">
                        <ul>
                            <li v-if="it.hottest==1"><img :src="remai" alt=""></li>
                            <li v-if="it.favoured==1"><img :src="tejia" alt=""></li>
                            <li v-if="it.newest==1"><img :src="xinpin" alt=""></li>
                        </ul>
                    </div>
                    <div class="btm">
                        <h3>{{it.name}}</h3>
                        <h4>{{it.brand_name}}</h4>
                    </div>
                </div>
            </div>
            <div class="maintwo" v-else>
                <div class="tabtwo" v-for="(it,i) in data" :key="i" @click="todetail(it.id)">
                    <div class="lf">
                        <img :src="it.picture" alt="">
                    </div>
                    <ul>
                        <li>
                            <i>品牌</i>
                            <em>{{it.brand_name}}</em>
                        </li>
                        <li>
                            <i>系列</i>
                            <em>{{it.series_name}}</em>
                        </li>
                        <li>
                            <i>福邸编码</i>
                            <em>{{it.ford_no}}</em>
                        </li>
                        <li>
                            <i>名称</i>
                            <em>{{it.name}}</em>
                        </li>
                        <li>
                            <i>小类</i>
                            <em>{{it.small_class_name}}</em>
                        </li>
                        <li>
                            <i>尺寸</i>
                            <em>{{it.length}}×{{it.width}}×{{it.height}} cm</em>
                        </li>
                    </ul>
                    <div class="posi">
                        <img v-if="it.is_stop==1" :src="tingc" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import xiand1 from 'Imgs/xiand1.png'
import xiand2 from 'Imgs/xiand2.png'
import xianx1 from 'Imgs/xianx1.png'
import xianx2 from 'Imgs/xianx2.png'
import goods from 'Imgs/goods.png'
import remai from 'Imgs/remai.png'
import tejia from 'Imgs/tejia.png'
import xinpin from 'Imgs/xinpin.png'
import tingc from 'Imgs/tingc.png'

export default {
    data () {
        return {
            xiand1,
            xiand2,
            xianx1,
            xianx2,
            goods,
            remai,
            tejia,
            xinpin,
            tingc,
            loading:false,
            
            shanxuanobj:{},
            data:[],
            yema:1,
            tiaonum:20,

            datu:true,
            xiaotu:false
        }
    },
    mounted(){
        let lcdatu= JSON.parse(localStorage.getItem('datu'))
        if(lcdatu==1){
            this.datu=true
            this.xiaotu=false
        }else if(lcdatu==2){
            this.datu=false
            this.xiaotu=true
        }
        this.shanxuanobj = JSON.parse(sessionStorage.getItem('shanxuanobj'));
        this.ssbtn()
    },
    computed:{
        // count () {
        //     return this.$store.state.shanxuanobj
        // }
    },
    methods:{
        loadMore(){
            this.yema++
            this.loading = true
            this.ssbtn()
        },
        ssbtn(){
            this.$post(this.$api.productChoose,{
                ...this.shanxuanobj,
                offset:this.tiaonum,
                pageNum:this.yema
            }).then(res=>{  //删选
                this.data=this.data.concat(res.data.list)
                if(res.data.list.length<this.tiaonum){
                    this.loading = true;
                }else{
                    this.loading = false;
                }
            })
        },
        tab(val){
            if(val=='dd' && !this.datu){
                this.datu=!this.datu
                this.xiaotu=!this.xiaotu
                if(this.datu){
                    localStorage.setItem('datu', '1');
                }else{
                    localStorage.setItem('datu', '2');
                }
            }
            if(val=='xx' && !this.xiaotu){
                this.datu=!this.datu
                this.xiaotu=!this.xiaotu
                if(this.datu){
                    localStorage.setItem('datu', '1');
                }else{
                    localStorage.setItem('datu', '2');
                }
            }
        },
        todetail(idnum){
            this.$router.push({ name: 'Detail', params: { id: idnum } })
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.goods{
    background: #F4F4F4;
    min-height: 642px;
    .head{
        height: 80px;
        display: flex;
        border-bottom: 1px solid #979797;
        img{
            width: 30px;
            height: 30px;
            margin-top: 30px;
        }
        img:nth-of-type(1){
            margin: 30px 50px 0 457px;
        }
    }
    .mainone{
        display: flex;
        flex-wrap: wrap;
        .tabone{
            height: 270px;
            width: 200px;
            overflow: hidden;
            margin: 20px 28px 0;
            .top{
                height: 200px;
                width: 200px;
                position: relative;
                margin-bottom: 14px;
                >img{
                    height: 200px;
                    width: 200px;
                }
                ul{
                    position: absolute;
                    right: 3px;
                    bottom: 0;
                    li{
                        height: 24px;
                        width: 24px;
                        margin-bottom: 5px;
                        img{
                            height: 24px;
                            width: 24px;
                        }
                    }
                }
            }
            .btm{
                h3,h4{
                    height: 19px;
                    line-height: 19px;
                    text-align: center;
                    font-size: 13px;
                    font-weight: 400;
                    color: #000;
                }
            }
        }
    }
    .maintwo{
        .tabtwo{
            height: 140px;
            display: flex;
            border-bottom: 1px solid #979797;
            margin-left: 30px;
            position: relative;
            .lf{
                height: 100px;
                width: 100px;
                margin: 20px 30px 0 0;
                img{
                    height: 100px;
                    width: 100px;
                }
            }
            ul{
                display: flex;
                flex-wrap: wrap;
                margin-top: 20px;
                li{
                    width: 240px;
                    margin-right: 30px;
                    overflow: hidden;
                    i,em{
                        display: block;
                        font-size: 14px;
                        color: #999;
                        height: 20px;
                        line-height: 20px;
                    }
                    em{
                        color: #000;
                    }
                }
            }
            .posi{
                position: absolute;
                top: 50px;
                right: 25px;
                width: 50px;
                height: 50px;
                img{
                    width: 50px;
                    height: 50px;
                }
            }
        }
    }
}
</style>

