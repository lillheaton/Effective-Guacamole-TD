
import Steering from '../helpers/steering';
import Vector from 'victor';

export default class BaseUnit {
	constructor(settings) {
		this.settings = settings;
		this.health = settings.health;
		this.position = new Vector(0,0);

		this.steering = new Steering(this, settings);
	}

	get alive() { return this.health > 0; }

	damagedTaken(damage) { this.health -= damage; }

	destroy(){ this.health = 0; }	
	update(time){}
}