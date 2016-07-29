
import World from './world';

export default class Game {
	constructor(stage){
		this.world = new World(stage);
	}

	update(time){
		this.world.update(time);
	}

	draw(stage, time){
		this.world.draw(stage, time);
	}
}