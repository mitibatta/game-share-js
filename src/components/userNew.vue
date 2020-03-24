<template>
  <div class="user-new-wrapper">
  <div class="container">
    <div class="row">
      <div class="form_box">
        <h1>アカウント作成</h1>
        <p v-show="errored">アカウント作成に失敗しました。</p>
        <form @submit.prevent="userCreate">
        <div class="form-group">
          <label for="name">名前</label>
          <input type="text" id="name" class="form-control" v-model='name'>
        </div>
        <div class="form-group">
          <label for="email">メールアドレス</label>
          <input type="text" id="email" class="form-control" v-model="email">
        </div>
        <div class="form-group">
          <label for="password">パスワード</label>
          <input type="password" id="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
          <p v-show="pass">パスワードは同じ値を入力してください</p>
          <label for="password_confirmation">パスワード再入力</label>
          <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation">
        </div>
        <input type="submit" value="登録" class="btn-block btn-white">
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

// const hostName = 'localhost:3000'
const hostName = 'agile-meadow-34312.herokuapp.com'
const path = '/api/users'

export default {
  name: 'userNew',
  data: function () {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      pass: false,
      errored: false,
      res: {
        message: ''
      }
    }
  },
  methods: {
    userCreate () {
      if (this.password === this.password_confirmation) {
        axios.post(`https://${hostName}${path}`, {
          name: this.name,
          email: this.email,
          password_digest: this.password
        }).then((result) => {
          console.log(result.data)
          this.$router.push('/')
          this.res = result.data
          this.$emit('flash', (this.res.message))
        }).catch(error => {
          console.log(error)
          this.errored = true
        })
      } else {
        this.pass = true
      }
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
    margin-top:50px;
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
