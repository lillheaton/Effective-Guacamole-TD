
import Vector from 'victor';
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
	getArrayPos(pos, padding){
		let gridPos = {
			x: Math.floor(MathHelper.snapToFloor(pos.x, this.tileSize, padding) / this.tileSize),
			y: Math.floor(MathHelper.snapToFloor(pos.y, this.tileSize, padding) / this.tileSize)
		};

		if(this.validArrayPos(gridPos))
			return gridPos;

		return null;
	}

	/**
	 * Converts grid array pos {x,y} to screen positions
	 * @param  {{x,y}} pos Grid postion
	 * @return {vector}     Screen vector
	 */
	getScreenVector(pos){
		return Vector.fromObject(pos)
				.multiplyScalar(this.tileSize)
				.add(new Vector(this.tileSize / 2, this.tileSize / 2));
	}

	/**
	 * Checks if the grid pos is inside of array length
	 * @param  {{x,y}} pos Grid position
	 * @return {bool}     
	 */
	validArrayPos(pos){
		return pos.x < this.x && pos.y < this.y
	}

	/**
	 * Generate nodes  based on grid tiles. Used by aStar to calculate path
	 * @return {nodes[][]}
	 */
	createAStarNodes(){
		let nodes = [];
		for (var i = 0; i < this.tiles.length; i++) {
			nodes[i] = [];
			for (var j = 0; j < this.tiles[0].length; j++) {
				nodes[i][j] = {
					x: i, y: j, f: 0, g: 0, h: 0,
					vector: this.getScreenVector({x: i, y: j}),
					isWall: this.tiles[i][j].isWall
				};
			};
		};

		return nodes;
	}	
}