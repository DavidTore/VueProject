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
  //获取签章员名字等信息
  getSigners(params) {
    return fetch.post(`${prefix}/receiving/getSigners`, params);
  },
  //提交整个表单
  submitAllForm(params) {
    return fetch.post(`${prefix}/receiving/committed`, params);
  },
  dropCommit(params) {
    return fetch.post(`${prefix}/receiving/dropAndRecommitted`, params);
  }
};
