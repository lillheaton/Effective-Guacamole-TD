(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

"use strict";

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * For example:
 *
 *   var COLORS = keyMirror({blue: null, red: null});
 *   var myColor = COLORS.blue;
 *   var isColorValid = !!COLORS[myColor];
 *
 * The last line could not be performed if the values of the generated enum were
 * not equal to their keys.
 *
 *   Input:  {key1: val1, key2: val2}
 *   Output: {key1: key1, key2: key2}
 *
 * @param {object} obj
 * @return {object}
 */
var keyMirror = function(obj) {
  var ret = {};
  var key;
  if (!(obj instanceof Object && !Array.isArray(obj))) {
    throw new Error('keyMirror(...): Argument must be an object.');
  }
  for (key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    ret[key] = key;
  }
  return ret;
};

module.exports = keyMirror;

},{}],2:[function(require,module,exports){
exports = module.exports = Victor;

/**
 * # Victor - A JavaScript 2D vector class with methods for common vector operations
 */

/**
 * Constructor. Will also work without the `new` keyword
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = Victor(42, 1337);
 *
 * @param {Number} x Value of the x axis
 * @param {Number} y Value of the y axis
 * @return {Victor}
 * @api public
 */
function Victor (x, y) {
	if (!(this instanceof Victor)) {
		return new Victor(x, y);
	}

	/**
	 * The X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.x;
	 *     // => 42
	 *
	 * @api public
	 */
	this.x = x || 0;

	/**
	 * The Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor.fromArray(42, 21);
	 *
	 *     vec.y;
	 *     // => 21
	 *
	 * @api public
	 */
	this.y = y || 0;
};

/**
 * # Static
 */

/**
 * Creates a new instance from an array
 *
 * ### Examples:
 *     var vec = Victor.fromArray([42, 21]);
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromArray
 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromArray = function (arr) {
	return new Victor(arr[0] || 0, arr[1] || 0);
};

/**
 * Creates a new instance from an object
 *
 * ### Examples:
 *     var vec = Victor.fromObject({ x: 42, y: 21 });
 *
 *     vec.toString();
 *     // => x:42, y:21
 *
 * @name Victor.fromObject
 * @param {Object} obj Object with the values for x and y
 * @return {Victor} The new instance
 * @api public
 */
Victor.fromObject = function (obj) {
	return new Victor(obj.x || 0, obj.y || 0);
};

/**
 * # Manipulation
 *
 * These functions are chainable.
 */

/**
 * Adds another vector's X axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addX(vec2);
 *     vec1.toString();
 *     // => x:30, y:10
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addX = function (vec) {
	this.x += vec.x;
	return this;
};

/**
 * Adds another vector's Y axis to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.addY(vec2);
 *     vec1.toString();
 *     // => x:10, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addY = function (vec) {
	this.y += vec.y;
	return this;
};

/**
 * Adds another vector to this one
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.add(vec2);
 *     vec1.toString();
 *     // => x:30, y:40
 *
 * @param {Victor} vector The other vector you want to add to this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.add = function (vec) {
	this.x += vec.x;
	this.y += vec.y;
	return this;
};

/**
 * Adds the given scalar to both vector axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalar(2);
 *     vec.toString();
 *     // => x: 3, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalar = function (scalar) {
	this.x += scalar;
	this.y += scalar;
	return this;
};

/**
 * Adds the given scalar to the X axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarX(2);
 *     vec.toString();
 *     // => x: 3, y: 2
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarX = function (scalar) {
	this.x += scalar;
	return this;
};

/**
 * Adds the given scalar to the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(1, 2);
 *
 *     vec.addScalarY(2);
 *     vec.toString();
 *     // => x: 1, y: 4
 *
 * @param {Number} scalar The scalar to add
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.addScalarY = function (scalar) {
	this.y += scalar;
	return this;
};

/**
 * Subtracts the X axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractX(vec2);
 *     vec1.toString();
 *     // => x:80, y:50
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractX = function (vec) {
	this.x -= vec.x;
	return this;
};

/**
 * Subtracts the Y axis of another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtractY(vec2);
 *     vec1.toString();
 *     // => x:100, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractY = function (vec) {
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts another vector from this one
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(20, 30);
 *
 *     vec1.subtract(vec2);
 *     vec1.toString();
 *     // => x:80, y:20
 *
 * @param {Victor} vector The other vector you want subtract from this one
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtract = function (vec) {
	this.x -= vec.x;
	this.y -= vec.y;
	return this;
};

/**
 * Subtracts the given scalar from both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalar(20);
 *     vec.toString();
 *     // => x: 80, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalar = function (scalar) {
	this.x -= scalar;
	this.y -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarX(20);
 *     vec.toString();
 *     // => x: 80, y: 200
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarX = function (scalar) {
	this.x -= scalar;
	return this;
};

/**
 * Subtracts the given scalar from the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 200);
 *
 *     vec.subtractScalarY(20);
 *     vec.toString();
 *     // => x: 100, y: 180
 *
 * @param {Number} scalar The scalar to subtract
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.subtractScalarY = function (scalar) {
	this.y -= scalar;
	return this;
};

/**
 * Divides the X axis by the x component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.divideX(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideX = function (vector) {
	this.x /= vector.x;
	return this;
};

/**
 * Divides the Y axis by the y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.divideY(vec2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Victor} vector The other vector you want divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideY = function (vector) {
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by a axis values of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.divide(vec2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Victor} vector The vector to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divide = function (vector) {
	this.x /= vector.x;
	this.y /= vector.y;
	return this;
};

/**
 * Divides both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalar(2);
 *     vec.toString();
 *     // => x:50, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalar = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
		this.y /= scalar;
	} else {
		this.x = 0;
		this.y = 0;
	}

	return this;
};

/**
 * Divides the X axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarX(2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarX = function (scalar) {
	if (scalar !== 0) {
		this.x /= scalar;
	} else {
		this.x = 0;
	}
	return this;
};

/**
 * Divides the Y axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.divideScalarY(2);
 *     vec.toString();
 *     // => x:100, y:25
 *
 * @param {Number} The scalar to divide by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.divideScalarY = function (scalar) {
	if (scalar !== 0) {
		this.y /= scalar;
	} else {
		this.y = 0;
	}
	return this;
};

/**
 * Inverts the X axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertX();
 *     vec.toString();
 *     // => x:-100, y:50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertX = function () {
	this.x *= -1;
	return this;
};

/**
 * Inverts the Y axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invertY();
 *     vec.toString();
 *     // => x:100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invertY = function () {
	this.y *= -1;
	return this;
};

/**
 * Inverts both axis
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.invert();
 *     vec.toString();
 *     // => x:-100, y:-50
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.invert = function () {
	this.invertX();
	this.invertY();
	return this;
};

/**
 * Multiplies the X axis by X component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 0);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyX = function (vector) {
	this.x *= vector.x;
	return this;
};

/**
 * Multiplies the Y axis by Y component of given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(0, 2);
 *
 *     vec.multiplyX(vec2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Victor} vector The vector to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyY = function (vector) {
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by values from a given vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     var vec2 = new Victor(2, 2);
 *
 *     vec.multiply(vec2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Victor} vector The vector to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiply = function (vector) {
	this.x *= vector.x;
	this.y *= vector.y;
	return this;
};

/**
 * Multiplies both vector axis by the given scalar value
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalar(2);
 *     vec.toString();
 *     // => x:200, y:100
 *
 * @param {Number} The scalar to multiply by
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalar = function (scalar) {
	this.x *= scalar;
	this.y *= scalar;
	return this;
};

/**
 * Multiplies the X axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarX(2);
 *     vec.toString();
 *     // => x:200, y:50
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarX = function (scalar) {
	this.x *= scalar;
	return this;
};

/**
 * Multiplies the Y axis by the given scalar
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.multiplyScalarY(2);
 *     vec.toString();
 *     // => x:100, y:100
 *
 * @param {Number} The scalar to multiply the axis with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.multiplyScalarY = function (scalar) {
	this.y *= scalar;
	return this;
};

/**
 * Normalize
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.normalize = function () {
	var length = this.length();

	if (length === 0) {
		this.x = 1;
		this.y = 0;
	} else {
		this.divide(Victor(length, length));
	}
	return this;
};

Victor.prototype.norm = Victor.prototype.normalize;

/**
 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.limit(80, 0.9);
 *     vec.toString();
 *     // => x:90, y:50
 *
 * @param {Number} max The maximum value for both x and y axis
 * @param {Number} factor Factor by which the axis are to be multiplied with
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.limit = function (max, factor) {
	if (Math.abs(this.x) > max){ this.x *= factor; }
	if (Math.abs(this.y) > max){ this.y *= factor; }
	return this;
};

/**
 * Randomizes both vector axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:67, y:73
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomize = function (topLeft, bottomRight) {
	this.randomizeX(topLeft, bottomRight);
	this.randomizeY(topLeft, bottomRight);

	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:55, y:50
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeX = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.x, bottomRight.x);
	var max = Math.max(topLeft.x, bottomRight.x);
	this.x = random(min, max);
	return this;
};

/**
 * Randomizes the y axis with a value between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
 *     vec.toString();
 *     // => x:100, y:66
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeY = function (topLeft, bottomRight) {
	var min = Math.min(topLeft.y, bottomRight.y);
	var max = Math.max(topLeft.y, bottomRight.y);
	this.y = random(min, max);
	return this;
};

/**
 * Randomly randomizes either axis between 2 vectors
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
 *     vec.toString();
 *     // => x:100, y:77
 *
 * @param {Victor} topLeft first vector
 * @param {Victor} bottomRight second vector
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
	if (!! Math.round(Math.random())) {
		this.randomizeX(topLeft, bottomRight);
	} else {
		this.randomizeY(topLeft, bottomRight);
	}
	return this;
};

/**
 * Rounds both axis to an integer value
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.unfloat = function () {
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
	return this;
};

/**
 * Rounds both axis to a certain precision
 *
 * ### Examples:
 *     var vec = new Victor(100.2, 50.9);
 *
 *     vec.unfloat();
 *     vec.toString();
 *     // => x:100, y:51
 *
 * @param {Number} Precision (default: 8)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.toFixed = function (precision) {
	if (typeof precision === 'undefined') { precision = 8; }
	this.x = this.x.toFixed(precision);
	this.y = this.y.toFixed(precision);
	return this;
};

/**
 * Performs a linear blend / interpolation of the X axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixX(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:100
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixX = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.x = (1 - amount) * this.x + amount * vec.x;
	return this;
};

/**
 * Performs a linear blend / interpolation of the Y axis towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mixY(vec2, 0.5);
 *     vec.toString();
 *     // => x:100, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mixY = function (vec, amount) {
	if (typeof amount === 'undefined') {
		amount = 0.5;
	}

	this.y = (1 - amount) * this.y + amount * vec.y;
	return this;
};

/**
 * Performs a linear blend / interpolation towards another vector
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 100);
 *     var vec2 = new Victor(200, 200);
 *
 *     vec1.mix(vec2, 0.5);
 *     vec.toString();
 *     // => x:150, y:150
 *
 * @param {Victor} vector The other vector
 * @param {Number} amount The blend amount (optional, default: 0.5)
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.mix = function (vec, amount) {
	this.mixX(vec, amount);
	this.mixY(vec, amount);
	return this;
};

/**
 * # Products
 */

/**
 * Creates a clone of this vector
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = vec1.clone();
 *
 *     vec2.toString();
 *     // => x:10, y:10
 *
 * @return {Victor} A clone of the vector
 * @api public
 */
Victor.prototype.clone = function () {
	return new Victor(this.x, this.y);
};

/**
 * Copies another vector's X component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyX(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:10
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyX = function (vec) {
	this.x = vec.x;
	return this;
};

/**
 * Copies another vector's Y component in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copyY(vec1);
 *
 *     vec2.toString();
 *     // => x:10, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copyY = function (vec) {
	this.y = vec.y;
	return this;
};

/**
 * Copies another vector's X and Y components in to its own
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *     var vec2 = new Victor(20, 20);
 *     var vec2 = vec1.copy(vec1);
 *
 *     vec2.toString();
 *     // => x:20, y:20
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.copy = function (vec) {
	this.copyX(vec);
	this.copyY(vec);
	return this;
};

/**
 * Sets the vector to zero (0,0)
 *
 * ### Examples:
 *     var vec1 = new Victor(10, 10);
 *		 var1.zero();
 *     vec1.toString();
 *     // => x:0, y:0
 *
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.zero = function () {
	this.x = this.y = 0;
	return this;
};

/**
 * Calculates the dot product of this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.dot(vec2);
 *     // => 23000
 *
 * @param {Victor} vector The second vector
 * @return {Number} Dot product
 * @api public
 */
Victor.prototype.dot = function (vec2) {
	return this.x * vec2.x + this.y * vec2.y;
};

Victor.prototype.cross = function (vec2) {
	return (this.x * vec2.y ) - (this.y * vec2.x );
};

/**
 * Projects a vector onto another vector, setting itself to the result.
 *
 * ### Examples:
 *     var vec = new Victor(100, 0);
 *     var vec2 = new Victor(100, 100);
 *
 *     vec.projectOnto(vec2);
 *     vec.toString();
 *     // => x:50, y:50
 *
 * @param {Victor} vector The other vector you want to project this vector onto
 * @return {Victor} `this` for chaining capabilities
 * @api public
 */
Victor.prototype.projectOnto = function (vec2) {
    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
    this.x = coeff * vec2.x;
    this.y = coeff * vec2.y;
    return this;
};


Victor.prototype.horizontalAngle = function () {
	return Math.atan2(this.y, this.x);
};

Victor.prototype.horizontalAngleDeg = function () {
	return radian2degrees(this.horizontalAngle());
};

Victor.prototype.verticalAngle = function () {
	return Math.atan2(this.x, this.y);
};

Victor.prototype.verticalAngleDeg = function () {
	return radian2degrees(this.verticalAngle());
};

Victor.prototype.angle = Victor.prototype.horizontalAngle;
Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
Victor.prototype.direction = Victor.prototype.horizontalAngle;

Victor.prototype.rotate = function (angle) {
	var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
	var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));

	this.x = nx;
	this.y = ny;

	return this;
};

Victor.prototype.rotateDeg = function (angle) {
	angle = degrees2radian(angle);
	return this.rotate(angle);
};

Victor.prototype.rotateTo = function(rotation) {
	return this.rotate(rotation-this.angle());
};

Victor.prototype.rotateToDeg = function(rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateTo(rotation);
};

Victor.prototype.rotateBy = function (rotation) {
	var angle = this.angle() + rotation;

	return this.rotate(angle);
};

Victor.prototype.rotateByDeg = function (rotation) {
	rotation = degrees2radian(rotation);
	return this.rotateBy(rotation);
};

/**
 * Calculates the distance of the X axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceX(vec2);
 *     // => -100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceX = function (vec) {
	return this.x - vec.x;
};

/**
 * Same as `distanceX()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.absDistanceX(vec2);
 *     // => 100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceX = function (vec) {
	return Math.abs(this.distanceX(vec));
};

/**
 * Calculates the distance of the Y axis between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => -10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceY = function (vec) {
	return this.y - vec.y;
};

/**
 * Same as `distanceY()` but always returns an absolute number
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceY(vec2);
 *     // => 10
 *
 * @param {Victor} vector The second vector
 * @return {Number} Absolute distance
 * @api public
 */
Victor.prototype.absDistanceY = function (vec) {
	return Math.abs(this.distanceY(vec));
};

/**
 * Calculates the euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distance(vec2);
 *     // => 100.4987562112089
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distance = function (vec) {
	return Math.sqrt(this.distanceSq(vec));
};

/**
 * Calculates the squared euclidean distance between this vector and another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(200, 60);
 *
 *     vec1.distanceSq(vec2);
 *     // => 10100
 *
 * @param {Victor} vector The second vector
 * @return {Number} Distance
 * @api public
 */
Victor.prototype.distanceSq = function (vec) {
	var dx = this.distanceX(vec),
		dy = this.distanceY(vec);

	return dx * dx + dy * dy;
};

/**
 * Calculates the length or magnitude of the vector
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.length();
 *     // => 111.80339887498948
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.length = function () {
	return Math.sqrt(this.lengthSq());
};

/**
 * Squared length / magnitude
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *
 *     vec.lengthSq();
 *     // => 12500
 *
 * @return {Number} Length / Magnitude
 * @api public
 */
Victor.prototype.lengthSq = function () {
	return this.x * this.x + this.y * this.y;
};

Victor.prototype.magnitude = Victor.prototype.length;

/**
 * Returns a true if vector is (0, 0)
 *
 * ### Examples:
 *     var vec = new Victor(100, 50);
 *     vec.zero();
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isZero = function() {
	return this.x === 0 && this.y === 0;
};

/**
 * Returns a true if this vector is the same as another
 *
 * ### Examples:
 *     var vec1 = new Victor(100, 50);
 *     var vec2 = new Victor(100, 50);
 *     vec1.isEqualTo(vec2);
 *
 *     // => true
 *
 * @return {Boolean}
 * @api public
 */
Victor.prototype.isEqualTo = function(vec2) {
	return this.x === vec2.x && this.y === vec2.y;
};

/**
 * # Utility Methods
 */

/**
 * Returns an string representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toString();
 *     // => x:10, y:20
 *
 * @return {String}
 * @api public
 */
Victor.prototype.toString = function () {
	return 'x:' + this.x + ', y:' + this.y;
};

/**
 * Returns an array representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toArray();
 *     // => [10, 20]
 *
 * @return {Array}
 * @api public
 */
Victor.prototype.toArray = function () {
	return [ this.x, this.y ];
};

/**
 * Returns an object representation of the vector
 *
 * ### Examples:
 *     var vec = new Victor(10, 20);
 *
 *     vec.toObject();
 *     // => { x: 10, y: 20 }
 *
 * @return {Object}
 * @api public
 */
Victor.prototype.toObject = function () {
	return { x: this.x, y: this.y };
};


var degrees = 180 / Math.PI;

function random (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function radian2degrees (rad) {
	return rad * degrees;
}

function degrees2radian (deg) {
	return deg / degrees;
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var AnimationManager = {
	animations: [],

	add: function add(animation) {
		this.animations.push(animation);
	},
	update: function update(time) {
		for (var i = this.animations.length - 1; i >= 0; i--) {
			if (this.animations[i].done) {
				this.animations[i].destroy();
				this.animations.splice(i, 1);
				return;
			}

			this.animations[i].update(time);
		}
	}
};

exports.default = AnimationManager;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoltSegment = function () {
	function BoltSegment(drawContainer, a, b, thickness, color, startTime, lifeSpan) {
		_classCallCheck(this, BoltSegment);

		this.drawContainer = drawContainer;
		this.shape = new createjs.Shape();
		this.a = a;
		this.b = b;
		this.thickness = thickness;
		this.lifeSpan = lifeSpan;
		this.lifeTime = lifeSpan;
		this.startTime = startTime;
		this.color = color;
		this.alive = true;

		this.setupGraphics();
	}

	_createClass(BoltSegment, [{
		key: "setupGraphics",
		value: function setupGraphics() {
			this.shape.graphics.setStrokeStyle(this.thickness).beginStroke(this.color);
			this.shape.graphics.moveTo(this.a.x, this.a.y);
			this.shape.graphics.lineTo(this.b.x, this.b.y);

			this.drawContainer.addChild(this.shape);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.drawContainer.removeChild(this.shape);
		}
	}, {
		key: "update",
		value: function update(time) {
			if (!this.alive) return;

			this.startTime -= time.delta;
			if (this.startTime < 1) {
				this.lifeTime -= time.delta;
				if (this.lifeTime < 1) {
					this.alive = false;
				}
			}

			this.draw(time);
		}
	}, {
		key: "draw",
		value: function draw(time) {
			if (!this.alive || this.startTime > 0) return;

			this.shape.alpha = this.lifeTime / this.lifeSpan;

			//this.graphics.endStroke();
		}
	}]);

	return BoltSegment;
}();

exports.default = BoltSegment;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _shotAnimation = require('./shotAnimation');

var _shotAnimation2 = _interopRequireDefault(_shotAnimation);

var _lightningBoltAnimation = require('./lightningBoltAnimation');

var _lightningBoltAnimation2 = _interopRequireDefault(_lightningBoltAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var animationClasses = {
	ShotAnimation: _shotAnimation2.default,
	LightningBoltAnimation: _lightningBoltAnimation2.default
};

/**
 * Wrapper for all the different tile types
 */

var DynamicAnimation = function DynamicAnimation(className) {
	_classCallCheck(this, DynamicAnimation);

	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	return new (Function.prototype.bind.apply(animationClasses[className], [null].concat(args)))();
};

exports.default = DynamicAnimation;

},{"./lightningBoltAnimation":6,"./shotAnimation":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _random = require('../helpers/random');

var _random2 = _interopRequireDefault(_random);

var _boltSegment = require('./boltSegment');

var _boltSegment2 = _interopRequireDefault(_boltSegment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BoltLifeSpan = 50; // How long the bolt will be visible

// Single lightning bolt effect

var LightningBoltAnimation = function () {
	function LightningBoltAnimation(drawContainer, position, target) {
		_classCallCheck(this, LightningBoltAnimation);

		this.drawContainer = drawContainer;
		this.segments = this.create(position, target.position.clone(), 2);
	}

	_createClass(LightningBoltAnimation, [{
		key: 'destroy',
		value: function destroy() {
			for (var i = this.segments.length - 1; i >= 0; i--) {
				this.segments[i].destroy();
				this.segments.splice(i, 1);
			}
		}
	}, {
		key: 'update',
		value: function update(time) {
			for (var i = this.segments.length - 1; i >= 0; i--) {
				this.segments[i].update(time);

				if (!this.segments[i].alive) {
					this.segments[i].destroy();
					this.segments.splice(i, 1);
				}
			};

			//this.shape.graphics.endStroke();
		}

		/**
   * Will generate random points along a line 0.0 - 1.0.
   * The points will displaced for the jagged look.
   * @param  {Vector} source    		Start position
   * @param  {Vector} dest      		End position
   * @param  {int} thickness 	  		Thickness of the segments/lines
   * @return {Array[BoltSegments]}
   */

	}, {
		key: 'create',
		value: function create(source, dest, thickness) {
			var results = [],
			    positions = [],
			    tangent = dest.clone().subtract(source),
			    normal = new _victor2.default(tangent.y, -tangent.x).normalize(),
			    length = tangent.length();

			positions.push(0);

			// To many will make it to jagged
			for (var i = 0; i < length / 4; i++) {
				positions.push(Math.random());
			};

			positions.sort();

			var sway = 4000; // How much the bolt will bend. Lower value = more straight
			var jaggedness = 1 / sway;

			var prevPoint = source,
			    prevDisplacement = 0;

			for (var i = 1; i < positions.length; i++) {

				var pos = positions[i],
				    scale = length * jaggedness * (pos - positions[i - 1]),
				    envelope = pos > 0.95 ? 20 * (1 - pos) : 1,
				    displacement = _random2.default.next(-sway, sway, true);

				displacement -= (displacement - prevDisplacement) * (1 - scale);
				displacement *= envelope;

				var point = source.clone().add(tangent.clone().multiplyScalar(pos)).add(normal.clone().multiplyScalar(displacement));
				results.push(new _boltSegment2.default(this.drawContainer, prevPoint, point, thickness, "#FDFCFA", i, BoltLifeSpan * positions.length / i));
				prevPoint = point;
				prevDisplacement = displacement;
			};

			results.push(new _boltSegment2.default(this.drawContainer, prevPoint, dest, thickness, "#FDFCFA", positions.length - 1, BoltLifeSpan * positions.length / positions.length - 1));
			return results;
		}
	}, {
		key: 'done',
		get: function get() {
			return this.segments.length < 1;
		}
	}]);

	return LightningBoltAnimation;
}();

exports.default = LightningBoltAnimation;

},{"../helpers/random":16,"./boltSegment":4,"victor":2}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _steering = require("../helpers/steering");

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ShotAnimation = function () {
	function ShotAnimation(drawContainer, position, target) {
		_classCallCheck(this, ShotAnimation);

		this.steering = new _steering2.default(this, { maxVelocity: 4.6 * 1000, mass: 15 });
		this.position = position;
		this.target = target;
		this.drawContainer = drawContainer;

		this.setupGraphics();
	}

	_createClass(ShotAnimation, [{
		key: "setupGraphics",
		value: function setupGraphics() {
			this.shape = new createjs.Shape();
			this.shape.graphics.beginFill("#000").drawCircle(0, 0, 5);

			this.drawContainer.addChild(this.shape);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this.drawContainer.removeChild(this.shape);
		}
	}, {
		key: "update",
		value: function update(time) {
			this.steering.seek(this.target.position);
			this.steering.update(time);

			this.shape.x = this.position.x;
			this.shape.y = this.position.y;
		}
	}, {
		key: "done",
		get: function get() {
			return this.position.distance(this.target.position) < this.target.rect.width;
		}
	}]);

	return ShotAnimation;
}();

exports.default = ShotAnimation;

},{"../helpers/steering":17}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.createjs.Point = _victor2.default; // Override CreateJs point to be Victor lib

var App = function () {
	function App() {
		var _this = this;

		_classCallCheck(this, App);

		this.stage = new createjs.Stage("canvas");

		window.addEventListener('resize', this.fullScreen.bind(this), false);
		window.onkeydown = function (e) {
			return _game2.default.keys[e.keyCode] = true;
		};
		window.onkeyup = function (e) {
			return _game2.default.keys[e.keyCode] = false;
		};

		_assets2.default.middleware = this.assetsMiddleware.bind(this);
		_assets2.default.on('progress', function (progress) {
			console.log(progress.loaded);
		});

		_assets2.default.on('complete', function () {
			console.log("Assets download completed");
			_this.start(); // Start game when assets is downloaded
		});

		// Start downloading assets
		_assets2.default.loadManifest("data/manifest.json");
	}

	_createClass(App, [{
		key: 'start',
		value: function start() {
			this.fullScreen();
			createjs.Ticker.addEventListener("tick", this.loop.bind(this));
			createjs.Ticker.framerate = 30;

			_game2.default.start(this.stage);
		}
	}, {
		key: 'assetsMiddleware',
		value: function assetsMiddleware(setting) {
			var colors = _assets2.default.get('color', false).colors;

			var temp = JSON.stringify(setting, function (key, value) {

				if (key === "waves" && Array.isArray(value)) {
					// if waves exist we assume setting is units.json

					for (var i = 0; i < value.length; i++) {
						Object.assign(value[i].props, { width: setting.unitSize, height: setting.unitSize });
					};
				}

				if (key.indexOf("color") !== -1 || key.indexOf("Color") !== -1) {
					return colors[value] || value;
				}

				return value;
			});

			return JSON.parse(temp);
		}

		/**
   * Make canvas fullscreen
   * @return {void}
   */

	}, {
		key: 'fullScreen',
		value: function fullScreen() {
			this.stage.canvas.width = window.innerWidth;
			this.stage.canvas.height = window.innerHeight;
		}

		/**
   * Application loop
   * @param  {CreateJS.Ticker.Events} time time.Delta == elapsed ms
   */

	}, {
		key: 'loop',
		value: function loop(time) {
			// time.delta == elapsed ms
			_game2.default.update(time);
			_game2.default.draw(this.stage, time);
			this.stage.update();
		}
	}]);

	return App;
}();

var EffectiveGuacamoleTD = new App();

},{"./assets":9,"./game":11,"victor":2}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CreateJs = window.createjs; // Make CreateJs more accessible

/**
 * Wrapper for the CreateJs Preload functionallity
 */

var Assets = function () {
	function Assets() {
		_classCallCheck(this, Assets);

		this._middleware;
		this.queue = new CreateJs.LoadQueue(true);
		this.queue.on("complete", this.onComplete.bind(this));
		this.working = false;
	}

	_createClass(Assets, [{
		key: "loadManifest",
		value: function loadManifest(path) {
			if (this.working) throw new Error("Already working on downloading");

			this.working = true;
			this.queue.loadManifest(path);
		}
	}, {
		key: "get",
		value: function get(id, runMiddleware) {
			var result = this.queue.getResult(id);

			if ((runMiddleware == null || runMiddleware == true) && this._middleware && result) return this._middleware(result);

			return result;
		}
	}, {
		key: "onComplete",
		value: function onComplete() {
			this.working = false;
		}
	}, {
		key: "on",
		value: function on(name, method) {
			this.queue.on(name, method);
		}
	}, {
		key: "middleware",
		set: function set(func) {
			this._middleware = func;
		}
	}]);

	return Assets;
}();

exports.default = new Assets();

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _keyMirror = require('keyMirror');

var _keyMirror2 = _interopRequireDefault(_keyMirror);

var _arrayHelper = require('./helpers/arrayHelper');

var _arrayHelper2 = _interopRequireDefault(_arrayHelper);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dock = function () {
	function Dock(stage) {
		_classCallCheck(this, Dock);

		this.colors = _assets2.default.get('color', false).colors;
		this.tileTypes = _arrayHelper2.default.rotate([this.extractTileTypes(_assets2.default.get("world"))]);
		this.grid = [];
		this.stage = stage;
		this.rect = new createjs.Rectangle(0, stage.canvas.height - this.height, stage.canvas.width, this.height);

		this.selectedTower = null;

		this.drawContainer = this.createDrawContainer(stage);
		this.drawContainer.addEventListener("click", this.onDockClick.bind(this));
		this.createLabels();
	}

	_createClass(Dock, [{
		key: 'init',
		value: function init() {
			this.grid = new _grid2.default(this.tileTypes.length, this.tileTypes[0].length, this.tileSize, this.tileJudger.bind(this));

			this.stage.addChild(this.drawContainer);
		}

		/**
   * Search through the different tile types for the ones who can attack
   * @param  {json} worldSettings World JSON settings
   * @return {object[]}               List of the attacking tile types
   */

	}, {
		key: 'extractTileTypes',
		value: function extractTileTypes(worldSettings) {
			var types = [];
			for (var prop in worldSettings.tileTypes) {
				if (worldSettings.tileTypes.hasOwnProperty(prop)) {
					if (worldSettings.tileTypes[prop].attacks) {
						types.push({ name: prop, displayName: worldSettings.tileTypes[prop].name, settings: worldSettings.tileTypes[prop] });
					}
				}
			}
			return types;
		}

		/**
   * Create a container for the docker graphics
   * @param  {createjs.Stage} stage Game main stage
   * @return {createjs.Container}       
   */

	}, {
		key: 'createDrawContainer',
		value: function createDrawContainer(stage) {
			var container = new createjs.Container();
			container.y = this.rect.y;

			var background = new createjs.Shape();
			background.graphics.setStrokeStyle(2).beginStroke(this.colors["dockBorder"]).beginFill(this.colors["dock"]).drawRect(0, 0, this.rect.width, this.rect.height);

			container.addChild(background);
			return container;
		}
	}, {
		key: 'createLabels',
		value: function createLabels() {
			// Cash label
			this.cashLabel = new createjs.Text("Cash: " + _game2.default.props.cash, "20px Arial", "#fff");
			this.cashLabel.y = this.height / 2;
			this.cashLabel.x = this.rect.width - this.cashLabel.getMeasuredWidth() - 20;

			// Lives label
			this.livesLabel = new createjs.Text("Lives: " + _game2.default.props.lives, "20px Arial", "#fff");
			this.livesLabel.y = this.height / 2 - 40;
			this.livesLabel.x = this.rect.width - this.cashLabel.getMeasuredWidth() - 20;

			this.drawContainer.addChild(this.cashLabel);
			this.drawContainer.addChild(this.livesLabel);
		}

		/**
   * Decides and create the tile
   * @param  {int} gridX X in grid array
   * @param  {int} gridY Y in grid array
   * @return {Tile}      
   */

	}, {
		key: 'tileJudger',
		value: function tileJudger(gridX, gridY) {
			var tilePos = new _victor2.default(gridX * this.tileSize + this.padding, this.padding),
			    tileType = this.tileTypes[gridX][gridY],
			    text = new createjs.Text(tileType.displayName, "16px Arial", this.colors["greyWhite"]),
			    shape = new createjs.Shape();

			shape.graphics.setStrokeStyle(1).beginStroke("#fff").beginFill(this.colors["TealColor"]).drawRect(tilePos.x, tilePos.y, this.tileSize, this.tileSize);

			text.x = tilePos.x + this.tileSize / 2 - text.getMeasuredWidth() / 2;
			text.y = tilePos.y + this.tileSize / 2 + text.getMeasuredHeight() / 2;
			text.textBaseline = "alphabetic";

			this.drawContainer.addChild(shape);
			this.drawContainer.addChild(text);
			return tileType;
		}
	}, {
		key: 'onDockClick',
		value: function onDockClick(click) {
			var gridPos = this.grid.getArrayPos(this.drawContainer.globalToLocal(click.stageX, click.stageY), this.padding);

			if (gridPos) {
				this.selectedTower = this.tileTypes[gridPos.x][gridPos.y];
			}
		}
	}, {
		key: 'update',
		value: function update(time) {
			this.cashLabel.text = "Cash: " + _game2.default.props.cash;
			this.livesLabel.text = "Lives: " + _game2.default.props.lives;
		}
	}, {
		key: 'tileSize',
		get: function get() {
			return 60;
		} //TODO: Make this a settting

	}, {
		key: 'padding',
		get: function get() {
			return 20;
		}
	}, {
		key: 'height',
		get: function get() {
			return this.tileSize + this.padding * 2;
		}
	}], [{
		key: 'Events',
		get: function get() {
			return (0, _keyMirror2.default)({
				TOWER_SELECTED: null
			});
		}
	}]);

	return Dock;
}();

exports.default = Dock;

},{"./assets":9,"./game":11,"./grid":12,"./helpers/arrayHelper":14,"keyMirror":1,"victor":2}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.keyNames = undefined;

