<template>
<div @click="getPost" class="area">
  <p>{{ number }}</p>
</div>
</template>

<script>

export default {
  name: 'pagenate',
  props: ['number'],
  methods: {
    getPost () {
      this.$emit('pagech', (this.number))
    }
  }

}
</script>

<style scoped>
.area{
  cursor: pointer;
  margin: 20px 10px 10px 0;
  text-align: center;
  background: white;
  width: 30px;
  height: 30px;
  border:1px black solid
}
</style>
