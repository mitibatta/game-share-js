<template>
  <form @submit.prevent="tagSerch">
    <select v-model="selectTag">
      <option v-for="tag in tags"  :key="tag.id">{{tag.name}}</option>
    </select>
    <input type="submit" value="検索">
  </form>
</template>

<script>
import axios from 'axios'

const hostName = 'http://localhost:3000'
// const hostName = 'https://game-share-api.herokuapp.com'
const path = '/api/posts/tags'
export default {
  name: 'tagMenu',
  props: ['tags'],
  data: function () {
    return {
      selectTag: '',
      res: {
        posts: [],
        users: [],
        pictures: [],
        favorites: [],
        tags: [],
        pages: 1
      }
    }
  },
  methods: {
    tagSerch () {
      console.log(this.selectTag)
      axios.get(`${hostName}${path}/${this.selectTag}`
      ).then(result => {
        this.res = result.data
        this.$emit('tagSerch', this.res)
        // this.$router.push('/post/index/serch')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
