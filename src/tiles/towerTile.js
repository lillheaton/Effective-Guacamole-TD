
import BaseTile from './baseTile';
import Color from '../color';
	
export default class TowerTile extends BaseTile {
	constructor(drawContainer, ...args){
		super(...args);
		this.setupGraphics(drawContainer);
	}

	get range(){ return this.settings.range || 0; }
	get damage(){ return this.settings.damage || 0; }

	setupGraphics(drawContainer){
		this.shape = new createjs.Shape();
 		this.shape.graphics
 					.setStrokeStyle(2)
 					.beginStroke(Color.white)
 					.beginFill(Color.gray)
 					.drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
		drawContainer.addChild(this.shape);
	}

	update(time, units){
		super.update(time, units);

		let closeUnits = units.filter(u => u.position.distance(this.position) < this.range);
		if(closeUnits.length > 0) {
			console.log("Attack unit");
			closeUnits[0].damagedTaken(this.damage);
		}
	}
}