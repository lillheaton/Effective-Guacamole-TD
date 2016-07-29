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
				value = MathHelper.snapToFloor(175, cellSize) / cellSize;
			value.should.equal(3);  
		});
	});
});