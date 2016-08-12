
import Vector from 'victor';

export default class BaseTile {
	constructor(rect, settings) {
		this.settings = settings;
		this.rect = rect;		
		this.position = new Vector(this.rect.x + this.rect.width / 2, this.rect.y + this.rect.height / 2);
	}

	get isWall(){ return this.settings.wall; }
	get isConvertable(){ return this.settings.convertable; }
	get canAttack(){ return this.settings.canAttack; }

	update(time, units){
	}
}