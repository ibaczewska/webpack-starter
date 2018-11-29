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
                        },
                        publicPath: '../'
                    })
                },
                {
                    //webpack 4.x | babel-loader 8.x | babel 7.x
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/,
                    exclude: /fonts?/,
                    use: [
                       {
                          loader: 'file-loader',
                          options: {
                             name: '[name].[ext]',
                             outputPath: 'img/'
                          }
                       },
                       {
                          loader: 'image-webpack-loader',
                          options: {
                             disable: isProd ? false : true
                          }
                       }
                    ]
                 },
                 {
                    test: /\.(eot|svg|ttf|woff|woff2)$/,
                    exclude: /(images?|img)/,
                    use: {
                       loader: 'file-loader',
                       options: {
                          name: '[name].[ext]',
                          outputPath: 'fonts/'
                       }
                    }
                 },
                 {
                    test: /\.(html)$/,
                    use: {
                       loader: 'html-loader'
                    }
                 }
            ]
        },
    
        plugins: [
            new ExtractTextPlugin("style.css"),
          ]
    };
}
