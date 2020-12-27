module.exports = {
    devServer: {
        proxy: {
            '/api1': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
                target: 'http://sihon.vip/accepter',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api1': ''
                }
            },
			'/api2': {
			    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
			    target: 'http://alvin.world:8080',
			    // 允许跨域
			    changeOrigin: true,
			    ws: true,
			    pathRewrite: {
			        '^/api2': ''
			    }
			},
			'/api3': {
			    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
			    target: 'http://sihon.vip/captain/captain',
			    // 允许跨域
			    changeOrigin: true,
			    ws: true,
			    pathRewrite: {
			        '^/api3': ''
			    }
			},
			'/api4': {
			    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
			    target: 'http://59.110.164.222:8080/ifp',
			    // 允许跨域
			    changeOrigin: true,
			    ws: true,
			    pathRewrite: {
			        '^/api4': ''
			    }
			},
			'/api5': {
			    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
			    target: 'http://isihon.cn',
			    // 允许跨域
			    changeOrigin: true,
			    ws: true,
			    pathRewrite: {
			        '^/api5': ''
			    }
			},
        },
	//assetsPublicPath: './',
	}
}