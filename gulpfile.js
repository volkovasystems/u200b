"use strict";

const babel = require( "gulp-babel" );
const changed = require( "gulp-changed" );
const debug = require( "gulp-debug" );
const gulp = require( "gulp" );
const plumber = require( "gulp-plumber" );
const rename = require( "gulp-rename" );
const replace = require( "gulp-replace" );
const sourcemap = require( "gulp-sourcemaps" );
const yargs = require( "yargs" );

const clientPattern = /\/\/\:\s*\@client\:(.+?|[^]+?)\/\/\:\s*\@end\-client/gm;
const negateClientPattern = /\/\/\:\s*\@\!client\:(.+?|[^]+?)\/\/\:\s*\@end\-client/gm;
const serverPattern = /\/\/\:\s*\@server\:(.+?|[^]+?)\/\/\:\s*\@end\-server/gm;
const negateServerPattern = /\/\/\:\s*\@\!server\:(.+?|[^]+?)\/\/\:\s*\@end\-server/gm;
const bridgePattern = /\/\/\:\s*\@bridge\:(.+?|[^]+?)\/\/\:\s*\@end\-bridge/gm;
const negateBridgePattern = /\/\/\:\s*\@\!bridge\:(.+?|[^]+?)\/\/\:\s*\@end\-bridge/gm;

const ignoreOpenPattern = /\/\/\:\s*\@ignore\:/gm;
const ignoreOpenCommentPattern = /\/\/\:\s*\@ignore\:\s*\n\s*\/\*/gm;
const ignoreClosePattern = /\/\/\:\s*\@end\-ignore/gm;
const ignoreCloseCommentPattern = /\*\/\s*\n\s*\/\/\:\s*\@end\-ignore/gm;

let parameter = yargs
	.boolean( "client" )
	.boolean( "server" )
	.boolean( "bridge" )
	.boolean( "all" )
	.coerce( "module", ( name ) => name.split( /\,/ ) )
	.argv

let list = parameter.module;

gulp.task( "server", function formatServer( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Server File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", "" );
			return path;
		} ) )
		.pipe( replace( negateServerPattern, "" ) )
		.pipe( replace( clientPattern, "" ) )
		.pipe( replace( bridgePattern, "" ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents
		} ) )
		.pipe( debug( { "title": "Server File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "client", function formatClient( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Client File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", ".support" );
			return path;
		} ) )
		.pipe( replace( negateClientPattern, "" ) )
		.pipe( replace( serverPattern, "" ) )
		.pipe( replace( bridgePattern, "" ) )
		.pipe( sourcemap.init( ) )
		.pipe( babel( ) )
		.pipe( sourcemap.write( "./" ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents,
		} ) )
		.pipe( debug( { "title": "Client File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

gulp.task( "bridge", function formatBridge( ){
	return gulp.src( list.map( ( name ) => `${ name }.module.js` ) )
		.pipe( plumber( ) )
		.pipe( debug( { "title": "Bridge File:" } ) )
		.pipe( rename( ( path ) => {
			path.basename = path.basename.replace( ".module", ".bridge" );
			return path;
		} ) )
		.pipe( replace( negateBridgePattern, "" ) )
		.pipe( replace( serverPattern, "" ) )
		.pipe( replace( clientPattern, "" ) )
		.pipe( replace( ignoreOpenPattern, "//: @ignore:\n/*" ) )
		.pipe( replace( ignoreClosePattern, "*/\n//: @end-ignore" ) )
		.pipe( sourcemap.init( ) )
		.pipe( babel( ) )
		.pipe( sourcemap.write( "./" ) )
		.pipe( replace( ignoreOpenCommentPattern, "//: @ignore:" ) )
		.pipe( replace( ignoreCloseCommentPattern, "//: @end-ignore" ) )
		.pipe( changed( "./", {
			"hasChanged": changed.compareContents,
		} ) )
		.pipe( debug( { "title": "Bridge File Done:" } ) )
		.pipe( gulp.dest( "./" ) );
} );

let defaultTask = [ ];
if( parameter.all ){
	defaultTask.push( "server" );
	defaultTask.push( "client" );

}else if( parameter.server ){
	defaultTask.push( "server" );

}else if( parameter.client ){
	defaultTask.push( "client" );

}else if( parameter.bridge ){
	defaultTask.push( "bridge" );

}else{
	throw new Error( "no task specified" );
}

gulp.task( "default", defaultTask );
