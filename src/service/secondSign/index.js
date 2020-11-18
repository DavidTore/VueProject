import fetch from "@/utils/fetch";
const prefix = "h5";

export default {
    //  待办数量
    recheckCount(params){
        return fetch.post(`${prefix}/secondSign/backlog/count`,params);
    },
    //  列表获取
    getRechcekList(params) {
        return fetch.post(`${prefix}/secondSign/backlogList`, params);
    },
    //  列表 
    invalidRecheck(params) {
        return fetch.post(`${prefix}/secondSign/invalidNote`, params);
    },
    //  列表确认
    submitRecheck(params) {
        return fetch.post(`${prefix}/secondSign/signingNew`, params);
    },
    //查看质检报告
    getReport(params) {
        return fetch.post(`${prefix}/secondSign/qualityReport`, params);
    }
};
