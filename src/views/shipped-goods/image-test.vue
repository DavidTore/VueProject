<template>
  <div>

    <div class="van-uploader">
      <div class="van-uploader__wrapper">
        <div class="van-uploader__preview">
          <div class="van-image van-uploader__preview-image">
            <img :src="data.src" class="van-image__img" style="object-fit: cover;" @click="sceneImg">
          </div>
          <div class="van-uploader__preview-delete" @click="handleDelete">
            <i class="van-icon van-icon-cross van-uploader__preview-delete-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
    }
  },
  props:{
    data:{
      type: Object,
      default: ()=>{},
    },
    index:{
      type: Number
    },
    picList:{
      type: Array,
      default: ()=>[]
    }
  },
  mounted() {
  },
  methods: {
    handleDelete(data){
      this.$emit('iOSDelete',this.data);
    },
    sceneImg(){
        ImagePreview({
            images: this.picList.map(item=>item.src),
            showIndex: true,
            loop: false,
            startPosition: this.index,
        })
    },
  }
}
</script>
<style lang="less" scoped>

</style>