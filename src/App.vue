<template>
  <div id="app">
    <router-view/>
    <!-- <div id="abb" @mousedown="move"></div> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      // x:0,
      // y:0,
      // l:0,
      // t:0,
      // isDown:false
    }
  },
  methods:{
    // move(e){
    //   let odiv = e.target;

    //   this.x = e.clientX;
    //   this.y = e.clientY;

    //   this.l = odiv.offsetLeft;
    //   this.t = odiv.offsetTop;

    //   this.isDown = true;
    //   console.log('111111111')

    //   document.onmousemove = (e)=>{ 
    //     if (this.isDown == false) {
    //         return;
    //     }
    //     console.log('2222222222')
    //     var nx = e.clientX;
    //     var ny = e.clientY;

    //     var nl = nx - (this.x - this.l);
    //     var nt = ny - (this.y - this.t);

    //     odiv.style.left = nl + 'px';
    //     odiv.style.top = nt + 'px';
    //   };
    //   document.onmouseup = (e) => {
    //     console.log('33333333')

    //     this.isDown = false;
    //     document.onmousemove = null;
    //     document.onmouseup = null;
    //   };
    // } 
  }
}
</script>

<style>
/* #abb{
    position: absolute;   
    top: 10px;
    left: 10px;
    width: 200px;
    height: 200px;
    background: #666;      
} */
</style>
