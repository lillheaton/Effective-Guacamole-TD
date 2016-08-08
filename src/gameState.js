
import Dock from './dock';
import World from './world';

class GameState extends createjs.EventDispatcher {
	constructor(){
		super();
		this.init();
	}

	init(){
		this.placeingNewTower = false;
		this.selectedTower = null;
	}

	reset(){
		this.init();
	}

	get canPlaceNewTower(){
		return !this.placeingNewTower;
	}

	updateStatus(event, data) {
		switch(event){
 			case Dock.Events.TOWER_SELECTED:
				this.placeingNewTower = true;
				this.selectedTower = data; // Name
				break;

			case World.Events.PLACED_TOWER:
				this.placeingNewTower = false;
				this.selectedTower = null;
				break;
		}
	}

	raiseEvent(name, data){
		console.log("Raise event " + name);
		this.updateStatus(name, data);

		let event = new createjs.Event(name);
		event.data = data;
		this.dispatchEvent(event);
	}
}

export default new GameState();