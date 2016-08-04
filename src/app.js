
import Vector from 'victor';
import Game from './game';

window.createjs.Point = Vector; // Override CreateJs point to be Victor lib

class App {
	constructor(){
		this.stage = new createjs.Stage("canvas");
		this.game = new Game(this.stage); 

		window.addEventListener('resize', this.fullScreen.bind(this), false);

		this.start();
	}
	
	start(){ 
		this.fullScreen();
		createjs.Ticker.addEventListener("tick", this.loop.bind(this));
		createjs.Ticker.framerate = 30;
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
		this.game.update(time);
		this.game.draw(this.stage, time);
		this.stage.update();
	}
}

let EffectiveGuacamoleTD = new App();