
import BaseTile from './baseTile';
import Color from '../color';

export default class GenericTile extends BaseTile {
	constructor(drawContainer, ...args){
		super(...args);
		this.setupGraphics(drawContainer);
	}

	get color(){ return this.settings.color || Color.green; }
	get borderColor(){ return this.settings.borderColor }

	setupGraphics(drawContainer){
		this.shape = new createjs.Shape();
		
		if(this.borderColor){
			this.shape.graphics.setStrokeStyle(1).beginStroke(this.borderColor);
		}

 		this.shape.graphics
 			.beginFill(this.color)
 			.drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
 			
		drawContainer.addChild(this.shape);
	}

	update(time){
		//this.shape.x += 1;
	}
}