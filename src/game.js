
import World from './world';
import Assets from './assets';

export default class Game {
	constructor(stage){
		this.stage = stage;
		this.running = false;

		this.assets = new Assets();
		this.assets.on('complete', this.assetsComplete.bind(this));
		this.assets.on('progress', this.assetsDownloadProgress.bind(this));

		// Start downloading assets
		this.assets.loadManifest("data/manifest.json");
	}

	/**
	 * Initiate all the game components
	 * @return {void}
	 */
	start(){
		this.running = true;
		this.world = new World(this.stage, this.assets.get("world"));
	}

	assetsDownloadProgress(progress){
		console.log(progress.loaded);
	}

	assetsComplete(){
		console.log("Assets download completed");
		this.start();
	}

	update(time){
		if(!this.running)
			return;

		this.world.update(time);
	}

	draw(stage, time){
		if(!this.running)
			return;

		this.world.draw(stage, time);
	}
}