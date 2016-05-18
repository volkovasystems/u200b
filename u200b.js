"use strict";

/*:
	@module-license:
		The MIT License (MIT)

		Copyright (@c) 2016 Richeve Siodina Bebedor
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
			"packageName": "u200b",
			"path": "u200b/u200b.js",
			"fileName": "u200b.js",
			"moduleName": "u200b",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/u200b.git"
		}
	@end-module-configuration

	@module-documentation:
		Append, prepend, and insert zero-width space to string.
	@end-module-documentation

	@include:
	@end-include
*/

if( typeof window == "undefined" ){
	var harden = require( "harden" );

	var raze = require( "raze" );
}

if( typeof window != "undefined" &&
	!( "harden" in window ) )
{
	throw new Error( "harden is not defined" );
}

if( typeof window != "undefined" &&
	!( "raze" in window ) )
{
	throw new Error( "raze is not defined" );
}

var U200b = function U200b( string ){
	/*:
		@meta-configuration:
			{
				"string": [
					"String",
					"[String]",
					"..."
				]
			}
		@end-meta-configuration
	*/

	var _string = raze( arguments );

	if( this instanceof U200b ){
		this._history = [ ];
	}

	if( this instanceof U200b &&
		_string.length )
	{
		//: Create a copy.
		this._string = [ ].concat( _string );

		this.string = _string;

		return this;

	}else if( this instanceof U200b &&
		!_string.length )
	{
		return this;

	}else if( !( this instanceof U200b ) ){
		var u200b = new U200b( );

		return U200b.apply( u200b, string );

	}else{
		return U200b.U200B;
	}
};

U200b.prototype.release = function release( ){
	if( !this._history.length ){
		this.insert( );
	}

	return [ ].concat( this.string );
};

U200b.prototype.join = function join( separator ){
	return this.release( ).join( separator || " " );
};

U200b.prototype.toString = function toString( ){
	return this.join( );
};

U200b.prototype.valueOf = function valueOf( ){
	return this.release( );
};

/*:
	@method-documentation:
		Append zero-width space on every end of the string.

		If new strings proceeds the old set strings
			they will be appended but no zero-width space applied.
	@end-method-documentation
*/
U200b.prototype.append = function append( string ){
	/*:
		@meta-configuration:
			{
				"string": [
					"String",
					"[String]",
					"..."
				]
			}
		@end-meta-configuration
	*/

	var _string = raze( arguments )
		.filter( function onEachParameter( parameter ){
			return typeof parameter == "string";
		} ) || [ ];

	this.string = this.string
		.concat( _string )
		.map( function onEachString( string ){
			return string + U200b.U200B;
		} );

	this._history.push( "append" );

	return this;
};

/*:
	@method-documentation:
		Prepend zero-width space on every start of the string.

		If new strings preceeds the old set strings
			they will be prepended but no zero-width space applied.
	@end-method-documentation
*/
U200b.prototype.prepend = function prepend( string ){
	/*:
		@meta-configuration:
			{
				"string": [
					"String",
					"[String]",
					"..."
				]
			}
		@end-meta-configuration
	*/

	var _string = raze( arguments )
		.filter( function onEachParameter( parameter ){
			return typeof parameter == "string";
		} ) || [ ];

	this.string = _string
		.concat( this.string )
		.map( function onEachString( string ){
			return U200b.U200B + string;
		} );

	this._history.push( "prepend" );

	return this;
};

/*:
	@method-documentation:
		Inserts zero-width space on every gap of the string.

		If new strings are inserted with the old set strings
			zero-width space will be applied also.

		If a pattern is supplied it will insert zero-width space
			on every occurrence of the pattern on the string.
	@end-method-documentation
*/
U200b.prototype.insert = function insert( string, pattern ){
	/*:
		@meta-configuration:
			{
				"string": [
					"String",
					"[String]",
					"..."
				],
				"pattern": "RegExp"
			}
		@end-meta-configuration
	*/

	var _string = raze( arguments )
		.filter( function onEachParameter( parameter ){
			return typeof parameter == "string";
		} ) || [ ];

	var _pattern = raze( arguments )
		.filter( function onEachParameter( parameter ){
			return parameter instanceof RegExp;
		} )[ 0 ];

	if( _pattern ){
		this.string = this.string
			.concat( _string )
			.map( function onEachString( string ){
				return string.replace( _pattern, U200b.U200B );
			} );

	}else{
		this.string = this.string
			.concat( _string )
			.join( U200b.U200B + "," )
			.split( "," );
	}

	this._history.push( "insert" );

	return this;
};

/*:
	@method-documentation:
		Reverts to the original string.

		Clears history.

		This does not include appended, prepended or inserted strings.
	@end-method-documentation
*/
U200b.prototype.clear = function clear( ){
	this.string = this._string;

	this._history = [ ];

	return this;
};

harden( "U200B", "\u200b", U200b );

if( typeof module != "undefined" ){
	module.exports = U200b;
}

if( typeof global != "undefined" ){
	harden
		.bind( U200b )( "globalize",
			function globalize( ){
				harden.bind( global )( "U200b", U200b );
			} );
}
