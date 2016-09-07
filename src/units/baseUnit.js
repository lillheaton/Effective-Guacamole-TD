
import Game from '../game';

import Steering from '../helpers/steering';
import Vector from 'victor';

export default class BaseUnit {
	constructor(settings) {
		this.settings = settings;
		this.health = settings.health;
		this.position = new Vector(0,0);
		this._rect = new createjs.Rectangle(this.position.x, this.position.y, settings.width, settings.height);		

		this.steering = new Steering(this, settings);
	}

	get alive() { return this.health > 0; }
	get rect() { 
		this._rect.x = this.position.x;
		this._rect.y = this.position.y;
		return this._rect;
	}

	damagedTaken(damage) { 
		this.health -= damage; 

		if(!this.alive) {
			Game.recieveCash(this.settings.worth || 50);
		}
	}

	destroy(){ this.health = 0; }	
	update(time){}
}