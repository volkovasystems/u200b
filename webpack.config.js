const webpack = require( "webpack" );

module.exports = {
	"entry": "./u200b.support.js",
	"resolve": {
		"modulesDirectories": [ "bower_components", "node_modules" ]
	},
	"module": {
		"preLoaders": [
			{
				"test": /\.support\.js$/,
				"loader": "source-map-loader"
			}
		]
	},
	"output": {
		"library": "u200b",
		"libraryTarget": "umd",
		"filename": "u200b.deploy.js"
	},
	"plugins": [
		new webpack.ResolverPlugin( new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( "bower.json", [ "support" ] ) ),
		new webpack.ResolverPlugin( new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin( ".bower.json", [ "main" ] ) ),
		new webpack.optimize.UglifyJsPlugin( { "compress": { "warnings": false }, "comments": false, "sourceMap": true } )
	],
	"devtool": "#inline-source-map"
};
