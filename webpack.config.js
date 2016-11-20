const webpack = require('webpack');
const path = require('pacth');

const PATHS = {
	dist: path.join(__dirname, 'dist'),
	src: path.join(__dirname, 'src'),
	css: path.join(__dirname, 'dist/css')
};

const config = {
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