var _world = require('./world');

var _world2 = _interopRequireDefault(_world);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _dock = require('./dock');

var _dock2 = _interopRequireDefault(_dock);

var _unitManager = require('./unitManager');

var _unitManager2 = _interopRequireDefault(_unitManager);

var _animationManager = require('./animations/animationManager');

var _animationManager2 = _interopRequireDefault(_animationManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var keyNames = exports.keyNames = {
	shift: 16
};

var Game = {
	running: false,
	cameraSpeed: 20,
	keys: [],
	props: {},

	stage: null,
	world: null,
	worldStage: null,
	unitManager: null,
	dock: null,

	/**
  * Initiate all the game components
  * @return {void}
  */
	start: function start(stage) {
		Object.assign(Game.props, _assets2.default.get('game'));
		Game.stage = stage;
		Game.worldStage = stage.addChild(new createjs.Container());

		Game.world = new _world2.default(Game.worldStage);
		Game.unitManager = new _unitManager2.default(Game.worldStage);
		Game.dock = new _dock2.default(stage);

		// Initiate
		Game.world.init();
		Game.unitManager.init();
		Game.dock.init();

		Game.running = true;
	},
	drawGameOver: function drawGameOver() {
		var gameOver = new createjs.Text("Game Over!", "60px Arial", "#fff");
		gameOver.x = Game.stage.canvas.width / 2 - gameOver.getMeasuredWidth() / 2;
		gameOver.y = Game.stage.canvas.height / 2 - gameOver.getMeasuredHeight() / 2;

		Game.stage.addChild(gameOver);
	},
	checkKeys: function checkKeys() {
		if (Game.keys[37]) Game.worldStage.regX -= Game.cameraSpeed;

		if (Game.keys[38]) Game.worldStage.regY -= Game.cameraSpeed;

		if (Game.keys[39]) Game.worldStage.regX += Game.cameraSpeed;

		if (Game.keys[40]) Game.worldStage.regY += Game.cameraSpeed;
	},
	update: function update(time) {
		Game.checkKeys();

		if (!Game.running) return;

		Game.world.update(time);
		Game.unitManager.update(time);
		Game.dock.update(time);

		_animationManager2.default.update(time);
	},
	draw: function draw(stage, time) {
		if (!Game.running) return;

		Game.world.draw(stage, time);
	},


	// ################################

	buyingTower: function buyingTower(price) {
		if (Game.props.cash - price >= 0) {
			Game.props.cash -= price;
			return true;
		}

		return false;
	},
	recieveCash: function recieveCash(amount) {
		Game.props.cash += amount;
	},
	loseLife: function loseLife() {
		Game.props.lives -= 1;

		if (Game.props.lives <= 0) {
			Game.running = false;
			Game.drawGameOver();
		}
	}
};

exports.default = Game;

},{"./animations/animationManager":3,"./assets":9,"./dock":10,"./unitManager":24,"./world":28}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _mathHelper = require('./helpers/mathHelper');

var _mathHelper2 = _interopRequireDefault(_mathHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Grid = function () {
	function Grid(x, y, tileSize, tileJudger) {
		_classCallCheck(this, Grid);

		this.tiles = [];
		this.x = x;
		this.y = y;
		this.tileSize = tileSize;

		this.generate(tileJudger);
	}

	/**
  * Populate cells
  * @param  {function} tileJudger Will determine and return a cell
  * @return {void}
  */


	_createClass(Grid, [{
		key: 'generate',
		value: function generate(tileJudger) {
			for (var i = 0; i < this.x; i++) {
				this.tiles[i] = [];

				for (var j = 0; j < this.y; j++) {
					this.tiles[i][j] = tileJudger(i, j);
				}
			}
		}

		/**
   * Get cell based on screen vector
   * @param  {vector} pos Screen vector
   * @return {Cell}     
   */

	}, {
		key: 'getTile',
		value: function getTile(pos) {
			var gridPos = this.getArrayPos(pos);

			if (gridPos != null) {
				return this.tiles[gridPos.x][gridPos.y];
			}

			return null;
		}

		/**
   * Get grid position based on screen vector
   * @param  {vector} pos Screen vector
   * @return {object}     Snap grid position
   */

	}, {
		key: 'getArrayPos',
		value: function getArrayPos(pos, padding) {
			var gridPos = {
				x: Math.floor(_mathHelper2.default.snapToFloor(pos.x, this.tileSize, padding) / this.tileSize),
				y: Math.floor(_mathHelper2.default.snapToFloor(pos.y, this.tileSize, padding) / this.tileSize)
			};

			if (this.validArrayPos(gridPos)) return gridPos;

			return null;
		}

		/**
   * Converts grid array pos {x,y} to screen positions
   * @param  {{x,y}} pos Grid postion
   * @return {vector}     Screen vector
   */

	}, {
		key: 'getScreenVector',
		value: function getScreenVector(pos) {
			return _victor2.default.fromObject(pos).multiplyScalar(this.tileSize).add(new _victor2.default(this.tileSize / 2, this.tileSize / 2));
		}

		/**
   * Checks if the grid pos is inside of array length
   * @param  {{x,y}} pos Grid position
   * @return {bool}     
   */

	}, {
		key: 'validArrayPos',
		value: function validArrayPos(pos) {
			return pos.x < this.x && pos.y < this.y;
		}

		/**
   * Generate nodes  based on grid tiles. Used by aStar to calculate path
   * @return {nodes[][]}
   */

	}, {
		key: 'createAStarNodes',
		value: function createAStarNodes() {
			var nodes = [];
			for (var i = 0; i < this.tiles.length; i++) {
				nodes[i] = [];
				for (var j = 0; j < this.tiles[0].length; j++) {
					nodes[i][j] = {
						x: i, y: j, f: 0, g: 0, h: 0,
						vector: this.getScreenVector({ x: i, y: j }),
						isWall: this.tiles[i][j].isWall
					};
				};
			};

			return nodes;
		}
	}]);

	return Grid;
}();

exports.default = Grid;

},{"./helpers/mathHelper":15,"victor":2}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _arrayHelper = require('./arrayHelper');

var _arrayHelper2 = _interopRequireDefault(_arrayHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AStar = {
	search: function search(nodes, start, end) {

		var closedSet = [],
		    openSet = [],
		    currentNode = void 0;

		openSet.push(start);

		while (openSet.length > 0) {

			var fIndex = 0;
			for (var i = 0; i < openSet.length; i++) {
				if (openSet[i].f < openSet[fIndex].f) fIndex = i;
			};
			currentNode = openSet[fIndex];

			// Found goal, return the path
			if (currentNode == end) {
				var curr = currentNode,
				    ret = [];

				while (curr.parent) {
					ret.push(curr);
					curr = curr.parent;
				}

				return ret.reverse();
			}

			openSet.splice(openSet.indexOf(currentNode), 1);
			closedSet.push(currentNode);

			var neighbors = _arrayHelper2.default.neighbors(nodes, currentNode, false);

			for (var i = 0; i < neighbors.length; i++) {
				var neighbor = neighbors[i];

				if (closedSet.indexOf(neighbor) > -1 || neighbor.isWall) {
					continue; // Not a valid node to walk to
				}

				var gScore = currentNode.g + 1,
				    // 1 is distance to to it's neighbor
				bestG = false;

				if (openSet.indexOf(neighbor) < 0) {
					// We have not been here before therefor the best g
					bestG = true;
					neighbor.h = AStar.manhattan(neighbor, end);
					openSet.push(neighbor);
				} else if (gScore < neighbor.g) {
					bestG = true;
				}

				if (bestG) {
					neighbor.parent = currentNode;
					neighbor.g = gScore;
					neighbor.f = neighbor.g + neighbor.h;
				}
			};
		}

		return []; // Did not find any path
	},
	manhattan: function manhattan(pos1, pos2) {
		var d1 = Math.abs(pos2.x - pos1.x);
		var d2 = Math.abs(pos2.y - pos1.y);
		return d1 + d2;
	}
};

exports.default = AStar;

},{"./arrayHelper":14}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ArrayHelper = {

  /**
   * Switch place on i & j
   * @param  {Array[][]} arr
   * @return {Array[][]}     		The rotated array
   */

  rotate: function rotate(arr) {
    var n = [];

    for (var i = 0; i < arr[0].length; i++) {
      n[i] = [];
      for (var j = 0; j < arr.length; j++) {
        n[i][j] = arr[j][i];
      };
    };

    return n;
  },
  neighbors: function neighbors(array, element, diagonals) {
    if (typeof array == 'undefined' || typeof array[0] == 'undefined' || typeof array[0][0] == 'undefined') {
      throw new Error("Not a two dimensional array");
    }

    var ret = [],
        x = void 0,
        y = void 0;

    if (element.x && parseInt(element.x) < array.length && element.y && parseInt(element.y) < array[0].length) {
      x = element.x;
      y = element.y;
    } else {
      for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array[0].length; j++) {
          if (array[i][j] == element) {
            x = i;
            y = j;
            break;
          }
        }
      }
    }

    // West
    if (array[x - 1] && array[x - 1][y]) {
      ret.push(array[x - 1][y]);
    }

    // East
    if (array[x + 1] && array[x + 1][y]) {
      ret.push(array[x + 1][y]);
    }

    // South
    if (array[x] && array[x][y - 1]) {
      ret.push(array[x][y - 1]);
    }

    // North
    if (array[x] && array[x][y + 1]) {
      ret.push(array[x][y + 1]);
    }

    if (diagonals) {

      // Southwest
      if (array[x - 1] && array[x - 1][y - 1]) {
        ret.push(array[x - 1][y - 1]);
      }

      // Southeast
      if (array[x + 1] && array[x + 1][y - 1]) {
        ret.push(array[x + 1][y - 1]);
      }

      // Northwest
      if (array[x - 1] && array[x - 1][y + 1]) {
        ret.push(array[x - 1][y + 1]);
      }

      // Northeast
      if (array[x + 1] && array[x + 1][y + 1]) {
        ret.push(array[x + 1][y + 1]);
      }
    }

    return ret;
  }
};

exports.default = ArrayHelper;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
        value: true
});

var MathHelper = {
        snapToFloor: function snapToFloor(input, gap, start) {
                if (start === undefined) {
                        start = 0;
                }

                if (gap === 0) {
                        return input;
                }

                input -= start;
                input = gap * Math.floor(input / gap);

                return start + input;
        }
};

exports.default = MathHelper;

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Random = {
	choice: function choice(arr) {
		return arr[Math.floor(Math.random() * arr.length + 0)];
	},
	next: function next(min, max, floatValue) {
		var val = Math.random() * (max - min) + min;
		return floatValue ? val : Math.floor(val);
	}
};

exports.default = Random;

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _victor = require("victor");

var _victor2 = _interopRequireDefault(_victor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultSettings = {
	maxForce: 5.4 * 1000,
	maxVelocity: 3.5 * 1000,
	mass: 20,
	slowingRadious: 70,
	pathRadious: 20,

	maxSeeAhead: 40,
	maxAvoidanceForce: 2000
};

var Steering = function () {
	function Steering(boid, settings) {
		_classCallCheck(this, Steering);

		this.settings = Object.assign({}, defaultSettings, settings);
		this.boid = boid;

		this.steering = new _victor2.default(0, 0);
		this.velocity = this.truncate(new _victor2.default(-1, -2), this.settings.maxVelocity);
		this.desiredVelocity = new _victor2.default(1, 0);
		this.avoidanceForce = new _victor2.default(0, 0);

		this.currentNodePath = 0;
	}

	/**
  * Truncate the vector to the max value
  * @param  {vector} vector 
  * @param  {float} max    
  * @return {vector}         Value will be set on vector and the vector will be returned
  */


	_createClass(Steering, [{
		key: "truncate",
		value: function truncate(vector, max) {
			var i = max / vector.length();
			i = i < 1.0 ? i : 1.0;
			vector.multiplyScalar(i);
			return vector;
		}
	}, {
		key: "resetPath",
		value: function resetPath() {
			this.currentNodePath = 0;
		}
	}, {
		key: "intersectsRectangle",
		value: function intersectsRectangle(ahead, rect) {
			var scalar = this.settings.maxSeeAhead * 0.5 * this.velocity.length() / this.settings.maxVelocity,
			    tv = this.velocity.clone().normalize().multiplyScalar(scalar),
			    ahead2 = this.boid.position.clone().add(tv); // ahead2 is half the length of ahead

			return rect.contains(ahead.x, ahead.y) || rect.contains(ahead2.x, ahead2.y) || rect.intersects(this.boid.rect);
		}
	}, {
		key: "mostThreatingObstacle",
		value: function mostThreatingObstacle(ahead, obstacles) {
			var collision = false,
			    mostThreating = null;

			for (var i = 0; i < obstacles.length; i++) {
				collision = false;

				if (obstacles[i].rect) {

					if (this.intersectsRectangle(ahead, obstacles[i].rect)) {
						if (mostThreating == null || this.boid.position.distance(obstacles[i].center) < this.boid.position.distance(mostThreating.center)) {
							mostThreating = obstacles[i];
						}
					}
				}
			}

			return mostThreating;
		}
	}, {
		key: "collisionAvoidance",
		value: function collisionAvoidance(obstacles) {
			this.steering.add(this.doCollisionAvoidance(obstacles));
		}

		/**
   * The public method to be used. See doFollowPath() for more information
   */

	}, {
		key: "followPath",
		value: function followPath(path) {
			if (this.currentNodePath > path.length) throw new Error("Needs to reset path before setting a new one");

			var slowingRadious = this.currentNodePath == path.length - 1 ? this.settings.slowingRadious : 0;
			this.seek(this.doFollowPath(path), slowingRadious);
		}

		/**
   * The public method to be used. See doSeek() for more information
   */

	}, {
		key: "seek",
		value: function seek(target, slowingRadious) {
			this.steering.add(this.doSeek(target, slowingRadious));
		}

		/**
   * Move the boid closer to the target. This method alone should not be used
   * @param  {vector} target         
   * @param  {float} slowingRadious  (Arrive behaviour) If in radious the boid will slowdown before reaching the target. Allows null
   * @return {vector}                Force vector for pushing closer to target
   */

	}, {
		key: "doSeek",
		value: function doSeek(target, slowingRadious) {
			var distance = void 0;

			this.desiredVelocity = target.clone().subtract(this.boid.position);

			distance = this.desiredVelocity.length();
			this.desiredVelocity.normalize();

			if (distance <= slowingRadious) {
				this.desiredVelocity.multiplyScalar(this.settings.maxVelocity * distance / slowingRadious);
			} else {
				this.desiredVelocity.multiplyScalar(this.settings.maxVelocity);
			}

			// Return force
			return this.desiredVelocity.clone().subtract(this.velocity);
		}

		/**
   * Follow path by increment to the next node if node inside Settigs.pathRadious
   * @param  {vector[]} path  Vector array of the path
   * @return {vector}         current target node
   */

	}, {
		key: "doFollowPath",
		value: function doFollowPath(path) {
			var target = path[this.currentNodePath];
			if (this.boid.position.distance(target) <= this.settings.pathRadious && this.currentNodePath < path.length - 1) this.currentNodePath++;

			return target;
		}
	}, {
		key: "doCollisionAvoidance",
		value: function doCollisionAvoidance(obstacles) {
			var tvScalar = this.settings.maxSeeAhead * this.velocity.length() / this.settings.maxVelocity,
			    tv = this.velocity.clone().normalize().multiplyScalar(tvScalar),
			    ahead = this.boid.position.clone().add(tv); // Ahead is the velocity vector, but longer

			var threat = this.mostThreatingObstacle(ahead, obstacles);

			if (threat) {
				this.avoidanceForce.x = ahead.x - threat.center.x;
				this.avoidanceForce.y = ahead.y - threat.center.y;

				this.avoidanceForce.normalize().multiplyScalar(this.settings.maxAvoidanceForce);
			} else {
				this.avoidanceForce = new _victor2.default(0, 0);
			}

			return this.avoidanceForce;
		}

		/**
   * Update boids position by adding all the forces that was pushed to the steering
   * @param  {createjs.tickEvent} time Game loop time
   * @return {void}      
   */

	}, {
		key: "update",
		value: function update(time) {
			this.truncate(this.steering, this.settings.maxForce);
			this.steering.multiplyScalar(1.0 / this.settings.mass);

			this.velocity.add(this.steering);
			this.truncate(this.velocity, this.settings.maxVelocity);
			this.velocity.multiplyScalar(time.delta / 1000.0);

			this.boid.position.add(this.velocity);
		}
	}]);

	return Steering;
}();

exports.default = Steering;

},{"victor":2}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Obstacle = function Obstacle(center) {
	_classCallCheck(this, Obstacle);

	this.center = center;
};

exports.default = Obstacle;

},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _obstacle = require('./obstacle');

var _obstacle2 = _interopRequireDefault(_obstacle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RectangleObstacle = function (_Obstacle) {
	_inherits(RectangleObstacle, _Obstacle);

	function RectangleObstacle(rect) {
		_classCallCheck(this, RectangleObstacle);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RectangleObstacle).call(this, new _victor2.default(rect.x + rect.width / 2, rect.y + rect.height / 2)));

		_this.rect = rect;
		return _this;
	}

	return RectangleObstacle;
}(_obstacle2.default);

exports.default = RectangleObstacle;

},{"./obstacle":18,"victor":2}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseTile = function () {
	function BaseTile(rect, settings) {
		_classCallCheck(this, BaseTile);

		this.settings = settings;
		this.rect = rect;
		this.position = new _victor2.default(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
	}

	_createClass(BaseTile, [{
		key: 'update',
		value: function update(time, units) {}
	}, {
		key: 'isWall',
		get: function get() {
			return this.settings.wall;
		}
	}, {
		key: 'isConvertable',
		get: function get() {
			return this.settings.convertable;
		}
	}, {
		key: 'canAttack',
		get: function get() {
			return this.settings.canAttack;
		}
	}]);

	return BaseTile;
}();

exports.default = BaseTile;

},{"victor":2}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _genericTile = require('./genericTile');

var _genericTile2 = _interopRequireDefault(_genericTile);

var _towerTile = require('./towerTile');

var _towerTile2 = _interopRequireDefault(_towerTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tileClasses = {
	GenericTile: _genericTile2.default,
	TowerTile: _towerTile2.default
};

/**
 * Wrapper for all the different tile types
 */

var DynamicTile = function DynamicTile(className) {
	_classCallCheck(this, DynamicTile);

	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	return new (Function.prototype.bind.apply(tileClasses[className], [null].concat(args)))();
};

exports.default = DynamicTile;

},{"./genericTile":22,"./towerTile":23}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseTile = require('./baseTile');

var _baseTile2 = _interopRequireDefault(_baseTile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GenericTile = function (_BaseTile) {
	_inherits(GenericTile, _BaseTile);

	function GenericTile(drawContainer) {
		var _Object$getPrototypeO;

		_classCallCheck(this, GenericTile);

		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(GenericTile)).call.apply(_Object$getPrototypeO, [this].concat(args)));

		_this.setupGraphics(drawContainer);
		return _this;
	}

	_createClass(GenericTile, [{
		key: 'setupGraphics',
		value: function setupGraphics(drawContainer) {
			this.shape = new createjs.Shape();

			if (this.borderColor) {
				this.shape.graphics.setStrokeStyle(1).beginStroke(this.borderColor);
			}

			this.shape.graphics.beginFill(this.color).drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);

			drawContainer.addChild(this.shape);
		}
	}, {
		key: 'color',
		get: function get() {
			return this.settings.color;
		}
	}, {
		key: 'borderColor',
		get: function get() {
			return this.settings.borderColor;
		}
	}]);

	return GenericTile;
}(_baseTile2.default);

