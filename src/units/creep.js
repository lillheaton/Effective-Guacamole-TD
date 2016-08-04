
import Color from '../color';
import BaseUnit from './baseUnit';
import Steering from '../helpers/steering';
import Vector from 'victor';

const maxVelocity = new Vector(3.2, 3.2);

export default class Creep extends BaseUnit {
	constructor(drawContainer, path, settings){
		super(settings);	
		this.path = path;
		this.position = path[0].clone();
		this.drawContainer = drawContainer;

		this.setupGraphics();
	}

	setupGraphics(){
		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill(Color.red).drawCircle(0, 0, this.settings.width / 2);
		this.drawContainer.addChild(this.shape);
	}

	destroy(){
		this.drawContainer.removeChild(this.shape);
	}

	/**
	 * Moving the user on the specified path
	 * @return {void}
	 */
	move(){
		if(this.path.length < 1)
			return;

		let currentGoal = this.path[0],
			distance = this.position.distance(currentGoal);

		if(distance < maxVelocity.length()){
			this.path.shift(); // Go to next position
		}
		
		Steering.seek(this.position, maxVelocity, currentGoal);
	}

	update(time){
		this.move();
		this.shape.x = this.position.x;
		this.shape.y = this.position.y;
	}
}