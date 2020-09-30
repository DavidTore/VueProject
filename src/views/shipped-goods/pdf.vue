<template>
  <div id="app">

    <van-popup v-model="show" position="bottom" :style="{ height: '100%',background:'rgb(245,245,250)' }" >
           <div class="title" style="position:fixed;width:100%;z-index:2006">
           <van-nav-bar
               left-arrow 
               @click-left="onClickLeft" >
                <template #title>PDF预览</template>
            </van-nav-bar>
      </div>
		<div>
<iframe width="100%" height="100%" scrolling="no" style="margin-top:60px; position:fixed;height:91%;"
    :src="pdfUrl"></iframe>
  </div>
    </van-popup>
  </div>
</template>
<script>
  import API from '@/service/pdfH5/index.js';
  export default {
    name: 'PdfPreview',
	data() {
        return {
            baseUrl: process.env.BASE_URL,
            pdfUrl:''
        };
    },
    props:{
        pdfId:{
            type:String,
            default:'',
        },
        show: {
            type:Boolean,
            default:false,
        },
    },
  mounted() {},
  created() {
    this.pdfUrl = `web/viewer.html?file=` + encodeURIComponent('https://shgg-test.evergrande.com/h5/dfs/download?objectName='+ this.pdfId + '&token=' + encodeURIComponent(window.info.token) + '&uid=' + window.info.uid )
  },
    methods:{
        onClickLeft(){
            this.$emit('onClickCancel')
        },
    }
  }
</script>