exports.default = GenericTile;

},{"./baseTile":20}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _baseTile = require('./baseTile');

var _baseTile2 = _interopRequireDefault(_baseTile);

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _animationManager = require('../animations/animationManager');

var _animationManager2 = _interopRequireDefault(_animationManager);

var _dynamicAnimation = require('../animations/dynamicAnimation');

var _dynamicAnimation2 = _interopRequireDefault(_dynamicAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TowerTile = function (_BaseTile) {
	_inherits(TowerTile, _BaseTile);

	function TowerTile(drawContainer) {
		var _Object$getPrototypeO;

		_classCallCheck(this, TowerTile);

		for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			args[_key - 1] = arguments[_key];
		}

		var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(TowerTile)).call.apply(_Object$getPrototypeO, [this].concat(args)));

		_this.lastShoot = 0.0;
		_this.aimLength = _this.rect.width / 2.0;
		_this.aimShape;

		_this.drawContainer = drawContainer;
		_this.setupGraphics(drawContainer);
		return _this;
	}

	_createClass(TowerTile, [{
		key: 'setupGraphics',
		value: function setupGraphics(drawContainer) {
			var baseShape = new createjs.Shape();
			baseShape.graphics.beginFill(this.settings.rectColor).drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
			baseShape.graphics.setStrokeStyle(2).beginFill(this.settings.color).drawCircle(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2, this.rect.width / 2 - 1);

			this.aimShape = new createjs.Shape();
			drawContainer.addChild(baseShape);
			drawContainer.addChild(this.aimShape);
		}
	}, {
		key: 'updateAim',
		value: function updateAim(target) {
			this.aimShape.graphics.clear();

			var xDist = target.position.x - this.position.x,
			    yDist = target.position.y - this.position.y,
			    angle = Math.atan2(-yDist, xDist);

			if (angle < 0) angle += 2 * Math.PI;

			var angleVec = new _victor2.default(Math.cos(angle), -Math.sin(angle)),
			    lineTo = this.position.clone().add(angleVec.multiplyScalar(this.aimLength));

			this.aimShape.graphics.setStrokeStyle(2).beginStroke(this.settings.aimColor).moveTo(this.position.x, this.position.y).lineTo(lineTo.x, lineTo.y);
		}
	}, {
		key: 'update',
		value: function update(time, units) {
			var _this2 = this;

			_get(Object.getPrototypeOf(TowerTile.prototype), 'update', this).call(this, time, units);

			var closeUnits = units.filter(function (u) {
				return u.position && u.position.distance(_this2.position) < _this2.range;
			});
			if (closeUnits.length > 0) {
				this.updateAim(closeUnits[0]);

				// Shooting
				this.lastShoot += time.delta;
				if (this.lastShoot > this.shootingInterval) {
					closeUnits[0].damagedTaken(this.damage);
					this.lastShoot -= this.shootingInterval;
					console.log("Shooting");

					_animationManager2.default.add(new _dynamicAnimation2.default(this.projectileAnimation, this.drawContainer, this.position.clone(), closeUnits[0]));
				}
			}
		}
	}, {
		key: 'range',
		get: function get() {
			return this.settings.range || 0;
		}
	}, {
		key: 'damage',
		get: function get() {
			return this.settings.damage || 0;
		}
	}, {
		key: 'shootingInterval',
		get: function get() {
			return this.settings.shootingInterval || 500;
		}
	}, {
		key: 'projectileAnimation',
		get: function get() {
			return this.settings.projectileAnimation || "ShotAnimation";
		}
	}]);

	return TowerTile;
}(_baseTile2.default);

exports.default = TowerTile;

},{"../animations/animationManager":3,"../animations/dynamicAnimation":5,"./baseTile":20,"victor":2}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _world = require('./world');

var _world2 = _interopRequireDefault(_world);

var _dynamicUnit = require('./units/dynamicUnit');

var _dynamicUnit2 = _interopRequireDefault(_dynamicUnit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UnitManager = function () {
	function UnitManager(stage) {
		_classCallCheck(this, UnitManager);

		this.stage = stage;
		this.settings = _assets2.default.get("units");
		this.units = [];
		this.worldObstacles = null;

		this.currentWave = 0;
		this.ongoingWave = false;
		this.sentWave = false;
		this.wavePath = [];

		_game2.default.world.on(_world2.default.Events.WORLD_CHANGE, this.onWorldChanged.bind(this));
	}

	_createClass(UnitManager, [{
		key: 'init',
		value: function init() {
			this.prepareWave(); // Start sending waves
		}

		/**
   * Will send a wave based on the settings in units.json
   * @return {void}
   */

	}, {
		key: 'prepareWave',
		value: function prepareWave() {
			if (this.ongoingWave) throw new Error("Already sent a wave");

			if (this.currentWave == this.settings.waves.length) {
				console.log("No more waves!");
				return;
			}

			var wave = this.settings.waves[this.currentWave];
			console.log("Starting wave " + (this.currentWave + 1));
			this.ongoingWave = true;
			this.sendUnit(wave, 0);
		}

		/**
   * Sending units in a recursion method
   * @param  {object} wave      Settings from units.json
   * @param  {int} 			  SentUnits Number of sent units
   * @return {void}           
   */

	}, {
		key: 'sendUnit',
		value: function sendUnit(wave, sentUnits) {
			if (sentUnits < wave.length) {
				this.units.push(this.createUnit(wave));
				sentUnits++;
				setTimeout(this.sendUnit.bind(this), this.settings.unitIntervalMs, wave, sentUnits);
			} else {
				this.sentWave = true;
			}
		}
	}, {
		key: 'createUnit',
		value: function createUnit(currentWave) {
			return new _dynamicUnit2.default(currentWave.type, this.stage, this.wavePath.map(function (s) {
				return s.clone();
			}), currentWave.props);
		}

		/**
   * Event that the world has been changed, a new tower for example
   * @param  {World} world 
   * @return {void}       
   */

	}, {
		key: 'onWorldChanged',
		value: function onWorldChanged(event) {
			var world = event.data;
			// Update the path for the wave
			this.wavePath = world.calculatePath(world.start, world.goal);
			this.worldObstacles = world.obstacles;

			// Update all the units path
			for (var i = 0; i < this.units.length; i++) {
				var path = world.calculatePath(world.grid.getArrayPos(this.units[i].position), world.goal);
				if (path && path.length > 0) this.units[i].path = path;
			};
		}
	}, {
		key: 'update',
		value: function update(time) {
			for (var i = this.units.length - 1; i >= 0; i--) {
				if (!this.units[i].alive) {
					this.units[i].destroy();
					this.units.splice(i, 1);
					return;
				}

				this.units[i].update(time, this.worldObstacles);
			};

			if (this.units.length < 1 && this.sentWave) {
				this.currentWave++;
				this.ongoingWave = false;
				this.sentWave = false;
				setTimeout(this.prepareWave.bind(this), this.settings.waveIntervalMs);
			}
		}
	}]);

	return UnitManager;
}();

exports.default = UnitManager;

},{"./assets":9,"./game":11,"./units/dynamicUnit":27,"./world":28}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _game = require('../game');

var _game2 = _interopRequireDefault(_game);

var _steering = require('../helpers/steering');

var _steering2 = _interopRequireDefault(_steering);

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseUnit = function () {
	function BaseUnit(settings) {
		_classCallCheck(this, BaseUnit);

		this.settings = settings;
		this.health = settings.health;
		this.position = new _victor2.default(0, 0);
		this._rect = new createjs.Rectangle(this.position.x, this.position.y, settings.width, settings.height);

		this.steering = new _steering2.default(this, settings);
	}

	_createClass(BaseUnit, [{
		key: 'damagedTaken',
		value: function damagedTaken(damage) {
			this.health -= damage;

			if (!this.alive) {
				_game2.default.recieveCash(this.settings.worth || 50);
			}
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			this.health = 0;
		}
	}, {
		key: 'update',
		value: function update(time) {}
	}, {
		key: 'alive',
		get: function get() {
			return this.health > 0;
		}
	}, {
		key: 'rect',
		get: function get() {
			this._rect.x = this.position.x;
			this._rect.y = this.position.y;
			return this._rect;
		}
	}]);

	return BaseUnit;
}();

exports.default = BaseUnit;

},{"../game":11,"../helpers/steering":17,"victor":2}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _game = require('../game');

var _game2 = _interopRequireDefault(_game);

var _baseUnit = require('./baseUnit');

var _baseUnit2 = _interopRequireDefault(_baseUnit);

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Creep = function (_BaseUnit) {
	_inherits(Creep, _BaseUnit);

	function Creep(drawContainer, path, settings) {
		_classCallCheck(this, Creep);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Creep).call(this, settings));

		_this._path = path;
		_this.position = path[0].clone();
		_this.goal = path[path.length - 1];
		_this.drawContainer = drawContainer;

		_this.setupGraphics();
		return _this;
	}

	_createClass(Creep, [{
		key: 'setupGraphics',
		value: function setupGraphics() {
			this.shape = new createjs.Shape();
			this.shape.graphics.beginFill("#C44741").drawCircle(0, 0, this.settings.width / 2);
			this.drawContainer.addChild(this.shape);
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			_get(Object.getPrototypeOf(Creep.prototype), 'destroy', this).call(this);
			this.drawContainer.removeChild(this.shape);
		}
	}, {
		key: 'update',
		value: function update(time, obstacles) {
			if (this.position.distance(this.goal) <= 2) {
				this.destroy();
				_game2.default.loseLife();
			}

			this.steering.followPath(this._path);
			//this.steering.collisionAvoidance(obstacles);
			this.steering.update(time);

			this.shape.x = this.position.x;
			this.shape.y = this.position.y;
		}
	}, {
		key: 'path',
		set: function set(value) {
			this.steering.resetPath();
			this._path = value;
		}
	}]);

	return Creep;
}(_baseUnit2.default);

exports.default = Creep;

},{"../game":11,"./baseUnit":25,"victor":2}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _creep = require('./creep');

var _creep2 = _interopRequireDefault(_creep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var unitClasses = {
	Creep: _creep2.default
};

/**
 * Wrapper for all the different unit types
 */

var DynamicUnit = function DynamicUnit(className) {
	_classCallCheck(this, DynamicUnit);

	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	return new (Function.prototype.bind.apply(unitClasses[className], [null].concat(args)))();
};

exports.default = DynamicUnit;

},{"./creep":26}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _keyMirror = require('keyMirror');

var _keyMirror2 = _interopRequireDefault(_keyMirror);

var _victor = require('victor');

var _victor2 = _interopRequireDefault(_victor);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

var _grid = require('./grid');

var _grid2 = _interopRequireDefault(_grid);

var _dynamicTile = require('./tiles/dynamicTile');

var _dynamicTile2 = _interopRequireDefault(_dynamicTile);

var _rectangleObstacle = require('./obstacles/rectangleObstacle');

var _rectangleObstacle2 = _interopRequireDefault(_rectangleObstacle);

var _aStar = require('./helpers/aStar');

var _aStar2 = _interopRequireDefault(_aStar);

var _arrayHelper = require('./helpers/arrayHelper');

var _arrayHelper2 = _interopRequireDefault(_arrayHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var World = function (_createjs$EventDispat) {
	_inherits(World, _createjs$EventDispat);

	function World(stage) {
		_classCallCheck(this, World);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(World).call(this));

		_this.settings = _assets2.default.get("world");
		_this.map = _arrayHelper2.default.rotate(_this.settings.map);
		_this.grid = [];
		_this.stage = stage;
		_this.stage.on('click', _this.onWorldClick.bind(_this));

		_this.start = null; // Start position where the units will come from
		_this.goal = null; // The position where the units are trying to go
		_this.mapIterator(function (x, y, tileType) {
			if (tileType.start) _this.start = { x: x, y: y };

			if (tileType.goal) _this.goal = { x: x, y: y };
		});
		return _this;
	}

	_createClass(World, [{
		key: 'init',
		value: function init() {
			this.grid = new _grid2.default(this.map.length, this.map[0].length, this.tileSize, this.tileJudger.bind(this));

			this.raiseEvent(World.Events.WORLD_CHANGE, this);
		}

		/**
   * Decides and create the tile
   * @param  {int} gridX X in grid array
   * @param  {int} gridY Y in grid array
   * @return {Tile}      
   */

	}, {
		key: 'tileJudger',
		value: function tileJudger(gridX, gridY) {
			var gridPos = { x: gridX, y: gridY };

			// Map contains which tile type it is 1,2,3 etc.
			var typeNumber = this.map[gridX][gridY].toString();

			// Sets the tile type on the grid position
			return this.createTile(typeNumber, gridPos);
		}

		/**
   * Create tile based on type
   * @param  {int} typeNumber	   Which tile type number 1,2,3 etc
   * @param  {vector} gridPos    x & y in the grid array
   * @return {DynamicTile}            
   */

	}, {
		key: 'createTile',
		value: function createTile(typeNumber, gridPos) {
			var rect = new createjs.Rectangle(gridPos.x * this.tileSize, gridPos.y * this.tileSize, this.tileSize, this.tileSize),
			    tileSettings = this.settings.tileTypes[typeNumber.toString()];

			return new _dynamicTile2.default(tileSettings.type, this.stage, rect, tileSettings);
		}

		/**
   * Sets both the grid tile object and change the map to the specified typeNumber
   * @param {vector} gridPos    x & y in the grid array
   * @param {int} typeNumber    Which tile type number 1,2,3 etc
   */

	}, {
		key: 'setTile',
		value: function setTile(gridPos, typeNumber) {
			// Set the map number. With this we follow which type of tile it is.
			this.map[gridPos.x][gridPos.y] = parseInt(typeNumber) || typeNumber;

			// Choose tile type based on json settings
			this.grid.tiles[gridPos.x][gridPos.y] = this.createTile(typeNumber, gridPos);
		}

		/**
   * Calculates path between start and goal
   * @param  {vector} start  Grid postion
   * @param  {vector} goal   Grid postion
   * @return {vector[]}      Array of screen vector
   */

	}, {
		key: 'calculatePath',
		value: function calculatePath(start, goal) {
			var nodes = this.grid.createAStarNodes();
			return _aStar2.default.search(nodes, nodes[start.x][start.y], nodes[goal.x][goal.y]).map(function (n) {
				return n.vector;
			});
		}
	}, {
		key: 'mapIterator',
		value: function mapIterator(func) {
			for (var i = 0; i < this.map.length; i++) {
				for (var j = 0; j < this.map[0].length; j++) {

					var typeNumber = this.map[i][j],
					    tileType = this.settings.tileTypes[typeNumber.toString()];

					func(i, j, tileType);
				};
			};
		}
	}, {
		key: 'raiseEvent',
		value: function raiseEvent(name, data) {
			var event = new createjs.Event(name);
			event.data = data;
			this.dispatchEvent(event);
		}

		// ==== EVENTS ====

	}, {
		key: 'onWorldClick',
		value: function onWorldClick(click) {
			var clickPos = this.stage.globalToLocal(click.stageX, click.stageY),
			    gridPos = this.grid.getArrayPos(clickPos),
			    clickedTile = this.grid.tiles[gridPos.x][gridPos.y];

			if (clickedTile.isConvertable && _game2.default.dock.selectedTower != null && _game2.default.buyingTower(_game2.default.dock.selectedTower.price || 100)) {
				this.setTile(gridPos, _game2.default.dock.selectedTower.name);
				this.raiseEvent(World.Events.WORLD_CHANGE, this);

				if (_game2.default.keys[_game.keyNames.shift] != true) {
					_game2.default.dock.selectedTower = null;
				}
			}
		}

		// ==== GAME LOOPS ====

	}, {
		key: 'update',
		value: function update(time) {
			for (var i = this.grid.tiles.length - 1; i >= 0; i--) {
				for (var j = this.grid.tiles[i].length - 1; j >= 0; j--) {
					this.grid.tiles[i][j].update(time, _game2.default.unitManager.units);
				}
			}
		}
	}, {
		key: 'draw',
		value: function draw(stage, time) {}
	}, {
		key: 'tileSize',
		get: function get() {
			return this.settings.tileSize;
		}

		/**
   * Vector size of half the tile size
   * @return {Vector} 
   */

	}, {
		key: 'halfTile',
		get: function get() {
			return new _victor2.default(this.tileSize / 2, this.tileSize / 2);
		}
	}, {
		key: 'obstacles',
		get: function get() {
			var _this2 = this;

			var arr = [];

			this.mapIterator(function (x, y, tileType) {
				if (tileType.wall) arr.push(new _rectangleObstacle2.default(_this2.grid.tiles[x][y].rect));
			});

			return arr;
		}
	}], [{
		key: 'Events',
		get: function get() {
			return (0, _keyMirror2.default)({
				WORLD_CHANGE: null,
				PLACED_TOWER: null
			});
		}
	}]);

	return World;
}(createjs.EventDispatcher);

