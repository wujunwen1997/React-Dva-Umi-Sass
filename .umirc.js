// ref: https://umijs.org/config/
import { i18n } from './src/utils/config'

export default {
  treeShaking: true,
  publicPath: './',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: { immer: true },
      dynamicImport: {
        webpackChunkName: true,
        // loadingComponent: './components/Loader/Loader'
      },
      title: 'web',
      dll: true,
      routes: {
        exclude: [

          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,

          /components\//,
        ],
        update: routes => {
          if (!i18n) return routes

          const newRoutes = []
          for (const item of routes[0].routes) {
            newRoutes.push(item)
            if (item.path) {
              newRoutes.push(
                Object.assign({}, item, {
                  path: `/:lang(${i18n.languages.map(item => item.key).join('|')})` + item.path,
                })
              )
            }
          }
          routes[0].routes = newRoutes

          return routes
        },
      },
      //  移动端桌面首页
      // pwa: {
      //   manifestOptions: {
      //     srcPath: 'manifest.json'
      //   },
      // }
      // 通过 webpack 的 dll 插件预打包一份 dll 文件来达到二次启动提速的目的。
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch', 'antd/es'],
      // },
    }],
  ],
  // 配置主题，实际上是配 less 变量
  theme: {
    "@border-radius-base": "3px",
    "@border-radius-sm": "2px",
    "@shadow-color": "rgba(0, 0, 0, 0.05)",
    "@shadow-1-down": "4px 4px 40px @shadow-color",
    "@border-color-split": "#f4f4f4",
    "@border-color-base": "#e5e5e5",
    "@font-size-base": "13px",
    "@text-color": "#666",
    "@hover-color": "#f9f9fc"
  },
  //  代理
  proxy: {
    "/api": {
      "target": "http://127.0.0.1:7001/",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
  },
  // import Utility from '../../utilities/utility';
  // import Utility from 'Utilities/utility';
  // alias: {
    // api: resolve(__dirname, './src/services/'),
    // components: resolve(__dirname, './src/components'),
    // config: resolve(__dirname, './src/utils/config'),
    // models: resolve(__dirname, './src/models'),
    // routes: resolve(__dirname, './src/routes'),
    // services: resolve(__dirname, './src/services'),
    // themes: resolve(__dirname, './src/themes'),
    // utils: resolve(__dirname, './src/utils'),
  // },
}
