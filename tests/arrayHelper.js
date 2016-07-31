'use strict';

import ArrayHelper from '../src/helpers/arrayHelper';
var should = require('chai').should();

describe('ArrayHelper', function(){

	describe('#rotate()', function(){
		it('should rotate array', function(){
			let arr = ArrayHelper.rotate([[0,0,0], [0,0,0]]);
			arr.should.have.length(3);
			arr[0].should.have.length(2);
		})
	});

});