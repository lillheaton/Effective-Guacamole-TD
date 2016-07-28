'use strict';

import World from '../src/world';
var should = require('chai').should();

describe('World', function(){
	var testWorld;

	before(function(){
		testWorld = new World();
	});

	describe('#constructor()', function(){
		it('should generate the grid', function(){
			testWorld.should.have.property('grid');
		});

		it('generated grid should contain tiles', function(){
			testWorld.grid.should.have.property('tiles');
			testWorld.grid.tiles.length.should.be.above(2);
			testWorld.grid.tiles[0].length.should.be.above(2);
		});
	});
});