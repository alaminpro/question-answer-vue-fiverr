// vue.config.js 
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.runtime.esm.js',
            '@': resolve('src'),
        }
    },
}