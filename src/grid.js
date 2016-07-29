
import MathHelper from './helpers/mathHelper';

export default class Grid {
	constructor(x, y, tileSize, tileJudger){
		this.tiles = [];
		this.x = x
		this.y = y;
		this.tileSize = tileSize;

		this.generate(tileJudger);
	}

	/**
	 * Populate cells
	 * @param  {function} tileJudger Will determine and return a cell
	 * @return {void}
	 */
	generate(tileJudger) {
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
	getTile(pos){
		let gridPos = this.getArrayPos(pos);

		if(gridPos != null){
			return this.tiles[gridPos.x][gridPos.y];
		}

		return null;
	}

	/**
	 * Get grid position based on screen vector
	 * @param  {vector} pos Screen vector
	 * @return {object}     Snap grid position
	 */
	getArrayPos(pos){
		let gridPos = {
			x: MathHelper.snapToFloor(pos.x, this.tileSize) / this.tileSize,
			y: MathHelper.snapToFloor(pos.y, this.tileSize) / this.tileSize
		};

		if(this.validArrayPos(gridPos))
			return gridPos;

		return null;
	}

	validArrayPos(pos){
		return pos.x < this.x && pos.y < this.y
	}
}