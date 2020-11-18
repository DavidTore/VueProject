import fetch from "@/utils/fetch";
const prefix = "h5";

export default {
    // 列表
    getList(params){
        return fetch.post(`${prefix}/standingBook/singedList`,params);
    },
};
