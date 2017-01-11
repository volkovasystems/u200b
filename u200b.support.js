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
			"diatom": "diatom",
			"harden": "harden",
			"optfor": "optfor",
			"plough": "plough",
			"protype": "protype",
			"truly": "truly"
		}
	@end-include
*/

var arid = require("arid");
var clazof = require("clazof");
var diatom = require("diatom");
var harden = require("harden");
var optfor = require("optfor");
var plough = require("plough");
var protype = require("protype");
var truly = require("truly");

var U200b = diatom("U200b");

harden("U200B", "\u200B");
harden("U200B_BASE16", "ffffffff0000200bffffffff");
harden("INSERT", "insert");
harden("PREPEND", "prepend");
harden("APPEND", "append");

U200b.prototype.initialize = function initialize(string) {
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

	var text = plough(arguments).map(function (parameter) {
		return parameter.toString();
	}).filter(truly);

	//: This will handle the modification done to the strings.
	this.history = this.history || [];

	//: Create an original copy.
	this.text = [].concat(text);

	this.string = text;

	this.base(U200B);

	this.identify();

	return this;
};

/*;
	@method-documentation:
		This will set the default base type of U200B
			to any base type as long as it is supported.

		Setting to use U200B_BASE16 will make the string size bigger.
	@end-method-documentation
*/
U200b.prototype.base = function base(type) {
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

	if (type !== U200B && type !== U200B_BASE16) {
		throw new Error("invalid base type");
	}

	this.type = type;

	return this;
};

/*;
	@method-documentation:
		This will auto-identify the base type.
	@end-method-documentation
*/
U200b.prototype.identify = function identify() {
	var string = this.string.join("");

	if (new RegExp(U200B, "g").test(string)) {
		this.type = U200B;
	} else if (new RegExp(U200B_BASE16, "g").test(string)) {
		this.type = U200B_BASE16;
	} else {
		this.type = U200B;
	}

	return this;
};

U200b.prototype.separate = function separate() {
	return this.string.join("").split(this.type);
};

U200b.prototype.release = function release() {
	//: If there are no modifications do the default insert.
	if (arid(this.history)) {
		this.insert();
	}

	return [].concat(this.string);
};

U200b.prototype.join = function join(separator) {
	return this.release().join(separator || "");
};

U200b.prototype.toString = function toString() {
	return this.join();
};

U200b.prototype.valueOf = function valueOf() {
	return this.release();
};

U200b.prototype.raw = function raw() {
	return this.toString().replace(new RegExp(this.type, "g"), "");
};

/*;
	@method-documentation:
		Append zero-width space on every end of the string.

		If new strings proceeds the old set strings
			they will be appended and applied with zero-width space.
	@end-method-documentation
*/
U200b.prototype.append = function append(string) {
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

	var text = plough(arguments).map(function (parameter) {
		return parameter.toString();
	}).filter(truly) || [];

	this.string = this.string.concat(text).map(function onEachToken(token) {
		return token + this.type;
	}.bind(this));

	this.history.push(APPEND);

	return this;
};

