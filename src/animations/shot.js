
import Steering from '../helpers/steering';

export default class Shot {
	constructor(drawContainer, position, target) {
		this.steering = new Steering(this, {maxVelocity: 4.6 * 1000, mass: 15});
		this.position = position;
		this.target = target;
		this.drawContainer = drawContainer;

		this.setupGraphics();
	}

	setupGraphics(){
		this.shape = new createjs.Shape();
		this.shape.graphics.beginFill("#000").drawCircle(0, 0, 5);

		this.drawContainer.addChild(this.shape);
	}

	get done(){
		return this.position.distance(this.target.position) < this.target.rect.width;
	}

	destroy(){
		this.drawContainer.removeChild(this.shape);
	}

	update(time){
		this.steering.seek(this.target.position);
		this.steering.update(time);

		this.shape.x = this.position.x;
		this.shape.y = this.position.y;
	}
}