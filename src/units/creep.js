
import Game from '../game';

import BaseUnit from './baseUnit';
import Vector from 'victor';

export default class Creep extends BaseUnit {
	constructor(drawContainer, path, settings){
		super(settings);	
		this._path = path;
		this.position = path[0].clone();
		this.goal = path[path.length - 1];
		this.drawContainer = drawContainer;

		this.setupGraphics();
	}

	set path(value){
		this.steering.resetPath();
		this._path = value;
	}
	
	setupGraphics(){
		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill("#C44741").drawCircle(0, 0, this.settings.width / 2);
		this.drawContainer.addChild(this.shape);
	}

	destroy(){
		super.destroy();
		this.drawContainer.removeChild(this.shape);
	}

	update(time, obstacles) {
		if(this.position.distance(this.goal) <= 2){
			this.destroy();
			Game.loseLife();
		}

		this.steering.followPath(this._path);
		//this.steering.collisionAvoidance(obstacles);
		this.steering.update(time);

		this.shape.x = this.position.x;
		this.shape.y = this.position.y;
	}
}