<template>
  <div id="app">
      <div class="title" style="position:fixed;width:100%;z-index:2006">
           <van-nav-bar
               left-arrow 
               @click-left="onClickLeft" >
                <template #title>PDF预览</template>
            </van-nav-bar>
        </div>
	<div>
<iframe width="100%" height="100%" scrolling="no" style="margin-top:60px; position:fixed;height:91%;"
    :src="(pdfUrl)"></iframe>
  </div>
  </div>
</template>
<script>
  export default {
    name: 'pdfH5',
	data() {
        return {
          baseUrl: process.env.BASE_URL,
          pdfUrl: ''
        };
	},
  mounted() { },
  created(){
    this.pdfUrl = '/web/viewer.html?file=' + encodeURIComponent(this.$route.params.pdfUrl + '&token=' + encodeURIComponent(window.info.token) + '&uid=' + window.info.uid);
    console.log(this.pdfUrl)
  },
    methods:{
        onClickLeft(){
          console.log(this.$router)
            this.$router.go(-1);
        },
    }
  }
</script>

