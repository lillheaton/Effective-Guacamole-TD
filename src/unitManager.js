
import Game from './game';
import Assets from './assets';

import World from './world';
import DynamicUnit from './units/dynamicUnit';

export default class UnitManager {
	constructor(stage){
		this.stage = stage;
		this.settings = Assets.get("units");
		this.units = [];
		this.worldObstacles = null;

		this.currentWave = 0;
		this.ongoingWave = false;
		this.sentWave = false;
		this.wavePath = [];

		Game.world.on(World.Events.WORLD_CHANGE, this.onWorldChanged.bind(this));
	}

	init(){
		this.prepareWave(); // Start sending waves
	}

	/**
	 * Will send a wave based on the settings in units.json
	 * @return {void}
	 */
	prepareWave(){
		if(this.ongoingWave)
			throw new Error("Already sent a wave");

		if(this.currentWave == this.settings.waves.length){
			console.log("No more waves!");
			return;
		}

		let wave = this.settings.waves[this.currentWave];
		console.log("Starting wave " + (this.currentWave + 1));
		this.ongoingWave = true;
		this.sendUnit(wave, 0);
	}

	/**
	 * Sending units in a recursion method
	 * @param  {object} wave      Settings from units.json
	 * @param  {int} 			  SentUnits Number of sent units
	 * @return {void}           
	 */
	sendUnit(wave, sentUnits){
		if(sentUnits < wave.length){
			this.units.push(this.createUnit(wave));
			sentUnits++;
			setTimeout(this.sendUnit.bind(this), this.settings.unitIntervalMs, wave, sentUnits);
		} else{
			this.sentWave = true;
		}
	}

	createUnit(currentWave){
		return new DynamicUnit(currentWave.type, this.stage, this.wavePath.map(s => s.clone()), currentWave.props);
	}



	/**
	 * Event that the world has been changed, a new tower for example
	 * @param  {World} world 
	 * @return {void}       
	 */
	onWorldChanged(event){
		let world = event.data;
		// Update the path for the wave
		this.wavePath = world.calculatePath(world.start, world.goal);
		this.worldObstacles = world.obstacles;

		// Update all the units path
		for (var i = 0; i < this.units.length; i++) {
			let path = world.calculatePath(world.grid.getArrayPos(this.units[i].position), world.goal);
			if(path && path.length > 0)
				this.units[i].path = path;			
		};
	}




	update(time){
		for (var i = this.units.length - 1; i >= 0; i--) {
			if(!this.units[i].alive){
				this.units[i].destroy();
				this.units.splice(i, 1);
				return;
			}

			this.units[i].update(time, this.worldObstacles);
		};

		if(this.units.length < 1 && this.sentWave){
			this.currentWave++;
			this.ongoingWave = false;
			this.sentWave = false;
			setTimeout(this.prepareWave.bind(this), this.settings.waveIntervalMs);
		}
	}
}