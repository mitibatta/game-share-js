<template>
<div class="headder">
    <nav class="navbar">
        <router-link to="/">
          <img class="logo" src="../assets/image/logo.png" alt="ロゴ画像">
        </router-link>
      <div v-if="logged_in > 0">
        <ul class="nav-item">
         <li><router-link to="/post/index">投稿一覧</router-link></li>
         <li><router-link to="/favorite/index">いいね一覧</router-link></li>
          <li><router-link to="/post/new">投稿する</router-link></li>
         <li><a href="#" @click="signout">サインアウト</a></li>
         </ul>
      </div>
      <div v-else>
      <ul class="nav-item">
        <li><router-link to="/post/index">投稿一覧</router-link></li>
        <li><router-link to="/user/new">アカウント作成</router-link></li>
        <li><router-link to="/session/new">ログイン</router-link></li>
      </ul>
      </div>
    </nav>
</div>
</template>

<script>
import axios from 'axios'

// const hostName = 'localhost:3000'
const hostName = 'game-share-api.herokuapp.com'
const path = '/api/sessions'

export default {
  name: 'MyHeader',
  props: ['view'],
  data () {
    return {
      logged_in: 0,
      res: {
        message: ''
      }
    }
  },
  mounted: function () {
    this.logged_in = this.$localStorage.get('loginUser')
    console.log(this.logged_in)
  },
  watch: {
    view: function () {
      this.logged_in = this.$localStorage.get('loginUser')
      console.log(this.logged_in)
    }
  },
  methods: {
    signout () {
      axios.delete(`https://${hostName}${path}/${this.logged_in}`).then((result) => {
        this.$router.push('/')
        this.res = result.data
        this.$emit('flash', (this.res.message))
        this.$localStorage.remove('loginUser')
        this.logged_in = 0
      }).catch(error => {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped lang="scss">
.headder{
  width:100%;
  font-size:16px;
  .navbar{
    background-color:#444;
    height:75px;
    padding:0;
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
    border: 1px solid transparent;
    border-width: 0 0 1px;
    .logo{
      margin-top:10px;
    }
  }
  .nav-item{
    display:flex;
    list-style:none;
    float:right;
    margin:0;
    li{
      padding-right:15px;
      line-height:67px;
      a{
        display:inline-block;
        height:67px;
        text-decoration:none;
        color:white;
        &:hover{
          background-color:rgba(0,0,0,0.3);
        }
      }
    }
  }
}

</style>
