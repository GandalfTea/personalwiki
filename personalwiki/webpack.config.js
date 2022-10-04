
const path = require('path');

module.exports = {

	mode: 'development',

	entry: {  file: path.resolve(__dirname, './js/App.tsx'),
						tree: path.resolve(__dirname, './js/tree.tsx') },

	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, './wikiapp/static/'),
	},

	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modiles/
			},
			{ test: /\.tsx?$/, loader: "ts-loader"},
			{ test: /\.ts?$/, loader: "ts-loader"}
		]
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	},
	
	stats: {
		colors: true,
		reasons: true,
		chunks: false
	},

	devServer: {
		static: path.resolve(__dirname, './static'),
	},

};
