
import MathHelper from './utils/mathHelper';

export default class Grid {
	constructor(x, y, cellSize, cellJudger){
		this.cells = [];
		this.x = x
		this.y = y;
		this.cellSize = cellSize;

		this.generate(cellJudger);
	}

	/**
	 * Populate cells
	 * @param  {function} cellJudger Will determine and return a cell
	 * @return {void}
	 */
	generate(cellJudger) {
		for (var i = 0; i < this.x; i++) {
			this.cells[i] = [];

			for (var j = 0; j < this.y; j++) {
				this.cells[i][j] = cellJudger(i, j);
			}
		}
	}

	/**
	 * Get cell based on screen vector
	 * @param  {vector} pos Screen vector
	 * @return {Cell}     
	 */
	getCell(pos){
		let gridPos = this.getGridPos(pos);

		if(gridPos.x < this.x && gridPos.y < this.y){
			return this.cells[gridPos.x][gridPos.y];
		}

		return null;
	}

	/**
	 * Get grid position based on screen vector
	 * @param  {vector} pos Screen vector
	 * @return {object}     Snap grid position
	 */
	getGridPos(pos){
		return {
			x: MathHelper.snapToFloor(pos.x, this.cellSize) / this.cellSize,
			y: MathHelper.snapToFloor(pos.y, this.cellSize) / this.cellSize
		};
	}
}