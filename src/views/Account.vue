<template>

    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
export default {
  name:'Account',
  components:{
    AccountHeader,
    AccountBottom
  },
  methods:{
    switchItem(num){
      this.switchNum = num
    }
  },
  data(){
    return {
      switchNum:0
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/variable";
@import "../assets/css/mixin";
.account{
  position: fixed;
  top: 0;
  left: 0;
  left: 0;
  right: 0;
  // background: red;
  overflow: hidden;
}
// .v-enter{
//   transform: translateY(100%);
// }
// .v-enter-to{
//   transform: translateY(0%);
// }
// .v-enter-active{
//   transition: transform 0.1s;
// }
// .v-leave{
//   transform: translateY(0%);
// }
// .v-leave-to{
//   transform: translate(100%);
// }
// .v-leave-active{
//   transition: transform 1s;
// }

</style>
