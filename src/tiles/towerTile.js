
import BaseTile from './baseTile';
import Vector from 'victor';

import AnimationManager from '../animations/animationManager';
import Shot from '../animations/shot';
	
export default class TowerTile extends BaseTile {
	constructor(drawContainer, ...args){
		super(...args);
		this.lastShoot = 0.0;
		this.aimLength = this.rect.width / 2.0;
		this.aimShape;

		this.drawContainer = drawContainer;
		this.setupGraphics(drawContainer);
	}

	get range(){ return this.settings.range || 0; }
	get damage(){ return this.settings.damage || 0; }
	get shootingInterval() { return this.settings.shootingInterval || 500 }

	setupGraphics(drawContainer){
		let baseShape = new createjs.Shape();
		baseShape.graphics.beginFill(this.settings.rectColor).drawRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
 		baseShape.graphics
 					.setStrokeStyle(2)
 					.beginFill(this.settings.color)
 					.drawCircle(
 						this.rect.x + this.rect.width / 2, 
 						this.rect.y + this.rect.height / 2, 
 						(this.rect.width / 2) - 1);	

 		this.aimShape = new createjs.Shape();
		drawContainer.addChild(baseShape);
		drawContainer.addChild(this.aimShape);
	}

	updateAim(target){
		this.aimShape.graphics.clear();

		let xDist = target.position.x - this.position.x,
			yDist = target.position.y - this.position.y,
			angle = Math.atan2(-yDist, xDist);

		if(angle < 0)
			angle += 2 * Math.PI;

		let angleVec = new Vector(Math.cos(angle), -Math.sin(angle)),
			lineTo = this.position.clone().add(angleVec.multiplyScalar(this.aimLength));

		this.aimShape.graphics
			.setStrokeStyle(2)
			.beginStroke(this.settings.aimColor)
			.moveTo(this.position.x, this.position.y)
			.lineTo(lineTo.x, lineTo.y);
	}

	update(time, units){
		super.update(time, units);

		let closeUnits = units.filter(u => u.position && u.position.distance(this.position) < this.range);
		if(closeUnits.length > 0) {
			this.updateAim(closeUnits[0]);

			// Shooting
			this.lastShoot += time.delta;
			if(this.lastShoot > this.shootingInterval){
				closeUnits[0].damagedTaken(this.damage);
				this.lastShoot -= this.shootingInterval;	
				console.log("Shooting");

				AnimationManager.add(new Shot(this.drawContainer, this.position.clone(), closeUnits[0]));
			}
		}
	}
}