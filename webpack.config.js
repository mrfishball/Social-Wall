var webpack = require('webpack');
var path = require('pacth');

var PATHS = {
	dist: path.resolve(__dirname, 'dist'),
	src: path.resolve(__dirname, 'src'),
	css: path.resolve(__dirname, 'dist/css')
};

var config = {
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

module.exports = config;