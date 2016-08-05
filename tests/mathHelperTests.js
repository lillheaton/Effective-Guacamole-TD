'use strict';

import MathHelper from '../src/helpers/mathHelper';

var should = require('chai').should();

describe('MathHelper', function(){
	describe('#snapToFloor()', function(){
		it('should snap to floor', function(){
			var value = MathHelper.snapToFloor(75, 40);
			value.should.equal(40);
		});

		it('could be used to find grid position', function(){
			var cellSize = 50,
				value = Math.floor(MathHelper.snapToFloor(175, cellSize) / cellSize);
			value.should.equal(3);
		});

		it('could be used to find grid position with padding', function(){
			var cellSize = 10,
				padding = 5,
				val1 = Math.floor(MathHelper.snapToFloor(18, cellSize, padding) / cellSize),
				val2 = Math.floor(MathHelper.snapToFloor(28, cellSize, padding) / cellSize),
				val3 = Math.floor(MathHelper.snapToFloor(38, cellSize, padding) / cellSize);

			val1.should.equal(1);
			val2.should.equal(2);
			val3.should.equal(3);
		});
	});
});