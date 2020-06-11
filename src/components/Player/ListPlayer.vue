<template>
<transition :css="false" @enter="enter" @leave="leave">
    <div class="list-player" v-show="isShowListPlayer">
      <div class="player-wrapper">
        <div class="player-top">
          <div class="top-left">
            <div class="mode loop" @click="mode" ref="mode"></div>
            <p v-if="this.modeType === 0">顺序播放</p>
            <p v-else-if="this.modeType === 1">单曲循环</p>
            <p v-else-if="this.modeType === 2">随机播放</p>
          </div>
          <div class="top-right">
            <div class="del" @click="delAll"></div>
          </div>
        </div>
        <div class="player-middle">
          <ScrollView ref="scrollview">
            <ul ref="play">
              <li class="item" v-for="(value,index) in songs" :key="index" @click="selectMusic(index)">
                <div class="item-left">
                  <div class="item-play" @click.stop="play" v-show="currentIndex === index"></div>
                  <p>{{value.name}}</p>
                </div>
                <div class="item-right">
                  <div class="item-favorite" @click.stop="favorite(value)" :class="{'active':isFavorite(value)}"></div>
                  <div class="item-del" @click.stop="del(index)"></div>
                </div>
              </li>
            </ul>
          </ScrollView>
        </div>
        <div class="player-bottom">
          <p @click.stop="hidden">关闭</p>
        </div>
      </div>
    </div>
  </transition>  
</template>

<script>
import { mapActions,mapGetters } from 'vuex'
import Velocity from 'velocity-animate'
import ScrollView from '../ScrollView'
import modeType from '../../store/modeType'
export default {
  name:"ListPlayer",
  components:{
    ScrollView
  },
  methods:{
    show(){
      this.isShow = true
    },
    hidden(){
      this.setListPlayer(false)
    },
    enter(el,done){
      // 动画执行完要传入一个回调函数告知该动画已执行完
      Velocity(el,'transition.perspectiveUpIn',{duration:500},function(){
        done()
      })
    },
    leave(el,done){
      Velocity(el,'transition.perspectiveUpOut',{duration:500},function(){
        done()
      })
    },
    ...mapActions([
      'setIsPlaying',
      'setModeType',
      'setListPlayer',
      'setDelSong',
      'setCurrentIndex',
      'setFavoriteSong'
    ]),
    play(){
      this.setIsPlaying(!this.isPlaying)
      // console.log('gaibian');
      
    },
    mode(){
      if(this.modeType === modeType.loop){
        this.setModeType(modeType.one)
      }else if(this.modeType === modeType.one){
        this.setModeType(modeType.random)
      }else if(this.modeType === modeType.random){
        this.setModeType(modeType.loop)
      }
    },
    del(index){
      this.setDelSong(index)
    },
    delAll(){
      this.setDelSong()
    },
    selectMusic(index){
      this.setCurrentIndex(index)
    },
    favorite(value){
      this.setFavoriteSong(value)
    },
    isFavorite(song){
      let result = this.favoriteList.find(function(currentValue){
        return currentValue.id === song.id
      })
      return result !== undefined
    },  
  },
  computed:{
    ...mapGetters([
      'isShowMiniPlayer',
      'isPlaying',
      'modeType',
      'isShowListPlayer',
      'songs',
      'currentIndex',
      'favoriteList'
    ])
  },
  watch:{
    isPlaying(newValue,oldValue){
      if(newValue){
        this.$refs.play.classList.add('active')
      }else{
        this.$refs.play.classList.remove('active')

      }
    },
    modeType(newValue,oldValue){
      if(this.modeType === modeType.loop){
        this.$refs.mode.classList.add('loop')
        this.$refs.mode.classList.remove('random')

      }else if(this.modeType === modeType.one){
        this.$refs.mode.classList.add('one')
        this.$refs.mode.classList.remove('loop')

      }else if(this.modeType === modeType.random){
        this.$refs.mode.classList.add('random')
        this.$refs.mode.classList.remove('one')
        
      }
    },
    // 一开始不能滚动是因为已经创建好了固定大小的容器，要监听了全部歌单，重新计算滚动范围
    isShowListPlayer(newValue,oldValue){
      if(newValue){
        this.$refs.scrollview.refresh()
      }
    }
  },
 
}
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable";
@import "../../assets/css/mixin";
.list-player {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  @include  bg_sub_color();
  .player-wrapper{
    .player-top {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .top-left {
        display: flex;
        align-items: center;
        padding-left: 20px;
        .mode {
          width: 56px;
          height: 56px;
          margin-right: 20px;
          &.loop {
            @include bg_img('../../assets/images/small_loop');
          }
          &.one{
            @include bg_img('../../assets/images/small_one');
          }
          &.random{
            @include bg_img('../../assets/images/small_shuffle');
          }
         
        }
        p{
          @include font_size($font_medium_s);
          @include font_color()
        }
      }
      .top-right {
        .del {
           width: 56px;
           height: 56px;
           @include bg_img('../../assets/images/small_del')
        }
       
      }
    }
    .player-middle {
      height: 700px;
      overflow: hidden;
      ul{
        &.active{
          .item{
            .item-play{
               @include bg_img('../../assets/images/small_play');
            }
          }
        } 
      }
      .item {
        border-top: 1px solid #ccc;
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        .item-left {
          display: flex;
          align-items: center;
          .item-play {
            width: 56px;
            height: 56px;
            margin-right: 20px;
            @include bg_img('../../assets/images/small_pause');
            
          }
          p{
            @include font_size($font_medium_s);
            @include font_color()
          }
        }
        .item-right {
          display: flex;
          align-items: center;
          .item-favorite {
            width: 56px;
            height: 56px;
            @include bg_img('../../assets/images/small_un_favorite'); 
            &.active{
              @include bg_img('../../assets/images/small_favorite'); 
            }
          }
          .item-del {
            width: 52px;
            height: 52px;
            margin-left: 20px;
            @include bg_img('../../assets/images/small_close')
          }
        } 
          
        
      }
    }
    .player-bottom {
      width: 100%;
      height: 100px;
      line-height: 100px;
      @include bg_color();
      p {
        text-align: center;
        color: #fff;
        @include font_size($font_medium)
      }
    }
  }
}

</style>