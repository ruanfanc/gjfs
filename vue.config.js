  module.exports = {
	lintOnSave: false,
    devServer: {
        proxy: {
            '/api1': {
                // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
				// 后台服务器
                target: 'http://47.106.116.110:8082/',
                // 允许跨域
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api1': ''
                }
            },
			'/api2': {
			    // 文件系统服务器
			    target: 'http://120.24.64.8:8082/',
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
			'/api6': {
			    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
			    target: 'http://139.224.71.83:8082/',
			    // 允许跨域
			    changeOrigin: true,
			    ws: true,
			    pathRewrite: {
			        '^/api6': ''
			    }
			},
			'/api7': {
			    // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
			    target: 'https://tpl.bjinternetcourt.gov.cn',
			    // 允许跨域
			    changeOrigin: true,
			    ws: true,
			    pathRewrite: {
			        '^/api7': ''
			    }
			},
          '/api8': {
            // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
            target: 'http://120.24.64.8:8082',
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
              '^/api8': ''
            }
          },
        },
	// assetsPublicPath: './',
		// build:{
			
		// }
	},
	  transpileDependencies: [
	    'vue-echarts',
	    'resize-detector'
	  ]
}
