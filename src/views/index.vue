<template>
  <div class="indmain">
    <Header :actv="actv" class="top"></Header>
    <router-view @torute="torute" class="cet"></router-view>
  </div>
</template>

<script>
import Header from 'Components/headers.vue'

export default {
  data () {
    return {
      actv:0
    }
  },
  components: {
    Header
  },
  methods:{
    torute(num){
      this.actv=num
      console.log(num)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.indmain{
  width: 1024px;
  margin: 0 auto;
  // height: 100vh;
  // overflow: scroll;
}
</style>

