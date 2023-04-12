const path = require('path');

module.exports = {

	mode: 'development',
	target: 'node',

	entry: {  file: path.resolve(__dirname, './ui/App.tsx'),
						tree: path.resolve(__dirname, './ui/Tree.tsx'),
						app : path.resolve(__dirname, './server/app.ts') },

	output: {
		filename: '[name].min.js',
		path: path.resolve(__dirname, './public/compiled/'),
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
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
		alias: {
			'@core' : path.resolve(__dirname, './src/core.ts')
		}
	},
	
	stats: {
		colors: true,
		reasons: true,
		chunks: false
	},
};
