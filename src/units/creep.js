
import Color from '../color';
import BaseUnit from './baseUnit';
import Steering from '../helpers/steering';
import Vector from 'victor';

const maxVelocity = new Vector(0.8, 0.8);

export default class Creep extends BaseUnit {
	constructor(drawContainer, position, goal, settings){
		super(settings);
		this.position = position;
		this.goal = goal;

		this.setupGraphics(drawContainer);
	}

	setupGraphics(drawContainer){
		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill(Color.red).drawCircle(0, 0, this.settings.width / 2);
		drawContainer.addChild(this.shape);
	}

	update(time){
		Steering.seek(this.position, maxVelocity, this.goal);
		this.shape.x = this.position.x;
		this.shape.y = this.position.y;
	}
}