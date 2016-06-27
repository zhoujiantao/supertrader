var path = require('path');

module.exports = {
	entry: './src/scripts/app.js',
	output: {
		path: path.join(__dirname, '/build/scripts'),
		filename: 'vendor-v1.0.0.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [
			{
				test: /\.js|jsx$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: ['react','es2015']
				}
			},
			{

			}
		]
	}
}
