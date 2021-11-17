const HtmlWebpackPlugin = require ("html-webpack-plugin");
const HtmlPlugin = new HtmlWebpackPlugin({
    template:'./public/index.html',
    filename:'../dist/index.html'
})

module.exports = {
    entry: './src/index.js',
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.(png|svg|jpg|jpeg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins:[HtmlPlugin]
}