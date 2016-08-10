
import World from './world';
import Assets from './assets';
import Dock from './dock';
import UnitManager from './unitManager';

export default class Game {
	constructor(stage){
		this.stage = stage;		
		this.running = false;
		this.assets = new Assets();
		this.worldStage = stage.addChild(new createjs.Container());

		this.assets.on('progress', (progress) => {
			console.log(progress.loaded);
		});

		this.assets.on('complete', () => {
			console.log("Assets download completed");
			this.start(); // Initiate the game
		});

		window.onkeydown = this.onKeyDown.bind(this);
		
		// Start downloading assets
		this.assets.loadManifest("data/manifest.json");
	}

	/**
	 * Initiate all the game components
	 * @return {void}
	 */
	start(){
		let worldSettings = this.assets.get("world"),
			unitSettings = this.assets.get("units");

		// Instantiate
		this.world = new World(this.worldStage, worldSettings);
		this.unitManager = new UnitManager(this.worldStage, unitSettings);
		this.dock = new Dock(this.stage, worldSettings);

		// Initiate
		this.world.init();
		this.unitManager.init();
		this.dock.init();

		this.running = true;
	}

	onKeyDown(e){
		const cameraSpeed = 20;

		switch(e.keyCode){
			case 37:
				this.worldStage.regX -= cameraSpeed;
				break;
			case 38:
				this.worldStage.regY -= cameraSpeed;
				break;
			case 39:
				this.worldStage.regX += cameraSpeed;
				break;
			case 40:
				this.worldStage.regY += cameraSpeed;
				break;
		}
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