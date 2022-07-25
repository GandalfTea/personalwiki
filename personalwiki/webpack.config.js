
const path = require('path');

module.exports = {

	mode: 'development',

	entry: path.resolve(__dirname, './js/App.tsx'),

	output: {
		filename: 'file-bundle.js',
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
		extensions: ['.js', '.jsx', '.json']
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
