
<template>
  <div class="posts-index-wrapper">
    <div class="container" v-for="post in res.posts" :key="post.id">
          <div class="post-parts">
            <h2 class="user-name"><router-link :to="{name: 'userShow', params: {id: post.user_id}}" class="text">{{res.users.filter(e => e.id == post.user_id)[0].name }}</router-link></h2>
            <img :src="res.pictures.filter(e => e.post_id == post.id)[0].image.url" v-show="res.pictures.filter(e => e.post_id == post.id)[0].image.url" width="80%" height="80%">
            <video width="80%" height="80%" controls autobuffer="true" :src="res.pictures.filter(e => e.post_id == post.id)[0].video.url" v-show="res.pictures.filter(e => e.post_id == post.id)[0].video.url"></video>
            <p class="text-body"><router-link :to="{name: 'postShow', params: {id: post.id}}" class="text"> {{post.text }}</router-link></p>
            <ul class="public">
              <li><likebtn :post-id="post.id" :logged_in="logged_in" :post-fav="res.posts" @sendURL="route"></likebtn><p>{{ res.favorites.filter(e => e.post_id == post.id).length }}</p></li>
              <li></li>
            </ul>
            <div v-if="logged_in == post.user_id">
              <ul class="user-only">
                <li><router-link :to="{name: 'postEdit', params: {id: post.id}}">編集</router-link></li>
                <li><deletebtn :post-id="post.id" @deletepost="deletePost"></deletebtn></li>
              </ul>
            </div>
          </div>
    </div>
   <div class="page">
    <pagenate v-for="n in res.pages" :key="n" :number="n" @pagech="getPost"></pagenate>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import likebtn from './likebtn'
import deletebtn from './deletebtn'
import pagenate from './pagenate'

// const hostName = 'http://localhost:3000'
const hostName = 'https://game-share-api.herokuapp.com'
const path = '/api/favorites'
export default {
  name: 'favoriteIndex',
  components: {
    'likebtn': likebtn,
    'deletebtn': deletebtn,
    'pagenate': pagenate
  },
  data: function () {
    return {
      logged_in: 0,
      res: {
        posts: [],
        pictures: [],
        users: [],
        favorites: [],
        pages: 1
      },
      response: {
        message: ''
      }
    }
  },
  mounted: function () {
    this.logged_in = this.$localStorage.get('loginUser')
    console.log(this.logged_in)
    axios.get(`${hostName}${path}`, {
      params: {
        id: this.logged_in
      }
    }).then(result => {
      this.res = result.data
      console.log(result.data)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    deletePost (msg) {
      axios.get(`${hostName}${path}`, {
        params: {
          id: this.logged_in
        }
      }).then(result => {
        this.res = result.data
        console.log(this.res)
      }).catch(error => {
        console.log(error)
      })
      this.response.message = msg
      this.$router.push('/favorite/index')
      this.$emit('flash', (this.response.message))
    },
    route () {
      this.$router.push('/favorite/index')
      axios.get(`${hostName}${path}`, {
        params: {
          id: this.logged_in
        }
      }).then(result => {
        this.res = result.data
        console.log(result.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getPost (n) {
      axios.get(`${hostName}${path}`, {
        params: {
          id: this.logged_in,
          page: n
        }
      }).then(result => {
        this.res = result.data
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
    margin:35px auto 0 auto;

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

    .icon{
      width:40px;
      height:40px;
      margin-top:30px;
    }
  .user-only{
    display:flex;
    justify-content:flex-end;
    list-style:none;
    li {
      margin-right: 18px;
      font-size: 15px;
    }
  }

  .public{
    display:flex;
    justify-content:space-around;
    list-style:none;

    li{
      background: white;
    }
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

  .text-body{
    font-size: 25px;
  }

  .page{
    display: flex;
    justify-content: center;
  }
}

</style>
