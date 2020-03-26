<template>
  <a href="#" @click="postDelete">削除</a>
</template>

<script>
import axios from 'axios'
const hostName = 'http://localhost:3000'
// const hostName = 'https://game-share-api.herokuapp.com'
const path = '/api/posts'

export default {
  name: 'deletebtn',
  props: ['postId'],
  data: function () {
    return {
      res: {
        message: ''
      }
    }
  },
  methods: {
    postDelete () {
      axios.delete(`${hostName}${path}/${this.postId}`).then(result => {
        this.res = result.data
        console.log(this.res.message)
        this.$emit('deletepost', (this.res.message))
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
