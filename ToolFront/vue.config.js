module.exports = {
    devServer: {
        open: true,
        host: 'localhost',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: { // 配置跨域
            '/api': {
                target: 'http://127.0.0.1:3000',	//接口域名
                ws:true,
                changOrigin: true,	//是否跨域
                pathRewrite: {		//重置路径
                    '^/api': ''
                }
            }
        },
        before: app => {}

    }
}