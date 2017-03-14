"use strict";

const U200b = require( "./u200b.js" );

console.log( U200b( "hello", "world" ) );

console.log( U200b( "hello", "world" ).join( "." ) );

var test = U200b( "hello", "world" ).join( "." );
console.log( U200b( test ).replace( ".", "_" ) );
