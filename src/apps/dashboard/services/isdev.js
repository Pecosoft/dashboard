const forceProduction = true // 强制使用生产模式: 本地开发时，调用测试接口时打开，提交代码前设置为false
const isDev = !forceProduction && process.env.NODE_ENV !== 'production'

export default isDev
