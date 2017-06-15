
const assert = require( "assert" );
const U200b = require( "./u200b.js" );

assert.ok( U200b( "hello", "world" ) );

assert.equal( U200b( "hello", "world" ).join( "." ), "hello​.world", "should return 'hello​.world'" );

let test = U200b( "hello", "world" ).join( "." );
assert.equal( U200b( test ).replace( ".", "_" ), "hello_world", "should return 'hello​_world'" );

console.log( "ok" );
