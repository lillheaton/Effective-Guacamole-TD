
import World from './world';
import Assets from './assets';
import Dock from './dock';
import UnitManager from './unitManager';

export const keyNames = {
	shift: 16
};

const Game = {
	running: false,
	cameraSpeed: 20,
	keys: [],
	props: {},

	world: null,
	worldStage: null,
	unitManager: null,
	dock: null,

	/**
	 * Initiate all the game components
	 * @return {void}
	 */
	start(stage){
		Object.assign(Game.props, Assets.get('game'))
		Game.worldStage = stage.addChild(new createjs.Container());

		Game.world = new World(Game.worldStage);
		Game.unitManager = new UnitManager(Game.worldStage);
		Game.dock = new Dock(stage);

		// Initiate
		Game.world.init();
		Game.unitManager.init();
		Game.dock.init();

		Game.running = true;
	},

	checkKeys() {
		if(Game.keys[37])
			Game.worldStage.regX -= Game.cameraSpeed;

		if(Game.keys[38])
			Game.worldStage.regY -= Game.cameraSpeed;

		if(Game.keys[39])
			Game.worldStage.regX += Game.cameraSpeed;
			
		if(Game.keys[40])
			Game.worldStage.regY += Game.cameraSpeed;
	},

	update(time){
		Game.checkKeys();

		if(!Game.running)
			return;

		Game.world.update(time);
		Game.unitManager.update(time);
		Game.dock.update(time);
	},

	draw(stage, time){
		if(!Game.running)
			return;

		Game.world.draw(stage, time);
	},



	// ################################
	
	buyingTower(price){
		if(Game.props.cash - price >= 0){
			Game.props.cash -= price;
			return true;
		}

		return false;
	}
};

export default Game;
