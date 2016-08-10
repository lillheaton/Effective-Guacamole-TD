
import Vector from 'victor';
import Obstacle from './obstacle';

export default class RectangleObstacle extends Obstacle {
	constructor(rect){
		super(new Vector(rect.x + rect.width / 2, rect.y + rect.height / 2));
		this.rect = rect;
	}
}