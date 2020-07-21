import fetch from "@/utils/fetch";
const prefix = "";

export default {
  //新增业务角色权限
  addRole(params) {
    return fetch.post(`${prefix}/admin/role/add`, params);
  }
};
