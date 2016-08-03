
export default class BaseTile {
	constructor(rect, settings) {
		this.settings = settings;
		this.rect = rect;
	}

	get isWall(){
		return this.settings.wall;
	}

	get isConvertable(){
		return this.settings.convertable;
	}

	update(time){
	}
}