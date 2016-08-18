
import keyMirror from 'keyMirror';
import Vector from 'victor';

import Game, { keyNames } from './game';
import Assets from './assets';

import Gird from './grid';
import DynamicTile from './tiles/dynamicTile';
import RectangleObstacle from './obstacles/rectangleObstacle';

import AStar from './helpers/aStar';
import ArrayHelper from './helpers/arrayHelper';


export default class World extends createjs.EventDispatcher {	
	constructor(stage){		
		super();

		this.settings = Assets.get("world");
		this.map = ArrayHelper.rotate(this.settings.map);
		this.grid = [];
		this.stage = stage;
		this.stage.on('click', this.onWorldClick.bind(this));

		this.start = null; // Start position where the units will come from
		this.goal = null; // The position where the units are trying to go
		this.mapIterator((x, y, tileType) => {
			if(tileType.start)
				this.start = {x:x, y:y};

			if(tileType.goal)
				this.goal = {x:x, y:y};
		});
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

	get obstacles(){
		let arr = [];

		this.mapIterator((x, y, tileType) => {
			if(tileType.wall)
				arr.push(new RectangleObstacle(this.grid.tiles[x][y].rect));
		})

		return arr;
	}

	init(){
		this.grid = new Gird(
			this.map.length, 
			this.map[0].length, 
			this.tileSize,
			this.tileJudger.bind(this));

		this.raiseEvent(World.Events.WORLD_CHANGE, this);
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

	mapIterator(func){
		for (var i = 0; i < this.map.length; i++) {
			for (var j = 0; j < this.map[0].length; j++) {

				let typeNumber = this.map[i][j],
					tileType = this.settings.tileTypes[typeNumber.toString()];

				func(i, j, tileType);
			};
		};
	}

	raiseEvent(name, data){
		let event = new createjs.Event(name);
		event.data = data;
		this.dispatchEvent(event);
	}


	// ==== EVENTS ====
	
	onWorldClick(click) {
		let clickPos = this.stage.globalToLocal(click.stageX, click.stageY),
			gridPos = this.grid.getArrayPos(clickPos),
			clickedTile = this.grid.tiles[gridPos.x][gridPos.y];
			
		if(clickedTile.isConvertable && Game.dock.selectedTower != null && Game.buyingTower(Game.dock.selectedTower.price || 100)) {			
			this.setTile(gridPos, Game.dock.selectedTower.name);
			this.raiseEvent(World.Events.WORLD_CHANGE, this);

			if(Game.keys[keyNames.shift] != true){
				Game.dock.selectedTower = null;
			}
		}
	}



	// ==== GAME LOOPS ====

	update(time){
		for (var i = this.grid.tiles.length - 1; i >= 0; i--) {
			for (var j = this.grid.tiles[i].length - 1; j >= 0; j--) {
				this.grid.tiles[i][j].update(time, Game.unitManager.units);
			}
		}
	}

	draw(stage, time){
	}
}