
import BaseTile from './baseTile';

export default class GrassTile extends BaseTile {
	constructor(...args){
		super(...args);

		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill("#00b300").drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		this.drawContainer.addChild(this.shape);
	}

	update(time){
		//this.shape.x += 1;
	}
}