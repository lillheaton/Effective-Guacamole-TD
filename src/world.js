
import Gird from './grid';
import DynamicTile from './tiles/dynamicTile';

export default class World {
	constructor(stage, settings){
		this.settings = settings;
		this.map = settings.map;

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
	 * Decide what tile type it should be.
	 * @param  {int} gridX X in grid array
	 * @param  {int} gridY Y in grid array
	 * @return {Tile}      
	 */
	tileJudger(gridX, gridY) {
		let rect = new createjs.Rectangle(
			gridX * World.tileSize(), 
			gridY * World.tileSize(), 
			World.tileSize() - 2, World.tileSize() - 2);

		// Choose tile type based on json settings
		let tileNumber = this.map[gridX][gridY].toString(),
			tile = this.settings.tileTypes[tileNumber];

		return new DynamicTile(tile.type, rect, this.drawContainer);
	}

	onWorldClick(click){
		let gridPos = this.grid.getArrayPos({x: click.stageX, y: click.stageY})
		console.log(gridPos);
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
