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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInUyMDBiLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYXJpZCIsInJlcXVpcmUiLCJjbGF6b2YiLCJkaWF0b20iLCJmYWx6eSIsImhhcmRlbiIsIm9wdGZvciIsInBsb3VnaCIsInN0cmluZ2UiLCJ0cnVseSIsIndpY2hldnIiLCJVMjAwYiIsIkVNUFRZX1NQQUNFIiwiU1BBQ0UiLCJwcm90b3R5cGUiLCJpbml0aWFsaXplIiwic3RyaW5nIiwidGV4dCIsImFyZ3VtZW50cyIsImZpbHRlciIsIm1hcCIsImhpc3RvcnkiLCJjb25jYXQiLCJiYXNlIiwiVTIwMEIiLCJpZGVudGlmeSIsInR5cGUiLCJVMjAwQl9CQVNFMTYiLCJFcnJvciIsImpvaW4iLCJSZWdFeHAiLCJ0ZXN0Iiwic2VwYXJhdGUiLCJzcGxpdCIsInJlbGVhc2UiLCJpbnNlcnQiLCJzZXBhcmF0b3IiLCJ0b1N0cmluZyIsInZhbHVlT2YiLCJyYXciLCJyZXBsYWNlIiwiYXBwZW5kIiwib25FYWNoVG9rZW4iLCJ0b2tlbiIsImJpbmQiLCJwdXNoIiwiQVBQRU5EIiwicHJlcGVuZCIsIlBSRVBFTkQiLCJwYXR0ZXJuIiwib25FYWNoUGFyYW1ldGVyIiwicGFyYW1ldGVyIiwidGVtcGxhdGUiLCJJTlNFUlQiLCJjbGVhciIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9FQSxJQUFNQSxPQUFPQyxRQUFTLE1BQVQsQ0FBYjtBQUNBLElBQU1DLFNBQVNELFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUUsU0FBU0YsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNRyxRQUFRSCxRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1JLFNBQVNKLFFBQVMsUUFBVCxDQUFmO0FBQ0EsSUFBTUssU0FBU0wsUUFBUyxRQUFULENBQWY7QUFDQSxJQUFNTSxTQUFTTixRQUFT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QkQ7O0FBcUJBWSxPQUFPQyxPQUFQLEdBQWlCN0MsS0FBakIiLCJmaWxlIjoidTIwMGIuc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5cclxuLyo7XHJcblx0QG1vZHVsZS1saWNlbnNlOlxyXG5cdFx0VGhlIE1JVCBMaWNlbnNlIChNSVQpXHJcblx0XHRAbWl0LWxpY2Vuc2VcclxuXHJcblx0XHRDb3B5cmlnaHQgKEBjKSAyMDE3IFJpY2hldmUgU2lvZGluYSBCZWJlZG9yXHJcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cclxuXHJcblx0XHRQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XHJcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXHJcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXHJcblx0XHR0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXHJcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcclxuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XHJcblxyXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXHJcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxyXG5cclxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcclxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxyXG5cdFx0RklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXHJcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXHJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxyXG5cdFx0T1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcclxuXHRcdFNPRlRXQVJFLlxyXG5cdEBlbmQtbW9kdWxlLWxpY2Vuc2VcclxuXHJcblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxyXG5cdFx0e1xyXG5cdFx0XHRcInBhY2thZ2VcIjogXCJ1MjAwYlwiLFxyXG5cdFx0XHRcInBhdGhcIjogXCJ1MjAwYi91MjAwYi5qc1wiLFxyXG5cdFx0XHRcImZpbGVcIjogXCJ1MjAwYi5qc1wiLFxyXG5cdFx0XHRcIm1vZHVsZVwiOiBcInUyMDBiXCIsXHJcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXHJcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXHJcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcclxuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcclxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcclxuXHRcdFx0XSxcclxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL3UyMDBiLmdpdFwiLFxyXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlLFxyXG5cdFx0XHRcImNsYXNzXCI6IHRydWVcclxuXHRcdH1cclxuXHRAZW5kLW1vZHVsZS1jb25maWd1cmF0aW9uXHJcblxyXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcclxuXHRcdEFwcGVuZCwgcHJlcGVuZCwgYW5kIGluc2VydCB6ZXJvLXdpZHRoIHNwYWNlIHRvIG5vbi1lbXB0eSBzdHJpbmcuXHJcblxyXG5cdFx0VGhlIG1haW4gcHVycG9zZSBvZiB0aGlzIGlzIHRvIG1ha2UgdGhlIHN0cmluZyB2aXNpYmxlIGFzIGl0IGlzXHJcblx0XHRcdGJ1dCB3ZSBjYW4gc3RpbGwgZGl2aWRlIGl0IHRoZSB3YXkgd2Ugd2FudCBpdCB0byBiZSBkaXZpZGVkLlxyXG5cdEBlbmQtbW9kdWxlLWRvY3VtZW50YXRpb25cclxuXHJcblx0QGluY2x1ZGU6XHJcblx0XHR7XHJcblx0XHRcdFwiYXJpZFwiOiBcImFyaWRcIixcclxuXHRcdFx0XCJjbGF6b2ZcIjogXCJjbGF6b2ZcIixcclxuXHRcdFx0XCJkaWF0b21cIjogXCJkaWF0b21cIixcclxuXHRcdFx0XCJmYWx6eVwiOiBcImZhbHp5XCIsXHJcblx0XHRcdFwiaGFyZGVuXCI6IFwiaGFyZGVuXCIsXHJcblx0XHRcdFwib3B0Zm9yXCI6IFwib3B0Zm9yXCIsXHJcblx0XHRcdFwicGxvdWdoXCI6IFwicGxvdWdoXCIsXHJcblx0XHRcdFwic3RyaW5nZVwiOiBcInN0cmluZ2VcIixcclxuXHRcdFx0XCJ0cnVseVwiOiBcInRydWx5XCIsXHJcblx0XHRcdFwid2ljaGV2clwiOiBcIndpY2hldnJcIlxyXG5cdFx0fVxyXG5cdEBlbmQtaW5jbHVkZVxyXG4qL1xyXG5cclxuY29uc3QgYXJpZCA9IHJlcXVpcmUoIFwiYXJpZFwiICk7XHJcbmNvbnN0IGNsYXpvZiA9IHJlcXVpcmUoIFwiY2xhem9mXCIgKTtcclxuY29uc3QgZGlhdG9tID0gcmVxdWlyZSggXCJkaWF0b21cIiApO1xyXG5jb25zdCBmYWx6eSA9IHJlcXVpcmUoIFwiZmFsenlcIiApO1xyXG5jb25zdCBoYXJkZW4gPSByZXF1aXJlKCBcImhhcmRlblwiICk7XHJcbmNvbnN0IG9wdGZvciA9IHJlcXVpcmUoIFwib3B0Zm9yXCIgKTtcclxuY29uc3QgcGxvdWdoID0gcmVxdWlyZSggXCJwbG91Z2hcIiApO1xyXG5jb25zdCBzdHJpbmdlID0gcmVxdWlyZSggXCJzdHJpbmdlXCIgKTtcclxuY29uc3QgdHJ1bHkgPSByZXF1aXJlKCBcInRydWx5XCIgKTtcclxuY29uc3Qgd2ljaGV2ciA9IHJlcXVpcmUoIFwid2ljaGV2clwiICk7XHJcblxyXG5jb25zdCBVMjAwYiA9IGRpYXRvbSggXCJVMjAwYlwiICk7XHJcblxyXG5oYXJkZW4oIFwiVTIwMEJcIiwgXCJcXHUyMDBiXCIgKTtcclxuaGFyZGVuKCBcIlUyMDBCX0JBU0UxNlwiLCBcImZmZmZmZmZmMDAwMDIwMGJmZmZmZmZmZlwiICk7XHJcbmhhcmRlbiggXCJJTlNFUlRcIiwgXCJpbnNlcnRcIiApO1xyXG5oYXJkZW4oIFwiUFJFUEVORFwiLCBcInByZXBlbmRcIiApO1xyXG5oYXJkZW4oIFwiQVBQRU5EXCIsIFwiYXBwZW5kXCIgKTtcclxuXHJcbmNvbnN0IEVNUFRZX1NQQUNFID0gXCJcIjtcclxuY29uc3QgU1BBQ0UgPSBcIiBcIjtcclxuXHJcblUyMDBiLnByb3RvdHlwZS5pbml0aWFsaXplID0gZnVuY3Rpb24gaW5pdGlhbGl6ZSggc3RyaW5nICl7XHJcblx0Lyo7XHJcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJzdHJpbmdcIjogW1xyXG5cdFx0XHRcdFx0XCJzdHJpbmdcIixcclxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcclxuXHRcdFx0XHRcdFwiLi4uXCJcclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0bGV0IHRleHQgPSBwbG91Z2goIGFyZ3VtZW50cyApLmZpbHRlciggdHJ1bHkgKS5tYXAoIHN0cmluZ2UgKTtcclxuXHJcblx0Ly86IFRoaXMgd2lsbCBoYW5kbGUgdGhlIG1vZGlmaWNhdGlvbiBkb25lIHRvIHRoZSBzdHJpbmdzLlxyXG5cdHRoaXMuaGlzdG9yeSA9IHdpY2hldnIoIHRoaXMuaGlzdG9yeSwgWyBdICk7XHJcblxyXG5cdC8vOiBDcmVhdGUgYW4gb3JpZ2luYWwgY29weS5cclxuXHR0aGlzLnRleHQgPSBbIF0uY29uY2F0KCB0ZXh0ICk7XHJcblxyXG5cdHRoaXMuc3RyaW5nID0gdGV4dDtcclxuXHJcblx0dGhpcy5iYXNlKCBVMjAwQiApO1xyXG5cclxuXHR0aGlzLmlkZW50aWZ5KCApO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qO1xyXG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFRoaXMgd2lsbCBzZXQgdGhlIGRlZmF1bHQgYmFzZSB0eXBlIG9mIFUyMDBCXHJcblx0XHRcdHRvIGFueSBiYXNlIHR5cGUgYXMgbG9uZyBhcyBpdCBpcyBzdXBwb3J0ZWQuXHJcblxyXG5cdFx0U2V0dGluZyB0byB1c2UgVTIwMEJfQkFTRTE2IHdpbGwgbWFrZSB0aGUgc3RyaW5nIHNpemUgYmlnZ2VyLlxyXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cclxuKi9cclxuVTIwMGIucHJvdG90eXBlLmJhc2UgPSBmdW5jdGlvbiBiYXNlKCB0eXBlICl7XHJcblx0Lyo7XHJcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJ0eXBlOnJlcXVpcmVkXCI6IFtcclxuXHRcdFx0XHRcdFUyMDBCLFxyXG5cdFx0XHRcdFx0VTIwMEJfQkFTRTE2XHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGlmKCB0eXBlICE9PSBVMjAwQiAmJiB0eXBlICE9PSBVMjAwQl9CQVNFMTYgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggXCJpbnZhbGlkIGJhc2UgdHlwZVwiICk7XHJcblx0fVxyXG5cclxuXHR0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qO1xyXG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFRoaXMgd2lsbCBhdXRvLWlkZW50aWZ5IHRoZSBiYXNlIHR5cGUuXHJcblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxyXG4qL1xyXG5VMjAwYi5wcm90b3R5cGUuaWRlbnRpZnkgPSBmdW5jdGlvbiBpZGVudGlmeSggKXtcclxuXHRsZXQgc3RyaW5nID0gdGhpcy5zdHJpbmcuam9pbiggXCJcIiApO1xyXG5cclxuXHRpZiggKCBuZXcgUmVnRXhwKCBVMjAwQiwgXCJnXCIgKSApLnRlc3QoIHN0cmluZyApICl7XHJcblx0XHR0aGlzLnR5cGUgPSBVMjAwQjtcclxuXHJcblx0fWVsc2UgaWYoICggbmV3IFJlZ0V4cCggVTIwMEJfQkFTRTE2LCBcImdcIiApICkudGVzdCggc3RyaW5nICkgKXtcclxuXHRcdHRoaXMudHlwZSA9IFUyMDBCX0JBU0UxNjtcclxuXHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLnR5cGUgPSBVMjAwQjtcclxuXHR9XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuVTIwMGIucHJvdG90eXBlLnNlcGFyYXRlID0gZnVuY3Rpb24gc2VwYXJhdGUoICl7XHJcblx0cmV0dXJuIHRoaXMuc3RyaW5nLmpvaW4oIFwiXCIgKS5zcGxpdCggdGhpcy50eXBlICk7XHJcbn07XHJcblxyXG5VMjAwYi5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uIHJlbGVhc2UoICl7XHJcblx0Ly86IElmIHRoZXJlIGFyZSBubyBtb2RpZmljYXRpb25zIGRvIHRoZSBkZWZhdWx0IGluc2VydC5cclxuXHRpZiggYXJpZCggdGhpcy5oaXN0b3J5ICkgKXtcclxuXHRcdHRoaXMuaW5zZXJ0KCApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIFsgXS5jb25jYXQoIHRoaXMuc3RyaW5nICk7XHJcbn07XHJcblxyXG5VMjAwYi5wcm90b3R5cGUuam9pbiA9IGZ1bmN0aW9uIGpvaW4oIHNlcGFyYXRvciApe1xyXG5cdHJldHVybiB0aGlzLnJlbGVhc2UoICkuam9pbiggc2VwYXJhdG9yIHx8IEVNUFRZX1NQQUNFICk7XHJcbn07XHJcblxyXG5VMjAwYi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyggKXtcclxuXHRyZXR1cm4gdGhpcy5qb2luKCApO1xyXG59O1xyXG5cclxuVTIwMGIucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbiB2YWx1ZU9mKCApe1xyXG5cdHJldHVybiB0aGlzLnJlbGVhc2UoICk7XHJcbn07XHJcblxyXG5VMjAwYi5wcm90b3R5cGUucmF3ID0gZnVuY3Rpb24gcmF3KCApe1xyXG5cdHJldHVybiBzdHJpbmdlKCB0aGlzICkucmVwbGFjZSggbmV3IFJlZ0V4cCggdGhpcy50eXBlLCBcImdcIiApLCBFTVBUWV9TUEFDRSApO1xyXG59O1xyXG5cclxuLyo7XHJcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxyXG5cdFx0QXBwZW5kIHplcm8td2lkdGggc3BhY2Ugb24gZXZlcnkgZW5kIG9mIHRoZSBzdHJpbmcuXHJcblxyXG5cdFx0SWYgbmV3IHN0cmluZ3MgcHJvY2VlZHMgdGhlIG9sZCBzZXQgc3RyaW5nc1xyXG5cdFx0XHR0aGV5IHdpbGwgYmUgYXBwZW5kZWQgYW5kIGFwcGxpZWQgd2l0aCB6ZXJvLXdpZHRoIHNwYWNlLlxyXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cclxuKi9cclxuVTIwMGIucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uIGFwcGVuZCggc3RyaW5nICl7XHJcblx0Lyo7XHJcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJzdHJpbmdcIjogW1xyXG5cdFx0XHRcdFx0XCJzdHJpbmdcIixcclxuXHRcdFx0XHRcdFwiW3N0cmluZ11cIixcclxuXHRcdFx0XHRcdFwiLi4uXCJcclxuXHRcdFx0XHRdXHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0bGV0IHRleHQgPSB3aWNoZXZyKCBwbG91Z2goIGFyZ3VtZW50cyApLmZpbHRlciggdHJ1bHkgKS5tYXAoIHN0cmluZ2UgKSwgWyBdICk7XHJcblxyXG5cdHRoaXMuc3RyaW5nID0gdGhpcy5zdHJpbmcuY29uY2F0KCB0ZXh0IClcclxuXHRcdC5tYXAoICggZnVuY3Rpb24gb25FYWNoVG9rZW4oIHRva2VuICl7XHJcblx0XHRcdHJldHVybiB0b2tlbiArIHRoaXMudHlwZTtcclxuXHRcdH0gKS5iaW5kKCB0aGlzICkgKTtcclxuXHJcblx0dGhpcy5oaXN0b3J5LnB1c2goIEFQUEVORCApO1xyXG5cclxuXHRyZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qO1xyXG5cdEBtZXRob2QtZG9jdW1lbnRhdGlvbjpcclxuXHRcdFByZXBlbmQgemVyby13aWR0aCBzcGFjZSBvbiBldmVyeSBzdGFydCBvZiB0aGUgc3RyaW5nLlxyXG5cclxuXHRcdElmIG5ldyBzdHJpbmdzIHByZWNlZWRzIHRoZSBvbGQgc2V0IHN0cmluZ3NcclxuXHRcdFx0dGhleSB3aWxsIGJlIHByZXBlbmRlZCBhbmQgYXBwbGllZCB3aXRoIHplcm8td2lkdGggc3BhY2UuXHJcblx0QGVuZC1tZXRob2QtZG9jdW1lbnRhdGlvblxyXG4qL1xyXG5VMjAwYi5wcm90b3R5cGUucHJlcGVuZCA9IGZ1bmN0aW9uIHByZXBlbmQoIHN0cmluZyApe1xyXG5cdC8qO1xyXG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcclxuXHRcdFx0XHRcdFwic3RyaW5nXCIsXHJcblx0XHRcdFx0XHRcIltzdHJpbmddXCIsXHJcblx0XHRcdFx0XHRcIi4uLlwiXHJcblx0XHRcdFx0XVxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGxldCB0ZXh0ID0gd2ljaGV2ciggcGxvdWdoKCBhcmd1bWVudHMgKS5maWx0ZXIoIHRydWx5ICkubWFwKCBzdHJpbmdlICksIFsgXSApO1xyXG5cclxuXHR0aGlzLnN0cmluZyA9IHRleHQuY29uY2F0KCB0aGlzLnN0cmluZyApXHJcblx0XHQubWFwKCAoIGZ1bmN0aW9uIG9uRWFjaFRva2VuKCB0b2tlbiApe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50eXBlICsgdG9rZW47XHJcblx0XHR9ICkuYmluZCggdGhpcyApICk7XHJcblxyXG5cdHRoaXMuaGlzdG9yeS5wdXNoKCBQUkVQRU5EICk7XHJcblxyXG5cdHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyo7XHJcblx0QG1ldGhvZC1kb2N1bWVudGF0aW9uOlxyXG5cdFx0SW5zZXJ0cyB6ZXJvLXdpZHRoIHNwYWNlIG9uIGV2ZXJ5IGdhcCBvZiB0aGUgc3RyaW5nLlxyXG5cclxuXHRcdElmIG5ldyBzdHJpbmdzIGFyZSBpbnNlcnRlZCB3aXRoIHRoZSBvbGQgc2V0IHN0cmluZ3MsXHJcblx0XHRcdHplcm8td2lkdGggc3BhY2Ugd2lsbCBiZSBhcHBsaWVkIGFsc28uXHJcblxyXG5cdFx0SWYgYSBwYXR0ZXJuIGlzIHN1cHBsaWVkLCBpdCB3aWxsIGluc2VydCB6ZXJvLXdpZHRoIHNwYWNlXHJcblx0XHRcdG9uIGV2ZXJ5IG9jY3VycmVuY2Ugb2YgdGhlIHBhdHRlcm4gb24gdGhlIHN0cmluZy5cclxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXHJcbiovXHJcblUyMDBiLnByb3RvdHlwZS5pbnNlcnQgPSBmdW5jdGlvbiBpbnNlcnQoIHN0cmluZywgcGF0dGVybiApe1xyXG5cdC8qO1xyXG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwic3RyaW5nXCI6IFtcclxuXHRcdFx0XHRcdFwic3RyaW5nXCIsXHJcblx0XHRcdFx0XHRcIltzdHJpbmddXCIsXHJcblx0XHRcdFx0XHRcIi4uLlwiXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRcInBhdHRlcm5cIjogXCJSZWdFeHBcIlxyXG5cdFx0XHR9XHJcblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxyXG5cdCovXHJcblxyXG5cdGxldCB0ZXh0ID0gd2ljaGV2ciggcGxvdWdoKCBhcmd1bWVudHMgKS5maWx0ZXIoIHRydWx5IClcclxuXHRcdC5tYXAoIGZ1bmN0aW9uIG9uRWFjaFBhcmFtZXRlciggcGFyYW1ldGVyICl7XHJcblx0XHRcdGlmKCBjbGF6b2YoIHBhcmFtZXRlciwgUmVnRXhwICkgKXtcclxuXHRcdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHN0cmluZ2UoIHBhcmFtZXRlciApO1xyXG5cdFx0fSApLCBbIF0gKTtcclxuXHJcblx0bGV0IHRlbXBsYXRlID0gb3B0Zm9yKCBhcmd1bWVudHMsIFJlZ0V4cCApO1xyXG5cclxuXHRpZiggdHJ1bHkoIHRlbXBsYXRlICkgKXtcclxuXHRcdHRoaXMuc3RyaW5nID0gdGhpcy5zdHJpbmcuY29uY2F0KCB0ZXh0IClcclxuXHRcdFx0Lm1hcCggKCBmdW5jdGlvbiBvbkVhY2hUb2tlbiggdG9rZW4gKXtcclxuXHRcdFx0XHRyZXR1cm4gdG9rZW4ucmVwbGFjZSggdGVtcGxhdGUsIHRoaXMudHlwZSApO1xyXG5cdFx0XHR9ICkuYmluZCggdGhpcyApICk7XHJcblxyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5zdHJpbmcgPSB0aGlzLnN0cmluZ1xyXG5cdFx0XHQuY29uY2F0KCB0ZXh0IClcclxuXHRcdFx0LmpvaW4oIGAkeyB0aGlzLnR5cGUgfVssXWAgKVxyXG5cdFx0XHQuc3BsaXQoIFwiWyxdXCIgKTtcclxuXHR9XHJcblxyXG5cdHRoaXMuaGlzdG9yeS5wdXNoKCBJTlNFUlQgKTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKjtcclxuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XHJcblx0XHRSZXZlcnRzIHRvIHRoZSBvcmlnaW5hbCBzdHJpbmcuXHJcblxyXG5cdFx0Q2xlYXJzIGhpc3RvcnkuXHJcblxyXG5cdFx0VGhpcyBkb2VzIG5vdCBpbmNsdWRlIGFwcGVuZGVkLCBwcmVwZW5kZWQgb3IgaW5zZXJ0ZWQgc3RyaW5ncy5cclxuXHRcdFx0U28gdGhlIG9yaWdpbmFsIHN0cmluZyBpcyB0aGUgb25lIHlvdSBpbml0aWFsaXplLlxyXG5cdEBlbmQtbWV0aG9kLWRvY3VtZW50YXRpb25cclxuKi9cclxuVTIwMGIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gY2xlYXIoICl7XHJcblx0dGhpcy5zdHJpbmcgPSB0aGlzLnRleHQ7XHJcblxyXG5cdHRoaXMuaGlzdG9yeSA9IFsgXTtcclxuXHJcblx0cmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKjtcclxuXHRAbWV0aG9kLWRvY3VtZW50YXRpb246XHJcblx0XHRSZXBsYWNlIHRoZSBzZXBhcmF0aW5nIHRva2VuIHdpdGggdGhlIHNwZWNpZmllZCB0b2tlbixcclxuXHRcdFx0dGhpcyB3aWxsIGFsc28gY2xlYXIgdGhlIHplcm8gd2lkdGggc3BhY2UgYXBwbGllZC5cclxuXHRAZW5kLW1ldGhvZC1kb2N1bWVudGF0aW9uXHJcbiovXHJcblUyMDBiLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gcmVwbGFjZSggc2VwYXJhdG9yLCB0b2tlbiApe1xyXG5cdC8qO1xyXG5cdFx0QG1ldGEtY29uZmlndXJhdGlvbjpcclxuXHRcdFx0e1xyXG5cdFx0XHRcdFwic2VwYXJhdG9yOnJlcXVpcmVkXCI6IFwic3RyaW5nXCIsXHJcblx0XHRcdFx0XCJ0b2tlbjpyZXF1aXJlZFwiOiBcInN0cmluZ1wiXHJcblx0XHRcdH1cclxuXHRcdEBlbmQtbWV0YS1jb25maWd1cmF0aW9uXHJcblx0Ki9cclxuXHJcblx0aWYoIGZhbHp5KCBzZXBhcmF0b3IgKSB8fCB0eXBlb2Ygc2VwYXJhdG9yICE9IFwic3RyaW5nXCIgKXtcclxuXHRcdHNlcGFyYXRvciA9IFNQQUNFO1xyXG5cdH1cclxuXHJcblx0aWYoIGZhbHp5KCB0b2tlbiApIHx8IHR5cGVvZiB0b2tlbiAhPSBcInN0cmluZ1wiICl7XHJcblx0XHR0b2tlbiA9IFNQQUNFO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIHRoaXMuc2VwYXJhdGUoICkuam9pbiggRU1QVFlfU1BBQ0UgKS5zcGxpdCggc2VwYXJhdG9yICkuam9pbiggdG9rZW4gKTtcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVTIwMGI7XHJcbiJdfQ==
//# sourceMappingURL=u200b.support.js.map
