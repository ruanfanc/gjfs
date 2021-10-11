  module.exports = {
	    // baseUrl从 Vue CLI 3.3 起已弃用，请使用publicPath
  // 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/。
  // 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
  publicPath: './',
//   process.env.NODE_ENV === "production" ? "/production-sub-path/" : "./",
// 当运行 vue-cli-service build 时生成的生产环境构建文件的目录。
// 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。
// 默认值'dist'
outputDir: "my-app",
// 放置生成的静态资源 (js、css、img、fonts) 的目录(相对于outputDir目录)。
// 默认值''
assetsDir: "assets",
//指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
// 默认值'index.html'
indexPath: "index.html",
// 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
filenameHashing: false,
// 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
lintOnSave: process.env.NODE_ENV !== "production",

//是否使用包含运行时编译器的 Vue 构建版本。设置为 true 后你就可以在 Vue 组件中使用 template 选项了，但是这会让你的应用额外增加 10kb 左右。
runtimeCompiler: false,

// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
productionSourceMap: false,
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

	},
	  transpileDependencies: [
	    'vue-echarts',
	    'resize-detector'
	  ],
	//   build: {
	// 	// Template for index.html
	// 	index: path.resolve(__dirname, '../dist/index.html'),
	
	// 	// Paths
	// 	assetsRoot: path.resolve(__dirname, '../dist'),
	// 	assetsSubDirectory: 'static',
	// 	assetsPublicPath: './',
	
	// 	/**
	// 	 * Source Maps
	// 	 */
	
	// 	productionSourceMap: true,
	// 	// https://webpack.js.org/configuration/devtool/#production
	// 	devtool: '#source-map',
	
	// 	// Gzip off by default as many popular static hosts such as
	// 	// Surge or Netlify already gzip all static assets for you.
	// 	// Before setting to `true`, make sure to:
	// 	// npm install --save-dev compression-webpack-plugin
	// 	productionGzip: false,
	// 	productionGzipExtensions: ['js', 'css'],
	
	// 	// Run the build command with an extra argument to
	// 	// View the bundle analyzer report after build finishes:
	// 	// `npm run build --report`
	// 	// Set to `true` or `false` to always turn it on or off
	// 	bundleAnalyzerReport: process.env.npm_config_report
	//   }

	// build: {
	// 	env: require('./prod.env'),
	// 	index: path.resolve(__dirname, '../dist/index.html'),
	// 	assetsRoot: path.resolve(__dirname, '../dist'),
	// 	assetsSubDirectory: 'static',
	// 	assetsPublicPath: '/',
	// 	productionSourceMap: true,
	// 	productionGzip: false,
	// 	productionGzipExtensions: ['js', 'css']
	// //   },
	// build:{
	// 	assetsPublicPath: './',
	// },
	// build
}

