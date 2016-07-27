
import Vector from 'victor';

export default class Cell {
	constructor(gridX, gridY, cellSize) {
		this.gridX = gridX;
		this.gridY = gridY;
		this.position = new Vector(gridX * cellSize, gridY * cellSize);
	}

	update(time){

	}

	draw(stage, time){
	}
}