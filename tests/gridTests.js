'use strict';

import Grid from '../src/grid';

var should = require('chai').should();

describe('Grid', function(){
	var testGrid,
		gridX = 10,
		gridY = 10,
		tileSize = 5;

	before(function(){
		testGrid = new Grid(gridX, gridY, tileSize, function(gridPosX, gridPosY){
			return { 
				x: gridPosX, 
				y: gridPosY, 
				type: gridPosX == 2 && gridPosY == 2 ? "tower" : "grass"
			};
		});
	});

	describe('#generate()', function(){
		it('should generate grid on instance', function(){
			testGrid.tiles.should.have.length(gridX);
			testGrid.tiles[0].should.have.length(gridY);
		});
	});

	describe('#getTile()', function(){
		it('should get cell based on screen pos', function(){
			testGrid.getTile({x: 12, y: 12}).should.have.property('type').that.equals('tower');
		});
	});
});
