<template>
  <ul class="detail-bottom">
    <li class="bottom-top" @click="selectAllMusic">
      <div class="bottom-icon"></div>
      <div class="bottom-title">播放全部</div>
    </li>
    <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
      <h3>{{value.name}}</h3>
      <p>{{value.al.name}} - {{value.ar[0].name}}</p>
    </li>
  </ul>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name:"DetailBottom",
  props:{
    playlist:{
      type:Array,
      default:() => [],
      required:true
    }
  },
  methods:{
    selectMusic(id){
      // this.$store.dispatch('setFullScreen',true)
      this.setFullScreen(true)
      this.setSongDetail([id])
    },
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectAllMusic(){
      this.setFullScreen(true)
      let ids = this.playlist.map(function(item){
        return item.id
      })
      
      
      this.setSongDetail(ids)

      
    }
  },
  
  
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';

.detail-bottom{
  width: 100%;
  li{
    width: 100%;
    height: 100px;
    padding: 15px;
    box-sizing: border-box;
    @include bg_sub_color();
    border-bottom: 1px solid #ccc;
  }
  .bottom-top{
    display: flex;
    align-items: center;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    .bottom-icon{
      width: 60px;
      height: 60px;
      @include bg_img('../../assets/images/small_play');
      margin-right: 20px;

    }
    .bottom-title {
      @include font_color();
      @include font_size($font_medium)

    }
  }
  .item {
    h3 {
      @include font_color();
      @include font_size($font_large);
      margin-top: 8px;
    }
    p{
      @include font_color();
      @include font_size($font_small);
      @include no-wrap();
      // margin-top: 10px;
      opacity: 0.7;
    }
  }
}
</style>