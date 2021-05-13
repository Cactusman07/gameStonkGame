const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


module.exports = (env, argv) => {
  let isProd = false;

  if(argv.mode !== 'production'){
    console.log('Outputting code in dev mode - non minified.');
  } else if (argv.mode === 'production'){
    isProd = true;
    console.log('Building production ready code - minified & ready to deploy.');
  }

  return{
    entry: "/js/main.js",
    output: {
      filename: "[name].min.js",
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      // All resolvable extensions.
       extensions: [".js", ".jsx", ".css", ".scss"],
       alias: {
        images: path.resolve(__dirname, '/img')
      }
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    devServer: {
      contentBase: "/dist",
      hot: true
    },
    optimization: {
      minimize: isProd,
      minimizer: isProd ? [
        new OptimizeCSSAssetsPlugin({})
      ] : []
    },
    module: {
      rules: [        
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
        {
          test: /\.scss$/,
          use:  [  
            "style-loader",
            MiniCssExtractPlugin.loader,
            "css-loader?sourceMap",
            "sass-loader?sourceMap"
          ]
        },
        {
          test: /\.(png|svg|jp(e*)g|gif|eot|ttf|woff|woff2)$/,
          use: [
            'url-loader',
            { 
              loader: "image-webpack-loader",
              options: {
                disable: true, // webpack@2.x and newer
                limit: 8000,
                name: 'img/[hash]-[name].[ext]',
                publicPath: 'assets',
                outputPath: 'img/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // Cleans dist folder when building project.
      new CleanWebpackPlugin(),
      // Html Webpack Plugin
      new HtmlWebPackPlugin({
        favicon: "favicon.ico",
        template: path.join(__dirname, "index.html"),
        filename: "index.html",
        title: "GameStonk"
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isProd ? "[name].css" : "[name].[hash].css",
        chunkFilename: isProd ? "[id].css" : "[id].[hash].css",
        ignoreOrder: false
      })
    ]
  };
};