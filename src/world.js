
import keyMirror from 'keyMirror';
import Vector from 'victor';

import GameState from './gameState';

import Gird from './grid';
import DynamicTile from './tiles/dynamicTile';

import AStar from './helpers/aStar';
import ArrayHelper from './helpers/arrayHelper';


export default class World {	
	constructor(stage, settings){		
		this.settings = settings;
		this.map = ArrayHelper.rotate(settings.map);
		this.grid = [];
		this.stage = stage;
		this.stage.on('click', this.onWorldClick.bind(this));

		this.start = null; //Start position where the units will come from
		this.goal = null; //The position where the units are trying to go
		this.findUnitsOriginAndGoal();
	}

	static get Events() {
		return keyMirror({
			WORLD_CHANGE: null,
			PLACED_TOWER: null
		});
	}

	get tileSize(){ return this.settings.tileSize; }

	/**
	 * Vector size of half the tile size
	 * @return {Vector} 
	 */
	get halfTile(){ return new Vector(this.tileSize / 2, this.tileSize / 2); }

	init(){
		this.grid = new Gird(
			this.map.length, 
			this.map[0].length, 
			this.tileSize,
			this.tileJudger.bind(this));

		GameState.raiseEvent(World.Events.WORLD_CHANGE, this);
	}

	/**
	 * Decides and create the tile
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
			gridPos.x * this.tileSize, 
			gridPos.y * this.tileSize, 
			this.tileSize, this.tileSize),
			tileSettings = this.settings.tileTypes[typeNumber.toString()];

		return new DynamicTile(
			tileSettings.type, 
			this.stage,
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

	/**
	 * Find units origin and where they are trying to go
	 * @return {void} 
	 */
	findUnitsOriginAndGoal(){
		for (var i = 0; i < this.map.length; i++) {
			for (var j = 0; j < this.map[0].length; j++) {
				let typeNumber = this.map[i][j],
					tileType = this.settings.tileTypes[typeNumber.toString()];

				if(tileType.start)
					this.start = {x:i, y:j};

				if(tileType.goal)
					this.goal = {x:i, y:j};
			};
		};
	}

	updateTiles(time, units){
		for (var i = this.grid.tiles.length - 1; i >= 0; i--) {
			for (var j = this.grid.tiles[i].length - 1; j >= 0; j--) {
				this.grid.tiles[i][j].update(time, units);
			}
		}
	}

	// ==== EVENTS ====

	onWorldClick(click){
		let gridPos = this.grid.getArrayPos({x: click.stageX, y: click.stageY});
		if(gridPos && this.grid.tiles[gridPos.x][gridPos.y].isConvertable && GameState.placeingNewTower) {
			this.setTile(gridPos, GameState.selectedTower);

			GameState.raiseEvent(World.Events.PLACED_TOWER);
			GameState.raiseEvent(World.Events.WORLD_CHANGE, this);
		}
	}





	// ==== GAME LOOPS ====

	update(time, units){
		this.updateTiles(time, units);
	}

	draw(stage, time){
	}
}