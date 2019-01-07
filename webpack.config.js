// webpack.js.org
const path = require( "path" );
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = ( env ) => {
    const isProduction = process.env.NODE_ENV === "production";

    return {
        mode: isProduction ? "production" : "development",
        entry : './src/app.js',
        output : {
            path : path.join( __dirname, 'public' ), 
            filename : 'bundle.js',
            chunkFilename: '[name].bundle.js'
        },
        module: {
            rules: [{
                loader: "babel-loader",
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },{
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }]
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    // node_modules chunk
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/,
                        name: 'vendor'
                    }
                    /*,
                    // Merge all the CSS into one file
                    styles: {
                        name: 'styles',
                        test: /\.s?css$/,
                        chunks: 'all',
                        enforce: true
                    }*/
                }
            }
        },
        plugins:[
            new MiniCssExtractPlugin({
                filename: "[name].css"
            })
        ],
        devtool: isProduction ? "source-map" : "inline-source-map",
        devServer:{
            contentBase: path.join( __dirname, "public" ),
            compress: true,
            historyApiFallback: true
        }
    };
}
