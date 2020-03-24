<template>
  <div class="user-new-wrapper">
  <div class="container">
    <div class="row">
      <div class="form_box">
        <h1>サインイン</h1>
        <p v-show="errored">メールアドレスかパスワードが間違っています。</p>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">メールアドレス</label>
            <input type="text" id="email" class="form-control" v-model="email">
          </div>
          <div class="form-group">
            <label for="password">パスワード</label>
            <input type="password" id="password" class="form-control" v-model="password">
          </div>
          <input type="submit" value="ログイン" class="btn-block btn-white">
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

// const hostName = 'localhost:3000'
const hostName = 'game-share-api.herokuapp.com'
const path = '/api/sessions'

export default {
  name: 'sessionNew',
  data () {
    return {
      email: '',
      password: '',
      errored: false,
      res: {
        message: '',
        userId: 0
      }
    }
  },
  localStorage: {
    loginUser: {
      type: Number
    }
  },

  methods: {
    login () {
      axios.post(`https://${hostName}${path}`, {
        email: this.email,
        password_digest: this.password
      }).then((result) => {
        this.res = result.data
        this.$emit('flash', (this.res.message))
        this.$localStorage.set('loginUser', this.res.userId)
        this.$emit('login')
        this.$router.push('/post/index')
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
    }
  }

}
</script>

<style scoped lang="scss">
.user-new-wrapper{
  background-color:#ddd;
  height:780px;

.form_box{
  margin:150px auto 0 auto;
  width: 280px;
   p{
      font-size:12px;
      color:red;
    }

  .form-control{
    height:35px;
  }
  .form-group{
    margin-bottom:20px;

  }
  .btn-block{
    height:35px;
    margin-top:60px;
  }
  h1{
    margin-bottom:45px;
  }
  .form-text{
    resize:vertical;
    max-height:300px;
    min-height:80px;
  }
}

}

</style>
