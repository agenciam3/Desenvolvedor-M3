module.exports= {
    entry: ['@babel/polyfill','./src/scripts/master.js'],
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: __dirname 
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                }
            }
        ],
    },
};