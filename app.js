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

var _steering = require("../helpers/steering");

var _steering2 = _interopRequireDefault(_steering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shot = function () {
	function Shot(drawContainer, position, target) {
		_classCallCheck(this, Shot);

		this.steering = new _steering2.default(this, { maxVelocity: 4.6 * 1000, mass: 15 });
		this.position = position;
		this.target = target;
		this.drawContainer = drawContainer;

		this.setupGraphics();
	}

	_createClass(Shot, [{
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

	return Shot;
}();

exports.default = Shot;

},{"../helpers/steering":13}],5:[function(require,module,exports){
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

},{"./assets":6,"./game":8,"victor":2}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
						types.push({ name: prop, settings: worldSettings.tileTypes[prop] });
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
			    text = new createjs.Text(tileType.name, "20px Arial", this.colors["greyWhite"]),
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

},{"./assets":6,"./game":8,"./grid":9,"./helpers/arrayHelper":11,"keyMirror":1,"victor":2}],8:[function(require,module,exports){
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

},{"./animations/animationManager":3,"./assets":6,"./dock":7,"./unitManager":20,"./world":24}],9:[function(require,module,exports){
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

},{"./helpers/mathHelper":12,"victor":2}],10:[function(require,module,exports){
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

},{"./arrayHelper":11}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"victor":2}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"./obstacle":14,"victor":2}],16:[function(require,module,exports){
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

},{"victor":2}],17:[function(require,module,exports){
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

},{"./genericTile":18,"./towerTile":19}],18:[function(require,module,exports){
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

},{"./baseTile":16}],19:[function(require,module,exports){
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

var _shot = require('../animations/shot');

var _shot2 = _interopRequireDefault(_shot);

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

					_animationManager2.default.add(new _shot2.default(this.drawContainer, this.position.clone(), closeUnits[0]));
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
	}]);

	return TowerTile;
}(_baseTile2.default);

