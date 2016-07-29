
let CreateJs = window.createjs; // Make CreateJs more accessible

/**
 * Wrapper for the CreateJs Preload functionallity
 */
export default class Assets {
	constructor(){
		this.queue = new CreateJs.LoadQueue(true);
		this.queue.on("complete", this.onComplete.bind(this));
		this.working = false;
	}

	loadManifest(path){
		if(this.working)
			throw new Error("Already working on downloading");

		this.working = true;
		this.queue.loadManifest(path);
	}

	get(id){
		return this.queue.getResult(id);
	}

	onComplete(){
		this.working = false;
	}

	on(name, method){
		this.queue.on(name, method);
	}
}