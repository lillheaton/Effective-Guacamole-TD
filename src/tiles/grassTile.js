
import BaseTile from './baseTile';
import Color from '../color';

export default class GrassTile extends BaseTile {
	constructor(drawContainer, ...args){
		super(...args);
		this.setupGraphics(drawContainer);
	}

	setupGraphics(drawContainer){
		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill(Color.green).drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		drawContainer.addChild(this.shape);
	}

	update(time){
		//this.shape.x += 1;
	}
}