exports.default = World;

},{"./assets":9,"./game":11,"./grid":12,"./helpers/aStar":13,"./helpers/arrayHelper":14,"./obstacles/rectangleObstacle":19,"./tiles/dynamicTile":21,"keyMirror":1,"victor":2}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5TWlycm9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3ZpY3Rvci9pbmRleC5qcyIsInNyY1xcYW5pbWF0aW9uc1xcYW5pbWF0aW9uTWFuYWdlci5qcyIsInNyY1xcYW5pbWF0aW9uc1xcYm9sdFNlZ21lbnQuanMiLCJzcmNcXGFuaW1hdGlvbnNcXGR5bmFtaWNBbmltYXRpb24uanMiLCJzcmNcXGFuaW1hdGlvbnNcXGxpZ2h0bmluZ0JvbHRBbmltYXRpb24uanMiLCJzcmNcXGFuaW1hdGlvbnNcXHNob3RBbmltYXRpb24uanMiLCJzcmNcXGFwcC5qcyIsInNyY1xcYXNzZXRzLmpzIiwic3JjXFxkb2NrLmpzIiwic3JjXFxnYW1lLmpzIiwic3JjXFxncmlkLmpzIiwic3JjXFxoZWxwZXJzXFxhU3Rhci5qcyIsInNyY1xcaGVscGVyc1xcYXJyYXlIZWxwZXIuanMiLCJzcmNcXGhlbHBlcnNcXG1hdGhIZWxwZXIuanMiLCJzcmNcXGhlbHBlcnNcXHJhbmRvbS5qcyIsInNyY1xcaGVscGVyc1xcc3RlZXJpbmcuanMiLCJzcmNcXG9ic3RhY2xlc1xcb2JzdGFjbGUuanMiLCJzcmNcXG9ic3RhY2xlc1xccmVjdGFuZ2xlT2JzdGFjbGUuanMiLCJzcmNcXHRpbGVzXFxiYXNlVGlsZS5qcyIsInNyY1xcdGlsZXNcXGR5bmFtaWNUaWxlLmpzIiwic3JjXFx0aWxlc1xcZ2VuZXJpY1RpbGUuanMiLCJzcmNcXHRpbGVzXFx0b3dlclRpbGUuanMiLCJzcmNcXHVuaXRNYW5hZ2VyLmpzIiwic3JjXFx1bml0c1xcYmFzZVVuaXQuanMiLCJzcmNcXHVuaXRzXFxjcmVlcC5qcyIsInNyY1xcdW5pdHNcXGR5bmFtaWNVbml0LmpzIiwic3JjXFx3b3JsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LEksRUFBSyxDQUNoQjs7O3NCQTFJYTtBQUFFLFVBQU8sS0FBSyxRQUFMLENBQWMsUUFBckI7QUFBZ0M7Ozs7Ozs7OztzQkFNbEM7QUFBRSxVQUFPLHFCQUFXLEtBQUssUUFBTCxHQUFnQixDQUEzQixFQUE4QixLQUFLLFFBQUwsR0FBZ0IsQ0FBOUMsQ0FBUDtBQUEwRDs7O3NCQUUzRDtBQUFBOztBQUNkLE9BQUksTUFBTSxFQUFWOztBQUVBLFFBQUssV0FBTCxDQUFpQixVQUFDLENBQUQsRUFBSSxDQUFKLEVBQU8sUUFBUCxFQUFvQjtBQUNwQyxRQUFHLFNBQVMsSUFBWixFQUNDLElBQUksSUFBSixDQUFTLGdDQUFzQixPQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLEVBQW1CLENBQW5CLEVBQXNCLElBQTVDLENBQVQ7QUFDRCxJQUhEOztBQUtBLFVBQU8sR0FBUDtBQUNBOzs7c0JBeEJtQjtBQUNuQixVQUFPLHlCQUFVO0FBQ2hCLGtCQUFjLElBREU7QUFFaEIsa0JBQWM7QUFGRSxJQUFWLENBQVA7QUFJQTs7OztFQTFCaUMsU0FBUyxlOztrQkFBdkIsSyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLTIwMTQgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29uc3RydWN0cyBhbiBlbnVtZXJhdGlvbiB3aXRoIGtleXMgZXF1YWwgdG8gdGhlaXIgdmFsdWUuXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogICB2YXIgQ09MT1JTID0ga2V5TWlycm9yKHtibHVlOiBudWxsLCByZWQ6IG51bGx9KTtcbiAqICAgdmFyIG15Q29sb3IgPSBDT0xPUlMuYmx1ZTtcbiAqICAgdmFyIGlzQ29sb3JWYWxpZCA9ICEhQ09MT1JTW215Q29sb3JdO1xuICpcbiAqIFRoZSBsYXN0IGxpbmUgY291bGQgbm90IGJlIHBlcmZvcm1lZCBpZiB0aGUgdmFsdWVzIG9mIHRoZSBnZW5lcmF0ZWQgZW51bSB3ZXJlXG4gKiBub3QgZXF1YWwgdG8gdGhlaXIga2V5cy5cbiAqXG4gKiAgIElucHV0OiAge2tleTE6IHZhbDEsIGtleTI6IHZhbDJ9XG4gKiAgIE91dHB1dDoge2tleTE6IGtleTEsIGtleTI6IGtleTJ9XG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9ialxuICogQHJldHVybiB7b2JqZWN0fVxuICovXG52YXIga2V5TWlycm9yID0gZnVuY3Rpb24ob2JqKSB7XG4gIHZhciByZXQgPSB7fTtcbiAgdmFyIGtleTtcbiAgaWYgKCEob2JqIGluc3RhbmNlb2YgT2JqZWN0ICYmICFBcnJheS5pc0FycmF5KG9iaikpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdrZXlNaXJyb3IoLi4uKTogQXJndW1lbnQgbXVzdCBiZSBhbiBvYmplY3QuJyk7XG4gIH1cbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHJldFtrZXldID0ga2V5O1xuICB9XG4gIHJldHVybiByZXQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGtleU1pcnJvcjtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IFZpY3RvcjtcblxuLyoqXG4gKiAjIFZpY3RvciAtIEEgSmF2YVNjcmlwdCAyRCB2ZWN0b3IgY2xhc3Mgd2l0aCBtZXRob2RzIGZvciBjb21tb24gdmVjdG9yIG9wZXJhdGlvbnNcbiAqL1xuXG4vKipcbiAqIENvbnN0cnVjdG9yLiBXaWxsIGFsc28gd29yayB3aXRob3V0IHRoZSBgbmV3YCBrZXl3b3JkXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IFZpY3Rvcig0MiwgMTMzNyk7XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHggVmFsdWUgb2YgdGhlIHggYXhpc1xuICogQHBhcmFtIHtOdW1iZXJ9IHkgVmFsdWUgb2YgdGhlIHkgYXhpc1xuICogQHJldHVybiB7VmljdG9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVmljdG9yICh4LCB5KSB7XG5cdGlmICghKHRoaXMgaW5zdGFuY2VvZiBWaWN0b3IpKSB7XG5cdFx0cmV0dXJuIG5ldyBWaWN0b3IoeCwgeSk7XG5cdH1cblxuXHQvKipcblx0ICogVGhlIFggYXhpc1xuXHQgKlxuXHQgKiAjIyMgRXhhbXBsZXM6XG5cdCAqICAgICB2YXIgdmVjID0gbmV3IFZpY3Rvci5mcm9tQXJyYXkoNDIsIDIxKTtcblx0ICpcblx0ICogICAgIHZlYy54O1xuXHQgKiAgICAgLy8gPT4gNDJcblx0ICpcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cdHRoaXMueCA9IHggfHwgMDtcblxuXHQvKipcblx0ICogVGhlIFkgYXhpc1xuXHQgKlxuXHQgKiAjIyMgRXhhbXBsZXM6XG5cdCAqICAgICB2YXIgdmVjID0gbmV3IFZpY3Rvci5mcm9tQXJyYXkoNDIsIDIxKTtcblx0ICpcblx0ICogICAgIHZlYy55O1xuXHQgKiAgICAgLy8gPT4gMjFcblx0ICpcblx0ICogQGFwaSBwdWJsaWNcblx0ICovXG5cdHRoaXMueSA9IHkgfHwgMDtcbn07XG5cbi8qKlxuICogIyBTdGF0aWNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBhcnJheVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gVmljdG9yLmZyb21BcnJheShbNDIsIDIxXSk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NDIsIHk6MjFcbiAqXG4gKiBAbmFtZSBWaWN0b3IuZnJvbUFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBBcnJheSB3aXRoIHRoZSB4IGFuZCB5IHZhbHVlcyBhdCBpbmRleCAwIGFuZCAxIHJlc3BlY3RpdmVseVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbUFycmF5ID0gZnVuY3Rpb24gKGFycikge1xuXHRyZXR1cm4gbmV3IFZpY3RvcihhcnJbMF0gfHwgMCwgYXJyWzFdIHx8IDApO1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGluc3RhbmNlIGZyb20gYW4gb2JqZWN0XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbU9iamVjdCh7IHg6IDQyLCB5OiAyMSB9KTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB3aXRoIHRoZSB2YWx1ZXMgZm9yIHggYW5kIHlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gVGhlIG5ldyBpbnN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLmZyb21PYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKG9iai54IHx8IDAsIG9iai55IHx8IDApO1xufTtcblxuLyoqXG4gKiAjIE1hbmlwdWxhdGlvblxuICpcbiAqIFRoZXNlIGZ1bmN0aW9ucyBhcmUgY2hhaW5hYmxlLlxuICovXG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvcidzIFggYXhpcyB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGRYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjMwLCB5OjEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIGFkZCB0byB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggKz0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWSBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSArPSB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjMwLCB5OjQwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIGFkZCB0byB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gc2NhbGFyIHRvIGJvdGggdmVjdG9yIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMSwgMik7XG4gKlxuICogICAgIHZlYy5hZGRTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogNFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKz0gc2NhbGFyO1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgZ2l2ZW4gc2NhbGFyIHRvIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMSwgMik7XG4gKlxuICogICAgIHZlYy5hZGRTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDMsIHk6IDJcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gYWRkXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFNjYWxhclggPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMSwgeTogNFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy55ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgWCBheGlzIG9mIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLnN1YnRyYWN0WCh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo4MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0WCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBZIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RZKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBzdWJ0cmFjdCBmcm9tIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0WSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55IC09IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIGFub3RoZXIgdmVjdG9yIGZyb20gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLnN1YnRyYWN0KHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3QgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCAtPSB2ZWMueDtcblx0dGhpcy55IC09IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSBib3RoIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMuc3VidHJhY3RTY2FsYXIoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAtPSBzY2FsYXI7XG5cdHRoaXMueSAtPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMuc3VidHJhY3RTY2FsYXJYKDIwKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiA4MCwgeTogMjAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0U2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclkoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDEwMCwgeTogMTgwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIHN1YnRyYWN0XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnN1YnRyYWN0U2NhbGFyWSA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFggYXhpcyBieSB0aGUgeCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo1MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlWCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSB5IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDAsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWSh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyNVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlWSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy55IC89IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyBib3RoIHZlY3RvciBheGlzIGJ5IGEgYXhpcyB2YWx1ZXMgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAyKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZSh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGUgPSBmdW5jdGlvbiAodmVjdG9yKSB7XG5cdHRoaXMueCAvPSB2ZWN0b3IueDtcblx0dGhpcy55IC89IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyBib3RoIHZlY3RvciBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo1MCwgeToyNVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnggLz0gc2NhbGFyO1xuXHRcdHRoaXMueSAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0XHR0aGlzLnkgPSAwO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFggYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlU2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclggPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnggLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueCA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERpdmlkZXMgdGhlIFkgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToyNVxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHRpZiAoc2NhbGFyICE9PSAwKSB7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnkgPSAwO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIHRoZSBYIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5pbnZlcnRYKCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5OjUwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pbnZlcnRYID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggKj0gLTE7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIHRoZSBZIGF4aXNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5pbnZlcnRZKCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6LTUwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pbnZlcnRZID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnkgKj0gLTE7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBJbnZlcnRzIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6LTEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5pbnZlcnRYKCk7XG5cdHRoaXMuaW52ZXJ0WSgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWCBheGlzIGJ5IFggY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMiwgMCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVggPSBmdW5jdGlvbiAodmVjdG9yKSB7XG5cdHRoaXMueCAqPSB2ZWN0b3IueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdGhlIFkgYXhpcyBieSBZIGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDAsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlYKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy55ICo9IHZlY3Rvci55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyBib3RoIHZlY3RvciBheGlzIGJ5IHZhbHVlcyBmcm9tIGEgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAyKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5KHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5U2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICo9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgdGhlIFkgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTm9ybWFsaXplXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5ub3JtYWxpemUgPSBmdW5jdGlvbiAoKSB7XG5cdHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCgpO1xuXG5cdGlmIChsZW5ndGggPT09IDApIHtcblx0XHR0aGlzLnggPSAxO1xuXHRcdHRoaXMueSA9IDA7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5kaXZpZGUoVmljdG9yKGxlbmd0aCwgbGVuZ3RoKSk7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm5vcm0gPSBWaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZTtcblxuLyoqXG4gKiBJZiB0aGUgYWJzb2x1dGUgdmVjdG9yIGF4aXMgaXMgZ3JlYXRlciB0aGFuIGBtYXhgLCBtdWx0aXBsaWVzIHRoZSBheGlzIGJ5IGBmYWN0b3JgXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGltaXQoODAsIDAuOSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo5MCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXggVGhlIG1heGltdW0gdmFsdWUgZm9yIGJvdGggeCBhbmQgeSBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0gZmFjdG9yIEZhY3RvciBieSB3aGljaCB0aGUgYXhpcyBhcmUgdG8gYmUgbXVsdGlwbGllZCB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmxpbWl0ID0gZnVuY3Rpb24gKG1heCwgZmFjdG9yKSB7XG5cdGlmIChNYXRoLmFicyh0aGlzLngpID4gbWF4KXsgdGhpcy54ICo9IGZhY3RvcjsgfVxuXHRpZiAoTWF0aC5hYnModGhpcy55KSA+IG1heCl7IHRoaXMueSAqPSBmYWN0b3I7IH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJhbmRvbWl6ZXMgYm90aCB2ZWN0b3IgYXhpcyB3aXRoIGEgdmFsdWUgYmV0d2VlbiAyIHZlY3RvcnNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5yYW5kb21pemUobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjY3LCB5OjczXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHRvcExlZnQgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gYm90dG9tUmlnaHQgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5yYW5kb21pemUgPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0dGhpcy5yYW5kb21pemVZKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVgobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjU1LCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHRvcExlZnQgZmlyc3QgdmVjdG9yXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gYm90dG9tUmlnaHQgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5yYW5kb21pemVYID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdHZhciBtaW4gPSBNYXRoLm1pbih0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR2YXIgbWF4ID0gTWF0aC5tYXgodG9wTGVmdC54LCBib3R0b21SaWdodC54KTtcblx0dGhpcy54ID0gcmFuZG9tKG1pbiwgbWF4KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJhbmRvbWl6ZXMgdGhlIHkgYXhpcyB3aXRoIGEgdmFsdWUgYmV0d2VlbiAyIHZlY3RvcnNcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5yYW5kb21pemVZKG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODBgKSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NjZcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVkgPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LnksIGJvdHRvbVJpZ2h0LnkpO1xuXHR0aGlzLnkgPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9tbHkgcmFuZG9taXplcyBlaXRoZXIgYXhpcyBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZUFueShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwKSk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NzdcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZUFueSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHRpZiAoISEgTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKSkge1xuXHRcdHRoaXMucmFuZG9taXplWCh0b3BMZWZ0LCBib3R0b21SaWdodCk7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy5yYW5kb21pemVZKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUm91bmRzIGJvdGggYXhpcyB0byBhbiBpbnRlZ2VyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMC4yLCA1MC45KTtcbiAqXG4gKiAgICAgdmVjLnVuZmxvYXQoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo1MVxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudW5mbG9hdCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gTWF0aC5yb3VuZCh0aGlzLngpO1xuXHR0aGlzLnkgPSBNYXRoLnJvdW5kKHRoaXMueSk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGEgY2VydGFpbiBwcmVjaXNpb25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFByZWNpc2lvbiAoZGVmYXVsdDogOClcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9GaXhlZCA9IGZ1bmN0aW9uIChwcmVjaXNpb24pIHtcblx0aWYgKHR5cGVvZiBwcmVjaXNpb24gPT09ICd1bmRlZmluZWQnKSB7IHByZWNpc2lvbiA9IDg7IH1cblx0dGhpcy54ID0gdGhpcy54LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0dGhpcy55ID0gdGhpcy55LnRvRml4ZWQocHJlY2lzaW9uKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiBvZiB0aGUgWCBheGlzIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peFgodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjE1MCwgeToxMDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4WCA9IGZ1bmN0aW9uICh2ZWMsIGFtb3VudCkge1xuXHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhbW91bnQgPSAwLjU7XG5cdH1cblxuXHR0aGlzLnggPSAoMSAtIGFtb3VudCkgKiB0aGlzLnggKyBhbW91bnQgKiB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiBvZiB0aGUgWSBheGlzIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peFkodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeToxNTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4WSA9IGZ1bmN0aW9uICh2ZWMsIGFtb3VudCkge1xuXHRpZiAodHlwZW9mIGFtb3VudCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRhbW91bnQgPSAwLjU7XG5cdH1cblxuXHR0aGlzLnkgPSAoMSAtIGFtb3VudCkgKiB0aGlzLnkgKyBhbW91bnQgKiB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFBlcmZvcm1zIGEgbGluZWFyIGJsZW5kIC8gaW50ZXJwb2xhdGlvbiB0b3dhcmRzIGFub3RoZXIgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjMS5taXgodmVjMiwgMC41KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjE1MCwgeToxNTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3JcbiAqIEBwYXJhbSB7TnVtYmVyfSBhbW91bnQgVGhlIGJsZW5kIGFtb3VudCAob3B0aW9uYWwsIGRlZmF1bHQ6IDAuNSlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubWl4ID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdHRoaXMubWl4WCh2ZWMsIGFtb3VudCk7XG5cdHRoaXMubWl4WSh2ZWMsIGFtb3VudCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiAjIFByb2R1Y3RzXG4gKi9cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhpcyB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNsb25lKCk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwLCB5OjEwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBBIGNsb25lIG9mIHRoZSB2ZWN0b3JcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKHRoaXMueCwgdGhpcy55KTtcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBjb21wb25lbnQgaW4gdG8gaXRzIG93blxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDIwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY29weVgodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjEwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5WCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ID0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBZIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WSh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgPSB2ZWMueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFggYW5kIFkgY29tcG9uZW50cyBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5KHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy5jb3B5WCh2ZWMpO1xuXHR0aGlzLmNvcHlZKHZlYyk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSB2ZWN0b3IgdG8gemVybyAoMCwwKVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqXHRcdCB2YXIxLnplcm8oKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDowLCB5OjBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnplcm8gPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCA9IHRoaXMueSA9IDA7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkb3QgcHJvZHVjdCBvZiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRvdCh2ZWMyKTtcbiAqICAgICAvLyA9PiAyMzAwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRG90IHByb2R1Y3RcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKHZlYzIpIHtcblx0cmV0dXJuIHRoaXMueCAqIHZlYzIueCArIHRoaXMueSAqIHZlYzIueTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUuY3Jvc3MgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gKHRoaXMueCAqIHZlYzIueSApIC0gKHRoaXMueSAqIHZlYzIueCApO1xufTtcblxuLyoqXG4gKiBQcm9qZWN0cyBhIHZlY3RvciBvbnRvIGFub3RoZXIgdmVjdG9yLCBzZXR0aW5nIGl0c2VsZiB0byB0aGUgcmVzdWx0LlxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigxMDAsIDEwMCk7XG4gKlxuICogICAgIHZlYy5wcm9qZWN0T250byh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHRvIHByb2plY3QgdGhpcyB2ZWN0b3Igb250b1xuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5wcm9qZWN0T250byA9IGZ1bmN0aW9uICh2ZWMyKSB7XG4gICAgdmFyIGNvZWZmID0gKCAodGhpcy54ICogdmVjMi54KSsodGhpcy55ICogdmVjMi55KSApIC8gKCh2ZWMyLngqdmVjMi54KSsodmVjMi55KnZlYzIueSkpO1xuICAgIHRoaXMueCA9IGNvZWZmICogdmVjMi54O1xuICAgIHRoaXMueSA9IGNvZWZmICogdmVjMi55O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy55LCB0aGlzLngpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLmhvcml6b250YWxBbmdsZSgpKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUudmVydGljYWxBbmdsZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIE1hdGguYXRhbjIodGhpcy54LCB0aGlzLnkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlRGVnID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gcmFkaWFuMmRlZ3JlZXModGhpcy52ZXJ0aWNhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5hbmdsZSA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuVmljdG9yLnByb3RvdHlwZS5hbmdsZURlZyA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlRGVnO1xuVmljdG9yLnByb3RvdHlwZS5kaXJlY3Rpb24gPSBWaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGUgPSBmdW5jdGlvbiAoYW5nbGUpIHtcblx0dmFyIG54ID0gKHRoaXMueCAqIE1hdGguY29zKGFuZ2xlKSkgLSAodGhpcy55ICogTWF0aC5zaW4oYW5nbGUpKTtcblx0dmFyIG55ID0gKHRoaXMueCAqIE1hdGguc2luKGFuZ2xlKSkgKyAodGhpcy55ICogTWF0aC5jb3MoYW5nbGUpKTtcblxuXHR0aGlzLnggPSBueDtcblx0dGhpcy55ID0gbnk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZURlZyA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHRhbmdsZSA9IGRlZ3JlZXMycmFkaWFuKGFuZ2xlKTtcblx0cmV0dXJuIHRoaXMucm90YXRlKGFuZ2xlKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlVG8gPSBmdW5jdGlvbihyb3RhdGlvbikge1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUocm90YXRpb24tdGhpcy5hbmdsZSgpKTtcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlVG9EZWcgPSBmdW5jdGlvbihyb3RhdGlvbikge1xuXHRyb3RhdGlvbiA9IGRlZ3JlZXMycmFkaWFuKHJvdGF0aW9uKTtcblx0cmV0dXJuIHRoaXMucm90YXRlVG8ocm90YXRpb24pO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVCeSA9IGZ1bmN0aW9uIChyb3RhdGlvbikge1xuXHR2YXIgYW5nbGUgPSB0aGlzLmFuZ2xlKCkgKyByb3RhdGlvbjtcblxuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVCeURlZyA9IGZ1bmN0aW9uIChyb3RhdGlvbikge1xuXHRyb3RhdGlvbiA9IGRlZ3JlZXMycmFkaWFuKHJvdGF0aW9uKTtcblx0cmV0dXJuIHRoaXMucm90YXRlQnkocm90YXRpb24pO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBkaXN0YW5jZSBvZiB0aGUgWCBheGlzIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gLTEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VYID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy54IC0gdmVjLng7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWCgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuYWJzRGlzdGFuY2VYKHZlYzIpO1xuICogICAgIC8vID0+IDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gQWJzb2x1dGUgZGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWJzRGlzdGFuY2VYID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5hYnModGhpcy5kaXN0YW5jZVgodmVjKSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBZIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWSh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0cmV0dXJuIHRoaXMueSAtIHZlYy55O1xufTtcblxuLyoqXG4gKiBTYW1lIGFzIGBkaXN0YW5jZVkoKWAgYnV0IGFsd2F5cyByZXR1cm5zIGFuIGFic29sdXRlIG51bWJlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gQWJzb2x1dGUgZGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWJzRGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5hYnModGhpcy5kaXN0YW5jZVkodmVjKSk7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2UodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwLjQ5ODc1NjIxMTIwODlcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMuZGlzdGFuY2VTcSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgc3F1YXJlZCBldWNsaWRlYW4gZGlzdGFuY2UgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlU3EodmVjMik7XG4gKiAgICAgLy8gPT4gMTAxMDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IERpc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpc3RhbmNlU3EgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHZhciBkeCA9IHRoaXMuZGlzdGFuY2VYKHZlYyksXG5cdFx0ZHkgPSB0aGlzLmRpc3RhbmNlWSh2ZWMpO1xuXG5cdHJldHVybiBkeCAqIGR4ICsgZHkgKiBkeTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgbGVuZ3RoIG9yIG1hZ25pdHVkZSBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGVuZ3RoKCk7XG4gKiAgICAgLy8gPT4gMTExLjgwMzM5ODg3NDk4OTQ4XG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuZ3RoU3EoKSk7XG59O1xuXG4vKipcbiAqIFNxdWFyZWQgbGVuZ3RoIC8gbWFnbml0dWRlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubGVuZ3RoU3EoKTtcbiAqICAgICAvLyA9PiAxMjUwMFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gTGVuZ3RoIC8gTWFnbml0dWRlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmxlbmd0aFNxID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gdGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5tYWduaXR1ZGUgPSBWaWN0b3IucHJvdG90eXBlLmxlbmd0aDtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdHJ1ZSBpZiB2ZWN0b3IgaXMgKDAsIDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYy56ZXJvKCk7XG4gKlxuICogICAgIC8vID0+IHRydWVcbiAqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5pc1plcm8gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMueCA9PT0gMCAmJiB0aGlzLnkgPT09IDA7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHRoaXMgdmVjdG9yIGlzIHRoZSBzYW1lIGFzIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2ZWMxLmlzRXF1YWxUbyh2ZWMyKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzRXF1YWxUbyA9IGZ1bmN0aW9uKHZlYzIpIHtcblx0cmV0dXJuIHRoaXMueCA9PT0gdmVjMi54ICYmIHRoaXMueSA9PT0gdmVjMi55O1xufTtcblxuLyoqXG4gKiAjIFV0aWxpdHkgTWV0aG9kc1xuICovXG5cbi8qKlxuICogUmV0dXJucyBhbiBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwLCB5OjIwXG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuICd4OicgKyB0aGlzLnggKyAnLCB5OicgKyB0aGlzLnk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9BcnJheSgpO1xuICogICAgIC8vID0+IFsxMCwgMjBdXG4gKlxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBbIHRoaXMueCwgdGhpcy55IF07XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAsIDIwKTtcbiAqXG4gKiAgICAgdmVjLnRvT2JqZWN0KCk7XG4gKiAgICAgLy8gPT4geyB4OiAxMCwgeTogMjAgfVxuICpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9PYmplY3QgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB7IHg6IHRoaXMueCwgeTogdGhpcy55IH07XG59O1xuXG5cbnZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZnVuY3Rpb24gcmFuZG9tIChtaW4sIG1heCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkgKyBtaW4pO1xufVxuXG5mdW5jdGlvbiByYWRpYW4yZGVncmVlcyAocmFkKSB7XG5cdHJldHVybiByYWQgKiBkZWdyZWVzO1xufVxuXG5mdW5jdGlvbiBkZWdyZWVzMnJhZGlhbiAoZGVnKSB7XG5cdHJldHVybiBkZWcgLyBkZWdyZWVzO1xufVxuIiwiXHJcbmNvbnN0IEFuaW1hdGlvbk1hbmFnZXIgPSB7XHJcblx0YW5pbWF0aW9uczogW10sXHJcblxyXG5cdGFkZChhbmltYXRpb24pe1xyXG5cdFx0dGhpcy5hbmltYXRpb25zLnB1c2goYW5pbWF0aW9uKTtcclxuXHR9LFxyXG5cclxuXHR1cGRhdGUodGltZSl7XHJcblx0XHRmb3IgKHZhciBpID0gdGhpcy5hbmltYXRpb25zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGlmKHRoaXMuYW5pbWF0aW9uc1tpXS5kb25lKXtcclxuXHRcdFx0XHR0aGlzLmFuaW1hdGlvbnNbaV0uZGVzdHJveSgpO1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9ucy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLmFuaW1hdGlvbnNbaV0udXBkYXRlKHRpbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFuaW1hdGlvbk1hbmFnZXI7IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvbHRTZWdtZW50IHtcclxuXHRjb25zdHJ1Y3RvcihkcmF3Q29udGFpbmVyLCBhLCBiLCB0aGlja25lc3MsIGNvbG9yLCBzdGFydFRpbWUsIGxpZmVTcGFuKXtcdFx0XHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIgPSBkcmF3Q29udGFpbmVyO1xyXG5cdFx0dGhpcy5zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xyXG5cdFx0dGhpcy5hID0gYTtcclxuXHRcdHRoaXMuYiA9IGI7XHJcblx0XHR0aGlzLnRoaWNrbmVzcyA9IHRoaWNrbmVzcztcclxuXHRcdHRoaXMubGlmZVNwYW4gPSBsaWZlU3BhbjtcclxuXHRcdHRoaXMubGlmZVRpbWUgPSBsaWZlU3BhbjtcclxuXHRcdHRoaXMuc3RhcnRUaW1lID0gc3RhcnRUaW1lO1xyXG5cdFx0dGhpcy5jb2xvciA9IGNvbG9yO1xyXG5cdFx0dGhpcy5hbGl2ZSA9IHRydWU7XHJcblxyXG5cdFx0dGhpcy5zZXR1cEdyYXBoaWNzKCk7XHJcblx0fVxyXG5cclxuXHRzZXR1cEdyYXBoaWNzKCkge1xyXG5cdFx0dGhpcy5zaGFwZS5ncmFwaGljcy5zZXRTdHJva2VTdHlsZSh0aGlzLnRoaWNrbmVzcykuYmVnaW5TdHJva2UodGhpcy5jb2xvcik7XHJcblx0XHR0aGlzLnNoYXBlLmdyYXBoaWNzLm1vdmVUbyh0aGlzLmEueCwgdGhpcy5hLnkpO1xyXG5cdFx0dGhpcy5zaGFwZS5ncmFwaGljcy5saW5lVG8odGhpcy5iLngsIHRoaXMuYi55KTtcclxuXHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIuYWRkQ2hpbGQodGhpcy5zaGFwZSk7XHJcblx0fVxyXG5cclxuXHRkZXN0cm95KCl7XHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5zaGFwZSk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUodGltZSl7XHJcblx0XHRpZighdGhpcy5hbGl2ZSlcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdHRoaXMuc3RhcnRUaW1lIC09IHRpbWUuZGVsdGE7XHJcblx0XHRpZih0aGlzLnN0YXJ0VGltZSA8IDEpe1xyXG5cdFx0XHR0aGlzLmxpZmVUaW1lIC09IHRpbWUuZGVsdGE7XHJcblx0XHRcdGlmKHRoaXMubGlmZVRpbWUgPCAxKXtcclxuXHRcdFx0XHR0aGlzLmFsaXZlID0gZmFsc2U7XHJcblx0XHRcdH1cdFxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuZHJhdyh0aW1lKTtcclxuXHR9XHJcblxyXG5cdGRyYXcodGltZSkge1xyXG5cdFx0aWYoIXRoaXMuYWxpdmUgfHwgdGhpcy5zdGFydFRpbWUgPiAwKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0dGhpcy5zaGFwZS5hbHBoYSA9IHRoaXMubGlmZVRpbWUgLyB0aGlzLmxpZmVTcGFuO1xyXG5cclxuXHRcdC8vdGhpcy5ncmFwaGljcy5lbmRTdHJva2UoKTtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IFNob3RBbmltYXRpb24gZnJvbSAnLi9zaG90QW5pbWF0aW9uJztcclxuaW1wb3J0IExpZ2h0bmluZ0JvbHRBbmltYXRpb24gZnJvbSAnLi9saWdodG5pbmdCb2x0QW5pbWF0aW9uJztcclxuXHJcbmNvbnN0IGFuaW1hdGlvbkNsYXNzZXMgPSB7XHJcblx0U2hvdEFuaW1hdGlvbixcclxuXHRMaWdodG5pbmdCb2x0QW5pbWF0aW9uXHJcbn07XHJcblxyXG4vKipcclxuICogV3JhcHBlciBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgdGlsZSB0eXBlc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY0FuaW1hdGlvbiB7XHJcblx0Y29uc3RydWN0b3IoY2xhc3NOYW1lLCAuLi5hcmdzKXtcclxuXHRcdHJldHVybiBuZXcgYW5pbWF0aW9uQ2xhc3Nlc1tjbGFzc05hbWVdKC4uLmFyZ3MpO1xyXG5cdH1cclxufSIsIlxyXG5pbXBvcnQgVmVjdG9yIGZyb20gJ3ZpY3Rvcic7XHJcbmltcG9ydCBSYW5kb20gZnJvbSAnLi4vaGVscGVycy9yYW5kb20nO1xyXG5pbXBvcnQgQm9sdFNlZ21lbnQgZnJvbSAnLi9ib2x0U2VnbWVudCc7XHJcblxyXG5jb25zdCBCb2x0TGlmZVNwYW4gPSA1MDsgLy8gSG93IGxvbmcgdGhlIGJvbHQgd2lsbCBiZSB2aXNpYmxlXHJcblxyXG4vLyBTaW5nbGUgbGlnaHRuaW5nIGJvbHQgZWZmZWN0XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExpZ2h0bmluZ0JvbHRBbmltYXRpb24ge1xyXG5cdGNvbnN0cnVjdG9yKGRyYXdDb250YWluZXIsIHBvc2l0aW9uLCB0YXJnZXQpe1xyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyID0gZHJhd0NvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2VnbWVudHMgPSB0aGlzLmNyZWF0ZShwb3NpdGlvbiwgdGFyZ2V0LnBvc2l0aW9uLmNsb25lKCksIDIpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGRvbmUoKXtcclxuXHRcdHJldHVybiB0aGlzLnNlZ21lbnRzLmxlbmd0aCA8IDE7XHJcblx0fVxyXG5cclxuXHRkZXN0cm95KCl7XHJcblx0XHRmb3IgKHZhciBpID0gdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHR0aGlzLnNlZ21lbnRzW2ldLmRlc3Ryb3koKTtcclxuXHRcdFx0dGhpcy5zZWdtZW50cy5zcGxpY2UoaSwgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGUodGltZSl7XHJcblx0XHRmb3IgKHZhciBpID0gdGhpcy5zZWdtZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHR0aGlzLnNlZ21lbnRzW2ldLnVwZGF0ZSh0aW1lKTtcclxuXHJcblx0XHRcdGlmKCF0aGlzLnNlZ21lbnRzW2ldLmFsaXZlKXtcclxuXHRcdFx0XHR0aGlzLnNlZ21lbnRzW2ldLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR0aGlzLnNlZ21lbnRzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0fVxyXG5cdFx0fTtcclxuXHJcblx0XHQvL3RoaXMuc2hhcGUuZ3JhcGhpY3MuZW5kU3Ryb2tlKCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIGdlbmVyYXRlIHJhbmRvbSBwb2ludHMgYWxvbmcgYSBsaW5lIDAuMCAtIDEuMC5cclxuXHQgKiBUaGUgcG9pbnRzIHdpbGwgZGlzcGxhY2VkIGZvciB0aGUgamFnZ2VkIGxvb2suXHJcblx0ICogQHBhcmFtICB7VmVjdG9yfSBzb3VyY2UgICAgXHRcdFN0YXJ0IHBvc2l0aW9uXHJcblx0ICogQHBhcmFtICB7VmVjdG9yfSBkZXN0ICAgICAgXHRcdEVuZCBwb3NpdGlvblxyXG5cdCAqIEBwYXJhbSAge2ludH0gdGhpY2tuZXNzIFx0ICBcdFx0VGhpY2tuZXNzIG9mIHRoZSBzZWdtZW50cy9saW5lc1xyXG5cdCAqIEByZXR1cm4ge0FycmF5W0JvbHRTZWdtZW50c119XHJcblx0ICovXHJcblx0Y3JlYXRlKHNvdXJjZSwgZGVzdCwgdGhpY2tuZXNzKSB7XHJcblx0XHRsZXQgcmVzdWx0cyA9IFtdLFxyXG5cdFx0XHRwb3NpdGlvbnMgPSBbXSxcclxuXHRcdFx0dGFuZ2VudCA9IGRlc3QuY2xvbmUoKS5zdWJ0cmFjdChzb3VyY2UpLFxyXG5cdFx0XHRub3JtYWwgPSBuZXcgVmVjdG9yKHRhbmdlbnQueSwgLXRhbmdlbnQueCkubm9ybWFsaXplKCksXHJcblx0XHRcdGxlbmd0aCA9IHRhbmdlbnQubGVuZ3RoKCk7XHJcblxyXG5cdFx0cG9zaXRpb25zLnB1c2goMCk7XHJcblxyXG5cdFx0Ly8gVG8gbWFueSB3aWxsIG1ha2UgaXQgdG8gamFnZ2VkXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aCAvIDQ7IGkrKykge1xyXG5cdFx0XHRwb3NpdGlvbnMucHVzaChNYXRoLnJhbmRvbSgpKTtcclxuXHRcdH07XHJcblxyXG5cdFx0cG9zaXRpb25zLnNvcnQoKTtcclxuXHJcblx0XHRjb25zdCBzd2F5ID0gNDAwMDsgLy8gSG93IG11Y2ggdGhlIGJvbHQgd2lsbCBiZW5kLiBMb3dlciB2YWx1ZSA9IG1vcmUgc3RyYWlnaHRcclxuXHRcdGxldCBqYWdnZWRuZXNzID0gMSAvIHN3YXk7XHJcblxyXG5cdFx0bGV0IHByZXZQb2ludCA9IHNvdXJjZSxcclxuXHRcdFx0cHJldkRpc3BsYWNlbWVudCA9IDA7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBwb3NpdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHJcblx0XHRcdGxldCBwb3MgPSBwb3NpdGlvbnNbaV0sXHJcblx0XHRcdFx0c2NhbGUgPSAoKGxlbmd0aCAqIGphZ2dlZG5lc3MpICogKHBvcyAtIHBvc2l0aW9uc1tpIC0gMV0pKSxcclxuXHRcdFx0XHRlbnZlbG9wZSA9IChwb3MgPiAwLjk1ID8gMjAgKiAoMSAtIHBvcykgOiAxKSxcclxuXHRcdFx0XHRkaXNwbGFjZW1lbnQgPSBSYW5kb20ubmV4dCgtc3dheSwgc3dheSwgdHJ1ZSk7XHJcblxyXG5cdFx0XHRkaXNwbGFjZW1lbnQgLT0gKGRpc3BsYWNlbWVudCAtIHByZXZEaXNwbGFjZW1lbnQpICogKDEgLSBzY2FsZSk7XHJcblx0XHRcdGRpc3BsYWNlbWVudCAqPSBlbnZlbG9wZTtcclxuXHJcblx0XHRcdGxldCBwb2ludCA9IHNvdXJjZS5jbG9uZSgpLmFkZCh0YW5nZW50LmNsb25lKCkubXVsdGlwbHlTY2FsYXIocG9zKSkuYWRkKG5vcm1hbC5jbG9uZSgpLm11bHRpcGx5U2NhbGFyKGRpc3BsYWNlbWVudCkpO1xyXG5cdFx0XHRyZXN1bHRzLnB1c2gobmV3IEJvbHRTZWdtZW50KHRoaXMuZHJhd0NvbnRhaW5lciwgcHJldlBvaW50LCBwb2ludCwgdGhpY2tuZXNzLCBcIiNGREZDRkFcIiwgaSwgKEJvbHRMaWZlU3BhbiAqIHBvc2l0aW9ucy5sZW5ndGgpIC8gaSkpO1xyXG5cdFx0XHRwcmV2UG9pbnQgPSBwb2ludDtcclxuXHRcdFx0cHJldkRpc3BsYWNlbWVudCA9IGRpc3BsYWNlbWVudDtcclxuXHRcdH07XHJcblxyXG5cdFx0cmVzdWx0cy5wdXNoKG5ldyBCb2x0U2VnbWVudCh0aGlzLmRyYXdDb250YWluZXIsIHByZXZQb2ludCwgZGVzdCwgdGhpY2tuZXNzLCBcIiNGREZDRkFcIiwgKHBvc2l0aW9ucy5sZW5ndGggLSAxKSwgKEJvbHRMaWZlU3BhbiAqIHBvc2l0aW9ucy5sZW5ndGgpIC8gcG9zaXRpb25zLmxlbmd0aCAtIDEpKTtcclxuXHRcdHJldHVybiByZXN1bHRzO1xyXG5cdH1cclxufSIsIlxyXG5pbXBvcnQgU3RlZXJpbmcgZnJvbSAnLi4vaGVscGVycy9zdGVlcmluZyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaG90QW5pbWF0aW9uIHtcclxuXHRjb25zdHJ1Y3RvcihkcmF3Q29udGFpbmVyLCBwb3NpdGlvbiwgdGFyZ2V0KSB7XHJcblx0XHR0aGlzLnN0ZWVyaW5nID0gbmV3IFN0ZWVyaW5nKHRoaXMsIHttYXhWZWxvY2l0eTogNC42ICogMTAwMCwgbWFzczogMTV9KTtcclxuXHRcdHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuXHRcdHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyID0gZHJhd0NvbnRhaW5lcjtcclxuXHJcblx0XHR0aGlzLnNldHVwR3JhcGhpY3MoKTtcclxuXHR9XHJcblxyXG5cdHNldHVwR3JhcGhpY3MoKXtcclxuXHRcdHRoaXMuc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHRcdHRoaXMuc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiIzAwMFwiKS5kcmF3Q2lyY2xlKDAsIDAsIDUpO1xyXG5cclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRDaGlsZCh0aGlzLnNoYXBlKTtcclxuXHR9XHJcblxyXG5cdGdldCBkb25lKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5wb3NpdGlvbi5kaXN0YW5jZSh0aGlzLnRhcmdldC5wb3NpdGlvbikgPCB0aGlzLnRhcmdldC5yZWN0LndpZHRoO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveSgpe1xyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuc2hhcGUpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKHRpbWUpe1xyXG5cdFx0dGhpcy5zdGVlcmluZy5zZWVrKHRoaXMudGFyZ2V0LnBvc2l0aW9uKTtcclxuXHRcdHRoaXMuc3RlZXJpbmcudXBkYXRlKHRpbWUpO1xyXG5cclxuXHRcdHRoaXMuc2hhcGUueCA9IHRoaXMucG9zaXRpb24ueDtcclxuXHRcdHRoaXMuc2hhcGUueSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xyXG5pbXBvcnQgQXNzZXRzIGZyb20gJy4vYXNzZXRzJztcclxuXHJcbndpbmRvdy5jcmVhdGVqcy5Qb2ludCA9IFZlY3RvcjsgLy8gT3ZlcnJpZGUgQ3JlYXRlSnMgcG9pbnQgdG8gYmUgVmljdG9yIGxpYlxyXG5cclxuY2xhc3MgQXBwIHtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0dGhpcy5zdGFnZSA9IG5ldyBjcmVhdGVqcy5TdGFnZShcImNhbnZhc1wiKTtcclxuXHJcblx0XHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5mdWxsU2NyZWVuLmJpbmQodGhpcyksIGZhbHNlKTtcclxuXHRcdHdpbmRvdy5vbmtleWRvd24gPSAoZSA9PiBHYW1lLmtleXNbZS5rZXlDb2RlXSA9IHRydWUpO1xyXG5cdFx0d2luZG93Lm9ua2V5dXAgPSAoZSA9PiBHYW1lLmtleXNbZS5rZXlDb2RlXSA9IGZhbHNlKTtcclxuXHRcdFxyXG5cdFx0QXNzZXRzLm1pZGRsZXdhcmUgPSB0aGlzLmFzc2V0c01pZGRsZXdhcmUuYmluZCh0aGlzKTtcclxuXHRcdEFzc2V0cy5vbigncHJvZ3Jlc3MnLCAocHJvZ3Jlc3MpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2cocHJvZ3Jlc3MubG9hZGVkKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdEFzc2V0cy5vbignY29tcGxldGUnLCAoKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQXNzZXRzIGRvd25sb2FkIGNvbXBsZXRlZFwiKTtcclxuXHRcdFx0dGhpcy5zdGFydCgpOyAvLyBTdGFydCBnYW1lIHdoZW4gYXNzZXRzIGlzIGRvd25sb2FkZWRcclxuXHRcdH0pO1xyXG5cclxuXHRcdC8vIFN0YXJ0IGRvd25sb2FkaW5nIGFzc2V0c1xyXG5cdFx0QXNzZXRzLmxvYWRNYW5pZmVzdChcImRhdGEvbWFuaWZlc3QuanNvblwiKTtcclxuXHR9XHJcblx0XHJcblx0c3RhcnQoKXtcclxuXHRcdHRoaXMuZnVsbFNjcmVlbigpO1xyXG5cdFx0Y3JlYXRlanMuVGlja2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aWNrXCIsIHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuXHRcdGNyZWF0ZWpzLlRpY2tlci5mcmFtZXJhdGUgPSAzMDtcclxuXHJcblx0XHRHYW1lLnN0YXJ0KHRoaXMuc3RhZ2UpO1xyXG5cdH1cclxuXHJcblx0YXNzZXRzTWlkZGxld2FyZShzZXR0aW5nKXtcclxuXHRcdGxldCBjb2xvcnMgPSBBc3NldHMuZ2V0KCdjb2xvcicsIGZhbHNlKS5jb2xvcnM7XHJcblxyXG5cdFx0dmFyIHRlbXAgPSBKU09OLnN0cmluZ2lmeShzZXR0aW5nLCAoa2V5LCB2YWx1ZSkgPT4ge1xyXG5cclxuXHRcdFx0aWYoa2V5ID09PSBcIndhdmVzXCIgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcclxuXHRcdFx0XHQvLyBpZiB3YXZlcyBleGlzdCB3ZSBhc3N1bWUgc2V0dGluZyBpcyB1bml0cy5qc29uXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0T2JqZWN0LmFzc2lnbih2YWx1ZVtpXS5wcm9wcywge3dpZHRoOiBzZXR0aW5nLnVuaXRTaXplLCBoZWlnaHQ6IHNldHRpbmcudW5pdFNpemV9KTtcclxuXHRcdFx0XHR9O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihrZXkuaW5kZXhPZihcImNvbG9yXCIpICE9PSAtMSB8fCBrZXkuaW5kZXhPZihcIkNvbG9yXCIpICE9PSAtMSkge1xyXG5cdFx0XHRcdHJldHVybiBjb2xvcnNbdmFsdWVdIHx8IHZhbHVlO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHR9KTtcclxuXHJcblx0XHRyZXR1cm4gSlNPTi5wYXJzZSh0ZW1wKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIE1ha2UgY2FudmFzIGZ1bGxzY3JlZW5cclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGZ1bGxTY3JlZW4oKXtcclxuXHRcdHRoaXMuc3RhZ2UuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XHJcbiAgICAgICAgdGhpcy5zdGFnZS5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQXBwbGljYXRpb24gbG9vcFxyXG5cdCAqIEBwYXJhbSAge0NyZWF0ZUpTLlRpY2tlci5FdmVudHN9IHRpbWUgdGltZS5EZWx0YSA9PSBlbGFwc2VkIG1zXHJcblx0ICovXHJcblx0bG9vcCh0aW1lKXtcclxuXHRcdC8vIHRpbWUuZGVsdGEgPT0gZWxhcHNlZCBtc1xyXG5cdFx0R2FtZS51cGRhdGUodGltZSk7XHJcblx0XHRHYW1lLmRyYXcodGhpcy5zdGFnZSwgdGltZSk7XHJcblx0XHR0aGlzLnN0YWdlLnVwZGF0ZSgpO1xyXG5cdH1cclxufVxyXG5cclxubGV0IEVmZmVjdGl2ZUd1YWNhbW9sZVREID0gbmV3IEFwcCgpOyIsIlxyXG5sZXQgQ3JlYXRlSnMgPSB3aW5kb3cuY3JlYXRlanM7IC8vIE1ha2UgQ3JlYXRlSnMgbW9yZSBhY2Nlc3NpYmxlXHJcblxyXG4vKipcclxuICogV3JhcHBlciBmb3IgdGhlIENyZWF0ZUpzIFByZWxvYWQgZnVuY3Rpb25hbGxpdHlcclxuICovXHJcbmNsYXNzIEFzc2V0cyB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHRoaXMuX21pZGRsZXdhcmU7XHJcblx0XHR0aGlzLnF1ZXVlID0gbmV3IENyZWF0ZUpzLkxvYWRRdWV1ZSh0cnVlKTtcclxuXHRcdHRoaXMucXVldWUub24oXCJjb21wbGV0ZVwiLCB0aGlzLm9uQ29tcGxldGUuYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLndvcmtpbmcgPSBmYWxzZTtcclxuXHR9XHJcblxyXG5cdHNldCBtaWRkbGV3YXJlKGZ1bmMpIHtcclxuXHRcdHRoaXMuX21pZGRsZXdhcmUgPSBmdW5jOyBcclxuXHR9XHJcblxyXG5cdGxvYWRNYW5pZmVzdChwYXRoKXtcclxuXHRcdGlmKHRoaXMud29ya2luZylcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSB3b3JraW5nIG9uIGRvd25sb2FkaW5nXCIpO1xyXG5cclxuXHRcdHRoaXMud29ya2luZyA9IHRydWU7XHJcblx0XHR0aGlzLnF1ZXVlLmxvYWRNYW5pZmVzdChwYXRoKTtcclxuXHR9XHJcblxyXG5cdGdldChpZCwgcnVuTWlkZGxld2FyZSl7XHJcblx0XHRsZXQgcmVzdWx0ID0gdGhpcy5xdWV1ZS5nZXRSZXN1bHQoaWQpO1xyXG5cclxuXHRcdGlmKChydW5NaWRkbGV3YXJlID09IG51bGwgfHwgcnVuTWlkZGxld2FyZSA9PSB0cnVlKSAmJiB0aGlzLl9taWRkbGV3YXJlICYmIHJlc3VsdClcclxuXHRcdFx0cmV0dXJuIHRoaXMuX21pZGRsZXdhcmUocmVzdWx0KTtcclxuXHJcblx0XHRyZXR1cm4gcmVzdWx0O1xyXG5cdH1cclxuXHJcblx0b25Db21wbGV0ZSgpe1xyXG5cdFx0dGhpcy53b3JraW5nID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRvbihuYW1lLCBtZXRob2Qpe1xyXG5cdFx0dGhpcy5xdWV1ZS5vbihuYW1lLCBtZXRob2QpO1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmV3IEFzc2V0cygpOyIsImltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuaW1wb3J0IGtleU1pcnJvciBmcm9tICdrZXlNaXJyb3InO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2FycmF5SGVscGVyJztcclxuXHJcbmltcG9ydCBBc3NldHMgZnJvbSAnLi9hc3NldHMnO1xyXG5pbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xyXG5pbXBvcnQgR3JpZCBmcm9tICcuL2dyaWQnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jayB7XHJcblx0Y29uc3RydWN0b3Ioc3RhZ2Upe1xyXG5cdFx0dGhpcy5jb2xvcnMgPSBBc3NldHMuZ2V0KCdjb2xvcicsIGZhbHNlKS5jb2xvcnM7XHJcblx0XHR0aGlzLnRpbGVUeXBlcyA9IEFycmF5SGVscGVyLnJvdGF0ZShbdGhpcy5leHRyYWN0VGlsZVR5cGVzKEFzc2V0cy5nZXQoXCJ3b3JsZFwiKSldKTtcclxuXHRcdHRoaXMuZ3JpZCA9IFtdO1xyXG5cdFx0dGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cdFx0dGhpcy5yZWN0ID0gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZSgwLCBzdGFnZS5jYW52YXMuaGVpZ2h0IC0gdGhpcy5oZWlnaHQsIHN0YWdlLmNhbnZhcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuXHRcdHRoaXMuc2VsZWN0ZWRUb3dlciA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyID0gdGhpcy5jcmVhdGVEcmF3Q29udGFpbmVyKHN0YWdlKTtcclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5vbkRvY2tDbGljay5iaW5kKHRoaXMpKTtcclxuXHRcdHRoaXMuY3JlYXRlTGFiZWxzKCk7XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IEV2ZW50cygpIHtcclxuXHRcdHJldHVybiBrZXlNaXJyb3Ioe1xyXG5cdFx0XHRUT1dFUl9TRUxFQ1RFRDogbnVsbFxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXQgdGlsZVNpemUoKXsgcmV0dXJuIDYwOyB9IC8vVE9ETzogTWFrZSB0aGlzIGEgc2V0dHRpbmcgXHJcblx0Z2V0IHBhZGRpbmcoKXsgcmV0dXJuIDIwOyB9XHJcblx0Z2V0IGhlaWdodCgpIHsgcmV0dXJuIHRoaXMudGlsZVNpemUgKyAodGhpcy5wYWRkaW5nICogMikgfVxyXG5cclxuXHRpbml0KCl7XHJcblx0XHR0aGlzLmdyaWQgPSBuZXcgR3JpZChcclxuXHRcdFx0dGhpcy50aWxlVHlwZXMubGVuZ3RoLCBcclxuXHRcdFx0dGhpcy50aWxlVHlwZXNbMF0ubGVuZ3RoLFxyXG5cdFx0XHR0aGlzLnRpbGVTaXplLCBcclxuXHRcdFx0dGhpcy50aWxlSnVkZ2VyLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHRoaXMuc3RhZ2UuYWRkQ2hpbGQodGhpcy5kcmF3Q29udGFpbmVyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlYXJjaCB0aHJvdWdoIHRoZSBkaWZmZXJlbnQgdGlsZSB0eXBlcyBmb3IgdGhlIG9uZXMgd2hvIGNhbiBhdHRhY2tcclxuXHQgKiBAcGFyYW0gIHtqc29ufSB3b3JsZFNldHRpbmdzIFdvcmxkIEpTT04gc2V0dGluZ3NcclxuXHQgKiBAcmV0dXJuIHtvYmplY3RbXX0gICAgICAgICAgICAgICBMaXN0IG9mIHRoZSBhdHRhY2tpbmcgdGlsZSB0eXBlc1xyXG5cdCAqL1xyXG5cdGV4dHJhY3RUaWxlVHlwZXMod29ybGRTZXR0aW5ncykge1xyXG5cdFx0bGV0IHR5cGVzID0gW107XHJcblx0XHRmb3IgKHZhciBwcm9wIGluIHdvcmxkU2V0dGluZ3MudGlsZVR5cGVzKSB7XHJcblx0XHRcdGlmKHdvcmxkU2V0dGluZ3MudGlsZVR5cGVzLmhhc093blByb3BlcnR5KHByb3ApKXtcclxuXHRcdFx0XHRpZih3b3JsZFNldHRpbmdzLnRpbGVUeXBlc1twcm9wXS5hdHRhY2tzKXtcclxuXHRcdFx0XHRcdHR5cGVzLnB1c2goe25hbWU6IHByb3AsIGRpc3BsYXlOYW1lOiB3b3JsZFNldHRpbmdzLnRpbGVUeXBlc1twcm9wXS5uYW1lLCBzZXR0aW5nczogd29ybGRTZXR0aW5ncy50aWxlVHlwZXNbcHJvcF19KTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHR5cGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGEgY29udGFpbmVyIGZvciB0aGUgZG9ja2VyIGdyYXBoaWNzXHJcblx0ICogQHBhcmFtICB7Y3JlYXRlanMuU3RhZ2V9IHN0YWdlIEdhbWUgbWFpbiBzdGFnZVxyXG5cdCAqIEByZXR1cm4ge2NyZWF0ZWpzLkNvbnRhaW5lcn0gICAgICAgXHJcblx0ICovXHJcblx0Y3JlYXRlRHJhd0NvbnRhaW5lcihzdGFnZSkge1xyXG5cdFx0bGV0IGNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcclxuXHRcdGNvbnRhaW5lci55ID0gdGhpcy5yZWN0Lnk7XHJcblxyXG5cdFx0bGV0IGJhY2tncm91bmQgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHRcdGJhY2tncm91bmQuZ3JhcGhpY3NcclxuXHRcdFx0LnNldFN0cm9rZVN0eWxlKDIpLmJlZ2luU3Ryb2tlKHRoaXMuY29sb3JzW1wiZG9ja0JvcmRlclwiXSlcclxuXHRcdFx0LmJlZ2luRmlsbCh0aGlzLmNvbG9yc1tcImRvY2tcIl0pXHJcblx0XHRcdC5kcmF3UmVjdCgwLCAwLCB0aGlzLnJlY3Qud2lkdGgsIHRoaXMucmVjdC5oZWlnaHQpO1xyXG5cclxuIFx0XHRjb250YWluZXIuYWRkQ2hpbGQoYmFja2dyb3VuZCk7XHJcblx0XHRyZXR1cm4gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTGFiZWxzKCl7XHJcblx0XHQvLyBDYXNoIGxhYmVsXHJcblx0XHR0aGlzLmNhc2hMYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiQ2FzaDogXCIgKyBHYW1lLnByb3BzLmNhc2gsIFwiMjBweCBBcmlhbFwiLCBcIiNmZmZcIik7XHJcblx0XHR0aGlzLmNhc2hMYWJlbC55ID0gdGhpcy5oZWlnaHQgLyAyO1xyXG5cdFx0dGhpcy5jYXNoTGFiZWwueCA9IHRoaXMucmVjdC53aWR0aCAtIHRoaXMuY2FzaExhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSAtIDIwO1xyXG5cclxuXHRcdC8vIExpdmVzIGxhYmVsXHJcblx0XHR0aGlzLmxpdmVzTGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIkxpdmVzOiBcIiArIEdhbWUucHJvcHMubGl2ZXMsIFwiMjBweCBBcmlhbFwiLCBcIiNmZmZcIik7XHJcblx0XHR0aGlzLmxpdmVzTGFiZWwueSA9ICh0aGlzLmhlaWdodCAvIDIpIC0gNDA7XHJcblx0XHR0aGlzLmxpdmVzTGFiZWwueCA9IHRoaXMucmVjdC53aWR0aCAtIHRoaXMuY2FzaExhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSAtIDIwO1xyXG5cclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRDaGlsZCh0aGlzLmNhc2hMYWJlbCk7XHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIuYWRkQ2hpbGQodGhpcy5saXZlc0xhYmVsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlY2lkZXMgYW5kIGNyZWF0ZSB0aGUgdGlsZVxyXG5cdCAqIEBwYXJhbSAge2ludH0gZ3JpZFggWCBpbiBncmlkIGFycmF5XHJcblx0ICogQHBhcmFtICB7aW50fSBncmlkWSBZIGluIGdyaWQgYXJyYXlcclxuXHQgKiBAcmV0dXJuIHtUaWxlfSAgICAgIFxyXG5cdCAqL1xyXG5cdHRpbGVKdWRnZXIoZ3JpZFgsIGdyaWRZKXtcclxuXHRcdGxldCB0aWxlUG9zID0gbmV3IFZlY3RvcihncmlkWCAqIHRoaXMudGlsZVNpemUgKyB0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZyksXHJcblx0XHRcdHRpbGVUeXBlID0gdGhpcy50aWxlVHlwZXNbZ3JpZFhdW2dyaWRZXSxcclxuXHRcdFx0dGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KHRpbGVUeXBlLmRpc3BsYXlOYW1lLCBcIjE2cHggQXJpYWxcIiwgdGhpcy5jb2xvcnNbXCJncmV5V2hpdGVcIl0pLFxyXG5cdFx0XHRzaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xyXG4gXHRcdFxyXG4gXHRcdHNoYXBlLmdyYXBoaWNzXHJcbiBcdFx0XHQuc2V0U3Ryb2tlU3R5bGUoMSkuYmVnaW5TdHJva2UoXCIjZmZmXCIpXHJcbiBcdFx0XHQuYmVnaW5GaWxsKHRoaXMuY29sb3JzW1wiVGVhbENvbG9yXCJdKVxyXG4gXHRcdFx0LmRyYXdSZWN0KHRpbGVQb3MueCwgdGlsZVBvcy55LCB0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKTtcclxuXHJcblx0XHR0ZXh0LnggPSB0aWxlUG9zLnggKyAodGhpcy50aWxlU2l6ZSAvIDIpIC0gKHRleHQuZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMik7XHJcblx0XHR0ZXh0LnkgPSB0aWxlUG9zLnkgKyAodGhpcy50aWxlU2l6ZSAvIDIpICsgKHRleHQuZ2V0TWVhc3VyZWRIZWlnaHQoKSAvIDIpO1x0XHJcblx0XHR0ZXh0LnRleHRCYXNlbGluZSA9IFwiYWxwaGFiZXRpY1wiO1xyXG5cclxuIFx0XHR0aGlzLmRyYXdDb250YWluZXIuYWRkQ2hpbGQoc2hhcGUpO1xyXG4gXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRDaGlsZCh0ZXh0KTtcclxuIFx0XHRyZXR1cm4gdGlsZVR5cGU7XHJcblx0fVxyXG5cclxuXHRvbkRvY2tDbGljayhjbGljayl7XHJcblx0XHRsZXQgZ3JpZFBvcyA9IHRoaXMuZ3JpZC5nZXRBcnJheVBvcyh0aGlzLmRyYXdDb250YWluZXIuZ2xvYmFsVG9Mb2NhbChjbGljay5zdGFnZVgsIGNsaWNrLnN0YWdlWSksIHRoaXMucGFkZGluZyk7XHJcblxyXG5cdFx0aWYoZ3JpZFBvcykge1xyXG5cdFx0XHR0aGlzLnNlbGVjdGVkVG93ZXIgPSB0aGlzLnRpbGVUeXBlc1tncmlkUG9zLnhdW2dyaWRQb3MueV07XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGUodGltZSl7XHJcblx0XHR0aGlzLmNhc2hMYWJlbC50ZXh0ID0gXCJDYXNoOiBcIiArIEdhbWUucHJvcHMuY2FzaDtcclxuXHRcdHRoaXMubGl2ZXNMYWJlbC50ZXh0ID0gXCJMaXZlczogXCIgKyBHYW1lLnByb3BzLmxpdmVzO1xyXG5cdH1cclxufSIsIlxyXG5pbXBvcnQgV29ybGQgZnJvbSAnLi93b3JsZCc7XHJcbmltcG9ydCBBc3NldHMgZnJvbSAnLi9hc3NldHMnO1xyXG5pbXBvcnQgRG9jayBmcm9tICcuL2RvY2snO1xyXG5pbXBvcnQgVW5pdE1hbmFnZXIgZnJvbSAnLi91bml0TWFuYWdlcic7XHJcbmltcG9ydCBBbmltYXRpb25NYW5hZ2VyIGZyb20gJy4vYW5pbWF0aW9ucy9hbmltYXRpb25NYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBrZXlOYW1lcyA9IHtcclxuXHRzaGlmdDogMTZcclxufTtcclxuXHJcbmNvbnN0IEdhbWUgPSB7XHJcblx0cnVubmluZzogZmFsc2UsXHJcblx0Y2FtZXJhU3BlZWQ6IDIwLFxyXG5cdGtleXM6IFtdLFxyXG5cdHByb3BzOiB7fSxcclxuXHJcblx0c3RhZ2U6IG51bGwsXHJcblx0d29ybGQ6IG51bGwsXHJcblx0d29ybGRTdGFnZTogbnVsbCxcclxuXHR1bml0TWFuYWdlcjogbnVsbCxcclxuXHRkb2NrOiBudWxsLFxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWF0ZSBhbGwgdGhlIGdhbWUgY29tcG9uZW50c1xyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0c3RhcnQoc3RhZ2Upe1xyXG5cdFx0T2JqZWN0LmFzc2lnbihHYW1lLnByb3BzLCBBc3NldHMuZ2V0KCdnYW1lJykpXHJcblx0XHRHYW1lLnN0YWdlID0gc3RhZ2U7XHJcblx0XHRHYW1lLndvcmxkU3RhZ2UgPSBzdGFnZS5hZGRDaGlsZChuZXcgY3JlYXRlanMuQ29udGFpbmVyKCkpO1xyXG5cclxuXHRcdEdhbWUud29ybGQgPSBuZXcgV29ybGQoR2FtZS53b3JsZFN0YWdlKTtcclxuXHRcdEdhbWUudW5pdE1hbmFnZXIgPSBuZXcgVW5pdE1hbmFnZXIoR2FtZS53b3JsZFN0YWdlKTtcclxuXHRcdEdhbWUuZG9jayA9IG5ldyBEb2NrKHN0YWdlKTtcclxuXHJcblx0XHQvLyBJbml0aWF0ZVxyXG5cdFx0R2FtZS53b3JsZC5pbml0KCk7XHJcblx0XHRHYW1lLnVuaXRNYW5hZ2VyLmluaXQoKTtcclxuXHRcdEdhbWUuZG9jay5pbml0KCk7XHJcblxyXG5cdFx0R2FtZS5ydW5uaW5nID0gdHJ1ZTtcclxuXHR9LFxyXG5cclxuXHRkcmF3R2FtZU92ZXIoKXtcclxuXHRcdGxldCBnYW1lT3ZlciA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiR2FtZSBPdmVyIVwiLCBcIjYwcHggQXJpYWxcIiwgXCIjZmZmXCIpO1xyXG5cdFx0Z2FtZU92ZXIueCA9IChHYW1lLnN0YWdlLmNhbnZhcy53aWR0aCAvIDIpIC0gKGdhbWVPdmVyLmdldE1lYXN1cmVkV2lkdGgoKSAvIDIpO1xyXG5cdFx0Z2FtZU92ZXIueSA9IEdhbWUuc3RhZ2UuY2FudmFzLmhlaWdodCAvIDIgLSAoZ2FtZU92ZXIuZ2V0TWVhc3VyZWRIZWlnaHQoKSAvIDIpO1xyXG5cdFx0XHJcblx0XHRHYW1lLnN0YWdlLmFkZENoaWxkKGdhbWVPdmVyKTtcclxuXHR9LFxyXG5cclxuXHRjaGVja0tleXMoKSB7XHJcblx0XHRpZihHYW1lLmtleXNbMzddKVxyXG5cdFx0XHRHYW1lLndvcmxkU3RhZ2UucmVnWCAtPSBHYW1lLmNhbWVyYVNwZWVkO1xyXG5cclxuXHRcdGlmKEdhbWUua2V5c1szOF0pXHJcblx0XHRcdEdhbWUud29ybGRTdGFnZS5yZWdZIC09IEdhbWUuY2FtZXJhU3BlZWQ7XHJcblxyXG5cdFx0aWYoR2FtZS5rZXlzWzM5XSlcclxuXHRcdFx0R2FtZS53b3JsZFN0YWdlLnJlZ1ggKz0gR2FtZS5jYW1lcmFTcGVlZDtcclxuXHRcdFx0XHJcblx0XHRpZihHYW1lLmtleXNbNDBdKVxyXG5cdFx0XHRHYW1lLndvcmxkU3RhZ2UucmVnWSArPSBHYW1lLmNhbWVyYVNwZWVkO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdEdhbWUuY2hlY2tLZXlzKCk7XHJcblxyXG5cdFx0aWYoIUdhbWUucnVubmluZylcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdEdhbWUud29ybGQudXBkYXRlKHRpbWUpO1xyXG5cdFx0R2FtZS51bml0TWFuYWdlci51cGRhdGUodGltZSk7XHJcblx0XHRHYW1lLmRvY2sudXBkYXRlKHRpbWUpO1xyXG5cdFx0XHJcblx0XHRBbmltYXRpb25NYW5hZ2VyLnVwZGF0ZSh0aW1lKTtcclxuXHR9LFxyXG5cclxuXHRkcmF3KHN0YWdlLCB0aW1lKXtcclxuXHRcdGlmKCFHYW1lLnJ1bm5pbmcpXHJcblx0XHRcdHJldHVybjtcclxuXHJcblx0XHRHYW1lLndvcmxkLmRyYXcoc3RhZ2UsIHRpbWUpO1xyXG5cdH0sXHJcblxyXG5cclxuXHJcblx0Ly8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcclxuXHRcclxuXHRidXlpbmdUb3dlcihwcmljZSl7XHJcblx0XHRpZihHYW1lLnByb3BzLmNhc2ggLSBwcmljZSA+PSAwKXtcclxuXHRcdFx0R2FtZS5wcm9wcy5jYXNoIC09IHByaWNlO1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSxcclxuXHJcblx0cmVjaWV2ZUNhc2goYW1vdW50KXtcclxuXHRcdEdhbWUucHJvcHMuY2FzaCArPSBhbW91bnQ7XHJcblx0fSxcclxuXHJcblx0bG9zZUxpZmUoKXtcclxuXHRcdEdhbWUucHJvcHMubGl2ZXMgLT0gMTtcdFxyXG5cclxuXHRcdGlmKEdhbWUucHJvcHMubGl2ZXMgPD0gMCl7XHJcblx0XHRcdEdhbWUucnVubmluZyA9IGZhbHNlO1xyXG5cdFx0XHRHYW1lLmRyYXdHYW1lT3ZlcigpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWU7XHJcbiIsIlxyXG5pbXBvcnQgVmVjdG9yIGZyb20gJ3ZpY3Rvcic7XHJcbmltcG9ydCBNYXRoSGVscGVyIGZyb20gJy4vaGVscGVycy9tYXRoSGVscGVyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdyaWQge1xyXG5cdGNvbnN0cnVjdG9yKHgsIHksIHRpbGVTaXplLCB0aWxlSnVkZ2VyKXtcclxuXHRcdHRoaXMudGlsZXMgPSBbXTtcclxuXHRcdHRoaXMueCA9IHhcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0XHR0aGlzLnRpbGVTaXplID0gdGlsZVNpemU7XHJcblxyXG5cdFx0dGhpcy5nZW5lcmF0ZSh0aWxlSnVkZ2VyKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFBvcHVsYXRlIGNlbGxzXHJcblx0ICogQHBhcmFtICB7ZnVuY3Rpb259IHRpbGVKdWRnZXIgV2lsbCBkZXRlcm1pbmUgYW5kIHJldHVybiBhIGNlbGxcclxuXHQgKiBAcmV0dXJuIHt2b2lkfVxyXG5cdCAqL1xyXG5cdGdlbmVyYXRlKHRpbGVKdWRnZXIpIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy54OyBpKyspIHtcclxuXHRcdFx0dGhpcy50aWxlc1tpXSA9IFtdO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnk7IGorKykge1xyXG5cdFx0XHRcdHRoaXMudGlsZXNbaV1bal0gPSB0aWxlSnVkZ2VyKGksIGopO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgY2VsbCBiYXNlZCBvbiBzY3JlZW4gdmVjdG9yXHJcblx0ICogQHBhcmFtICB7dmVjdG9yfSBwb3MgU2NyZWVuIHZlY3RvclxyXG5cdCAqIEByZXR1cm4ge0NlbGx9ICAgICBcclxuXHQgKi9cclxuXHRnZXRUaWxlKHBvcyl7XHJcblx0XHRsZXQgZ3JpZFBvcyA9IHRoaXMuZ2V0QXJyYXlQb3MocG9zKTtcclxuXHJcblx0XHRpZihncmlkUG9zICE9IG51bGwpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy50aWxlc1tncmlkUG9zLnhdW2dyaWRQb3MueV07XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG51bGw7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgZ3JpZCBwb3NpdGlvbiBiYXNlZCBvbiBzY3JlZW4gdmVjdG9yXHJcblx0ICogQHBhcmFtICB7dmVjdG9yfSBwb3MgU2NyZWVuIHZlY3RvclxyXG5cdCAqIEByZXR1cm4ge29iamVjdH0gICAgIFNuYXAgZ3JpZCBwb3NpdGlvblxyXG5cdCAqL1xyXG5cdGdldEFycmF5UG9zKHBvcywgcGFkZGluZyl7XHJcblx0XHRsZXQgZ3JpZFBvcyA9IHtcclxuXHRcdFx0eDogTWF0aC5mbG9vcihNYXRoSGVscGVyLnNuYXBUb0Zsb29yKHBvcy54LCB0aGlzLnRpbGVTaXplLCBwYWRkaW5nKSAvIHRoaXMudGlsZVNpemUpLFxyXG5cdFx0XHR5OiBNYXRoLmZsb29yKE1hdGhIZWxwZXIuc25hcFRvRmxvb3IocG9zLnksIHRoaXMudGlsZVNpemUsIHBhZGRpbmcpIC8gdGhpcy50aWxlU2l6ZSlcclxuXHRcdH07XHJcblxyXG5cdFx0aWYodGhpcy52YWxpZEFycmF5UG9zKGdyaWRQb3MpKVxyXG5cdFx0XHRyZXR1cm4gZ3JpZFBvcztcclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnZlcnRzIGdyaWQgYXJyYXkgcG9zIHt4LHl9IHRvIHNjcmVlbiBwb3NpdGlvbnNcclxuXHQgKiBAcGFyYW0gIHt7eCx5fX0gcG9zIEdyaWQgcG9zdGlvblxyXG5cdCAqIEByZXR1cm4ge3ZlY3Rvcn0gICAgIFNjcmVlbiB2ZWN0b3JcclxuXHQgKi9cclxuXHRnZXRTY3JlZW5WZWN0b3IocG9zKXtcclxuXHRcdHJldHVybiBWZWN0b3IuZnJvbU9iamVjdChwb3MpXHJcblx0XHRcdFx0Lm11bHRpcGx5U2NhbGFyKHRoaXMudGlsZVNpemUpXHJcblx0XHRcdFx0LmFkZChuZXcgVmVjdG9yKHRoaXMudGlsZVNpemUgLyAyLCB0aGlzLnRpbGVTaXplIC8gMikpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2hlY2tzIGlmIHRoZSBncmlkIHBvcyBpcyBpbnNpZGUgb2YgYXJyYXkgbGVuZ3RoXHJcblx0ICogQHBhcmFtICB7e3gseX19IHBvcyBHcmlkIHBvc2l0aW9uXHJcblx0ICogQHJldHVybiB7Ym9vbH0gICAgIFxyXG5cdCAqL1xyXG5cdHZhbGlkQXJyYXlQb3MocG9zKXtcclxuXHRcdHJldHVybiBwb3MueCA8IHRoaXMueCAmJiBwb3MueSA8IHRoaXMueVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2VuZXJhdGUgbm9kZXMgIGJhc2VkIG9uIGdyaWQgdGlsZXMuIFVzZWQgYnkgYVN0YXIgdG8gY2FsY3VsYXRlIHBhdGhcclxuXHQgKiBAcmV0dXJuIHtub2Rlc1tdW119XHJcblx0ICovXHJcblx0Y3JlYXRlQVN0YXJOb2Rlcygpe1xyXG5cdFx0bGV0IG5vZGVzID0gW107XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bm9kZXNbaV0gPSBbXTtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLnRpbGVzWzBdLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0bm9kZXNbaV1bal0gPSB7XHJcblx0XHRcdFx0XHR4OiBpLCB5OiBqLCBmOiAwLCBnOiAwLCBoOiAwLFxyXG5cdFx0XHRcdFx0dmVjdG9yOiB0aGlzLmdldFNjcmVlblZlY3Rvcih7eDogaSwgeTogan0pLFxyXG5cdFx0XHRcdFx0aXNXYWxsOiB0aGlzLnRpbGVzW2ldW2pdLmlzV2FsbFxyXG5cdFx0XHRcdH07XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBub2RlcztcclxuXHR9XHRcclxufSIsIlxyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9hcnJheUhlbHBlcic7XHJcblxyXG5jb25zdCBBU3RhciA9IHtcclxuXHJcblx0c2VhcmNoKG5vZGVzLCBzdGFydCwgZW5kKSB7XHJcblxyXG5cdFx0bGV0IGNsb3NlZFNldCA9IFtdLFxyXG5cdFx0XHRvcGVuU2V0ID0gW10sXHJcblx0XHRcdGN1cnJlbnROb2RlO1xyXG5cclxuXHRcdG9wZW5TZXQucHVzaChzdGFydCk7XHJcblxyXG5cdFx0d2hpbGUob3BlblNldC5sZW5ndGggPiAwKXtcclxuXHJcblx0XHRcdGxldCBmSW5kZXggPSAwO1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG9wZW5TZXQubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRpZihvcGVuU2V0W2ldLmYgPCBvcGVuU2V0W2ZJbmRleF0uZilcclxuXHRcdFx0XHRcdGZJbmRleCA9IGk7XHJcblx0XHRcdH07XHJcblx0XHRcdGN1cnJlbnROb2RlID0gb3BlblNldFtmSW5kZXhdO1xyXG5cclxuXHRcdFx0Ly8gRm91bmQgZ29hbCwgcmV0dXJuIHRoZSBwYXRoXHJcblx0XHRcdGlmKGN1cnJlbnROb2RlID09IGVuZCl7XHJcblx0XHRcdFx0bGV0IGN1cnIgPSBjdXJyZW50Tm9kZSxcclxuXHRcdFx0XHRcdHJldCA9IFtdO1xyXG5cclxuXHRcdFx0XHR3aGlsZShjdXJyLnBhcmVudCl7XHJcblx0XHRcdFx0XHRyZXQucHVzaChjdXJyKTtcclxuXHRcdFx0XHRcdGN1cnIgPSBjdXJyLnBhcmVudDtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdHJldHVybiByZXQucmV2ZXJzZSgpO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRvcGVuU2V0LnNwbGljZShvcGVuU2V0LmluZGV4T2YoY3VycmVudE5vZGUpLCAxKTtcclxuXHRcdFx0Y2xvc2VkU2V0LnB1c2goY3VycmVudE5vZGUpO1xyXG5cclxuXHRcdFx0bGV0IG5laWdoYm9ycyA9IEFycmF5SGVscGVyLm5laWdoYm9ycyhub2RlcywgY3VycmVudE5vZGUsIGZhbHNlKTtcclxuXHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbmVpZ2hib3JzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0bGV0IG5laWdoYm9yID0gbmVpZ2hib3JzW2ldO1xyXG5cclxuXHRcdFx0XHRpZihjbG9zZWRTZXQuaW5kZXhPZihuZWlnaGJvcikgPiAtMSB8fCBuZWlnaGJvci5pc1dhbGwpe1xyXG5cdFx0XHRcdFx0Y29udGludWU7IC8vIE5vdCBhIHZhbGlkIG5vZGUgdG8gd2FsayB0b1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0bGV0IGdTY29yZSA9IGN1cnJlbnROb2RlLmcgKyAxLCAvLyAxIGlzIGRpc3RhbmNlIHRvIHRvIGl0J3MgbmVpZ2hib3JcclxuXHRcdFx0XHRcdGJlc3RHID0gZmFsc2U7IFxyXG5cclxuXHRcdFx0XHRpZihvcGVuU2V0LmluZGV4T2YobmVpZ2hib3IpIDwgMCl7XHJcblx0XHRcdFx0XHQvLyBXZSBoYXZlIG5vdCBiZWVuIGhlcmUgYmVmb3JlIHRoZXJlZm9yIHRoZSBiZXN0IGdcclxuXHRcdFx0XHRcdGJlc3RHID0gdHJ1ZTtcclxuXHRcdFx0XHRcdG5laWdoYm9yLmggPSBBU3Rhci5tYW5oYXR0YW4obmVpZ2hib3IsIGVuZCk7XHJcblx0XHRcdFx0XHRvcGVuU2V0LnB1c2gobmVpZ2hib3IpO1xyXG5cdFx0XHRcdH0gXHJcblx0XHRcdFx0ZWxzZSBpZihnU2NvcmUgPCBuZWlnaGJvci5nKXtcclxuXHRcdFx0XHRcdGJlc3RHID0gdHJ1ZTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKGJlc3RHKXtcclxuXHRcdFx0XHRcdG5laWdoYm9yLnBhcmVudCA9IGN1cnJlbnROb2RlO1xyXG5cdFx0XHRcdFx0bmVpZ2hib3IuZyA9IGdTY29yZTtcclxuXHRcdFx0XHRcdG5laWdoYm9yLmYgPSBuZWlnaGJvci5nICsgbmVpZ2hib3IuaDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH07XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiBbXTsgLy8gRGlkIG5vdCBmaW5kIGFueSBwYXRoXHJcblx0fSxcclxuXHJcblx0bWFuaGF0dGFuKHBvczEsIHBvczIpIHtcclxuXHRcdGxldCBkMSA9IE1hdGguYWJzKHBvczIueCAtIHBvczEueCk7XHJcblx0XHRsZXQgZDIgPSBNYXRoLmFicyhwb3MyLnkgLSBwb3MxLnkpO1xyXG5cdFx0cmV0dXJuIGQxICsgZDI7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBU3RhcjsiLCJcclxuY29uc3QgQXJyYXlIZWxwZXIgPSB7XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN3aXRjaCBwbGFjZSBvbiBpICYgalxyXG5cdCAqIEBwYXJhbSAge0FycmF5W11bXX0gYXJyXHJcblx0ICogQHJldHVybiB7QXJyYXlbXVtdfSAgICAgXHRcdFRoZSByb3RhdGVkIGFycmF5XHJcblx0ICovXHJcblx0cm90YXRlKGFycil7XHJcblx0XHRsZXQgbiA9IFtdO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJyWzBdLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdG5baV0gPSBbXTtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRuW2ldW2pdID0gYXJyW2pdW2ldO1xyXG5cdFx0XHR9O1xyXG5cdFx0fTtcclxuXHJcblx0XHRyZXR1cm4gbjtcclxuXHR9LFxyXG5cclxuXHRuZWlnaGJvcnMoYXJyYXksIGVsZW1lbnQsIGRpYWdvbmFscyl7XHJcblx0XHRpZihcdHR5cGVvZiBhcnJheSA9PSAndW5kZWZpbmVkJyB8fFxyXG5cdFx0XHR0eXBlb2YgYXJyYXlbMF0gPT0gJ3VuZGVmaW5lZCcgfHxcclxuXHRcdFx0dHlwZW9mIGFycmF5WzBdWzBdID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIk5vdCBhIHR3byBkaW1lbnNpb25hbCBhcnJheVwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgcmV0ID0gW10sIHgsIHk7XHJcblxyXG5cdFx0aWYoZWxlbWVudC54ICYmIHBhcnNlSW50KGVsZW1lbnQueCkgPCBhcnJheS5sZW5ndGggJiYgXHJcblx0XHRcdGVsZW1lbnQueSAmJiBwYXJzZUludChlbGVtZW50LnkpIDwgYXJyYXlbMF0ubGVuZ3RoKXtcclxuXHRcdFx0eCA9IGVsZW1lbnQueDtcclxuXHRcdFx0eSA9IGVsZW1lbnQueTtcclxuXHRcdH0gZWxzZXtcclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgYXJyYXlbMF0ubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRcdGlmKGFycmF5W2ldW2pdID09IGVsZW1lbnQpe1xyXG5cdFx0XHRcdFx0XHR4ID0gaTtcclxuXHRcdFx0XHRcdFx0eSA9IGo7XHJcblx0XHRcdFx0XHRcdGJyZWFrO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVx0XHRcclxuXHJcbiAgICAgICAgLy8gV2VzdFxyXG4gICAgICAgIGlmKGFycmF5W3gtMV0gJiYgYXJyYXlbeC0xXVt5XSkge1xyXG4gICAgICAgICAgICByZXQucHVzaChhcnJheVt4LTFdW3ldKTtcclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICAvLyBFYXN0XHJcbiAgICAgICAgaWYoYXJyYXlbeCsxXSAmJiBhcnJheVt4KzFdW3ldKSB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKGFycmF5W3grMV1beV0pO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vIFNvdXRoXHJcbiAgICAgICAgaWYoYXJyYXlbeF0gJiYgYXJyYXlbeF1beS0xXSkge1xyXG4gICAgICAgICAgICByZXQucHVzaChhcnJheVt4XVt5LTFdKTtcclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICAvLyBOb3J0aFxyXG4gICAgICAgIGlmKGFycmF5W3hdICYmIGFycmF5W3hdW3krMV0pIHtcclxuICAgICAgICAgICAgcmV0LnB1c2goYXJyYXlbeF1beSsxXSk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgaWYgKGRpYWdvbmFscykge1xyXG4gXHJcbiAgICAgICAgICAgIC8vIFNvdXRod2VzdFxyXG4gICAgICAgICAgICBpZihhcnJheVt4LTFdICYmIGFycmF5W3gtMV1beS0xXSkge1xyXG4gICAgICAgICAgICAgICAgcmV0LnB1c2goYXJyYXlbeC0xXVt5LTFdKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gU291dGhlYXN0XHJcbiAgICAgICAgICAgIGlmKGFycmF5W3grMV0gJiYgYXJyYXlbeCsxXVt5LTFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXQucHVzaChhcnJheVt4KzFdW3ktMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiBcclxuICAgICAgICAgICAgLy8gTm9ydGh3ZXN0XHJcbiAgICAgICAgICAgIGlmKGFycmF5W3gtMV0gJiYgYXJyYXlbeC0xXVt5KzFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXQucHVzaChhcnJheVt4LTFdW3krMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiBcclxuICAgICAgICAgICAgLy8gTm9ydGhlYXN0XHJcbiAgICAgICAgICAgIGlmKGFycmF5W3grMV0gJiYgYXJyYXlbeCsxXVt5KzFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXQucHVzaChhcnJheVt4KzFdW3krMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmV0O1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFycmF5SGVscGVyOyIsIlxyXG5jb25zdCBNYXRoSGVscGVyID0ge1xyXG5cdHNuYXBUb0Zsb29yKGlucHV0LCBnYXAsIHN0YXJ0KXtcclxuXHRcdGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7IHN0YXJ0ID0gMDsgfVxyXG5cclxuICAgICAgICBpZiAoZ2FwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnB1dDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlucHV0IC09IHN0YXJ0O1xyXG4gICAgICAgIGlucHV0ID0gZ2FwICogTWF0aC5mbG9vcihpbnB1dCAvIGdhcCk7XHJcblxyXG4gICAgICAgIHJldHVybiBzdGFydCArIGlucHV0O1xyXG5cdH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hdGhIZWxwZXI7IiwiXHJcbmNvbnN0IFJhbmRvbSA9IHtcclxuXHRjaG9pY2UoYXJyKSB7XHJcblx0XHRyZXR1cm4gYXJyW01hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiBhcnIubGVuZ3RoKSArIDApXTtcclxuXHR9LFxyXG5cclxuXHRuZXh0KG1pbiwgbWF4LCBmbG9hdFZhbHVlKSB7XHJcblx0XHRsZXQgdmFsID0gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xyXG5cdFx0cmV0dXJuIGZsb2F0VmFsdWUgPyB2YWwgOiBNYXRoLmZsb29yKHZhbCk7XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBSYW5kb207IiwiXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuXHJcbmNvbnN0IGRlZmF1bHRTZXR0aW5ncyA9IHtcclxuXHRtYXhGb3JjZTogNS40ICogMTAwMCxcclxuXHRtYXhWZWxvY2l0eTogMy41ICogMTAwMCxcclxuXHRtYXNzOiAyMCxcclxuXHRzbG93aW5nUmFkaW91czogNzAsXHJcblx0cGF0aFJhZGlvdXM6IDIwLFxyXG5cclxuXHRtYXhTZWVBaGVhZDogNDAsXHJcblx0bWF4QXZvaWRhbmNlRm9yY2U6IDIwMDBcclxufVxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0ZWVyaW5nIHtcclxuXHRjb25zdHJ1Y3Rvcihib2lkLCBzZXR0aW5ncyl7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFNldHRpbmdzLCBzZXR0aW5ncyk7XHJcblx0XHR0aGlzLmJvaWQgPSBib2lkO1xyXG5cclxuXHRcdHRoaXMuc3RlZXJpbmcgPSBuZXcgVmVjdG9yKDAsMCk7XHJcblx0XHR0aGlzLnZlbG9jaXR5ID0gdGhpcy50cnVuY2F0ZShuZXcgVmVjdG9yKC0xLC0yKSwgdGhpcy5zZXR0aW5ncy5tYXhWZWxvY2l0eSk7XHJcblx0XHR0aGlzLmRlc2lyZWRWZWxvY2l0eSA9IG5ldyBWZWN0b3IoMSwwKTtcclxuXHRcdHRoaXMuYXZvaWRhbmNlRm9yY2UgPSBuZXcgVmVjdG9yKDAsMCk7XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50Tm9kZVBhdGggPSAwO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVHJ1bmNhdGUgdGhlIHZlY3RvciB0byB0aGUgbWF4IHZhbHVlXHJcblx0ICogQHBhcmFtICB7dmVjdG9yfSB2ZWN0b3IgXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9IG1heCAgICBcclxuXHQgKiBAcmV0dXJuIHt2ZWN0b3J9ICAgICAgICAgVmFsdWUgd2lsbCBiZSBzZXQgb24gdmVjdG9yIGFuZCB0aGUgdmVjdG9yIHdpbGwgYmUgcmV0dXJuZWRcclxuXHQgKi9cclxuXHR0cnVuY2F0ZSh2ZWN0b3IsIG1heCl7XHJcblx0XHRsZXQgaSA9IG1heCAvIHZlY3Rvci5sZW5ndGgoKTtcclxuXHRcdGkgPSBpIDwgMS4wID8gaSA6IDEuMDtcclxuXHRcdHZlY3Rvci5tdWx0aXBseVNjYWxhcihpKTtcclxuXHRcdHJldHVybiB2ZWN0b3I7XHJcblx0fVxyXG5cclxuXHRyZXNldFBhdGgoKXtcclxuXHRcdHRoaXMuY3VycmVudE5vZGVQYXRoID0gMDtcclxuXHR9XHJcblxyXG5cdGludGVyc2VjdHNSZWN0YW5nbGUoYWhlYWQsIHJlY3Qpe1xyXG5cdFx0bGV0IHNjYWxhciA9IHRoaXMuc2V0dGluZ3MubWF4U2VlQWhlYWQgKiAwLjUgKiB0aGlzLnZlbG9jaXR5Lmxlbmd0aCgpIC8gdGhpcy5zZXR0aW5ncy5tYXhWZWxvY2l0eSxcclxuXHRcdFx0dHYgPSB0aGlzLnZlbG9jaXR5LmNsb25lKCkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIoc2NhbGFyKSxcclxuXHRcdFx0YWhlYWQyID0gdGhpcy5ib2lkLnBvc2l0aW9uLmNsb25lKCkuYWRkKHR2KTsgLy8gYWhlYWQyIGlzIGhhbGYgdGhlIGxlbmd0aCBvZiBhaGVhZFxyXG5cclxuXHRcdHJldHVybiByZWN0LmNvbnRhaW5zKGFoZWFkLngsIGFoZWFkLnkpIHx8IFxyXG5cdFx0XHRyZWN0LmNvbnRhaW5zKGFoZWFkMi54LCBhaGVhZDIueSkgfHwgXHJcblx0XHRcdHJlY3QuaW50ZXJzZWN0cyh0aGlzLmJvaWQucmVjdCk7XHJcblx0fVxyXG5cclxuXHRtb3N0VGhyZWF0aW5nT2JzdGFjbGUoYWhlYWQsIG9ic3RhY2xlcyl7XHJcblx0XHRsZXQgY29sbGlzaW9uID0gZmFsc2UsXHJcblx0XHRcdG1vc3RUaHJlYXRpbmcgPSBudWxsO1xyXG5cclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb2JzdGFjbGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNvbGxpc2lvbiA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYob2JzdGFjbGVzW2ldLnJlY3Qpe1xyXG5cclxuXHRcdFx0XHRpZih0aGlzLmludGVyc2VjdHNSZWN0YW5nbGUoYWhlYWQsIG9ic3RhY2xlc1tpXS5yZWN0KSl7XHJcblx0XHRcdFx0XHRpZihtb3N0VGhyZWF0aW5nID09IG51bGwgfHxcclxuXHRcdFx0XHRcdFx0dGhpcy5ib2lkLnBvc2l0aW9uLmRpc3RhbmNlKG9ic3RhY2xlc1tpXS5jZW50ZXIpIDwgXHJcblx0XHRcdFx0XHRcdHRoaXMuYm9pZC5wb3NpdGlvbi5kaXN0YW5jZShtb3N0VGhyZWF0aW5nLmNlbnRlcikpe1xyXG5cdFx0XHRcdFx0XHRtb3N0VGhyZWF0aW5nID0gb2JzdGFjbGVzW2ldO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBtb3N0VGhyZWF0aW5nO1xyXG5cdH1cclxuXHJcblxyXG5cdGNvbGxpc2lvbkF2b2lkYW5jZShvYnN0YWNsZXMpe1xyXG5cdFx0dGhpcy5zdGVlcmluZy5hZGQodGhpcy5kb0NvbGxpc2lvbkF2b2lkYW5jZShvYnN0YWNsZXMpKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBwdWJsaWMgbWV0aG9kIHRvIGJlIHVzZWQuIFNlZSBkb0ZvbGxvd1BhdGgoKSBmb3IgbW9yZSBpbmZvcm1hdGlvblxyXG5cdCAqL1xyXG5cdGZvbGxvd1BhdGgocGF0aCl7XHJcblx0XHRpZih0aGlzLmN1cnJlbnROb2RlUGF0aCA+IHBhdGgubGVuZ3RoKVxyXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJOZWVkcyB0byByZXNldCBwYXRoIGJlZm9yZSBzZXR0aW5nIGEgbmV3IG9uZVwiKTtcclxuXHJcblx0XHRsZXQgc2xvd2luZ1JhZGlvdXMgPSB0aGlzLmN1cnJlbnROb2RlUGF0aCA9PSBwYXRoLmxlbmd0aCAtIDEgPyB0aGlzLnNldHRpbmdzLnNsb3dpbmdSYWRpb3VzIDogMFxyXG5cdFx0dGhpcy5zZWVrKHRoaXMuZG9Gb2xsb3dQYXRoKHBhdGgpLCBzbG93aW5nUmFkaW91cyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUaGUgcHVibGljIG1ldGhvZCB0byBiZSB1c2VkLiBTZWUgZG9TZWVrKCkgZm9yIG1vcmUgaW5mb3JtYXRpb25cclxuXHQgKi9cclxuXHRzZWVrKHRhcmdldCwgc2xvd2luZ1JhZGlvdXMpIHtcclxuXHRcdHRoaXMuc3RlZXJpbmcuYWRkKHRoaXMuZG9TZWVrKHRhcmdldCwgc2xvd2luZ1JhZGlvdXMpKTtcclxuXHR9XHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBNb3ZlIHRoZSBib2lkIGNsb3NlciB0byB0aGUgdGFyZ2V0LiBUaGlzIG1ldGhvZCBhbG9uZSBzaG91bGQgbm90IGJlIHVzZWRcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IHRhcmdldCAgICAgICAgIFxyXG5cdCAqIEBwYXJhbSAge2Zsb2F0fSBzbG93aW5nUmFkaW91cyAgKEFycml2ZSBiZWhhdmlvdXIpIElmIGluIHJhZGlvdXMgdGhlIGJvaWQgd2lsbCBzbG93ZG93biBiZWZvcmUgcmVhY2hpbmcgdGhlIHRhcmdldC4gQWxsb3dzIG51bGxcclxuXHQgKiBAcmV0dXJuIHt2ZWN0b3J9ICAgICAgICAgICAgICAgIEZvcmNlIHZlY3RvciBmb3IgcHVzaGluZyBjbG9zZXIgdG8gdGFyZ2V0XHJcblx0ICovXHJcblx0ZG9TZWVrKHRhcmdldCwgc2xvd2luZ1JhZGlvdXMpIHtcclxuXHRcdGxldCBkaXN0YW5jZTtcclxuXHJcblx0XHR0aGlzLmRlc2lyZWRWZWxvY2l0eSA9IHRhcmdldC5jbG9uZSgpLnN1YnRyYWN0KHRoaXMuYm9pZC5wb3NpdGlvbik7XHJcblxyXG5cdFx0ZGlzdGFuY2UgPSB0aGlzLmRlc2lyZWRWZWxvY2l0eS5sZW5ndGgoKTtcclxuXHRcdHRoaXMuZGVzaXJlZFZlbG9jaXR5Lm5vcm1hbGl6ZSgpO1xyXG5cclxuXHRcdGlmKGRpc3RhbmNlIDw9IHNsb3dpbmdSYWRpb3VzKXtcclxuXHRcdFx0dGhpcy5kZXNpcmVkVmVsb2NpdHkubXVsdGlwbHlTY2FsYXIodGhpcy5zZXR0aW5ncy5tYXhWZWxvY2l0eSAqIGRpc3RhbmNlIC8gc2xvd2luZ1JhZGlvdXMpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMuZGVzaXJlZFZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKHRoaXMuc2V0dGluZ3MubWF4VmVsb2NpdHkpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFJldHVybiBmb3JjZVxyXG5cdFx0cmV0dXJuIHRoaXMuZGVzaXJlZFZlbG9jaXR5LmNsb25lKCkuc3VidHJhY3QodGhpcy52ZWxvY2l0eSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBGb2xsb3cgcGF0aCBieSBpbmNyZW1lbnQgdG8gdGhlIG5leHQgbm9kZSBpZiBub2RlIGluc2lkZSBTZXR0aWdzLnBhdGhSYWRpb3VzXHJcblx0ICogQHBhcmFtICB7dmVjdG9yW119IHBhdGggIFZlY3RvciBhcnJheSBvZiB0aGUgcGF0aFxyXG5cdCAqIEByZXR1cm4ge3ZlY3Rvcn0gICAgICAgICBjdXJyZW50IHRhcmdldCBub2RlXHJcblx0ICovXHJcblx0ZG9Gb2xsb3dQYXRoKHBhdGgpe1xyXG5cdFx0bGV0IHRhcmdldCA9IHBhdGhbdGhpcy5jdXJyZW50Tm9kZVBhdGhdO1xyXG5cdFx0aWYodGhpcy5ib2lkLnBvc2l0aW9uLmRpc3RhbmNlKHRhcmdldCkgPD0gdGhpcy5zZXR0aW5ncy5wYXRoUmFkaW91cyAmJiB0aGlzLmN1cnJlbnROb2RlUGF0aCA8IHBhdGgubGVuZ3RoIC0gMSlcclxuXHRcdFx0dGhpcy5jdXJyZW50Tm9kZVBhdGgrKztcclxuXHJcblx0XHRyZXR1cm4gdGFyZ2V0O1xyXG5cdH1cclxuXHJcblx0ZG9Db2xsaXNpb25Bdm9pZGFuY2Uob2JzdGFjbGVzKXtcclxuXHRcdGxldCB0dlNjYWxhciA9IHRoaXMuc2V0dGluZ3MubWF4U2VlQWhlYWQgKiB0aGlzLnZlbG9jaXR5Lmxlbmd0aCgpIC8gdGhpcy5zZXR0aW5ncy5tYXhWZWxvY2l0eSxcclxuXHRcdFx0dHYgPSB0aGlzLnZlbG9jaXR5LmNsb25lKCkubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodHZTY2FsYXIpLFxyXG5cdFx0XHRhaGVhZCA9IHRoaXMuYm9pZC5wb3NpdGlvbi5jbG9uZSgpLmFkZCh0dik7IC8vIEFoZWFkIGlzIHRoZSB2ZWxvY2l0eSB2ZWN0b3IsIGJ1dCBsb25nZXJcclxuXHRcdFx0XHJcblx0XHRsZXQgdGhyZWF0ID0gdGhpcy5tb3N0VGhyZWF0aW5nT2JzdGFjbGUoYWhlYWQsIG9ic3RhY2xlcyk7XHJcblxyXG5cdFx0aWYodGhyZWF0KXtcclxuXHRcdFx0dGhpcy5hdm9pZGFuY2VGb3JjZS54ID0gYWhlYWQueCAtIHRocmVhdC5jZW50ZXIueDtcclxuXHRcdFx0dGhpcy5hdm9pZGFuY2VGb3JjZS55ID0gYWhlYWQueSAtIHRocmVhdC5jZW50ZXIueTtcclxuXHJcblx0XHRcdHRoaXMuYXZvaWRhbmNlRm9yY2Uubm9ybWFsaXplKCkubXVsdGlwbHlTY2FsYXIodGhpcy5zZXR0aW5ncy5tYXhBdm9pZGFuY2VGb3JjZSk7XHJcblx0XHR9ZWxzZSB7XHJcblx0XHRcdHRoaXMuYXZvaWRhbmNlRm9yY2UgPSBuZXcgVmVjdG9yKDAsMCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuYXZvaWRhbmNlRm9yY2U7XHJcblx0fVxyXG4gXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBVcGRhdGUgYm9pZHMgcG9zaXRpb24gYnkgYWRkaW5nIGFsbCB0aGUgZm9yY2VzIHRoYXQgd2FzIHB1c2hlZCB0byB0aGUgc3RlZXJpbmdcclxuXHQgKiBAcGFyYW0gIHtjcmVhdGVqcy50aWNrRXZlbnR9IHRpbWUgR2FtZSBsb29wIHRpbWVcclxuXHQgKiBAcmV0dXJuIHt2b2lkfSAgICAgIFxyXG5cdCAqL1xyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdHRoaXMudHJ1bmNhdGUodGhpcy5zdGVlcmluZywgdGhpcy5zZXR0aW5ncy5tYXhGb3JjZSk7XHJcblx0XHR0aGlzLnN0ZWVyaW5nLm11bHRpcGx5U2NhbGFyKDEuMCAvIHRoaXMuc2V0dGluZ3MubWFzcyk7XHJcblxyXG5cdFx0dGhpcy52ZWxvY2l0eS5hZGQodGhpcy5zdGVlcmluZyk7XHJcblx0XHR0aGlzLnRydW5jYXRlKHRoaXMudmVsb2NpdHksIHRoaXMuc2V0dGluZ3MubWF4VmVsb2NpdHkpO1xyXG5cdFx0dGhpcy52ZWxvY2l0eS5tdWx0aXBseVNjYWxhcih0aW1lLmRlbHRhIC8gMTAwMC4wKTtcclxuXHJcblx0XHR0aGlzLmJvaWQucG9zaXRpb24uYWRkKHRoaXMudmVsb2NpdHkpXHJcblx0fVxyXG59IiwiXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9ic3RhY2xlIHtcclxuXHRjb25zdHJ1Y3RvcihjZW50ZXIpe1xyXG5cdFx0dGhpcy5jZW50ZXIgPSBjZW50ZXI7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuaW1wb3J0IE9ic3RhY2xlIGZyb20gJy4vb2JzdGFjbGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlT2JzdGFjbGUgZXh0ZW5kcyBPYnN0YWNsZSB7XHJcblx0Y29uc3RydWN0b3IocmVjdCl7XHJcblx0XHRzdXBlcihuZXcgVmVjdG9yKHJlY3QueCArIHJlY3Qud2lkdGggLyAyLCByZWN0LnkgKyByZWN0LmhlaWdodCAvIDIpKTtcclxuXHRcdHRoaXMucmVjdCA9IHJlY3Q7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VUaWxlIHtcclxuXHRjb25zdHJ1Y3RvcihyZWN0LCBzZXR0aW5ncykge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cdFx0dGhpcy5yZWN0ID0gcmVjdDtcdFx0XHJcblx0XHR0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3Rvcih0aGlzLnJlY3QueCArIHRoaXMucmVjdC53aWR0aCAvIDIsIHRoaXMucmVjdC55ICsgdGhpcy5yZWN0LmhlaWdodCAvIDIpO1xyXG5cdH1cclxuXHJcblx0Z2V0IGlzV2FsbCgpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy53YWxsOyB9XHJcblx0Z2V0IGlzQ29udmVydGFibGUoKXsgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY29udmVydGFibGU7IH1cclxuXHRnZXQgY2FuQXR0YWNrKCl7IHJldHVybiB0aGlzLnNldHRpbmdzLmNhbkF0dGFjazsgfVxyXG5cclxuXHR1cGRhdGUodGltZSwgdW5pdHMpe1xyXG5cdH1cclxufSIsIlxyXG5pbXBvcnQgR2VuZXJpY1RpbGUgZnJvbSAnLi9nZW5lcmljVGlsZSc7XHJcbmltcG9ydCBUb3dlclRpbGUgZnJvbSAnLi90b3dlclRpbGUnO1xyXG5cclxuY29uc3QgdGlsZUNsYXNzZXMgPSB7XHJcblx0R2VuZXJpY1RpbGUsXHJcblx0VG93ZXJUaWxlXHJcbn07XHJcblxyXG4vKipcclxuICogV3JhcHBlciBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgdGlsZSB0eXBlc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY1RpbGUge1xyXG5cdGNvbnN0cnVjdG9yKGNsYXNzTmFtZSwgLi4uYXJncyl7XHJcblx0XHRyZXR1cm4gbmV3IHRpbGVDbGFzc2VzW2NsYXNzTmFtZV0oLi4uYXJncyk7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBCYXNlVGlsZSBmcm9tICcuL2Jhc2VUaWxlJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdlbmVyaWNUaWxlIGV4dGVuZHMgQmFzZVRpbGUge1xyXG5cdGNvbnN0cnVjdG9yKGRyYXdDb250YWluZXIsIC4uLmFyZ3Mpe1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0XHR0aGlzLnNldHVwR3JhcGhpY3MoZHJhd0NvbnRhaW5lcik7XHJcblx0fVxyXG5cclxuXHRnZXQgY29sb3IoKXsgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY29sb3IgfVxyXG5cdGdldCBib3JkZXJDb2xvcigpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy5ib3JkZXJDb2xvciB9XHJcblxyXG5cdHNldHVwR3JhcGhpY3MoZHJhd0NvbnRhaW5lcil7XHJcblx0XHR0aGlzLnNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XHJcblx0XHRcclxuXHRcdGlmKHRoaXMuYm9yZGVyQ29sb3Ipe1xyXG5cdFx0XHR0aGlzLnNoYXBlLmdyYXBoaWNzLnNldFN0cm9rZVN0eWxlKDEpLmJlZ2luU3Ryb2tlKHRoaXMuYm9yZGVyQ29sb3IpO1xyXG5cdFx0fVxyXG5cclxuIFx0XHR0aGlzLnNoYXBlLmdyYXBoaWNzXHJcbiBcdFx0XHQuYmVnaW5GaWxsKHRoaXMuY29sb3IpXHJcbiBcdFx0XHQuZHJhd1JlY3QodGhpcy5yZWN0LngsIHRoaXMucmVjdC55LCB0aGlzLnJlY3Qud2lkdGgsIHRoaXMucmVjdC5oZWlnaHQpO1xyXG4gXHRcdFx0XHJcblx0XHRkcmF3Q29udGFpbmVyLmFkZENoaWxkKHRoaXMuc2hhcGUpO1xyXG5cdH1cclxufSIsIlxyXG5pbXBvcnQgQmFzZVRpbGUgZnJvbSAnLi9iYXNlVGlsZSc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuXHJcbmltcG9ydCBBbmltYXRpb25NYW5hZ2VyIGZyb20gJy4uL2FuaW1hdGlvbnMvYW5pbWF0aW9uTWFuYWdlcic7XHJcbmltcG9ydCBEeW5hbWljQW5pbWF0aW9uIGZyb20gJy4uL2FuaW1hdGlvbnMvZHluYW1pY0FuaW1hdGlvbic7XHJcblx0XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvd2VyVGlsZSBleHRlbmRzIEJhc2VUaWxlIHtcclxuXHRjb25zdHJ1Y3RvcihkcmF3Q29udGFpbmVyLCAuLi5hcmdzKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3MpO1xyXG5cdFx0dGhpcy5sYXN0U2hvb3QgPSAwLjA7XHJcblx0XHR0aGlzLmFpbUxlbmd0aCA9IHRoaXMucmVjdC53aWR0aCAvIDIuMDtcclxuXHRcdHRoaXMuYWltU2hhcGU7XHJcblxyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyID0gZHJhd0NvbnRhaW5lcjtcclxuXHRcdHRoaXMuc2V0dXBHcmFwaGljcyhkcmF3Q29udGFpbmVyKTtcclxuXHR9XHJcblxyXG5cdGdldCByYW5nZSgpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy5yYW5nZSB8fCAwOyB9XHJcblx0Z2V0IGRhbWFnZSgpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy5kYW1hZ2UgfHwgMDsgfVxyXG5cdGdldCBzaG9vdGluZ0ludGVydmFsKCkgeyByZXR1cm4gdGhpcy5zZXR0aW5ncy5zaG9vdGluZ0ludGVydmFsIHx8IDUwMCB9XHJcblx0Z2V0IHByb2plY3RpbGVBbmltYXRpb24oKSB7IHJldHVybiB0aGlzLnNldHRpbmdzLnByb2plY3RpbGVBbmltYXRpb24gfHwgXCJTaG90QW5pbWF0aW9uXCIgfSBcclxuXHJcblx0c2V0dXBHcmFwaGljcyhkcmF3Q29udGFpbmVyKXtcclxuXHRcdGxldCBiYXNlU2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHRcdGJhc2VTaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwodGhpcy5zZXR0aW5ncy5yZWN0Q29sb3IpLmRyYXdSZWN0KHRoaXMucmVjdC54LCB0aGlzLnJlY3QueSwgdGhpcy5yZWN0LndpZHRoLCB0aGlzLnJlY3QuaGVpZ2h0KTtcclxuIFx0XHRiYXNlU2hhcGUuZ3JhcGhpY3NcclxuIFx0XHRcdFx0XHQuc2V0U3Ryb2tlU3R5bGUoMilcclxuIFx0XHRcdFx0XHQuYmVnaW5GaWxsKHRoaXMuc2V0dGluZ3MuY29sb3IpXHJcbiBcdFx0XHRcdFx0LmRyYXdDaXJjbGUoXHJcbiBcdFx0XHRcdFx0XHR0aGlzLnJlY3QueCArIHRoaXMucmVjdC53aWR0aCAvIDIsIFxyXG4gXHRcdFx0XHRcdFx0dGhpcy5yZWN0LnkgKyB0aGlzLnJlY3QuaGVpZ2h0IC8gMiwgXHJcbiBcdFx0XHRcdFx0XHQodGhpcy5yZWN0LndpZHRoIC8gMikgLSAxKTtcdFxyXG5cclxuIFx0XHR0aGlzLmFpbVNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XHJcblx0XHRkcmF3Q29udGFpbmVyLmFkZENoaWxkKGJhc2VTaGFwZSk7XHJcblx0XHRkcmF3Q29udGFpbmVyLmFkZENoaWxkKHRoaXMuYWltU2hhcGUpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlQWltKHRhcmdldCl7XHJcblx0XHR0aGlzLmFpbVNoYXBlLmdyYXBoaWNzLmNsZWFyKCk7XHJcblxyXG5cdFx0bGV0IHhEaXN0ID0gdGFyZ2V0LnBvc2l0aW9uLnggLSB0aGlzLnBvc2l0aW9uLngsXHJcblx0XHRcdHlEaXN0ID0gdGFyZ2V0LnBvc2l0aW9uLnkgLSB0aGlzLnBvc2l0aW9uLnksXHJcblx0XHRcdGFuZ2xlID0gTWF0aC5hdGFuMigteURpc3QsIHhEaXN0KTtcclxuXHJcblx0XHRpZihhbmdsZSA8IDApXHJcblx0XHRcdGFuZ2xlICs9IDIgKiBNYXRoLlBJO1xyXG5cclxuXHRcdGxldCBhbmdsZVZlYyA9IG5ldyBWZWN0b3IoTWF0aC5jb3MoYW5nbGUpLCAtTWF0aC5zaW4oYW5nbGUpKSxcclxuXHRcdFx0bGluZVRvID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpLmFkZChhbmdsZVZlYy5tdWx0aXBseVNjYWxhcih0aGlzLmFpbUxlbmd0aCkpO1xyXG5cclxuXHRcdHRoaXMuYWltU2hhcGUuZ3JhcGhpY3NcclxuXHRcdFx0LnNldFN0cm9rZVN0eWxlKDIpXHJcblx0XHRcdC5iZWdpblN0cm9rZSh0aGlzLnNldHRpbmdzLmFpbUNvbG9yKVxyXG5cdFx0XHQubW92ZVRvKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KVxyXG5cdFx0XHQubGluZVRvKGxpbmVUby54LCBsaW5lVG8ueSk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUodGltZSwgdW5pdHMpe1xyXG5cdFx0c3VwZXIudXBkYXRlKHRpbWUsIHVuaXRzKTtcclxuXHJcblx0XHRsZXQgY2xvc2VVbml0cyA9IHVuaXRzLmZpbHRlcih1ID0+IHUucG9zaXRpb24gJiYgdS5wb3NpdGlvbi5kaXN0YW5jZSh0aGlzLnBvc2l0aW9uKSA8IHRoaXMucmFuZ2UpO1xyXG5cdFx0aWYoY2xvc2VVbml0cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMudXBkYXRlQWltKGNsb3NlVW5pdHNbMF0pO1xyXG5cclxuXHRcdFx0Ly8gU2hvb3RpbmdcclxuXHRcdFx0dGhpcy5sYXN0U2hvb3QgKz0gdGltZS5kZWx0YTtcclxuXHRcdFx0aWYodGhpcy5sYXN0U2hvb3QgPiB0aGlzLnNob290aW5nSW50ZXJ2YWwpe1xyXG5cdFx0XHRcdGNsb3NlVW5pdHNbMF0uZGFtYWdlZFRha2VuKHRoaXMuZGFtYWdlKTtcclxuXHRcdFx0XHR0aGlzLmxhc3RTaG9vdCAtPSB0aGlzLnNob290aW5nSW50ZXJ2YWw7XHRcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNob290aW5nXCIpO1xyXG5cclxuXHRcdFx0XHRBbmltYXRpb25NYW5hZ2VyLmFkZChuZXcgRHluYW1pY0FuaW1hdGlvbih0aGlzLnByb2plY3RpbGVBbmltYXRpb24sIHRoaXMuZHJhd0NvbnRhaW5lciwgdGhpcy5wb3NpdGlvbi5jbG9uZSgpLCBjbG9zZVVuaXRzWzBdKSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcclxuaW1wb3J0IEFzc2V0cyBmcm9tICcuL2Fzc2V0cyc7XHJcblxyXG5pbXBvcnQgV29ybGQgZnJvbSAnLi93b3JsZCc7XHJcbmltcG9ydCBEeW5hbWljVW5pdCBmcm9tICcuL3VuaXRzL2R5bmFtaWNVbml0JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaXRNYW5hZ2VyIHtcclxuXHRjb25zdHJ1Y3RvcihzdGFnZSl7XHJcblx0XHR0aGlzLnN0YWdlID0gc3RhZ2U7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gQXNzZXRzLmdldChcInVuaXRzXCIpO1xyXG5cdFx0dGhpcy51bml0cyA9IFtdO1xyXG5cdFx0dGhpcy53b3JsZE9ic3RhY2xlcyA9IG51bGw7XHJcblxyXG5cdFx0dGhpcy5jdXJyZW50V2F2ZSA9IDA7XHJcblx0XHR0aGlzLm9uZ29pbmdXYXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLnNlbnRXYXZlID0gZmFsc2U7XHJcblx0XHR0aGlzLndhdmVQYXRoID0gW107XHJcblxyXG5cdFx0R2FtZS53b3JsZC5vbihXb3JsZC5FdmVudHMuV09STERfQ0hBTkdFLCB0aGlzLm9uV29ybGRDaGFuZ2VkLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpe1xyXG5cdFx0dGhpcy5wcmVwYXJlV2F2ZSgpOyAvLyBTdGFydCBzZW5kaW5nIHdhdmVzXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaWxsIHNlbmQgYSB3YXZlIGJhc2VkIG9uIHRoZSBzZXR0aW5ncyBpbiB1bml0cy5qc29uXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRwcmVwYXJlV2F2ZSgpe1xyXG5cdFx0aWYodGhpcy5vbmdvaW5nV2F2ZSlcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBzZW50IGEgd2F2ZVwiKTtcclxuXHJcblx0XHRpZih0aGlzLmN1cnJlbnRXYXZlID09IHRoaXMuc2V0dGluZ3Mud2F2ZXMubGVuZ3RoKXtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJObyBtb3JlIHdhdmVzIVwiKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB3YXZlID0gdGhpcy5zZXR0aW5ncy53YXZlc1t0aGlzLmN1cnJlbnRXYXZlXTtcclxuXHRcdGNvbnNvbGUubG9nKFwiU3RhcnRpbmcgd2F2ZSBcIiArICh0aGlzLmN1cnJlbnRXYXZlICsgMSkpO1xyXG5cdFx0dGhpcy5vbmdvaW5nV2F2ZSA9IHRydWU7XHJcblx0XHR0aGlzLnNlbmRVbml0KHdhdmUsIDApO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU2VuZGluZyB1bml0cyBpbiBhIHJlY3Vyc2lvbiBtZXRob2RcclxuXHQgKiBAcGFyYW0gIHtvYmplY3R9IHdhdmUgICAgICBTZXR0aW5ncyBmcm9tIHVuaXRzLmpzb25cclxuXHQgKiBAcGFyYW0gIHtpbnR9IFx0XHRcdCAgU2VudFVuaXRzIE51bWJlciBvZiBzZW50IHVuaXRzXHJcblx0ICogQHJldHVybiB7dm9pZH0gICAgICAgICAgIFxyXG5cdCAqL1xyXG5cdHNlbmRVbml0KHdhdmUsIHNlbnRVbml0cyl7XHJcblx0XHRpZihzZW50VW5pdHMgPCB3YXZlLmxlbmd0aCl7XHJcblx0XHRcdHRoaXMudW5pdHMucHVzaCh0aGlzLmNyZWF0ZVVuaXQod2F2ZSkpO1xyXG5cdFx0XHRzZW50VW5pdHMrKztcclxuXHRcdFx0c2V0VGltZW91dCh0aGlzLnNlbmRVbml0LmJpbmQodGhpcyksIHRoaXMuc2V0dGluZ3MudW5pdEludGVydmFsTXMsIHdhdmUsIHNlbnRVbml0cyk7XHJcblx0XHR9IGVsc2V7XHJcblx0XHRcdHRoaXMuc2VudFdhdmUgPSB0cnVlO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlVW5pdChjdXJyZW50V2F2ZSl7XHJcblx0XHRyZXR1cm4gbmV3IER5bmFtaWNVbml0KGN1cnJlbnRXYXZlLnR5cGUsIHRoaXMuc3RhZ2UsIHRoaXMud2F2ZVBhdGgubWFwKHMgPT4gcy5jbG9uZSgpKSwgY3VycmVudFdhdmUucHJvcHMpO1xyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvKipcclxuXHQgKiBFdmVudCB0aGF0IHRoZSB3b3JsZCBoYXMgYmVlbiBjaGFuZ2VkLCBhIG5ldyB0b3dlciBmb3IgZXhhbXBsZVxyXG5cdCAqIEBwYXJhbSAge1dvcmxkfSB3b3JsZCBcclxuXHQgKiBAcmV0dXJuIHt2b2lkfSAgICAgICBcclxuXHQgKi9cclxuXHRvbldvcmxkQ2hhbmdlZChldmVudCl7XHJcblx0XHRsZXQgd29ybGQgPSBldmVudC5kYXRhO1xyXG5cdFx0Ly8gVXBkYXRlIHRoZSBwYXRoIGZvciB0aGUgd2F2ZVxyXG5cdFx0dGhpcy53YXZlUGF0aCA9IHdvcmxkLmNhbGN1bGF0ZVBhdGgod29ybGQuc3RhcnQsIHdvcmxkLmdvYWwpO1xyXG5cdFx0dGhpcy53b3JsZE9ic3RhY2xlcyA9IHdvcmxkLm9ic3RhY2xlcztcclxuXHJcblx0XHQvLyBVcGRhdGUgYWxsIHRoZSB1bml0cyBwYXRoXHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudW5pdHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bGV0IHBhdGggPSB3b3JsZC5jYWxjdWxhdGVQYXRoKHdvcmxkLmdyaWQuZ2V0QXJyYXlQb3ModGhpcy51bml0c1tpXS5wb3NpdGlvbiksIHdvcmxkLmdvYWwpO1xyXG5cdFx0XHRpZihwYXRoICYmIHBhdGgubGVuZ3RoID4gMClcclxuXHRcdFx0XHR0aGlzLnVuaXRzW2ldLnBhdGggPSBwYXRoO1x0XHRcdFxyXG5cdFx0fTtcclxuXHR9XHJcblxyXG5cclxuXHJcblxyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdGZvciAodmFyIGkgPSB0aGlzLnVuaXRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGlmKCF0aGlzLnVuaXRzW2ldLmFsaXZlKXtcclxuXHRcdFx0XHR0aGlzLnVuaXRzW2ldLmRlc3Ryb3koKTtcclxuXHRcdFx0XHR0aGlzLnVuaXRzLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMudW5pdHNbaV0udXBkYXRlKHRpbWUsIHRoaXMud29ybGRPYnN0YWNsZXMpO1xyXG5cdFx0fTtcclxuXHJcblx0XHRpZih0aGlzLnVuaXRzLmxlbmd0aCA8IDEgJiYgdGhpcy5zZW50V2F2ZSl7XHJcblx0XHRcdHRoaXMuY3VycmVudFdhdmUrKztcclxuXHRcdFx0dGhpcy5vbmdvaW5nV2F2ZSA9IGZhbHNlO1xyXG5cdFx0XHR0aGlzLnNlbnRXYXZlID0gZmFsc2U7XHJcblx0XHRcdHNldFRpbWVvdXQodGhpcy5wcmVwYXJlV2F2ZS5iaW5kKHRoaXMpLCB0aGlzLnNldHRpbmdzLndhdmVJbnRlcnZhbE1zKTtcclxuXHRcdH1cclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi4vZ2FtZSc7XHJcblxyXG5pbXBvcnQgU3RlZXJpbmcgZnJvbSAnLi4vaGVscGVycy9zdGVlcmluZyc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhc2VVbml0IHtcclxuXHRjb25zdHJ1Y3RvcihzZXR0aW5ncykge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IHNldHRpbmdzO1xyXG5cdFx0dGhpcy5oZWFsdGggPSBzZXR0aW5ncy5oZWFsdGg7XHJcblx0XHR0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcigwLDApO1xyXG5cdFx0dGhpcy5fcmVjdCA9IG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHNldHRpbmdzLndpZHRoLCBzZXR0aW5ncy5oZWlnaHQpO1x0XHRcclxuXHJcblx0XHR0aGlzLnN0ZWVyaW5nID0gbmV3IFN0ZWVyaW5nKHRoaXMsIHNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cdGdldCBhbGl2ZSgpIHsgcmV0dXJuIHRoaXMuaGVhbHRoID4gMDsgfVxyXG5cdGdldCByZWN0KCkgeyBcclxuXHRcdHRoaXMuX3JlY3QueCA9IHRoaXMucG9zaXRpb24ueDtcclxuXHRcdHRoaXMuX3JlY3QueSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHRcdHJldHVybiB0aGlzLl9yZWN0O1xyXG5cdH1cclxuXHJcblx0ZGFtYWdlZFRha2VuKGRhbWFnZSkgeyBcclxuXHRcdHRoaXMuaGVhbHRoIC09IGRhbWFnZTsgXHJcblxyXG5cdFx0aWYoIXRoaXMuYWxpdmUpIHtcclxuXHRcdFx0R2FtZS5yZWNpZXZlQ2FzaCh0aGlzLnNldHRpbmdzLndvcnRoIHx8IDUwKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRlc3Ryb3koKXsgdGhpcy5oZWFsdGggPSAwOyB9XHRcclxuXHR1cGRhdGUodGltZSl7fVxyXG59IiwiXHJcbmltcG9ydCBHYW1lIGZyb20gJy4uL2dhbWUnO1xyXG5cclxuaW1wb3J0IEJhc2VVbml0IGZyb20gJy4vYmFzZVVuaXQnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJ3ZpY3Rvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDcmVlcCBleHRlbmRzIEJhc2VVbml0IHtcclxuXHRjb25zdHJ1Y3RvcihkcmF3Q29udGFpbmVyLCBwYXRoLCBzZXR0aW5ncyl7XHJcblx0XHRzdXBlcihzZXR0aW5ncyk7XHRcclxuXHRcdHRoaXMuX3BhdGggPSBwYXRoO1xyXG5cdFx0dGhpcy5wb3NpdGlvbiA9IHBhdGhbMF0uY2xvbmUoKTtcclxuXHRcdHRoaXMuZ29hbCA9IHBhdGhbcGF0aC5sZW5ndGggLSAxXTtcclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lciA9IGRyYXdDb250YWluZXI7XHJcblxyXG5cdFx0dGhpcy5zZXR1cEdyYXBoaWNzKCk7XHJcblx0fVxyXG5cclxuXHRzZXQgcGF0aCh2YWx1ZSl7XHJcblx0XHR0aGlzLnN0ZWVyaW5nLnJlc2V0UGF0aCgpO1xyXG5cdFx0dGhpcy5fcGF0aCA9IHZhbHVlO1xyXG5cdH1cclxuXHRcclxuXHRzZXR1cEdyYXBoaWNzKCl7XHJcblx0XHR0aGlzLnNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XHJcbiBcdFx0dGhpcy5zaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwoXCIjQzQ0NzQxXCIpLmRyYXdDaXJjbGUoMCwgMCwgdGhpcy5zZXR0aW5ncy53aWR0aCAvIDIpO1xyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyLmFkZENoaWxkKHRoaXMuc2hhcGUpO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveSgpe1xyXG5cdFx0c3VwZXIuZGVzdHJveSgpO1xyXG5cdFx0dGhpcy5kcmF3Q29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMuc2hhcGUpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKHRpbWUsIG9ic3RhY2xlcykge1xyXG5cdFx0aWYodGhpcy5wb3NpdGlvbi5kaXN0YW5jZSh0aGlzLmdvYWwpIDw9IDIpe1xyXG5cdFx0XHR0aGlzLmRlc3Ryb3koKTtcclxuXHRcdFx0R2FtZS5sb3NlTGlmZSgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuc3RlZXJpbmcuZm9sbG93UGF0aCh0aGlzLl9wYXRoKTtcclxuXHRcdC8vdGhpcy5zdGVlcmluZy5jb2xsaXNpb25Bdm9pZGFuY2Uob2JzdGFjbGVzKTtcclxuXHRcdHRoaXMuc3RlZXJpbmcudXBkYXRlKHRpbWUpO1xyXG5cclxuXHRcdHRoaXMuc2hhcGUueCA9IHRoaXMucG9zaXRpb24ueDtcclxuXHRcdHRoaXMuc2hhcGUueSA9IHRoaXMucG9zaXRpb24ueTtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IENyZWVwIGZyb20gJy4vY3JlZXAnO1xyXG5cclxuY29uc3QgdW5pdENsYXNzZXMgPSB7XHJcblx0Q3JlZXBcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcmFwcGVyIGZvciBhbGwgdGhlIGRpZmZlcmVudCB1bml0IHR5cGVzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljVW5pdCB7XHJcblx0Y29uc3RydWN0b3IoY2xhc3NOYW1lLCAuLi5hcmdzKXtcclxuXHRcdHJldHVybiBuZXcgdW5pdENsYXNzZXNbY2xhc3NOYW1lXSguLi5hcmdzKTtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IGtleU1pcnJvciBmcm9tICdrZXlNaXJyb3InO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJ3ZpY3Rvcic7XHJcblxyXG5pbXBvcnQgR2FtZSwgeyBrZXlOYW1lcyB9IGZyb20gJy4vZ2FtZSc7XHJcbmltcG9ydCBBc3NldHMgZnJvbSAnLi9hc3NldHMnO1xyXG5cclxuaW1wb3J0IEdpcmQgZnJvbSAnLi9ncmlkJztcclxuaW1wb3J0IER5bmFtaWNUaWxlIGZyb20gJy4vdGlsZXMvZHluYW1pY1RpbGUnO1xyXG5pbXBvcnQgUmVjdGFuZ2xlT2JzdGFjbGUgZnJvbSAnLi9vYnN0YWNsZXMvcmVjdGFuZ2xlT2JzdGFjbGUnO1xyXG5cclxuaW1wb3J0IEFTdGFyIGZyb20gJy4vaGVscGVycy9hU3Rhcic7XHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2hlbHBlcnMvYXJyYXlIZWxwZXInO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdvcmxkIGV4dGVuZHMgY3JlYXRlanMuRXZlbnREaXNwYXRjaGVyIHtcdFxyXG5cdGNvbnN0cnVjdG9yKHN0YWdlKXtcdFx0XHJcblx0XHRzdXBlcigpO1xyXG5cclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBBc3NldHMuZ2V0KFwid29ybGRcIik7XHJcblx0XHR0aGlzLm1hcCA9IEFycmF5SGVscGVyLnJvdGF0ZSh0aGlzLnNldHRpbmdzLm1hcCk7XHJcblx0XHR0aGlzLmdyaWQgPSBbXTtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHRcdHRoaXMuc3RhZ2Uub24oJ2NsaWNrJywgdGhpcy5vbldvcmxkQ2xpY2suYmluZCh0aGlzKSk7XHJcblxyXG5cdFx0dGhpcy5zdGFydCA9IG51bGw7IC8vIFN0YXJ0IHBvc2l0aW9uIHdoZXJlIHRoZSB1bml0cyB3aWxsIGNvbWUgZnJvbVxyXG5cdFx0dGhpcy5nb2FsID0gbnVsbDsgLy8gVGhlIHBvc2l0aW9uIHdoZXJlIHRoZSB1bml0cyBhcmUgdHJ5aW5nIHRvIGdvXHJcblx0XHR0aGlzLm1hcEl0ZXJhdG9yKCh4LCB5LCB0aWxlVHlwZSkgPT4ge1xyXG5cdFx0XHRpZih0aWxlVHlwZS5zdGFydClcclxuXHRcdFx0XHR0aGlzLnN0YXJ0ID0ge3g6eCwgeTp5fTtcclxuXHJcblx0XHRcdGlmKHRpbGVUeXBlLmdvYWwpXHJcblx0XHRcdFx0dGhpcy5nb2FsID0ge3g6eCwgeTp5fTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBFdmVudHMoKSB7XHJcblx0XHRyZXR1cm4ga2V5TWlycm9yKHtcclxuXHRcdFx0V09STERfQ0hBTkdFOiBudWxsLFxyXG5cdFx0XHRQTEFDRURfVE9XRVI6IG51bGxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0IHRpbGVTaXplKCl7IHJldHVybiB0aGlzLnNldHRpbmdzLnRpbGVTaXplOyB9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFZlY3RvciBzaXplIG9mIGhhbGYgdGhlIHRpbGUgc2l6ZVxyXG5cdCAqIEByZXR1cm4ge1ZlY3Rvcn0gXHJcblx0ICovXHJcblx0Z2V0IGhhbGZUaWxlKCl7IHJldHVybiBuZXcgVmVjdG9yKHRoaXMudGlsZVNpemUgLyAyLCB0aGlzLnRpbGVTaXplIC8gMik7IH1cclxuXHJcblx0Z2V0IG9ic3RhY2xlcygpe1xyXG5cdFx0bGV0IGFyciA9IFtdO1xyXG5cclxuXHRcdHRoaXMubWFwSXRlcmF0b3IoKHgsIHksIHRpbGVUeXBlKSA9PiB7XHJcblx0XHRcdGlmKHRpbGVUeXBlLndhbGwpXHJcblx0XHRcdFx0YXJyLnB1c2gobmV3IFJlY3RhbmdsZU9ic3RhY2xlKHRoaXMuZ3JpZC50aWxlc1t4XVt5XS5yZWN0KSk7XHJcblx0XHR9KVxyXG5cclxuXHRcdHJldHVybiBhcnI7XHJcblx0fVxyXG5cclxuXHRpbml0KCl7XHJcblx0XHR0aGlzLmdyaWQgPSBuZXcgR2lyZChcclxuXHRcdFx0dGhpcy5tYXAubGVuZ3RoLCBcclxuXHRcdFx0dGhpcy5tYXBbMF0ubGVuZ3RoLCBcclxuXHRcdFx0dGhpcy50aWxlU2l6ZSxcclxuXHRcdFx0dGhpcy50aWxlSnVkZ2VyLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHRoaXMucmFpc2VFdmVudChXb3JsZC5FdmVudHMuV09STERfQ0hBTkdFLCB0aGlzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlY2lkZXMgYW5kIGNyZWF0ZSB0aGUgdGlsZVxyXG5cdCAqIEBwYXJhbSAge2ludH0gZ3JpZFggWCBpbiBncmlkIGFycmF5XHJcblx0ICogQHBhcmFtICB7aW50fSBncmlkWSBZIGluIGdyaWQgYXJyYXlcclxuXHQgKiBAcmV0dXJuIHtUaWxlfSAgICAgIFxyXG5cdCAqL1xyXG5cdHRpbGVKdWRnZXIoZ3JpZFgsIGdyaWRZKSB7XHJcblx0XHRsZXQgZ3JpZFBvcyA9IHsgeDogZ3JpZFgsIHk6IGdyaWRZIH07XHJcblxyXG5cdFx0Ly8gTWFwIGNvbnRhaW5zIHdoaWNoIHRpbGUgdHlwZSBpdCBpcyAxLDIsMyBldGMuXHJcblx0XHRsZXQgdHlwZU51bWJlciA9IHRoaXMubWFwW2dyaWRYXVtncmlkWV0udG9TdHJpbmcoKTtcclxuXHRcdFxyXG5cdFx0Ly8gU2V0cyB0aGUgdGlsZSB0eXBlIG9uIHRoZSBncmlkIHBvc2l0aW9uXHJcblx0XHRyZXR1cm4gdGhpcy5jcmVhdGVUaWxlKHR5cGVOdW1iZXIsIGdyaWRQb3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIHRpbGUgYmFzZWQgb24gdHlwZVxyXG5cdCAqIEBwYXJhbSAge2ludH0gdHlwZU51bWJlclx0ICAgV2hpY2ggdGlsZSB0eXBlIG51bWJlciAxLDIsMyBldGNcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IGdyaWRQb3MgICAgeCAmIHkgaW4gdGhlIGdyaWQgYXJyYXlcclxuXHQgKiBAcmV0dXJuIHtEeW5hbWljVGlsZX0gICAgICAgICAgICBcclxuXHQgKi9cclxuXHRjcmVhdGVUaWxlKHR5cGVOdW1iZXIsIGdyaWRQb3Mpe1xyXG5cdFx0bGV0IHJlY3QgPSBuZXcgY3JlYXRlanMuUmVjdGFuZ2xlKFxyXG5cdFx0XHRncmlkUG9zLnggKiB0aGlzLnRpbGVTaXplLCBcclxuXHRcdFx0Z3JpZFBvcy55ICogdGhpcy50aWxlU2l6ZSwgXHJcblx0XHRcdHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpLFxyXG5cdFx0XHR0aWxlU2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzLnRpbGVUeXBlc1t0eXBlTnVtYmVyLnRvU3RyaW5nKCldO1xyXG5cclxuXHRcdHJldHVybiBuZXcgRHluYW1pY1RpbGUoXHJcblx0XHRcdHRpbGVTZXR0aW5ncy50eXBlLCBcclxuXHRcdFx0dGhpcy5zdGFnZSxcclxuXHRcdFx0cmVjdCxcclxuXHRcdFx0dGlsZVNldHRpbmdzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNldHMgYm90aCB0aGUgZ3JpZCB0aWxlIG9iamVjdCBhbmQgY2hhbmdlIHRoZSBtYXAgdG8gdGhlIHNwZWNpZmllZCB0eXBlTnVtYmVyXHJcblx0ICogQHBhcmFtIHt2ZWN0b3J9IGdyaWRQb3MgICAgeCAmIHkgaW4gdGhlIGdyaWQgYXJyYXlcclxuXHQgKiBAcGFyYW0ge2ludH0gdHlwZU51bWJlciAgICBXaGljaCB0aWxlIHR5cGUgbnVtYmVyIDEsMiwzIGV0Y1xyXG5cdCAqL1xyXG5cdHNldFRpbGUoZ3JpZFBvcywgdHlwZU51bWJlcil7XHJcblx0XHQvLyBTZXQgdGhlIG1hcCBudW1iZXIuIFdpdGggdGhpcyB3ZSBmb2xsb3cgd2hpY2ggdHlwZSBvZiB0aWxlIGl0IGlzLlxyXG5cdFx0dGhpcy5tYXBbZ3JpZFBvcy54XVtncmlkUG9zLnldID0gcGFyc2VJbnQodHlwZU51bWJlcikgfHwgdHlwZU51bWJlcjtcclxuXHJcblx0XHQvLyBDaG9vc2UgdGlsZSB0eXBlIGJhc2VkIG9uIGpzb24gc2V0dGluZ3NcclxuXHRcdHRoaXMuZ3JpZC50aWxlc1tncmlkUG9zLnhdW2dyaWRQb3MueV0gPSB0aGlzLmNyZWF0ZVRpbGUodHlwZU51bWJlciwgZ3JpZFBvcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDYWxjdWxhdGVzIHBhdGggYmV0d2VlbiBzdGFydCBhbmQgZ29hbFxyXG5cdCAqIEBwYXJhbSAge3ZlY3Rvcn0gc3RhcnQgIEdyaWQgcG9zdGlvblxyXG5cdCAqIEBwYXJhbSAge3ZlY3Rvcn0gZ29hbCAgIEdyaWQgcG9zdGlvblxyXG5cdCAqIEByZXR1cm4ge3ZlY3RvcltdfSAgICAgIEFycmF5IG9mIHNjcmVlbiB2ZWN0b3JcclxuXHQgKi9cclxuXHRjYWxjdWxhdGVQYXRoKHN0YXJ0LCBnb2FsKXtcclxuXHRcdGxldCBub2RlcyA9IHRoaXMuZ3JpZC5jcmVhdGVBU3Rhck5vZGVzKCk7XHJcblx0XHRyZXR1cm4gQVN0YXIuc2VhcmNoKG5vZGVzLCBub2Rlc1tzdGFydC54XVtzdGFydC55XSwgbm9kZXNbZ29hbC54XVtnb2FsLnldKS5tYXAobiA9PiBuLnZlY3Rvcik7XHJcblx0fVxyXG5cclxuXHRtYXBJdGVyYXRvcihmdW5jKXtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5tYXAubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLm1hcFswXS5sZW5ndGg7IGorKykge1xyXG5cclxuXHRcdFx0XHRsZXQgdHlwZU51bWJlciA9IHRoaXMubWFwW2ldW2pdLFxyXG5cdFx0XHRcdFx0dGlsZVR5cGUgPSB0aGlzLnNldHRpbmdzLnRpbGVUeXBlc1t0eXBlTnVtYmVyLnRvU3RyaW5nKCldO1xyXG5cclxuXHRcdFx0XHRmdW5jKGksIGosIHRpbGVUeXBlKTtcclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHRyYWlzZUV2ZW50KG5hbWUsIGRhdGEpe1xyXG5cdFx0bGV0IGV2ZW50ID0gbmV3IGNyZWF0ZWpzLkV2ZW50KG5hbWUpO1xyXG5cdFx0ZXZlbnQuZGF0YSA9IGRhdGE7XHJcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8vID09PT0gRVZFTlRTID09PT1cclxuXHRcclxuXHRvbldvcmxkQ2xpY2soY2xpY2spIHtcclxuXHRcdGxldCBjbGlja1BvcyA9IHRoaXMuc3RhZ2UuZ2xvYmFsVG9Mb2NhbChjbGljay5zdGFnZVgsIGNsaWNrLnN0YWdlWSksXHJcblx0XHRcdGdyaWRQb3MgPSB0aGlzLmdyaWQuZ2V0QXJyYXlQb3MoY2xpY2tQb3MpLFxyXG5cdFx0XHRjbGlja2VkVGlsZSA9IHRoaXMuZ3JpZC50aWxlc1tncmlkUG9zLnhdW2dyaWRQb3MueV07XHJcblx0XHRcdFxyXG5cdFx0aWYoY2xpY2tlZFRpbGUuaXNDb252ZXJ0YWJsZSAmJiBHYW1lLmRvY2suc2VsZWN0ZWRUb3dlciAhPSBudWxsICYmIEdhbWUuYnV5aW5nVG93ZXIoR2FtZS5kb2NrLnNlbGVjdGVkVG93ZXIucHJpY2UgfHwgMTAwKSkge1x0XHRcdFxyXG5cdFx0XHR0aGlzLnNldFRpbGUoZ3JpZFBvcywgR2FtZS5kb2NrLnNlbGVjdGVkVG93ZXIubmFtZSk7XHJcblx0XHRcdHRoaXMucmFpc2VFdmVudChXb3JsZC5FdmVudHMuV09STERfQ0hBTkdFLCB0aGlzKTtcclxuXHJcblx0XHRcdGlmKEdhbWUua2V5c1trZXlOYW1lcy5zaGlmdF0gIT0gdHJ1ZSl7XHJcblx0XHRcdFx0R2FtZS5kb2NrLnNlbGVjdGVkVG93ZXIgPSBudWxsO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHJcblxyXG5cdC8vID09PT0gR0FNRSBMT09QUyA9PT09XHJcblxyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdGZvciAodmFyIGkgPSB0aGlzLmdyaWQudGlsZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0Zm9yICh2YXIgaiA9IHRoaXMuZ3JpZC50aWxlc1tpXS5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xyXG5cdFx0XHRcdHRoaXMuZ3JpZC50aWxlc1tpXVtqXS51cGRhdGUodGltZSwgR2FtZS51bml0TWFuYWdlci51bml0cyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGRyYXcoc3RhZ2UsIHRpbWUpe1xyXG5cdH1cclxufSJdfQ==
