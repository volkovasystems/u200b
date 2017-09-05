"use strict";

/*;
	@test-license:
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
	@end-test-license

	@test-configuration:
		{
			"package": "u200b",
			"path": "u200b/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/u200b.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"u200b": "u200b"
		}
	@end-include
*/

const assert = require( "should" );

//: @server:
const U200b = require( "./u200b.js" );
//: @end-server

//: @client:
const U200b = require( "./u200b.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge


//: @server:
describe( "u200b", ( ) => {

	describe( "`U200b( 'hello', 'world' )`", ( ) => {
		it( "should contain history, string, text and type properties", ( ) => {
			let result = U200b( "hello", "world" );

			assert.equal( typeof result, "object" );

			assert.equal( "history" in result, true );

			assert.equal( "string" in result, true );

			assert.equal( "text" in result, true );

			assert.equal( "type" in result, true );
		} );
	} );

	describe( "`U200b( 'hello', 'world' ).join( '.' )`", ( ) => {
		it( "should be equal to 'hello​.world'", ( ) => {
			let result = U200b( "hello", "world" ).join( "." );

			assert.equal( result, "hello​.world" );
		} );
	} );

	describe( "`U200b( 'hello', 'world' ).join( '.' ).replace( '.', '_' )`", ( ) => {
		it( "should be equal to 'hello​_world'", ( ) => {
			let data = U200b( "hello", "world" ).join( "." );
			let result = U200b( data ).replace( ".", "_" );

			assert.equal( result, "hello_world" );
		} );
	} );

} );
//: @end-server


//: @client:
describe( "u200b", ( ) => {

	describe( "`U200b( 'hello', 'world' )`", ( ) => {
		it( "should contain history, string, text and type properties", ( ) => {
			let result = U200b( "hello", "world" );

			assert.equal( typeof result, "object" );

			assert.equal( "history" in result, true );

			assert.equal( "string" in result, true );

			assert.equal( "text" in result, true );

			assert.equal( "type" in result, true );
		} );
	} );

	describe( "`U200b( 'hello', 'world' ).join( '.' )`", ( ) => {
		it( "should be equal to 'hello​.world'", ( ) => {
			let result = U200b( "hello", "world" ).join( "." );

			assert.equal( result, "hello​.world" );
		} );
	} );

	describe( "`U200b( 'hello', 'world' ).join( '.' ).replace( '.', '_' )`", ( ) => {
		it( "should be equal to 'hello​_world'", ( ) => {
			let data = U200b( "hello", "world" ).join( "." );
			let result = U200b( data ).replace( ".", "_" );

			assert.equal( result, "hello_world" );
		} );
	} );

} );
//: @end-client


//: @bridge:
describe( "u200b", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`U200b( 'hello', 'world' )`", ( ) => {
		it( "should contain history, string, text and type properties", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					let data = u200b( "hello", "world" );

					let test = ( typeof data == "object" ) &&
						( "history" in data == true ) &&
						( "string" in data == true ) &&
						( "text" in data == true ) &&
						( "type" in data == true );

					return test;
				}

			).value;
			//: @end-ignore
			assert.equal( result, true );
		} );
	} );

	describe( "`U200b( 'hello', 'world' ).join( '.' )`", ( ) => {
		it( "should be equal to 'hello​.world'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					return u200b( "hello", "world" ).join( "." );
				}

			).value;
			//: @end-ignore
			assert.equal( result, "hello​.world" );
		} );
	} );

	describe( "`U200b( 'hello', 'world' ).join( '.' ).replace( '.', '_' )`", ( ) => {
		it( "should be equal to 'hello​_world'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					let data = u200b( "hello", "world" ).join( "." );
					return u200b( data ).replace( ".", "_" );
				}

			).value;
			//: @end-ignore
			assert.equal( result, "hello_world" );
		} );
	} );

} );
//: @end-bridge