/*;
	@method-documentation:
		Prepend zero-width space on every start of the string.

		If new strings preceeds the old set strings
			they will be prepended and applied with zero-width space.
	@end-method-documentation
*/
U200b.prototype.prepend = function prepend(string) {
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

	var text = plough(arguments).map(function (parameter) {
		return parameter.toString();
	}).filter(truly) || [];

	this.string = text.concat(this.string).map(function onEachToken(token) {
		return this.type + token;
	}.bind(this));

	this.history.push(PREPEND);

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
U200b.prototype.insert = function insert(string, pattern) {
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

	var text = plough(arguments).map(function onEachParameter(parameter) {
		if (clazof(parameter, RegExp)) {
			return null;
		}

		return parameter.toString();
	}).filter(truly) || [];

	var template = optfor(arguments, RegExp);

	if (truly(template)) {
		this.string = this.string.concat(text).map(function onEachToken(token) {
			return token.replace(template, this.type);
		}.bind(this));
	} else {
		this.string = this.string.concat(text).join(this.type + "[,]").split("[,]");
	}

	this.history.push(INSERT);

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
U200b.prototype.clear = function clear() {
	this.string = this.text;

	this.history = [];

	return this;
};

module.exports = U200b;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInUyMDBiLmpzIl0sIm5hbWVzIjpbImFyaWQiLCJyZXF1aXJlIiwiY2xhem9mIiwiZGlhdG9tIiwiaGFyZGVuIiwib3B0Zm9yIiwicGxvdWdoIiwicHJvdHlwZSIsInRydWx5IiwiVTIwMGIiLCJwcm90b3R5cGUiLCJpbml0aWFsaXplIiwic3RyaW5nIiwidGV4dCIsImFyZ3VtZW50cyIsIm1hcCIsInBhcmFtZXRlciIsInRvU3RyaW5nIiwiZmlsdGVyIiwiaGlzdG9yeSIsImNvbmNhdCIsImJhc2UiLCJVMjAwQiIsImlkZW50aWZ5IiwidHlwZSIsIlUyMDBCX0JBU0UxNiIsIkVycm9yIiwiam9pbiIsIlJlZ0V4cCIsInRlc3QiLCJzZXBhcmF0ZSIsInNwbGl0IiwicmVsZWFzZSIsImluc2VydCIsInNlcGFyYXRvciIsInZhbHVlT2YiLCJyYXciLCJyZXBsYWNlIiwiYXBwZW5kIiwib25FYWNoVG9rZW4iLCJ0b2tlbiIsImJpbmQiLCJwdXNoIiwiQVBQRU5EIiwicHJlcGVuZCIsIlBSRVBFTkQiLCJwYXR0ZXJuIiwib25FYWNoUGFyYW1ldGVyIiwidGVtcGxhdGUiLCJJTlNFUlQiLCJjbGVhciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0VBLElBQU1BLE9BQU9DLFFBQVMsTUFBVCxDQUFiO0FBQ0EsSUFBTUMsU0FBU0QsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNRSxTQUFTRixRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1HLFNBQVNILFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUksU0FBU0osUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNSyxTQUFTTCxRQUFTLFFBQVQsQ0FBZjtBQUNBLElBQU1NLFVBQVVOLFFBQVMsU0FBVCxDQUFoQjtBQUNBLElBQU1PLFFBQVFQLFFBQVMsT0FBVCxDQUFkOztBQUVBLElB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UDtBQUNBLEdBRkssQ0FFRmlCLElBRkUsQ0FFSSxJQUZKLENBRk8sQ0FBZDtBQU1BLEVBUEQsTUFPSztBQUNKLE9BQUs3QixNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUNaUSxNQURZLENBQ0pQLElBREksRUFFWmMsSUFGWSxDQUVOLEtBQUtILElBQUwsR0FBWSxLQUZOLEVBR1pPLEtBSFksQ0FHTCxLQUhLLENBQWQ7QUFJQTs7QUFFRCxNQUFLWixPQUFMLENBQWF1QixJQUFiLENBQW1CTyxNQUFuQjs7QUFFQSxRQUFPLElBQVA7QUFDQSxDQTNDRDs7QUE2Q0E7Ozs7Ozs7Ozs7QUFVQXhDLE1BQU1DLFNBQU4sQ0FBZ0J3QyxLQUFoQixHQUF3QixTQUFTQSxLQUFULEdBQWlCO0FBQ3hDLE1BQUt0QyxNQUFMLEdBQWMsS0FBS0MsSUFBbkI7O0FBRUEsTUFBS00sT0FBTCxHQUFlLEVBQWY7O0FBRUEsUUFBTyxJQUFQO0FBQ0EsQ0FORDs7QUFRQWdDLE9BQU9DLE9BQVAsR0FBaUIzQyxLQUFqQiIsImZpbGUiOiJ1MjAwYi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QG1vZHVsZS1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcblxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwidTIwMGJcIixcblx0XHRcdFwicGF0aFwiOiBcInUyMDBiL3UyMDBiLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJ1MjAwYi5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJ1MjAwYlwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL3UyMDBiLmdpdFwiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZSxcblx0XHRcdFwiY2xhc3NcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRBcHBlbmQsIHByZXBlbmQsIGFuZCBpbnNlcnQgemVyby13aWR0aCBzcGFjZSB0byBub24tZW1wdHkgc3RyaW5nLlxuXG5cdFx0VGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGlzIHRvIG1ha2UgdGhlIHN0cmluZyB2aXNpYmxlIGFzIGl0IGlzXG5cdFx0XHRidXQgd2UgY2FuIHN0aWxsIGRpdmlkZSBpdCB0aGUgd2F5IHdlIHdhbnQgaXQgdG8gYmUgZGl2aWRlZC5cblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxuXG5cdEBpbmNsdWRlOlxuXHRcdHtcblx0XHRcdFwiYXJpZFwiOiBcImFyaWRcIixcblx0XHRcdFwiZGlhdG9tXCI6IFwiZGlhdG9tXCIsXG5cdFx0XHRcImhhcmRlblwiOiBcImhhcmRlblwiLFxuXHRcdFx0XCJvcHRmb3JcIjogXCJvcHRmb3JcIixcblx0XHRcdFwicGxvdWdoXCI6IFwicGxvdWdoXCIsXG5cdFx0XHRcInByb3R5cGVcIjogXCJwcm90eXBlXCIsXG5cdFx0XHRcInRydWx5XCI6IFwidHJ1bHlcIlxuXHRcdH1cblx0QGVuZC1pbmNsdWRlXG4qL1xuXG5jb25zdCBhcmlkID0gcmVxdWlyZSggXCJhcmlkXCIgKTtcbmNvbnN0IGNsYXpvZiA9IHJlcXVpcmUoIFwiY2xhem9mXCIgKTtcbmNvbnN0IGRpYXRvbSA9IHJlcXVpcmUoIFwiZGlhdG9tXCIgKTtcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcbmNvbnN0IG9wdGZvciA9IHJlcXVpcmUoIFwib3B0Zm9yXCIgKTtcbmNvbnN0IHBsb3VnaCA9IHJlcXVpcmUoIFwicGxvdWdoXCIgKTtcbmNvbnN0IHByb3R5cGUgPSByZXF1aXJlKCBcInByb3R5cGVcIiApO1xuY29uc3QgdHJ1bHkgPSByZXF1aXJlKCBcInRydWx5XCIgKTtcblxuY29uc3QgVTIwMGIgPSBkaWF0b20oIFwiVTIwMGJcIiApO1xuXG5oYXJkZW4oIFwiVTIwMEJcIiwgXCJcXHUyMDBiXCIgKTtcbmhhcmRlbiggXCJVMjAwQl9CQVNFMTZcIiwgXCJmZmZmZmZmZjAwMDAyMDBiZmZmZmZmZmZcIiApO1xuaGFyZGVuKCBcIklOU0VSVFwiLCBcImluc2VydFwiICk7XG5oYXJkZW4oIFwiUFJFUEVORFwiLCBcInByZXBlbmRcIiApO1xuaGFyZGVuKCBcIkFQUEVORFwiLCBcImFwcGVuZFwiICk7XG5cblUyMDBiLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gaW5pdGlhbGl6ZSggc3RyaW5nICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcblx0XHRcdFx0XHRcIi4uLlwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGxldCB0ZXh0ID0gcGxvdWdoKCBhcmd1bWVudHMgKVxuXHRcdC5tYXAoICggcGFyYW1ldGVyICkgPT4geyByZXR1cm4gcGFyYW1ldGVyLnRvU3RyaW5nKCApOyB9IClcblx0XHQuZmlsdGVyKCB0cnVseSApO1xuXG5cdC8vOiBUaGlzIHdpbGwgaGFuZGxlIHRoZSBtb2RpZmljYXRpb24gZG9uZSB0byB0aGUgc3RyaW5ncy5cblx0dGhpcy5oaXN0b3J5ID0gdGhpcy5oaXN0b3J5IHx8IFsgXTtcblxuXHQvLzogQ3JlYXRlIGFuIG9yaWdpbmFsIGNvcHkuXG5cdHRoaXMudGV4dCA9IFsgXS5jb25jYXQoIHRleHQgKTtcblxuXHR0aGlzLnN0cmluZyA9IHRleHQ7XG5cblx0dGhpcy5iYXNlKCBVMjAwQiApO1xuXG5cdHRoaXMuaWRlbnRpZnkoICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFRoaXMgd2lsbCBzZXQgdGhlIGRlZmF1bHQgYmFzZSB0eXBlIG9mIFUyMDBCXG5cdFx0XHR0byBhbnkgYmFzZSB0eXBlIGFzIGxvbmcgYXMgaXQgaXMgc3VwcG9ydGVkLlxuXG5cdFx0U2V0dGluZyB0byB1c2UgVTIwMEJfQkFTRTE2IHdpbGwgbWFrZSB0aGUgc3RyaW5nIHNpemUgYmlnZ2VyLlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuVTIwMGIucHJvdG90eXBlLmJhc2UgPSBmdW5jdGlvbiBiYXNlKCB0eXBlICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwidHlwZTpyZXF1aXJlZFwiOiBbXG5cdFx0XHRcdFx0VTIwMEIsXG5cdFx0XHRcdFx0VTIwMEJfQkFTRTE2XG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCB0eXBlICE9PSBVMjAwQiAmJiB0eXBlICE9PSBVMjAwQl9CQVNFMTYgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiaW52YWxpZCBiYXNlIHR5cGVcIiApO1xuXHR9XG5cblx0dGhpcy50eXBlID0gdHlwZTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qO1xuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XG5cdFx0VGhpcyB3aWxsIGF1dG8taWRlbnRpZnkgdGhlIGJhc2UgdHlwZS5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cblUyMDBiLnByb3RvdHlwZS5pZGVudGlmeSA9IGZ1bmN0aW9uIGlkZW50aWZ5KCApe1xuXHRsZXQgc3RyaW5nID0gdGhpcy5zdHJpbmcuam9pbiggXCJcIiApO1xuXG5cdGlmKCAoIG5ldyBSZWdFeHAoIFUyMDBCLCBcImdcIiApICkudGVzdCggc3RyaW5nICkgKXtcblx0XHR0aGlzLnR5cGUgPSBVMjAwQjtcblxuXHR9ZWxzZSBpZiggKCBuZXcgUmVnRXhwKCBVMjAwQl9CQVNFMTYsIFwiZ1wiICkgKS50ZXN0KCBzdHJpbmcgKSApe1xuXHRcdHRoaXMudHlwZSA9IFUyMDBCX0JBU0UxNjtcblxuXHR9ZWxzZXtcblx0XHR0aGlzLnR5cGUgPSBVMjAwQjtcblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuVTIwMGIucHJvdG90eXBlLnNlcGFyYXRlID0gZnVuY3Rpb24gc2VwYXJhdGUoICl7XG5cdHJldHVybiB0aGlzLnN0cmluZy5qb2luKCBcIlwiICkuc3BsaXQoIHRoaXMudHlwZSApO1xufTtcblxuVTIwMGIucHJvdG90eXBlLnJlbGVhc2UgPSBmdW5jdGlvbiByZWxlYXNlKCApe1xuXHQvLzogSWYgdGhlcmUgYXJlIG5vIG1vZGlmaWNhdGlvbnMgZG8gdGhlIGRlZmF1bHQgaW5zZXJ0LlxuXHRpZiggYXJpZCggdGhpcy5oaXN0b3J5ICkgKXtcblx0XHR0aGlzLmluc2VydCggKTtcblx0fVxuXG5cdHJldHVybiBbIF0uY29uY2F0KCB0aGlzLnN0cmluZyApO1xufTtcblxuVTIwMGIucHJvdG90eXBlLmpvaW4gPSBmdW5jdGlvbiBqb2luKCBzZXBhcmF0b3IgKXtcblx0cmV0dXJuIHRoaXMucmVsZWFzZSggKS5qb2luKCBzZXBhcmF0b3IgfHwgXCJcIiApO1xufTtcblxuVTIwMGIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoICl7XG5cdHJldHVybiB0aGlzLmpvaW4oICk7XG59O1xuXG5VMjAwYi5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uIHZhbHVlT2YoICl7XG5cdHJldHVybiB0aGlzLnJlbGVhc2UoICk7XG59O1xuXG5VMjAwYi5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24gcmF3KCApe1xuXHRyZXR1cm4gdGhpcy50b1N0cmluZyggKS5yZXBsYWNlKCBuZXcgUmVnRXhwKCB0aGlzLnR5cGUsIFwiZ1wiICksIFwiXCIgKTtcbn07XG5cbi8qO1xuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XG5cdFx0QXBwZW5kIHplcm8td2lkdGggc3BhY2Ugb24gZXZlcnkgZW5kIG9mIHRoZSBzdHJpbmcuXG5cblx0XHRJZiBuZXcgc3RyaW5ncyBwcm9jZWVkcyB0aGUgb2xkIHNldCBzdHJpbmdzXG5cdFx0XHR0aGV5IHdpbGwgYmUgYXBwZW5kZWQgYW5kIGFwcGxpZWQgd2l0aCB6ZXJvLXdpZHRoIHNwYWNlLlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuVTIwMGIucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZCggc3RyaW5nICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcblx0XHRcdFx0XHRcIi4uLlwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGxldCB0ZXh0ID0gcGxvdWdoKCBhcmd1bWVudHMgKVxuXHRcdC5tYXAoICggcGFyYW1ldGVyICkgPT4geyByZXR1cm4gcGFyYW1ldGVyLnRvU3RyaW5nKCApOyB9IClcblx0XHQuZmlsdGVyKCB0cnVseSApIHx8IFsgXTtcblxuXHR0aGlzLnN0cmluZyA9IHRoaXMuc3RyaW5nXG5cdFx0LmNvbmNhdCggdGV4dCApXG5cdFx0Lm1hcCggKCBmdW5jdGlvbiBvbkVhY2hUb2tlbiggdG9rZW4gKXtcblx0XHRcdHJldHVybiB0b2tlbiArIHRoaXMudHlwZTtcblx0XHR9ICkuYmluZCggdGhpcyApICk7XG5cblx0dGhpcy5oaXN0b3J5LnB1c2goIEFQUEVORCApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyo7XG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcblx0XHRQcmVwZW5kIHplcm8td2lkdGggc3BhY2Ugb24gZXZlcnkgc3RhcnQgb2YgdGhlIHN0cmluZy5cblxuXHRcdElmIG5ldyBzdHJpbmdzIHByZWNlZWRzIHRoZSBvbGQgc2V0IHN0cmluZ3Ncblx0XHRcdHRoZXkgd2lsbCBiZSBwcmVwZW5kZWQgYW5kIGFwcGxpZWQgd2l0aCB6ZXJvLXdpZHRoIHNwYWNlLlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuVTIwMGIucHJvdG90eXBlLnByZXBlbmQgPSBmdW5jdGlvbiBwcmVwZW5kKCBzdHJpbmcgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJzdHJpbmdcIjogW1xuXHRcdFx0XHRcdFwic3RyaW5nXCIsXG5cdFx0XHRcdFx0XCJbc3RyaW5nXVwiLFxuXHRcdFx0XHRcdFwiLi4uXCJcblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0bGV0IHRleHQgPSBwbG91Z2goIGFyZ3VtZW50cyApXG5cdFx0Lm1hcCggKCBwYXJhbWV0ZXIgKSA9PiB7IHJldHVybiBwYXJhbWV0ZXIudG9TdHJpbmcoICk7IH0gKVxuXHRcdC5maWx0ZXIoIHRydWx5ICkgfHwgWyBdO1xuXG5cdHRoaXMuc3RyaW5nID0gdGV4dFxuXHRcdC5jb25jYXQoIHRoaXMuc3RyaW5nIClcblx0XHQubWFwKCAoIGZ1bmN0aW9uIG9uRWFjaFRva2VuKCB0b2tlbiApe1xuXHRcdFx0cmV0dXJuIHRoaXMudHlwZSArIHRva2VuO1xuXHRcdH0gKS5iaW5kKCB0aGlzICkgKTtcblxuXHR0aGlzLmhpc3RvcnkucHVzaCggUFJFUEVORCApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyo7XG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcblx0XHRJbnNlcnRzIHplcm8td2lkdGggc3BhY2Ugb24gZXZlcnkgZ2FwIG9mIHRoZSBzdHJpbmcuXG5cblx0XHRJZiBuZXcgc3RyaW5ncyBhcmUgaW5zZXJ0ZWQgd2l0aCB0aGUgb2xkIHNldCBzdHJpbmdzLFxuXHRcdFx0emVyby13aWR0aCBzcGFjZSB3aWxsIGJlIGFwcGxpZWQgYWxzby5cblxuXHRcdElmIGEgcGF0dGVybiBpcyBzdXBwbGllZCwgaXQgd2lsbCBpbnNlcnQgemVyby13aWR0aCBzcGFjZVxuXHRcdFx0b24gZXZlcnkgb2NjdXJyZW5jZSBvZiB0aGUgcGF0dGVybiBvbiB0aGUgc3RyaW5nLlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuVTIwMGIucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCggc3RyaW5nLCBwYXR0ZXJuICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcblx0XHRcdFx0XHRcIi4uLlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFwicGF0dGVyblwiOiBcIlJlZ0V4cFwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRsZXQgdGV4dCA9IHBsb3VnaCggYXJndW1lbnRzIClcblx0XHQubWFwKCBmdW5jdGlvbiBvbkVhY2hQYXJhbWV0ZXIoIHBhcmFtZXRlciApe1xuXHRcdFx0aWYoIGNsYXpvZiggcGFyYW1ldGVyLCBSZWdFeHAgKSApe1xuXHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHBhcmFtZXRlci50b1N0cmluZyggKTtcblx0XHR9IClcblx0XHQuZmlsdGVyKCB0cnVseSApIHx8IFsgXTtcblxuXHRsZXQgdGVtcGxhdGUgPSBvcHRmb3IoIGFyZ3VtZW50cywgUmVnRXhwICk7XG5cblx0aWYoIHRydWx5KCB0ZW1wbGF0ZSApICl7XG5cdFx0dGhpcy5zdHJpbmcgPSB0aGlzLnN0cmluZ1xuXHRcdFx0LmNvbmNhdCggdGV4dCApXG5cdFx0XHQubWFwKCAoIGZ1bmN0aW9uIG9uRWFjaFRva2VuKCB0b2tlbiApe1xuXHRcdFx0XHRyZXR1cm4gdG9rZW4ucmVwbGFjZSggdGVtcGxhdGUsIHRoaXMudHlwZSApO1xuXHRcdFx0fSApLmJpbmQoIHRoaXMgKSApO1xuXG5cdH1lbHNle1xuXHRcdHRoaXMuc3RyaW5nID0gdGhpcy5zdHJpbmdcblx0XHRcdC5jb25jYXQoIHRleHQgKVxuXHRcdFx0LmpvaW4oIHRoaXMudHlwZSArIFwiWyxdXCIgKVxuXHRcdFx0LnNwbGl0KCBcIlssXVwiICk7XG5cdH1cblxuXHR0aGlzLmhpc3RvcnkucHVzaCggSU5TRVJUICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFJldmVydHMgdG8gdGhlIG9yaWdpbmFsIHN0cmluZy5cblxuXHRcdENsZWFycyBoaXN0b3J5LlxuXG5cdFx0VGhpcyBkb2VzIG5vdCBpbmNsdWRlIGFwcGVuZGVkLCBwcmVwZW5kZWQgb3IgaW5zZXJ0ZWQgc3RyaW5ncy5cblx0XHRcdFNvIHRoZSBvcmlnaW5hbCBzdHJpbmcgaXMgdGhlIG9uZSB5b3UgaW5pdGlhbGl6ZS5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cblUyMDBiLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCApe1xuXHR0aGlzLnN0cmluZyA9IHRoaXMudGV4dDtcblxuXHR0aGlzLmhpc3RvcnkgPSBbIF07XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFUyMDBiO1xuIl19