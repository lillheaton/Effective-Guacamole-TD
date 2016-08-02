
export default class BaseUnit {
	constructor(settings) {
		this.settings = settings;
		this.health = settings.health;
	}

	get alive(){
		return this.health > 0;
	}

	update(time){}
}