<template>
  <img class="icon" src="../assets/image/heart-red.png" @click="likeDelete" v-if="postFav.filter(e => e.id == postId)[0]">
  <img class="icon" src="../assets/image/heart-black.png" @click="likePost" v-else>
</template>

<script>
import axios from 'axios'

// const hostName = 'localhost:3000'
const hostName = 'agile-meadow-34312.herokuapp.com'
const path = '/api/favorites'
export default {
  name: 'likebtn',
  data: function () {
    return {
      change: 0
      // post: []
    }
  },
  props: {
    'logged_in': {
      type: String,
      default: ''
    },
    'postId': {
      type: Number,
      default: 0
    },
    'postFav': {
      type: Array,
      default: ''
    }
  },

  methods: {
    likePost () {
      axios.post(`https://${hostName}${path}`, {
        user_id: this.logged_in,
        post_id: this.postId
      }).then(result => {
        // this.$router.push('/post/index')
        this.$emit('sendURL')
        this.change += 1
        console.log(this.postId)
      }).catch(error => {
        console.log(error)
      })
    },
    likeDelete () {
      axios.delete(`https://${hostName}${path}/${this.postId}`, {
        data: {user_id: this.logged_in, post_id: this.postId}
      }).then(result => {
        // this.$router.push('/post/index')
        this.change += 1
        this.$emit('sendURL')
      }).catch(error => { console.log(error) })
    }
  }
}
</script>

<style>
.icon{
      width:40px;
      height:40px;
      margin-top:30px;
    }
</style>
