<template>
  <div class="posts-index-wrapper">
    <div class="container">
      <div class="post-parts">
        <h2 class="user-name"><router-link :to="{name: 'userShow', params: {id: res.post.user_id}}" class="text">{{res.user }}</router-link></h2>
        <img :src="res.picture.image.url" v-show="res.picture.image.url" width="80%" height="80%">
        <video width="80%" height="80%" controls autobuffer="true" :src="res.picture.video.url" v-show="res.picture.video.url"></video>
        <p class="text text-body">{{ res.post.text }}</p>
        <ul class="public">
              <li><likebtn :post-id="res.post.id" :logged_in="logged_in" :post-fav="postFav" @sendURL="route"></likebtn><p>{{ res.favorites.filter(e => e.post_id == res.post.id).length }}</p></li>
              <li><img class="icon" src="../assets/image/comment.png" @click="showForm"><p>{{ rep.comments.length }}</p></li>
            </ul>
        <div v-if="logged_in == res.post.user_id">
            <ul class="user-only">
              <li><router-link :to="{name: 'postEdit', params: {id: res.post.id}}">編集</router-link></li>
              <li><deletebtn :post-id="res.post.id" @deletepost="deletePost"></deletebtn></li>
            </ul>
          </div>
          <form @submit.prevent="postComment" v-show="form">
            <label for="comment">コメント投稿</label>
            <div class="comment-form">
          <textarea rows="3" cols="12" id="comment" class="form-control form-text" v-model='comment'></textarea>
          </div>
          <input type="submit" value="投稿" class="btn-block btn-white" v-if="logged_in > 0">
          </form>
          <div class="comment-t">
          <h1 class="comment-title">コメント一覧</h1>
          </div>
          <div class="comment-body" v-for="comment in rep.comments" :key="comment.id">
            <h3><router-link :to="{name: 'userShow', params: {id: comment.user_id}}" class="text">{{ rep.users.filter(e => e.id == comment.user_id)[0].name }}</router-link></h3>
            <p>{{ comment.text }}</p>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import likebtn from './likebtn'
import deletebtn from './deletebtn'

// const hostName = 'localhost:3000'
const hostName = 'game-share-api.herokuapp.com'
const path = '/api/posts'
const path1 = '/api/favorites'
const path2 = '/api/comments'

export default {
  name: 'postShow',
  components: {
    'likebtn': likebtn,
    'deletebtn': deletebtn
  },
  data: function () {
    return {
      logged_in: 0,
      id: 0,
      load: 0,
      postFav: [],
      form: false,
      comment: '',
      res: {
        post: {},
        picture: {},
        user: '',
        favorites: []
      },
      response: {
        message: ''
      },
      rep: {
        comments: [],
        users: []
      }
    }
  },
  mounted: function () {
    this.logged_in = this.$localStorage.get('loginUser')
    this.id = this.$route.params['id']
    console.log(this.id)
    axios.get(`https://${hostName}${path}/${this.id}`).then(result => {
      this.res = result.data
      console.log(result.data)
    }).catch(error => {
      console.log(error)
    })
    axios.get(`https://${hostName}${path1}/userIndex/${this.logged_in}`).then(result => {
      this.postFav = result.data
      console.log(result.data)
    }).catch(error => {
      console.log(error)
    })
    axios.get(`https://${hostName}${path2}/${this.id}`).then(result => {
      this.rep = result.data
      console.log(result.data)
    }).catch(error => {
      console.log(error)
    })
  },
  watch: {
    load: function () {
      axios.get(`https://${hostName}${path2}/${this.id}`).then(result => {
        this.rep = result.data
        console.log(result.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },

  methods: {
    postDelete (id) {
      axios.delete(`https://${hostName}${path}/${id}`).then(result => {
        this.$router.push('/post/index')
        this.response = result.data
        this.$emit('flash', (this.response.message))
      }).catch(error => {
        console.log(error)
      })
    },
    deletePost (msg) {
      this.response.message = msg
      this.$emit('flash', (this.response.message))
    },
    showForm () {
      this.form = true
    },
    postComment () {
      axios.post(`https://${hostName}${path2}`, {
        text: this.comment,
        post_id: this.id,
        user_id: this.logged_in
      }).then(result => {
        this.$router.push(`/post/show/${this.id}`)
        this.response = result.data
        this.$emit('flash', (this.response.message))
        this.comment = ''
        this.load += 1
      }).catch(error => {
        console.log(error)
      })
    },
    route () {
      this.$router.push(`/post/show/${this.id}`)
      axios.get(`https://${hostName}${path}/${this.id}`).then(result => {
        this.res = result.data
        console.log(result.data)
      }).catch(error => {
        console.log(error)
      })
      axios.get(`https://${hostName}${path1}/userIndex/${this.logged_in}`).then(result => {
        this.postFav = result.data
        console.log(result.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.posts-index-wrapper{
  background-color:#ddd;
  padding-top:80px;

  h1{
    font-size:38px;
  }
  .text-center{
    text-align:center;
  }
  .post-parts{
    margin:20px auto 0 auto;

    background-color:white;
    padding-bottom: 20px;
    padding-top:20px;
    // border: 3px solid #777;
    border-radius:5px;
    text-align:center;
    width: 80%;

    img {
      margin-top: 10px;
      margin-bottom: 20px;
      // width: 80%;
    }
  }
  ul{
    list-style:none;
    display:flex;

    .icon{
      width:40px;
      height:40px;
      margin-top:30px;
    }
  }
  .user-only{
    justify-content:flex-end;
    li {
      margin-right: 18px;
      font-size: 15px;
    }
  }

  .public{
    justify-content:space-around;
  }

  .text{
    text-decoration:none;
    color:#000;
  }

  .none{
    text-decoration:none;
  }

  .image{
    width:90%;
    height:auto;
  }

  .comment-title{
    border-bottom: 2px solid #ddd;
    padding-bottom:10px;
    width:99%;
    margin:0 auto;
  }
  .text-body{
    font-size: 25px;
  }

  .comment-body{
    border-bottom: 2px solid #ddd;
  }
  .comment-t{
    display: flex;
    justify-content: space-around;
  }

  .form-text{
    resize:vertical;
    max-height:300px;
    min-height:80px;
    width: 45%;
  }

  .comment-form{
    display: flex;
    justify-content: space-around;
  }

  .btn-block{
    height:35px;
    margin: 30px auto 10px auto;
    width: 15%;
  }

  form{
    margin-bottom:15px;
  }
}

</style>
