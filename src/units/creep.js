
import Color from '../color';
import BaseUnit from './baseUnit';
import Vector from 'victor';

export default class Creep extends BaseUnit {
	constructor(drawContainer, path, settings){
		super(settings);	
		this.path = path;
		this.position = path[0].clone();
		this.goal = path[path.length - 1];
		this.drawContainer = drawContainer;

		this.setupGraphics();
	}

	setupGraphics(){
		this.shape = new createjs.Shape();
 		this.shape.graphics.beginFill(Color.red).drawCircle(0, 0, this.settings.width / 2);
		this.drawContainer.addChild(this.shape);
	}

	destroy(){
		super.destroy();
		this.drawContainer.removeChild(this.shape);
	}

	update(time) {
		if(this.position.distance(this.goal) <= 2){
			this.destroy();
		}

		this.steering.followPath(this.path);
		this.steering.update(time);

		this.shape.x = this.position.x;
		this.shape.y = this.position.y;
	}
}