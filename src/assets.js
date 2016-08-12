
let CreateJs = window.createjs; // Make CreateJs more accessible

/**
 * Wrapper for the CreateJs Preload functionallity
 */
class Assets {
	constructor(){
		this._middleware;
		this.queue = new CreateJs.LoadQueue(true);
		this.queue.on("complete", this.onComplete.bind(this));
		this.working = false;
	}

	set middleware(func) {
		this._middleware = func; 
	}

	loadManifest(path){
		if(this.working)
			throw new Error("Already working on downloading");

		this.working = true;
		this.queue.loadManifest(path);
	}

	get(id, runMiddleware){
		let result = this.queue.getResult(id);

		if((runMiddleware == null || runMiddleware == true) && this._middleware && result)
			return this._middleware(result);

		return result;
	}

	onComplete(){
		this.working = false;
	}

	on(name, method){
		this.queue.on(name, method);
	}
}

export default new Assets();