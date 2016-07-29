
import BaseTile from './baseTile';
	
export default class TowerTile extends BaseTile {
	constructor(...args){
		super(...args);

		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill("#999966").drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		this.drawContainer.addChild(this.shape);
	}
}