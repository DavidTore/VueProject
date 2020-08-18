import fetch from "@/utils/fetch";
const prefix = "h5";

export default {
    //二次签章代办数量
    recheckCount(params){
        return fetch.post(`${prefix}/secondSign/backlog/count`,params);
    },
    //二次签章列表获取
    getRechcekList(params) {
        return fetch.post(`${prefix}/secondSign/backlogList`, params);
    },
    //二次签章列表作废
    invalidRecheck(params) {
        return fetch.post(`${prefix}/secondSign/invalidNote`, params);
    },
    //二次签章列表确认
    submitRecheck(params) {
        return fetch.post(`${prefix}/secondSign/signingNew`, params);
    },
};
