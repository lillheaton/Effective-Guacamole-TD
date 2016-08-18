
import Vector from 'victor';
import Game from './game';
import Assets from './assets';

window.createjs.Point = Vector; // Override CreateJs point to be Victor lib

class App {
	constructor(){
		this.stage = new createjs.Stage("canvas");

		window.addEventListener('resize', this.fullScreen.bind(this), false);
		window.onkeydown = (e => Game.keys[e.keyCode] = true);
		window.onkeyup = (e => Game.keys[e.keyCode] = false);
		
		Assets.middleware = this.settingsColorConverter.bind(this);
		Assets.on('progress', (progress) => {
			console.log(progress.loaded);
		});

		Assets.on('complete', () => {
			console.log("Assets download completed");
			this.start(); // Start game when assets is downloaded
		});

		// Start downloading assets
		Assets.loadManifest("data/manifest.json");
	}
	
	start(){
		this.fullScreen();
		createjs.Ticker.addEventListener("tick", this.loop.bind(this));
		createjs.Ticker.framerate = 30;

		Game.start(this.stage);
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

	/**
	 * Make canvas fullscreen
	 * @return {void}
	 */
	fullScreen(){
		this.stage.canvas.width = window.innerWidth;
        this.stage.canvas.height = window.innerHeight;
	}

	/**
	 * Application loop
	 * @param  {CreateJS.Ticker.Events} time time.Delta == elapsed ms
	 */
	loop(time){
		// time.delta == elapsed ms
		Game.update(time);
		Game.draw(this.stage, time);
		this.stage.update();
	}
}

let EffectiveGuacamoleTD = new App();