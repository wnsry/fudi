<template>
    <div class="login" :style="'background: url('+loginbj+')no-repeat center;background-size:100% 100%;'">
        <div class="main">
            <h3>登录</h3>
            <p>
                <i><img :src="toux" alt=""></i>
                <input type="text" placeholder="请输入账号" v-model="zhanghao">
            </p>
            <p>
                <i><img :src="suo" alt=""></i>
                <input type="password" placeholder="请输入密码" v-model="mima">
            </p>
            <div class="gou">
                <input type="checkbox" id="dgou" name="" value="gou" v-model="lstVal" />
                <span><label for="dgou">记住密码</label></span>
            </div>
            <div class="btn" @click="dlbtn()">
                登 录
            </div>
            <div @click="aaa()">aaaaaa</div>
        </div>
    </div>
</template>

<script>
import toux from 'Imgs/toux.png'
import suo from 'Imgs/suo.png'
import loginbj from 'Imgs/loginbj.png'

export default {
    data () {
        return {
            toux,
            suo,
            loginbj,

            zhanghao:'',
            mima:'',

            lstVal:[]
        }
    },
    mounted() {

    },
    methods:{
        aaa(){
            window.location.href = 'file:///C:/Users/fdsj/Documents/WeChat%20Files/xsdk1221/FileStorage/File/2019-03/111.pdf'
        },
        dlbtn(){
            if(this.zhanghao && this.mima){

                let pass={'zhanghao':this.zhanghao,'mima':this.mima}
                if(this.lstVal.length>0){
                    localStorage.setItem('pass', JSON.stringify(pass));
                }
                
                this.$post(this.$api.login,{
                    userName:this.zhanghao,
                    Password:this.mima
                }).then(res=>{
                    console.log(res)
                    localStorage.setItem('user', JSON.stringify(res.data));
                    localStorage.setItem('token', res.data.token);
                    this.$router.push('/')
                })
            }else{
                this.$message({
                    message: '请输入账号密码',
                    type: '',
                    duration:1500,
                    center: true
                });
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login{
    width: 1024px;
    height: 768px;
    margin: 0 auto;
    // background: url("../assets/img/loginbj.png")no-repeat center;
    // background-size:100% 100%;
    position: relative;
    .main{
        width: 334px;
        height: 281px;
        padding: 50px 55px;
        background: #fff;
        position: absolute;
        left: 523px;
        top: 192px;
        h3{
            height: 30px;
            line-height: 30px;
            font-size: 30px;
            color: #424452;
            border-left: 3px solid #C6AA92;
            text-indent: 5px;
            margin-bottom: 30px;
        }
        p{
            border: 1px solid #979797;
            display: flex;
            height: 50px;
            margin-bottom: 20px;
            i{
                height: 22px;
                width: 20px;
                margin: 16px 11px 0;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            input{
                flex: 1;
                border: 0;
                outline: none;
            }
        }
        .gou{
            display: flex;
            margin-bottom: 20px;
            span{
                height: 20px;
                font-size: 14px;
                color: #333;
            }
            input[type='checkbox']{
                width: 13px;
                height: 13px;
                background-color: #fff;
                -webkit-appearance:none;
                border: 1px solid #c9c9c9;
                outline: none;
                margin: 4px 5px 0 0;
                border-radius: 2px;
            }
            input[type=checkbox]:checked{
                background: url("../assets/img/dgou.png")no-repeat center;
                background-size:13px 13px;
            }
        }
        .btn{
            height: 53px;
            background: #37383A;
            border-radius: 2px;
            color: #fff;
            font-size: 21px;
            line-height: 53px;
            text-align: center;
        }
    }
}
</style>

