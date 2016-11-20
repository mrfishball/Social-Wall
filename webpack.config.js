const path = require('path');

const PATHS = {
	dist: path.resolve(__dirname, 'dist'),
	src: path.resolve(__dirname, 'src'),
	css: path.resolve(__dirname, 'dist/css')
};

module.exports = {
	entry: [
		'webpack-dev-server/client?http://0.0.0.0:8080',
		'webpack/hot/only-dev-server',
		PATHS.src
		],
	output: {
		path: PATHS.dist,
		filename: 'bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.jsx?$/,
				include: PATHS.src,
				loader: 'eslint-loader'
			}
		],
		loaders: [
			{
				test: /\.jsx?$/,
				include: PATHS.src,
				loaders: ['react-hot', 'jsx?harmony']
			},
			{
				test: /\.jsx?$/,
				include: PATHS.src,
				loader: 'babel-loader'
			},
			{
				test: /\.css?$/,
				include: PATHS.src,
				loaders: ['style', 'css']
			}
			
		]
	},
	resolve: {
		root: PATHS.src,
		extensions: ['', '.js', '.jsx']
	},
	devServer: {
		contentBase: PATHS.dist,
		inline: true,
		stats: 'errors-only',
		hot: true
	},
	eslint: {
		configFile: './.eslintrc'
	}
};