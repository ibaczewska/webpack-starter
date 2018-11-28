const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env, options) => {
    //check if production
    const isProd = (options.mode === 'production') ? true : false;

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },

        devtool: isProd ? false : 'source-map',
        module: {
            rules: [
                {
                    test: /\.(scss|sass|css)$/,
                    exclude: /node_modules/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: { sourceMap: isProd ? false : true }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    ident: 'postcss',
                                    plugins: (loader) => [
                                        require('autoprefixer')(),
                                        require('cssnano')()
                                    ],
                                    sourceMap: isProd ? false : true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: { sourceMap: isProd ? false : true }
                            },
                        ],
                        fallback: {
                            loader: 'style-loader',
                            options: { sourceMap: isProd ? false : true }
                        }
                    })
                },
                {
                    //webpack 4.x | babel-loader 8.x | babel 7.x
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
    
        plugins: [
            new ExtractTextPlugin("style.css"),
          ]
    };
}
