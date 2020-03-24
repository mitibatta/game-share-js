<template>
  <div class="page-top-wrapper">
  <div class="background">
    <div class="container">
      <div class="row">
        <p class="text-white text-title">ゲーム内で起きた最高の瞬間や面白い場面を共有しよう</p>
      </div>
    </div>
  </div>

  <div class="about">
    <h1 class=text-center>このアプリについて</h1>
    <div class="icon-field">
      <div class="icon-parts">
        <img class="icon" src="../assets/image/gazoo.jpeg">
        <p>いつでも簡単にゲームの画像や動画をコメント付きで投稿することができます。</p>
        </div>
        <div class="icon-parts">
        <img class="icon" src="../assets/image/friend.jpeg">
        <p>ゲームのカテゴリ別に投稿、閲覧することが可能で、フレンド探しにもなります。</p>
        </div>
        <div class="icon-parts">
        <img class="icon" src="../assets/image/iine.jpeg">
        <p>投稿にいいねしてあとで見直すこともできます。</p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default{
  name: 'rootPage'
}

</script>

<style scoped lang="scss">
.background{
  background-image: url("~@/assets/image/background.jpg");
  height:790px;
  width:100%;
  background-size:cover;
  background-attachment:scroll;

  .text-white{
    color:white;
  }
  .text-title{
    font-size:39px;
    margin:170px auto 0 auto;
  }

}

.text-center{
  text-align:center;
  font-size:30px;
}

.icon-field{
  display:flex;
  justify-content:space-around;
  margin-top:50px;
  p{
    width:200px;
    text-align:center;
    margin-top:15px;
  }
  .icon{
    width:180px;
    height:180px;
  }
}
</style>
