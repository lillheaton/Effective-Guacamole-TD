
import Vector from 'victor';
import Game from './game';

window.createjs.Point = Vector; // Override CreateJs point to be Victor lib
let CreateJs = window.createjs; // Make CreateJs more accessible

class App {
	constructor(){
		this.stage = new CreateJs.Stage("canvas");
		this.game = new Game(this.stage); 

		window.addEventListener('resize', this.fullScreen.bind(this), false);
		
		this.start();
	}
	
	start(){ 
		this.fullScreen();
		CreateJs.Ticker.addEventListener("tick", this.loop.bind(this)) 
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
		this.game.update(this.time);
		this.game.draw(this.stage, this.time);
		this.stage.update();
	}
}

let EffectiveGuacamoleTD = new App();