<template>
  <!-- <div class="header" @click="changeTheme">
    <div class="header-left"></div>
    <p class="header-title">网易云音乐</p>
    <div class="header-right" @click.stop="accountClick"></div>

  </div> -->
  <div class="header" @click="changeTheme">
    <!-- 不能直接设置插槽样式，要用div包裹起来 -->
    <div class="left">
      <slot name="left">左</slot>
    </div>
    <slot name="middle">中间</slot>
    <div class="right">
      <slot name="right">右</slot>
    </div>


  </div>
</template>

<script>
export default {
  name:"Header",
  data(){
    return {
      themes:['theme','theme1','theme2'],
      index:0
    }
  },
  methods:{
    changeTheme(){
      this.index++
      if(this.index >= this.themes.length){
        this.index = 0
      }
      document.documentElement.setAttribute('data-theme',this.themes[this.index])
    },
    
  }
}
</script>

<style scoped lang="scss">
@import "../assets/css/variable";
@import "../assets/css/mixin";
.header {
  width: 100%;
  height: 100px;
  // background-color: red;
  @include bg_color();
  display: flex;
  justify-content: space-between;
  // position: relative;
  // z-index: 999;
  .left, .right {
    width: 84px;
    height: 84px;
    margin-top: 8px;
    *{
    width: 100%;
    height: 100%;
     }
  }
  
  
}

</style>