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
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
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
              			"falzy": "falzy",
              			"harden": "harden",
              			"optfor": "optfor",
              			"plough": "plough",
              			"stringe": "stringe",
              			"truly": "truly",
              			"wichevr": "wichevr"
              		}
              	@end-include
              */

var arid = require("arid");
var clazof = require("clazof");
var diatom = require("diatom");
var falzy = require("falzy");
var harden = require("harden");
var optfor = require("optfor");
var plough = require("plough");
var stringe = require("stringe");
var truly = require("truly");
var wichevr = require("wichevr");

var U200b = diatom("U200b");

harden("U200B", "\u200B");
harden("U200B_BASE16", "ffffffff0000200bffffffff");
harden("INSERT", "insert");
harden("PREPEND", "prepend");
harden("APPEND", "append");

var EMPTY_SPACE = "";
var SPACE = " ";

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

	var text = plough(arguments).filter(truly).map(stringe);

	//: This will handle the modification done to the strings.
	this.history = wichevr(this.history, []);

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
	return this.release().join(separator || EMPTY_SPACE);
};

U200b.prototype.toString = function toString() {
	return this.join();
};

U200b.prototype.valueOf = function valueOf() {
	return this.release();
};

U200b.prototype.raw = function raw() {
	return stringe(this).replace(new RegExp(this.type, "g"), EMPTY_SPACE);
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

	var text = wichevr(plough(arguments).filter(truly).map(stringe), []);

	this.string = this.string.concat(text).
	map(function onEachToken(token) {
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

	var text = wichevr(plough(arguments).filter(truly).map(stringe), []);

	this.string = text.concat(this.string).
	map(function onEachToken(token) {
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

	var text = wichevr(plough(arguments).filter(truly).
	map(function onEachParameter(parameter) {
		if (clazof(parameter, RegExp)) {
			return null;
		}

		return stringe(parameter);
	}), []);

	var template = optfor(arguments, RegExp);

	if (truly(template)) {
		this.string = this.string.concat(text).
		map(function onEachToken(token) {
			return token.replace(template, this.type);
		}.bind(this));

	} else {
		this.string = this.string.
		concat(text).
		join(this.type + "[,]").
		split("[,]");
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

/*;
   	@method-documentation:
   		Replace the separating token with the specified token,
   			this will also clear the zero width space applied.
   	@end-method-documentation
   */
U200b.prototype.replace = function replace(separator, token) {
	/*;
                                                              	@meta-configuration:
                                                              		{
                                                              			"separator:required": "string",
                                                              			"token:required": "string"
                                                              		}
                                                              	@end-meta-configuration
                                                              */

	if (falzy(separator) || typeof separator != "string") {
		separator = SPACE;
	}

	if (falzy(token) || typeof token != "string") {
		token = SPACE;
	}

	return this.separate().join(EMPTY_SPACE).split(separator).join(token);
};

module.exports = U200b;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInUyMDBiLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYXJpZCIsInJlcXVpcmUiLCJjbGF6b2YiLCJkaWF0b20iLCJmYWx6eSIsImhhcmRlbiIsIm9wdGZvciIsInBsb3VnaCIsInN0cmluZ2UiLCJ0cnVseSIsIndpY2hldnIiLCJVMjAwYiIsIkVNUFRZX1NQQUNFIiwiU1BBQ0UiLCJwcm90b3R5cGUiLCJpbml0aWFsaXplIiwic3RyaW5nIiwidGV4dCIsImFyZ3VtZW50cyIsImZpbHRlciIsIm1hcCIsImhpc3RvcnkiLCJjb25jYXQiLCJiYXNlIiwiVTIwMEIiLCJpZGVudGlmeSIsInR5cGUiLCJVMjAwQl9CQVNFMTYiLCJFcnJvciIsImpvaW4iLCJSZWdFeHAiLCJ0ZXN0Iiwic2VwYXJhdGUiLCJzcGxpdCIsInJlbGVhc2UiLCJpbnNlcnQiLCJzZXBhcmF0b3IiLCJ0b1N0cmluZyIsInZhbHVlT2YiLCJyYXciLCJyZXBsYWNlIiwiYXBwZW5kIiwib25FYWNoVG9rZW4iLCJ0b2tlbiIsImJpbmQiLCJwdXNoIiwiQVBQRU5EIiwicHJlcGVuZCIsIlBSRVBFTkQiLCJwYXR0ZXJuIiwib25FYWNoUGFyYW1ldGVyIiwicGFyYW1ldGVyIiwidGVtcGxhdGUiLCJJTlNFUlQiLCJjbGVhciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9FQSxJQUFNQSxPQUFPQyxRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsU0FBU0YsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNRyxRQUFRSCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1JLFNBQVNKLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUssU0FBU0wsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNTSxTQUFTTixRQUFT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QkQ7O0FBcUJBWSxPQUFPQyxPQUFQLEdBQWlCN0MsS0FBakIiLCJmaWxlIjoidTIwMGIuc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QG1vZHVsZS1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcblxuXHRAbW9kdWxlLWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwidTIwMGJcIixcblx0XHRcdFwicGF0aFwiOiBcInUyMDBiL3UyMDBiLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJ1MjAwYi5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJ1MjAwYlwiLFxuXHRcdFx0XCJhdXRob3JcIjogXCJSaWNoZXZlIFMuIEJlYmVkb3JcIixcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXG5cdFx0XHRcdFwiSm9obiBMZW5vbiBNYWdoYW5veSA8am9obmxlbm9ubWFnaGFub3lAZ21haWwuY29tPlwiLFxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcblx0XHRcdF0sXG5cdFx0XHRcInJlcG9zaXRvcnlcIjogXCJodHRwczovL2dpdGh1Yi5jb20vdm9sa292YXN5c3RlbXMvdTIwMGIuZ2l0XCIsXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlLFxuXHRcdFx0XCJjbGFzc1wiOiB0cnVlXG5cdFx0fVxuXHRAZW5kLW1vZHVsZS1jb25maWd1cmF0aW9uXG5cblx0QG1vZHVsZS1kb2N1bWVudGF0aW9uOlxuXHRcdEFwcGVuZCwgcHJlcGVuZCwgYW5kIGluc2VydCB6ZXJvLXdpZHRoIHNwYWNlIHRvIG5vbi1lbXB0eSBzdHJpbmcuXG5cblx0XHRUaGUgbWFpbiBwdXJwb3NlIG9mIHRoaXMgaXMgdG8gbWFrZSB0aGUgc3RyaW5nIHZpc2libGUgYXMgaXQgaXNcblx0XHRcdGJ1dCB3ZSBjYW4gc3RpbGwgZGl2aWRlIGl0IHRoZSB3YXkgd2Ugd2FudCBpdCB0byBiZSBkaXZpZGVkLlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhcmlkXCI6IFwiYXJpZFwiLFxuXHRcdFx0XCJjbGF6b2ZcIjogXCJjbGF6b2ZcIixcblx0XHRcdFwiZGlhdG9tXCI6IFwiZGlhdG9tXCIsXG5cdFx0XHRcImZhbHp5XCI6IFwiZmFsenlcIixcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXG5cdFx0XHRcIm9wdGZvclwiOiBcIm9wdGZvclwiLFxuXHRcdFx0XCJwbG91Z2hcIjogXCJwbG91Z2hcIixcblx0XHRcdFwic3RyaW5nZVwiOiBcInN0cmluZ2VcIixcblx0XHRcdFwidHJ1bHlcIjogXCJ0cnVseVwiLFxuXHRcdFx0XCJ3aWNoZXZyXCI6IFwid2ljaGV2clwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFyaWQgPSByZXF1aXJlKCBcImFyaWRcIiApO1xuY29uc3QgY2xhem9mID0gcmVxdWlyZSggXCJjbGF6b2ZcIiApO1xuY29uc3QgZGlhdG9tID0gcmVxdWlyZSggXCJkaWF0b21cIiApO1xuY29uc3QgZmFsenkgPSByZXF1aXJlKCBcImZhbHp5XCIgKTtcbmNvbnN0IGhhcmRlbiA9IHJlcXVpcmUoIFwiaGFyZGVuXCIgKTtcbmNvbnN0IG9wdGZvciA9IHJlcXVpcmUoIFwib3B0Zm9yXCIgKTtcbmNvbnN0IHBsb3VnaCA9IHJlcXVpcmUoIFwicGxvdWdoXCIgKTtcbmNvbnN0IHN0cmluZ2UgPSByZXF1aXJlKCBcInN0cmluZ2VcIiApO1xuY29uc3QgdHJ1bHkgPSByZXF1aXJlKCBcInRydWx5XCIgKTtcbmNvbnN0IHdpY2hldnIgPSByZXF1aXJlKCBcIndpY2hldnJcIiApO1xuXG5jb25zdCBVMjAwYiA9IGRpYXRvbSggXCJVMjAwYlwiICk7XG5cbmhhcmRlbiggXCJVMjAwQlwiLCBcIlxcdTIwMGJcIiApO1xuaGFyZGVuKCBcIlUyMDBCX0JBU0UxNlwiLCBcImZmZmZmZmZmMDAwMDIwMGJmZmZmZmZmZlwiICk7XG5oYXJkZW4oIFwiSU5TRVJUXCIsIFwiaW5zZXJ0XCIgKTtcbmhhcmRlbiggXCJQUkVQRU5EXCIsIFwicHJlcGVuZFwiICk7XG5oYXJkZW4oIFwiQVBQRU5EXCIsIFwiYXBwZW5kXCIgKTtcblxuY29uc3QgRU1QVFlfU1BBQ0UgPSBcIlwiO1xuY29uc3QgU1BBQ0UgPSBcIiBcIjtcblxuVTIwMGIucHJvdG90eXBlLmluaXRpYWxpemUgPSBmdW5jdGlvbiBpbml0aWFsaXplKCBzdHJpbmcgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJzdHJpbmdcIjogW1xuXHRcdFx0XHRcdFwic3RyaW5nXCIsXG5cdFx0XHRcdFx0XCJbc3RyaW5nXVwiLFxuXHRcdFx0XHRcdFwiLi4uXCJcblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0bGV0IHRleHQgPSBwbG91Z2goIGFyZ3VtZW50cyApLmZpbHRlciggdHJ1bHkgKS5tYXAoIHN0cmluZ2UgKTtcblxuXHQvLzogVGhpcyB3aWxsIGhhbmRsZSB0aGUgbW9kaWZpY2F0aW9uIGRvbmUgdG8gdGhlIHN0cmluZ3MuXG5cdHRoaXMuaGlzdG9yeSA9IHdpY2hldnIoIHRoaXMuaGlzdG9yeSwgWyBdICk7XG5cblx0Ly86IENyZWF0ZSBhbiBvcmlnaW5hbCBjb3B5LlxuXHR0aGlzLnRleHQgPSBbIF0uY29uY2F0KCB0ZXh0ICk7XG5cblx0dGhpcy5zdHJpbmcgPSB0ZXh0O1xuXG5cdHRoaXMuYmFzZSggVTIwMEIgKTtcblxuXHR0aGlzLmlkZW50aWZ5KCApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyo7XG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcblx0XHRUaGlzIHdpbGwgc2V0IHRoZSBkZWZhdWx0IGJhc2UgdHlwZSBvZiBVMjAwQlxuXHRcdFx0dG8gYW55IGJhc2UgdHlwZSBhcyBsb25nIGFzIGl0IGlzIHN1cHBvcnRlZC5cblxuXHRcdFNldHRpbmcgdG8gdXNlIFUyMDBCX0JBU0UxNiB3aWxsIG1ha2UgdGhlIHN0cmluZyBzaXplIGJpZ2dlci5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cblUyMDBiLnByb3RvdHlwZS5iYXNlID0gZnVuY3Rpb24gYmFzZSggdHlwZSApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcInR5cGU6cmVxdWlyZWRcIjogW1xuXHRcdFx0XHRcdFUyMDBCLFxuXHRcdFx0XHRcdFUyMDBCX0JBU0UxNlxuXHRcdFx0XHRdXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRpZiggdHlwZSAhPT0gVTIwMEIgJiYgdHlwZSAhPT0gVTIwMEJfQkFTRTE2ICl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcImludmFsaWQgYmFzZSB0eXBlXCIgKTtcblx0fVxuXG5cdHRoaXMudHlwZSA9IHR5cGU7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFRoaXMgd2lsbCBhdXRvLWlkZW50aWZ5IHRoZSBiYXNlIHR5cGUuXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cbiovXG5VMjAwYi5wcm90b3R5cGUuaWRlbnRpZnkgPSBmdW5jdGlvbiBpZGVudGlmeSggKXtcblx0bGV0IHN0cmluZyA9IHRoaXMuc3RyaW5nLmpvaW4oIFwiXCIgKTtcblxuXHRpZiggKCBuZXcgUmVnRXhwKCBVMjAwQiwgXCJnXCIgKSApLnRlc3QoIHN0cmluZyApICl7XG5cdFx0dGhpcy50eXBlID0gVTIwMEI7XG5cblx0fWVsc2UgaWYoICggbmV3IFJlZ0V4cCggVTIwMEJfQkFTRTE2LCBcImdcIiApICkudGVzdCggc3RyaW5nICkgKXtcblx0XHR0aGlzLnR5cGUgPSBVMjAwQl9CQVNFMTY7XG5cblx0fWVsc2V7XG5cdFx0dGhpcy50eXBlID0gVTIwMEI7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cblUyMDBiLnByb3RvdHlwZS5zZXBhcmF0ZSA9IGZ1bmN0aW9uIHNlcGFyYXRlKCApe1xuXHRyZXR1cm4gdGhpcy5zdHJpbmcuam9pbiggXCJcIiApLnNwbGl0KCB0aGlzLnR5cGUgKTtcbn07XG5cblUyMDBiLnByb3RvdHlwZS5yZWxlYXNlID0gZnVuY3Rpb24gcmVsZWFzZSggKXtcblx0Ly86IElmIHRoZXJlIGFyZSBubyBtb2RpZmljYXRpb25zIGRvIHRoZSBkZWZhdWx0IGluc2VydC5cblx0aWYoIGFyaWQoIHRoaXMuaGlzdG9yeSApICl7XG5cdFx0dGhpcy5pbnNlcnQoICk7XG5cdH1cblxuXHRyZXR1cm4gWyBdLmNvbmNhdCggdGhpcy5zdHJpbmcgKTtcbn07XG5cblUyMDBiLnByb3RvdHlwZS5qb2luID0gZnVuY3Rpb24gam9pbiggc2VwYXJhdG9yICl7XG5cdHJldHVybiB0aGlzLnJlbGVhc2UoICkuam9pbiggc2VwYXJhdG9yIHx8IEVNUFRZX1NQQUNFICk7XG59O1xuXG5VMjAwYi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyggKXtcblx0cmV0dXJuIHRoaXMuam9pbiggKTtcbn07XG5cblUyMDBiLnByb3RvdHlwZS52YWx1ZU9mID0gZnVuY3Rpb24gdmFsdWVPZiggKXtcblx0cmV0dXJuIHRoaXMucmVsZWFzZSggKTtcbn07XG5cblUyMDBiLnByb3RvdHlwZS5yYXcgPSBmdW5jdGlvbiByYXcoICl7XG5cdHJldHVybiBzdHJpbmdlKCB0aGlzICkucmVwbGFjZSggbmV3IFJlZ0V4cCggdGhpcy50eXBlLCBcImdcIiApLCBFTVBUWV9TUEFDRSApO1xufTtcblxuLyo7XG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcblx0XHRBcHBlbmQgemVyby13aWR0aCBzcGFjZSBvbiBldmVyeSBlbmQgb2YgdGhlIHN0cmluZy5cblxuXHRcdElmIG5ldyBzdHJpbmdzIHByb2NlZWRzIHRoZSBvbGQgc2V0IHN0cmluZ3Ncblx0XHRcdHRoZXkgd2lsbCBiZSBhcHBlbmRlZCBhbmQgYXBwbGllZCB3aXRoIHplcm8td2lkdGggc3BhY2UuXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cbiovXG5VMjAwYi5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24gYXBwZW5kKCBzdHJpbmcgKXtcblx0Lyo7XG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcblx0XHRcdHtcblx0XHRcdFx0XCJzdHJpbmdcIjogW1xuXHRcdFx0XHRcdFwic3RyaW5nXCIsXG5cdFx0XHRcdFx0XCJbc3RyaW5nXVwiLFxuXHRcdFx0XHRcdFwiLi4uXCJcblx0XHRcdFx0XVxuXHRcdFx0fVxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXG5cdCovXG5cblx0bGV0IHRleHQgPSB3aWNoZXZyKCBwbG91Z2goIGFyZ3VtZW50cyApLmZpbHRlciggdHJ1bHkgKS5tYXAoIHN0cmluZ2UgKSwgWyBdICk7XG5cblx0dGhpcy5zdHJpbmcgPSB0aGlzLnN0cmluZy5jb25jYXQoIHRleHQgKVxuXHRcdC5tYXAoICggZnVuY3Rpb24gb25FYWNoVG9rZW4oIHRva2VuICl7XG5cdFx0XHRyZXR1cm4gdG9rZW4gKyB0aGlzLnR5cGU7XG5cdFx0fSApLmJpbmQoIHRoaXMgKSApO1xuXG5cdHRoaXMuaGlzdG9yeS5wdXNoKCBBUFBFTkQgKTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qO1xuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XG5cdFx0UHJlcGVuZCB6ZXJvLXdpZHRoIHNwYWNlIG9uIGV2ZXJ5IHN0YXJ0IG9mIHRoZSBzdHJpbmcuXG5cblx0XHRJZiBuZXcgc3RyaW5ncyBwcmVjZWVkcyB0aGUgb2xkIHNldCBzdHJpbmdzXG5cdFx0XHR0aGV5IHdpbGwgYmUgcHJlcGVuZGVkIGFuZCBhcHBsaWVkIHdpdGggemVyby13aWR0aCBzcGFjZS5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cblUyMDBiLnByb3RvdHlwZS5wcmVwZW5kID0gZnVuY3Rpb24gcHJlcGVuZCggc3RyaW5nICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcblx0XHRcdFx0XHRcIi4uLlwiXG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGxldCB0ZXh0ID0gd2ljaGV2ciggcGxvdWdoKCBhcmd1bWVudHMgKS5maWx0ZXIoIHRydWx5ICkubWFwKCBzdHJpbmdlICksIFsgXSApO1xuXG5cdHRoaXMuc3RyaW5nID0gdGV4dC5jb25jYXQoIHRoaXMuc3RyaW5nIClcblx0XHQubWFwKCAoIGZ1bmN0aW9uIG9uRWFjaFRva2VuKCB0b2tlbiApe1xuXHRcdFx0cmV0dXJuIHRoaXMudHlwZSArIHRva2VuO1xuXHRcdH0gKS5iaW5kKCB0aGlzICkgKTtcblxuXHR0aGlzLmhpc3RvcnkucHVzaCggUFJFUEVORCApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyo7XG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcblx0XHRJbnNlcnRzIHplcm8td2lkdGggc3BhY2Ugb24gZXZlcnkgZ2FwIG9mIHRoZSBzdHJpbmcuXG5cblx0XHRJZiBuZXcgc3RyaW5ncyBhcmUgaW5zZXJ0ZWQgd2l0aCB0aGUgb2xkIHNldCBzdHJpbmdzLFxuXHRcdFx0emVyby13aWR0aCBzcGFjZSB3aWxsIGJlIGFwcGxpZWQgYWxzby5cblxuXHRcdElmIGEgcGF0dGVybiBpcyBzdXBwbGllZCwgaXQgd2lsbCBpbnNlcnQgemVyby13aWR0aCBzcGFjZVxuXHRcdFx0b24gZXZlcnkgb2NjdXJyZW5jZSBvZiB0aGUgcGF0dGVybiBvbiB0aGUgc3RyaW5nLlxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXG4qL1xuVTIwMGIucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uIGluc2VydCggc3RyaW5nLCBwYXR0ZXJuICl7XG5cdC8qO1xuXHRcdEBtZXRhLWNvbmZpZ3VyYXRpb246XG5cdFx0XHR7XG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcblx0XHRcdFx0XHRcIi4uLlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdFwicGF0dGVyblwiOiBcIlJlZ0V4cFwiXG5cdFx0XHR9XG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cblx0Ki9cblxuXHRsZXQgdGV4dCA9IHdpY2hldnIoIHBsb3VnaCggYXJndW1lbnRzICkuZmlsdGVyKCB0cnVseSApXG5cdFx0Lm1hcCggZnVuY3Rpb24gb25FYWNoUGFyYW1ldGVyKCBwYXJhbWV0ZXIgKXtcblx0XHRcdGlmKCBjbGF6b2YoIHBhcmFtZXRlciwgUmVnRXhwICkgKXtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzdHJpbmdlKCBwYXJhbWV0ZXIgKTtcblx0XHR9ICksIFsgXSApO1xuXG5cdGxldCB0ZW1wbGF0ZSA9IG9wdGZvciggYXJndW1lbnRzLCBSZWdFeHAgKTtcblxuXHRpZiggdHJ1bHkoIHRlbXBsYXRlICkgKXtcblx0XHR0aGlzLnN0cmluZyA9IHRoaXMuc3RyaW5nLmNvbmNhdCggdGV4dCApXG5cdFx0XHQubWFwKCAoIGZ1bmN0aW9uIG9uRWFjaFRva2VuKCB0b2tlbiApe1xuXHRcdFx0XHRyZXR1cm4gdG9rZW4ucmVwbGFjZSggdGVtcGxhdGUsIHRoaXMudHlwZSApO1xuXHRcdFx0fSApLmJpbmQoIHRoaXMgKSApO1xuXG5cdH1lbHNle1xuXHRcdHRoaXMuc3RyaW5nID0gdGhpcy5zdHJpbmdcblx0XHRcdC5jb25jYXQoIHRleHQgKVxuXHRcdFx0LmpvaW4oIGAkeyB0aGlzLnR5cGUgfVssXWAgKVxuXHRcdFx0LnNwbGl0KCBcIlssXVwiICk7XG5cdH1cblxuXHR0aGlzLmhpc3RvcnkucHVzaCggSU5TRVJUICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFJldmVydHMgdG8gdGhlIG9yaWdpbmFsIHN0cmluZy5cblxuXHRcdENsZWFycyBoaXN0b3J5LlxuXG5cdFx0VGhpcyBkb2VzIG5vdCBpbmNsdWRlIGFwcGVuZGVkLCBwcmVwZW5kZWQgb3IgaW5zZXJ0ZWQgc3RyaW5ncy5cblx0XHRcdFNvIHRoZSBvcmlnaW5hbCBzdHJpbmcgaXMgdGhlIG9uZSB5b3UgaW5pdGlhbGl6ZS5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cblUyMDBiLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyKCApe1xuXHR0aGlzLnN0cmluZyA9IHRoaXMudGV4dDtcblxuXHR0aGlzLmhpc3RvcnkgPSBbIF07XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKjtcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxuXHRcdFJlcGxhY2UgdGhlIHNlcGFyYXRpbmcgdG9rZW4gd2l0aCB0aGUgc3BlY2lmaWVkIHRva2VuLFxuXHRcdFx0dGhpcyB3aWxsIGFsc28gY2xlYXIgdGhlIHplcm8gd2lkdGggc3BhY2UgYXBwbGllZC5cblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxuKi9cblUyMDBiLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSggc2VwYXJhdG9yLCB0b2tlbiApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcInNlcGFyYXRvcjpyZXF1aXJlZFwiOiBcInN0cmluZ1wiLFxuXHRcdFx0XHRcInRva2VuOnJlcXVpcmVkXCI6IFwic3RyaW5nXCJcblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdGlmKCBmYWx6eSggc2VwYXJhdG9yICkgfHwgdHlwZW9mIHNlcGFyYXRvciAhPSBcInN0cmluZ1wiICl7XG5cdFx0c2VwYXJhdG9yID0gU1BBQ0U7XG5cdH1cblxuXHRpZiggZmFsenkoIHRva2VuICkgfHwgdHlwZW9mIHRva2VuICE9IFwic3RyaW5nXCIgKXtcblx0XHR0b2tlbiA9IFNQQUNFO1xuXHR9XG5cblx0cmV0dXJuIHRoaXMuc2VwYXJhdGUoICkuam9pbiggRU1QVFlfU1BBQ0UgKS5zcGxpdCggc2VwYXJhdG9yICkuam9pbiggdG9rZW4gKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gVTIwMGI7XG4iXX0=
//# sourceMappingURL=u200b.support.js.map
