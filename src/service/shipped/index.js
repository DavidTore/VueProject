import fetch from "@/utils/fetch";
const prefix = "";

export default {
  //新增业务角色权限
  addRole(params) {
    return fetch.post(`${prefix}/admin/role/add`, params);
  },
  submitReceipt(params) {
    return fetch.post(`${prefix}/receiving/deliverOrder/detail`,params);
  }
};
