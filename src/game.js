
import World from './world';
import Assets from './assets';
import Dock from './dock';
import UnitManager from './unitManager';

const cameraSpeed = 20;

export default class Game {
	constructor(stage){
		this.stage = stage;		
		this.running = false;
		this.keys = [];
		this.worldStage = stage.addChild(new createjs.Container());

		Assets.middleware = this.settingsColorConverter.bind(this);
		Assets.on('progress', (progress) => {
			console.log(progress.loaded);
		});

		Assets.on('complete', () => {
			console.log("Assets download completed");
			this.start(); // Initiate the game
		});

		window.onkeydown = (e => this.keys[e.keyCode] = true);
		window.onkeyup = (e => this.keys[e.keyCode] = false);
		
		// Start downloading assets
		Assets.loadManifest("data/manifest.json");
	}

	/**
	 * Initiate all the game components
	 * @return {void}
	 */
	start(){
		// Instantiate
		this.world = new World(this.worldStage);
		this.unitManager = new UnitManager(this.worldStage);
		this.dock = new Dock(this.stage);

		// Initiate
		this.world.init();
		this.unitManager.init();
		this.dock.init();

		this.running = true;
	}

	settingsColorConverter(setting){
		let colors = Assets.get('color', false).colors;

		var temp = JSON.stringify(setting, (key, value) => {
			if(key.indexOf("color") !== -1 || key.indexOf("Color") !== -1) {
				return colors[value] || value;
			}

			return value;
		});

		return JSON.parse(temp);
	}


	keysUpdate(){
		if(this.keys[37])
			this.worldStage.regX -= cameraSpeed;

		if(this.keys[38])
			this.worldStage.regY -= cameraSpeed;

		if(this.keys[39])
			this.worldStage.regX += cameraSpeed;
			
		if(this.keys[40])
			this.worldStage.regY += cameraSpeed;
	}

	update(time){
		this.keysUpdate();

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