
import Gird from './grid';
import DynamicTile from './tiles/dynamicTile';

let CreateJs = window.createjs;

export default class World {
	constructor(stage, settings){
		this.settings = settings;
		this.map = settings.map;

		this.drawContainer = new CreateJs.Container();
		this.drawContainer.setBounds(100, 100);
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
	 * Decide what tile type it should be.
	 * @param  {int} gridX X in grid array
	 * @param  {int} gridY Y in grid array
	 * @return {Tile}      
	 */
	tileJudger(gridX, gridY) {
		let rect = new CreateJs.Rectangle(
			gridX * World.tileSize(), 
			gridY * World.tileSize(), 
			World.tileSize() - 2, World.tileSize() - 2);

		let tile = this.map[gridX][gridY].toString();
		return new DynamicTile(this.settings.tileTypes[tile], rect, this.drawContainer);
	}

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
