
import Dock from './dock';
import World from './world';

class GameState extends createjs.EventDispatcher {
	constructor(){
		super();
		this.init();
	}

	init(){
		this.placeingNewTower = false;
		this.towerChain = false;
		this.selectedTower = null;
		this.keys = [];
	}

	reset(){
		this.init();
	}

	get canPlaceNewTower(){
		return !this.placeingNewTower;
	}

	updateKeys(keys){		
		if(keys[16] == true && this.placeingNewTower)
			this.towerChain = true;

		if(keys[16] == false && this.towerChain){
			this.towerChain = false;
			this.placeingNewTower = false;
			this.selectedTower = false;
		}
	}

	updateStatus(event, data) {
		switch(event){
 			case Dock.Events.TOWER_SELECTED:
				this.placeingNewTower = true;
				this.selectedTower = data; // Name
				break;

			case World.Events.PLACED_TOWER:
				if(!this.towerChain) { // shift is down
					this.placeingNewTower = false;
					this.selectedTower = null;	
				}
				break;
		}
	}

	on(name, listener){
		console.log("Listen to " + name);
		super.on(name, listener);
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