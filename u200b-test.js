
const assert = require( "assert" );
const U200b = require( "./u200b.js" );

assert.ok( U200b( "hello", "world" ), "should not throw error" );

assert.equal( U200b( "hello", "world" ).join( "." ), "hello​.world", "should be equal to 'hello​.world'" );

let test = U200b( "hello", "world" ).join( "." );
assert.equal( U200b( test ).replace( ".", "_" ), "hello_world", "should be equal to 'hello​_world'" );

console.log( "ok" );
