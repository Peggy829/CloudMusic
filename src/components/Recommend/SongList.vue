<template>
  <div class="song">
    <div class="song-top">
      <h3>最新音乐</h3>
    </div>
    <SongListItem :songs="songs"/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import SongListItem from '../SongListItem'
export default {
  name:"SongList",
  components:{
    SongListItem
  },
  props:{
    songs:{
      type:Array,
      default:() => [],
      required:true
    }
  },
  methods:{ 
    ...mapActions([
      'setFullScreen',
      'setSongDetail'
    ]),
    selectMusic(id){
      this.setFullScreen(true)
      this.setSongDetail([id])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/mixin';
@import '../../assets/css/variable';

.song {
  width: 100%;
  @include bg_sub_color();
  .song-top {
    width: 100%;
    height: 84px;
    line-height: 84px;
    @include bg_sub_color();
    padding: 0 15px;
    border-bottom: 1px solid #ccc;
    h3{
      @include font_size($font_large);
      font-weight: bold;
      @include font_color();
    }
  }
  .song-list {
    width: 100%;
    overflow: hidden;
    .item {
      width: 100%;
      height: 200px;
      display: flex;
      align-items: center;
      padding: 0 15px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
      img {
        width: 180px;
        height: 180px;
        border-radius: 20px;
        margin-right: 15px;
      }
      div{
        h3{
          @include font_size($font_medium);
          @include font_color()
        }
        p{
          @include font_size($font_small);
          @include font_color();
          opacity: 0.6;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>