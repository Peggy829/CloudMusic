<template>
  <div class="player">
    <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"/>
    <MiniPlayer />
    <ListPlayer ref="listPlayer"/>
    <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
  </div>
</template>

<script>
import NormalPlayer from '../components/Player/NormalPlayer'
import MiniPlayer from '../components/Player/MiniPlayer'
import ListPlayer from '../components/Player/ListPlayer'
import mode from '../store/modeType'
import {mapGetters,mapActions} from 'vuex'
import {getRandomIntInclusive} from '../tools/tools'

export default {
  name:"Player",
  components:{
    NormalPlayer,
    MiniPlayer,
    ListPlayer
  },
  computed:{
    ...mapGetters([
      'currentSong',
      'isPlaying',
      'currentIndex',
      'curTime',
      'modeType',
      'songs',
      'favoriteList',
      'historyList'
    ])
  },
  watch:{
   
    isPlaying(newValue,oldValue){
      // this.setHistorySong(currentSong)
      if(newValue){
        // console.log('执行1');
        this.setHistorySong(this.currentSong)
        this.$refs.audio.play()
      }else{
        this.$refs.audio.pause()
      }
    },
    currentIndex(){
     
      this.$refs.audio.oncanplay = () => {
        this.totalTime = this.$refs.audio.duration
        if(this.isPlaying){
          this.setHistorySong(this.currentSong)
          this.$refs.audio.play()
        }else{
          this.$refs.audio.pause()
          }
        }
    },
    curTime(newValue,oldValue){
        this.$refs.audio.currentTime = newValue

    },
    favoriteList(newValue,oldValue){
      window.localStorage.setItem('favoriteList',JSON.stringify(newValue))
    },
    historyList(newValue,oldValue){
      window.localStorage.setItem('historyList',JSON.stringify(newValue))
    }
  },
  created(){
    let list = JSON.parse(window.localStorage.getItem('favoriteList'))
    if(list == null){
      return
    }
    this.setFavoriteList(list)
    let list2 = JSON.parse(window.localStorage.getItem('historyList'))
    if(list2 == null){
      return
    }
    this.setHistoryList(list)
  },
  methods:{
     ...mapActions([
      'setCurrentIndex',
      'setFavoriteList',
      'setHistorySong',
      'setHistoryList'
    ]),
    timeupdate(e){
      // console.log(e.target.currentTime);
      this.currentTime = e.target.currentTime
    },
    end(){
      if(this.modeType === mode.loop){
        this.setCurrentIndex(this.currentIndex + 1)
      }else if(this.modeType === mode.one){
        this.$refs.audio.play()
      }else if(this.modeType === mode.random){
        let index = getRandomIntInclusive(0,this.songs.length - 1)
        this.setCurrentIndex(index)
      }
    },
    
  },  
  mounted(){
    this.$refs.audio.oncanplay = () => {
      this.totalTime = this.$refs.audio.duration
      // console.log(totalTime);
      
    }
  },
  data(){
    return {
      totalTime:0,
      currentTime:0
    }
  },
  
  
}
</script>

<style lang="scss" scoped>

</style>