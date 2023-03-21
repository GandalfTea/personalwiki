const path = require('path');

module.exports = {

	mode: 'development',

	entry: {  file: path.resolve(__dirname, './ts/App.tsx'),
						tree: path.resolve(__dirname, './ts/tree.tsx') },

	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, 'compiled/'),
	},

	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/
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
};
