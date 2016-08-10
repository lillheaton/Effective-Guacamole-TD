'use strict';

import Steering from '../src/helpers/steering';
import Vector from 'victor';
var should = require('chai').should();

describe('Steering', function(){
	let boid, steering;

	before(function(){
		boid = { position: new Vector(0,0) };
		steering = new Steering(boid);
	});

	describe('#intersectsRectangle()', function(){
		it('point should let us know if it intersects rectangle', function(){
			
		})
	});
})
