
import World from './world';
import Assets from './assets';
import UnitManager from './unitManager';

export default class Game {
	constructor(stage){
		this.stage = stage;
		this.running = false;

		this.assets = new Assets();

		this.assets.on('progress', (progress) => {
			console.log(progress.loaded);
		});

		this.assets.on('complete', () => {
			console.log("Assets download completed");
			this.start(); // Initiate the game
		});
		
		// Start downloading assets
		this.assets.loadManifest("data/manifest.json");
	}

	/**
	 * Initiate all the game components
	 * @return {void}
	 */
	start(){
		this.running = true;
		let worldSettings = this.assets.get("world"),
			unitSettings = this.assets.get("units");

		this.world = new World(this.stage, worldSettings);
		this.unitManager = new UnitManager(this.stage, this.world.start, this.world.goal, unitSettings);
	}

	update(time){
		if(!this.running)
			return;

		this.world.update(time);
		this.unitManager.update(time);
	}

	draw(stage, time){
		if(!this.running)
			return;

		this.world.draw(stage, time);
	}
}