<template>
  <div class="user-new-wrapper">
  <div class="container">
    <div class="row">
      <div class="form_box">
        <h1>投稿する</h1>
        <p class="error-text" v-show="errored">投稿に失敗しました。</p>
      <form @submit.prevent="createPost">
        <div class="form-group">
          <p>画像</p>
          <input type="file" name="image" id="image" accept=".jpg, .jpeg, .gif, .png" @change="selectedImage">
        </div>
        <div class="form-group">
          <p>動画</p>
          <input type="file" name="video" id="video" accept=".mp4" @change="selectedVideo">
        </div>
        <div class="form-group">
          <label for="text">テキスト</label>
          <textarea rows="6" cols="18" id="text" name="text" class="form-control form-text" v-model='post.text'></textarea>
        </div>
        <input type="submit" value="投稿" class="btn-block btn-white" v-if="post.logged_in > 0">
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
const path = '/api/posts'

export default {
  name: 'postNew',
  data: function () {
    return {
      post: {
        uploadImage: null,
        uploadVideo: null,
        text: '',
        logged_in: 0
      },
      errored: false,
      res: {
        message: ''
      }
    }
  },
  created: function () {
    this.post.logged_in = this.$localStorage.get('loginUser')
  },
  methods: {
    selectedImage (e) {
      e.preventDefault()
      let files = e.target.files
      this.post.uploadImage = files[0]
      console.log(this.post.uploadImage)
    },
    selectedVideo (e) {
      e.preventDefault()
      let files = e.target.files
      this.post.uploadVideo = files[0]
      console.log(this.post.uploadVideo)
    },
    createPost () {
      var formdata = new FormData()
      formdata.append('post[image]', this.post.uploadImage)
      formdata.append('post[video]', this.post.uploadVideo)
      formdata.append('post[user_id]', this.post.logged_in)
      formdata.append('post[text]', this.post.text)

      console.log(formdata)

      var config = {
        headders: {
          'content-type': 'multipart/form-data'
        }
      }
      axios.post(`https://${hostName}${path}`,
        formdata, config).then((result) => {
        this.$router.push('/post/index')
        this.res = result.data
        this.$emit('flash', (this.res.message))
      }).catch(error => {
        console.log(error)
        this.errored = true
      })
    }
  }
}
</script>

<style scope lang="scss">
.user-new-wrapper{
  background-color:#ddd;
  height:780px;

.form_box{
  margin:150px auto 0 auto;

   .error-text{
      font-size:12px;
      color:red;
    }

  .form-control{
    height:35px;
  }
  .form-group{
    margin-bottom:20px;
    .error-text{
      font-size:12px;
      color:red;
    }

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
