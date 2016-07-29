
import Tile from './tile';
let CreateJs = window.createjs;
	
export default class TowerTile extends Tile {
	constructor(...args){
		super(...args);

		this.shape = new CreateJs.Shape();
 		this.shape.graphics.beginFill("#999966").drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		this.drawContainer.addChild(this.shape);
	}
}