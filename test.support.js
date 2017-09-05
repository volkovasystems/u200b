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
              */var _typeof2 = require("babel-runtime/helpers/typeof");var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var assert = require("should");



//: @client:
var U200b = require("./u200b.support.js");
//: @end-client







//: @client:
describe("u200b", function () {

	describe("`U200b( 'hello', 'world' )`", function () {
		it("should contain history, string, text and type properties", function () {
			var result = U200b("hello", "world");

			assert.equal(typeof result === "undefined" ? "undefined" : (0, _typeof3.default)(result), "object");

			assert.equal("history" in result, true);

			assert.equal("string" in result, true);

			assert.equal("text" in result, true);

			assert.equal("type" in result, true);
		});
	});

	describe("`U200b( 'hello', 'world' ).join( '.' )`", function () {
		it("should be equal to 'hello​.world'", function () {
			var result = U200b("hello", "world").join(".");

			assert.equal(result, "hello​.world");
		});
	});

	describe("`U200b( 'hello', 'world' ).join( '.' ).replace( '.', '_' )`", function () {
		it("should be equal to 'hello​_world'", function () {
			var data = U200b("hello", "world").join(".");
			var result = U200b(data).replace(".", "_");

			assert.equal(result, "hello_world");
		});
	});

});
//: @end-client
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Quc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJhc3NlcnQiLCJyZXF1aXJlIiwiVTIwMGIiLCJkZXNjcmliZSIsIml0IiwicmVzdWx0IiwiZXF1YWwiLCJqb2luIiwiZGF0YSIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtREEsSUFBTUEsU0FBU0MsUUFBUyxRQUFULENBQWY7Ozs7QUFJQTtBQUNBLElBQU1DLFFBQVFELFFBQVMsb0JBQVQsQ0FBZDtBQUNBOzs7Ozs7OztBQVFBO0FBQ0FFLFNBQVUsT0FBVixFQUFtQixZQUFPOztBQUV6QkEsVUFBVSw2QkFBVixFQUF5QyxZQUFPO0FBQy9DQyxLQUFJLDBEQUFKLEVBQWdFLFlBQU87QUFDdEUsT0FBSUMsU0FBU0gsTUFBTyxPQUFQLEVBQWdCLE9BQWhCLENBQWI7O0FBRUFGLFVBQU9NLEtBQVAsUUFBcUJELE1BQXJCLHVEQUFxQkEsTUFBckIsR0FBNkIsUUFBN0I7O0FBRUFMLFVBQU9NLEtBQVAsQ0FBYyxhQUFhRCxNQUEzQixFQUFtQyxJQUFuQzs7QUFFQUwsVUFBT00sS0FBUCxDQUFjLFlBQVlELE1BQTFCLEVBQWtDLElBQWxDOztBQUVBTCxVQUFPTSxLQUFQLENBQWMsVUFBVUQsTUFBeEIsRUFBZ0MsSUFBaEM7O0FBRUFMLFVBQU9NLEtBQVAsQ0FBYyxVQUFVRCxNQUF4QixFQUFnQyxJQUFoQztBQUNBLEdBWkQ7QUFhQSxFQWREOztBQWdCQUYsVUFBVSx5Q0FBVixFQUFxRCxZQUFPO0FBQzNEQyxLQUFJLG1DQUFKLEVBQXlDLFlBQU87QUFDL0MsT0FBSUMsU0FBU0gsTUFBTyxPQUFQLEVBQWdCLE9BQWhCLEVBQTBCSyxJQUExQixDQUFnQyxHQUFoQyxDQUFiOztBQUVBUCxVQUFPTSxLQUFQLENBQWNELE1BQWQsRUFBc0IsY0FBdEI7QUFDQSxHQUpEO0FBS0EsRUFORDs7QUFRQUYsVUFBVSw2REFBVixFQUF5RSxZQUFPO0FBQy9FQyxLQUFJLG1DQUFKLEVBQXlDLFlBQU87QUFDL0MsT0FBSUksT0FBT04sTUFBTyxPQUFQLEVBQWdCLE9BQWhCLEVBQTBCSyxJQUExQixDQUFnQyxHQUFoQyxDQUFYO0FBQ0EsT0FBSUYsU0FBU0gsTUFBT00sSUFBUCxFQUFjQyxPQUFkLENBQXVCLEdBQXZCLEVBQTRCLEdBQTVCLENBQWI7O0FBRUFULFVBQU9NLEtBQVAsQ0FBY0QsTUFBZCxFQUFzQixhQUF0QjtBQUNBLEdBTEQ7QUFNQSxFQVBEOztBQVNBLENBbkNEO0FBb0NBIiwiZmlsZSI6InRlc3Quc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QHRlc3QtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLXRlc3QtbGljZW5zZVxuXG5cdEB0ZXN0LWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwidTIwMGJcIixcblx0XHRcdFwicGF0aFwiOiBcInUyMDBiL3Rlc3QubW9kdWxlLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJ0ZXN0Lm1vZHVsZS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJ0ZXN0XCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy91MjAwYi5naXRcIlxuXHRcdH1cblx0QGVuZC10ZXN0LWNvbmZpZ3VyYXRpb25cblxuXHRAdGVzdC1kb2N1bWVudGF0aW9uOlxuXG5cdEBlbmQtdGVzdC1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc3NlcnRcIjogXCJzaG91bGRcIixcblx0XHRcdFwidTIwMGJcIjogXCJ1MjAwYlwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoIFwic2hvdWxkXCIgKTtcblxuXG5cbi8vOiBAY2xpZW50OlxuY29uc3QgVTIwMGIgPSByZXF1aXJlKCBcIi4vdTIwMGIuc3VwcG9ydC5qc1wiICk7XG4vLzogQGVuZC1jbGllbnRcblxuXG5cblxuXG5cblxuLy86IEBjbGllbnQ6XG5kZXNjcmliZSggXCJ1MjAwYlwiLCAoICkgPT4ge1xuXG5cdGRlc2NyaWJlKCBcImBVMjAwYiggJ2hlbGxvJywgJ3dvcmxkJyApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBjb250YWluIGhpc3RvcnksIHN0cmluZywgdGV4dCBhbmQgdHlwZSBwcm9wZXJ0aWVzXCIsICggKSA9PiB7XG5cdFx0XHRsZXQgcmVzdWx0ID0gVTIwMGIoIFwiaGVsbG9cIiwgXCJ3b3JsZFwiICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggdHlwZW9mIHJlc3VsdCwgXCJvYmplY3RcIiApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIFwiaGlzdG9yeVwiIGluIHJlc3VsdCwgdHJ1ZSApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIFwic3RyaW5nXCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggXCJ0ZXh0XCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggXCJ0eXBlXCIgaW4gcmVzdWx0LCB0cnVlICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYFUyMDBiKCAnaGVsbG8nLCAnd29ybGQnICkuam9pbiggJy4nIClgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICdoZWxsb+KAiy53b3JsZCdcIiwgKCApID0+IHtcblx0XHRcdGxldCByZXN1bHQgPSBVMjAwYiggXCJoZWxsb1wiLCBcIndvcmxkXCIgKS5qb2luKCBcIi5cIiApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCJoZWxsb+KAiy53b3JsZFwiICk7XG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYFUyMDBiKCAnaGVsbG8nLCAnd29ybGQnICkuam9pbiggJy4nICkucmVwbGFjZSggJy4nLCAnXycgKWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ2hlbGxv4oCLX3dvcmxkJ1wiLCAoICkgPT4ge1xuXHRcdFx0bGV0IGRhdGEgPSBVMjAwYiggXCJoZWxsb1wiLCBcIndvcmxkXCIgKS5qb2luKCBcIi5cIiApO1xuXHRcdFx0bGV0IHJlc3VsdCA9IFUyMDBiKCBkYXRhICkucmVwbGFjZSggXCIuXCIsIFwiX1wiICk7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCBcImhlbGxvX3dvcmxkXCIgKTtcblx0XHR9ICk7XG5cdH0gKTtcblxufSApO1xuLy86IEBlbmQtY2xpZW50XG5cblxuXG4iXX0=
//# sourceMappingURL=test.support.js.map
