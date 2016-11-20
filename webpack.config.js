var webpack = require('webpack');
var path = require('path');

var PATHS = {
	dist: path.join(__dirname, 'dist'),
	src: path.join(__dirname, 'src'),
	css: path.join(__dirname, 'dist/css')
};

module.exports = {
	entry: {
		app: PATHS.src
	},
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		contentBase: PATHS.dist,
		inline: true,
		stats: 'errors-only'
	}
};