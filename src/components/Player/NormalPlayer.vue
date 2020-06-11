<template>
  <transition :css="false" @enter="enter" @leave="leave">
    <div class="normal-player" v-show="this.isFullScreen" >
      <div class="player-wrapper">
        <HeaderPlayer />
        <PlayerMiddle :currentTime="currentTime"/>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"/>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
import HeaderPlayer from './PlayerHeader'
import PlayerMiddle from './PlayerMiddle'
import PlayerBottom from './PlayerBottom'
import {mapGetters,mapActions} from 'vuex'
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui'

export default {
  name:"NormalPlayer",
  components:{
    HeaderPlayer,
    PlayerMiddle,
    PlayerBottom
  },
  computed:{
    ...mapGetters([
      'isFullScreen',
      'currentSong'
    ])
  },
  methods:{
    ...mapActions([
      'getSongLyric'
    ]),
    enter(el,done){
      // 动画执行完要传入一个回调函数告知该动画已执行完
      Velocity(el,'transition.shrinkIn',{duration:500},function(){
        done()
      })
    },
    leave(el,done){
      Velocity(el,'transition.shrinkOut',{duration:500},function(){
        done()
      })
    }
  },
  watch:{
    currentSong(newValue,oldValue){
      if (newValue.id === undefined) {
        return
      }
      this.getSongLyric(newValue.id)
    }
  },
  props:{
    totalTime:{
      type:Number,
      default:0,
      required:true
    },
    currentTime:{
      type:Number,
      default:0,
      required:true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.normal-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  // background: pink;
  .player-wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 999;
  }
  .player-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img {
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      filter: blur(10px);
    }
  }
}
</style>