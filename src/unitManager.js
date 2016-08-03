
import DynamicUnit from './units/dynamicUnit';
import World from './world';

export default class UnitManager {
	constructor(stage, world, settings){
		this.stage = stage;
		this.world = world;
		this.settings = settings;
		this.units = [];

		this.drawContainer = new createjs.Container();
		stage.addChild(this.drawContainer);

		// Listen to if the world changes
		this.world.on(World.Events.WORLD_CHANGE, this.onWorldUpdate.bind(this));

		this.currentWave = 0;
		this.ongoingWave = false;
		this.sentWave = false;
		this.wavePath = [];

		this.onWorldUpdate(); // Calculate the path for the units
		this.prepareWave(); // Start sending waves
	}

	/**
	 * Will send a wave based on the settings in units.json
	 * @return {void}
	 */
	prepareWave(){
		if(this.ongoingWave)
			throw new Error("Already sent a wave");

		if(this.currentWave > this.settings.waves.length)
			return; // TODO: Send event 

		let wave = this.settings.waves[this.currentWave];
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
			this.units.push(this.createUnit(wave.type));
			sentUnits++;
			setTimeout(this.sendUnit.bind(this), this.settings.unitIntervalMs, wave, sentUnits);
		} else{
			this.sentWave = true;
		}
	}

	createUnit(type){
		return new DynamicUnit(type, this.drawContainer, this.wavePath.map(s => s.clone()), this.settings.unitTypes[type]);
	}



	/**
	 * Event when the world updates like a new tower puts in place
	 * @return {void}
	 */
	onWorldUpdate(){
		// Update the path for the wave
		this.wavePath = this.world.calculatePath(this.world.start, this.world.goal);

		// Update all the units path
		for (var i = 0; i < this.units.length; i++) {
			this.units[i].path = this.world.calculatePath(this.world.grid.getArrayPos(this.units[i].position), this.world.goal);
		};
	}




	update(time){
		for (var i = this.units.length - 1; i >= 0; i--) {
			if(!this.units[i].alive){
				this.units.splice(i, 1);
				return;
			}

			this.units[i].update(time);
		};

		if(this.units.length < 1 && this.sentWave){
			this.currentWave++;
			this.ongoingWave = false;
			this.sentWave = false;
			setTimeout(this.prepareWave.bind(this), this.settings.waveIntervalMs);
		}
	}
}