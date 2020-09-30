import fetch from "@/utils/fetch";
const prefix = "h5";

export default {
    //PDFsrc
    getPDFSrc(params){
        return fetch.get(`${prefix}/dfs/download`,{params});
    },
};
