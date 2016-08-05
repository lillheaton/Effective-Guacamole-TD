
import World from './world';
import Assets from './assets';
import Dock from './dock';
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
		let worldSettings = this.assets.get("world"),
			unitSettings = this.assets.get("units"),
			worldStage = this.stage.addChild(new createjs.Container());

		// Instantiate
		this.world = new World(worldStage, worldSettings);
		this.unitManager = new UnitManager(worldStage, unitSettings);
		this.dock = new Dock(this.stage, worldSettings);

		// Listen to events
		//this.world.on(World.Events.WORLD_CHANGE, this.onWorldChange.bind(this));

		// Initiate
		this.world.init();
		this.unitManager.init();
		this.dock.init();

		this.running = true;
	}

	update(time){
		if(!this.running)
			return;

		this.world.update(time, this.unitManager.units);
		this.unitManager.update(time);
	}

	draw(stage, time){
		if(!this.running)
			return;

		this.world.draw(stage, time);
	}
}