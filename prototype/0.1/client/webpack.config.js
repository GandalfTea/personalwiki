
const path = require('path');

module.exports = {

	mode: 'development',

	entry: path.resolve(__dirname, './src/App.jsx'),

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist/'),
	},

	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modiles/
			}
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
		static: path.resolve(__dirname, './dist'),
	},

};
