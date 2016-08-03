
import keyMirror from 'keyMirror';
import Vector from 'victor';

import Gird from './grid';
import DynamicTile from './tiles/dynamicTile';

import AStar from './helpers/aStar';
import ArrayHelper from './helpers/arrayHelper';

export default class World extends createjs.EventDispatcher {	
	constructor(stage, settings){
		super();

		this.settings = settings;
		this.map = ArrayHelper.rotate(settings.map);

		this.drawContainer = new createjs.Container();
		this.drawContainer.on('click', this.onWorldClick.bind(this));
		stage.addChild(this.drawContainer);

		this.grid = new Gird(
			this.map.length, 
			this.map[0].length, 
			World.tileSize,
			this.tileJudger.bind(this));
	}

	static get Events() {
		return keyMirror({
			WORLD_CHANGE: null
		});
	}

	static get tileSize(){
		return 40;
	}

	/**
	 * Vector size of half the tile size
	 * @return {Vector} 
	 */
	static halfTile(){
		return new Vector(World.tileSize / 2, World.tileSize / 2);
	}

	/**
	 * Start position where the units will come from
	 * @return {Vector} 
	 */
	get start(){
		//return Vector.fromObject(this.settings.start).multiplyScalar(World.tileSize).add(World.halfTile());
		return this.settings.start;
	}

	/**
	 * The position where the units are trying to go
	 * @return {Vector} 
	 */
	get goal(){
		//return Vector.fromObject(this.settings.goal).multiplyScalar(World.tileSize).add(World.halfTile());
		return this.settings.goal;
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
	 * Create tile based on type
	 * @param  {int} typeNumber	   Which tile type number 1,2,3 etc
	 * @param  {vector} gridPos    x & y in the grid array
	 * @return {DynamicTile}            
	 */
	createTile(typeNumber, gridPos){
		let rect = new createjs.Rectangle(
			gridPos.x * World.tileSize, 
			gridPos.y * World.tileSize, 
			World.tileSize, World.tileSize),
			tileSettings = this.settings.tileTypes[typeNumber.toString()];

		return new DynamicTile(
			tileSettings.type, 
			this.drawContainer,
			rect,
			tileSettings);
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

	/**
	 * Calculates path between start and goal
	 * @param  {vector} start  Grid postion
	 * @param  {vector} goal   Grid postion
	 * @return {vector[]}      Array of screen vector
	 */
	calculatePath(start, goal){
		let nodes = this.grid.createAStarNodes();
		return AStar.search(nodes, nodes[start.x][start.y], nodes[goal.x][goal.y]).map(n => n.vector);
	}



	// ==== EVENTS ====

	onWorldClick(click){
		let gridPos = this.grid.getArrayPos({x: click.stageX, y: click.stageY})
		if(gridPos && this.grid.tiles[gridPos.x][gridPos.y].isConvertable) {
			this.setTile(gridPos, 1) // TODO: Change this based on which tower user has choosen
			this.dispatchEvent(World.Events.WORLD_CHANGE);
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