exports.default = TowerTile;

},{"../animations/animationManager":3,"../animations/shot":4,"./baseTile":16,"victor":2}],20:[function(require,module,exports){
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

},{"./assets":6,"./game":8,"./units/dynamicUnit":23,"./world":24}],21:[function(require,module,exports){
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

},{"../game":8,"../helpers/steering":13,"victor":2}],22:[function(require,module,exports){
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

},{"../game":8,"./baseUnit":21,"victor":2}],23:[function(require,module,exports){
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

},{"./creep":22}],24:[function(require,module,exports){
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

},{"./assets":6,"./game":8,"./grid":9,"./helpers/aStar":10,"./helpers/arrayHelper":11,"./obstacles/rectangleObstacle":15,"./tiles/dynamicTile":17,"keyMirror":1,"victor":2}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMva2V5TWlycm9yL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3ZpY3Rvci9pbmRleC5qcyIsInNyY1xcYW5pbWF0aW9uc1xcYW5pbWF0aW9uTWFuYWdlci5qcyIsInNyY1xcYW5pbWF0aW9uc1xcc2hvdC5qcyIsInNyY1xcYXBwLmpzIiwic3JjXFxhc3NldHMuanMiLCJzcmNcXGRvY2suanMiLCJzcmNcXGdhbWUuanMiLCJzcmNcXGdyaWQuanMiLCJzcmNcXGhlbHBlcnNcXGFTdGFyLmpzIiwic3JjXFxoZWxwZXJzXFxhcnJheUhlbHBlci5qcyIsInNyY1xcaGVscGVyc1xcbWF0aEhlbHBlci5qcyIsInNyY1xcaGVscGVyc1xcc3RlZXJpbmcuanMiLCJzcmNcXG9ic3RhY2xlc1xcb2JzdGFjbGUuanMiLCJzcmNcXG9ic3RhY2xlc1xccmVjdGFuZ2xlT2JzdGFjbGUuanMiLCJzcmNcXHRpbGVzXFxiYXNlVGlsZS5qcyIsInNyY1xcdGlsZXNcXGR5bmFtaWNUaWxlLmpzIiwic3JjXFx0aWxlc1xcZ2VuZXJpY1RpbGUuanMiLCJzcmNcXHRpbGVzXFx0b3dlclRpbGUuanMiLCJzcmNcXHVuaXRNYW5hZ2VyLmpzIiwic3JjXFx1bml0c1xcYmFzZVVuaXQuanMiLCJzcmNcXHVuaXRzXFxjcmVlcC5qcyIsInNyY1xcdW5pdHNcXGR5bmFtaWNVbml0LmpzIiwic3JjXFx3b3JsZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFVLEtBQVYsQ0FBZ0IsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUMsS0FBSyxDQUE5QyxFQUFpRCxHQUFqRCxFQUFzRDtBQUNyRCxTQUFLLElBQUksSUFBSSxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLENBQWhCLEVBQW1CLE1BQW5CLEdBQTRCLENBQXpDLEVBQTRDLEtBQUssQ0FBakQsRUFBb0QsR0FBcEQsRUFBeUQ7QUFDeEQsVUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixDQUFoQixFQUFtQixDQUFuQixFQUFzQixNQUF0QixDQUE2QixJQUE3QixFQUFtQyxlQUFLLFdBQUwsQ0FBaUIsS0FBcEQ7QUFDQTtBQUNEO0FBQ0Q7Ozt1QkFFSSxLLEVBQU8sSSxFQUFLLENBQ2hCOzs7c0JBMUlhO0FBQUUsVUFBTyxLQUFLLFFBQUwsQ0FBYyxRQUFyQjtBQUFnQzs7Ozs7Ozs7O3NCQU1sQztBQUFFLFVBQU8scUJBQVcsS0FBSyxRQUFMLEdBQWdCLENBQTNCLEVBQThCLEtBQUssUUFBTCxHQUFnQixDQUE5QyxDQUFQO0FBQTBEOzs7c0JBRTNEO0FBQUE7O0FBQ2QsT0FBSSxNQUFNLEVBQVY7O0FBRUEsUUFBSyxXQUFMLENBQWlCLFVBQUMsQ0FBRCxFQUFJLENBQUosRUFBTyxRQUFQLEVBQW9CO0FBQ3BDLFFBQUcsU0FBUyxJQUFaLEVBQ0MsSUFBSSxJQUFKLENBQVMsZ0NBQXNCLE9BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsQ0FBaEIsRUFBbUIsQ0FBbkIsRUFBc0IsSUFBNUMsQ0FBVDtBQUNELElBSEQ7O0FBS0EsVUFBTyxHQUFQO0FBQ0E7OztzQkF4Qm1CO0FBQ25CLFVBQU8seUJBQVU7QUFDaEIsa0JBQWMsSUFERTtBQUVoQixrQkFBYztBQUZFLElBQVYsQ0FBUDtBQUlBOzs7O0VBMUJpQyxTQUFTLGU7O2tCQUF2QixLIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtMjAxNCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBDb25zdHJ1Y3RzIGFuIGVudW1lcmF0aW9uIHdpdGgga2V5cyBlcXVhbCB0byB0aGVpciB2YWx1ZS5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgIHZhciBDT0xPUlMgPSBrZXlNaXJyb3Ioe2JsdWU6IG51bGwsIHJlZDogbnVsbH0pO1xuICogICB2YXIgbXlDb2xvciA9IENPTE9SUy5ibHVlO1xuICogICB2YXIgaXNDb2xvclZhbGlkID0gISFDT0xPUlNbbXlDb2xvcl07XG4gKlxuICogVGhlIGxhc3QgbGluZSBjb3VsZCBub3QgYmUgcGVyZm9ybWVkIGlmIHRoZSB2YWx1ZXMgb2YgdGhlIGdlbmVyYXRlZCBlbnVtIHdlcmVcbiAqIG5vdCBlcXVhbCB0byB0aGVpciBrZXlzLlxuICpcbiAqICAgSW5wdXQ6ICB7a2V5MTogdmFsMSwga2V5MjogdmFsMn1cbiAqICAgT3V0cHV0OiB7a2V5MToga2V5MSwga2V5Mjoga2V5Mn1cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtvYmplY3R9XG4gKi9cbnZhciBrZXlNaXJyb3IgPSBmdW5jdGlvbihvYmopIHtcbiAgdmFyIHJldCA9IHt9O1xuICB2YXIga2V5O1xuICBpZiAoIShvYmogaW5zdGFuY2VvZiBPYmplY3QgJiYgIUFycmF5LmlzQXJyYXkob2JqKSkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2tleU1pcnJvciguLi4pOiBBcmd1bWVudCBtdXN0IGJlIGFuIG9iamVjdC4nKTtcbiAgfVxuICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICBpZiAoIW9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgcmV0W2tleV0gPSBrZXk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ga2V5TWlycm9yO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gVmljdG9yO1xuXG4vKipcbiAqICMgVmljdG9yIC0gQSBKYXZhU2NyaXB0IDJEIHZlY3RvciBjbGFzcyB3aXRoIG1ldGhvZHMgZm9yIGNvbW1vbiB2ZWN0b3Igb3BlcmF0aW9uc1xuICovXG5cbi8qKlxuICogQ29uc3RydWN0b3IuIFdpbGwgYWxzbyB3b3JrIHdpdGhvdXQgdGhlIGBuZXdgIGtleXdvcmRcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gVmljdG9yKDQyLCAxMzM3KTtcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBWYWx1ZSBvZiB0aGUgeCBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0geSBWYWx1ZSBvZiB0aGUgeSBheGlzXG4gKiBAcmV0dXJuIHtWaWN0b3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBWaWN0b3IgKHgsIHkpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFZpY3RvcikpIHtcblx0XHRyZXR1cm4gbmV3IFZpY3Rvcih4LCB5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgWCBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLng7XG5cdCAqICAgICAvLyA9PiA0MlxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy54ID0geCB8fCAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgWSBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLnk7XG5cdCAqICAgICAvLyA9PiAyMVxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy55ID0geSB8fCAwO1xufTtcblxuLyoqXG4gKiAjIFN0YXRpY1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBmcm9tIGFuIGFycmF5XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbUFycmF5KFs0MiwgMjFdKTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFycmF5IHdpdGggdGhlIHggYW5kIHkgdmFsdWVzIGF0IGluZGV4IDAgYW5kIDEgcmVzcGVjdGl2ZWx5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IFRoZSBuZXcgaW5zdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKGFyclswXSB8fCAwLCBhcnJbMV0gfHwgMCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBvYmplY3RcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IFZpY3Rvci5mcm9tT2JqZWN0KHsgeDogNDIsIHk6IDIxIH0pO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjQyLCB5OjIxXG4gKlxuICogQG5hbWUgVmljdG9yLmZyb21PYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHdpdGggdGhlIHZhbHVlcyBmb3IgeCBhbmQgeVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIG5ldyBWaWN0b3Iob2JqLnggfHwgMCwgb2JqLnkgfHwgMCk7XG59O1xuXG4vKipcbiAqICMgTWFuaXB1bGF0aW9uXG4gKlxuICogVGhlc2UgZnVuY3Rpb25zIGFyZSBjaGFpbmFibGUuXG4gKi9cblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWCBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFgodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6MTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IncyBZIGF4aXMgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkWSh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeTo0MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCB0byBhZGQgdG8gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGQodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ICs9IHZlYy54O1xuXHR0aGlzLnkgKz0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gYm90aCB2ZWN0b3IgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAzLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHRoaXMueSArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogMlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgdGhlIGdpdmVuIHNjYWxhciB0byB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEsIDIpO1xuICpcbiAqICAgICB2ZWMuYWRkU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAxLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBYIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggLT0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIFkgYXhpcyBvZiBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5zdWJ0cmFjdFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3QodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6ODAsIHk6MjBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhcigyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogODAsIHk6IDE4MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBzdWJ0cmFjdFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdFNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclgoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAyMDBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjLnN1YnRyYWN0U2NhbGFyWSgyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMTAwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSB4IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVYID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggLz0gdmVjdG9yLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIHRoZSBZIGF4aXMgYnkgdGhlIHkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5kaXZpZGVZKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgYSBheGlzIHZhbHVlcyBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6MjVcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnkgLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFgoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4Oi0xMDAsIHk6NTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFggPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFkoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFkgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueSAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgYm90aCBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuaW52ZXJ0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5Oi01MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLmludmVydFgoKTtcblx0dGhpcy5pbnZlcnRZKCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgWCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5WCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IFkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdmFsdWVzIGZyb20gYSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHkodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggKj0gdmVjdG9yLng7XG5cdHRoaXMueSAqPSB2ZWN0b3IueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgYm90aCB2ZWN0b3IgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAqPSBzY2FsYXI7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemVcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMueCA9IDE7XG5cdFx0dGhpcy55ID0gMDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRpdmlkZShWaWN0b3IobGVuZ3RoLCBsZW5ndGgpKTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUubm9ybSA9IFZpY3Rvci5wcm90b3R5cGUubm9ybWFsaXplO1xuXG4vKipcbiAqIElmIHRoZSBhYnNvbHV0ZSB2ZWN0b3IgYXhpcyBpcyBncmVhdGVyIHRoYW4gYG1heGAsIG11bHRpcGxpZXMgdGhlIGF4aXMgYnkgYGZhY3RvcmBcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5saW1pdCg4MCwgMC45KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjkwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSBmb3IgYm90aCB4IGFuZCB5IGF4aXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBmYWN0b3IgRmFjdG9yIGJ5IHdoaWNoIHRoZSBheGlzIGFyZSB0byBiZSBtdWx0aXBsaWVkIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGltaXQgPSBmdW5jdGlvbiAobWF4LCBmYWN0b3IpIHtcblx0aWYgKE1hdGguYWJzKHRoaXMueCkgPiBtYXgpeyB0aGlzLnggKj0gZmFjdG9yOyB9XG5cdGlmIChNYXRoLmFicyh0aGlzLnkpID4gbWF4KXsgdGhpcy55ICo9IGZhY3RvcjsgfVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyBib3RoIHZlY3RvciBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NjcsIHk6NzNcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR0aGlzLnJhbmRvbWl6ZVgodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21pemVzIHRoZSB5IGF4aXMgd2l0aCBhIHZhbHVlIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplWChuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTUsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVggPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueCwgYm90dG9tUmlnaHQueCk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR0aGlzLnggPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVkobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo2NlxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplWSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR2YXIgbWluID0gTWF0aC5taW4odG9wTGVmdC55LCBib3R0b21SaWdodC55KTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHRoaXMueSA9IHJhbmRvbShtaW4sIG1heCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21seSByYW5kb21pemVzIGVpdGhlciBheGlzIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplQW55KG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo3N1xuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplQW55ID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdGlmICghISBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpKSB7XG5cdFx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGFuIGludGVnZXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS51bmZsb2F0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG5cdHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdW5kcyBib3RoIGF4aXMgdG8gYSBjZXJ0YWluIHByZWNpc2lvblxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAuMiwgNTAuOSk7XG4gKlxuICogICAgIHZlYy51bmZsb2F0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NTFcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gUHJlY2lzaW9uIChkZWZhdWx0OiA4KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b0ZpeGVkID0gZnVuY3Rpb24gKHByZWNpc2lvbikge1xuXHRpZiAodHlwZW9mIHByZWNpc2lvbiA9PT0gJ3VuZGVmaW5lZCcpIHsgcHJlY2lzaW9uID0gODsgfVxuXHR0aGlzLnggPSB0aGlzLngudG9GaXhlZChwcmVjaXNpb24pO1xuXHR0aGlzLnkgPSB0aGlzLnkudG9GaXhlZChwcmVjaXNpb24pO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBYIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhYID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueCA9ICgxIC0gYW1vdW50KSAqIHRoaXMueCArIGFtb3VudCAqIHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBZIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WSh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhZID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueSA9ICgxIC0gYW1vdW50KSAqIHRoaXMueSArIGFtb3VudCAqIHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXggPSBmdW5jdGlvbiAodmVjLCBhbW91bnQpIHtcblx0dGhpcy5taXhYKHZlYywgYW1vdW50KTtcblx0dGhpcy5taXhZKHZlYywgYW1vdW50KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICMgUHJvZHVjdHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY2xvbmUoKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IEEgY2xvbmUgb2YgdGhlIHZlY3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIG5ldyBWaWN0b3IodGhpcy54LCB0aGlzLnkpO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBYIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WCh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFkgY29tcG9uZW50IGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHlZKHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSA9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBhbmQgWSBjb21wb25lbnRzIGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHkodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjIwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLmNvcHlYKHZlYyk7XG5cdHRoaXMuY29weVkodmVjKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZlY3RvciB0byB6ZXJvICgwLDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICpcdFx0IHZhcjEuemVybygpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjAsIHk6MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuemVybyA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gdGhpcy55ID0gMDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZG90KHZlYzIpO1xuICogICAgIC8vID0+IDIzMDAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEb3QgcHJvZHVjdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gdGhpcy54ICogdmVjMi54ICsgdGhpcy55ICogdmVjMi55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uICh2ZWMyKSB7XG5cdHJldHVybiAodGhpcy54ICogdmVjMi55ICkgLSAodGhpcy55ICogdmVjMi54ICk7XG59O1xuXG4vKipcbiAqIFByb2plY3RzIGEgdmVjdG9yIG9udG8gYW5vdGhlciB2ZWN0b3IsIHNldHRpbmcgaXRzZWxmIHRvIHRoZSByZXN1bHQuXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqXG4gKiAgICAgdmVjLnByb2plY3RPbnRvKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gcHJvamVjdCB0aGlzIHZlY3RvciBvbnRvXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnByb2plY3RPbnRvID0gZnVuY3Rpb24gKHZlYzIpIHtcbiAgICB2YXIgY29lZmYgPSAoICh0aGlzLnggKiB2ZWMyLngpKyh0aGlzLnkgKiB2ZWMyLnkpICkgLyAoKHZlYzIueCp2ZWMyLngpKyh2ZWMyLnkqdmVjMi55KSk7XG4gICAgdGhpcy54ID0gY29lZmYgKiB2ZWMyLng7XG4gICAgdGhpcy55ID0gY29lZmYgKiB2ZWMyLnk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZURlZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHJhZGlhbjJkZWdyZWVzKHRoaXMuaG9yaXpvbnRhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLngsIHRoaXMueSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnZlcnRpY2FsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLnZlcnRpY2FsQW5nbGUoKSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGU7XG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlRGVnID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWc7XG5WaWN0b3IucHJvdG90eXBlLmRpcmVjdGlvbiA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHR2YXIgbnggPSAodGhpcy54ICogTWF0aC5jb3MoYW5nbGUpKSAtICh0aGlzLnkgKiBNYXRoLnNpbihhbmdsZSkpO1xuXHR2YXIgbnkgPSAodGhpcy54ICogTWF0aC5zaW4oYW5nbGUpKSArICh0aGlzLnkgKiBNYXRoLmNvcyhhbmdsZSkpO1xuXG5cdHRoaXMueCA9IG54O1xuXHR0aGlzLnkgPSBueTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlRGVnID0gZnVuY3Rpb24gKGFuZ2xlKSB7XG5cdGFuZ2xlID0gZGVncmVlczJyYWRpYW4oYW5nbGUpO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUbyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJldHVybiB0aGlzLnJvdGF0ZShyb3RhdGlvbi10aGlzLmFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUb0RlZyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVUbyhyb3RhdGlvbik7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5ID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHZhciBhbmdsZSA9IHRoaXMuYW5nbGUoKSArIHJvdGF0aW9uO1xuXG5cdHJldHVybiB0aGlzLnJvdGF0ZShhbmdsZSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5RGVnID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVCeShyb3RhdGlvbik7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBYIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWCh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiB0aGlzLnggLSB2ZWMueDtcbn07XG5cbi8qKlxuICogU2FtZSBhcyBgZGlzdGFuY2VYKClgIGJ1dCBhbHdheXMgcmV0dXJucyBhbiBhYnNvbHV0ZSBudW1iZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5hYnNEaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWCh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb2YgdGhlIFkgYXhpcyBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IC0xMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy55IC0gdmVjLnk7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWSgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IDEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkZWFuIGRpc3RhbmNlIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDAuNDk4NzU2MjExMjA4OVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2UgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxKHZlYykpO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VTcSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VTcSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dmFyIGR4ID0gdGhpcy5kaXN0YW5jZVgodmVjKSxcblx0XHRkeSA9IHRoaXMuZGlzdGFuY2VZKHZlYyk7XG5cblx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb3IgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGgoKTtcbiAqICAgICAvLyA9PiAxMTEuODAzMzk4ODc0OTg5NDhcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IExlbmd0aCAvIE1hZ25pdHVkZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcSgpKTtcbn07XG5cbi8qKlxuICogU3F1YXJlZCBsZW5ndGggLyBtYWduaXR1ZGVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGhTcSgpO1xuICogICAgIC8vID0+IDEyNTAwXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoU3EgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IFZpY3Rvci5wcm90b3R5cGUubGVuZ3RoO1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHZlY3RvciBpcyAoMCwgMClcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmVjLnplcm8oKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy54ID09PSAwICYmIHRoaXMueSA9PT0gMDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgdGhlIHNhbWUgYXMgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYzEuaXNFcXVhbFRvKHZlYzIpO1xuICpcbiAqICAgICAvLyA9PiB0cnVlXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaXNFcXVhbFRvID0gZnVuY3Rpb24odmVjMikge1xuXHRyZXR1cm4gdGhpcy54ID09PSB2ZWMyLnggJiYgdGhpcy55ID09PSB2ZWMyLnk7XG59O1xuXG4vKipcbiAqICMgVXRpbGl0eSBNZXRob2RzXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gJ3g6JyArIHRoaXMueCArICcsIHk6JyArIHRoaXMueTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b0FycmF5KCk7XG4gKiAgICAgLy8gPT4gWzEwLCAyMF1cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFsgdGhpcy54LCB0aGlzLnkgXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9PYmplY3QoKTtcbiAqICAgICAvLyA9PiB7IHg6IDEwLCB5OiAyMCB9XG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfTtcbn07XG5cblxudmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5mdW5jdGlvbiByYW5kb20gKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5cbmZ1bmN0aW9uIHJhZGlhbjJkZWdyZWVzIChyYWQpIHtcblx0cmV0dXJuIHJhZCAqIGRlZ3JlZXM7XG59XG5cbmZ1bmN0aW9uIGRlZ3JlZXMycmFkaWFuIChkZWcpIHtcblx0cmV0dXJuIGRlZyAvIGRlZ3JlZXM7XG59XG4iLCJcclxuY29uc3QgQW5pbWF0aW9uTWFuYWdlciA9IHtcclxuXHRhbmltYXRpb25zOiBbXSxcclxuXHJcblx0YWRkKGFuaW1hdGlvbil7XHJcblx0XHR0aGlzLmFuaW1hdGlvbnMucHVzaChhbmltYXRpb24pO1xyXG5cdH0sXHJcblxyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdGZvciAodmFyIGkgPSB0aGlzLmFuaW1hdGlvbnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuXHRcdFx0aWYodGhpcy5hbmltYXRpb25zW2ldLmRvbmUpe1xyXG5cdFx0XHRcdHRoaXMuYW5pbWF0aW9uc1tpXS5kZXN0cm95KCk7XHJcblx0XHRcdFx0dGhpcy5hbmltYXRpb25zLnNwbGljZShpLCAxKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRoaXMuYW5pbWF0aW9uc1tpXS51cGRhdGUodGltZSk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQW5pbWF0aW9uTWFuYWdlcjsiLCJcclxuaW1wb3J0IFN0ZWVyaW5nIGZyb20gJy4uL2hlbHBlcnMvc3RlZXJpbmcnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hvdCB7XHJcblx0Y29uc3RydWN0b3IoZHJhd0NvbnRhaW5lciwgcG9zaXRpb24sIHRhcmdldCkge1xyXG5cdFx0dGhpcy5zdGVlcmluZyA9IG5ldyBTdGVlcmluZyh0aGlzLCB7bWF4VmVsb2NpdHk6IDQuNiAqIDEwMDAsIG1hc3M6IDE1fSk7XHJcblx0XHR0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcblx0XHR0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lciA9IGRyYXdDb250YWluZXI7XHJcblxyXG5cdFx0dGhpcy5zZXR1cEdyYXBoaWNzKCk7XHJcblx0fVxyXG5cclxuXHRzZXR1cEdyYXBoaWNzKCl7XHJcblx0XHR0aGlzLnNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XHJcblx0XHR0aGlzLnNoYXBlLmdyYXBoaWNzLmJlZ2luRmlsbChcIiMwMDBcIikuZHJhd0NpcmNsZSgwLCAwLCA1KTtcclxuXHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIuYWRkQ2hpbGQodGhpcy5zaGFwZSk7XHJcblx0fVxyXG5cclxuXHRnZXQgZG9uZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMucG9zaXRpb24uZGlzdGFuY2UodGhpcy50YXJnZXQucG9zaXRpb24pIDwgdGhpcy50YXJnZXQucmVjdC53aWR0aDtcclxuXHR9XHJcblxyXG5cdGRlc3Ryb3koKXtcclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLnNoYXBlKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdHRoaXMuc3RlZXJpbmcuc2Vlayh0aGlzLnRhcmdldC5wb3NpdGlvbik7XHJcblx0XHR0aGlzLnN0ZWVyaW5nLnVwZGF0ZSh0aW1lKTtcclxuXHJcblx0XHR0aGlzLnNoYXBlLnggPSB0aGlzLnBvc2l0aW9uLng7XHJcblx0XHR0aGlzLnNoYXBlLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcclxuaW1wb3J0IEFzc2V0cyBmcm9tICcuL2Fzc2V0cyc7XHJcblxyXG53aW5kb3cuY3JlYXRlanMuUG9pbnQgPSBWZWN0b3I7IC8vIE92ZXJyaWRlIENyZWF0ZUpzIHBvaW50IHRvIGJlIFZpY3RvciBsaWJcclxuXHJcbmNsYXNzIEFwcCB7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHRoaXMuc3RhZ2UgPSBuZXcgY3JlYXRlanMuU3RhZ2UoXCJjYW52YXNcIik7XHJcblxyXG5cdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMuZnVsbFNjcmVlbi5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcblx0XHR3aW5kb3cub25rZXlkb3duID0gKGUgPT4gR2FtZS5rZXlzW2Uua2V5Q29kZV0gPSB0cnVlKTtcclxuXHRcdHdpbmRvdy5vbmtleXVwID0gKGUgPT4gR2FtZS5rZXlzW2Uua2V5Q29kZV0gPSBmYWxzZSk7XHJcblx0XHRcclxuXHRcdEFzc2V0cy5taWRkbGV3YXJlID0gdGhpcy5hc3NldHNNaWRkbGV3YXJlLmJpbmQodGhpcyk7XHJcblx0XHRBc3NldHMub24oJ3Byb2dyZXNzJywgKHByb2dyZXNzKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKHByb2dyZXNzLmxvYWRlZCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRBc3NldHMub24oJ2NvbXBsZXRlJywgKCkgPT4ge1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIkFzc2V0cyBkb3dubG9hZCBjb21wbGV0ZWRcIik7XHJcblx0XHRcdHRoaXMuc3RhcnQoKTsgLy8gU3RhcnQgZ2FtZSB3aGVuIGFzc2V0cyBpcyBkb3dubG9hZGVkXHJcblx0XHR9KTtcclxuXHJcblx0XHQvLyBTdGFydCBkb3dubG9hZGluZyBhc3NldHNcclxuXHRcdEFzc2V0cy5sb2FkTWFuaWZlc3QoXCJkYXRhL21hbmlmZXN0Lmpzb25cIik7XHJcblx0fVxyXG5cdFxyXG5cdHN0YXJ0KCl7XHJcblx0XHR0aGlzLmZ1bGxTY3JlZW4oKTtcclxuXHRcdGNyZWF0ZWpzLlRpY2tlci5hZGRFdmVudExpc3RlbmVyKFwidGlja1wiLCB0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcblx0XHRjcmVhdGVqcy5UaWNrZXIuZnJhbWVyYXRlID0gMzA7XHJcblxyXG5cdFx0R2FtZS5zdGFydCh0aGlzLnN0YWdlKTtcclxuXHR9XHJcblxyXG5cdGFzc2V0c01pZGRsZXdhcmUoc2V0dGluZyl7XHJcblx0XHRsZXQgY29sb3JzID0gQXNzZXRzLmdldCgnY29sb3InLCBmYWxzZSkuY29sb3JzO1xyXG5cclxuXHRcdHZhciB0ZW1wID0gSlNPTi5zdHJpbmdpZnkoc2V0dGluZywgKGtleSwgdmFsdWUpID0+IHtcclxuXHJcblx0XHRcdGlmKGtleSA9PT0gXCJ3YXZlc1wiICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XHJcblx0XHRcdFx0Ly8gaWYgd2F2ZXMgZXhpc3Qgd2UgYXNzdW1lIHNldHRpbmcgaXMgdW5pdHMuanNvblxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24odmFsdWVbaV0ucHJvcHMsIHt3aWR0aDogc2V0dGluZy51bml0U2l6ZSwgaGVpZ2h0OiBzZXR0aW5nLnVuaXRTaXplfSk7XHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYoa2V5LmluZGV4T2YoXCJjb2xvclwiKSAhPT0gLTEgfHwga2V5LmluZGV4T2YoXCJDb2xvclwiKSAhPT0gLTEpIHtcclxuXHRcdFx0XHRyZXR1cm4gY29sb3JzW3ZhbHVlXSB8fCB2YWx1ZTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0cmV0dXJuIEpTT04ucGFyc2UodGVtcCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBNYWtlIGNhbnZhcyBmdWxsc2NyZWVuXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRmdWxsU2NyZWVuKCl7XHJcblx0XHR0aGlzLnN0YWdlLmNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIHRoaXMuc3RhZ2UuY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFwcGxpY2F0aW9uIGxvb3BcclxuXHQgKiBAcGFyYW0gIHtDcmVhdGVKUy5UaWNrZXIuRXZlbnRzfSB0aW1lIHRpbWUuRGVsdGEgPT0gZWxhcHNlZCBtc1xyXG5cdCAqL1xyXG5cdGxvb3AodGltZSl7XHJcblx0XHQvLyB0aW1lLmRlbHRhID09IGVsYXBzZWQgbXNcclxuXHRcdEdhbWUudXBkYXRlKHRpbWUpO1xyXG5cdFx0R2FtZS5kcmF3KHRoaXMuc3RhZ2UsIHRpbWUpO1xyXG5cdFx0dGhpcy5zdGFnZS51cGRhdGUoKTtcclxuXHR9XHJcbn1cclxuXHJcbmxldCBFZmZlY3RpdmVHdWFjYW1vbGVURCA9IG5ldyBBcHAoKTsiLCJcclxubGV0IENyZWF0ZUpzID0gd2luZG93LmNyZWF0ZWpzOyAvLyBNYWtlIENyZWF0ZUpzIG1vcmUgYWNjZXNzaWJsZVxyXG5cclxuLyoqXHJcbiAqIFdyYXBwZXIgZm9yIHRoZSBDcmVhdGVKcyBQcmVsb2FkIGZ1bmN0aW9uYWxsaXR5XHJcbiAqL1xyXG5jbGFzcyBBc3NldHMge1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHR0aGlzLl9taWRkbGV3YXJlO1xyXG5cdFx0dGhpcy5xdWV1ZSA9IG5ldyBDcmVhdGVKcy5Mb2FkUXVldWUodHJ1ZSk7XHJcblx0XHR0aGlzLnF1ZXVlLm9uKFwiY29tcGxldGVcIiwgdGhpcy5vbkNvbXBsZXRlLmJpbmQodGhpcykpO1xyXG5cdFx0dGhpcy53b3JraW5nID0gZmFsc2U7XHJcblx0fVxyXG5cclxuXHRzZXQgbWlkZGxld2FyZShmdW5jKSB7XHJcblx0XHR0aGlzLl9taWRkbGV3YXJlID0gZnVuYzsgXHJcblx0fVxyXG5cclxuXHRsb2FkTWFuaWZlc3QocGF0aCl7XHJcblx0XHRpZih0aGlzLndvcmtpbmcpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkFscmVhZHkgd29ya2luZyBvbiBkb3dubG9hZGluZ1wiKTtcclxuXHJcblx0XHR0aGlzLndvcmtpbmcgPSB0cnVlO1xyXG5cdFx0dGhpcy5xdWV1ZS5sb2FkTWFuaWZlc3QocGF0aCk7XHJcblx0fVxyXG5cclxuXHRnZXQoaWQsIHJ1bk1pZGRsZXdhcmUpe1xyXG5cdFx0bGV0IHJlc3VsdCA9IHRoaXMucXVldWUuZ2V0UmVzdWx0KGlkKTtcclxuXHJcblx0XHRpZigocnVuTWlkZGxld2FyZSA9PSBudWxsIHx8IHJ1bk1pZGRsZXdhcmUgPT0gdHJ1ZSkgJiYgdGhpcy5fbWlkZGxld2FyZSAmJiByZXN1bHQpXHJcblx0XHRcdHJldHVybiB0aGlzLl9taWRkbGV3YXJlKHJlc3VsdCk7XHJcblxyXG5cdFx0cmV0dXJuIHJlc3VsdDtcclxuXHR9XHJcblxyXG5cdG9uQ29tcGxldGUoKXtcclxuXHRcdHRoaXMud29ya2luZyA9IGZhbHNlO1xyXG5cdH1cclxuXHJcblx0b24obmFtZSwgbWV0aG9kKXtcclxuXHRcdHRoaXMucXVldWUub24obmFtZSwgbWV0aG9kKTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5ldyBBc3NldHMoKTsiLCJpbXBvcnQgVmVjdG9yIGZyb20gJ3ZpY3Rvcic7XHJcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAna2V5TWlycm9yJztcclxuaW1wb3J0IEFycmF5SGVscGVyIGZyb20gJy4vaGVscGVycy9hcnJheUhlbHBlcic7XHJcblxyXG5pbXBvcnQgQXNzZXRzIGZyb20gJy4vYXNzZXRzJztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lJztcclxuaW1wb3J0IEdyaWQgZnJvbSAnLi9ncmlkJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY2sge1xyXG5cdGNvbnN0cnVjdG9yKHN0YWdlKXtcclxuXHRcdHRoaXMuY29sb3JzID0gQXNzZXRzLmdldCgnY29sb3InLCBmYWxzZSkuY29sb3JzO1xyXG5cdFx0dGhpcy50aWxlVHlwZXMgPSBBcnJheUhlbHBlci5yb3RhdGUoW3RoaXMuZXh0cmFjdFRpbGVUeXBlcyhBc3NldHMuZ2V0KFwid29ybGRcIikpXSk7XHJcblx0XHR0aGlzLmdyaWQgPSBbXTtcclxuXHRcdHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuXHRcdHRoaXMucmVjdCA9IG5ldyBjcmVhdGVqcy5SZWN0YW5nbGUoMCwgc3RhZ2UuY2FudmFzLmhlaWdodCAtIHRoaXMuaGVpZ2h0LCBzdGFnZS5jYW52YXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcblx0XHR0aGlzLnNlbGVjdGVkVG93ZXIgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lciA9IHRoaXMuY3JlYXRlRHJhd0NvbnRhaW5lcihzdGFnZSk7XHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub25Eb2NrQ2xpY2suYmluZCh0aGlzKSk7XHJcblx0XHR0aGlzLmNyZWF0ZUxhYmVscygpO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBFdmVudHMoKSB7XHJcblx0XHRyZXR1cm4ga2V5TWlycm9yKHtcclxuXHRcdFx0VE9XRVJfU0VMRUNURUQ6IG51bGxcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Z2V0IHRpbGVTaXplKCl7IHJldHVybiA2MDsgfSAvL1RPRE86IE1ha2UgdGhpcyBhIHNldHR0aW5nIFxyXG5cdGdldCBwYWRkaW5nKCl7IHJldHVybiAyMDsgfVxyXG5cdGdldCBoZWlnaHQoKSB7IHJldHVybiB0aGlzLnRpbGVTaXplICsgKHRoaXMucGFkZGluZyAqIDIpIH1cclxuXHJcblx0aW5pdCgpe1xyXG5cdFx0dGhpcy5ncmlkID0gbmV3IEdyaWQoXHJcblx0XHRcdHRoaXMudGlsZVR5cGVzLmxlbmd0aCwgXHJcblx0XHRcdHRoaXMudGlsZVR5cGVzWzBdLmxlbmd0aCxcclxuXHRcdFx0dGhpcy50aWxlU2l6ZSwgXHJcblx0XHRcdHRoaXMudGlsZUp1ZGdlci5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLnN0YWdlLmFkZENoaWxkKHRoaXMuZHJhd0NvbnRhaW5lcik7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZWFyY2ggdGhyb3VnaCB0aGUgZGlmZmVyZW50IHRpbGUgdHlwZXMgZm9yIHRoZSBvbmVzIHdobyBjYW4gYXR0YWNrXHJcblx0ICogQHBhcmFtICB7anNvbn0gd29ybGRTZXR0aW5ncyBXb3JsZCBKU09OIHNldHRpbmdzXHJcblx0ICogQHJldHVybiB7b2JqZWN0W119ICAgICAgICAgICAgICAgTGlzdCBvZiB0aGUgYXR0YWNraW5nIHRpbGUgdHlwZXNcclxuXHQgKi9cclxuXHRleHRyYWN0VGlsZVR5cGVzKHdvcmxkU2V0dGluZ3MpIHtcclxuXHRcdGxldCB0eXBlcyA9IFtdO1xyXG5cdFx0Zm9yICh2YXIgcHJvcCBpbiB3b3JsZFNldHRpbmdzLnRpbGVUeXBlcykge1xyXG5cdFx0XHRpZih3b3JsZFNldHRpbmdzLnRpbGVUeXBlcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSl7XHJcblx0XHRcdFx0aWYod29ybGRTZXR0aW5ncy50aWxlVHlwZXNbcHJvcF0uYXR0YWNrcyl7XHJcblx0XHRcdFx0XHR0eXBlcy5wdXNoKHtuYW1lOiBwcm9wLCBzZXR0aW5nczogd29ybGRTZXR0aW5ncy50aWxlVHlwZXNbcHJvcF19KTtcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHR5cGVzO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ3JlYXRlIGEgY29udGFpbmVyIGZvciB0aGUgZG9ja2VyIGdyYXBoaWNzXHJcblx0ICogQHBhcmFtICB7Y3JlYXRlanMuU3RhZ2V9IHN0YWdlIEdhbWUgbWFpbiBzdGFnZVxyXG5cdCAqIEByZXR1cm4ge2NyZWF0ZWpzLkNvbnRhaW5lcn0gICAgICAgXHJcblx0ICovXHJcblx0Y3JlYXRlRHJhd0NvbnRhaW5lcihzdGFnZSkge1xyXG5cdFx0bGV0IGNvbnRhaW5lciA9IG5ldyBjcmVhdGVqcy5Db250YWluZXIoKTtcclxuXHRcdGNvbnRhaW5lci55ID0gdGhpcy5yZWN0Lnk7XHJcblxyXG5cdFx0bGV0IGJhY2tncm91bmQgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHRcdGJhY2tncm91bmQuZ3JhcGhpY3NcclxuXHRcdFx0LnNldFN0cm9rZVN0eWxlKDIpLmJlZ2luU3Ryb2tlKHRoaXMuY29sb3JzW1wiZG9ja0JvcmRlclwiXSlcclxuXHRcdFx0LmJlZ2luRmlsbCh0aGlzLmNvbG9yc1tcImRvY2tcIl0pXHJcblx0XHRcdC5kcmF3UmVjdCgwLCAwLCB0aGlzLnJlY3Qud2lkdGgsIHRoaXMucmVjdC5oZWlnaHQpO1xyXG5cclxuIFx0XHRjb250YWluZXIuYWRkQ2hpbGQoYmFja2dyb3VuZCk7XHJcblx0XHRyZXR1cm4gY29udGFpbmVyO1xyXG5cdH1cclxuXHJcblx0Y3JlYXRlTGFiZWxzKCl7XHJcblx0XHQvLyBDYXNoIGxhYmVsXHJcblx0XHR0aGlzLmNhc2hMYWJlbCA9IG5ldyBjcmVhdGVqcy5UZXh0KFwiQ2FzaDogXCIgKyBHYW1lLnByb3BzLmNhc2gsIFwiMjBweCBBcmlhbFwiLCBcIiNmZmZcIik7XHJcblx0XHR0aGlzLmNhc2hMYWJlbC55ID0gdGhpcy5oZWlnaHQgLyAyO1xyXG5cdFx0dGhpcy5jYXNoTGFiZWwueCA9IHRoaXMucmVjdC53aWR0aCAtIHRoaXMuY2FzaExhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSAtIDIwO1xyXG5cclxuXHRcdC8vIExpdmVzIGxhYmVsXHJcblx0XHR0aGlzLmxpdmVzTGFiZWwgPSBuZXcgY3JlYXRlanMuVGV4dChcIkxpdmVzOiBcIiArIEdhbWUucHJvcHMubGl2ZXMsIFwiMjBweCBBcmlhbFwiLCBcIiNmZmZcIik7XHJcblx0XHR0aGlzLmxpdmVzTGFiZWwueSA9ICh0aGlzLmhlaWdodCAvIDIpIC0gNDA7XHJcblx0XHR0aGlzLmxpdmVzTGFiZWwueCA9IHRoaXMucmVjdC53aWR0aCAtIHRoaXMuY2FzaExhYmVsLmdldE1lYXN1cmVkV2lkdGgoKSAtIDIwO1xyXG5cclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRDaGlsZCh0aGlzLmNhc2hMYWJlbCk7XHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIuYWRkQ2hpbGQodGhpcy5saXZlc0xhYmVsKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERlY2lkZXMgYW5kIGNyZWF0ZSB0aGUgdGlsZVxyXG5cdCAqIEBwYXJhbSAge2ludH0gZ3JpZFggWCBpbiBncmlkIGFycmF5XHJcblx0ICogQHBhcmFtICB7aW50fSBncmlkWSBZIGluIGdyaWQgYXJyYXlcclxuXHQgKiBAcmV0dXJuIHtUaWxlfSAgICAgIFxyXG5cdCAqL1xyXG5cdHRpbGVKdWRnZXIoZ3JpZFgsIGdyaWRZKXtcclxuXHRcdGxldCB0aWxlUG9zID0gbmV3IFZlY3RvcihncmlkWCAqIHRoaXMudGlsZVNpemUgKyB0aGlzLnBhZGRpbmcsIHRoaXMucGFkZGluZyksXHJcblx0XHRcdHRpbGVUeXBlID0gdGhpcy50aWxlVHlwZXNbZ3JpZFhdW2dyaWRZXSxcclxuXHRcdFx0dGV4dCA9IG5ldyBjcmVhdGVqcy5UZXh0KHRpbGVUeXBlLm5hbWUsIFwiMjBweCBBcmlhbFwiLCB0aGlzLmNvbG9yc1tcImdyZXlXaGl0ZVwiXSksXHJcblx0XHRcdHNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XHJcbiBcdFx0XHJcbiBcdFx0c2hhcGUuZ3JhcGhpY3NcclxuIFx0XHRcdC5zZXRTdHJva2VTdHlsZSgxKS5iZWdpblN0cm9rZShcIiNmZmZcIilcclxuIFx0XHRcdC5iZWdpbkZpbGwodGhpcy5jb2xvcnNbXCJUZWFsQ29sb3JcIl0pXHJcbiBcdFx0XHQuZHJhd1JlY3QodGlsZVBvcy54LCB0aWxlUG9zLnksIHRoaXMudGlsZVNpemUsIHRoaXMudGlsZVNpemUpO1xyXG5cclxuXHRcdHRleHQueCA9IHRpbGVQb3MueCArICh0aGlzLnRpbGVTaXplIC8gMikgLSAodGV4dC5nZXRNZWFzdXJlZFdpZHRoKCkgLyAyKTtcclxuXHRcdHRleHQueSA9IHRpbGVQb3MueSArICh0aGlzLnRpbGVTaXplIC8gMikgKyAodGV4dC5nZXRNZWFzdXJlZEhlaWdodCgpIC8gMik7XHRcclxuXHRcdHRleHQudGV4dEJhc2VsaW5lID0gXCJhbHBoYWJldGljXCI7XHJcblxyXG4gXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRDaGlsZChzaGFwZSk7XHJcbiBcdFx0dGhpcy5kcmF3Q29udGFpbmVyLmFkZENoaWxkKHRleHQpO1xyXG4gXHRcdHJldHVybiB0aWxlVHlwZTtcclxuXHR9XHJcblxyXG5cdG9uRG9ja0NsaWNrKGNsaWNrKXtcclxuXHRcdGxldCBncmlkUG9zID0gdGhpcy5ncmlkLmdldEFycmF5UG9zKHRoaXMuZHJhd0NvbnRhaW5lci5nbG9iYWxUb0xvY2FsKGNsaWNrLnN0YWdlWCwgY2xpY2suc3RhZ2VZKSwgdGhpcy5wYWRkaW5nKTtcclxuXHJcblx0XHRpZihncmlkUG9zKSB7XHJcblx0XHRcdHRoaXMuc2VsZWN0ZWRUb3dlciA9IHRoaXMudGlsZVR5cGVzW2dyaWRQb3MueF1bZ3JpZFBvcy55XTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHVwZGF0ZSh0aW1lKXtcclxuXHRcdHRoaXMuY2FzaExhYmVsLnRleHQgPSBcIkNhc2g6IFwiICsgR2FtZS5wcm9wcy5jYXNoO1xyXG5cdFx0dGhpcy5saXZlc0xhYmVsLnRleHQgPSBcIkxpdmVzOiBcIiArIEdhbWUucHJvcHMubGl2ZXM7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBXb3JsZCBmcm9tICcuL3dvcmxkJztcclxuaW1wb3J0IEFzc2V0cyBmcm9tICcuL2Fzc2V0cyc7XHJcbmltcG9ydCBEb2NrIGZyb20gJy4vZG9jayc7XHJcbmltcG9ydCBVbml0TWFuYWdlciBmcm9tICcuL3VuaXRNYW5hZ2VyJztcclxuaW1wb3J0IEFuaW1hdGlvbk1hbmFnZXIgZnJvbSAnLi9hbmltYXRpb25zL2FuaW1hdGlvbk1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGNvbnN0IGtleU5hbWVzID0ge1xyXG5cdHNoaWZ0OiAxNlxyXG59O1xyXG5cclxuY29uc3QgR2FtZSA9IHtcclxuXHRydW5uaW5nOiBmYWxzZSxcclxuXHRjYW1lcmFTcGVlZDogMjAsXHJcblx0a2V5czogW10sXHJcblx0cHJvcHM6IHt9LFxyXG5cclxuXHRzdGFnZTogbnVsbCxcclxuXHR3b3JsZDogbnVsbCxcclxuXHR3b3JsZFN0YWdlOiBudWxsLFxyXG5cdHVuaXRNYW5hZ2VyOiBudWxsLFxyXG5cdGRvY2s6IG51bGwsXHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYXRlIGFsbCB0aGUgZ2FtZSBjb21wb25lbnRzXHJcblx0ICogQHJldHVybiB7dm9pZH1cclxuXHQgKi9cclxuXHRzdGFydChzdGFnZSl7XHJcblx0XHRPYmplY3QuYXNzaWduKEdhbWUucHJvcHMsIEFzc2V0cy5nZXQoJ2dhbWUnKSlcclxuXHRcdEdhbWUuc3RhZ2UgPSBzdGFnZTtcclxuXHRcdEdhbWUud29ybGRTdGFnZSA9IHN0YWdlLmFkZENoaWxkKG5ldyBjcmVhdGVqcy5Db250YWluZXIoKSk7XHJcblxyXG5cdFx0R2FtZS53b3JsZCA9IG5ldyBXb3JsZChHYW1lLndvcmxkU3RhZ2UpO1xyXG5cdFx0R2FtZS51bml0TWFuYWdlciA9IG5ldyBVbml0TWFuYWdlcihHYW1lLndvcmxkU3RhZ2UpO1xyXG5cdFx0R2FtZS5kb2NrID0gbmV3IERvY2soc3RhZ2UpO1xyXG5cclxuXHRcdC8vIEluaXRpYXRlXHJcblx0XHRHYW1lLndvcmxkLmluaXQoKTtcclxuXHRcdEdhbWUudW5pdE1hbmFnZXIuaW5pdCgpO1xyXG5cdFx0R2FtZS5kb2NrLmluaXQoKTtcclxuXHJcblx0XHRHYW1lLnJ1bm5pbmcgPSB0cnVlO1xyXG5cdH0sXHJcblxyXG5cdGRyYXdHYW1lT3Zlcigpe1xyXG5cdFx0bGV0IGdhbWVPdmVyID0gbmV3IGNyZWF0ZWpzLlRleHQoXCJHYW1lIE92ZXIhXCIsIFwiNjBweCBBcmlhbFwiLCBcIiNmZmZcIik7XHJcblx0XHRnYW1lT3Zlci54ID0gKEdhbWUuc3RhZ2UuY2FudmFzLndpZHRoIC8gMikgLSAoZ2FtZU92ZXIuZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMik7XHJcblx0XHRnYW1lT3Zlci55ID0gR2FtZS5zdGFnZS5jYW52YXMuaGVpZ2h0IC8gMiAtIChnYW1lT3Zlci5nZXRNZWFzdXJlZEhlaWdodCgpIC8gMik7XHJcblx0XHRcclxuXHRcdEdhbWUuc3RhZ2UuYWRkQ2hpbGQoZ2FtZU92ZXIpO1xyXG5cdH0sXHJcblxyXG5cdGNoZWNrS2V5cygpIHtcclxuXHRcdGlmKEdhbWUua2V5c1szN10pXHJcblx0XHRcdEdhbWUud29ybGRTdGFnZS5yZWdYIC09IEdhbWUuY2FtZXJhU3BlZWQ7XHJcblxyXG5cdFx0aWYoR2FtZS5rZXlzWzM4XSlcclxuXHRcdFx0R2FtZS53b3JsZFN0YWdlLnJlZ1kgLT0gR2FtZS5jYW1lcmFTcGVlZDtcclxuXHJcblx0XHRpZihHYW1lLmtleXNbMzldKVxyXG5cdFx0XHRHYW1lLndvcmxkU3RhZ2UucmVnWCArPSBHYW1lLmNhbWVyYVNwZWVkO1xyXG5cdFx0XHRcclxuXHRcdGlmKEdhbWUua2V5c1s0MF0pXHJcblx0XHRcdEdhbWUud29ybGRTdGFnZS5yZWdZICs9IEdhbWUuY2FtZXJhU3BlZWQ7XHJcblx0fSxcclxuXHJcblx0dXBkYXRlKHRpbWUpe1xyXG5cdFx0R2FtZS5jaGVja0tleXMoKTtcclxuXHJcblx0XHRpZighR2FtZS5ydW5uaW5nKVxyXG5cdFx0XHRyZXR1cm47XHJcblxyXG5cdFx0R2FtZS53b3JsZC51cGRhdGUodGltZSk7XHJcblx0XHRHYW1lLnVuaXRNYW5hZ2VyLnVwZGF0ZSh0aW1lKTtcclxuXHRcdEdhbWUuZG9jay51cGRhdGUodGltZSk7XHJcblx0XHRcclxuXHRcdEFuaW1hdGlvbk1hbmFnZXIudXBkYXRlKHRpbWUpO1xyXG5cdH0sXHJcblxyXG5cdGRyYXcoc3RhZ2UsIHRpbWUpe1xyXG5cdFx0aWYoIUdhbWUucnVubmluZylcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdEdhbWUud29ybGQuZHJhdyhzdGFnZSwgdGltZSk7XHJcblx0fSxcclxuXHJcblxyXG5cclxuXHQvLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xyXG5cdFxyXG5cdGJ1eWluZ1Rvd2VyKHByaWNlKXtcclxuXHRcdGlmKEdhbWUucHJvcHMuY2FzaCAtIHByaWNlID49IDApe1xyXG5cdFx0XHRHYW1lLnByb3BzLmNhc2ggLT0gcHJpY2U7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9LFxyXG5cclxuXHRyZWNpZXZlQ2FzaChhbW91bnQpe1xyXG5cdFx0R2FtZS5wcm9wcy5jYXNoICs9IGFtb3VudDtcclxuXHR9LFxyXG5cclxuXHRsb3NlTGlmZSgpe1xyXG5cdFx0R2FtZS5wcm9wcy5saXZlcyAtPSAxO1x0XHJcblxyXG5cdFx0aWYoR2FtZS5wcm9wcy5saXZlcyA8PSAwKXtcclxuXHRcdFx0R2FtZS5ydW5uaW5nID0gZmFsc2U7XHJcblx0XHRcdEdhbWUuZHJhd0dhbWVPdmVyKCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZTtcclxuIiwiXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAndmljdG9yJztcclxuaW1wb3J0IE1hdGhIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL21hdGhIZWxwZXInO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JpZCB7XHJcblx0Y29uc3RydWN0b3IoeCwgeSwgdGlsZVNpemUsIHRpbGVKdWRnZXIpe1xyXG5cdFx0dGhpcy50aWxlcyA9IFtdO1xyXG5cdFx0dGhpcy54ID0geFxyXG5cdFx0dGhpcy55ID0geTtcclxuXHRcdHRoaXMudGlsZVNpemUgPSB0aWxlU2l6ZTtcclxuXHJcblx0XHR0aGlzLmdlbmVyYXRlKHRpbGVKdWRnZXIpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUG9wdWxhdGUgY2VsbHNcclxuXHQgKiBAcGFyYW0gIHtmdW5jdGlvbn0gdGlsZUp1ZGdlciBXaWxsIGRldGVybWluZSBhbmQgcmV0dXJuIGEgY2VsbFxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0Z2VuZXJhdGUodGlsZUp1ZGdlcikge1xyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLng7IGkrKykge1xyXG5cdFx0XHR0aGlzLnRpbGVzW2ldID0gW107XHJcblxyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMueTsgaisrKSB7XHJcblx0XHRcdFx0dGhpcy50aWxlc1tpXVtqXSA9IHRpbGVKdWRnZXIoaSwgaik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBjZWxsIGJhc2VkIG9uIHNjcmVlbiB2ZWN0b3JcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IHBvcyBTY3JlZW4gdmVjdG9yXHJcblx0ICogQHJldHVybiB7Q2VsbH0gICAgIFxyXG5cdCAqL1xyXG5cdGdldFRpbGUocG9zKXtcclxuXHRcdGxldCBncmlkUG9zID0gdGhpcy5nZXRBcnJheVBvcyhwb3MpO1xyXG5cclxuXHRcdGlmKGdyaWRQb3MgIT0gbnVsbCl7XHJcblx0XHRcdHJldHVybiB0aGlzLnRpbGVzW2dyaWRQb3MueF1bZ3JpZFBvcy55XTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gbnVsbDtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBncmlkIHBvc2l0aW9uIGJhc2VkIG9uIHNjcmVlbiB2ZWN0b3JcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IHBvcyBTY3JlZW4gdmVjdG9yXHJcblx0ICogQHJldHVybiB7b2JqZWN0fSAgICAgU25hcCBncmlkIHBvc2l0aW9uXHJcblx0ICovXHJcblx0Z2V0QXJyYXlQb3MocG9zLCBwYWRkaW5nKXtcclxuXHRcdGxldCBncmlkUG9zID0ge1xyXG5cdFx0XHR4OiBNYXRoLmZsb29yKE1hdGhIZWxwZXIuc25hcFRvRmxvb3IocG9zLngsIHRoaXMudGlsZVNpemUsIHBhZGRpbmcpIC8gdGhpcy50aWxlU2l6ZSksXHJcblx0XHRcdHk6IE1hdGguZmxvb3IoTWF0aEhlbHBlci5zbmFwVG9GbG9vcihwb3MueSwgdGhpcy50aWxlU2l6ZSwgcGFkZGluZykgLyB0aGlzLnRpbGVTaXplKVxyXG5cdFx0fTtcclxuXHJcblx0XHRpZih0aGlzLnZhbGlkQXJyYXlQb3MoZ3JpZFBvcykpXHJcblx0XHRcdHJldHVybiBncmlkUG9zO1xyXG5cclxuXHRcdHJldHVybiBudWxsO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29udmVydHMgZ3JpZCBhcnJheSBwb3Mge3gseX0gdG8gc2NyZWVuIHBvc2l0aW9uc1xyXG5cdCAqIEBwYXJhbSAge3t4LHl9fSBwb3MgR3JpZCBwb3N0aW9uXHJcblx0ICogQHJldHVybiB7dmVjdG9yfSAgICAgU2NyZWVuIHZlY3RvclxyXG5cdCAqL1xyXG5cdGdldFNjcmVlblZlY3Rvcihwb3Mpe1xyXG5cdFx0cmV0dXJuIFZlY3Rvci5mcm9tT2JqZWN0KHBvcylcclxuXHRcdFx0XHQubXVsdGlwbHlTY2FsYXIodGhpcy50aWxlU2l6ZSlcclxuXHRcdFx0XHQuYWRkKG5ldyBWZWN0b3IodGhpcy50aWxlU2l6ZSAvIDIsIHRoaXMudGlsZVNpemUgLyAyKSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDaGVja3MgaWYgdGhlIGdyaWQgcG9zIGlzIGluc2lkZSBvZiBhcnJheSBsZW5ndGhcclxuXHQgKiBAcGFyYW0gIHt7eCx5fX0gcG9zIEdyaWQgcG9zaXRpb25cclxuXHQgKiBAcmV0dXJuIHtib29sfSAgICAgXHJcblx0ICovXHJcblx0dmFsaWRBcnJheVBvcyhwb3Mpe1xyXG5cdFx0cmV0dXJuIHBvcy54IDwgdGhpcy54ICYmIHBvcy55IDwgdGhpcy55XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZW5lcmF0ZSBub2RlcyAgYmFzZWQgb24gZ3JpZCB0aWxlcy4gVXNlZCBieSBhU3RhciB0byBjYWxjdWxhdGUgcGF0aFxyXG5cdCAqIEByZXR1cm4ge25vZGVzW11bXX1cclxuXHQgKi9cclxuXHRjcmVhdGVBU3Rhck5vZGVzKCl7XHJcblx0XHRsZXQgbm9kZXMgPSBbXTtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50aWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRub2Rlc1tpXSA9IFtdO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMudGlsZXNbMF0ubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRub2Rlc1tpXVtqXSA9IHtcclxuXHRcdFx0XHRcdHg6IGksIHk6IGosIGY6IDAsIGc6IDAsIGg6IDAsXHJcblx0XHRcdFx0XHR2ZWN0b3I6IHRoaXMuZ2V0U2NyZWVuVmVjdG9yKHt4OiBpLCB5OiBqfSksXHJcblx0XHRcdFx0XHRpc1dhbGw6IHRoaXMudGlsZXNbaV1bal0uaXNXYWxsXHJcblx0XHRcdFx0fTtcclxuXHRcdFx0fTtcclxuXHRcdH07XHJcblxyXG5cdFx0cmV0dXJuIG5vZGVzO1xyXG5cdH1cdFxyXG59IiwiXHJcbmltcG9ydCBBcnJheUhlbHBlciBmcm9tICcuL2FycmF5SGVscGVyJztcclxuXHJcbmNvbnN0IEFTdGFyID0ge1xyXG5cclxuXHRzZWFyY2gobm9kZXMsIHN0YXJ0LCBlbmQpIHtcclxuXHJcblx0XHRsZXQgY2xvc2VkU2V0ID0gW10sXHJcblx0XHRcdG9wZW5TZXQgPSBbXSxcclxuXHRcdFx0Y3VycmVudE5vZGU7XHJcblxyXG5cdFx0b3BlblNldC5wdXNoKHN0YXJ0KTtcclxuXHJcblx0XHR3aGlsZShvcGVuU2V0Lmxlbmd0aCA+IDApe1xyXG5cclxuXHRcdFx0bGV0IGZJbmRleCA9IDA7XHJcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgb3BlblNldC5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGlmKG9wZW5TZXRbaV0uZiA8IG9wZW5TZXRbZkluZGV4XS5mKVxyXG5cdFx0XHRcdFx0ZkluZGV4ID0gaTtcclxuXHRcdFx0fTtcclxuXHRcdFx0Y3VycmVudE5vZGUgPSBvcGVuU2V0W2ZJbmRleF07XHJcblxyXG5cdFx0XHQvLyBGb3VuZCBnb2FsLCByZXR1cm4gdGhlIHBhdGhcclxuXHRcdFx0aWYoY3VycmVudE5vZGUgPT0gZW5kKXtcclxuXHRcdFx0XHRsZXQgY3VyciA9IGN1cnJlbnROb2RlLFxyXG5cdFx0XHRcdFx0cmV0ID0gW107XHJcblxyXG5cdFx0XHRcdHdoaWxlKGN1cnIucGFyZW50KXtcclxuXHRcdFx0XHRcdHJldC5wdXNoKGN1cnIpO1xyXG5cdFx0XHRcdFx0Y3VyciA9IGN1cnIucGFyZW50O1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0cmV0dXJuIHJldC5yZXZlcnNlKCk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG9wZW5TZXQuc3BsaWNlKG9wZW5TZXQuaW5kZXhPZihjdXJyZW50Tm9kZSksIDEpO1xyXG5cdFx0XHRjbG9zZWRTZXQucHVzaChjdXJyZW50Tm9kZSk7XHJcblxyXG5cdFx0XHRsZXQgbmVpZ2hib3JzID0gQXJyYXlIZWxwZXIubmVpZ2hib3JzKG5vZGVzLCBjdXJyZW50Tm9kZSwgZmFsc2UpO1xyXG5cclxuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBuZWlnaGJvcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRsZXQgbmVpZ2hib3IgPSBuZWlnaGJvcnNbaV07XHJcblxyXG5cdFx0XHRcdGlmKGNsb3NlZFNldC5pbmRleE9mKG5laWdoYm9yKSA+IC0xIHx8IG5laWdoYm9yLmlzV2FsbCl7XHJcblx0XHRcdFx0XHRjb250aW51ZTsgLy8gTm90IGEgdmFsaWQgbm9kZSB0byB3YWxrIHRvXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRsZXQgZ1Njb3JlID0gY3VycmVudE5vZGUuZyArIDEsIC8vIDEgaXMgZGlzdGFuY2UgdG8gdG8gaXQncyBuZWlnaGJvclxyXG5cdFx0XHRcdFx0YmVzdEcgPSBmYWxzZTsgXHJcblxyXG5cdFx0XHRcdGlmKG9wZW5TZXQuaW5kZXhPZihuZWlnaGJvcikgPCAwKXtcclxuXHRcdFx0XHRcdC8vIFdlIGhhdmUgbm90IGJlZW4gaGVyZSBiZWZvcmUgdGhlcmVmb3IgdGhlIGJlc3QgZ1xyXG5cdFx0XHRcdFx0YmVzdEcgPSB0cnVlO1xyXG5cdFx0XHRcdFx0bmVpZ2hib3IuaCA9IEFTdGFyLm1hbmhhdHRhbihuZWlnaGJvciwgZW5kKTtcclxuXHRcdFx0XHRcdG9wZW5TZXQucHVzaChuZWlnaGJvcik7XHJcblx0XHRcdFx0fSBcclxuXHRcdFx0XHRlbHNlIGlmKGdTY29yZSA8IG5laWdoYm9yLmcpe1xyXG5cdFx0XHRcdFx0YmVzdEcgPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYmVzdEcpe1xyXG5cdFx0XHRcdFx0bmVpZ2hib3IucGFyZW50ID0gY3VycmVudE5vZGU7XHJcblx0XHRcdFx0XHRuZWlnaGJvci5nID0gZ1Njb3JlO1xyXG5cdFx0XHRcdFx0bmVpZ2hib3IuZiA9IG5laWdoYm9yLmcgKyBuZWlnaGJvci5oO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIFtdOyAvLyBEaWQgbm90IGZpbmQgYW55IHBhdGhcclxuXHR9LFxyXG5cclxuXHRtYW5oYXR0YW4ocG9zMSwgcG9zMikge1xyXG5cdFx0bGV0IGQxID0gTWF0aC5hYnMocG9zMi54IC0gcG9zMS54KTtcclxuXHRcdGxldCBkMiA9IE1hdGguYWJzKHBvczIueSAtIHBvczEueSk7XHJcblx0XHRyZXR1cm4gZDEgKyBkMjtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFTdGFyOyIsIlxyXG5jb25zdCBBcnJheUhlbHBlciA9IHtcclxuXHJcblx0LyoqXHJcblx0ICogU3dpdGNoIHBsYWNlIG9uIGkgJiBqXHJcblx0ICogQHBhcmFtICB7QXJyYXlbXVtdfSBhcnJcclxuXHQgKiBAcmV0dXJuIHtBcnJheVtdW119ICAgICBcdFx0VGhlIHJvdGF0ZWQgYXJyYXlcclxuXHQgKi9cclxuXHRyb3RhdGUoYXJyKXtcclxuXHRcdGxldCBuID0gW107XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcnJbMF0ubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bltpXSA9IFtdO1xyXG5cdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdG5baV1bal0gPSBhcnJbal1baV07XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cclxuXHRcdHJldHVybiBuO1xyXG5cdH0sXHJcblxyXG5cdG5laWdoYm9ycyhhcnJheSwgZWxlbWVudCwgZGlhZ29uYWxzKXtcclxuXHRcdGlmKFx0dHlwZW9mIGFycmF5ID09ICd1bmRlZmluZWQnIHx8XHJcblx0XHRcdHR5cGVvZiBhcnJheVswXSA9PSAndW5kZWZpbmVkJyB8fFxyXG5cdFx0XHR0eXBlb2YgYXJyYXlbMF1bMF0gPT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiTm90IGEgdHdvIGRpbWVuc2lvbmFsIGFycmF5XCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGxldCByZXQgPSBbXSwgeCwgeTtcclxuXHJcblx0XHRpZihlbGVtZW50LnggJiYgcGFyc2VJbnQoZWxlbWVudC54KSA8IGFycmF5Lmxlbmd0aCAmJiBcclxuXHRcdFx0ZWxlbWVudC55ICYmIHBhcnNlSW50KGVsZW1lbnQueSkgPCBhcnJheVswXS5sZW5ndGgpe1xyXG5cdFx0XHR4ID0gZWxlbWVudC54O1xyXG5cdFx0XHR5ID0gZWxlbWVudC55O1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBhcnJheVswXS5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdFx0aWYoYXJyYXlbaV1bal0gPT0gZWxlbWVudCl7XHJcblx0XHRcdFx0XHRcdHggPSBpO1xyXG5cdFx0XHRcdFx0XHR5ID0gajtcclxuXHRcdFx0XHRcdFx0YnJlYWs7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHRcdFxyXG5cclxuICAgICAgICAvLyBXZXN0XHJcbiAgICAgICAgaWYoYXJyYXlbeC0xXSAmJiBhcnJheVt4LTFdW3ldKSB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKGFycmF5W3gtMV1beV0pO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vIEVhc3RcclxuICAgICAgICBpZihhcnJheVt4KzFdICYmIGFycmF5W3grMV1beV0pIHtcclxuICAgICAgICAgICAgcmV0LnB1c2goYXJyYXlbeCsxXVt5XSk7XHJcbiAgICAgICAgfVxyXG4gXHJcbiAgICAgICAgLy8gU291dGhcclxuICAgICAgICBpZihhcnJheVt4XSAmJiBhcnJheVt4XVt5LTFdKSB7XHJcbiAgICAgICAgICAgIHJldC5wdXNoKGFycmF5W3hdW3ktMV0pO1xyXG4gICAgICAgIH1cclxuIFxyXG4gICAgICAgIC8vIE5vcnRoXHJcbiAgICAgICAgaWYoYXJyYXlbeF0gJiYgYXJyYXlbeF1beSsxXSkge1xyXG4gICAgICAgICAgICByZXQucHVzaChhcnJheVt4XVt5KzFdKTtcclxuICAgICAgICB9XHJcbiBcclxuICAgICAgICBpZiAoZGlhZ29uYWxzKSB7XHJcbiBcclxuICAgICAgICAgICAgLy8gU291dGh3ZXN0XHJcbiAgICAgICAgICAgIGlmKGFycmF5W3gtMV0gJiYgYXJyYXlbeC0xXVt5LTFdKSB7XHJcbiAgICAgICAgICAgICAgICByZXQucHVzaChhcnJheVt4LTFdW3ktMV0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBTb3V0aGVhc3RcclxuICAgICAgICAgICAgaWYoYXJyYXlbeCsxXSAmJiBhcnJheVt4KzFdW3ktMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldC5wdXNoKGFycmF5W3grMV1beS0xXSk7XHJcbiAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAvLyBOb3J0aHdlc3RcclxuICAgICAgICAgICAgaWYoYXJyYXlbeC0xXSAmJiBhcnJheVt4LTFdW3krMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldC5wdXNoKGFycmF5W3gtMV1beSsxXSk7XHJcbiAgICAgICAgICAgIH1cclxuIFxyXG4gICAgICAgICAgICAvLyBOb3J0aGVhc3RcclxuICAgICAgICAgICAgaWYoYXJyYXlbeCsxXSAmJiBhcnJheVt4KzFdW3krMV0pIHtcclxuICAgICAgICAgICAgICAgIHJldC5wdXNoKGFycmF5W3grMV1beSsxXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQXJyYXlIZWxwZXI7IiwiXHJcbmNvbnN0IE1hdGhIZWxwZXIgPSB7XHJcblx0c25hcFRvRmxvb3IoaW5wdXQsIGdhcCwgc3RhcnQpe1xyXG5cdFx0aWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHsgc3RhcnQgPSAwOyB9XHJcblxyXG4gICAgICAgIGlmIChnYXAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGlucHV0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5wdXQgLT0gc3RhcnQ7XHJcbiAgICAgICAgaW5wdXQgPSBnYXAgKiBNYXRoLmZsb29yKGlucHV0IC8gZ2FwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHN0YXJ0ICsgaW5wdXQ7XHJcblx0fVxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTWF0aEhlbHBlcjsiLCJcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5cclxuY29uc3QgZGVmYXVsdFNldHRpbmdzID0ge1xyXG5cdG1heEZvcmNlOiA1LjQgKiAxMDAwLFxyXG5cdG1heFZlbG9jaXR5OiAzLjUgKiAxMDAwLFxyXG5cdG1hc3M6IDIwLFxyXG5cdHNsb3dpbmdSYWRpb3VzOiA3MCxcclxuXHRwYXRoUmFkaW91czogMjAsXHJcblxyXG5cdG1heFNlZUFoZWFkOiA0MCxcclxuXHRtYXhBdm9pZGFuY2VGb3JjZTogMjAwMFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RlZXJpbmcge1xyXG5cdGNvbnN0cnVjdG9yKGJvaWQsIHNldHRpbmdzKXtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0U2V0dGluZ3MsIHNldHRpbmdzKTtcclxuXHRcdHRoaXMuYm9pZCA9IGJvaWQ7XHJcblxyXG5cdFx0dGhpcy5zdGVlcmluZyA9IG5ldyBWZWN0b3IoMCwwKTtcclxuXHRcdHRoaXMudmVsb2NpdHkgPSB0aGlzLnRydW5jYXRlKG5ldyBWZWN0b3IoLTEsLTIpLCB0aGlzLnNldHRpbmdzLm1heFZlbG9jaXR5KTtcclxuXHRcdHRoaXMuZGVzaXJlZFZlbG9jaXR5ID0gbmV3IFZlY3RvcigxLDApO1xyXG5cdFx0dGhpcy5hdm9pZGFuY2VGb3JjZSA9IG5ldyBWZWN0b3IoMCwwKTtcclxuXHJcblx0XHR0aGlzLmN1cnJlbnROb2RlUGF0aCA9IDA7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUcnVuY2F0ZSB0aGUgdmVjdG9yIHRvIHRoZSBtYXggdmFsdWVcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IHZlY3RvciBcclxuXHQgKiBAcGFyYW0gIHtmbG9hdH0gbWF4ICAgIFxyXG5cdCAqIEByZXR1cm4ge3ZlY3Rvcn0gICAgICAgICBWYWx1ZSB3aWxsIGJlIHNldCBvbiB2ZWN0b3IgYW5kIHRoZSB2ZWN0b3Igd2lsbCBiZSByZXR1cm5lZFxyXG5cdCAqL1xyXG5cdHRydW5jYXRlKHZlY3RvciwgbWF4KXtcclxuXHRcdGxldCBpID0gbWF4IC8gdmVjdG9yLmxlbmd0aCgpO1xyXG5cdFx0aSA9IGkgPCAxLjAgPyBpIDogMS4wO1xyXG5cdFx0dmVjdG9yLm11bHRpcGx5U2NhbGFyKGkpO1xyXG5cdFx0cmV0dXJuIHZlY3RvcjtcclxuXHR9XHJcblxyXG5cdHJlc2V0UGF0aCgpe1xyXG5cdFx0dGhpcy5jdXJyZW50Tm9kZVBhdGggPSAwO1xyXG5cdH1cclxuXHJcblx0aW50ZXJzZWN0c1JlY3RhbmdsZShhaGVhZCwgcmVjdCl7XHJcblx0XHRsZXQgc2NhbGFyID0gdGhpcy5zZXR0aW5ncy5tYXhTZWVBaGVhZCAqIDAuNSAqIHRoaXMudmVsb2NpdHkubGVuZ3RoKCkgLyB0aGlzLnNldHRpbmdzLm1heFZlbG9jaXR5LFxyXG5cdFx0XHR0diA9IHRoaXMudmVsb2NpdHkuY2xvbmUoKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcihzY2FsYXIpLFxyXG5cdFx0XHRhaGVhZDIgPSB0aGlzLmJvaWQucG9zaXRpb24uY2xvbmUoKS5hZGQodHYpOyAvLyBhaGVhZDIgaXMgaGFsZiB0aGUgbGVuZ3RoIG9mIGFoZWFkXHJcblxyXG5cdFx0cmV0dXJuIHJlY3QuY29udGFpbnMoYWhlYWQueCwgYWhlYWQueSkgfHwgXHJcblx0XHRcdHJlY3QuY29udGFpbnMoYWhlYWQyLngsIGFoZWFkMi55KSB8fCBcclxuXHRcdFx0cmVjdC5pbnRlcnNlY3RzKHRoaXMuYm9pZC5yZWN0KTtcclxuXHR9XHJcblxyXG5cdG1vc3RUaHJlYXRpbmdPYnN0YWNsZShhaGVhZCwgb2JzdGFjbGVzKXtcclxuXHRcdGxldCBjb2xsaXNpb24gPSBmYWxzZSxcclxuXHRcdFx0bW9zdFRocmVhdGluZyA9IG51bGw7XHJcblxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBvYnN0YWNsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Y29sbGlzaW9uID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZihvYnN0YWNsZXNbaV0ucmVjdCl7XHJcblxyXG5cdFx0XHRcdGlmKHRoaXMuaW50ZXJzZWN0c1JlY3RhbmdsZShhaGVhZCwgb2JzdGFjbGVzW2ldLnJlY3QpKXtcclxuXHRcdFx0XHRcdGlmKG1vc3RUaHJlYXRpbmcgPT0gbnVsbCB8fFxyXG5cdFx0XHRcdFx0XHR0aGlzLmJvaWQucG9zaXRpb24uZGlzdGFuY2Uob2JzdGFjbGVzW2ldLmNlbnRlcikgPCBcclxuXHRcdFx0XHRcdFx0dGhpcy5ib2lkLnBvc2l0aW9uLmRpc3RhbmNlKG1vc3RUaHJlYXRpbmcuY2VudGVyKSl7XHJcblx0XHRcdFx0XHRcdG1vc3RUaHJlYXRpbmcgPSBvYnN0YWNsZXNbaV07XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIG1vc3RUaHJlYXRpbmc7XHJcblx0fVxyXG5cclxuXHJcblx0Y29sbGlzaW9uQXZvaWRhbmNlKG9ic3RhY2xlcyl7XHJcblx0XHR0aGlzLnN0ZWVyaW5nLmFkZCh0aGlzLmRvQ29sbGlzaW9uQXZvaWRhbmNlKG9ic3RhY2xlcykpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVGhlIHB1YmxpYyBtZXRob2QgdG8gYmUgdXNlZC4gU2VlIGRvRm9sbG93UGF0aCgpIGZvciBtb3JlIGluZm9ybWF0aW9uXHJcblx0ICovXHJcblx0Zm9sbG93UGF0aChwYXRoKXtcclxuXHRcdGlmKHRoaXMuY3VycmVudE5vZGVQYXRoID4gcGF0aC5sZW5ndGgpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIk5lZWRzIHRvIHJlc2V0IHBhdGggYmVmb3JlIHNldHRpbmcgYSBuZXcgb25lXCIpO1xyXG5cclxuXHRcdGxldCBzbG93aW5nUmFkaW91cyA9IHRoaXMuY3VycmVudE5vZGVQYXRoID09IHBhdGgubGVuZ3RoIC0gMSA/IHRoaXMuc2V0dGluZ3Muc2xvd2luZ1JhZGlvdXMgOiAwXHJcblx0XHR0aGlzLnNlZWsodGhpcy5kb0ZvbGxvd1BhdGgocGF0aCksIHNsb3dpbmdSYWRpb3VzKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRoZSBwdWJsaWMgbWV0aG9kIHRvIGJlIHVzZWQuIFNlZSBkb1NlZWsoKSBmb3IgbW9yZSBpbmZvcm1hdGlvblxyXG5cdCAqL1xyXG5cdHNlZWsodGFyZ2V0LCBzbG93aW5nUmFkaW91cykge1xyXG5cdFx0dGhpcy5zdGVlcmluZy5hZGQodGhpcy5kb1NlZWsodGFyZ2V0LCBzbG93aW5nUmFkaW91cykpO1xyXG5cdH1cclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIE1vdmUgdGhlIGJvaWQgY2xvc2VyIHRvIHRoZSB0YXJnZXQuIFRoaXMgbWV0aG9kIGFsb25lIHNob3VsZCBub3QgYmUgdXNlZFxyXG5cdCAqIEBwYXJhbSAge3ZlY3Rvcn0gdGFyZ2V0ICAgICAgICAgXHJcblx0ICogQHBhcmFtICB7ZmxvYXR9IHNsb3dpbmdSYWRpb3VzICAoQXJyaXZlIGJlaGF2aW91cikgSWYgaW4gcmFkaW91cyB0aGUgYm9pZCB3aWxsIHNsb3dkb3duIGJlZm9yZSByZWFjaGluZyB0aGUgdGFyZ2V0LiBBbGxvd3MgbnVsbFxyXG5cdCAqIEByZXR1cm4ge3ZlY3Rvcn0gICAgICAgICAgICAgICAgRm9yY2UgdmVjdG9yIGZvciBwdXNoaW5nIGNsb3NlciB0byB0YXJnZXRcclxuXHQgKi9cclxuXHRkb1NlZWsodGFyZ2V0LCBzbG93aW5nUmFkaW91cykge1xyXG5cdFx0bGV0IGRpc3RhbmNlO1xyXG5cclxuXHRcdHRoaXMuZGVzaXJlZFZlbG9jaXR5ID0gdGFyZ2V0LmNsb25lKCkuc3VidHJhY3QodGhpcy5ib2lkLnBvc2l0aW9uKTtcclxuXHJcblx0XHRkaXN0YW5jZSA9IHRoaXMuZGVzaXJlZFZlbG9jaXR5Lmxlbmd0aCgpO1xyXG5cdFx0dGhpcy5kZXNpcmVkVmVsb2NpdHkubm9ybWFsaXplKCk7XHJcblxyXG5cdFx0aWYoZGlzdGFuY2UgPD0gc2xvd2luZ1JhZGlvdXMpe1xyXG5cdFx0XHR0aGlzLmRlc2lyZWRWZWxvY2l0eS5tdWx0aXBseVNjYWxhcih0aGlzLnNldHRpbmdzLm1heFZlbG9jaXR5ICogZGlzdGFuY2UgLyBzbG93aW5nUmFkaW91cyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5kZXNpcmVkVmVsb2NpdHkubXVsdGlwbHlTY2FsYXIodGhpcy5zZXR0aW5ncy5tYXhWZWxvY2l0eSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gUmV0dXJuIGZvcmNlXHJcblx0XHRyZXR1cm4gdGhpcy5kZXNpcmVkVmVsb2NpdHkuY2xvbmUoKS5zdWJ0cmFjdCh0aGlzLnZlbG9jaXR5KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEZvbGxvdyBwYXRoIGJ5IGluY3JlbWVudCB0byB0aGUgbmV4dCBub2RlIGlmIG5vZGUgaW5zaWRlIFNldHRpZ3MucGF0aFJhZGlvdXNcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3JbXX0gcGF0aCAgVmVjdG9yIGFycmF5IG9mIHRoZSBwYXRoXHJcblx0ICogQHJldHVybiB7dmVjdG9yfSAgICAgICAgIGN1cnJlbnQgdGFyZ2V0IG5vZGVcclxuXHQgKi9cclxuXHRkb0ZvbGxvd1BhdGgocGF0aCl7XHJcblx0XHRsZXQgdGFyZ2V0ID0gcGF0aFt0aGlzLmN1cnJlbnROb2RlUGF0aF07XHJcblx0XHRpZih0aGlzLmJvaWQucG9zaXRpb24uZGlzdGFuY2UodGFyZ2V0KSA8PSB0aGlzLnNldHRpbmdzLnBhdGhSYWRpb3VzICYmIHRoaXMuY3VycmVudE5vZGVQYXRoIDwgcGF0aC5sZW5ndGggLSAxKVxyXG5cdFx0XHR0aGlzLmN1cnJlbnROb2RlUGF0aCsrO1xyXG5cclxuXHRcdHJldHVybiB0YXJnZXQ7XHJcblx0fVxyXG5cclxuXHRkb0NvbGxpc2lvbkF2b2lkYW5jZShvYnN0YWNsZXMpe1xyXG5cdFx0bGV0IHR2U2NhbGFyID0gdGhpcy5zZXR0aW5ncy5tYXhTZWVBaGVhZCAqIHRoaXMudmVsb2NpdHkubGVuZ3RoKCkgLyB0aGlzLnNldHRpbmdzLm1heFZlbG9jaXR5LFxyXG5cdFx0XHR0diA9IHRoaXMudmVsb2NpdHkuY2xvbmUoKS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0dlNjYWxhciksXHJcblx0XHRcdGFoZWFkID0gdGhpcy5ib2lkLnBvc2l0aW9uLmNsb25lKCkuYWRkKHR2KTsgLy8gQWhlYWQgaXMgdGhlIHZlbG9jaXR5IHZlY3RvciwgYnV0IGxvbmdlclxyXG5cdFx0XHRcclxuXHRcdGxldCB0aHJlYXQgPSB0aGlzLm1vc3RUaHJlYXRpbmdPYnN0YWNsZShhaGVhZCwgb2JzdGFjbGVzKTtcclxuXHJcblx0XHRpZih0aHJlYXQpe1xyXG5cdFx0XHR0aGlzLmF2b2lkYW5jZUZvcmNlLnggPSBhaGVhZC54IC0gdGhyZWF0LmNlbnRlci54O1xyXG5cdFx0XHR0aGlzLmF2b2lkYW5jZUZvcmNlLnkgPSBhaGVhZC55IC0gdGhyZWF0LmNlbnRlci55O1xyXG5cclxuXHRcdFx0dGhpcy5hdm9pZGFuY2VGb3JjZS5ub3JtYWxpemUoKS5tdWx0aXBseVNjYWxhcih0aGlzLnNldHRpbmdzLm1heEF2b2lkYW5jZUZvcmNlKTtcclxuXHRcdH1lbHNlIHtcclxuXHRcdFx0dGhpcy5hdm9pZGFuY2VGb3JjZSA9IG5ldyBWZWN0b3IoMCwwKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5hdm9pZGFuY2VGb3JjZTtcclxuXHR9XHJcbiBcclxuXHJcblxyXG5cdC8qKlxyXG5cdCAqIFVwZGF0ZSBib2lkcyBwb3NpdGlvbiBieSBhZGRpbmcgYWxsIHRoZSBmb3JjZXMgdGhhdCB3YXMgcHVzaGVkIHRvIHRoZSBzdGVlcmluZ1xyXG5cdCAqIEBwYXJhbSAge2NyZWF0ZWpzLnRpY2tFdmVudH0gdGltZSBHYW1lIGxvb3AgdGltZVxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9ICAgICAgXHJcblx0ICovXHJcblx0dXBkYXRlKHRpbWUpe1xyXG5cdFx0dGhpcy50cnVuY2F0ZSh0aGlzLnN0ZWVyaW5nLCB0aGlzLnNldHRpbmdzLm1heEZvcmNlKTtcclxuXHRcdHRoaXMuc3RlZXJpbmcubXVsdGlwbHlTY2FsYXIoMS4wIC8gdGhpcy5zZXR0aW5ncy5tYXNzKTtcclxuXHJcblx0XHR0aGlzLnZlbG9jaXR5LmFkZCh0aGlzLnN0ZWVyaW5nKTtcclxuXHRcdHRoaXMudHJ1bmNhdGUodGhpcy52ZWxvY2l0eSwgdGhpcy5zZXR0aW5ncy5tYXhWZWxvY2l0eSk7XHJcblx0XHR0aGlzLnZlbG9jaXR5Lm11bHRpcGx5U2NhbGFyKHRpbWUuZGVsdGEgLyAxMDAwLjApO1xyXG5cclxuXHRcdHRoaXMuYm9pZC5wb3NpdGlvbi5hZGQodGhpcy52ZWxvY2l0eSlcclxuXHR9XHJcbn0iLCJcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2JzdGFjbGUge1xyXG5cdGNvbnN0cnVjdG9yKGNlbnRlcil7XHJcblx0XHR0aGlzLmNlbnRlciA9IGNlbnRlcjtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5pbXBvcnQgT2JzdGFjbGUgZnJvbSAnLi9vYnN0YWNsZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWN0YW5nbGVPYnN0YWNsZSBleHRlbmRzIE9ic3RhY2xlIHtcclxuXHRjb25zdHJ1Y3RvcihyZWN0KXtcclxuXHRcdHN1cGVyKG5ldyBWZWN0b3IocmVjdC54ICsgcmVjdC53aWR0aCAvIDIsIHJlY3QueSArIHJlY3QuaGVpZ2h0IC8gMikpO1xyXG5cdFx0dGhpcy5yZWN0ID0gcmVjdDtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFzZVRpbGUge1xyXG5cdGNvbnN0cnVjdG9yKHJlY3QsIHNldHRpbmdzKSB7XHJcblx0XHR0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XHJcblx0XHR0aGlzLnJlY3QgPSByZWN0O1x0XHRcclxuXHRcdHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yKHRoaXMucmVjdC54ICsgdGhpcy5yZWN0LndpZHRoIC8gMiwgdGhpcy5yZWN0LnkgKyB0aGlzLnJlY3QuaGVpZ2h0IC8gMik7XHJcblx0fVxyXG5cclxuXHRnZXQgaXNXYWxsKCl7IHJldHVybiB0aGlzLnNldHRpbmdzLndhbGw7IH1cclxuXHRnZXQgaXNDb252ZXJ0YWJsZSgpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy5jb252ZXJ0YWJsZTsgfVxyXG5cdGdldCBjYW5BdHRhY2soKXsgcmV0dXJuIHRoaXMuc2V0dGluZ3MuY2FuQXR0YWNrOyB9XHJcblxyXG5cdHVwZGF0ZSh0aW1lLCB1bml0cyl7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBHZW5lcmljVGlsZSBmcm9tICcuL2dlbmVyaWNUaWxlJztcclxuaW1wb3J0IFRvd2VyVGlsZSBmcm9tICcuL3Rvd2VyVGlsZSc7XHJcblxyXG5jb25zdCB0aWxlQ2xhc3NlcyA9IHtcclxuXHRHZW5lcmljVGlsZSxcclxuXHRUb3dlclRpbGVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXcmFwcGVyIGZvciBhbGwgdGhlIGRpZmZlcmVudCB0aWxlIHR5cGVzXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEeW5hbWljVGlsZSB7XHJcblx0Y29uc3RydWN0b3IoY2xhc3NOYW1lLCAuLi5hcmdzKXtcclxuXHRcdHJldHVybiBuZXcgdGlsZUNsYXNzZXNbY2xhc3NOYW1lXSguLi5hcmdzKTtcclxuXHR9XHJcbn0iLCJcclxuaW1wb3J0IEJhc2VUaWxlIGZyb20gJy4vYmFzZVRpbGUnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2VuZXJpY1RpbGUgZXh0ZW5kcyBCYXNlVGlsZSB7XHJcblx0Y29uc3RydWN0b3IoZHJhd0NvbnRhaW5lciwgLi4uYXJncyl7XHJcblx0XHRzdXBlciguLi5hcmdzKTtcclxuXHRcdHRoaXMuc2V0dXBHcmFwaGljcyhkcmF3Q29udGFpbmVyKTtcclxuXHR9XHJcblxyXG5cdGdldCBjb2xvcigpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy5jb2xvciB9XHJcblx0Z2V0IGJvcmRlckNvbG9yKCl7IHJldHVybiB0aGlzLnNldHRpbmdzLmJvcmRlckNvbG9yIH1cclxuXHJcblx0c2V0dXBHcmFwaGljcyhkcmF3Q29udGFpbmVyKXtcclxuXHRcdHRoaXMuc2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHRcdFxyXG5cdFx0aWYodGhpcy5ib3JkZXJDb2xvcil7XHJcblx0XHRcdHRoaXMuc2hhcGUuZ3JhcGhpY3Muc2V0U3Ryb2tlU3R5bGUoMSkuYmVnaW5TdHJva2UodGhpcy5ib3JkZXJDb2xvcik7XHJcblx0XHR9XHJcblxyXG4gXHRcdHRoaXMuc2hhcGUuZ3JhcGhpY3NcclxuIFx0XHRcdC5iZWdpbkZpbGwodGhpcy5jb2xvcilcclxuIFx0XHRcdC5kcmF3UmVjdCh0aGlzLnJlY3QueCwgdGhpcy5yZWN0LnksIHRoaXMucmVjdC53aWR0aCwgdGhpcy5yZWN0LmhlaWdodCk7XHJcbiBcdFx0XHRcclxuXHRcdGRyYXdDb250YWluZXIuYWRkQ2hpbGQodGhpcy5zaGFwZSk7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBCYXNlVGlsZSBmcm9tICcuL2Jhc2VUaWxlJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5cclxuaW1wb3J0IEFuaW1hdGlvbk1hbmFnZXIgZnJvbSAnLi4vYW5pbWF0aW9ucy9hbmltYXRpb25NYW5hZ2VyJztcclxuaW1wb3J0IFNob3QgZnJvbSAnLi4vYW5pbWF0aW9ucy9zaG90JztcclxuXHRcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG93ZXJUaWxlIGV4dGVuZHMgQmFzZVRpbGUge1xyXG5cdGNvbnN0cnVjdG9yKGRyYXdDb250YWluZXIsIC4uLmFyZ3Mpe1xyXG5cdFx0c3VwZXIoLi4uYXJncyk7XHJcblx0XHR0aGlzLmxhc3RTaG9vdCA9IDAuMDtcclxuXHRcdHRoaXMuYWltTGVuZ3RoID0gdGhpcy5yZWN0LndpZHRoIC8gMi4wO1xyXG5cdFx0dGhpcy5haW1TaGFwZTtcclxuXHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIgPSBkcmF3Q29udGFpbmVyO1xyXG5cdFx0dGhpcy5zZXR1cEdyYXBoaWNzKGRyYXdDb250YWluZXIpO1xyXG5cdH1cclxuXHJcblx0Z2V0IHJhbmdlKCl7IHJldHVybiB0aGlzLnNldHRpbmdzLnJhbmdlIHx8IDA7IH1cclxuXHRnZXQgZGFtYWdlKCl7IHJldHVybiB0aGlzLnNldHRpbmdzLmRhbWFnZSB8fCAwOyB9XHJcblx0Z2V0IHNob290aW5nSW50ZXJ2YWwoKSB7IHJldHVybiB0aGlzLnNldHRpbmdzLnNob290aW5nSW50ZXJ2YWwgfHwgNTAwIH1cclxuXHJcblx0c2V0dXBHcmFwaGljcyhkcmF3Q29udGFpbmVyKXtcclxuXHRcdGxldCBiYXNlU2hhcGUgPSBuZXcgY3JlYXRlanMuU2hhcGUoKTtcclxuXHRcdGJhc2VTaGFwZS5ncmFwaGljcy5iZWdpbkZpbGwodGhpcy5zZXR0aW5ncy5yZWN0Q29sb3IpLmRyYXdSZWN0KHRoaXMucmVjdC54LCB0aGlzLnJlY3QueSwgdGhpcy5yZWN0LndpZHRoLCB0aGlzLnJlY3QuaGVpZ2h0KTtcclxuIFx0XHRiYXNlU2hhcGUuZ3JhcGhpY3NcclxuIFx0XHRcdFx0XHQuc2V0U3Ryb2tlU3R5bGUoMilcclxuIFx0XHRcdFx0XHQuYmVnaW5GaWxsKHRoaXMuc2V0dGluZ3MuY29sb3IpXHJcbiBcdFx0XHRcdFx0LmRyYXdDaXJjbGUoXHJcbiBcdFx0XHRcdFx0XHR0aGlzLnJlY3QueCArIHRoaXMucmVjdC53aWR0aCAvIDIsIFxyXG4gXHRcdFx0XHRcdFx0dGhpcy5yZWN0LnkgKyB0aGlzLnJlY3QuaGVpZ2h0IC8gMiwgXHJcbiBcdFx0XHRcdFx0XHQodGhpcy5yZWN0LndpZHRoIC8gMikgLSAxKTtcdFxyXG5cclxuIFx0XHR0aGlzLmFpbVNoYXBlID0gbmV3IGNyZWF0ZWpzLlNoYXBlKCk7XHJcblx0XHRkcmF3Q29udGFpbmVyLmFkZENoaWxkKGJhc2VTaGFwZSk7XHJcblx0XHRkcmF3Q29udGFpbmVyLmFkZENoaWxkKHRoaXMuYWltU2hhcGUpO1xyXG5cdH1cclxuXHJcblx0dXBkYXRlQWltKHRhcmdldCl7XHJcblx0XHR0aGlzLmFpbVNoYXBlLmdyYXBoaWNzLmNsZWFyKCk7XHJcblxyXG5cdFx0bGV0IHhEaXN0ID0gdGFyZ2V0LnBvc2l0aW9uLnggLSB0aGlzLnBvc2l0aW9uLngsXHJcblx0XHRcdHlEaXN0ID0gdGFyZ2V0LnBvc2l0aW9uLnkgLSB0aGlzLnBvc2l0aW9uLnksXHJcblx0XHRcdGFuZ2xlID0gTWF0aC5hdGFuMigteURpc3QsIHhEaXN0KTtcclxuXHJcblx0XHRpZihhbmdsZSA8IDApXHJcblx0XHRcdGFuZ2xlICs9IDIgKiBNYXRoLlBJO1xyXG5cclxuXHRcdGxldCBhbmdsZVZlYyA9IG5ldyBWZWN0b3IoTWF0aC5jb3MoYW5nbGUpLCAtTWF0aC5zaW4oYW5nbGUpKSxcclxuXHRcdFx0bGluZVRvID0gdGhpcy5wb3NpdGlvbi5jbG9uZSgpLmFkZChhbmdsZVZlYy5tdWx0aXBseVNjYWxhcih0aGlzLmFpbUxlbmd0aCkpO1xyXG5cclxuXHRcdHRoaXMuYWltU2hhcGUuZ3JhcGhpY3NcclxuXHRcdFx0LnNldFN0cm9rZVN0eWxlKDIpXHJcblx0XHRcdC5iZWdpblN0cm9rZSh0aGlzLnNldHRpbmdzLmFpbUNvbG9yKVxyXG5cdFx0XHQubW92ZVRvKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KVxyXG5cdFx0XHQubGluZVRvKGxpbmVUby54LCBsaW5lVG8ueSk7XHJcblx0fVxyXG5cclxuXHR1cGRhdGUodGltZSwgdW5pdHMpe1xyXG5cdFx0c3VwZXIudXBkYXRlKHRpbWUsIHVuaXRzKTtcclxuXHJcblx0XHRsZXQgY2xvc2VVbml0cyA9IHVuaXRzLmZpbHRlcih1ID0+IHUucG9zaXRpb24gJiYgdS5wb3NpdGlvbi5kaXN0YW5jZSh0aGlzLnBvc2l0aW9uKSA8IHRoaXMucmFuZ2UpO1xyXG5cdFx0aWYoY2xvc2VVbml0cy5sZW5ndGggPiAwKSB7XHJcblx0XHRcdHRoaXMudXBkYXRlQWltKGNsb3NlVW5pdHNbMF0pO1xyXG5cclxuXHRcdFx0Ly8gU2hvb3RpbmdcclxuXHRcdFx0dGhpcy5sYXN0U2hvb3QgKz0gdGltZS5kZWx0YTtcclxuXHRcdFx0aWYodGhpcy5sYXN0U2hvb3QgPiB0aGlzLnNob290aW5nSW50ZXJ2YWwpe1xyXG5cdFx0XHRcdGNsb3NlVW5pdHNbMF0uZGFtYWdlZFRha2VuKHRoaXMuZGFtYWdlKTtcclxuXHRcdFx0XHR0aGlzLmxhc3RTaG9vdCAtPSB0aGlzLnNob290aW5nSW50ZXJ2YWw7XHRcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNob290aW5nXCIpO1xyXG5cclxuXHRcdFx0XHRBbmltYXRpb25NYW5hZ2VyLmFkZChuZXcgU2hvdCh0aGlzLmRyYXdDb250YWluZXIsIHRoaXMucG9zaXRpb24uY2xvbmUoKSwgY2xvc2VVbml0c1swXSkpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XHJcbmltcG9ydCBBc3NldHMgZnJvbSAnLi9hc3NldHMnO1xyXG5cclxuaW1wb3J0IFdvcmxkIGZyb20gJy4vd29ybGQnO1xyXG5pbXBvcnQgRHluYW1pY1VuaXQgZnJvbSAnLi91bml0cy9keW5hbWljVW5pdCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0TWFuYWdlciB7XHJcblx0Y29uc3RydWN0b3Ioc3RhZ2Upe1xyXG5cdFx0dGhpcy5zdGFnZSA9IHN0YWdlO1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IEFzc2V0cy5nZXQoXCJ1bml0c1wiKTtcclxuXHRcdHRoaXMudW5pdHMgPSBbXTtcclxuXHRcdHRoaXMud29ybGRPYnN0YWNsZXMgPSBudWxsO1xyXG5cclxuXHRcdHRoaXMuY3VycmVudFdhdmUgPSAwO1xyXG5cdFx0dGhpcy5vbmdvaW5nV2F2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy5zZW50V2F2ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy53YXZlUGF0aCA9IFtdO1xyXG5cclxuXHRcdEdhbWUud29ybGQub24oV29ybGQuRXZlbnRzLldPUkxEX0NIQU5HRSwgdGhpcy5vbldvcmxkQ2hhbmdlZC5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdGluaXQoKXtcclxuXHRcdHRoaXMucHJlcGFyZVdhdmUoKTsgLy8gU3RhcnQgc2VuZGluZyB3YXZlc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogV2lsbCBzZW5kIGEgd2F2ZSBiYXNlZCBvbiB0aGUgc2V0dGluZ3MgaW4gdW5pdHMuanNvblxyXG5cdCAqIEByZXR1cm4ge3ZvaWR9XHJcblx0ICovXHJcblx0cHJlcGFyZVdhdmUoKXtcclxuXHRcdGlmKHRoaXMub25nb2luZ1dhdmUpXHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcIkFscmVhZHkgc2VudCBhIHdhdmVcIik7XHJcblxyXG5cdFx0aWYodGhpcy5jdXJyZW50V2F2ZSA9PSB0aGlzLnNldHRpbmdzLndhdmVzLmxlbmd0aCl7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiTm8gbW9yZSB3YXZlcyFcIik7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgd2F2ZSA9IHRoaXMuc2V0dGluZ3Mud2F2ZXNbdGhpcy5jdXJyZW50V2F2ZV07XHJcblx0XHRjb25zb2xlLmxvZyhcIlN0YXJ0aW5nIHdhdmUgXCIgKyAodGhpcy5jdXJyZW50V2F2ZSArIDEpKTtcclxuXHRcdHRoaXMub25nb2luZ1dhdmUgPSB0cnVlO1xyXG5cdFx0dGhpcy5zZW5kVW5pdCh3YXZlLCAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFNlbmRpbmcgdW5pdHMgaW4gYSByZWN1cnNpb24gbWV0aG9kXHJcblx0ICogQHBhcmFtICB7b2JqZWN0fSB3YXZlICAgICAgU2V0dGluZ3MgZnJvbSB1bml0cy5qc29uXHJcblx0ICogQHBhcmFtICB7aW50fSBcdFx0XHQgIFNlbnRVbml0cyBOdW1iZXIgb2Ygc2VudCB1bml0c1xyXG5cdCAqIEByZXR1cm4ge3ZvaWR9ICAgICAgICAgICBcclxuXHQgKi9cclxuXHRzZW5kVW5pdCh3YXZlLCBzZW50VW5pdHMpe1xyXG5cdFx0aWYoc2VudFVuaXRzIDwgd2F2ZS5sZW5ndGgpe1xyXG5cdFx0XHR0aGlzLnVuaXRzLnB1c2godGhpcy5jcmVhdGVVbml0KHdhdmUpKTtcclxuXHRcdFx0c2VudFVuaXRzKys7XHJcblx0XHRcdHNldFRpbWVvdXQodGhpcy5zZW5kVW5pdC5iaW5kKHRoaXMpLCB0aGlzLnNldHRpbmdzLnVuaXRJbnRlcnZhbE1zLCB3YXZlLCBzZW50VW5pdHMpO1xyXG5cdFx0fSBlbHNle1xyXG5cdFx0XHR0aGlzLnNlbnRXYXZlID0gdHJ1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZVVuaXQoY3VycmVudFdhdmUpe1xyXG5cdFx0cmV0dXJuIG5ldyBEeW5hbWljVW5pdChjdXJyZW50V2F2ZS50eXBlLCB0aGlzLnN0YWdlLCB0aGlzLndhdmVQYXRoLm1hcChzID0+IHMuY2xvbmUoKSksIGN1cnJlbnRXYXZlLnByb3BzKTtcclxuXHR9XHJcblxyXG5cclxuXHJcblx0LyoqXHJcblx0ICogRXZlbnQgdGhhdCB0aGUgd29ybGQgaGFzIGJlZW4gY2hhbmdlZCwgYSBuZXcgdG93ZXIgZm9yIGV4YW1wbGVcclxuXHQgKiBAcGFyYW0gIHtXb3JsZH0gd29ybGQgXHJcblx0ICogQHJldHVybiB7dm9pZH0gICAgICAgXHJcblx0ICovXHJcblx0b25Xb3JsZENoYW5nZWQoZXZlbnQpe1xyXG5cdFx0bGV0IHdvcmxkID0gZXZlbnQuZGF0YTtcclxuXHRcdC8vIFVwZGF0ZSB0aGUgcGF0aCBmb3IgdGhlIHdhdmVcclxuXHRcdHRoaXMud2F2ZVBhdGggPSB3b3JsZC5jYWxjdWxhdGVQYXRoKHdvcmxkLnN0YXJ0LCB3b3JsZC5nb2FsKTtcclxuXHRcdHRoaXMud29ybGRPYnN0YWNsZXMgPSB3b3JsZC5vYnN0YWNsZXM7XHJcblxyXG5cdFx0Ly8gVXBkYXRlIGFsbCB0aGUgdW5pdHMgcGF0aFxyXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnVuaXRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGxldCBwYXRoID0gd29ybGQuY2FsY3VsYXRlUGF0aCh3b3JsZC5ncmlkLmdldEFycmF5UG9zKHRoaXMudW5pdHNbaV0ucG9zaXRpb24pLCB3b3JsZC5nb2FsKTtcclxuXHRcdFx0aWYocGF0aCAmJiBwYXRoLmxlbmd0aCA+IDApXHJcblx0XHRcdFx0dGhpcy51bml0c1tpXS5wYXRoID0gcGF0aDtcdFx0XHRcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHJcblxyXG5cclxuXHR1cGRhdGUodGltZSl7XHJcblx0XHRmb3IgKHZhciBpID0gdGhpcy51bml0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG5cdFx0XHRpZighdGhpcy51bml0c1tpXS5hbGl2ZSl7XHJcblx0XHRcdFx0dGhpcy51bml0c1tpXS5kZXN0cm95KCk7XHJcblx0XHRcdFx0dGhpcy51bml0cy5zcGxpY2UoaSwgMSk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR0aGlzLnVuaXRzW2ldLnVwZGF0ZSh0aW1lLCB0aGlzLndvcmxkT2JzdGFjbGVzKTtcclxuXHRcdH07XHJcblxyXG5cdFx0aWYodGhpcy51bml0cy5sZW5ndGggPCAxICYmIHRoaXMuc2VudFdhdmUpe1xyXG5cdFx0XHR0aGlzLmN1cnJlbnRXYXZlKys7XHJcblx0XHRcdHRoaXMub25nb2luZ1dhdmUgPSBmYWxzZTtcclxuXHRcdFx0dGhpcy5zZW50V2F2ZSA9IGZhbHNlO1xyXG5cdFx0XHRzZXRUaW1lb3V0KHRoaXMucHJlcGFyZVdhdmUuYmluZCh0aGlzKSwgdGhpcy5zZXR0aW5ncy53YXZlSW50ZXJ2YWxNcyk7XHJcblx0XHR9XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBHYW1lIGZyb20gJy4uL2dhbWUnO1xyXG5cclxuaW1wb3J0IFN0ZWVyaW5nIGZyb20gJy4uL2hlbHBlcnMvc3RlZXJpbmcnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJ3ZpY3Rvcic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlVW5pdCB7XHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3MpIHtcclxuXHRcdHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHRcdHRoaXMuaGVhbHRoID0gc2V0dGluZ3MuaGVhbHRoO1xyXG5cdFx0dGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IoMCwwKTtcclxuXHRcdHRoaXMuX3JlY3QgPSBuZXcgY3JlYXRlanMuUmVjdGFuZ2xlKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCBzZXR0aW5ncy53aWR0aCwgc2V0dGluZ3MuaGVpZ2h0KTtcdFx0XHJcblxyXG5cdFx0dGhpcy5zdGVlcmluZyA9IG5ldyBTdGVlcmluZyh0aGlzLCBzZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHRnZXQgYWxpdmUoKSB7IHJldHVybiB0aGlzLmhlYWx0aCA+IDA7IH1cclxuXHRnZXQgcmVjdCgpIHsgXHJcblx0XHR0aGlzLl9yZWN0LnggPSB0aGlzLnBvc2l0aW9uLng7XHJcblx0XHR0aGlzLl9yZWN0LnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblx0XHRyZXR1cm4gdGhpcy5fcmVjdDtcclxuXHR9XHJcblxyXG5cdGRhbWFnZWRUYWtlbihkYW1hZ2UpIHsgXHJcblx0XHR0aGlzLmhlYWx0aCAtPSBkYW1hZ2U7IFxyXG5cclxuXHRcdGlmKCF0aGlzLmFsaXZlKSB7XHJcblx0XHRcdEdhbWUucmVjaWV2ZUNhc2godGhpcy5zZXR0aW5ncy53b3J0aCB8fCA1MCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkZXN0cm95KCl7IHRoaXMuaGVhbHRoID0gMDsgfVx0XHJcblx0dXBkYXRlKHRpbWUpe31cclxufSIsIlxyXG5pbXBvcnQgR2FtZSBmcm9tICcuLi9nYW1lJztcclxuXHJcbmltcG9ydCBCYXNlVW5pdCBmcm9tICcuL2Jhc2VVbml0JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3JlZXAgZXh0ZW5kcyBCYXNlVW5pdCB7XHJcblx0Y29uc3RydWN0b3IoZHJhd0NvbnRhaW5lciwgcGF0aCwgc2V0dGluZ3Mpe1xyXG5cdFx0c3VwZXIoc2V0dGluZ3MpO1x0XHJcblx0XHR0aGlzLl9wYXRoID0gcGF0aDtcclxuXHRcdHRoaXMucG9zaXRpb24gPSBwYXRoWzBdLmNsb25lKCk7XHJcblx0XHR0aGlzLmdvYWwgPSBwYXRoW3BhdGgubGVuZ3RoIC0gMV07XHJcblx0XHR0aGlzLmRyYXdDb250YWluZXIgPSBkcmF3Q29udGFpbmVyO1xyXG5cclxuXHRcdHRoaXMuc2V0dXBHcmFwaGljcygpO1xyXG5cdH1cclxuXHJcblx0c2V0IHBhdGgodmFsdWUpe1xyXG5cdFx0dGhpcy5zdGVlcmluZy5yZXNldFBhdGgoKTtcclxuXHRcdHRoaXMuX3BhdGggPSB2YWx1ZTtcclxuXHR9XHJcblx0XHJcblx0c2V0dXBHcmFwaGljcygpe1xyXG5cdFx0dGhpcy5zaGFwZSA9IG5ldyBjcmVhdGVqcy5TaGFwZSgpO1xyXG4gXHRcdHRoaXMuc2hhcGUuZ3JhcGhpY3MuYmVnaW5GaWxsKFwiI0M0NDc0MVwiKS5kcmF3Q2lyY2xlKDAsIDAsIHRoaXMuc2V0dGluZ3Mud2lkdGggLyAyKTtcclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5hZGRDaGlsZCh0aGlzLnNoYXBlKTtcclxuXHR9XHJcblxyXG5cdGRlc3Ryb3koKXtcclxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcclxuXHRcdHRoaXMuZHJhd0NvbnRhaW5lci5yZW1vdmVDaGlsZCh0aGlzLnNoYXBlKTtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSh0aW1lLCBvYnN0YWNsZXMpIHtcclxuXHRcdGlmKHRoaXMucG9zaXRpb24uZGlzdGFuY2UodGhpcy5nb2FsKSA8PSAyKXtcclxuXHRcdFx0dGhpcy5kZXN0cm95KCk7XHJcblx0XHRcdEdhbWUubG9zZUxpZmUoKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnN0ZWVyaW5nLmZvbGxvd1BhdGgodGhpcy5fcGF0aCk7XHJcblx0XHQvL3RoaXMuc3RlZXJpbmcuY29sbGlzaW9uQXZvaWRhbmNlKG9ic3RhY2xlcyk7XHJcblx0XHR0aGlzLnN0ZWVyaW5nLnVwZGF0ZSh0aW1lKTtcclxuXHJcblx0XHR0aGlzLnNoYXBlLnggPSB0aGlzLnBvc2l0aW9uLng7XHJcblx0XHR0aGlzLnNoYXBlLnkgPSB0aGlzLnBvc2l0aW9uLnk7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBDcmVlcCBmcm9tICcuL2NyZWVwJztcclxuXHJcbmNvbnN0IHVuaXRDbGFzc2VzID0ge1xyXG5cdENyZWVwXHJcbn07XHJcblxyXG4vKipcclxuICogV3JhcHBlciBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgdW5pdCB0eXBlc1xyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHluYW1pY1VuaXQge1xyXG5cdGNvbnN0cnVjdG9yKGNsYXNzTmFtZSwgLi4uYXJncyl7XHJcblx0XHRyZXR1cm4gbmV3IHVuaXRDbGFzc2VzW2NsYXNzTmFtZV0oLi4uYXJncyk7XHJcblx0fVxyXG59IiwiXHJcbmltcG9ydCBrZXlNaXJyb3IgZnJvbSAna2V5TWlycm9yJztcclxuaW1wb3J0IFZlY3RvciBmcm9tICd2aWN0b3InO1xyXG5cclxuaW1wb3J0IEdhbWUsIHsga2V5TmFtZXMgfSBmcm9tICcuL2dhbWUnO1xyXG5pbXBvcnQgQXNzZXRzIGZyb20gJy4vYXNzZXRzJztcclxuXHJcbmltcG9ydCBHaXJkIGZyb20gJy4vZ3JpZCc7XHJcbmltcG9ydCBEeW5hbWljVGlsZSBmcm9tICcuL3RpbGVzL2R5bmFtaWNUaWxlJztcclxuaW1wb3J0IFJlY3RhbmdsZU9ic3RhY2xlIGZyb20gJy4vb2JzdGFjbGVzL3JlY3RhbmdsZU9ic3RhY2xlJztcclxuXHJcbmltcG9ydCBBU3RhciBmcm9tICcuL2hlbHBlcnMvYVN0YXInO1xyXG5pbXBvcnQgQXJyYXlIZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2FycmF5SGVscGVyJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXb3JsZCBleHRlbmRzIGNyZWF0ZWpzLkV2ZW50RGlzcGF0Y2hlciB7XHRcclxuXHRjb25zdHJ1Y3RvcihzdGFnZSl7XHRcdFxyXG5cdFx0c3VwZXIoKTtcclxuXHJcblx0XHR0aGlzLnNldHRpbmdzID0gQXNzZXRzLmdldChcIndvcmxkXCIpO1xyXG5cdFx0dGhpcy5tYXAgPSBBcnJheUhlbHBlci5yb3RhdGUodGhpcy5zZXR0aW5ncy5tYXApO1xyXG5cdFx0dGhpcy5ncmlkID0gW107XHJcblx0XHR0aGlzLnN0YWdlID0gc3RhZ2U7XHJcblx0XHR0aGlzLnN0YWdlLm9uKCdjbGljaycsIHRoaXMub25Xb3JsZENsaWNrLmJpbmQodGhpcykpO1xyXG5cclxuXHRcdHRoaXMuc3RhcnQgPSBudWxsOyAvLyBTdGFydCBwb3NpdGlvbiB3aGVyZSB0aGUgdW5pdHMgd2lsbCBjb21lIGZyb21cclxuXHRcdHRoaXMuZ29hbCA9IG51bGw7IC8vIFRoZSBwb3NpdGlvbiB3aGVyZSB0aGUgdW5pdHMgYXJlIHRyeWluZyB0byBnb1xyXG5cdFx0dGhpcy5tYXBJdGVyYXRvcigoeCwgeSwgdGlsZVR5cGUpID0+IHtcclxuXHRcdFx0aWYodGlsZVR5cGUuc3RhcnQpXHJcblx0XHRcdFx0dGhpcy5zdGFydCA9IHt4OngsIHk6eX07XHJcblxyXG5cdFx0XHRpZih0aWxlVHlwZS5nb2FsKVxyXG5cdFx0XHRcdHRoaXMuZ29hbCA9IHt4OngsIHk6eX07XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgRXZlbnRzKCkge1xyXG5cdFx0cmV0dXJuIGtleU1pcnJvcih7XHJcblx0XHRcdFdPUkxEX0NIQU5HRTogbnVsbCxcclxuXHRcdFx0UExBQ0VEX1RPV0VSOiBudWxsXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldCB0aWxlU2l6ZSgpeyByZXR1cm4gdGhpcy5zZXR0aW5ncy50aWxlU2l6ZTsgfVxyXG5cclxuXHQvKipcclxuXHQgKiBWZWN0b3Igc2l6ZSBvZiBoYWxmIHRoZSB0aWxlIHNpemVcclxuXHQgKiBAcmV0dXJuIHtWZWN0b3J9IFxyXG5cdCAqL1xyXG5cdGdldCBoYWxmVGlsZSgpeyByZXR1cm4gbmV3IFZlY3Rvcih0aGlzLnRpbGVTaXplIC8gMiwgdGhpcy50aWxlU2l6ZSAvIDIpOyB9XHJcblxyXG5cdGdldCBvYnN0YWNsZXMoKXtcclxuXHRcdGxldCBhcnIgPSBbXTtcclxuXHJcblx0XHR0aGlzLm1hcEl0ZXJhdG9yKCh4LCB5LCB0aWxlVHlwZSkgPT4ge1xyXG5cdFx0XHRpZih0aWxlVHlwZS53YWxsKVxyXG5cdFx0XHRcdGFyci5wdXNoKG5ldyBSZWN0YW5nbGVPYnN0YWNsZSh0aGlzLmdyaWQudGlsZXNbeF1beV0ucmVjdCkpO1xyXG5cdFx0fSlcclxuXHJcblx0XHRyZXR1cm4gYXJyO1xyXG5cdH1cclxuXHJcblx0aW5pdCgpe1xyXG5cdFx0dGhpcy5ncmlkID0gbmV3IEdpcmQoXHJcblx0XHRcdHRoaXMubWFwLmxlbmd0aCwgXHJcblx0XHRcdHRoaXMubWFwWzBdLmxlbmd0aCwgXHJcblx0XHRcdHRoaXMudGlsZVNpemUsXHJcblx0XHRcdHRoaXMudGlsZUp1ZGdlci5iaW5kKHRoaXMpKTtcclxuXHJcblx0XHR0aGlzLnJhaXNlRXZlbnQoV29ybGQuRXZlbnRzLldPUkxEX0NIQU5HRSwgdGhpcyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEZWNpZGVzIGFuZCBjcmVhdGUgdGhlIHRpbGVcclxuXHQgKiBAcGFyYW0gIHtpbnR9IGdyaWRYIFggaW4gZ3JpZCBhcnJheVxyXG5cdCAqIEBwYXJhbSAge2ludH0gZ3JpZFkgWSBpbiBncmlkIGFycmF5XHJcblx0ICogQHJldHVybiB7VGlsZX0gICAgICBcclxuXHQgKi9cclxuXHR0aWxlSnVkZ2VyKGdyaWRYLCBncmlkWSkge1xyXG5cdFx0bGV0IGdyaWRQb3MgPSB7IHg6IGdyaWRYLCB5OiBncmlkWSB9O1xyXG5cclxuXHRcdC8vIE1hcCBjb250YWlucyB3aGljaCB0aWxlIHR5cGUgaXQgaXMgMSwyLDMgZXRjLlxyXG5cdFx0bGV0IHR5cGVOdW1iZXIgPSB0aGlzLm1hcFtncmlkWF1bZ3JpZFldLnRvU3RyaW5nKCk7XHJcblx0XHRcclxuXHRcdC8vIFNldHMgdGhlIHRpbGUgdHlwZSBvbiB0aGUgZ3JpZCBwb3NpdGlvblxyXG5cdFx0cmV0dXJuIHRoaXMuY3JlYXRlVGlsZSh0eXBlTnVtYmVyLCBncmlkUG9zKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENyZWF0ZSB0aWxlIGJhc2VkIG9uIHR5cGVcclxuXHQgKiBAcGFyYW0gIHtpbnR9IHR5cGVOdW1iZXJcdCAgIFdoaWNoIHRpbGUgdHlwZSBudW1iZXIgMSwyLDMgZXRjXHJcblx0ICogQHBhcmFtICB7dmVjdG9yfSBncmlkUG9zICAgIHggJiB5IGluIHRoZSBncmlkIGFycmF5XHJcblx0ICogQHJldHVybiB7RHluYW1pY1RpbGV9ICAgICAgICAgICAgXHJcblx0ICovXHJcblx0Y3JlYXRlVGlsZSh0eXBlTnVtYmVyLCBncmlkUG9zKXtcclxuXHRcdGxldCByZWN0ID0gbmV3IGNyZWF0ZWpzLlJlY3RhbmdsZShcclxuXHRcdFx0Z3JpZFBvcy54ICogdGhpcy50aWxlU2l6ZSwgXHJcblx0XHRcdGdyaWRQb3MueSAqIHRoaXMudGlsZVNpemUsIFxyXG5cdFx0XHR0aGlzLnRpbGVTaXplLCB0aGlzLnRpbGVTaXplKSxcclxuXHRcdFx0dGlsZVNldHRpbmdzID0gdGhpcy5zZXR0aW5ncy50aWxlVHlwZXNbdHlwZU51bWJlci50b1N0cmluZygpXTtcclxuXHJcblx0XHRyZXR1cm4gbmV3IER5bmFtaWNUaWxlKFxyXG5cdFx0XHR0aWxlU2V0dGluZ3MudHlwZSwgXHJcblx0XHRcdHRoaXMuc3RhZ2UsXHJcblx0XHRcdHJlY3QsXHJcblx0XHRcdHRpbGVTZXR0aW5ncyk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTZXRzIGJvdGggdGhlIGdyaWQgdGlsZSBvYmplY3QgYW5kIGNoYW5nZSB0aGUgbWFwIHRvIHRoZSBzcGVjaWZpZWQgdHlwZU51bWJlclxyXG5cdCAqIEBwYXJhbSB7dmVjdG9yfSBncmlkUG9zICAgIHggJiB5IGluIHRoZSBncmlkIGFycmF5XHJcblx0ICogQHBhcmFtIHtpbnR9IHR5cGVOdW1iZXIgICAgV2hpY2ggdGlsZSB0eXBlIG51bWJlciAxLDIsMyBldGNcclxuXHQgKi9cclxuXHRzZXRUaWxlKGdyaWRQb3MsIHR5cGVOdW1iZXIpe1xyXG5cdFx0Ly8gU2V0IHRoZSBtYXAgbnVtYmVyLiBXaXRoIHRoaXMgd2UgZm9sbG93IHdoaWNoIHR5cGUgb2YgdGlsZSBpdCBpcy5cclxuXHRcdHRoaXMubWFwW2dyaWRQb3MueF1bZ3JpZFBvcy55XSA9IHBhcnNlSW50KHR5cGVOdW1iZXIpIHx8IHR5cGVOdW1iZXI7XHJcblxyXG5cdFx0Ly8gQ2hvb3NlIHRpbGUgdHlwZSBiYXNlZCBvbiBqc29uIHNldHRpbmdzXHJcblx0XHR0aGlzLmdyaWQudGlsZXNbZ3JpZFBvcy54XVtncmlkUG9zLnldID0gdGhpcy5jcmVhdGVUaWxlKHR5cGVOdW1iZXIsIGdyaWRQb3MpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ2FsY3VsYXRlcyBwYXRoIGJldHdlZW4gc3RhcnQgYW5kIGdvYWxcclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IHN0YXJ0ICBHcmlkIHBvc3Rpb25cclxuXHQgKiBAcGFyYW0gIHt2ZWN0b3J9IGdvYWwgICBHcmlkIHBvc3Rpb25cclxuXHQgKiBAcmV0dXJuIHt2ZWN0b3JbXX0gICAgICBBcnJheSBvZiBzY3JlZW4gdmVjdG9yXHJcblx0ICovXHJcblx0Y2FsY3VsYXRlUGF0aChzdGFydCwgZ29hbCl7XHJcblx0XHRsZXQgbm9kZXMgPSB0aGlzLmdyaWQuY3JlYXRlQVN0YXJOb2RlcygpO1xyXG5cdFx0cmV0dXJuIEFTdGFyLnNlYXJjaChub2Rlcywgbm9kZXNbc3RhcnQueF1bc3RhcnQueV0sIG5vZGVzW2dvYWwueF1bZ29hbC55XSkubWFwKG4gPT4gbi52ZWN0b3IpO1xyXG5cdH1cclxuXHJcblx0bWFwSXRlcmF0b3IoZnVuYyl7XHJcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubWFwLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5tYXBbMF0ubGVuZ3RoOyBqKyspIHtcclxuXHJcblx0XHRcdFx0bGV0IHR5cGVOdW1iZXIgPSB0aGlzLm1hcFtpXVtqXSxcclxuXHRcdFx0XHRcdHRpbGVUeXBlID0gdGhpcy5zZXR0aW5ncy50aWxlVHlwZXNbdHlwZU51bWJlci50b1N0cmluZygpXTtcclxuXHJcblx0XHRcdFx0ZnVuYyhpLCBqLCB0aWxlVHlwZSk7XHJcblx0XHRcdH07XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0cmFpc2VFdmVudChuYW1lLCBkYXRhKXtcclxuXHRcdGxldCBldmVudCA9IG5ldyBjcmVhdGVqcy5FdmVudChuYW1lKTtcclxuXHRcdGV2ZW50LmRhdGEgPSBkYXRhO1xyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuXHR9XHJcblxyXG5cclxuXHQvLyA9PT09IEVWRU5UUyA9PT09XHJcblx0XHJcblx0b25Xb3JsZENsaWNrKGNsaWNrKSB7XHJcblx0XHRsZXQgY2xpY2tQb3MgPSB0aGlzLnN0YWdlLmdsb2JhbFRvTG9jYWwoY2xpY2suc3RhZ2VYLCBjbGljay5zdGFnZVkpLFxyXG5cdFx0XHRncmlkUG9zID0gdGhpcy5ncmlkLmdldEFycmF5UG9zKGNsaWNrUG9zKSxcclxuXHRcdFx0Y2xpY2tlZFRpbGUgPSB0aGlzLmdyaWQudGlsZXNbZ3JpZFBvcy54XVtncmlkUG9zLnldO1xyXG5cdFx0XHRcclxuXHRcdGlmKGNsaWNrZWRUaWxlLmlzQ29udmVydGFibGUgJiYgR2FtZS5kb2NrLnNlbGVjdGVkVG93ZXIgIT0gbnVsbCAmJiBHYW1lLmJ1eWluZ1Rvd2VyKEdhbWUuZG9jay5zZWxlY3RlZFRvd2VyLnByaWNlIHx8IDEwMCkpIHtcdFx0XHRcclxuXHRcdFx0dGhpcy5zZXRUaWxlKGdyaWRQb3MsIEdhbWUuZG9jay5zZWxlY3RlZFRvd2VyLm5hbWUpO1xyXG5cdFx0XHR0aGlzLnJhaXNlRXZlbnQoV29ybGQuRXZlbnRzLldPUkxEX0NIQU5HRSwgdGhpcyk7XHJcblxyXG5cdFx0XHRpZihHYW1lLmtleXNba2V5TmFtZXMuc2hpZnRdICE9IHRydWUpe1xyXG5cdFx0XHRcdEdhbWUuZG9jay5zZWxlY3RlZFRvd2VyID0gbnVsbDtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblxyXG5cclxuXHQvLyA9PT09IEdBTUUgTE9PUFMgPT09PVxyXG5cclxuXHR1cGRhdGUodGltZSl7XHJcblx0XHRmb3IgKHZhciBpID0gdGhpcy5ncmlkLnRpbGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcblx0XHRcdGZvciAodmFyIGogPSB0aGlzLmdyaWQudGlsZXNbaV0ubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0pIHtcclxuXHRcdFx0XHR0aGlzLmdyaWQudGlsZXNbaV1bal0udXBkYXRlKHRpbWUsIEdhbWUudW5pdE1hbmFnZXIudW5pdHMpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRkcmF3KHN0YWdlLCB0aW1lKXtcclxuXHR9XHJcbn0iXX0=
