import fetch from "@/utils/fetch";
const prefix = "h5";

export default {
  //提交单号查询
  submitReceipt(params) {
    return fetch.post(`${prefix}/receiving/deliveryOrder/detail`,params);
  },
  //获取后台时间
  getReceiptTime(params) {
    return fetch.post(`${prefix}/receiving/receivingTime`, params);
  },
  //获取 员名字等信息
  getSigners(params) {
    return fetch.post(`${prefix}/receiving/getSigners`, params);
  },
  //提交整个表单
  submitAllForm(params) {
    return fetch.post(`${prefix}/receiving/committed`, params);
  },
  dropCommit(params) {
    return fetch.post(`${prefix}/receiving/dropAndRecommitted`, params);
  },
  //upload pictures
  uploadPic(files,params) {
    return fetch.post(`${prefix}/picture/simple/upload?deliveryOrder=${params}`,files,{headers: {
      'Content-Type': 'multipart/form-data' }})
  },
  //删除单号下所有的照片
  deleteAllPhotos(params){
    return fetch.post(`${prefix}/picture/picDel/prefix`, params);
  },
  //根据单号和地址删除某一张照片
  deletePhoto(params){
    return fetch.post(`${prefix}/picture/picDel/single`, params);
  },
  //重新提交单号
  reSign(params) {
    return fetch.post(`${prefix}/receiving/deliveryOrder/reSigning`,params);
  },
};
