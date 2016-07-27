'use strict';

import Grid from '../src/grid';

var should = require('chai').should();

describe('Grid', function(){
	var testGrid,
		gridX = 10,
		gridY = 10,
		cellSize = 5;

	before(function(){
		testGrid = new Grid(gridX, gridY, cellSize, function(gridPosX, gridPosY){
			return { 
				x: gridPosX, 
				y: gridPosY, 
				type: gridPosX == 2 && gridPosY == 2 ? "tower" : "grass"
			};
		});
	});

	describe('#generate()', function(){
		it('should generate grid on instance', function(){
			testGrid.cells.should.have.length(gridX);
			testGrid.cells[0].should.have.length(gridY);
		});
	});

	describe('#getCell()', function(){
		it('should get cell based on screen pos', function(){
			testGrid.getCell({x: 12, y: 12}).should.have.property('type').that.equals('tower');
		});
	});
});
