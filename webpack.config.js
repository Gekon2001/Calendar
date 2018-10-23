const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const devMode = process.env.NODE_ENV !== 'production';

console.log('production : ' + !devMode);

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},

	 module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: [
							'@babel/preset-env',
							'@babel/preset-react'
						],
						plugins: [
							[
								require("@babel/plugin-proposal-class-properties"),
								{ "loose": true }
							]
						]
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
				devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
				'css-loader'
				]
			},
			{
				test: /\.s[ca]ss$/i,
				use: [
				devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
				'css-loader',
				'sass-loader'
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				use: [
					{ 
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}
				]
			},
    		{
				test: /\.(png|svg|jpe?g|gif)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						}
					}
				]
			}
		]
	},

	devtool: 'cheap-module-source-map',
	
	devServer: {
		contentBase: './dist',
		hot: true
	},
	
	plugins: [
		new MiniCssExtractPlugin({
	  		filename: devMode ? '[name].css' : 'style.css'
		}),
		new CleanWebpackPlugin(['dist']),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}