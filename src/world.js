
import Gird from './grid';
import Vector from 'victor';
import ArrayHelper from './helpers/arrayHelper';
import DynamicTile from './tiles/dynamicTile';

export default class World {
	constructor(stage, settings){
		this.settings = settings;
		this.map = ArrayHelper.rotate(settings.map);

		this.drawContainer = new createjs.Container();
		this.drawContainer.on('click', this.onWorldClick.bind(this));
		stage.addChild(this.drawContainer);

		this.grid = new Gird(
			this.map.length, 
			this.map[0].length, 
			World.tileSize(),
			this.tileJudger.bind(this));
	}

	static tileSize(){
		return 40;
	}

	/**
	 * Vector size of half the tile size
	 * @return {Vector} 
	 */
	static halfTile(){
		return new Vector(this.tileSize() / 2, this.tileSize() / 2);
	}

	/**
	 * Start position where the units will come from
	 * @return {Vector} 
	 */
	get start(){
		return Vector.fromObject(this.settings.start).multiplyScalar(World.tileSize()).add(World.halfTile());
	}

	/**
	 * The position where the units are trying to go
	 * @return {Vector} 
	 */
	get goal(){
		return Vector.fromObject(this.settings.goal).multiplyScalar(World.tileSize()).add(World.halfTile());
	}

	/**
	 * Decide what tile type it should be.
	 * @param  {int} gridX X in grid array
	 * @param  {int} gridY Y in grid array
	 * @return {Tile}      
	 */
	tileJudger(gridX, gridY) {
		let gridPos = { x: gridX, y: gridY };

		// Map contains which tile type it is 1,2,3 etc.
		let typeNumber = this.map[gridX][gridY].toString();
		
		// Sets the tile type on the grid position
		return this.createTile(typeNumber, gridPos);
	}

	/**
	 * Get the tile settings from the current map
	 * @param  {vector} gridPos x & y in the grid array
	 * @return {object}         The tile type specified in the JSON settings file
	 */
	getTileSettings(gridPos){
		let typeNumber = this.map[gridPos.x][gridPos.y].toString();
		return this.settings.tileTypes[typeNumber];
	}

	/**
	 * Create tile based on type
	 * @param  {int} typeNumber	   Which tile type number 1,2,3 etc
	 * @param  {vector} gridPos    x & y in the grid array
	 * @return {DynamicTile}            
	 */
	createTile(typeNumber, gridPos){
		let rect = new createjs.Rectangle(
			gridPos.x * World.tileSize(), 
			gridPos.y * World.tileSize(), 
			World.tileSize() - 2, World.tileSize() - 2);

		return new DynamicTile(
			this.settings.tileTypes[typeNumber.toString()].type, 
			this.drawContainer,
			rect);
	}

	/**
	 * Sets both the grid tile object and change the map to the specified typeNumber
	 * @param {vector} gridPos    x & y in the grid array
	 * @param {int} typeNumber    Which tile type number 1,2,3 etc
	 */
	setTile(gridPos, typeNumber){
		// Set the map number. With this we follow which type of tile it is.
		this.map[gridPos.x][gridPos.y] = parseInt(typeNumber) || typeNumber;

		// Choose tile type based on json settings
		this.grid.tiles[gridPos.x][gridPos.y] = this.createTile(typeNumber, gridPos);
	}



	// ==== EVENTS ====

	onWorldClick(click){
		let gridPos = this.grid.getArrayPos({x: click.stageX, y: click.stageY})
		if(gridPos && this.getTileSettings(gridPos).convertable) {
			this.setTile(gridPos, 1) // TODO: Change this based on which tower user has choosen
		}
	}



	// ==== GAME LOOPS ====

	update(time){
		for (var i = this.grid.tiles.length - 1; i >= 0; i--) {
			for (var j = this.grid.tiles[i].length - 1; j >= 0; j--) {
				this.grid.tiles[i][j].update(time);
			}
		}
	}

	draw(stage, time){
	}
}