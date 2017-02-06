"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "u200b",
			"path": "u200b/u200b.js",
			"file": "u200b.js",
			"module": "u200b",
			"author": "Richeve S. Bebedor",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>"
			],
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/u200b.git",
			"global": true,
			"class": true
		}
	@end-module-configuration

	@module-documentation:
		Append, prepend, and insert zero-width space to non-empty string.

		The main purpose of this is to make the string visible as it is
			but we can still divide it the way we want it to be divided.
	@end-module-documentation

	@include:
		{
			"arid": "arid",
			"clazof": "clazof",
			"diatom": "diatom",
			"harden": "harden",
			"optfor": "optfor",
			"plough": "plough",
			"protype": "protype",
			"truly": "truly"
		}
	@end-include
*/

const arid = require( "arid" );
const clazof = require( "clazof" );
const diatom = require( "diatom" );
const harden = require( "harden" );
const optfor = require( "optfor" );
const plough = require( "plough" );
const protype = require( "protype" );
const truly = require( "truly" );

const U200b = diatom( "U200b" );

harden( "U200B", "\u200b" );
harden( "U200B_BASE16", "ffffffff0000200bffffffff" );
harden( "INSERT", "insert" );
harden( "PREPEND", "prepend" );
harden( "APPEND", "append" );

U200b.prototype.initialize = function initialize( string ){
	/*;
		@meta-configuration:
			{
				"string": [
					"string",
					"[string]",
					"..."
				]
			}
		@end-meta-configuration
	*/

	let text = plough( arguments )
		.filter( truly )
		.map( ( parameter ) => { return parameter.toString( ); } );

	//: This will handle the modification done to the strings.
	this.history = this.history || [ ];

	//: Create an original copy.
	this.text = [ ].concat( text );

	this.string = text;

	this.base( U200B );

	this.identify( );

	return this;
};

/*;
	@method-documentation:
		This will set the default base type of U200B
			to any base type as long as it is supported.

		Setting to use U200B_BASE16 will make the string size bigger.
	@end-method-documentation
*/
U200b.prototype.base = function base( type ){
	/*;
		@meta-configuration:
			{
				"type:required": [
					U200B,
					U200B_BASE16
				]
			}
		@end-meta-configuration
	*/

	if( type !== U200B && type !== U200B_BASE16 ){
		throw new Error( "invalid base type" );
	}

	this.type = type;

	return this;
};

/*;
	@method-documentation:
		This will auto-identify the base type.
	@end-method-documentation
*/
U200b.prototype.identify = function identify( ){
	let string = this.string.join( "" );

	if( ( new RegExp( U200B, "g" ) ).test( string ) ){
		this.type = U200B;

	}else if( ( new RegExp( U200B_BASE16, "g" ) ).test( string ) ){
		this.type = U200B_BASE16;

	}else{
		this.type = U200B;
	}

	return this;
};

U200b.prototype.separate = function separate( ){
	return this.string.join( "" ).split( this.type );
};

U200b.prototype.release = function release( ){
	//: If there are no modifications do the default insert.
	if( arid( this.history ) ){
		this.insert( );
	}

	return [ ].concat( this.string );
};

U200b.prototype.join = function join( separator ){
	return this.release( ).join( separator || "" );
};

U200b.prototype.toString = function toString( ){
	return this.join( );
};

U200b.prototype.valueOf = function valueOf( ){
	return this.release( );
};

U200b.prototype.raw = function raw( ){
	return this.toString( ).replace( new RegExp( this.type, "g" ), "" );
};

/*;
	@method-documentation:
		Append zero-width space on every end of the string.

		If new strings proceeds the old set strings
			they will be appended and applied with zero-width space.
	@end-method-documentation
*/
U200b.prototype.append = function append( string ){
	/*;
		@meta-configuration:
			{
				"string": [
					"string",
					"[string]",
					"..."
				]
			}
		@end-meta-configuration
	*/

	let text = plough( arguments )
		.filter( truly )
		.map( ( parameter ) => { return parameter.toString( ); } ) || [ ];

	this.string = this.string
		.concat( text )
		.map( ( function onEachToken( token ){
			return token + this.type;
		} ).bind( this ) );

	this.history.push( APPEND );

	return this;
};

/*;
	@method-documentation:
		Prepend zero-width space on every start of the string.

		If new strings preceeds the old set strings
			they will be prepended and applied with zero-width space.
	@end-method-documentation
*/
U200b.prototype.prepend = function prepend( string ){
	/*;
		@meta-configuration:
			{
				"string": [
					"string",
					"[string]",
					"..."
				]
			}
		@end-meta-configuration
	*/

	let text = plough( arguments )
		.filter( truly )
		.map( ( parameter ) => { return parameter.toString( ); } ) || [ ];

	this.string = text
		.concat( this.string )
		.map( ( function onEachToken( token ){
			return this.type + token;
		} ).bind( this ) );

	this.history.push( PREPEND );

	return this;
};

/*;
	@method-documentation:
		Inserts zero-width space on every gap of the string.

		If new strings are inserted with the old set strings,
			zero-width space will be applied also.

		If a pattern is supplied, it will insert zero-width space
			on every occurrence of the pattern on the string.
	@end-method-documentation
*/
U200b.prototype.insert = function insert( string, pattern ){
	/*;
		@meta-configuration:
			{
				"string": [
					"string",
					"[string]",
					"..."
				],
				"pattern": "RegExp"
			}
		@end-meta-configuration
	*/

	let text = plough( arguments )
		.filter( truly )
		.map( function onEachParameter( parameter ){
			if( clazof( parameter, RegExp ) ){
				return null;
			}

			return parameter.toString( );
		} ) || [ ];

	let template = optfor( arguments, RegExp );

	if( truly( template ) ){
		this.string = this.string
			.concat( text )
			.map( ( function onEachToken( token ){
				return token.replace( template, this.type );
			} ).bind( this ) );

	}else{
		this.string = this.string
			.concat( text )
			.join( this.type + "[,]" )
			.split( "[,]" );
	}

	this.history.push( INSERT );

	return this;
};

/*;
	@method-documentation:
		Reverts to the original string.

		Clears history.

		This does not include appended, prepended or inserted strings.
			So the original string is the one you initialize.
	@end-method-documentation
*/
U200b.prototype.clear = function clear( ){
	this.string = this.text;

	this.history = [ ];

	return this;
};

module.exports = U200b;
