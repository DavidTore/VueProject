module.exports = {
    publicPath: './',
    devServer: {
    proxy: {
                '/h5': {
                        target:"http://10.100.173.86:8080/h5",
                        ws:true,
                        changOrigin:true,
                        pathRewrite:{
                        '^/h5':'/'
                    }
            }
        }
    }
    }