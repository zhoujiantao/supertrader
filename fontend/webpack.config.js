var path = require('path');

var CommonsChunkPlugin = require("./lib/optimize/CommonsChunkPlugin");


module.exports = {

	entry: {
		app: "./src/scripts/app.js"

	},
	output: {
		path: path.join(__dirname, "/build/scripts"),
		filename: "[name].js" ,
		libraryTarget:'umd'
	},
	externals: {
		"jquery": "$" ,
		"react":"React" ,
		"react-dom":'ReactDOM',
		"moment":"moment",
		"react-datetime":"DateTimeField",
		"react-addons-linked-state-mixin":"LinkedStateMixin"
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
			}
		]
	}
}
